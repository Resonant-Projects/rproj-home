#!/usr/bin/env node
// Pre-commit guard: block committing any staged file over MAX_TOKENS tokens.
//
// Tokens are estimated as bytes / 4, so the limit is MAX_TOKENS * 4 bytes
// (20,000 bytes at the default 5,000 tokens). Only STAGED files are checked,
// and the size measured is the staged blob (by SHA), not the working-tree file. Dependency-free; runs on Node or Bun.
//
// Bypass in an emergency:   git commit --no-verify
// Mark a path as generated: add a pattern to IGNORE_PATTERNS below.

import { execFileSync, spawn } from "node:child_process";

const MAX_TOKENS = 5000;
const BYTES_PER_TOKEN = 4;
const MAX_BYTES = MAX_TOKENS * BYTES_PER_TOKEN;

// ---------------------------------------------------------------------------
// Ignore list. Glob-ish patterns matched against the repo-relative path:
//   *   matches anything except "/"      **  matches anything including "/"
//   A pattern without "/" matches the basename anywhere in the tree.
// Files git treats as binary (a `binary`/`-diff` attribute, or a NUL byte in
// the first 8,000 bytes of the staged blob) are skipped automatically.
// Edit freely; keep each entry on its own line so diffs stay readable.
// ---------------------------------------------------------------------------
const IGNORE_PATTERNS = [
  // -- Lockfiles (machine-written) ------------------------------------------
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
  "npm-shrinkwrap.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "Cargo.lock",
  "poetry.lock",
  "uv.lock",
  "Gemfile.lock",
  "go.sum",
  "composer.lock",
  "flake.lock",

  // -- Generated / codegen output -------------------------------------------
  "convex/_generated/**",
  "**/generated/**",
  "**/*.gen.*",
  "routeTree.gen.ts",
  "worker-configuration.d.ts",
  "next-env.d.ts",
  "dist/**",
  "build/**",
  ".next/**",
  "out/**",

  // -- Minified bundles -----------------------------------------------------
  "**/*.min.*",

  // -- Test snapshots -------------------------------------------------------
  "**/__snapshots__/**",
  "**/*.snap",

  // -- Images / fonts / archives / media / databases ------------------------
  "**/*.{png,jpg,jpeg,gif,webp,avif,svg,ico,bmp,tiff,psd}",
  "**/*.{woff,woff2,ttf,otf,eot}",
  "**/*.{zip,gz,tgz,tar,bz2,xz,7z,rar}",
  "**/*.{pdf,db,sqlite,sqlite3}",
  "**/*.{mp3,wav,flac,ogg,m4a,aac}",
  "**/*.{mp4,mov,webm,mkv,avi}",

  // -- Repo-specific (rproj-home) -------------------------------------------
  "public/**", // static assets served as-is (headshot, favicons)
];

/** Convert one glob pattern into a RegExp over the whole path. */
function globToRegExp(pattern) {
  let src = "";
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === "*") {
      if (pattern[i + 1] === "*") {
        // "**/" matches zero or more directories; bare "**" matches anything.
        if (pattern[i + 2] === "/") {
          src += "(?:.*/)?";
          i += 2;
        } else {
          src += ".*";
          i += 1;
        }
      } else {
        src += "[^/]*";
      }
    } else if (c === "{") {
      const end = pattern.indexOf("}", i);
      if (end === -1) {
        throw new Error(`Unclosed "{" in ignore pattern: ${pattern}`);
      }
      // Brace alternations hold asset extensions; match those
      // case-insensitively (map.SVG == map.svg) while every other part of a
      // pattern stays case-sensitive (Public/ is not public/).
      const alts = pattern
        .slice(i + 1, end)
        .split(",")
        .map((a) =>
          a
            .replace(/[a-z]/gi, (ch) => `[${ch.toLowerCase()}${ch.toUpperCase()}]`)
            .replace(/[.+^$()|\\]/g, "\\$&"),
        );
      src += `(?:${alts.join("|")})`;
      i = end;
    } else if (c === "?") {
      src += "[^/]";
    } else {
      src += c.replace(/[.+^$()|[\]\\]/g, "\\$&");
    }
  }
  const anchored = pattern.includes("/") ? `^${src}$` : `(?:^|/)${src}$`;
  // dotAll so "**" also spans line terminators inside unusual filenames.
  return new RegExp(anchored, "s");
}

const IGNORE_REGEXPS = IGNORE_PATTERNS.map(globToRegExp);
const isIgnored = (path) => IGNORE_REGEXPS.some((re) => re.test(path));

// Generous maxBuffer: --raw/-z listings and batch-check output scale with the
// number of staged files, and Node's 1 MiB default would throw ENOBUFS at
// roughly 7,000 staged paths.
function git(args, opts = {}) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 1024 * 1024 * 1024, ...opts });
}

/**
 * Staged entries as { path, rawPath, sha } from `git diff --cached --raw -z`.
 * Output is decoded as latin1 so every pathname byte survives 1:1 in
 * `rawPath`; `path` is the UTF-8 rendering used only for ignore matching and
 * display. Sizes are looked up by blob SHA and attributes by `rawPath`, so a
 * lossy decoded string is never handed back to git.
 *
 * -z output, one record per entry:
 *   ":oldmode newmode oldsha newsha S\0path\0"            for A/C/M/T
 *   ":oldmode newmode oldsha newsha Rnnn\0old\0new\0"     for renames/copies
 */
function stagedEntries() {
  const out = git(["diff", "--cached", "--raw", "-z", "--no-abbrev", "--diff-filter=ACMRT"], {
    encoding: "latin1",
  });
  const tokens = out.split("\0");
  const entries = [];
  for (let i = 0; i < tokens.length; i++) {
    const meta = tokens[i];
    if (!meta.startsWith(":")) continue;
    const [, , , sha, status] = meta.split(" ");
    // Renames/copies carry two paths; the second is the staged path.
    const isPair = status.startsWith("R") || status.startsWith("C");
    const rawPath = isPair ? tokens[i + 2] : tokens[i + 1];
    i += isPair ? 2 : 1;
    if (rawPath) {
      entries.push({ rawPath, path: Buffer.from(rawPath, "latin1").toString("utf8"), sha });
    }
  }
  return entries;
}

/**
 * Staged `diff` attribute per raw path from .gitattributes (index version).
 * "unset" (from `-diff` or the `binary` macro) means git treats the file as
 * binary regardless of content; "set" or a driver name means text.
 * Anything else is "unspecified" and falls back to the content probe.
 */
function stagedDiffAttrs(rawPaths) {
  const attrs = new Map();
  if (rawPaths.length === 0) return attrs;
  // Byte-exact round trip: latin1 in, latin1 out.
  const out = git(["check-attr", "--cached", "-z", "--stdin", "diff"], {
    input: Buffer.from(`${rawPaths.join("\0")}\0`, "latin1"),
    encoding: "latin1",
  });
  const tokens = out.split("\0");
  for (let i = 0; i + 2 < tokens.length; i += 3) {
    attrs.set(tokens[i], tokens[i + 2]);
  }
  return attrs;
}

/**
 * Git's binary heuristic: a NUL byte within the first 8,000 bytes of the blob.
 * Classifies the *staged blob itself* (by SHA) rather than the diff pair, so
 * replacing a tracked binary with oversized text is still caught. Only the
 * probe prefix is read; the child is terminated once enough bytes arrive.
 */
const BINARY_PROBE_BYTES = 8000;
const probeCache = new Map(); // sha -> Promise<boolean>; many paths can share one blob
function isBinaryBlob(sha) {
  if (!probeCache.has(sha)) probeCache.set(sha, probeBlob(sha));
  return probeCache.get(sha);
}
function probeBlob(sha) {
  return new Promise((resolve, reject) => {
    const child = spawn("git", ["cat-file", "blob", sha], {
      // stderr is ignored: terminating the child early makes git report
      // "unable to stream ... to stdout", which is expected here.
      stdio: ["ignore", "pipe", "ignore"],
    });
    let seen = 0;
    let binary = false;
    let settled = false;
    const done = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    child.stdout.on("data", (chunk) => {
      if (settled) return;
      const slice = chunk.subarray(0, Math.max(0, BINARY_PROBE_BYTES - seen));
      seen += chunk.length;
      if (slice.includes(0)) binary = true;
      if (binary || seen >= BINARY_PROBE_BYTES) {
        child.stdout.destroy();
        child.kill();
        done(binary);
      }
    });
    child.on("error", (err) => {
      if (!settled) {
        settled = true;
        reject(err);
      }
    });
    child.on("close", () => done(binary));
  });
}

/**
 * `diff.<name>.binary` for a custom diff driver (`diff=<name>`):
 * true => binary, false => forced text, null => unset (git auto-detects).
 */
const driverBinaryCache = new Map();
function diffDriverBinary(name) {
  if (!driverBinaryCache.has(name)) {
    let value = null;
    try {
      value = git(["config", "--type=bool", "--get", `diff.${name}.binary`]).trim() === "true";
    } catch {
      // Unset or invalid: leave null so content detection decides.
    }
    driverBinaryCache.set(name, value);
  }
  return driverBinaryCache.get(name);
}

/** True when git would treat the staged file as binary. */
async function isStagedBinary(rawPath, sha, attrs) {
  const attr = attrs.get(rawPath);
  if (attr === "unset") return true; // `binary` / `-diff`
  if (attr === "set") return false; // forced text
  if (attr && attr !== "unspecified") {
    const configured = diffDriverBinary(attr); // diff=<driver>
    if (configured !== null) return configured;
  }
  return isBinaryBlob(sha);
}

/** Blob sizes for a list of SHAs in one `git cat-file --batch-check` call. */
function blobSizes(shas) {
  const sizes = new Map();
  if (shas.length === 0) return sizes;
  const out = git(["cat-file", "--batch-check=%(objectname) %(objectsize)"], {
    input: `${shas.join("\n")}\n`,
  });
  for (const line of out.split("\n")) {
    const [sha, size] = line.split(" ");
    if (sha && size) sizes.set(sha, Number.parseInt(size, 10));
  }
  return sizes;
}

/** Render a path for the terminal with control characters escaped. */
function displayPath(path) {
  let out = "";
  for (const ch of path) {
    const code = ch.codePointAt(0);
    const isControl = code < 0x20 || (code >= 0x7f && code <= 0x9f);
    out += isControl ? `\\x${code.toString(16).padStart(2, "0")}` : ch;
  }
  return out;
}

async function main() {
  const candidates = stagedEntries().filter(({ path }) => !isIgnored(path));
  const sizes = blobSizes(candidates.map(({ sha }) => sha));
  // Only files already over the limit need attribute / content inspection.
  const large = candidates.filter(({ sha }) => (sizes.get(sha) ?? 0) > MAX_BYTES);
  const attrs = stagedDiffAttrs(large.map(({ rawPath }) => rawPath));
  const offenders = [];

  for (const { path, rawPath, sha } of large) {
    if (await isStagedBinary(rawPath, sha, attrs)) continue;
    const bytes = sizes.get(sha) ?? 0;
    offenders.push({ path, bytes, tokens: Math.ceil(bytes / BYTES_PER_TOKEN) });
  }

  if (offenders.length === 0) return 0;

  const fmt = (n) => n.toLocaleString("en-US");
  const lines = [
    "",
    `✖ Commit blocked: ${offenders.length} staged file(s) exceed the ${fmt(MAX_TOKENS)}-token limit`,
    `  (tokens ≈ bytes / ${BYTES_PER_TOKEN}, so the cap is ${fmt(MAX_BYTES)} bytes per file).`,
    "",
  ];
  for (const { path, bytes, tokens } of offenders) {
    lines.push(`  • ${displayPath(path)}  ~${fmt(tokens)} tokens (${fmt(bytes)} bytes)`);
  }
  lines.push(
    "",
    "Large files are hard for people and agents to read, review, and edit safely.",
    "Split each offending file before committing:",
    "  1. Split by responsibility: break the file into smaller modules, one concern each.",
    "  2. Move types, constants, and helper functions into their own files.",
    "  3. Extract components / sub-functions into separate files and import them.",
    "  4. Re-export from an index.ts if callers should keep a single import path.",
    `  5. Keep every new file under ${fmt(MAX_TOKENS)} tokens (${fmt(MAX_BYTES)} bytes).`,
    "",
    "Emergency bypass (use sparingly):",
    "  git commit --no-verify",
    "",
    "If the file is genuinely generated or not hand-authored, add its path to",
    "IGNORE_PATTERNS in scripts/check-file-tokens.mjs instead of bypassing.",
    "",
  );
  process.stderr.write(lines.join("\n"));
  return 1;
}

// Set exitCode rather than calling process.exit() so stderr drains fully.
process.exitCode = await main();

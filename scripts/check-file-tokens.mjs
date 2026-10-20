#!/usr/bin/env node
// Pre-commit guard: block committing any staged file over MAX_TOKENS tokens.
//
// Tokens are estimated as bytes / 4, so the limit is MAX_TOKENS * 4 bytes
// (20,000 bytes at the default 5,000 tokens). Only STAGED files are checked,
// and the size measured is the staged blob (git cat-file -s :path), not the
// working-tree file. Dependency-free; runs on Node or Bun.
//
// Bypass in an emergency:   git commit --no-verify
// Mark a path as generated: add a pattern to IGNORE_PATTERNS below.

import { execFileSync } from "node:child_process";

const MAX_TOKENS = 5000;
const BYTES_PER_TOKEN = 4;
const MAX_BYTES = MAX_TOKENS * BYTES_PER_TOKEN;

// ---------------------------------------------------------------------------
// Ignore list. Glob-ish patterns matched against the repo-relative path:
//   *   matches anything except "/"      **  matches anything including "/"
//   A pattern without "/" matches the basename anywhere in the tree.
// Files git already treats as binary are skipped automatically.
// Edit freely; keep each entry on its own line so diffs stay readable.
// ---------------------------------------------------------------------------
const IGNORE_PATTERNS = [
  // -- Lockfiles (machine-written) ------------------------------------------
  "bun.lock",
  "bun.lockb",
  "package-lock.json",
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
      const alts = pattern
        .slice(i + 1, end)
        .split(",")
        .map((a) => a.replace(/[.+^$()|[\]\\]/g, "\\$&"));
      src += `(?:${alts.join("|")})`;
      i = end;
    } else if (c === "?") {
      src += "[^/]";
    } else {
      src += c.replace(/[.+^$()|[\]\\]/g, "\\$&");
    }
  }
  const anchored = pattern.includes("/") ? `^${src}$` : `(?:^|/)${src}$`;
  return new RegExp(anchored);
}

const IGNORE_REGEXPS = IGNORE_PATTERNS.map(globToRegExp);
const isIgnored = (path) => IGNORE_REGEXPS.some((re) => re.test(path));

function git(args, opts = {}) {
  return execFileSync("git", args, { encoding: "utf8", ...opts });
}

/**
 * Staged entries as { path, sha } from `git diff --cached --raw -z`.
 * Sizes are looked up by blob SHA so the (decoded) path is only ever used
 * for display and ignore matching; it is never passed back to git, which
 * keeps the hook safe for filenames git stores as non-UTF-8 bytes.
 *
 * -z output, one record per entry:
 *   ":oldmode newmode oldsha newsha S\0path\0"            for A/C/M/T
 *   ":oldmode newmode oldsha newsha Rnnn\0old\0new\0"     for renames/copies
 */
function stagedEntries() {
  const out = git(["diff", "--cached", "--raw", "-z", "--no-abbrev", "--diff-filter=ACMRT"]);
  const tokens = out.split("\0");
  const entries = [];
  for (let i = 0; i < tokens.length; i++) {
    const meta = tokens[i];
    if (!meta.startsWith(":")) continue;
    const [, , , sha, status] = meta.split(" ");
    // Renames/copies carry two paths; the second is the staged path.
    const path = status.startsWith("R") || status.startsWith("C") ? tokens[i + 2] : tokens[i + 1];
    i += status.startsWith("R") || status.startsWith("C") ? 2 : 1;
    if (path) entries.push({ path, sha });
  }
  return entries;
}

/** Paths git considers binary in the staged diff ("-\t-\t" in --numstat). */
function stagedBinaryFiles() {
  const out = git(["diff", "--cached", "--numstat", "-z", "--diff-filter=ACMRT"]);
  const binary = new Set();
  // -z output, one record per entry:
  //   "added\tdeleted\tpath\0"                   for adds/modifies
  //   "added\tdeleted\t\0old-path\0new-path\0"   for renames/copies
  // Split on the first two tabs only so paths containing tabs survive.
  const tokens = out.split("\0");
  for (let i = 0; i < tokens.length; i++) {
    const record = tokens[i];
    if (!record) continue;
    const t1 = record.indexOf("\t");
    const t2 = record.indexOf("\t", t1 + 1);
    if (t1 === -1 || t2 === -1) continue;
    const added = record.slice(0, t1);
    const deleted = record.slice(t1 + 1, t2);
    let path = record.slice(t2 + 1);
    if (path === "") {
      // Rename/copy: skip the old path, take the new (staged) path.
      path = tokens[i + 2] ?? "";
      i += 2;
    }
    if (added === "-" && deleted === "-" && path) binary.add(path);
  }
  return binary;
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

function main() {
  const binary = stagedBinaryFiles();
  const candidates = stagedEntries().filter(({ path }) => !binary.has(path) && !isIgnored(path));
  const sizes = blobSizes(candidates.map(({ sha }) => sha));
  const offenders = [];

  for (const { path, sha } of candidates) {
    const bytes = sizes.get(sha) ?? 0;
    if (bytes > MAX_BYTES) {
      offenders.push({ path, bytes, tokens: Math.ceil(bytes / BYTES_PER_TOKEN) });
    }
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
    lines.push(`  • ${path}  ~${fmt(tokens)} tokens (${fmt(bytes)} bytes)`);
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

process.exit(main());

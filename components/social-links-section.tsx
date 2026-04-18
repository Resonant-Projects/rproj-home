"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";

const socialLinks = [
  {
    name: "GitHub",
    handle: "keithce",
    url: "https://github.com/keithce",
    icon: GithubLogo,
  },
  {
    name: "LinkedIn",
    handle: "keithcelliott",
    url: "https://linkedin.com/in/keithcelliott",
    icon: LinkedinLogo,
  },
  {
    name: "X",
    handle: "@keithce",
    url: "https://twitter.com/keithce",
    icon: XLogo,
  },
  {
    name: "Email",
    handle: "info@resonantprojects.art",
    url: "mailto:info@resonantprojects.art",
    icon: EnvelopeSimple,
  },
];

export function SocialLinksSection() {
  return (
    <section id="connect" className="space-y-4">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-500">
        <span aria-hidden="true">{"///"}</span> Channels
      </p>

      <ul className="divide-y divide-ink-800/80 border-y border-ink-800/80">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          const isMail = link.name === "Email";
          return (
            <li key={link.name} className="relative overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-glow/[0.04] translate-x-[-101%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/channel:translate-x-0"
              />
              <a
                href={link.url}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                className="group/channel relative flex items-center gap-4 py-3 text-sm text-ink-300 transition-colors hover:text-ink-100"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-500 w-5 transition-colors duration-300 group-hover/channel:text-glow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="size-4 text-ink-500 transition-all duration-300 group-hover/channel:text-glow group-hover/channel:translate-y-[-1px]" />
                <span className="font-medium tracking-tight">{link.name}</span>
                <span className="ml-auto font-mono text-[11px] text-ink-500 truncate max-w-[50%] transition-colors group-hover/channel:text-ink-100">
                  {link.handle}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex w-4 text-ink-500 transition-all duration-300 group-hover/channel:text-glow group-hover/channel:translate-x-1 text-sm"
                >
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

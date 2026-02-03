"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/keithce",
    icon: GithubLogo,
    color: "hover:bg-gray-900 hover:text-white",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/keithcelliott",
    icon: LinkedinLogo,
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/keithce",
    icon: XLogo,
    color: "hover:bg-sky-500 hover:text-white",
  },
  {
    name: "Email",
    url: "mailto:info@resonantprojects.art",
    icon: EnvelopeSimple,
    color: "hover:bg-red-500 hover:text-white",
  },
];

export function SocialLinksSection() {
  return (
    <section id="connect" className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-foreground">Connect With Me</h2>

      <div className="grid gap-3">
        {socialLinks.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <Button
              key={link.name}
              variant="outline"
              size="lg"
              className={`w-full justify-start text-left h-14 border-border bg-card hover:scale-[1.02] transition-all duration-300 animate-fade-in-up ${link.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
            >
              <IconComponent className="w-5 h-5 mr-4" />
              <span className="font-medium">{link.name}</span>
            </Button>
          );
        })}
      </div>
    </section>
  );
}

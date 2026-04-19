"use client";

import { ProjectCard } from "@/components/project-card";
import { type Project, ProjectsAccordion } from "@/components/projects-accordion";

const featuredProjects: Project[] = [
  {
    title: "Resonant Projects .ART",
    description:
      "My comprehensive site for all that I offer including daily learning and other resources.",
    techStack: ["Astro", "Tailwind", "Notion", "React"],
    liveUrl: "https://www.resonantprojects.art",
    repoUrl: "https://github.com/Resonant-Projects/rproj-website",
    icon: "/rproj.svg",
  },
  {
    title: "Vedic Today",
    description:
      "Portal for helpful notifications about Vedic Astrology Events impacting every day life.",
    techStack: ["SolidJS", "TypeScript", "Convex", "Resend", "Clerk"],
    liveUrl: "https://www.vedic.today",
    icon: "/vame.svg",
  },
  {
    title: "License Monitor",
    description: "Light-weight app to monitor a variety of license servers.",
    techStack: ["Rust", "Python", "OpenTelemetry"],
    liveUrl: "https://license.rproj.art",
  },
];

const moreProjects: Project[] = [
  {
    title: "Declination Living",
    description: "Astronomy/astrology app with 3D globe visualizations.",
    techStack: ["React", "TanStack Start", "Convex", "Three.js", "Framer Motion"],
    liveUrl: "https://living.rproj.art",
    repoUrl: "https://github.com/keithce/declination-living",
  },
  {
    title: "Pick A Park",
    description: "Random park selector to alleviate decision fatigue.",
    techStack: ["React", "TanStack Start", "Convex", "Clerk"],
    liveUrl: "https://www.pickapark.app",
    repoUrl: "https://github.com/Resonant-Projects/park-chooser",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-500">
            <span aria-hidden="true">{"///"}</span> Deployments
          </p>
          <h2 className="font-display text-4xl md:text-[2.75rem] leading-none text-ink-100 tracking-tight">
            Currently <span className="italic text-glow">shipping</span>
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-500 pb-1">
          {String(featuredProjects.length + moreProjects.length).padStart(2, "0")} projects
        </span>
      </header>

      <div className="grid gap-3 animate-fade-in-up">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <ProjectsAccordion projects={moreProjects} startIndex={featuredProjects.length} />
    </section>
  );
}

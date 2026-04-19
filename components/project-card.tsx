"use client";

import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import type { Project } from "@/components/projects-accordion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const id = String(index + 1).padStart(3, "0");
  const primaryUrl = project.liveUrl ?? project.repoUrl;

  return (
    <article className="group relative border border-ink-800 bg-ink-950/60 backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-ink-700 hover:bg-ink-900/70">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-glow origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-glow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative flex items-start gap-5 p-5 md:p-6">
        <div className="shrink-0 flex flex-col items-center gap-3 pt-1">
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink-500 transition-colors duration-500 group-hover:text-glow">
            {id}
          </span>
          {project.icon ? (
            <div className="relative h-11 w-11 bg-ink-900 ring-1 ring-ink-800 grid place-items-center overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
              <img
                src={project.icon}
                alt=""
                className="h-7 w-7 object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="relative h-11 w-11 bg-ink-900 ring-1 ring-ink-800 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
              <span className="font-display italic text-glow/90 text-xl transition-colors duration-500 group-hover:text-glow">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight text-ink-100 tracking-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-300 max-w-lg">
                {project.description}
              </p>
            </div>
            {primaryUrl && (
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="shrink-0 inline-flex items-center justify-center size-9 border border-ink-800 bg-ink-900/60 text-ink-300 transition-all duration-300 group-hover:border-glow/60 group-hover:text-glow group-hover:rotate-[-45deg]"
              >
                <ArrowUpRight weight="bold" className="size-4" />
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] tracking-wide uppercase text-ink-300 border border-ink-800 px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.repoUrl && (
            <div className="pt-1">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${project.title}`}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-500 hover:text-ink-100 transition-colors underline-grow"
              >
                <GithubLogo className="size-3.5" />
                <span>source</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

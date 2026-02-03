"use client";

import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import { type Project, ProjectsAccordion } from "@/components/projects-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    description: "Light-weight app to monitor a variety of license servers",
    techStack: ["Rust", "Python", "OpenTelemetry"],
    liveUrl: "https://license.rproj.art",
  },
];

const moreProjects: Project[] = [
  {
    title: "Declination Living",
    description: "Astronomy/astrology app with 3D globe visualizations",
    techStack: ["React", "TanStack Start", "Convex", "Three.js", "Framer Motion"],
    liveUrl: "https://living.rproj.art",
    repoUrl: "https://github.com/keithce/declination-living",
  },
  {
    title: "Pick A Park",
    description: "Random park selector to alleviate decision fatigue",
    techStack: ["React", "TanStack Start", "Convex", "Clerk"],
    liveUrl: "https://www.pickapark.app",
    repoUrl: "https://github.com/Resonant-Projects/park-chooser",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-foreground">Featured Projects</h2>

      <div className="grid gap-4">
        {featuredProjects.map((project, index) => (
          <Card
            key={project.title}
            className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border bg-card animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-card-foreground group-hover:text-primary transition-colors text-xl flex items-center gap-2">
                {project.icon && <img src={project.icon} alt="" className="w-6 h-6 rounded" />}
                {project.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs bg-secondary text-slate-50 px-2 py-1.5"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                {project.liveUrl && (
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    render={
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                      />
                    }
                  >
                    <ArrowSquareOut className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                )}

                {project.repoUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                    render={
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View code for ${project.title}`}
                      />
                    }
                  >
                    <GithubLogo className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProjectsAccordion projects={moreProjects} />
    </section>
  );
}

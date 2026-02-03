"use client";

import { ArrowSquareOut, CaretDown, GithubLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  icon?: string;
}

interface ProjectsAccordionProps {
  projects: Project[];
}

const contentVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98] as const,
      },
      opacity: {
        duration: 0.25,
        ease: "easeOut" as const,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.25,
        ease: [0.04, 0.62, 0.23, 0.98] as const,
      },
      opacity: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  }),
};

export function ProjectsAccordion({ projects }: ProjectsAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls="more-projects-content"
        className="w-full border-t border-border pt-6 rounded-none hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
      >
        <span>{isExpanded ? "Show Less" : "More Projects"}</span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
          className="ml-2"
        >
          <CaretDown className="w-4 h-4" />
        </motion.span>
      </Button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id="more-projects-content"
            role="region"
            aria-label="Additional projects"
            variants={shouldReduceMotion ? undefined : contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="grid gap-4 pt-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  custom={index}
                  variants={shouldReduceMotion ? undefined : cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-card-foreground group-hover:text-primary transition-colors text-xl flex items-center gap-2">
                        {project.icon && (
                          <img src={project.icon} alt="" className="w-6 h-6 rounded" />
                        )}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

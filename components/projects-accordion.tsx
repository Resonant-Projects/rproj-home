"use client";

import { CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";

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
  startIndex?: number;
}

const contentVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.3, ease: "easeOut" as const, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.35, ease: [0.7, 0, 0.84, 0] as const },
      opacity: { duration: 0.2, ease: "easeIn" as const },
    },
  },
};

export function ProjectsAccordion({ projects, startIndex = 0 }: ProjectsAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-controls="more-projects-content"
        className="group flex w-full items-center gap-3 text-left"
      >
        <span className="hairline flex-1" />
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-500 group-hover:text-ink-100 transition-colors">
          {isExpanded ? "Collapse" : "Show all"}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
          >
            <CaretDown className="w-3 h-3" weight="bold" />
          </motion.span>
        </span>
        <span className="hairline flex-1" />
      </button>

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
            <div className="grid gap-3 pt-5">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={startIndex + index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

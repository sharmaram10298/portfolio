import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types/index';
import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GlassmorphismCard className="overflow-hidden flex flex-col h-full">
      {/* Screenshot */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={project.screenshotUrl}
          alt={project.name}
          loading="lazy"
          className="w-full h-48 object-cover bg-bg-secondary"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBkMTUyNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjM2I4MmY2IiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvamVjdCBTY3JlZW5zaG90PC90ZXh0Pjwvc3ZnPg==';
          }}
        />
        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-text-secondary text-xs text-center line-clamp-3">{project.description}</p>
              <div className="flex gap-2">
                {/* GitHub button */}
                <div className="relative group/github">
                  <a
                    href={project.githubUrl ?? '#'}
                    target={project.githubUrl ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${project.name} GitHub repository`}
                    aria-disabled={!project.githubUrl}
                    onClick={project.githubUrl ? undefined : (e) => e.preventDefault()}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      project.githubUrl
                        ? 'bg-white/10 hover:bg-white/20 text-text-primary'
                        : 'bg-white/5 text-text-secondary cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                  {!project.githubUrl && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-bg-secondary text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/github:opacity-100 transition-opacity pointer-events-none border border-white/10">
                      Private Repo
                    </span>
                  )}
                </div>
                {/* Live Demo button */}
                <div className="relative group/demo">
                  <a
                    href={project.liveDemoUrl ?? '#'}
                    target={project.liveDemoUrl ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${project.name} live demo`}
                    aria-disabled={!project.liveDemoUrl}
                    onClick={project.liveDemoUrl ? undefined : (e) => e.preventDefault()}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      project.liveDemoUrl
                        ? 'bg-accent-primary hover:bg-accent-primary/90 text-white'
                        : 'bg-white/5 text-text-secondary cursor-not-allowed opacity-60'
                    }`}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                  {!project.liveDemoUrl && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-bg-secondary text-text-primary text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/demo:opacity-100 transition-opacity pointer-events-none border border-white/10">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-text-primary text-base">{project.name}</h3>
        <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">{project.description}</p>

        {/* Features */}
        <ul className="space-y-1">
          {project.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-text-secondary">
              <span className="text-accent-primary flex-shrink-0 mt-0.5">▸</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary text-xs border border-accent-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassmorphismCard>
  );
}

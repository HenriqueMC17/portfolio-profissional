'use client';
import type { Dictionary } from '@/types/dictionary';

import { motion } from 'framer-motion';
import { projectsInfo } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, ExternalLink, Activity } from 'lucide-react';

export function ProjectsSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-[#A1A1AA] font-mono text-sm block mb-2 uppercase tracking-widest">{dict.Navigation.projects}</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
          Hub de <span className="italic font-serif">Projetos</span>
        </h2>
        <p className="text-[#A1A1AA] mt-4 max-w-2xl text-lg">
          Uma visão unificada do meu trabalho. De automações corporativas críticas a arquiteturas front-end escaláveis.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsInfo.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-[#111111] border-[#1A1A1A] hover:border-white/10 text-[#FAFAFA] flex flex-col h-full group transition-colors overflow-hidden relative">
              <CardHeader className="pb-4 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="border-[#333333] text-[#A1A1AA] font-mono text-xs">
                    {project.category}
                  </Badge>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[#A1A1AA] hover:text-white transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[#A1A1AA] hover:text-white transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold group-hover:text-white transition-colors">
                  {project.title}
                </CardTitle>
                
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-2">
                    {project.metrics.map(metric => (
                      <span key={metric} className="flex items-center gap-1.5 text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded-sm border border-green-500/20">
                        <Activity size={12} /> {metric}
                      </span>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-grow text-[#A1A1AA] text-sm sm:text-base leading-relaxed relative z-10">
                {project.description}
              </CardContent>

              <CardFooter className="pt-4 pb-6 flex flex-wrap gap-2 relative z-10 mt-auto">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-xs font-mono text-[#777777] bg-[#1A1A1A] px-2 py-1 rounded-sm">
                    {tech}
                  </span>
                ))}
              </CardFooter>

              {/* Hover Glow Effect */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

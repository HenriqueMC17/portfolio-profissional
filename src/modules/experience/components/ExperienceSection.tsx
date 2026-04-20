"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Experience {
  id: string;
  role: { pt: string; en: string };
  company: string;
  period: { pt: string; en: string };
  description: { pt: string; en: string };
  tags: string[];
}

const experiences: Experience[] = [
  {
    id: "1",
    role: { pt: "Senior Full Stack Engineer", en: "Senior Full Stack Engineer" },
    company: "EcoVolt Enterprise",
    period: { pt: "2024 - Presente", en: "2024 - Present" },
    description: { 
      pt: "Liderança técnica na arquitetura de sistemas corporativos escaláveis utilizando React, Next.js, Node.js e bancos de dados modernos. Foco em performance, segurança e UX premium.", 
      en: "Technical leadership in architecting scalable corporate systems using React, Next.js, Node.js, and modern databases. Focused on performance, security, and premium UX." 
    },
    tags: ["Next.js", "TypeScript", "Convex", "TailwindCSS"],
  },
  {
    id: "2",
    role: { pt: "Software Developer", en: "Software Developer" },
    company: "Tech Solutions Inc.",
    period: { pt: "2021 - 2024", en: "2021 - 2024" },
    description: { 
      pt: "Desenvolvimento e manutenção de aplicações web fullstack, otimização de queries de banco de dados e integração de APIs de terceiros. Aumento de 40% na performance da plataforma principal.", 
      en: "Development and maintenance of fullstack web applications, database query optimization, and third-party API integration. Increased core platform performance by 40%." 
    },
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: "3",
    role: { pt: "Frontend Developer", en: "Frontend Developer" },
    company: "Creative Studio",
    period: { pt: "2019 - 2021", en: "2019 - 2021" },
    description: { 
      pt: "Criação de interfaces altamente interativas e responsivas, colaboração direta com designers UX/UI para construir jornadas de usuário engajadoras.", 
      en: "Creation of highly interactive and responsive interfaces, direct collaboration with UX/UI designers to build engaging user journeys." 
    },
    tags: ["JavaScript", "React", "CSS/SASS", "Figma"],
  }
];

export function ExperienceSection({ isPt }: { isPt: boolean }) {
  return (
    <section id="experience" className="w-full py-24 md:py-32 relative">
      <div className="z-10 relative container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {isPt ? "Trajetória Profissional" : "Professional Journey"}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {isPt
              ? "Minha evolução como engenheiro de software através de projetos e empresas inovadoras."
              : "My evolution as a software engineer through innovative projects and companies."}
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pb-8">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[21px] md:-left-[21px] top-1 h-10 w-10 bg-black border-2 border-primary-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-500),0.5)]">
                <Briefcase className="w-4 h-4 text-primary-400" />
              </div>

              <div className="bg-secondary/30 border border-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-primary-500/30 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {isPt ? exp.role.pt : exp.role.en}
                    </h3>
                    <p className="text-lg text-white/80 font-medium">{exp.company}</p>
                  </div>
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-900/40 text-primary-300 border border-primary-800/50 text-sm font-semibold whitespace-nowrap">
                    {isPt ? exp.period.pt : exp.period.en}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {isPt ? exp.description.pt : exp.description.en}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-md bg-white/5 text-white/70 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

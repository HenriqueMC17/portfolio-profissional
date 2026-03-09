'use client';
import type { Dictionary } from '@/types/dictionary';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const skills = [
  'Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'C#', 
  'HTML', 'CSS', 'SQL', 'VBA', 'Arduino', 'Google Apps Script'
];

export function AboutSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Text Col */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            <span className="text-[#A1A1AA] font-mono text-sm block mb-2 uppercase tracking-widest">{dict.Navigation.about}</span>
            De Operações a <br />
            <span className="italic font-serif">Engenharia de Software.</span>
          </h2>
          
          <div className="space-y-6 text-[#A1A1AA] leading-relaxed">
            <p>
              Sou o Henrique Monteiro Cardoso, 18 anos, atualmente estudando Análise e Desenvolvimento de Sistemas na FACENS (previsão Julho/2027).
            </p>
            <p>
              Minha trajetória iniciou com forte base em operações corporativas e administrativas. Tive a oportunidade de construir integrações e focar em análise de dados operando CRMs e sistemas como Bitrix e DKSoft em empresas de alto nível.
            </p>
            <p>
              Hoje, traduzo essa ótica de negócio em arquitetura de software escalável, automação corporativa, desenvolvendo aplicações full-stack premium preparadas para produção.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid Col */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Card className="bg-[#111111] border-[#1A1A1A] text-[#FAFAFA] col-span-1 sm:col-span-2 overflow-hidden group">
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg">Stack & Linguagens</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-[#1A1A1A] hover:bg-[#222222] text-[#A1A1AA] font-mono transition-colors">
                  {skill}
                </Badge>
              ))}
            </CardContent>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>

          <Card className="bg-[#111111] border-[#1A1A1A] text-[#FAFAFA] group overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Automação & APIs</CardTitle>
              <CardDescription className="text-[#A1A1AA]">Google Workspace, VBA, REST APIs</CardDescription>
            </CardHeader>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FAFAFA]/5 blur-2xl group-hover:bg-[#FAFAFA]/10 transition-colors duration-500" />
          </Card>

          <Card className="bg-[#111111] border-[#1A1A1A] text-[#FAFAFA] group overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Dashboards</CardTitle>
              <CardDescription className="text-[#A1A1AA]">Visualização de dados para SSMA e métricas de negócio.</CardDescription>
            </CardHeader>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FAFAFA]/5 blur-2xl group-hover:bg-[#FAFAFA]/10 transition-colors duration-500" />
          </Card>
        </motion.div>

      </div>
    </section>
  );
}

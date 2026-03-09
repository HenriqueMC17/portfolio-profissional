'use client';
import type { Dictionary } from '@/types/dictionary';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github } from 'lucide-react';

export function ContactSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-4xl mx-auto border-t border-white/5 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-[#A1A1AA] font-mono text-sm block mb-2 uppercase tracking-widest">{dict.Navigation.contact}</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
          Vamos construir <span className="italic font-serif">juntos.</span>
        </h2>
        <p className="text-[#A1A1AA] mt-4 text-lg">
          Disponível para oportunidades e projetos desafiadores.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-[#FAFAFA] mb-6">Informações de Contato</h3>
          <div className="space-y-6">
            <a href="mailto:henriquemon17@gmail.com" className="flex items-center gap-4 text-[#A1A1AA] hover:text-white transition-colors group">
              <div className="p-3 bg-[#111111] rounded-full border border-[#1A1A1A] group-hover:border-white/20 transition-colors">
                <Mail size={20} />
              </div>
              <span className="font-mono text-sm">henriquemon17@gmail.com</span>
            </a>
            
            <a href="https://linkedin.com/in/henrique-monteiro-cardoso-ba3716229" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#A1A1AA] hover:text-white transition-colors group">
              <div className="p-3 bg-[#111111] rounded-full border border-[#1A1A1A] group-hover:border-white/20 transition-colors">
                <Linkedin size={20} />
              </div>
              <span className="font-mono text-sm">LinkedIn</span>
            </a>

            <a href="https://github.com/HenriqueMC17" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#A1A1AA] hover:text-white transition-colors group">
              <div className="p-3 bg-[#111111] rounded-full border border-[#1A1A1A] group-hover:border-white/20 transition-colors">
                <Github size={20} />
              </div>
              <span className="font-mono text-sm">GitHub</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA]">Nome</label>
                <Input placeholder="Seu nome" className="bg-[#111111] border-[#1A1A1A] text-white focus-visible:ring-1 focus-visible:ring-white/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA]">Email</label>
                <Input type="email" placeholder="seu@email.com" className="bg-[#111111] border-[#1A1A1A] text-white focus-visible:ring-1 focus-visible:ring-white/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#A1A1AA]">Mensagem</label>
              <Textarea placeholder="Como posso ajudar?" className="min-h-[120px] bg-[#111111] border-[#1A1A1A] text-white focus-visible:ring-1 focus-visible:ring-white/20" />
            </div>
            <Button className="w-full bg-[#FAFAFA] text-[#0A0A0A] hover:bg-white/90 font-semibold py-6">
              Enviar Mensagem
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

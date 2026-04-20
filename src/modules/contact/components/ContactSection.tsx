"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle, Loader2 } from "lucide-react";

import { LeadSchema, LeadEntity } from "../../../core/domain/entities/lead.entity";

export function ContactSection({ isPt }: { isPt: boolean }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const insertLead = useMutation(api.leads.insertLead);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadEntity>({
    resolver: zodResolver(LeadSchema),
  });

  const onSubmit = async (data: LeadEntity) => {
    try {
      await insertLead({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setIsSuccess(true);
      reset();
      
      // Reseta a mensagem de sucesso após 5 segundos
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <section id="contact" className="w-full py-24 md:py-32 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50 translate-y-1/4" />
      </div>

      <div className="z-10 relative container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            {isPt ? "Vamos Trabalhar Juntos?" : "Let's Work Together?"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            {isPt 
              ? "Tem um projeto em mente ou apenas quer bater um papo sobre tecnologia? Me envie uma mensagem."
              : "Have a project in mind or just want to chat about tech? Drop me a message."}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-secondary/40 border border-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isPt ? "Mensagem Enviada!" : "Message Sent!"}
              </h3>
              <p className="text-muted-foreground">
                {isPt 
                  ? "Obrigado por entrar em contato. Retornarei o mais breve possível."
                  : "Thanks for reaching out. I'll get back to you as soon as possible."}
              </p>
              <Button 
                variant="outline" 
                className="mt-8"
                onClick={() => setIsSuccess(false)}
              >
                {isPt ? "Enviar outra mensagem" : "Send another message"}
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">
                    {isPt ? "Nome completo" : "Full name"}
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    placeholder={isPt ? "Seu nome" : "Your name"}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">
                    E-mail
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/80">
                  {isPt ? "Sua mensagem" : "Your message"}
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  placeholder={isPt ? "Como posso ajudar?" : "How can I help?"}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message as string}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-6 text-lg group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isPt ? "Enviando..." : "Sending..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    {isPt ? "Enviar Mensagem" : "Send Message"}
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

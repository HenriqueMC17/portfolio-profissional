"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SlideUp } from "@/components/motion/slide-up";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import { submitContactForm } from "@/actions/contact";

import { contactSchema, type ContactFormData } from "@/types/contact";

export function ContactModule() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Converte dados do ReactHookForm para FormData exigido pela ServerAction
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      // Usamos currentState como null pois não estamos usando via useFormState nativo hook
      const result = await submitContactForm(null, formData);
      setSubmitStatus({ success: result.success, message: result.message });
      
      if (result.success) {
        reset();
      }
    } catch {
      setSubmitStatus({ success: false, message: "Erro de conexão. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-5 md:px-12 xl:px-24 bg-background-primary">
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div>
          <SlideUp yOffset={20}>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
              [ 04 — Let&apos;s Talk ]
            </h2>
            <h3 className="font-heading text-4xl md:text-5xl text-white font-bold leading-tight mb-8">
              Pronto para construir o próximo nível?
            </h3>
            <p className="text-xl text-text-secondary font-light leading-relaxed mb-12">
              Seja para uma nova arquitetura escalável ou redesehar um produto com foco em conversão e experiência.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-cobalt-blue" />
              <span className="font-mono text-cobalt-blue text-sm">Open for remote work worldwide.</span>
            </div>
          </SlideUp>
        </div>

        <div>
          <SlideUp yOffset={40} delay={0.2}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-glass border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col gap-6">
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Seu Nome</label>
                <input
                  id="name"
                  type="text"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors`}
                  placeholder="Steve Jobs"
                />
                {errors.name && <p id="name-error" role="alert" className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">E-mail Corporativo</label>
                <input
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors`}
                  placeholder="steve@apple.com"
                />
                {errors.email && <p id="email-error" role="alert" className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Detalhes da Visão</label>
                <textarea
                  id="message"
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors resize-none`}
                  placeholder="Conte-me sobre os desafios de escala ou design no seu roadmap..."
                />
                {errors.message && <p id="message-error" role="alert" className="mt-2 text-sm text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-background-primary transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:opacity-70 disabled:hover:scale-100 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    Estabelecendo Uplink...
                  </>
                ) : (
                  <>
                    Transmitir Telemetria
                    <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>

              {/* Box de Status (Feedback Visual) */}
              {submitStatus && (
                <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-sm ${submitStatus.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {submitStatus.success ? <CheckCircle className="size-5 shrink-0" /> : <XCircle className="size-5 shrink-0" />}
                  <p>{submitStatus.message}</p>
                </div>
              )}
            </form>
          </SlideUp>
        </div>

      </div>
    </section>
  );
}

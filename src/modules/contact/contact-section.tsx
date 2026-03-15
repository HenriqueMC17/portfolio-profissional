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
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 xl:px-24 bg-black border-t border-white/5">
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        <div>
          <SlideUp yOffset={20}>
            <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-[#22D3EE] mb-6 font-bold">
              [ 05 — Let&apos;s Talk ]
            </h2>
            <h3 className="font-heading text-4xl md:text-6xl text-white font-black leading-tight mb-8 tracking-tighter uppercase">
              Pronto para construir o próximo nível?
            </h3>
            <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12">
              Seja para uma nova arquitetura escalável ou redesenhar um produto com foco em conversão e experiência.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#2563EB]" />
              <span className="font-mono text-[#22D3EE] text-sm font-bold tracking-widest uppercase">Open for remote work worldwide.</span>
            </div>
          </SlideUp>
        </div>

        <div>
          <SlideUp yOffset={40} delay={0.2}>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 flex flex-col gap-8 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.1)]">
              
              <div>
                <label htmlFor="name" className="block text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 mb-3">Seu Nome</label>
                <input
                  id="name"
                  type="text"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                  className={`w-full bg-black/50 border ${errors.name ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white font-sans placeholder:text-zinc-600 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] transition-all duration-300`}
                  placeholder="Steve Jobs"
                />
                {errors.name && <p id="name-error" role="alert" className="mt-2 text-xs font-mono text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 mb-3">E-mail Corporativo</label>
                <input
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                  className={`w-full bg-black/50 border ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white font-sans placeholder:text-zinc-600 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] transition-all duration-300`}
                  placeholder="steve@apple.com"
                />
                {errors.email && <p id="email-error" role="alert" className="mt-2 text-xs font-mono text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 mb-3">Detalhes da Visão</label>
                <textarea
                  id="message"
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                  className={`w-full bg-black/50 border ${errors.message ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white font-sans placeholder:text-zinc-600 focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] transition-all duration-300 resize-none`}
                  placeholder="Conte-me sobre os desafios de escala ou design no seu roadmap..."
                />
                {errors.message && <p id="message-error" role="alert" className="mt-2 text-xs font-mono text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-sm font-bold tracking-widest uppercase text-black transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-70 disabled:hover:scale-100 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                    Estabelecendo Uplink...
                  </>
                ) : (
                  <>
                    Transmitir Telemetria
                    <Send className="size-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" aria-hidden="true" />
                  </>
                )}
              </button>

              {/* Box de Status (Feedback Visual) */}
              {submitStatus && (
                <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-sm ${submitStatus.success ? 'bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {submitStatus.success ? <CheckCircle className="size-5 shrink-0" /> : <XCircle className="size-5 shrink-0" />}
                  <p className="font-mono">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </SlideUp>
        </div>

      </div>
    </section>
  );
}

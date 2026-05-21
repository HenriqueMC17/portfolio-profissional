import { HeroSection } from "@/modules/hero/components/HeroSection";
import { FeaturesSection } from "@/modules/hero/components/FeaturesSection";
import { ProjectsSection } from "@/modules/projects/components/ProjectsSection";
import { ExperienceSection } from "@/modules/experience/components/ExperienceSection";
import { ContactSection } from "@/modules/contact/components/ContactSection";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isPt = lang === "pt";

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background">
      {/* ─── Multi-layer Ambient Glow (Server-rendered, no JS) ─── */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Primary orb — top-center */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-primary-600/15 rounded-full blur-[140px] opacity-60" />
        {/* Accent orb — top-right */}
        <div className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[110px] opacity-50" />
        {/* Secondary orb — mid-left */}
        <div className="absolute top-[50%] left-[-10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] opacity-40" />
        {/* Bottom ambient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/08 rounded-full blur-[120px] opacity-30" />

        {/* Blueprint grid — ultra subtle */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="z-10 w-full container mx-auto px-6 flex flex-col items-center">
        <HeroSection isPt={isPt} />
        <FeaturesSection isPt={isPt} />
        <ProjectsSection isPt={isPt} />
        <ExperienceSection isPt={isPt} />
        <ContactSection isPt={isPt} />
      </div>

      {/* ─── Footer ─── */}
      <footer className="z-10 w-full border-t border-white/[0.05] mt-8 py-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>
            © {new Date().getFullYear()} Henrique Monteiro Cardoso. {isPt ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
          <p className="flex items-center gap-1.5">
            <span>{isPt ? "Feito com" : "Built with"}</span>
            <span className="text-primary-400/70">Next.js 15 · Convex · Framer Motion</span>
          </p>
        </div>
      </footer>
    </main>
  );
}

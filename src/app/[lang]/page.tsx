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
      {/* Premium Background Glow Effect (Server Rendered) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen opacity-40 translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="z-10 container mx-auto px-6 flex flex-col items-center">
        <HeroSection isPt={isPt} />
        <FeaturesSection isPt={isPt} />
        <ProjectsSection isPt={isPt} />
        <ExperienceSection isPt={isPt} />
        <ContactSection isPt={isPt} />
      </div>
    </main>
  );
}

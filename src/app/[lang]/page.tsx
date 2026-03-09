import { HeroSection as HeroModule } from '@/modules/hero/hero-section';
import { AboutModule } from '@/modules/about/about-section';
import { StackModule } from '@/modules/stack/stack-section';
import { ProjectsModule } from '@/modules/projects/projects-section';
import { ContactModule } from '@/modules/contact/contact-section';
import { FooterModule } from '@/modules/footer/footer-section';
import { Navbar } from '@/components/shared/Navbar';
import { ExperienceTimeline } from '@/sections/experience/ExperienceTimeline';

type Locale = 'pt' | 'en';

const dictionaries = {
  pt: () => import('../../locales/pt.json').then((module) => module.default),
  en: () => import('../../locales/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.pt();
};

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="relative min-h-screen text-[#FAFAFA] font-sans selection:bg-cobalt-blue/30 selection:text-white overflow-hidden">
      <Navbar dict={dict} lang={lang} />
      <HeroModule />
      <div className="bg-[#05070a]/80 backdrop-blur-3xl relative z-10 border-t border-white/5">
        <AboutModule />
        <StackModule />
        <ExperienceTimeline dict={dict} lang={lang} />
        <ProjectsModule />
        <ContactModule />
        <FooterModule />
      </div>
    </main>
  );
}

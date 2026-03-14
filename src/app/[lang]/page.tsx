import { HeroSection as HeroModule } from '@/modules/hero/hero-section';

import { Navbar } from '@/components/shared/Navbar';
import dynamic from 'next/dynamic';

const AboutModule = dynamic(() => import('@/modules/about/about-section').then((mod) => mod.AboutModule));
const StackModule = dynamic(() => import('@/modules/stack/stack-section').then((mod) => mod.StackModule));
const ProjectsModule = dynamic(() => import('@/modules/projects/projects-section').then((mod) => mod.ProjectsModule));
const ContactModule = dynamic(() => import('@/modules/contact/contact-section').then((mod) => mod.ContactModule));
const FooterModule = dynamic(() => import('@/modules/footer/footer-section').then((mod) => mod.FooterModule));
const ExperienceTimeline = dynamic(() => import('@/modules/experience/experience-section').then((mod) => mod.ExperienceTimeline));

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
      <div className="bg-background-primary/80 backdrop-blur-3xl relative z-10 border-t border-white/5">
        <AboutModule />
        <StackModule />
        <ExperienceTimeline dict={dict} />
        <ProjectsModule />
        <ContactModule />
        <FooterModule />
      </div>
    </main>
  );
}

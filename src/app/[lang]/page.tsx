import pt from '../../locales/pt.json';
import en from '../../locales/en.json';
import { HeroSection } from '@/sections/hero/HeroSection';
import { Navbar } from '@/components/shared/Navbar';
import { AboutSection } from '@/sections/about/AboutSection';
import { ExperienceTimeline } from '@/sections/experience/ExperienceTimeline';
import { ProjectsSection } from '@/sections/projects/ProjectsSection';
import { ContactSection } from '@/sections/contact/ContactSection';

type Locale = 'pt' | 'en';

const dictionaries = {
  pt,
  en,
};

export const getDictionary = (locale: Locale) => dictionaries[locale] ?? dictionaries.pt;

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-[#FAFAFA] font-sans selection:bg-[#FAFAFA] selection:text-[#0A0A0A]">
      <Navbar dict={dict} lang={params.lang} />
      <HeroSection dict={dict} lang={params.lang} />
      <AboutSection dict={dict} lang={params.lang} />
      <ExperienceTimeline dict={dict} lang={params.lang} />
      <ProjectsSection dict={dict} />
      <ContactSection dict={dict} />
    </main>
  );
}

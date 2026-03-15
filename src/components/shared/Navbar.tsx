'use client';
import type { Dictionary } from '@/types/dictionary';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar({ dict, lang }: { dict: Dictionary; lang: string }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Otimização de render: Apenas atualiza quando ultrapassa a marca de 50px
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track active section for clear visual hierarchy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    // Configuração de threshold otimizada para identificar qual seção está primordialmente no viewport
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-20% 0px -75% 0px", // Gatilho ajustado para quando o elemento se aproxima do topo
      threshold: 0,
    };

    const sections = ['about', 'experience', 'projects', 'stack', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const LinksList = [
    { name: dict.Navigation.about, href: `/${lang}#about`, id: 'about' },
    { name: dict.Navigation.experience, href: `/${lang}#experience`, id: 'experience' },
    { name: dict.Navigation.projects, href: `/${lang}#projects`, id: 'projects' },
  ];

  // Navegação imediata e calculada sem depender do roteamento pesado
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 80 : 100; // Compensar a altura da navbar fixa
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth' 
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[92%] max-w-4xl transition-all duration-300 ease-out rounded-full ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] py-3 px-6'
            : 'bg-black/40 backdrop-blur-md border border-white/10 shadow-lg py-4 px-6'
        }`}
      >
        <nav className="flex items-center justify-between w-full text-sm font-medium">
          <Link 
            href={`/${lang}`} 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsOpen(false);
            }}
            className="font-heading font-black tracking-tighter text-white text-xl md:text-2xl uppercase hover:opacity-80 transition-opacity"
            aria-label="Página Inicial"
          >
            HMC.
          </Link>
          
          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-zinc-400">
            {LinksList.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="relative">
                  <a 
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className={`transition-colors duration-200 font-sans tracking-wide text-xs uppercase font-bold ${
                      isActive ? 'text-white' : 'hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                  {isActive && (
                     <motion.div 
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#22D3EE] rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                     />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={`/${lang}#contact`}
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="hidden md:inline-flex px-6 py-2.5 bg-[#2563EB] text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#3B82F6] transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              {dict.Navigation.contact}
            </a>

            {/* Mobile Toggle Button */}
            <button 
              className="md:hidden p-2 text-white hover:text-[#22D3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 px-6 md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 w-full text-center">
              {LinksList.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="w-full">
                    <a 
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.id)}
                      className={`block w-full py-4 text-2xl font-heading font-bold uppercase tracking-widest transition-colors ${
                        isActive ? 'text-[#22D3EE]' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
              <li className="w-full mt-4">
                 <a
                    href={`/${lang}#contact`}
                    onClick={(e) => handleScrollTo(e, 'contact')}
                    className="flex justify-center w-full px-8 py-4 bg-[#2563EB] text-white rounded-full font-bold text-sm uppercase tracking-widest active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
                  >
                    {dict.Navigation.contact}
                  </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';
import type { Dictionary } from '@/types/dictionary';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function Navbar({ dict, lang }: { dict: Dictionary; lang: string }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const Links = [
    { name: dict.Navigation.about, href: `/${lang}#about` },
    { name: dict.Navigation.experience, href: `/${lang}#experience` },
    { name: dict.Navigation.projects, href: `/${lang}#projects` },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/5 shadow-2xl rounded-full px-6 py-3'
          : 'bg-transparent px-6 py-4'
      }`}
    >
      <nav className="flex items-center gap-8 text-sm font-medium">
        <Link href={`/${lang}`} className="font-mono font-bold tracking-tight text-white mr-4">
          HMC.
        </Link>
        
        <ul className="hidden md:flex items-center gap-6 text-[#A1A1AA]">
          {Links.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href} 
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/${lang}#contact`}
          className="ml-4 px-4 py-2 bg-white text-black rounded-full font-semibold text-xs hover:bg-white/90 transition-transform active:scale-95"
        >
          {dict.Navigation.contact}
        </Link>
      </nav>
    </motion.header>
  );
}

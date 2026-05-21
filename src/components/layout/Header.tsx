"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Code2, Globe } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Header({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPt = lang === "pt";
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = [
    { name: isPt ? "Início" : "Home", href: `/${lang}` },
    { name: isPt ? "Projetos" : "Projects", href: `#projects` },
    { name: isPt ? "Experiência" : "Experience", href: `#experience` },
    { name: isPt ? "Contato" : "Contact", href: `#contact` },
  ];

  const toggleLang = () => {
    const newLang = isPt ? "en" : "pt";
    // Replaces the current lang segment in the pathname
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full pt-5 px-6 pointer-events-none"
      role="banner"
    >
      <motion.nav
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-6 px-4 py-2.5 border rounded-full shadow-lg transition-all duration-300",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-white/[0.08] shadow-black/30"
            : "bg-black/30 backdrop-blur-md border-white/[0.06] shadow-transparent"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full px-2 py-1 transition-opacity hover:opacity-70"
          aria-label="Home"
        >
          <div className="p-1.5 rounded-lg bg-primary-500/15 text-primary-400">
            <Code2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-bold tracking-tight text-sm text-white">HMC.</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-0.5" role="list">
          {navLinks.map((link) => {
            const isActive = link.href === `/${lang}` && pathname === `/${lang}`;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:text-white hover:bg-white/[0.06]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Lang Toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label={isPt ? "Switch to English" : "Mudar para Português"}
          title={isPt ? "Switch to English" : "Mudar para Português"}
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isPt ? "EN" : "PT"}</span>
        </button>
      </motion.nav>
    </header>
  );
}

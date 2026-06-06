"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Code2, Globe, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface HeaderProps {
  lang: string;
  dict: {
    home: string;
    projects: string;
    experience: string;
    contact: string;
    switchLang: string;
    statusBadge?: string;
  };
}

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isPt = lang === "pt";
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const isAdminOrLogin = pathname?.includes("/admin") || pathname?.includes("/login");
  if (isAdminOrLogin) {
    return null;
  }

  const navLinks = [
    { name: dict.home, href: `/${lang}` },
    { name: dict.projects, href: `#projects` },
    { name: dict.experience, href: `#experience` },
    { name: dict.contact, href: `#contact` },
  ];

  const toggleLang = () => {
    const newLang = isPt ? "en" : "pt";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
    setIsMenuOpen(false);
  };

  const statusText = dict.statusBadge || (isPt ? "Disponível para projetos" : "Available for projects");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full pt-5 px-6 pointer-events-none"
        role="banner"
      >
        <motion.nav
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-6 px-4 py-2 border rounded-full shadow-lg transition-all duration-300 ease-out-expo will-change-transform transform w-full max-w-5xl",
            scrolled
              ? "bg-surface-l1/80 backdrop-blur-xl border-white/8 shadow-black/30"
              : "bg-surface-l1/45 backdrop-blur-md border-white/8 shadow-transparent"
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link
            href={`/${lang}`}
            data-cursor-hover
            className="flex items-center gap-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full px-2 py-1 transition-opacity hover:opacity-70"
            aria-label="Home"
          >
            <div className="p-1.5 rounded-lg bg-primary-500/15 text-primary-400">
              <Code2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="font-bold tracking-tight text-sm text-white">HMC.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2" role="list">
            {navLinks.map((link) => {
              const isActive = link.href === `/${lang}` && pathname === `/${lang}`;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    data-cursor-hover
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                      isActive ? "transition-all duration-200 ease-out-expo" : "",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/55 hover:text-white hover:bg-white/6"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right Panel (Lang + Status) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/8 text-[10px] font-mono text-white/60 tracking-wider">
              <span className="relative flex h-1.5 w-1.5 animate-pulse">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>{statusText.toUpperCase()}</span>
            </div>

            {/* Lang Toggle */}
            <button
              onClick={toggleLang}
              data-cursor-hover
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/50 hover:text-white hover:bg-white/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
              aria-label={dict.switchLang}
              title={dict.switchLang}
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isPt ? "EN" : "PT"}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-cursor-hover
            className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-32 px-8 pb-12"
          >
            <nav className="flex flex-col gap-6 justify-between h-full">
              <ul className="flex flex-col gap-4 text-left" role="list">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-2xl font-bold tracking-tight text-white hover:text-primary-300 transition-colors"
                    >
                      <span className="font-mono text-xs text-primary-400 mr-2">0{idx + 1}</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                {/* Status indicator */}
                <div className="flex items-center gap-3 text-xs font-mono text-white/60 tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>{statusText.toUpperCase()}</span>
                </div>

                {/* Lang Toggle */}
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 self-start px-4 py-2 border border-white/10 rounded-full text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label={dict.switchLang}
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                  <span>{isPt ? "English" : "Português"}</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
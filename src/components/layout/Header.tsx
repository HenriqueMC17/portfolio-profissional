"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { Code2, Globe } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

interface HeaderProps {
  lang: string;
  dict: {
    home: string;
    projects: string;
    experience: string;
    contact: string;
    switchLang: string;
  };
}

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isPt = lang === "pt";
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Não renderizar o cabeçalho público em páginas administrativas ou de login
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
          "pointer-events-auto flex items-center justify-between gap-6 px-4 py-2 border rounded-full shadow-lg transition-all duration-300 ease-out-expo will-change-transform transform [transform:translateZ(0)]",
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
          className="flex items-center gap-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full px-2 py-1 transition-opacity hover:opacity-70"
          aria-label="Home"
        >
          <div className="p-1.5 rounded-lg bg-primary-500/15 text-primary-400">
            <Code2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-bold tracking-tight text-sm text-white">HMC.</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-2" role="list">
          {navLinks.map((link) => {
            const isActive = link.href === `/${lang}` && pathname === `/${lang}`;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
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

        {/* Lang Toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/50 hover:text-white hover:bg-white/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
          aria-label={dict.switchLang}
          title={dict.switchLang}
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{isPt ? "EN" : "PT"}</span>
        </button>
      </motion.nav>
    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { Code2 } from "lucide-react";

export function Header({ lang }: { lang: string }) {
  const pathname = usePathname();
  const isPt = lang === "pt";

  const navLinks = [
    { name: isPt ? "Início" : "Home", href: `/${lang}` },
    { name: isPt ? "Sobre" : "About", href: `/${lang}/about` },
    { name: isPt ? "Projetos" : "Projects", href: `/${lang}/projects` },
    { name: isPt ? "Contato" : "Contact", href: `/${lang}/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full mt-6 px-6 pointer-events-none">
      <nav 
        className="pointer-events-auto flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
        aria-label="Main Navigation"
      >
        <Link 
          href={`/${lang}`} 
          className="flex items-center gap-2 mr-8 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md px-2 py-1 transition-colors hover:text-primary-400"
          aria-label="Home"
        >
          <Code2 className="w-5 h-5" aria-hidden="true" />
          <span className="font-semibold tracking-tight text-sm">HMC.</span>
        </Link>

        <ul className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

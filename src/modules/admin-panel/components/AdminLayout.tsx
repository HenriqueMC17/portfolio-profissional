"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AdminLayout({ children, lang }: { children: React.ReactNode; lang: string }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/${lang}/login`);
    }
  }, [isLoading, isAuthenticated, router, lang]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-white/10 bg-black/20 p-6 hidden md:block">
        <h2 className="text-xl font-bold text-white mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-primary-400 font-medium bg-primary-900/20 px-4 py-2 rounded-md">
            Visão Geral
          </a>
          <a href="#" className="block text-muted-foreground hover:text-white px-4 py-2 transition-colors">
            Projetos
          </a>
          <a href="#" className="block text-muted-foreground hover:text-white px-4 py-2 transition-colors">
            Mensagens / Leads
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

"use client";

import { useConvexAuth } from "convex/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2, LayoutDashboard, Mail, FolderGit, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";

export function AdminLayout({ children, lang }: { children: React.ReactNode; lang: string }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuthActions();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/${lang}/login`);
    }
  }, [isLoading, isAuthenticated, router, lang]);

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${lang}/login`);
  };

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

  const isAdminHome = pathname === `/${lang}/admin`;
  const isLeads = pathname === `/${lang}/admin/leads`;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/20 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-8 tracking-tight">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              href={`/${lang}/admin`}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isAdminHome
                  ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </Link>

            <Link
              href={`/${lang}/admin/leads`}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isLeads
                  ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                  : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Mensagens / Leads</span>
            </Link>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-white/5">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all border border-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
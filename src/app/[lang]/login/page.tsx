"use client";

import { use, useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuthActions();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await signIn("password", { password, flow: "signIn" });
      router.push(`/${lang}/admin`);
    } catch {
      setError("Senha incorreta ou erro de autenticação.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md bg-secondary/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h1>
          <p className="text-muted-foreground">Área administrativa do portfólio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Senha de Acesso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

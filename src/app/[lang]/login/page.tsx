'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SectionContainer } from '@/components/layout/section-container'
import { Button } from '@/components/ui/button'
import { useAuthActions } from "@convex-dev/auth/react";

export default function LoginPage({ params }: { params: { lang: string } }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuthActions();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await signIn("password", { email, password, flow: "signIn" });
      router.push(`/${params.lang}/admin`);
      router.refresh();
    } catch {
      setError("Invalid email or password");
      setIsLoading(false);
    }
  }

  return (
    <SectionContainer className="pt-32 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-3xl bg-black/40 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6 text-foreground text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-white/30 focus:ring-1 focus:ring-white/30 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" disabled={isLoading} className="w-full rounded-xl mt-4 border-white/20 hover:bg-white inset-ring inset-ring-white/10 text-white bg-white/10 mix-blend-screen py-6">
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </SectionContainer>
  )
}

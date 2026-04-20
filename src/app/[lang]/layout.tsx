import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/shared/Providers";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Henrique Monteiro Cardoso",
    default: "Henrique Monteiro Cardoso - Senior Fullstack Engineer",
  },
  description: "Senior Fullstack Engineer specializing in modern web architecture, robust backend systems, and premium UI/UX design.",
  keywords: ["Software Engineer", "Fullstack", "Next.js", "React", "Node.js", "TypeScript", "Convex"],
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Providers>
          <Header lang={lang} />
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

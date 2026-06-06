import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/shared/Providers";
import { Header } from "@/components/layout/Header";
import { getDictionary } from "@/dictionaries";
import { AiAssistant } from "@/modules/ai-chatbot/components/AiAssistant";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "@/styles/globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Henrique Monteiro Cardoso",
    default: "Henrique Monteiro Cardoso | Senior Fullstack Engineer",
  },
  description:
    "Senior Fullstack Engineer specializing in scalable architectures, high-performance web systems, AI-native development, and premium UI/UX.",
  keywords: [
    "Software Engineer",
    "Fullstack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "AI Engineering",
    "Clean Architecture",
    "Convex",
    "Henrique Monteiro Cardoso",
  ],
  authors: [{ name: "Henrique Monteiro Cardoso", url: "https://henriquemonteiro.dev" }],
  creator: "Henrique Monteiro Cardoso",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Henrique Monteiro Cardoso | Senior Fullstack Engineer",
    description:
      "Building scalable systems, high-performance web experiences, and cloud-native architectures.",
    siteName: "Henrique Monteiro Cardoso",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso | Senior Fullstack Engineer",
    description:
      "Building scalable systems, high-performance web experiences, and cloud-native architectures.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <CustomCursor />
        <div className="noise-overlay" aria-hidden="true" />
        <Providers>
          <Header lang={lang} dict={dict.header} />
          {children}
          <AiAssistant />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
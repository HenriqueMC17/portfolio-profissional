import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/shared/Providers";
import { Header } from "@/components/layout/Header";
import { getDictionary } from "@/dictionaries";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === "pt";

  const title = isPt
    ? "Henrique Monteiro Cardoso | Desenvolvedor Full Stack"
    : "Henrique Monteiro Cardoso | Full Stack Developer";

  const description = isPt
    ? "Desenvolvedor Full Stack focado em arquiteturas escaláveis (Clean Architecture, FSD), interfaces de alto desempenho e design de alta fidelidade (Premium UI/UX)."
    : "Full Stack Developer specializing in scalable architectures (Clean Architecture, FSD), high-performance web systems, and high-fidelity design (Premium UI/UX).";

  const keywords = [
    "Software Engineer",
    "Desenvolvedor Fullstack",
    "Fullstack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Clean Architecture",
    "FSD",
    "Convex",
    "Henrique Monteiro Cardoso",
  ];

  return {
    title: {
      template: "%s | Henrique Monteiro Cardoso",
      default: title,
    },
    description,
    keywords,
    authors: [{ name: "Henrique Monteiro Cardoso", url: "https://henriquemonteiro.dev" }],
    creator: "Henrique Monteiro Cardoso",
    openGraph: {
      type: "website",
      locale: isPt ? "pt_BR" : "en_US",
      title,
      description,
      siteName: "Henrique Monteiro Cardoso",
      url: `https://henriquemonteiro.dev/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
}

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
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

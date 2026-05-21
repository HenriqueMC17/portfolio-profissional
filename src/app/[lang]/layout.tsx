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
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Henrique Monteiro Cardoso",
    default: "Henrique Monteiro Cardoso — Senior Fullstack Engineer",
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
    title: "Henrique Monteiro Cardoso — Senior Fullstack Engineer",
    description:
      "Building scalable systems, high-performance web experiences, and cloud-native architectures.",
    siteName: "Henrique Monteiro Cardoso",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso — Senior Fullstack Engineer",
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

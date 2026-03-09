import '../globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

import dynamic from 'next/dynamic';
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";

const DynamicParticles = dynamic(() => import('@/components/three/particles-background').then(mod => mod.ParticlesBackground), { ssr: false });
const DynamicAiWidget = dynamic(() => import('@/modules/ai-assistant/ai-chat-widget').then(mod => mod.AiChatWidget), { ssr: false });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Henrique Monteiro Cardoso | Software Engineer',
    template: '%s | Henrique Monteiro Cardoso',
  },
  description: 'Desenvolvedor Full Stack especializado em arquitetura escalável (Clean Arch), design systems e interfaces premium de altíssimo desempenho.',
  openGraph: {
    title: 'Henrique M. Cardoso | Engenheiro de Software Sênior',
    description: 'Transformando ideias complexas em plataformas web com UI/UX cinematográficos.',
    url: 'https://henriquemonteiro.dev',
    siteName: 'Portfólio de Henrique Monteiro Cardoso',
    images: [
      {
        url: 'https://henriquemonteiro.dev/og/share-min.png',
        width: 1200,
        height: 630,
        alt: 'Henrique Monteiro Cardoso - Portfolio Preview'
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henrique M. Cardoso | Engenheiro de Software',
    description: 'Engenharia Front e Back-End com foco pragmático e performático.',
    images: ['https://henriquemonteiro.dev/og/share-min.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <SmoothScrollProvider>
          {children}
          <DynamicParticles />
          <DynamicAiWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

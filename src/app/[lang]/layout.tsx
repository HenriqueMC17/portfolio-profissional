import '../globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Henrique Monteiro Cardoso | Full Stack Developer',
  description: 'Engenharia de software, arquitetura escalável e interfaces premium.',
};

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0A0A0A] text-[#FAFAFA]`}>
        {children}
      </body>
    </html>
  );
}

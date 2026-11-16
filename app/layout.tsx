import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  description:
    'Projetos, pesquisa e trajetória de Luigi Scofano de Araujo, graduando em Engenharia de Computação na Poli-USP. Inteligência artificial, dados e software.',
  metadataBase: new URL('https://luigiscofano.github.io/portfolio/'),
  icons: {
    icon: [
      { url: '/portfolio/favicon.ico', sizes: '16x16 32x32 48x48' },
      {
        url: '/portfolio/favicon.svg?v=bem-te-vi',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        url: '/portfolio/icons/bem-te-vi-16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

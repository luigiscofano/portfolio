import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  description: "Projetos, pesquisa e trajetória de Luigi Scofano de Araujo, graduando em Engenharia de Computação na Poli-USP. Inteligência artificial, dados e software.",
  metadataBase: new URL("https://luigiscofano.github.io/portfolio/"),
  icons: { icon: "/portfolio/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

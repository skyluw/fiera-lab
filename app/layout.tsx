import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiera Lab",
  description: "Fiera Lab es el laboratorio donde la estrategia se vuelve brutal y la creatividad incomoda al mercado. Agencia BTL para marcas que quieren crecer en serio. Próximamente..",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Fiera Lab",
    description: "Fiera Lab es el laboratorio donde la estrategia se vuelve brutal y la creatividad incomoda al mercado. Agencia BTL para marcas que quieren crecer en serio. Próximamente.",
    url: "https://www.fieralab.pe",
    siteName: "Fiera Lab",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fiera Lab — Agencia BTL",
      }
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiera Lab",
    description: "Fiera Lab es el laboratorio donde la estrategia se vuelve brutal y la creatividad incomoda al mercado. Agencia BTL para marcas que quieren crecer en serio. Próximamente.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
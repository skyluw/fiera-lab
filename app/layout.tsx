import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiera Lab ",
  description:
    "Fiera Lab crea experiencias, activaciones y producciones BTL con impacto real.",
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
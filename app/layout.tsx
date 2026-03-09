import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BORSE · EP · Concepto Visual",
  description: "Presentacion visual del EP Los cuatro enemigos para Borse.",
  icons: {
    icon: "/img/favi/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

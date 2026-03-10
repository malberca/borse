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
  const bodyClassName = process.env.NODE_ENV === "development" ? "devScalePreview" : undefined;

  return (
    <html lang="es">
      <body className={bodyClassName}>{children}</body>
    </html>
  );
}

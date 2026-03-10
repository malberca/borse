import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";

const manuscriptBody = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-manuscript-body",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manuscriptDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-manuscript-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "BORSE · El Libro del Camino",
  description: "Manuscrito conceptual del EP de BORSE.",
};

export default function ManuscritoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${manuscriptBody.variable} ${manuscriptDisplay.variable}`}>{children}</div>;
}

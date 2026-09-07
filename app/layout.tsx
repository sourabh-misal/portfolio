import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sourabh Misal | Full Stack & AI Engineer",
  description:
    "Full Stack & AI Engineer with 3+ years building high-scale distributed systems and intelligent automation on Microsoft Azure. IIT Tirupati graduate. Currently at HCLTech, Bengaluru.",
  keywords: [
    "Sourabh Misal",
    "Full Stack Engineer",
    "AI Engineer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Azure",
    "Node.js",
    "HCLTech",
    "IIT Tirupati",
    "Portfolio",
    "Machine Learning",
    "NLP",
  ],
  authors: [{ name: "Sourabh Misal" }],
  openGraph: {
    title: "Sourabh Misal | Full Stack & AI Engineer",
    description:
      "Full Stack & AI Engineer at HCLTech. 3+ years building enterprise platforms on Azure with 20x delivery ROI.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

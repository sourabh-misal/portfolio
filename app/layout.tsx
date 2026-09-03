import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Sourabh Misal | Senior Full Stack Developer",
  description:
    "Senior Full Stack Developer with 3+ years driving products end-to-end — from architecture to production on Azure. IIT Tirupati graduate. Currently at HCLTech, Pune.",
  keywords: [
    "Sourabh Misal",
    "Senior Full Stack Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Azure",
    "Node.js",
    "HCLTech",
    "IIT Tirupati",
    "Portfolio",
  ],
  authors: [{ name: "Sourabh Misal" }],
  openGraph: {
    title: "Sourabh Misal | Senior Full Stack Developer",
    description:
      "Senior Full Stack Developer at HCLTech. 3+ years building enterprise platforms on Azure.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-url";


/* 🌿 Japandi Fonts */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Jasmine Home",
    template: "%s | Jasmine Home",
  },
  description: "Curated rentals and homes for sale in the Philippines, with a calmer way to browse, compare, and inquire.",
  openGraph: {
    title: "Jasmine Home",
    description: "Curated rentals and homes for sale in the Philippines.",
    url: "/",
    siteName: "Jasmine Home",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasmine Home",
    description: "Curated rentals and homes for sale in the Philippines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

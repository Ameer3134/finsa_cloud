import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { site } from "@/lib/site";
import "./globals.css";

// Fonts from your globals.css: Inter for text, Poppins for headings.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: { default: "FINSA Cloud | Finance Students’ Association, Unilorin", template: "%s | FINSA Cloud" },
  description: site.description,
};

// Every page checks the login on each visit, so nothing is saved and shown to the wrong person.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <AnnouncementBanner />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

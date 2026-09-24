import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BagDrawer from "@/components/BagDrawer";
import { business } from "@/content/site";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${business.name} — ${business.tagline}`,
  description: business.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <BagDrawer />
        </Providers>
      </body>
    </html>
  );
}

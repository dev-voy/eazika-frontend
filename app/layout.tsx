import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EAZIKA – Shop Instantly, Live Effortlessly",
  description:
    "Experience the future of shopping with EAZIKA. Discover, order, and own your favorite products in just 10 minutes. No waiting, just EAZIKA.",
  openGraph: {
    title: "EAZIKA – Shop Instantly, Live Effortlessly",
    description:
      "EAZIKA revolutionizes shopping: lightning-fast delivery, curated products, and a seamless experience. Get what you want, when you want it.",
    url: "https://eazika.com",
    siteName: "EAZIKA",
    images: [
      {
        url: "https://eazika.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "EAZIKA – Shop Instantly, Live Effortlessly",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
export default RootLayout;

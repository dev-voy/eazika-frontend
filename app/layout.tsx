import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eazika - Shop Instantly, Live Effortlessly",
    template: "%s | Eazika",
  },
  description:
    "Experience the future of shopping with EAZIKA. Discover, order, and own your favorite products in just 10 minutes. Fast delivery, quality products, and seamless shopping experience in India.",
  keywords: [
    "Eazika",
    "online shopping",
    "fast delivery",
    "10 minute delivery",
    "instant shopping",
    "groceries",
    "e-commerce",
    "quick commerce",
    "online store",
    "shop online India",
    "instant delivery",
    "buy online",
    "shopping app",
    "fast shopping",
  ],
  authors: [{ name: "Eazika Team" }],
  creator: "Eazika",
  publisher: "Eazika",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eazika.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Eazika - Shop Instantly, Live Effortlessly",
    description:
      "EAZIKA revolutionizes shopping with lightning-fast 10-minute delivery, curated products, and a seamless experience. Get what you want, when you want it across India.",
    url: "https://eazika.com",
    siteName: "Eazika",
    images: [
      {
        url: "https://eazika.com/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "EAZIKA - Shop Instantly, Live Effortlessly | Fast Delivery E-commerce",
      },
      {
        url: "https://eazika.com/logo/og-image-square.png",
        width: 600,
        height: 600,
        alt: "Eazika Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
    countryName: "India",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  category: "technology",
  classification: "E-commerce, Shopping, Quick Commerce",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const getAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Eazika",
    alternateName: "Eazika - Shop Instantly, Live Effortlessly",
    url: "https://eazika.com",
    logo: "https://eazika.com/logo.png",
    description:
      "EAZIKA is India's fastest e-commerce platform delivering groceries and essentials in just 10 minutes. Shop instantly, live effortlessly.",
    sameAs: ["https://www.instagram.com/eazika.india"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 8767731887",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Maharashtra",
      addressLocality: "Nagpur",
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Eazika" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Google tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${getAnalyticsId}`}
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${getAnalyticsId}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
export default RootLayout;

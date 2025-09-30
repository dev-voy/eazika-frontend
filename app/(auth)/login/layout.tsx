import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Login - Eazika",
    template: "%s | Eazika",
  },
  description:
    "Access your Eazika account to enjoy fast and seamless shopping with instant delivery. Eazika offers a user-friendly platform where you can browse a wide range of products, track your orders in real-time, and benefit from exclusive deals and discounts. Logging in ensures a personalized shopping experience, secure transactions, and quick support whenever you need it. Join thousands of satisfied customers who trust Eazika for their everyday shopping needs.",

  keywords: [
    "Eazika",
    "login",
    "sign in",
    "account access",
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
    canonical: "/login",
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
    title: "Login - Eazika",
    description:
      "Access your Eazika account to enjoy fast and seamless shopping with instant delivery. Eazika offers a user-friendly platform where you can browse a wide range of products, track your orders in real-time, and benefit from exclusive deals and discounts. Logging in ensures a personalized shopping experience, secure transactions, and quick support whenever you need it. Join thousands of satisfied customers who trust Eazika for their everyday shopping needs.",
    url: "https://eazika.com/login",
    siteName: "Eazika",
    images: [
      {
        url: "https://eazika.com/logo/og-image.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://eazika.com/logo/og-image.png",
        width: 1800,
        height: 1600,
        alt: "Eazika",
      },
    ],
    locale: "en-IN",
    type: "website",
  },
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default LoginLayout;

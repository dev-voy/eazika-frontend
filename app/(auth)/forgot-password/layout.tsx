import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Forgot Password - Eazika",
    template: "%s | Eazika",
  },
  description:
    "Reset your Eazika account password to regain access and continue enjoying fast and seamless shopping with instant delivery. Eazika offers a user-friendly platform where you can browse a wide range of products, track your orders in real-time, and benefit from exclusive deals and discounts. Resetting your password ensures a personalized shopping experience, secure transactions, and quick support whenever you need it. Join thousands of satisfied customers who trust Eazika for their everyday shopping needs.",
  keywords: [
    "Eazika",
    "forgot password",
    "reset password",
    "account recovery",
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
    canonical: "/forgot-password",
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
    title: "Forgot Password - Eazika",
    description:
      "Reset your Eazika account password to regain access and continue enjoying fast and seamless shopping with instant delivery. Eazika offers a user-friendly platform where you can browse a wide range of products, track your orders in real-time, and benefit from exclusive deals and discounts. Resetting your password ensures a personalized shopping experience, secure transactions, and quick support whenever you need it. Join thousands of satisfied customers who trust Eazika for their everyday shopping needs.",
    url: "https://eazika.com/forgot-password",
    siteName: "Eazika",
    locale: "en-IN",
    type: "website",
  },
  // --- IGNORE ---
  // countryName: "India",
  // --- IGNORE ---
};

function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default ForgotPasswordLayout;

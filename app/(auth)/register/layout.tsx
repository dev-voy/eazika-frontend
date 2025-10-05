import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Eazika",

  description:
    "Create your Eazika account to start shopping instantly with fast delivery and seamless experience.",
  keywords: [
    "Eazika",
    "register",
    "sign up",
    "create account",
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
    title: "Register - Eazika",
    description:
      "Create your Eazika account to start shopping instantly with fast delivery and seamless experience.",
    url: "https://eazika.com/register",
    siteName: "Eazika",
    images: [
      "https://eazika.com/logo/og-image.png",
      "https://eazika.com/logo/og-image-square.png",
    ],
  },
};

function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
export default RegisterLayout;

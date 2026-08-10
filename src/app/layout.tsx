import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#1e3a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zotdor.uz"),
  title: "Zotdor.uz — Chorvani sotish va sotib olish",
  description:
    "O'zbekistonning istalgan nuqtasidan — qoramol, qo'y-echki, ot va boshqa chorva mollari. Sotuvchi ham, xaridor ham bir joyda.",
  keywords: [
    "Zotdor",
    "Zotdor.uz",
    "chorva bozori",
    "qoramol sotish",
    "sigir sotib olish",
    "buqa narxi",
    "hisor qo'ylari",
    "chorvachilik uzbekistan",
  ],
  authors: [{ name: "Zotdor.uz Team" }],
  openGraph: {
    title: "Zotdor.uz — Chorvani sotish va sotib olish",
    description:
      "O'zbekistonning istalgan nuqtasidan — qoramol, qo'y-echki, ot va boshqa chorva mollari. Sotuvchi ham, xaridor ham bir joyda.",
    url: "https://zotdor.uz",
    siteName: "Zotdor.uz",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/ad_poster.png",
        width: 1200,
        height: 630,
        alt: "Zotdor.uz — Chorvani sotish va sotib olish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zotdor.uz — Chorvani sotish va sotib olish",
    description:
      "O'zbekistonning istalgan nuqtasidan — qoramol, qo'y-echki, ot va boshqa chorva mollari. Sotuvchi ham, xaridor ham bir joyda.",
    images: ["/ad_poster.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#eef2dc] text-[#1e3a0f] antialiased selection:bg-[#3d6b2e] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

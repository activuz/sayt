import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#1b3e2b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Zotdor.uz — Чорвани сотиш ва сотиб олиш",
  description:
    "Ўзбекистоннинг исталган нуқтасидан — қорамол, қўй-эчки, от ва бошқа чорва моллари. Сотувчи ҳам, харидор ҳам бир жойда.",
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
    title: "Zotdor.uz — Чорвани сотиш ва сотиб олиш",
    description:
      "Ўзбекистоннинг исталган нуқтасидан — қорамол, қўй-эчки, от ва бошқа чорва моллари. Сотувчи ҳам, харидор ҳам бир жойда.",
    url: "https://zotdor.uz",
    siteName: "Zotdor.uz",
    locale: "uz_UZ",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
      <body className="bg-[#f7f4ee] text-[#1c261e] antialiased selection:bg-[#1b3e2b] selection:text-white font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

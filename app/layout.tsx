import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "秋に会おう | Aki ni Aou",
  description:
    "冬に出会って、夏にまた会えて。次は秋だね。さーちゃんとくーちゃん、ふたりだけの小さな物語。",

  icons: {
    icon: "/favicon.svg",
  },

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "秋に会おう | Aki ni Aou",
    description:
      "冬に出会って、夏にまた会えて。次は秋だね。さーちゃんとくーちゃん、ふたりだけの小さな物語。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, Onest } from "next/font/google";
import { KitCssGate } from "@/components/pages/home/kit-css-gate";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kerjakita · Lowongan kerja yang cocok di Indonesia",
  description:
    "Cari lowongan yang cocok dengan keahlianmu. Lamar dengan CV, portofolio, dan skor kecocokan yang jujur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-type="software"
      data-radius="soft"
      data-buttons="pill"
      data-motion="on"
      className={`${onest.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <KitCssGate />
        <Script id="m-enter" strategy="beforeInteractive">
          {`document.documentElement.classList.add('m-enter');setTimeout(function(){document.documentElement.classList.add('m-enter-done')},700)`}
        </Script>
        <Script id="mo-js" strategy="beforeInteractive">
          {`document.documentElement.classList.add('mo-js');setTimeout(function(){document.documentElement.classList.add('mo-safe')},2500)`}
        </Script>
        {children}
      </body>
    </html>
  );
}

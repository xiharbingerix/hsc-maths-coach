import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: {
    default: "Nova Maths",
    template: "%s | Nova Maths",
  },
  description:
    "Stage 6 maths support with a Year 12 Advanced diagnostic and online learning pathways for available Year 11 and Year 12 courses.",
  openGraph: {
    title: "Nova Maths",
    description:
      "Stage 6 maths support with a Year 12 Advanced diagnostic and online learning pathways for available Year 11 and Year 12 courses.",
    type: "website",
  },
  icons: {
    icon: "/brand/nova-maths-icon.png",
    shortcut: "/brand/nova-maths-icon.png",
    apple: "/brand/nova-maths-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18195883998"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18195883998');
          `}
        </Script>
      </body>
    </html>
  );
}

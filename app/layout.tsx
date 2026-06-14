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
    "Structured online maths lessons for NSW secondary students from Year 8 to HSC.",
  openGraph: {
    title: "Nova Maths",
    description:
      "Structured online maths lessons for NSW secondary students from Year 8 to HSC.",
    url: "https://www.novamaths.com.au",
    siteName: "Nova Maths",
    type: "website",
    images: [
      {
        url: "https://www.novamaths.com.au/brand/nova-maths-og.png",
        width: 1200,
        height: 630,
        alt: "Nova Maths",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Maths",
    description:
      "Structured online maths lessons for NSW secondary students from Year 8 to HSC.",
    images: ["https://www.novamaths.com.au/brand/nova-maths-og.png"],
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
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "AW-18195883998"}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18195883998');
            ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');` : ""}
          `}
        </Script>
      </body>
    </html>
  );
}

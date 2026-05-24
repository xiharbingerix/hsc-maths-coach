import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: {
    default: "HSC Maths Coach",
    template: "%s | HSC Maths Coach",
  },
  description:
    "Stage 6 maths support with a Year 12 Advanced diagnostic and online learning pathways for available Year 11 and Year 12 courses.",
  openGraph: {
    title: "HSC Maths Coach",
    description:
      "Stage 6 maths support with a Year 12 Advanced diagnostic and online learning pathways for available Year 11 and Year 12 courses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

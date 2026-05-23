import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: {
    default: "HSC Maths Coach",
    template: "%s | HSC Maths Coach",
  },
  description:
    "Diagnostic-led HSC Maths Advanced revision with targeted lessons, guided practice, and mastery quizzes.",
  openGraph: {
    title: "HSC Maths Coach",
    description:
      "Diagnostic-led HSC Maths Advanced revision with targeted lessons, guided practice, and mastery quizzes.",
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

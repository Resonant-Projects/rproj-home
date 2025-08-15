import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keith Elliott - Link Tree",
  description:
    "Connect with me through my projects, newsletter, and social media.",
  generator: "v0.app",
  keywords: ["developer", "portfolio", "engineer", "projects", "social media"],
  authors: [{ name: "Keith Elliott" }],
  openGraph: {
    title: "Keith Elliott - Link Tree",
    description:
      "Connect with me through my projects, newsletter, and social media.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}

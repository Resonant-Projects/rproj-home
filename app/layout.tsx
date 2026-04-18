import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keith Elliott | Full-Stack Developer & Audio Engineer",
  description:
    "Explore Keith Elliott's projects in React, TypeScript, and audio engineering. View code, live demos, and creative tech work.",
  generator: "Next.js",
  keywords: [
    "Keith Elliott",
    "Full-Stack Developer",
    "Audio Engineer",
    "React Developer",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Keith Elliott", url: "https://resonantprojects.art" }],
  creator: "Keith Elliott",
  metadataBase: new URL("https://resonantprojects.art"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Keith Elliott | Full-Stack Developer & Audio Engineer",
    description:
      "Innovative full-stack projects, tech insights, and creative work. Connect across platforms and explore my developer portfolio.",
    type: "website",
    url: "https://resonantprojects.art",
    siteName: "Keith Elliott",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keith Elliott | Developer & Audio Engineer",
    description: "Projects. Insights. Creative tech work. Explore my portfolio.",
    creator: "@keithce",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Static JSON-LD for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://resonantprojects.art/#website",
                  url: "https://resonantprojects.art",
                  name: "Keith Elliott",
                  description: "Full-Stack Developer & Audio Engineer Portfolio",
                  publisher: { "@id": "https://resonantprojects.art/#person" },
                },
                {
                  "@type": "Person",
                  "@id": "https://resonantprojects.art/#person",
                  name: "Keith Elliott",
                  url: "https://resonantprojects.art",
                  jobTitle: "Full-Stack Developer & Audio Engineer",
                  description:
                    "Full-stack developer and audio engineer creating art that resonates in code, frequency, and color.",
                  image:
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-square-JrvbSWr4JHlotK5PNHLm0dhuHl462I.png",
                  sameAs: [
                    "https://github.com/keithce",
                    "https://linkedin.com/in/keithcelliott",
                    "https://twitter.com/keithce",
                  ],
                  knowsAbout: [
                    "Full-Stack Development",
                    "Audio Engineering",
                    "React",
                    "TypeScript",
                    "Rust",
                  ],
                },
                {
                  "@type": "ProfilePage",
                  mainEntity: { "@id": "https://resonantprojects.art/#person" },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={GeistSans.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}

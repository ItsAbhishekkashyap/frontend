import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Branqly | Smart URL Shortener',
    template: '%s | Branqly',
  },
  description: 'Shorten links, track performance, and optimize engagement with AshrtL.',
  alternates: {
    canonical: 'https://branqly.xyz',
  },

  icons: {
    icon: '/favicon.png', // Path from /public
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png', // Apple touch icon
    other: {
      rel: 'icon',
      url: '/favicon.ico', // Fallback for old browsers
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />


      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

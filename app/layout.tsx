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
    default: 'AshrtL | Smart URL Shortener',
    template: '%s | AshrtL',
  },
  description: 'Shorten links, track performance, and optimize engagement with AshrtL.',
  alternates: {
  canonical: 'https://ashrtl.xyz',
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
      <link rel="icon" href="/favicon.ico" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#ffffff" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

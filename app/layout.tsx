import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

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
    default: 'Branqly | All-in-One Link Management & Analytics Platform',
    template: '%s | Branqly',
  },
  description: 'Branqly lets you shorten links, generate QR codes, and track detailed analytics with CSV export. Perfect for marketers to optimize campaigns in one place.',
  alternates: {
    canonical: 'https://www.branqly.xyz/',
  },

  icons: {
    icon: '/favicon.png', 
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png', 
    other: {
      rel: 'icon',
      url: '/favicon.ico', 
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

        {/* Google Analytics - Global site tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-S1GPHQ64K4`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S1GPHQ64K4', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

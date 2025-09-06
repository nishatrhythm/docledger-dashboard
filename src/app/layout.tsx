import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const balooDa = Baloo_Da_2({
  variable: "--font-baloo-da",
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DocLedger Dashboard",
  description: "Document management and analytics dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${balooDa.variable} font-sans antialiased`}
      >
        <ClientOnly>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ClientOnly>
      </body>
    </html>
  );
}

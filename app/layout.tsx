import type { Metadata } from "next";
import { Anton, Geist, Inter_Tight } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import "./globals.css";

import { ChatBot } from "./_components/chat-bot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIT.AI",
  description: "O app que vai transformar a forma como você treina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${interTight.variable} ${anton.variable} antialiased`}
      >
        <NuqsAdapter>
          {children}
          <Suspense>
            <ChatBot />
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}

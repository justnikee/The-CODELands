"use client"; // ✅ Mark as Client Component

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react"; // ✅ Import useState

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Create QueryClient inside useState
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}

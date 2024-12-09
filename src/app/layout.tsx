import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/components/query-provier";
import Providers from "@/components/Providers";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Praxis",
  description: "Beautifully designed and feature-rich Exam Prep Platform",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log('Current Environment:', process.env.NODE_ENV);
console.log('Vercel Environment:', process.env.VERCEL_ENV);
const session = await auth();


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <QueryProvider>
          <Providers>
        <Toaster />
            {children}
          </Providers>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

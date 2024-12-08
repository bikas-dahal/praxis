import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/components/query-provier";
import Providers from "@/components/Providers";
import { SessionProvide } from "@/components/session-provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
            />
        <SessionProvide>
          <QueryProvider>
          <Providers>
            {children}
          </Providers>
          </QueryProvider>
        </SessionProvide>
      </body>
    </html>
  );
}

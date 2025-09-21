import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import "remixicon/fonts/remixicon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hasnain AI Chat Bot",
  description: "This is an Hasnain AI Chat Bot application. It allows users to chat with an AI bot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
          >
            <Toaster />
            {children}
          </body>
        </html>
      
  );
}

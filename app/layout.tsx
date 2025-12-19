import Footer from "@/components/pages/shared/home/Footer";
import Navbar from "@/components/pages/shared/home/Navbar";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { Toaster } from "@/components/ui/sonner";
import ReactProvider from "@/provider/ReactProvider";
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
  title: "Optilux CRM",
  description: "This is a customer management system for optiluxbd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          </ThemeProvider> */}
          <ServiceWorkerRegistration />
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors position="top-center" />
        </body>
      </ReactProvider>
    </html>
  );
}

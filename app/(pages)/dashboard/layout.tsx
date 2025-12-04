import { AppSidebar } from "@/components/pages/shared/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/pages/shared/dashboard/navbar";
import AuthGuard from "@/provider/AuthGuardProvider";

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
  description: "this is the dashboard of Optiluxbd crm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <AuthGuard>
            <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
          </AuthGuard>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

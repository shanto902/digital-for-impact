import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import ReduxProvider from "@/components/layout/ReduxProvider";
import ThemeWrapper from "@/components/layout/ThemeWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital For Impact",
  description:
    "At Digital for Impact, we specialize in crafting high-impact digital solutions for tourism, hospitality, social enterprises, and brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReduxProvider>
          <ThemeWrapper>
            <NavBar>{children}</NavBar>
            <Footer />
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}

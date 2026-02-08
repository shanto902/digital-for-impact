import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

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
    <html lang="en">
      <Script id="gtm-script" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M4KL57RD');`}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4KL57RD"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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

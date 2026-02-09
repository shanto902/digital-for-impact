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
  title: "Digital Solutions | Digital for Impact",
  description:
    "End-to-end digital solutions development for web, mobile, SaaS, automation, data intelligence and UI/UX. Serving APAC & Bangladesh-based teams.",
  keywords: [
    "Digital Solutions",
    "Web Development",
    "Mobile App Development",
    "SaaS Development",
    "Automation Solutions",
    "Data Intelligence",
    "UI UX Design",
    "Software Development Company",
    "Bangladesh",
    "Thailand",
    "APAC",
    "Southeast Asia",
    "Digital for Impact",
  ],
  openGraph: {
    title: "Digital Services | Digital for Impact",
    description:
      "End-to-end digital solutions for web, mobile, apps, SaaS, automation, data intelligence and UI/UX—built for scale across APAC.",
    images: [
      {
        url: "/og-image.jpg", // Assuming an image will be placed here or exists
        width: 1200,
        height: 630,
        alt: "Digital for Impact",
      },
    ],
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digital for Impact",
  url: "https://www.digitalforimpact.net/",
  logo: "https://www.digitalforimpact.net/logo.png",
  description:
    "Digital for Impact provides end-to-end digital solutions including web development, mobile apps, SaaS platforms, automation, data intelligence, and UI/UX design across APAC.",
  areaServed: [
    { "@type": "Country", name: "Bangladesh" },
    { "@type": "Country", name: "Thailand" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Malaysia" },
    { "@type": "Country", name: "Indonesia" },
    { "@type": "Country", name: "Pakistan" },
  ],
  sameAs: [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Solutions Development",
  provider: {
    "@type": "Organization",
    name: "Digital for Impact",
    url: "https://www.digitalforimpact.net/",
  },
  serviceType: [
    "Web Development",
    "Mobile App Development",
    "SaaS Development",
    "Automation Solutions",
    "Data Intelligence",
    "UI UX Design",
  ],
  areaServed: "Asia-Pacific",
  audience: {
    "@type": "Audience",
    audienceType: "Startups, Enterprises, NGOs, Impact Organizations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
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

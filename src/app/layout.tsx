import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";
import { Background } from "@/components/Background";

// Import custom fonts
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

// Metadata setup
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sumit S Nair",
    description: "Sumit S Nair's Portfolio",
    openGraph: {
      title: "Sumit S Nair",
      description: "Sumit S Nair's Portfolio",
      url: "https://sumit-s-nair.vercel.app/",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Metadata for SEO and social sharing */}
        <meta name="description" content="Sumit S Nair's Portfolio" />
        <meta name="og:title" content="Sumit S Nair" />
        <meta name="og:description" content="Sumit S Nair's Portfolio" />
        <meta name="og:url" content="https://sumit-s-nair.vercel.app/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Background Component with z-index to ensure it stays behind the content */}
        <Background
          style={{ zIndex: "-1", position: "fixed" }}
          mask="cursor"
          dots={{
            display: true,
            opacity: 0.4,
            size: "20",
          }}
          gradient={{
            display: true,
            opacity: 0.4,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: "1" }}>{children}</div>
      </body>
    </html>
  );
}

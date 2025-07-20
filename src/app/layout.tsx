import "./globals.css";
import { Metadata } from "next";
import { Background } from "@/components/Background";
import { AuthProvider } from "@/contexts/AuthContext";

// Metadata setup - Consider making this dynamic based on Firestore data in the future
export async function generateMetadata(): Promise<Metadata> {
  // For now, use static metadata. In production, you could fetch from Firestore here
  // Note: Firestore calls in generateMetadata should be cached for performance
  return {
    title: "Sumit's Portfolio",
    description: "Welcome to the portfolio of Sumit S Nair. Discover my journey, skills, and creations in web development.",
    openGraph: {
      title: "Sumit's Portfolio",
      description: "Explore my passion for web development and creativity.",
      url: "https://sumit-s-nair.vercel.app/",
      type: "website",
      images: [
        {
          url: "/images/profile.jpg",
          width: 1200,
          height: 800,
          alt: "Sumit S Nair - Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sumit's Portfolio",
      description: "Welcome to the portfolio of Sumit S Nair.",
      images: ["/images/profile.jpg"],
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sumit&apos;s Portfolio</title>
      </head>
      <body className="antialiased bg-gray-900 text-white">
        <AuthProvider>
          {/* Background */}
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
        </AuthProvider>
      </body>
    </html>
  );
}

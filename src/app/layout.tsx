import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// Type for content items from API
interface ContentItem {
  id: string;
  title: string;
  type: string;
  value: string | string[];
}

interface ApiResponse {
  general?: ContentItem[];
}

// Dynamic metadata function that reads from the content API
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Try to fetch metadata from our content API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/content`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (response.ok) {
      const data: ApiResponse = await response.json();
      const siteTitle = data.general?.find((item: ContentItem) => item.id === 'site-title')?.value || 'Sourced - Creative Network';
      const metaDescription = data.general?.find((item: ContentItem) => item.id === 'meta-description')?.value || 'Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.';
      const siteFavicon = data.general?.find((item: ContentItem) => item.id === 'site-favicon')?.value || '/favicon.ico';
      
      // Ensure values are strings
      const titleStr = Array.isArray(siteTitle) ? siteTitle.join(' ') : siteTitle;
      const descStr = Array.isArray(metaDescription) ? metaDescription.join(' ') : metaDescription;
      const faviconStr = Array.isArray(siteFavicon) ? siteFavicon[0] : siteFavicon;
      
      return {
        title: titleStr,
        description: descStr,
        keywords: 'creative network, photographers, videographers, models, talent booking, creative professionals',
        authors: [{ name: 'Sourced' }],
        icons: {
          icon: faviconStr,
          shortcut: faviconStr,
          apple: faviconStr,
        },
        openGraph: {
          title: titleStr,
          description: descStr,
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: titleStr,
          description: descStr,
        }
      };
    }
  } catch (error) {
    console.error('Error loading dynamic metadata:', error);
  }
  
  // Fallback metadata if API fails
  return {
    title: "Sourced - Creative Network",
    description: "Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.",
    keywords: 'creative network, photographers, videographers, models, talent booking, creative professionals',
    authors: [{ name: 'Sourced' }],
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    openGraph: {
      title: "Sourced - Creative Network",
      description: "Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.",
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Sourced - Creative Network",
      description: "Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.",
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bvm3wii.css" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

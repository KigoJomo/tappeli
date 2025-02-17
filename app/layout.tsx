import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Tappeli Premium Apparel',
    default: 'Tappeli - Sustainable Fashion for Modern Africa'
  },
  description: 'Ethically crafted apparel combining African heritage with modern design',
  keywords: ['African fashion', 'sustainable clothing', 'POD Kenya'],
  openGraph: {
    images: '/og-image.jpg',
  },
  // metadataBase: new URL(process.env.SITE_URL!),
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

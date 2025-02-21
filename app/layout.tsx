import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { Analytics } from '@vercel/analytics/next';
import Header from './components/Header';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: {
    template: '%s | Tappeli Premium Apparel',
    default: 'Tappeli - Sustainable Fashion for Modern Africa',
  },
  description:
    'Ethically crafted apparel combining African heritage with modern design',
  keywords: ['African fashion', 'sustainable clothing', 'POD Kenya'],
  openGraph: {
    images: '/og-image.jpg',
  },
  // metadataBase: new URL(process.env.SITE_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hidden">
      <body className="scrollbar-custom relative">
        <ThemeProvider>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

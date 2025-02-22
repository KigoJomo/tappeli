import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { Analytics } from '@vercel/analytics/next';
import Header from './components/Header';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Tappeli Premium Apparel',
    default: 'Tappeli - Sustainable Fashion for Modern Africa',
  },
  description:
    'Discover high-quality, ethically crafted designs that let you express your style effortlessly.',
  keywords: ['global fashion', 'sustainable clothing', 'POD apparel', 'ethical fashion', 'modern design'],
  openGraph: {
    images: '/og-image.jpg',
  },
  metadataBase: new URL(process.env.SITE_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hidden">
      <body className="scrollbar-hidden relative">
        <ThemeProvider>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

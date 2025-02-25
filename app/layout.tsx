import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { Analytics } from '@vercel/analytics/next';
import Header from './components/Header';
import { ThemeProvider } from '@/context/ThemeContext';
import Footer from './components/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: {
    template: '%s | Tappeli Premium Apparel',
    default: 'Tappeli - Sustainable Fashion for Timeless Appeal',
  },
  description:
    'Discover high-quality, ethically crafted designs that let you express your style effortlessly.',
  keywords: ['global fashion', 'sustainable clothing', 'POD apparel', 'ethical fashion', 'modern design'],
  openGraph: {
    images: '/images/og-image.webp',
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
            <CartProvider>
              <FavoritesProvider>
                <Header />
                {children}
                <Footer />
              </FavoritesProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

// app/components/Footer.tsx
"use client";

import Link from "next/link";
import { Mail, Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import { useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { theme } = useTheme()

  const pathname = usePathname();
  const hideFooter = pathname.match(/^\/(?:auth)/);

  // Optional scroll-to-top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  if (hideFooter) {
    return null;
  }

  return (
    <footer className="bg-foreground-faded text-foreground py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand / Tagline */}
        <div className="flex flex-col space-y-2">
        <Link href={'/'} className="">
          <Image
            src={`/images/logo-${theme}.webp`}
            alt="Tappeli Premium Apparel"
            width={100}
            height={100}
            className="object-contain h-6 md:h-8 m-0"
          />
        </Link>
          <p className="text-sm">Elevate Your Style Today!</p>
        </div>

        {/* Pages */}
        <div>
          <h4 className="uppercase text-sm font-semibold mb-3">
            Pages
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/collections/new">New Collection</Link>
            </li>
            <li>
              <Link href="/catalog">Catalog</Link>
            </li>
            <li>
              <Link href="/delivery">Delivery</Link>
            </li>
          </ul>
        </div>

        {/* Legal Information */}
        <div>
          <h4 className="uppercase text-sm font-semibold mb-3">
            Legal information
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms &amp; conditions</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social Icons */}
        <div>
          <h4 className="uppercase text-sm font-semibold mb-3">
            Contact us
          </h4>
          <div className="flex items-center gap-3 mb-3">
            {/* Email */}
            <Link href="mailto:info@tappeli.com" aria-label="Email">
              <Mail className="w-5 h-5 hover:stroke-accent transition-all duration-300" />
            </Link>
            {/* Facebook */}
            <Link href="https://facebook.com" aria-label="Facebook" target="_blank">
              <Facebook className="w-5 h-5 hover:stroke-accent transition-all duration-300" />
            </Link>
            {/* Instagram */}
            <Link href="https://instagram.com" aria-label="Instagram" target="_blank">
              <Instagram className="w-5 h-5 hover:stroke-accent transition-all duration-300" />
            </Link>
            {/* YouTube */}
            <Link href="https://youtube.com" aria-label="YouTube" target="_blank">
              <Youtube className="w-5 h-5 hover:stroke-accent transition-all duration-300" />
            </Link>
          </div>
          {/* Scroll-to-top arrow */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm hover:underline focus:outline-none"
          >
            <ArrowUp className="w-4 h-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

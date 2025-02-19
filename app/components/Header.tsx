'use client';

import { useTheme } from '@/context/ThemeContext';
import { AlignLeft, Heart, Moon, ShoppingCart, Sun } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import MenuButton from './MenuButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SideMenu from './SideMenu';
import FavsView from './FavsView';
import CartView from './CartView';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [favsOpen, setFavsOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const hideHeader = pathname.match(/^\/(?:auth|admin)/);

  const pages = [
    { name: 'about', url: '/about' },
    { name: 'collections', url: '/collections' },
    { name: 'shop', url: '/products' },
  ];

  return (
    <header
      className={` ${
        hideHeader ? 'hidden' : 'py-4 flex items-center justify-between'
      }`}>
      {/* menu & logo */}
      <div className="menu-logo md:w-1/3 flex items-center gap-2">
        <button className={`md:hidden`} onClick={() => setMenuOpen(!menuOpen)}>
          <AlignLeft size={16} />
        </button>

        <Link href={'/'} className="">
          <Image
            src={`/images/logo-${theme}.webp`}
            alt="Tappeli Premium Apparel"
            width={100}
            height={100}
            className="object-contain h-6 md:h-8"
          />
        </Link>
      </div>

      {/* desktop navigation */}
      <nav className="hidden md:flex items-center justify-center gap-8">
        {pages.map((page, index) => (
          <Link
            key={index}
            href={page.url}
            className={`uppercase text-sm border-b-2 ${
              pathname.match(page.url)
                ? 'border-foreground'
                : 'border-transparent'
            } hover:border-foreground transition-all duration-500`}>
            {page.name}
          </Link>
        ))}
      </nav>

      {/* right menu: cart, account, contact */}
      <div className="md:w-1/3 flex items-center justify-end gap-4">
        <MenuButton
          onClick={toggleTheme}
          icon={
            theme === 'dark' ? (
              <>
                <Sun size={16} />
              </>
            ) : (
              <>
                <Moon size={16} />
              </>
            )
          }
          // label="menu"
        />
        <MenuButton
          onClick={() => setFavsOpen(true)}
          icon={<Heart size={20} />}
          // label="favorites"
        />

        <MenuButton
          onClick={() => setCartOpen(true)}
          icon={<ShoppingCart size={20} />}
          // label="cart"
        />

        <Link
          href={'/contact'}
          className={`hidden md:flex uppercase text-sm border-b-2 ${
            pathname.match('/contact')
              ? 'border-foreground'
              : 'border-transparent'
          } hover:border-foreground transition-all duration-500`}>
          contact us
        </Link>
      </div>

      {/* side menus */}

      <SideMenu
        isOpen={favsOpen}
        onClose={() => setFavsOpen(false)}
        position="right">
        <FavsView onClose={() => setFavsOpen(false)} />
      </SideMenu>

      {/* Cart Side Menu */}
      <SideMenu
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        position="right">
        <CartView onClose={() => setCartOpen(false)} />
      </SideMenu>
    </header>
  );
};

export default Header;

'use client';

import { useTheme } from '@/context/ThemeContext';
import {
  AlignLeft,
  CircleUser,
  Heart,
  House,
  Info,
  Instagram,
  Moon,
  ShoppingBag,
  ShoppingCart,
  SquareStack,
  Sun,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import MenuButton from './MenuButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SideMenu from './SideMenu';
import FavsView from './FavsView';
import CartView from './CartView';
import { useUser } from '@/hooks/useUser';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [favsOpen, setFavsOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const hideHeader = pathname.match(/^\/(?:auth)/);
  const adminPage = pathname.match(/^\/(?:admin)/);

  const user = useUser();

  const pages = [
    { name: 'home', url: '/', icon: <House size={16} /> },
    { name: 'about', url: '/about', icon: <Info size={16} /> },
    {
      name: 'collections',
      url: '/collections',
      icon: <SquareStack size={16} />,
    },
    { name: 'shop', url: '/products', icon: <ShoppingBag size={16} /> },
  ];

  return (
    <header
      className={` ${
        hideHeader ? 'hidden' : 'sticky top-0 z-50 bg-background py-4 flex items-center justify-between border-b border-foreground-faded'
      }`}>
      {/* menu & logo */}
      <div className="menu-logo md:w-1/3 flex items-center gap-2">
        <button className={`md:hidden p-1`} onClick={() => setMenuOpen(!menuOpen)}>
          <AlignLeft size={20} />
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
        {adminPage && <p className='bg-accent text-background px-2 rounded-full'>admin</p>}
      </div>

      {/* desktop navigation */}
      <nav className="hidden md:flex items-center justify-center gap-8">
        {pages.slice(1).map((page, index) => (
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

      {/* right menu: theme, favs, cart, account */}
      <div className="md:w-1/3 flex items-center justify-end gap-4">
        <MenuButton
          onClick={toggleTheme}
          icon={
            theme === 'dark' ? (
              <>
                <Sun
                  className="stroke-foreground md:hover:stroke-accent"
                  size={16}
                />
              </>
            ) : (
              <>
                <Moon
                  className="stroke-foreground md:hover:stroke-accent"
                  size={16}
                />
              </>
            )
          }
        />
        <MenuButton
          onClick={() => setFavsOpen(true)}
          icon={
            <Heart
              className="stroke-foreground md:hover:stroke-accent"
              size={20}
            />
          }
        />

        <MenuButton
          onClick={() => setCartOpen(true)}
          icon={
            <ShoppingCart
              className="stroke-foreground md:hover:stroke-accent"
              size={20}
            />
          }
        />

        <Link href={'/account'}>
          {user ? (
            // TODO: Add user avatar
            <CircleUser
              className="stroke-foreground md:hover:stroke-accent"
              size={20}
            />
          ) : (
            <CircleUser
              className="stroke-foreground md:hover:stroke-accent"
              size={20}
            />
          )}
        </Link>
      </div>

      {/* side menus */}
      {/* Mobile-nav Side Menu */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="left">
        <nav className="h-full flex flex-col gap-4">
          <Link href={'/'} className="" onClick={() => setMenuOpen(false)}>
            <Image
              src={`/images/logo-${theme}.webp`}
              alt="Tappeli Premium Apparel"
              width={100}
              height={100}
              className="object-contain h-6 md:h-8"
            />
          </Link>

          <hr className="border-foreground-faded" />

          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.url}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 uppercase text-sm bg-foreground-faded p-4 rounded-2xl border ${
                pathname === page.url ? 'border-accent' : 'border-transparent'
              } transition-all duration-500`}>
              {page.icon}
              {page.name}
            </Link>
          ))}

          <div className="bottom mt-auto flex items-center justify-center gap-4">
            <Link href="/" className="">
              <Instagram size={20} />
            </Link>
            <Link href="/" className="">
              <Twitter size={20} />
            </Link>
          </div>
        </nav>
      </SideMenu>

      {/* Favs Side Menu */}
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

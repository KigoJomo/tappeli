'use client';

import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { FC } from 'react';
import SignoutButton from '../SignoutButton';

const Hero: FC = () => {
  const user = useUser();

  return (
    <section>
      {user ? (
        <>
          <h3>Welcome, {user.email}</h3>
          <SignoutButton />
        </>
      ) : (
        <>
          <h3>You ain&apos;t logged in dude</h3>
          <Link
            href="/auth/login"
            className="border-b border-foreground hover:pb-1 transition-all duration-300">
            Login
          </Link>
        </>
      )}
    </section>
  );
};

export default Hero;

'use client';

import { useUser } from '@/hooks/useUser';
import type { NextPage } from 'next';
import SignoutButton from '../components/SignoutButton';
import Link from 'next/link';

const Page: NextPage = () => {
  const user = useUser();

  if (!user) {
    return (
      <>
        <section className="flex flex-col items-center">
          <h3>You are not logged in!</h3>
          <Link
            href="/auth/login"
            className="border-b border-foreground hover:pb-1 transition-all duration-300">
            Login
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="">
        <h3>Account</h3>
        <div className="w-full px-4 flex flex-col gap-4">
          <p>Email: {user?.email}</p>
        </div>

        <SignoutButton className='mx-auto md:mx-0 w-full md:w-fit' />
      </section>
    </>
  );
};

export default Page;

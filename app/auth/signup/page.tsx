'use client';

import Link from 'next/link';
import { signup } from '../actions';
import { Input } from '@/app/components/Input';
import { Loader, Lock, LogIn, Mail } from 'lucide-react';
import Button from '@/app/components/Button';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import { useState } from 'react';

export default function SignUpPage() {
  const { theme } = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    setIsSubmitting(true);
  };

  return (
    <>
      <section className="p-0 flex md:flex-row items-center justify-center h-screen">
        <div className="left md:w-1/2 h-full absolute -z-10 md:static">
          <Image
            src="/images/montage.webp"
            alt="Tappeli Premium Apparel"
            width={1000}
            height={1000}
            className="object-cover h-full w-full"
          />
        </div>

        <form
          method="POST"
          onSubmit={handleSubmit}
          className="right w-full md:w-1/2 md:h-full p-12 md:p-32 mx-4 md:mx-0 shadow-2xl md:shadow-none bg-background rounded-2xl md:rounded-0 flex flex-col justify-center gap-4">
          <div className="mx-auto">
            <Image
              src={`/images/logo-${theme}.webp`}
              alt="Tappeli Premium Apparel"
              width={100}
              height={100}
              className="object-contain h-6 md:h-8"
            />
          </div>

          <hr />

          <Input
            id="email"
            name="email"
            type="email"
            label="email"
            required
            error={''}
            startIcon={<Mail size={16} />}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="password"
            required
            error={''}
            startIcon={<Lock size={16} />}
          />

          <Button
            label={isSubmitting ? 'Signing you up...' : 'Sign Up'}
            icon={
              isSubmitting ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <LogIn size={16} />
              )
            }
            formAction={signup}
            type="submit"
            disabled={isSubmitting}
          />

          <div className="mx-auto flex items-center gap-2">
            <p>Already have an account?</p>
            <Link
              href="/auth/login"
              className="border-b border-foreground hover:pb-1 transition-all duration-300">
              Log in
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

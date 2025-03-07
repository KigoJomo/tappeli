'use client';

import { MoveRight, MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Hero: FC = () => {
  const heroImages = [
    '/images/hero/tappeli-black-hoodie.webp',
    '/images/hero/tappeli-orange-tshirt.webp',
    '/images/hero/tappeli-plain-black-hoodie.webp',
    '/images/hero/tappeli-red-travel-mug.webp',
  ];

  return (
    <section className='flex flex-col'>
      <h1 className="lowercase text-[6rem] leading-[5rem] md:text-[18rem] md:leading-[16rem] md:-mt-6 font-bold w-fit mx-auto z-[6]">
        tappeli
      </h1>

      <p className='mx-auto mt-8 md:my-12 md:text-2xl text-center'>Discover high-quality, ethically crafted designs that<br className='hidden md:flex' />let you express your style effortlessly</p>

      <div className="w-full grid grid-cols-2 md:grid-cols-5 md:items-center mt-6 md:-mt-4 *:z-[4]">
        <div className="md:col-span-1 aspect-square overflow-hidden order-1 border-4 border-foreground-faded rounded-full">
          <Image
            src={heroImages[0]}
            alt="Tappeli Premium Apparel"
            width={1000}
            height={1000}
            className="hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="md:col-span-1 aspect-square overflow-hidden order-2 border-4 border-foreground-faded rounded-[3rem]">
          <Image
            src={heroImages[1]}
            alt="Tappeli Premium Apparel"
            width={1000}
            height={1000}
            className="hover:scale-105 transition-all duration-300"
          />
        </div>

        <Link
          href={'/products'}
          target=''
          className="col-span-2 md:col-span-1 aspect-[3/1] md:aspect-[2/1] rounded-full border-4 border-accent bg-accent overflow-hidden order-5 md:order-3 mt-6 md:m-0 flex flex-col items-center justify-center group">
          <div className="w-full flex items-center justify-center gap-6 md:group-hover:translate-y-0 md:translate-y-3 transition-all duration-300">
            <span className="capitalize text-2xl md:text-lg">view catalog</span>
            <MoveRight className="group-hover:-rotate-45 transition-all duration-300" />
          </div>
          <p className="flex md:group-hover:translate-y-0 md:translate-y-16 text-foreground md:text-sm transition-all duration-300">
            Explore our curated collection!
          </p>
        </Link>

        <div className="md:col-span-1 aspect-square overflow-hidden order-3 md:order-4 border-4 border-foreground-faded rounded-[3rem]">
          <Image
            src={heroImages[2]}
            alt="Tappeli Premium Apparel"
            width={1000}
            height={1000}
            className="hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="md:col-span-1 aspect-square overflow-hidden order-4 md:order-5 border-4 border-foreground-faded rounded-full">
          <Image
            src={heroImages[3]}
            alt="Tappeli Premium Apparel"
            width={1000}
            height={1000}
            className="hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>

      <div className="w-full hidden md:grid grid-cols-3 gap-6 mt-20">
        <div className="col-span-1 aspect-[2.5/1] bg-foreground-faded rounded-3xl p-6 flex items-center">
          Elevate your look with premium, ethically crafted apparel—sustainable
          fashion inspired by modern minimalist heritage.
        </div>
        <div className="col-span-1 aspect-[2.5/1] bg-foreground-faded rounded-3xl p-6 flex items-center">
          Redefine your style with trend-driven clothing and accessories
          designed for the conscious, contemporary wardrobe.
        </div>

        <Link
          href={'/collections'}
          className="col-span-1 aspect-[2.5/1] bg-foreground-faded rounded-3xl p-6 flex items-center justify-center gap-4 group">
          <span className="group-hover:text-accent transition-all duration-300">
            Explore our collections
          </span>
          <MoveUpRight className="group-hover:text-accent transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;

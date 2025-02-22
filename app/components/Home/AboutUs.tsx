import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
import Button from '../Button';

const AboutUs: FC = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="w-full flex items-center gap-4 mt-10">
        <h2 className="text-nowrap">A bit about us</h2>
        <div className="w-full h-[1px] bg-foreground-faded"></div>
      </div>

      <div className="w-full aspect-[1/4] md:aspect-[3/1] border border-foreground-faded rounded-3xl overflow-hidden grid grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        <div
          className="col-span-2 row-span-1 md:row-span-2 motion-preset-pop "
          style={{
            backgroundImage: 'url(/images/montage.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          {/*  */}
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 md:row-span-1 motion-preset-pop border border-foreground-faded flex flex-col justify-center gap-2 p-6 flex-grow-0 bg-foreground-faded">
          <h3>focus</h3>
          <p>
            Our mission is to provide sleek apparel & merch that reflect your
            personality.
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 md:row-span-1 motion-preset-pop border border-foreground-faded flex flex-col justify-center p-6">
          <h3 className="text-lg uppercase">
            we are the online platform for fashion and lifestyle.
          </h3>
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 md:row-span-1 motion-preset-pop border border-foreground-faded flex flex-col justify-center gap-2 p-6">
          <p>
            We believe in creating a global community where fashion meets
            individuality.
          </p>
          <Link
            href={'/about'}
            className="flex items-center gap-2 *:hover:text-accent">
            <span>Learn more</span> <MoveRight size={16} />
          </Link>
        </div>
        <div className="col-span-2 md:col-span-1 row-span-1 md:row-span-1 motion-preset-pop border border-foreground-faded flex flex-col justify-center gap-2 p-6 flex-grow-0 bg-foreground-faded">
          <h3>Innovative Spirit</h3>
          <p>
            Experience cutting-edge designs that merge sustainability with
            style, redefining your wardrobe and spaces for a modern era.
          </p>
        </div>
      </div>

      <Link href={'/products'} target="_blank">
        <Button
          label="discover your style today"
          className="my-12 mx-auto w-fit"
        />
      </Link>
    </section>
  );
};

export default AboutUs;

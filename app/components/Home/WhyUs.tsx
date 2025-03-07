import { fetchCollections, fetchProductsByCollection } from '@/utils/wix/client';
import { BadgeCheck, MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

const WhyUs: FC = async () => {
  const collections = await fetchCollections()
  // console.log()
  const collectionsWithProducts = await Promise.all(
    collections.slice(0, 4).map(async (collection) => {
      const product = await fetchProductsByCollection(collection._id!, 1)
      return { ...collection, product: product[0] };
    })
  )

  const sellingPoints = [
    'Eco-friendly production for sustainable fashion.',
    'On-demand customization for a uniquely personal style.',
    'Fast, reliable global delivery for a seamless shopping experience.',
  ];

  return (
    <section className="flex flex-col gap-12">
      <div className="w-full flex items-center gap-4 mt-10">
        <div className="w-full h-[1px] bg-foreground-faded"></div>
        <h2 className="text-nowrap">Ready to stand out?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
        <div className="col-span-1 rounded-3xl overflow-hidden aspect-square grid grid-cols-2 grid-rows-2 gap-6">
          {collectionsWithProducts.map((collection) => (
            <Link
              key={collection._id}
              href={`/collections/${collection.slug}`}
              target=""
              className="border-2 border-foreground-faded rounded-3xl grid grid-cols-1 grid-rows-1 overflow-hidden">
              <div className="col-span-1 row-span-1 z-[2] p-2 transparent-gradient aspect-square flex flex-col justify-end">
                <div className="w-full flex items-center justify-between gap-2">
                  <h3 className="text-lg uppercase text-white">{collection.name}</h3>
                  <MoveRight size={16} className='stroke-white' />
                </div>
              </div>

              <Image
                src={
                  collection.product.media.items[0].image.url || '/images/logo-dark.webp'
                }
                alt={`${collection.name} | Tappeli`}
                width={300}
                height={300}
                className="col-span-1 row-span-1 z-[1]"
              />
            </Link>
          ))}
        </div>

        <div className="col-span-1 md:aspect-square md:rounded-3xl md:bg-foreground-faded py-8 md:p-6 flex flex-col gap-6">
          <h3 className="text-lg uppercase text-foreground-light">
            Why amplify <span className="text-foreground">your</span>{' '}
            personality with <span className="text-foreground">tappeli</span>
            ...?
          </h3>
          {sellingPoints.map((point, index) => (
            <div
              className="px-4 md:p-4 flex items-start gap-4 bg-background rounded-3xl"
              key={index}>
              <BadgeCheck
                size={16}
                className="stroke-accent flex-shrink-0 mt-1"
              />
              <p className="text-sm">{point}</p>
            </div>
          ))}
        </div>

        <div className="col-span-1 rounded-3xl overflow-hidden border-2 border-foreground-faded">
          <Image
            src="/images/tappeli orange hoodie.webp"
            alt="Why us"
            width={600}
            height={400}
            className="w-full aspect-square"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

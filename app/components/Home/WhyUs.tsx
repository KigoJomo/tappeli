import { getCategories, getRandomProductByCategory } from '@/utils/supabase/api';
import Image from 'next/image';
import React, { FC } from 'react';

const WhyUs: FC = async () => {
  const categories = await getCategories();

  const categoriesWithRandomProduct = await Promise.all(
    categories.slice(1, 5).map(async (cat) => {
      const product = await getRandomProductByCategory(cat.id);
      return {...cat, product}
    })
  )

  return (
    <section className="flex flex-col gap-12">
      <div className="w-full flex items-center gap-4 mt-10">
        <div className="w-full h-[1px] bg-foreground-faded"></div>
        <h2 className="text-nowrap">Ready to stand out?</h2>
      </div>

      <div className="grid grid-cols-3 gap-6 md:gap-12">
        <div className="col-span-1 rounded-3xl overflow-hidden border-2 border-accent">
          <Image
            src="/images/tappeli orange hoodie.webp"
            alt="Why us"
            width={600}
            height={400}
            className="w-full aspect-square"
          />
        </div>

        <div className="col-span-1 aspect-square rounded-3xl bg-foreground-faded p-6">
          <h3 className="text-lg uppercase text-foreground-light">
            Why amplify <span className="text-foreground">your</span>{' '}
            personality with <span className="text-foreground">tappeli</span>
            ...
          </h3>
        </div>

        <div className="col-span-1 rounded-3xl overflow-hidden aspect-square grid grid-cols-2 grid-rows-2 gap-6">
          {categoriesWithRandomProduct.map((category) => (
            <div key={category.id} className="border-2 border-accent rounded-3xl grid grid-cols-1 grid-rows-1 overflow-hidden">
              <div className="col-span-1 row-span-1"></div>
              <Image
                src={category.product?.image_urls[0] || '/images/logo-dark.webp'}
                alt={category.name}
                width={300}
                height={300}
                className="col-span-1 row-span-1" 
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

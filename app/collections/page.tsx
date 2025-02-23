// app/collections/page.tsx

import { getCategories, getProductsByCategoryId } from '@/utils/supabase/api';
import type { NextPage } from 'next';
import Link from 'next/link';
import ProductGrid from '../components/ProductGrid';
import { MoveRight } from 'lucide-react';

const Page: NextPage = async () => {
  const categories = await getCategories();

  const categoriesWithPreviews = await Promise.all(
    categories.map(async (cat) => {
      const previewProducts = await getProductsByCategoryId(cat.id, 3);
      return { ...cat, previewProducts };
    })
  );

  return (
    <>
      <section className="flex flex-col gap-0">
        <h1 className="italic opacity-25 lowercase text-[4rem] leading-[4rem] md:text-[16rem] md:leading-[14rem] md:-mt-6 font-bold w-fit mx-auto">
          Collections
        </h1>

        {categoriesWithPreviews.map((category) => (
          <div
            key={category.id}
            className="flex flex-col md:flex-row gap-6 md:gap-12 py-12 border-y border-foreground-faded">
            {/* Category Header */}
            <div className="md:w-1/2 flex flex-col gap-4 md:bg-foreground-faded md:p-6 md:rounded-3xl">
              <div className="w-full flex md:flex-col items-center md:items-start gap-4">
                <h2 className="text-nowrap">{category.name}</h2>

                <div className="w-full flex md:hidden h-[1px] bg-foreground-faded" />

                <Link
                  href={`/collections/${category.slug}`}
                  className="flex items-center gap-2 text-accent flex-shrink-0">
                  <span className="">View All</span>
                  <MoveRight />
                </Link>
              </div>

              <p className="text-sm md:p-4 md:bg-background md:rounded-3xl">{category.description}</p>
            </div>

            {/* Category Preview */}
            {category.previewProducts.length > 0 ? (
              <>
                <ProductGrid
                  products={category.previewProducts}
                  className="w-full hidden md:grid"
                  style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
                />

                <ProductGrid
                  products={category.previewProducts}
                  className="w-full md:hidden"
                />
              </>
            ) : (
              <p className="text-sm md:text-lg text-foreground-faded">
                No products found for this category.
              </p>
            )}
          </div>
        ))}
      </section>
    </>
  );
};

export default Page;

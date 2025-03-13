// app/collections/page.tsx

import type { NextPage } from 'next';
import Link from 'next/link';
import ProductGrid from '../components/ProductGrid';
import { MoveRight } from 'lucide-react';
import { fetchCollections } from '@/utils/wix/collectionsApi';
import { fetchProductsByCollection } from '@/utils/wix/productsApi';
import FadedTitle from '../components/FadedTitle';

const Page: NextPage = async () => {
  const collections = await fetchCollections();

  const collectionsWithPreviews = await Promise.all(
    collections.map(async (collection) => {
      const previewProducts = await fetchProductsByCollection(collection._id!, 3)
      return { ...collection, previewProducts };
    })
  )

  return (
    <>
      <section className="flex flex-col gap-0">
        <FadedTitle text='collections' />

        {collectionsWithPreviews.map((collection) => (
          <div
            key={collection._id}
            className="flex flex-col md:flex-row gap-6 md:gap-12 py-12 border-y border-foreground-faded">
            {/* Category Header */}
            <div className="md:w-1/2 flex flex-col gap-4 md:bg-foreground-faded md:p-6 md:rounded-3xl">
              <div className="w-full flex md:flex-col items-center md:items-start gap-4">
                <h2 className="text-nowrap">{collection.name}</h2>

                <div className="w-full flex md:hidden h-[1px] bg-foreground-faded" />

                <Link
                  href={`/collections/${collection.slug}`}
                  className="flex items-center gap-2 text-accent flex-shrink-0">
                  <span className="">View All</span>
                  <MoveRight />
                </Link>
              </div>

              <p className="text-sm md:p-4 md:bg-background md:rounded-3xl">{collection.description}</p>
            </div>

            {/* Category Preview */}
            {collection.previewProducts.length > 0 ? (
              <>
                <ProductGrid
                  products={collection.previewProducts}
                  className="w-full hidden md:grid"
                  style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
                />

                <ProductGrid
                  products={collection.previewProducts}
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

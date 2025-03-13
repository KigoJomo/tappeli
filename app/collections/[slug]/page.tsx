// app/collections/[slug]/page.tsx

import FadedTitle from '@/app/components/FadedTitle';
import ProductGrid from '@/app/components/ProductGrid';
import {
  fetchCollectionBySlug,
  fetchCollections,
} from '@/utils/wix/collectionsApi';
import { fetchProductsByCollection } from '@/utils/wix/productsApi';
import { Product } from '@/utils/wix/types';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const collection = await fetchCollectionBySlug(slug);

  return {
    title: collection?.name
      ? `${collection.name} Collection | Tappeli`
      : 'Collection | Tappeli',
    description: collection?.name
      ? `Explore ${collection.name} products at Tappeli.`
      : 'Browse our latest collection.',
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const collection = await fetchCollectionBySlug(slug);

  if (!collection) {
    return (
      <section className="flex flex-col items-center justify-center gap-6">
        <h1>Collection not found</h1>
        <p>The collection you requested does not exist!</p>
        <Link href={'/collections'} className="text-accent">
          Go back to collections page
        </Link>
      </section>
    );
  }

  const products: Product[] = await fetchProductsByCollection(collection._id);

  return (
    <section className="flex flex-col gap-6 md:gap-12">
      <FadedTitle text={collection.name} />

      <hr className="border-foreground-faded" />

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-foreground-faded">
          No products found in this collection.
        </p>
      )}
    </section>
  );
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await fetchCollections();

  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

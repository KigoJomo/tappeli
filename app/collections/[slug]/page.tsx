// app/collections/[slug]/page.tsx

import ProductGrid from '@/app/components/ProductGrid';
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategoryId,
} from '@/utils/supabase/api';
import { Product } from '@/utils/supabase/types';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const category = await getCategoryBySlug(slug);

  return {
    title: category?.name
      ? `${category.name} Collection | Tappeli`
      : 'Collection | Tappeli',
    description: category?.name
      ? `Explore ${category.name} products at Tappeli.`
      : 'Browse our latest collection.',
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = await getCategoryBySlug(slug);

  if (!category) {
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

  const products: Product[] = await getProductsByCategoryId(category.id);

  return (
    <section className="flex flex-col gap-6 md:gap-12">
      <h1 className="italic opacity-25 lowercase text-[4rem] leading-[4rem] md:text-[16rem] md:leading-[14rem] md:-mt-10 font-bold w-fit mx-auto">
        {category.name}
      </h1>

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
  // 1. Fetch all categories from your database
  const categories = await getCategories(); // Your existing API function
  
  // 2. Return array of parameters objects
  return categories.map((category) => ({
    slug: category.slug, // Matches [slug] in route path
  }));
}

import { getFeaturedProducts } from '@/utils/supabase/api';
import React from 'react';
import ProductGrid from '../ProductGrid';

export default async function Featured (){
  const featuredProducts = await getFeaturedProducts()

  return (
    <section>
      <h2>featured products</h2>
      <ProductGrid products={featuredProducts} />
    </section>
  );
};
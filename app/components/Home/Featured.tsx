import React from 'react';
import ProductGrid from '../ProductGrid';
import Button from '../Button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { fetchProducts } from '@/utils/wix/client';

export default async function Featured() {
  const featuredItems = await fetchProducts();

  return (
    <section className="flex flex-col gap-6 py-12">
      <>
        <div className="w-full flex items-center gap-4">
          <h2 className="text-nowrap">featured products</h2>
          <div className="w-full h-[1px] bg-foreground-faded"></div>
        </div>
        <ProductGrid products={featuredItems} />
      </>

      <>
        <div className="w-full flex items-center gap-4 mt-10">
          <h2 className="text-nowrap">Best sellers</h2>
          <div className="w-full h-[1px] bg-foreground-faded"></div>
        </div>
        <ProductGrid products={featuredItems} />
      </>

      <>
        <Link href={'/products'} className='w-full' target=''>
          <Button
            label="start shopping"
            secondary
            icon={<MoveRight size={24} />}
            iconPosition="right"
            className='w-full'
          />
        </Link>
      </>
    </section>
  );
}

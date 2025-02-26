// app/products/[slug]/page.tsx

import {
  getProductBySlug,
  getProducts,
  getSimilarProducts,
} from '@/utils/supabase/api';
import { Metadata } from 'next';
import Link from 'next/link';
import AddToCartButton from '@/app/components/Products/AddToCartButton';
import GalleryCarousel from '@/app/components/Products/GalleryCarousel';
import FavsButton from '@/app/components/Products/FavsButton';
import ProductGrid from '@/app/components/ProductGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  return {
    title: product?.title
      ? `${product.title} | Tappeli`
      : 'Tappeli Premium Apparel',
    description:
      product?.description || 'Discover premium quality products at Tappeli',
    openGraph: {
      images: product?.image_urls[0],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-foreground-light">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products" className="text-accent hover:underline">
          Browse All Products
        </Link>
      </section>
    );
  }

  const similarProducts = await getSimilarProducts(product.id);

  return (
    <>
      <section className="p-0 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="w-full md:w-1/2 h-fit md:order-2">
          <GalleryCarousel images={product.image_urls} />
        </div>

        <div className="details w-full md:w-1/2 md:aspect-[4/3] px-4 flex flex-col gap-6">
          <div className="w-full flex flex-col gap-1">
            <h2 className="capitalize hidden md:flex">{product.title}</h2>
            <h3 className="capitalize md:hidden">{product.title}</h3>
            <p className="capitalize ml-2 pl-2 border-l-4 border-accent text-xl">
              ksh {product.price.toLocaleString()}
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <p className="text-xs opacity-50">About:</p>
            <p className="text-sm">{product.description}</p>
          </div>

          <span
            className={`w-fit px-6 py-2 text-sm rounded-full ${
              product.in_stock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>

          <hr className="" />

          <div className="buttons w-full flex flex-col gap-4">
            <AddToCartButton product={product} className="w-full md:w-full" />
            <FavsButton product={product} className="w-full md:w-full" />
          </div>
        </div>
      </section>

      <hr className="border-foreground-faded my-8 md:my-2" />

      <section className="flex flex-col gap-6 ">
        <h3 className="capitalize">you may also like</h3>

        <ProductGrid products={similarProducts} isHorizontal />

        {!(similarProducts.length > 0) && (
          <div>Error loading similar products</div>
        )}
      </section>
    </>
  );
}

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  const products = await getProducts();
  return products?.map((product) => ({ slug: product.slug })) || [];
}

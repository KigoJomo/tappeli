// app/products/[slug]/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import GalleryCarousel from '@/app/components/Products/GalleryCarousel';
import ProductGrid from '@/app/components/ProductGrid';
import { fetchProductBySlug, fetchProducts, fetchSimilarProducts } from '@/utils/wix/client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await fetchProductBySlug(slug)

  return {
    title: product?.name
      ? `${product.name} | Tappeli`
      : 'Tappeli Premium Apparel',
    description:
      product?.description || 'Discover premium quality products at Tappeli',
    openGraph: {
      images: product?.media.items[0].image.url,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = await fetchProductBySlug(slug)

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

  const similarProducts = await fetchSimilarProducts(product._id);
  const productImages = product.media.items.map(item => item.image.url)

  return (
    <>
      <section className="p-0 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="w-full md:w-1/2 h-fit md:order-2">
          <GalleryCarousel images={productImages} />
        </div>

        <div className="details w-full md:w-1/2 md:aspect-[4/3] px-4 flex flex-col gap-6">
          <div className="w-full flex flex-col gap-1">
            <h2 className="capitalize hidden md:flex">{product.name}</h2>
            <h3 className="capitalize md:hidden">{product.name}</h3>
            <p className="capitalize ml-2 pl-2 border-l-4 border-accent text-xl">
            {product.price.currency} {product.price.price.toLocaleString()}
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <p className="text-xs opacity-50">About:</p>
            <p className="text-sm">{product.description}</p>
          </div>
          
          <hr className="" />

          {/* <div className="buttons w-full flex flex-col gap-4">
            <AddToCartButton product={product} className="w-full md:w-full" />
            <FavsButton product={product} className="w-full md:w-full" />
          </div> */}
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
  const products = await fetchProducts();
  return products?.map((product) => ({ slug: product.slug })) || [];
}

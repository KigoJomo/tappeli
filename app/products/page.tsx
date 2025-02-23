import { getProducts } from "@/utils/supabase/api";
import ProductGrid from "../components/ProductGrid";
import { Product } from "@/utils/supabase/types";

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <>
      <section className="flex flex-col gap-6 md:gap-12">
        <h1 className="italic opacity-25 lowercase text-[3rem] leading-[2rem] md:text-[12rem] md:leading-[10rem] md:-mt-10 font-bold w-fit mx-auto text-nowrap">
          All Products
        </h1>

        <hr className="border-foreground-faded" />

        <ProductGrid products={products} />
      </section>
    </>
  );
}

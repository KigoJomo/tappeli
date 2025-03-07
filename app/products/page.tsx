import ProductGrid from "../components/ProductGrid";
import { Product } from "@/utils/wix/types";
import { fetchProducts } from "@/utils/wix/client";
import FadedTitle from "../components/FadedTitle";

export default async function ProductsPage() {
  const products: Product[] = await fetchProducts()

  return (
    <>
      <section className="flex flex-col gap-6 md:gap-12">
        <FadedTitle text="all products" />

        <hr className="border-foreground-faded" />

        <ProductGrid products={products} />
      </section>
    </>
  );
}

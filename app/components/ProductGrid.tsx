import { Product } from "@/utils/supabase/types";
import { FC } from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
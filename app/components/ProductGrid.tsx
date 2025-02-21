import { Product } from "@/utils/supabase/types";
import { FC } from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
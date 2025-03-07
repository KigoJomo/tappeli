// app/components/ProductGrid.tsx

import { FC } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/wix/types";

interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  isHorizontal?: boolean;
  className?: string
  cardClassName?: string;
}

const ProductGrid: FC<ProductGridProps> = ({ products, isHorizontal = false, className, cardClassName, ...props }) => {
  return (
    <div
      className={
        `${
          isHorizontal
            ? "flex pb-4 gap-6 overflow-x-auto scrollbar-custom"
            : "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
        } ${className}`
      }
      {...props}
    >
      {products.map((product) => (
        <div
          key={product._id}
          className={
            isHorizontal
              ? `flex-shrink-0 w-[8rem] md:w-[16rem] ${cardClassName || ""}`
              : cardClassName
          }
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
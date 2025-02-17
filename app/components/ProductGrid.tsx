import { Product } from "@/lib/supabase/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link href={`/products/${product.slug}`} key={product.id} className="bg-white shadow-lg rounded-lg">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            height={800}
            width={800}
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
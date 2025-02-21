import { Product } from '@/utils/supabase/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <div className={`product-card ${className}`}>
      <Link href={`/products/${product.slug}`} className="">
        {/* image, title and desc */}
        <Image
          src={product.image_urls[0]}
          alt={product.title}
          height={800}
          width={800}
          className="w-full aspect-[3/4] object-cover object-center"
        />
        <div className="py-2">
          <h3 className="text-lg">{product.title}</h3>
          <p className="">KES {product.price}</p>
        </div>
      </Link>

      <div className="">
        {/* fav and cart buttons */}
        <button className="">{/* fav button */}</button>
        <button className="">{/* cart button */}</button>
      </div>
    </div>
  );
};

export default ProductCard;

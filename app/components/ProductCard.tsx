'use client';

import { Product } from '@/utils/supabase/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`product-card p-0 transition-all duration-300 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link
        href={`/products/${product.slug}`}
        className="w-full aspect-[3/4] rounded-3xl overflow-hidden">
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
          {/* Default image */}
          <Image
            src={product.image_urls[0]}
            alt={product.title}
            height={800}
            width={800}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Hover image */}
          <Image
            src={product.image_urls[1]}
            alt={product.title}
            height={800}
            width={800}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="py-2">
          <h3 className="text-base truncate">{product.title}</h3>
          <p className="">KES {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

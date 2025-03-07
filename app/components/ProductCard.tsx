'use client';

import { Product } from '@/utils/wix/types';
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
        target=''
        className="w-full aspect-[3/4] rounded-3xl overflow-hidden">
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
          {/* Default image */}
          <Image
            src={product.media.items[0].image.url}
            alt={`${product.name} | Tappeli`}
            height={800}
            width={800}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Hover image */}
          <Image
            src={product.media.items[1].image.url}
            alt={`${product.name} | Tappeli`}
            height={800}
            width={800}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="py-2">
          <h3 className="text-base truncate">{product.name}</h3>
          <p className="">{product.price.currency} {product.price.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

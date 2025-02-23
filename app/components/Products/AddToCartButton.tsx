// app/components/Products/AddToCartButton.tsx

'use client';

import { Product } from '@/utils/supabase/types';
import Button from '../Button';
import { ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const handleClick = () => {
    console.log(`Adding ${product.title} to cart`);
  };

  return (
    <Button
      className={`${className}`}
      label="add to cart"
      onClick={handleClick}
      icon={<ShoppingCart size={16} />}
    />
  );
};

export default AddToCartButton;

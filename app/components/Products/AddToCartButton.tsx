// app/components/Products/AddToCartButton.tsx

'use client';

import { Product } from '@/utils/supabase/types';
import Button from '../Button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { showToast } = useToast()

  const handleClick = () => {
    console.log(`Adding ${product.title} to cart`);
    showToast("This feature is coming soon", "info");
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

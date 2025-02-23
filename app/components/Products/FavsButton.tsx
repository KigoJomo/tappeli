// app/components/Products/FavsButton.tsx

'use client';

import { Product } from '@/utils/supabase/types';
import Button from '../Button';
import { Heart } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface Props {
  product: Product;
  className?: string;
}

const FavsButton = ({ product, className }: Props) => {
  const { showToast } = useToast();
  const handleClick = () => {
    console.log(`Adding ${product.title} to cart`);
    showToast("This feature is coming soon", "info");
  };

  return (
    <Button
      className={`${className}`}
      label="add to favs"
      secondary
      onClick={handleClick}
      icon={<Heart size={16} />}
    />
  );
};

export default FavsButton;

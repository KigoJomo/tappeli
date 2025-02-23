// app/components/Products/FavsButton.tsx

'use client';

import { Product } from '@/utils/supabase/types';
import Button from '../Button';
import { Heart } from 'lucide-react';

interface Props {
  product: Product;
  className?: string;
}

const FavsButton = ({ product, className }: Props) => {
  const handleClick = () => {
    console.log(`Adding ${product.title} to cart`);
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

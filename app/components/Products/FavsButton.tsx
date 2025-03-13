// app/components/Products/FavsButton.tsx
'use client';

import React, { useState } from 'react';
import Button from '../Button';
import { Heart, Loader } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useUser } from '@/hooks/useUser';
import { Product } from '@/utils/wix/types';

interface Props {
  product: Product;
  className?: string;
}

const FavsButton = ({ product, className }: Props) => {
  const { showToast } = useToast();
  const { favorites, toggleFavorite } = useFavorites();
  const user = useUser();
  const [toggling, setToggling] = useState(false);

  // Check if the product is already favorited.
  const isFavorited = favorites.some((fav) => fav._id === product._id);

  const handleClick = async () => {
    if (!user) {
      showToast("Please log in to manage favorites", "error");
      return;
    }
    setToggling(true);
    try {
      await toggleFavorite(product, user.id);
      showToast(isFavorited ? "Removed from favorites" : "Added to favorites", "success");
    } catch (error) {
      console.error("Error toggling favorite:", error);
      showToast("Error updating favorites", "error");
    } finally {
      setToggling(false);
    }
  };

  return (
    <Button
      className={className}
      label={isFavorited ? "Remove from favs" : "Add to favs"}
      secondary
      onClick={handleClick}
      icon={
        toggling ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <Heart size={16} className={isFavorited ? "text-red-500" : ""} />
        )
      }
    />
  );
};

export default FavsButton;
// app/components/Products/AddToCartButton.tsx
'use client';

import React, { useState } from 'react';
import { Product } from '@/utils/supabase/types';
import Button from '../Button';
import { ShoppingCart, Plus, Minus, Loader } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/hooks/useUser';

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { showToast } = useToast();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useCart();
  const user = useUser();
  const [loading, setLoading] = useState(false);

  // Find the cart item corresponding to this product
  const cartItem = cart.find((item) => item.product.id === product.id);

  const handleAdd = async () => {
    if (!user) {
      showToast("Please log in to add items to your cart", "error");
      return;
    }
    setLoading(true);
    try {
      if (cartItem) {
        await updateCartQuantity(product, user.id, cartItem.quantity + 1);
        showToast("Increased quantity", "success");
      } else {
        await addToCart(product, user.id, 1);
        showToast("Added to cart", "success");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast("Error updating cart", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!user) {
      showToast("Please log in to update your cart", "error");
      return;
    }
    if (!cartItem) return;
    setLoading(true);
    try {
      if (cartItem.quantity > 1) {
        await updateCartQuantity(product, user.id, cartItem.quantity - 1);
        showToast("Decreased quantity", "success");
      } else {
        await removeFromCart(product, user.id);
        showToast("Removed from cart", "success");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      showToast("Error updating cart", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {loading ? (
        <div className="w-full border border-accent bg-accent rounded-full px-8 py-2 flex items-center justify-center">
          <Loader size={16} className="animate-spin" />
        </div>
      ) : cartItem ? (
        <div className='w-full border border-accent bg-accent rounded-full px-8 py-2 flex items-center justify-center gap-4'>
          <button
            onClick={handleRemove}
            className="bg-foreground-faded hover:bg-foreground-light text-foreground font-bold py-1 px-2 rounded-full"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <button
            onClick={handleAdd}
            className="bg-foreground-faded hover:bg-foreground-light text-foreground font-bold py-1 px-2 rounded-full"
          >
            <Plus size={16} />
          </button>
        </div>
      ) : (
        <Button
          label="Add to Cart"
          onClick={handleAdd}
          icon={<ShoppingCart size={16} />}
          className='w-full'
        />
      )}
    </div>
  );
};

export default AddToCartButton;

// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from '@/utils/supabase/cartApi';
import type { CartItem, Product } from '@/utils/supabase/types';
import { useUser } from '@/hooks/useUser';

interface CartContextType {
  cart: CartItem[];
  refreshCart: (authUserId: string) => Promise<void>;
  addToCart: (
    product: Product,
    authUserId: string,
    quantity?: number
  ) => Promise<void>;
  updateCartQuantity: (
    product: Product,
    authUserId: string,
    quantity: number
  ) => Promise<void>;
  removeFromCart: (product: Product, authUserId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const user = useUser()

  const refreshCart = async (authUserId: string) => {
    try {
      const items = await getCartItems(authUserId);
      setCart(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if(user){
      refreshCart(user.id)
    }
  }, [user])

  const addToCart = async (
    product: Product,
    authUserId: string,
    quantity: number = 1
  ) => {
    try {
      await addItemToCart(authUserId, product.id, quantity);
      await refreshCart(authUserId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartQuantity = async (
    product: Product,
    authUserId: string,
    quantity: number
  ) => {
    try {
      await updateCartItem(authUserId, product.id, quantity);
      await refreshCart(authUserId);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (product: Product, authUserId: string) => {
    try {
      await removeCartItem(authUserId, product.id);
      await refreshCart(authUserId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        refreshCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from '@/utils/supabase/cartApi';
import type { CartItem } from '@/utils/supabase/types';
import { useUser } from '@/hooks/useUser';
import { Product } from '@/utils/wix/types';

interface CartContextType {
  cart: CartItem[];
  refreshCart: () => Promise<void>;
  addToCart: (
    product: Product,
    gelatoProductUid: string,
    variantOptions: Array<{ name: string; value: string }>,
    quantity?: number
  ) => Promise<void>;
  updateCartQuantity: (
    cartItemId: string,
    newQuantity: number
  ) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const user = useUser();

  const refreshCart = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const items = await getCartItems(user.id);
      setCart(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [user]);

  const addToCart = async (
    product: Product,
    gelatoProductUid: string,
    variantOptions: Array<{ name: string; value: string }>,
    quantity: number = 1
  ) => {
    if (!user?.id) throw new Error('User not authenticated');
    
    try {
      await addItemToCart(
        user.id,
        product._id,
        gelatoProductUid,
        variantOptions,
        quantity
      );
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCartQuantity = async (cartItemId: string, newQuantity: number) => {
    if (!user?.id) return;

    try {
      await updateCartItem(user.id, cartItemId, newQuantity);
      setCart(prev => prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!user?.id) return;

    try {
      await removeCartItem(user.id, cartItemId);
      setCart(prev => prev.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  useEffect(() => {
    if (user) refreshCart();
  }, [refreshCart, user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        refreshCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
      }}
    >
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
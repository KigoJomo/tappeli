// utils/supabase/favoritesApi.ts

import { Product } from '../wix/types';
import { createClient } from './client';

const supabase = createClient();

/**
 * Get all favorite products for a user.
 */
export async function getFavorites(authUserId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('product:products(*)')
    .eq('auth_user_id', authUserId);

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((row: any) => row.product as Product);
}

/**
 * Add a product to a user's favorites.
 */
export async function addFavorite(
  authUserId: string,
  productId: string
): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .insert({ auth_user_id: authUserId, product_id: productId });

  if (error) throw error;
}

/**
 * Remove a product from a user's favorites.
 */
export async function removeFavorite(
  authUserId: string,
  productId: string
): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('auth_user_id', authUserId)
    .eq('product_id', productId);

  if (error) throw error;
}
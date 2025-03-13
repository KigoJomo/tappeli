// utils/supabase/cartApi.ts
import { createClient } from './client';
import type { CartItem } from './types';

const supabase = createClient();

export async function getCartItems(authUserId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('cart')
    .select('*, product:products(*)')
    .eq('auth_user_id', authUserId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as CartItem[];
}

export async function addItemToCart(
  authUserId: string,
  productId: string,
  gelatoProductUid: string,
  variantOptions: Array<{ name: string; value: string }>,
  quantity: number = 1
): Promise<void> {
  const { error } = await supabase.from('cart').upsert(
    {
      auth_user_id: authUserId,
      product_id: productId,
      gelato_product_uid: gelatoProductUid,
      variant_options: variantOptions,
      quantity,
    },
    { onConflict: 'auth_user_id,product_id,gelato_product_uid' }
  );

  if (error) throw error;
}

export async function updateCartItem(
  authUserId: string,
  cartItemId: string,
  quantity: number
): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('auth_user_id', authUserId)
    .eq('id', cartItemId);

  if (error) throw error;
}

export async function removeCartItem(
  authUserId: string,
  cartItemId: string
): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('auth_user_id', authUserId)
    .eq('id', cartItemId);

  if (error) throw error;
}
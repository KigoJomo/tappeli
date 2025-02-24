import { createClient } from './client';
import { CartItem } from './types';

const supabase = createClient();

/**
 * Get all cart items for a user (including product details).
 */
export async function getCartItems(authUserId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('cart')
    .select('*, product:products(*)')
    .eq('auth_user_id', authUserId);
  if (error) throw error;
  return data as CartItem[];
}

/**
 * Add a product to the user's cart.
 * If the product is already in the cart, this function will update (upsert) the quantity.
 */
export async function addItemToCart(
  authUserId: string,
  productId: string,
  quantity: number = 1
): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .upsert(
      { auth_user_id: authUserId, product_id: productId, quantity },
      { onConflict: 'auth_user_id,product_id' }
    );
  if (error) throw error;
}

/**
 * Update the quantity of a product in the user's cart.
 */
export async function updateCartItem(authUserId: string, productId: string, quantity: number): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('auth_user_id', authUserId)
    .eq('product_id', productId);
  if (error) throw error;
}

/**
 * Remove a product from the user's cart.
 */
export async function removeCartItem(authUserId: string, productId: string): Promise<void> {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('auth_user_id', authUserId)
    .eq('product_id', productId);
  if (error) throw error;
}
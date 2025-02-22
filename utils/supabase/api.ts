// utils/supabase/api.ts

import { createClient } from './client';
import type { Product, Category, ProductCategory } from './types';

const supabase = createClient();

// ---------- PRODUCT FETCHING ----------

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('title')
    .limit(4);
  if (error) throw error;
  return data as Product[];
}

export async function getBestSellers(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('price')
    .limit(4);
  if (error) throw error;
  return data as Product[];
}

// === Products CRUD ===

export async function createProduct(
  product: Partial<Product>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select();
  if (error) throw error;
  // assuming the insert returns the newly created record in an array
  return (data as Product[])[0];
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return (data as Product[])[0];
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return;
}

export async function getRandomProductByCategory(
  categoryId: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product_categories')
    .select('product:products(*)')
    .eq('category_id', categoryId)
    .order('updated_at')
    .limit(1);

  if (error) throw error;
  return data && data.length > 0 ? (data[0].product as unknown as Product) : null;
}

// ------------ CATEGORIES ------------
// === Categories CRUD ===

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data as Category[];
}

export async function createCategory(
  category: Partial<Category>
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select();
  if (error) throw error;
  return (data as Category[])[0];
}

export async function updateCategory(
  id: string,
  updates: Partial<Category>
): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return (data as Category[])[0];
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
  return;
}

// === Product-Categories (Join Table) CRUD ===

export async function assignCategoryToProduct(
  productId: string,
  categoryId: string
): Promise<ProductCategory> {
  const { data, error } = await supabase
    .from('product_categories')
    .insert({ product_id: productId, category_id: categoryId })
    .select();
  if (error) throw error;
  return (data as ProductCategory[])[0];
}

export async function removeCategoryFromProduct(
  productId: string,
  categoryId: string
): Promise<void> {
  const { error } = await supabase
    .from('product_categories')
    .delete()
    .eq('product_id', productId)
    .eq('category_id', categoryId);
  if (error) throw error;
  return;
}

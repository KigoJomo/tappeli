// utils/supabase/api.ts

import { createClient } from './client';
import type { Product, Category, ProductCategory, GelatoTemplate, ProductVariant } from './types';

const supabase = createClient();

// ---------- GELATO TEMPLATES ----------

export async function getGelatoTemplates(): Promise<GelatoTemplate[]> {
  const { data, error } = await supabase.from('gelato_templates').select('*');
  if (error) throw error;
  return data as GelatoTemplate[];
}

export async function getGelatoTemplateById(id: string): Promise<GelatoTemplate | null> {
  const { data, error } = await supabase
    .from('gelato_templates')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as GelatoTemplate | null;
}

export async function createGelatoTemplate(template: Partial<GelatoTemplate>): Promise<GelatoTemplate> {
  const { data, error } = await supabase
    .from('gelato_templates')
    .insert(template)
    .select();
  if (error) throw error;
  return data[0] as GelatoTemplate;
}

export async function updateGelatoTemplate(id: string, updates: Partial<GelatoTemplate>): Promise<GelatoTemplate> {
  const { data, error } = await supabase
    .from('gelato_templates')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0] as GelatoTemplate;
}

// ---------- PRODUCT VARIANTS ----------

export async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId);
  if (error) throw error;
  return data as ProductVariant[];
}

export async function createProductVariant(variant: Partial<ProductVariant>): Promise<ProductVariant> {
  const { data, error } = await supabase
    .from('product_variants')
    .insert(variant)
    .select();
  if (error) throw error;
  return data[0] as ProductVariant;
}

export async function updateProductVariant(id: string, updates: Partial<ProductVariant>): Promise<ProductVariant> {
  const { data, error } = await supabase
    .from('product_variants')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0] as ProductVariant;
}

export async function deleteProductVariant(id: string): Promise<void> {
  const { error } = await supabase.from('product_variants').delete().eq('id', id);
  if (error) throw error;
}

// ---------- PRODUCTS ----------

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, gelato_template:gelato_templates(*)');
  if (error) throw error;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, gelato_template:gelato_templates(*), variants:product_variants(*)')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, gelato_template:gelato_templates(*)')
    .order('title')
    .limit(4);
  if (error) throw error;
  return data as Product[];
}

export async function getBestSellers(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, gelato_template:gelato_templates(*)')
    .order('price')
    .limit(4);
  if (error) throw error;
  return data as Product[];
}

export async function getSimilarProducts(id: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, gelato_template:gelato_templates(*)')
    .neq('id', id)
    .limit(6);
  if (error) throw error;
  return data as Product[];
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select('*, gelato_template:gelato_templates(*)');
  if (error) throw error;
  return data[0] as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select('*, gelato_template:gelato_templates(*)');
  if (error) throw error;
  return data[0] as Product;
}

// ---------- CATEGORIES ----------

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Category | null;
}

export async function createCategory(category: Partial<Category>): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select();
  if (error) throw error;
  return (data as Category[])[0];
}

// ---------- PRODUCT CATEGORIES ----------

export async function assignCategoryToProduct(productId: string, categoryId: string): Promise<ProductCategory> {
  const { data, error } = await supabase
    .from('product_categories')
    .insert({ product_id: productId, category_id: categoryId })
    .select();
  if (error) throw error;
  return data[0] as ProductCategory;
}

export async function removeCategoryFromProduct(productId: string, categoryId: string): Promise<void> {
  const { error } = await supabase
    .from('product_categories')
    .delete()
    .eq('product_id', productId)
    .eq('category_id', categoryId);
  if (error) throw error;
}

// ---------- HELPER FUNCTIONS ----------

export async function getProductsByCategoryId(categoryId: string, limit?: number): Promise<Product[]> {
  let query = supabase
    .from('product_categories')
    .select('product:products(*, gelato_template:gelato_templates(*))')
    .eq('category_id', categoryId);

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data?.map(item => item.product as unknown as Product) || [];
}

export async function getRandomProductByCategory(categoryId: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product_categories')
    .select('product:products(*, gelato_template:gelato_templates(*))')
    .eq('category_id', categoryId)
    .limit(1)
    .single();

  if (error) return null;
  return data?.product as unknown as Product;
}
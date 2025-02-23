// utils/supabase/types.ts

export type Product = {
  id: string;
  created_at: string; // or Date if you prefer
  title: string;
  slug: string;
  price: number;
  description: string;
  image_urls: string[];
  in_stock: boolean;
};

// New User type for public.users table
export type User = {
  id: string;
  auth_user_id: string; // Links to Supabase's auth.users.id
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'non-admin';
  created_at: string; // or Date
  updated_at: string; // or Date
};

// New Category type
export type Category = {
  id: string;
  parent_id: string | null; // For hierarchical categories; null means top-level
  name: string;
  slug: string;
  description?: string | null;
  created_at: string; // or Date
  updated_at: string; // or Date
};

// New join table type for product_categories
export type ProductCategory = {
  product_id: string;
  category_id: string;
};

export interface CartItem{
  id: string;
  auth_user_id: string;
  product_id: string;
  quantity: number;
  product: Product;
  created_at: string; // or Date
  updated_at: string; // or Date
}
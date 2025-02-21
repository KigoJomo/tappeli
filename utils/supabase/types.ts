// utils/supabase/types.ts

// Existing Product type
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

// export type ProductImage = {
//   url: string;
//   alt: string;
// };

// New User type for our public.users table
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

// New join table type for product_categories (if needed)
export type ProductCategory = {
  product_id: string;
  category_id: string;
};

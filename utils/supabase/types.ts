// utils/supabase/types.ts

export interface GelatoTemplate {
  id: string; // Gelato template ID
  template_uid: string;
  name: string;
  description: string;
  preview_url: string;
  created_at: string;
  updated_at: string;
  variants: GelatoVariant[]; // Not stored in DB, used for API responses
}

export interface Product {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string;
  base_price: number; // Base price for variants
  gelato_template_id: string; // References gelato_templates.id
  image_urls: string[];
  category_id?: string | null; // Optional category reference
}

export interface ProductVariant {
  id: string;
  product_id: string;
  gelato_variant_id: string;
  product_uid: string;
  variant_options: { 
    name: string;
    value: string;
  }[];
  price: number;
  created_at: string;
  updated_at: string;
}

// Supporting types for Gelato API responses
export interface GelatoVariant {
  id: string;
  title: string;
  productUid: string;
  variantOptions: {
    name: string;
    value: string;
  }[];
  imagePlaceholders: Array<{
    name: string;
    printArea: string;
    height: number;
    width: number;
  }>;
  textPlaceholders: Array<{
    name: string;
    text: string;
  }>;
}

// New User type for public.users table
export interface User {
  id: string;
  auth_user_id: string;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'non-admin';
  created_at: string; // or Date
  updated_at: string; // or Date
};

// New Category type
export interface Category {
  id: string;
  parent_id: string | null; // null means top-level
  name: string;
  slug: string;
  description?: string | null;
  created_at: string; // or Date
  updated_at: string; // or Date
};

// New join table type for product_categories
export interface ProductCategory {
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
// utils/supabase/types.ts

import { Product } from "../wix/types";

export interface User {
  id: string;
  auth_user_id: string;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'non-admin';
  created_at: string; // or Date
  updated_at: string; // or Date
};

export interface CartItem {
  id: string;
  auth_user_id: string;
  product_id: string;
  gelato_product_uid: string;
  quantity: number;
  variant_options: Array<{
    name: string;
    value: string;
  }>;
  product: Product;
  created_at: string;
  updated_at: string;
}

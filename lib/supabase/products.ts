import { supabase } from "./client";
import { Product } from "./types";

export const ProductService = {
  // get all products
  getAll: async () : Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error){
      throw new Error(error.message)
    }
    return data
  },

  // get a single product by slug
  getBySlug: async (slug: string) : Promise<Product> => {
    const {data, error} = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error){
      throw new Error(error.message)
    }

    return data
  },

  // create product
  create: async (productData: Omit<Product, 'id'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if(error){
      throw new Error(error.message)
    }

    return data;
  }
}
// utils/supabase/storage.ts
import { createClient } from './client';

/**
 * Uploads an image to the "products" bucket in Supabase Storage
 * and returns the public URL.
 *
 * @param file The file object to upload.
 * @param filePath Optional file path for naming the file. If not provided, one is generated.
 * @returns The public URL of the uploaded file.
 */
export async function uploadImage(file: File, filePath?: string): Promise<string> {
  const supabase = createClient();
  // Generate a unique file name if none is provided
  const fileName = filePath || `images/${Date.now()}-${file.name}`;
  
  // Upload the file to the 'products' bucket
  const { data, error } = await supabase.storage.from('products').upload(fileName, file);
  if (error) {
    throw error;
  }
  
  // Get the public URL of the uploaded file
  const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path);
  if (!urlData) {
    throw new Error('Failed to get public URL');
  }
  
  return urlData.publicUrl;
}

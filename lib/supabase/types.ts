export type Product = {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: ProductImage[];
  in_stock: boolean;
};

type ProductImage = {
  url: string;
  alt: string;
  // is_primary?: boolean;
};
import { wixClient } from './server';
import { Product, Variant } from './types';

export const fetchProducts = async () => {
  const query = wixClient.products.queryProducts();
  const { items } = await query.find();
  return items as unknown as Product[];
};

export const fetchProductBySlug = async (slug: string) => {
  const response = await wixClient.products
    .queryProducts()
    .eq('slug', slug)
    .limit(1)
    .find();

  return response.items[0] as unknown as Product;
};

export const fetchSimilarProducts = async (productId: string) => {
  const { items } = await wixClient.products
    .queryProducts()
    .ne('_id', productId)
    .limit(6)
    .find();

  return items as unknown as Product[];
};

export const fetchProductsByCollection = async (
  collectionId: string,
  limit?: number
) => {
  if (limit) {
    const { items } = await wixClient.products
      .queryProducts()
      .hasSome('collectionIds', [collectionId])
      .limit(limit)
      .find();
    return items as unknown as Product[];
  } else {
    const { items } = await wixClient.products
      .queryProducts()
      .hasSome('collectionIds', [collectionId])
      .find();
    return items as unknown as Product[];
  }
};

export const getProductVariants = async (productId: string) => {
  const values = await wixClient.products.queryProductVariants(productId)

  return values.variants as Variant[];
}

export const getProductUid = async (productId: string) => {
  const {} = await wixClient.products.queryProductVariants(productId,  )
}
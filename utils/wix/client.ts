import { createClient, OAuthStrategy } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import { Collection, Product } from './types';

export const wixClient = createClient({
  modules: { collections, products },
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
});

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

export const fetchCollections = async () => {
  const query = wixClient.collections.queryCollections();
  const { items } = await query.find();
  return items;
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

export const fetchCollectionBySlug = async (slug: string) => {
  const response = await wixClient.collections.getCollectionBySlug(slug);

  return response.collection as unknown as Collection;
};

export const fetchSimilarProducts = async (productId: string) => {
  const { items } = await wixClient.products
    .queryProducts()
    .ne('_id', productId)
    .limit(6)
    .find();

  return items as unknown as Product[];
};

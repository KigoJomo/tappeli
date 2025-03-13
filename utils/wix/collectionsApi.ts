import { wixClient } from './server';
import { Collection } from './types';

export const fetchCollections = async () => {
  const query = wixClient.collections.queryCollections();
  const { items } = await query.find();
  return items;
};

export const fetchCollectionBySlug = async (slug: string) => {
  const response = await wixClient.collections.getCollectionBySlug(slug);

  return response.collection as unknown as Collection;
};

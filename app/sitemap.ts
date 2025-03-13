import { fetchCollections } from '@/utils/wix/collectionsApi';
import { fetchProducts } from '@/utils/wix/productsApi';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts()
  const categories = await fetchCollections();

  const productPages = products.map(product => ({
    url: `https://tappeli.vercel.app/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const collectionPages = categories.map(category => ({
    url: `https://tappeli.vercel.app/collections/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticPages = [
    {
      url: 'https://tappeli.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://tappeli.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://tappeli.vercel.app/products',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: 'https://tappeli.vercel.app/collections',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.3,
    },
    {
      url: 'https://tappeli.vercel.app/terms-of-service',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2,
    },
    {
      url: 'https://tappeli.vercel.app/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2,
    },
  ]
  return [...staticPages, ...productPages, ...collectionPages]
}
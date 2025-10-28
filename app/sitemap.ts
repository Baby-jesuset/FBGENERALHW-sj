import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fbhardware.com'

  try {
    const supabase = await createClient()

    // Fetch all products
    const { data: products } = await supabase
      .from('products')
      .select('id, updated_at')

    // Fetch all categories
    const { data: categories } = await supabase
      .from('categories')
      .select('slug, updated_at')

    const productUrls = (products || []).map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(product.updated_at || Date.now()),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

    const categoryUrls = (categories || []).map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(category.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      ...productUrls,
      ...categoryUrls,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return basic sitemap if database fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}


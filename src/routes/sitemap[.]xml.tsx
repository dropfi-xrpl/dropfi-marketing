import { generateSitemapIndexXml } from '@/utils/sitemap';
import { createServerFileRoute } from '@tanstack/react-start/server';
import { getPageMetadata } from '@/utils/documentation-loader';
import { createClient } from '@supabase/supabase-js';

export const ServerRoute = createServerFileRoute('/sitemap.xml').methods({
  GET: async ({ request, params }) => {
    const baseUrl = `https://dropfi.app`;

    // Get all available documentation pages
    const documentationPages = getPageMetadata();

    // Get all blog posts from Supabase
    const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey!);

    // Get all published blog posts
    const { data: blogPosts } = await supabase.from('post').select();

    // Filter posts that are indexable (if seo.indexable is false, exclude them)
    const indexableBlogPosts =
      blogPosts?.filter((post) => {
        // If no SEO data, include the post
        if (!post.seo) return true;
        // If seo.indexable is explicitly false, exclude it
        return post.seo.indexable !== false;
      }) || [];

    const urls = [
      // Main landing page - highest priority
      {
        loc: `${baseUrl}`,
        priority: 1.0,
        lastmod: new Date().toISOString(),
        changeFrequency: 'weekly',
      },

      // Support page
      {
        loc: `${baseUrl}/support`,
        priority: 0.9,
        lastmod: new Date().toISOString(),
        changeFrequency: 'monthly',
      },

      {
        loc: `${baseUrl}/privacy-policy`,
        priority: 0.9,
        lastmod: new Date().toISOString(),
        changeFrequency: 'monthly',
      },

      {
        loc: `${baseUrl}/terms-of-service`,
        priority: 0.9,
        lastmod: new Date().toISOString(),
        changeFrequency: 'monthly',
      },

      // Documentation index page
      {
        loc: `${baseUrl}/docs`,
        priority: 0.9,
        lastmod: new Date().toISOString(),
        changeFrequency: 'weekly',
      },

      // Individual documentation pages
      ...documentationPages.map((page) => ({
        loc: `${baseUrl}/docs/${page.slug}`,
        priority: 0.8,
        lastmod: new Date().toISOString(),
        changeFrequency: 'monthly',
      })),

      // Blogs listing page
      {
        loc: `${baseUrl}/blogs`,
        priority: 0.9,
        lastmod: new Date().toISOString(),
        changeFrequency: 'daily',
      },

      // Individual blog posts
      ...indexableBlogPosts.map((post) => ({
        loc: `${baseUrl}/blogs/${post.slug}`,
        priority: 0.7,
        lastmod: post.updated_at || post.created_at || new Date().toISOString(),
        changeFrequency: 'weekly',
      })),
    ];

    console.log('Sitemap: Total URLs generated:', urls.length);
    console.log('Sitemap: Blog URLs included:', indexableBlogPosts.length);

    return new Response(generateSitemapIndexXml(urls), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  },
});

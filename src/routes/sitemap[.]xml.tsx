import { generateSitemapIndexXml } from '@/utils/sitemap';
import { createServerFileRoute } from '@tanstack/react-start/server';
import { getPageMetadata } from '@/utils/documentation-loader';

export const ServerRoute = createServerFileRoute('/sitemap.xml').methods({
  GET: async ({ request, params }) => {
    const baseUrl = `https://dropfi.app`;

    // Get all available documentation pages
    const documentationPages = getPageMetadata();

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
    ];

    return new Response(generateSitemapIndexXml(urls), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  },
});

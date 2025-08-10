export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapIndexUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlUrls = urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlUrls}
</urlset>`;
}

export function generateSitemapIndexXml(urls: SitemapIndexUrl[]): string {
  const xmlUrls = urls
    .map(
      (url) => `
    <sitemap>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    </sitemap>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlUrls}
</sitemapindex>`;
}

export function generateCoreSitemap(): string {
  const baseUrl = 'https://dropfi.app';
  const urls: SitemapUrl[] = [
    {
      loc: baseUrl,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/onboard`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/terms`,
      changefreq: 'yearly',
      priority: 0.3,
    },
    {
      loc: `${baseUrl}/privacy`,
      changefreq: 'yearly',
      priority: 0.3,
    },
    {
      loc: `${baseUrl}/links`,
      changefreq: 'monthly',
      priority: 0.5,
    },
  ];

  return generateSitemapXml(urls);
}

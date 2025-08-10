import { type ReactNode } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  children?: ReactNode;
}

interface HeadObject {
  meta: Array<{
    title?: string;
    name?: string;
    content?: string;
    property?: string;
  }>;
  links: Array<{
    rel: string;
    href: string;
  }>;
}

export function createSEO({
  title = 'DropFi - Decentralized XRPL Wallet & DEX',
  description = 'DropFi is the most secure and user-friendly XRPL wallet for trading, liquidity provision, and NFT management. Experience true decentralization with zero permission architecture.',
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: SEOProps): HeadObject {
  const siteUrl = 'https://dropfi.app';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return {
    meta: [
      // Title must be in meta array for TanStack Router
      { title },
      // Basic Meta Tags
      { name: 'description', content: description },
      { name: 'canonical', content: fullCanonical },
      {
        name: 'keywords',
        content: 'DropFi, XRPL, XRP, cryptocurrency, wallet, DEX, decentralized exchange, NFT, liquidity, trading, blockchain',
      },
      { name: 'author', content: 'DropFi Team' },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'English' },

      // Open Graph Meta Tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: fullCanonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'DropFi' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Meta Tags
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@DropFi' },
      { name: 'twitter:creator', content: '@DropFi' },
    ],
    links: [{ rel: 'canonical', href: fullCanonical }],
  };
}

import { DocumentationPage } from '@/components/documentation/documentation-page-builder';

// Import all documentation JSON files
import walletData from '@/data/documentation/wallet.json';
// import swapData from '@/data/documentation/swap.json';
// import liquidityData from '@/data/documentation/liquidity.json';
// import nftMarketplaceData from '@/data/documentation/nft-marketplace.json';
import xrplInjectionApiData from '@/data/documentation/xrpl-injection-api.json';
import dropfiExtensionData from '@/data/documentation/dropfi-extension.json';
import dropfiMobileAppData from '@/data/documentation/dropfi-mobile-app.json';

// Map of all available documentation pages
export const documentationPages: Record<string, DocumentationPage> = {
  wallet: walletData as DocumentationPage,
  // swap: swapData as DocumentationPage,
  // liquidity: liquidityData as DocumentationPage,
  // 'nft-marketplace': nftMarketplaceData as DocumentationPage,
  'xrpl-injection-api': xrplInjectionApiData as DocumentationPage,
  'dropfi-extension': dropfiExtensionData as DocumentationPage,
  'dropfi-mobile-app': dropfiMobileAppData as DocumentationPage,
};

// Get all available page slugs
export const getAvailablePages = (): string[] => {
  return Object.keys(documentationPages);
};

// Get a specific page by slug
export const getPage = (slug: string): DocumentationPage | null => {
  return documentationPages[slug] || null;
};

// Get page metadata for navigation
export const getPageMetadata = () => {
  return Object.entries(documentationPages).map(([slug, page]) => ({
    slug,
    title: page.title,
    description: page.description,
  }));
};

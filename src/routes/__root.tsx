/// <reference types="vite/client" />
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import type { QueryClient } from '@tanstack/react-query';
import appCss from '@/styles/app.css?url';
import { createSEO } from '@/utils/create-seo';
import { XrplProvider } from '@dropfi/xrpl-react';
import { Toaster } from 'sonner';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  loader: async ({ context: { queryClient } }) => {
    return {};
  },
  head: () => {
    const seoData = createSEO({
      title: 'DropFi - Decentralized XRPL Wallet & DEX',
      description:
        'DropFi is the most secure and user-friendly XRPL wallet for trading, liquidity provision, and NFT management. Experience true decentralization with zero permission architecture.',
    });

    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        ...seoData.meta,
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png',
        },
        { rel: 'manifest', href: '/site.webmanifest', color: '#ffffff' },
        { rel: 'icon', href: '/favicon.ico' },
        ...seoData.links,
      ],
    };
  },
  errorComponent: (props) => <RootDocument>{props.error.message}</RootDocument>,
  notFoundComponent: () => <RootDocument>Not Found</RootDocument>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // Get theme from middleware cookie or something.

  return (
    <html className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Toaster richColors />
        <XrplProvider>{children}</XrplProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}

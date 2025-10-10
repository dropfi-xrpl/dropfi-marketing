import { createServerFileRoute } from '@tanstack/react-start/server';

export const ServerRoute = createServerFileRoute('/apple-app-site-assocation').methods({
  GET: async ({ request, params }) => {
    return new Response(
      JSON.stringify({
        applinks: {
          apps: [],
          details: [
            {
              appID: '9DL7MXF5ZV.com.dropfi.app',
              paths: ['/open/*', '/payload/*', '/sign/*', '/deeplink/*'],
            },
          ],
        },
        webcredentials: {
          apps: ['9DL7MXF5ZV.com.dropfi.app'],
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  },
});

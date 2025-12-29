// @ts-ignore - createServerFileRoute is available at runtime
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      POST: async () => {
        const headers = new Headers();

        headers.append('Set-Cookie', `session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);

        return new Response('OK', { status: 200, headers });
      },
    },
  },
});

import { createServerFileRoute } from '@tanstack/react-start/server';
import { json } from '@tanstack/react-start';

export const ServerRoute = createServerFileRoute('/api/auth/logout').methods({
  POST: async () => {
    const headers = new Headers();

    headers.append('Set-Cookie', `session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);

    return json({ success: true }, { status: 200, headers });
  },
});

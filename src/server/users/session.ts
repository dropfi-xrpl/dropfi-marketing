import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export const getSession = createServerFn({
  method: 'POST',
}).handler(async () => {
  const access_token = getCookie('session');
  return access_token;
});

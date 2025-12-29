import { createMiddleware } from '@tanstack/react-start';
import { getCookie, getRequest } from '@tanstack/react-start/server';
import jwt from 'jsonwebtoken';

export const authMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const request = getRequest();
  if (!request) {
    throw new Error('No request');
  }

  const access_token = getCookie('session');
  if (!access_token) throw new Error('No access token');
  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET!) as { wallet_address: string };

  return next({
    context: { request, access_token, wallet_address: decoded.wallet_address },
  });
});

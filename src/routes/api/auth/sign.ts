// @ts-ignore - createServerFileRoute is available at runtime
import { createServerFileRoute } from '@tanstack/react-start/server';
import { json } from '@tanstack/react-start';
import dayjs from 'dayjs';
import { verify, deriveAddress } from 'ripple-keypairs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const ServerRoute = createServerFileRoute('/api/auth/sign').methods({
  POST: async ({ request }: { request: Request }) => {
    const { message, publicKey, signature } = await request.json();
    const timestampLine = message.split('\n').find((line: string) => line.startsWith('Timestamp:'));
    const timestampStr = timestampLine?.replace('Timestamp:', '').trim();
    if (!timestampStr || !dayjs(timestampStr).isValid()) {
      throw new Error('Invalid timestamp');
    }
    const MAX_AGE_SECONDS = 60;
    const age = dayjs().diff(dayjs(timestampStr), 'second');
    if (age > MAX_AGE_SECONDS) throw new Error('Signature expired');

    const messageHex = Buffer.from(message, 'utf8').toString('hex');
    if (!verify(messageHex, signature, publicKey)) throw new Error('Invalid signature');
    const wallet_address = deriveAddress(publicKey);
    let { data, error } = await supabase.from('users').select('*').eq('wallet_address', wallet_address);
    if (error) throw new Error(error.message);
    let user = data?.[0];
    if (!user) throw new Error('User not found');
    console.log(user);

    const access_token = jwt.sign({ wallet_address }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '240h',
    });

    // Set cookie
    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `session=${access_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24 * 10}`, // 10 days
    );

    return json({ success: true }, { status: 200, headers });
  },
});

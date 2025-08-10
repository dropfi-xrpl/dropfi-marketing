import { createServerFn } from '@tanstack/react-start';
import { authMiddleware } from '@/server/middleware/authMiddleware';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const getSelf = createServerFn({
  method: 'POST',
})
  .middleware([authMiddleware])
  .handler(async ({ context: { wallet_address } }) => {
    const { data, error } = await supabase.from('users').select('*').eq('wallet_address', wallet_address);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });

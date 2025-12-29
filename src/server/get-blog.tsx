import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const getBlogPost = createServerFn({
  method: 'GET',
})
  .inputValidator(
    z.object({
      slug: z.string(),
    }),
  )
  .handler(async ({ data: input }) => {
    const { slug } = input;
    const { data, error } = await supabase.from('post').select().eq('slug', slug).single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  });

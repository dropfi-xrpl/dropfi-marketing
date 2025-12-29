import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const listBlogs = createServerFn({
  method: 'GET',
})
  .inputValidator(
    z.object({
      limit: z.number().optional().default(10),
      offset: z.number().optional().default(0),
    }),
  )
  .handler(async ({ data: input }) => {
    const { limit, offset } = input;
    const { data } = await supabase
      .from('post')
      .select('*')
      .range(offset, offset + limit);
    return data;
  });

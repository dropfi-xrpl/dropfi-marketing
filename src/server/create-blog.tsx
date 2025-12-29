import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { authMiddleware } from './middleware/authMiddleware';
const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const createBlogPost = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({
      title: z.string(),
      contentJSON: z.any(),
      slug: z.string(),
      seo: z.object({
        metaTitle: z.string(),
        metaDescription: z.string(),
        canonicalUrl: z.string(),
        ogImage: z.string(),
        indexable: z.boolean(),
      }),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ data: input }) => {
    const { title, contentJSON, slug, seo } = input;
    const { data } = await supabase.from('post').insert([{ title, contentJSON, slug, seo }]).select();
    return data;
  });

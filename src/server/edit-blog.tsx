import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
const supabaseUrl = 'https://swkfzyxjrzhimhlsuatg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

export const editBlogPost = createServerFn({
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
  .handler(async ({ data: input }) => {
    const { title, contentJSON, slug, seo } = input;
    const { data } = await supabase.from('post').update({ title, contentJSON, slug, seo }).eq('slug', slug).select();
    return data;
  });

export interface BlogPost {
  id: number;
  created_at: string;
  title: string;
  contentJSON: {
    type: string;
    content: Array<{
      type: string;
      attrs?: any;
      content?: Array<{
        type: string;
        text?: string;
        attrs?: any;
      }>;
    }>;
  };
  seo: {
    ogImage?: string;
    indexable: boolean;
    metaTitle: string;
    canonicalUrl: string;
    metaDescription: string;
  };
  slug: string;
}

/**
 * Extracts the first image from blog post content
 */
export function extractFirstImage(post: BlogPost): string | null {
  // First try to use the ogImage from SEO
  if (post.seo?.ogImage) {
    return post.seo.ogImage;
  }

  // Then try to find the first image in contentJSON
  if (post.contentJSON?.content) {
    for (const block of post.contentJSON.content) {
      if (block.type === 'image' && block.attrs?.src) {
        return block.attrs.src;
      }

      // Check nested content for images
      if (block.content) {
        for (const item of block.content) {
          if (item.type === 'image' && item.attrs?.src) {
            return item.attrs.src;
          }
        }
      }
    }
  }

  return null;
}

/**
 * Extracts plain text from blog post content for previews
 */
export function extractPlainText(post: BlogPost): string {
  if (!post.contentJSON?.content) return '';

  let text = '';

  for (const block of post.contentJSON.content) {
    if (block.content) {
      for (const item of block.content) {
        if (item.type === 'text' && item.text) {
          text += item.text + ' ';
        }
      }
    }
  }

  return text.trim();
}

/**
 * Formats the created_at date for display
 */
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

/**
 * Calculates reading time based on content length
 */
export function calculateReadingTime(post: BlogPost): number {
  const text = extractPlainText(post);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)); // 200 words per minute
}

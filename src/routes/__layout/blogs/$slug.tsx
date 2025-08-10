import { createFileRoute, Link as RouterLink, redirect, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getBlogPost } from '@/server/get-blog';
import { BlogPost, extractFirstImage, formatBlogDate, calculateReadingTime } from '@/utils/blog-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, CalendarDays, User } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { createSEO } from '@/utils/create-seo';
import { useEffect } from 'react';
import Header from '@/components/Header';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import DownloadSection from '@/components/index/DownloadSection';

export const Route = createFileRoute('/__layout/blogs/$slug')({
  loader: async ({ context, params }) => {
    const { slug } = params;
    const { data: post } = await getBlogPost({ data: { slug } });
    if (!post) throw redirect({ to: '/blogs' });
    return { post };
  },
  head: ({ loaderData }) => {
    const { post } = loaderData!;
    if (!post) {
      return {
        title: 'Blog Post Not Found - DropFi Wallet',
        meta: [{ name: 'description', content: 'The requested blog post could not be found.' }],
      };
    }

    const seoData = createSEO({
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || 'Read this blog post on DropFi.',
      canonical: post.seo?.canonicalUrl || `/blogs/${post.slug}`,
      ogImage: post.seo?.ogImage || extractFirstImage(post) || '/og-image.png',
      ogType: 'article',
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { post } = Route.useLoaderData();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog', post?.slug],
    queryFn: () => getBlogPost({ data: { slug: post?.slug || '' } }),
    enabled: !!post?.slug,
  });

  const currentPost = blog?.data || post;

  if (error || (!isLoading && !currentPost)) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate({ to: '/blogs' })}>Back to Blogs</Button>
              <Button variant="outline" onClick={() => navigate({ to: '/' })}>
                Go Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading || !currentPost) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        <main className="relative z-10 min-h-screen">
          <div className="container mx-auto pt-24 pb-16 px-4">
            <BlogPostSkeleton />
          </div>
        </main>
      </div>
    );
  }

  const imageUrl = extractFirstImage(currentPost);
  const readingTime = calculateReadingTime(currentPost);
  const formattedDate = formatBlogDate(currentPost.created_at);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      {/* Main Content */}
      <main className="relative z-10 min-h-screen pt-16">
        {/* Back Button */}
        <div className="container mx-auto pt-6 px-4">
          <Button variant="ghost" onClick={() => navigate({ to: '/blogs' })} className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </Button>
        </div>

        {/* Blog Post */}
        <article className="container mx-auto max-w-4xl px-4 pb-24">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary backdrop-blur-xs mb-6">
              <CalendarDays className="w-4 h-4" />
              <span>Blog Post</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">{currentPost.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                DropFi Team
              </div>
            </div>

            {/* Featured Image */}
            {/* {imageUrl && (
              <div className="relative w-full max-w-3xl mx-auto mb-8">
                <img src={imageUrl} alt={currentPost.title} className="w-full h-auto rounded-2xl shadow-2xl" />
              </div>
            )} */}
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <TipTapRenderer content={currentPost.contentJSON} />
          </div>

          <DownloadSection />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate({ to: '/blogs' })} className="group">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blogs
              </Button>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Post
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}

function TipTapRenderer({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: ['textStyle'] }),
      TextStyle,
      Underline,
      Highlight,
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),
      StarterKit.configure({
        dropcursor: { width: 2 },
        heading: { levels: [1, 2, 3] },
      }),
      Link.configure({ openOnClick: true, autolink: true, defaultProtocol: 'https' }),
      Image.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="tiptap-content prose prose-lg prose-neutral dark:prose-invert max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-32 mx-auto mb-6" />
        <Skeleton className="h-16 w-full mb-6" />
        <div className="flex items-center justify-center gap-6 mb-8">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-96 w-full max-w-3xl mx-auto mb-8" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
      </div>
    </div>
  );
}

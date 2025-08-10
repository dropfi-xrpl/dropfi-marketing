import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { listBlogs } from '@/server/list-blogs';
import { BlogPost, extractFirstImage, extractPlainText, formatBlogDate, calculateReadingTime } from '@/utils/blog-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { createSEO } from '@/utils/create-seo';
import Header from '@/components/Header';

export const Route = createFileRoute('/__layout/blogs/')({
  head: () => {
    const seoData = createSEO({
      title: 'Blog - DropFi Wallet',
      description: 'Read the latest insights, updates, and guides about DropFi, XRPL, and decentralized finance.',
      canonical: '/blogs',
      ogImage: '/og-image.png',
      ogType: 'website',
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => listBlogs({ data: { limit: 50, offset: 0 } }),
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Failed to load blogs</h2>
          <p className="text-muted-foreground mb-4">Something went wrong while fetching the blog posts.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      {/* Main Content */}
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary backdrop-blur-xs mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Latest Insights & Updates</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-6">
              DropFi <span className="text-gradient">Blog</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover the latest insights about XRPL, decentralized finance, and the future of digital assets.
            </p>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : blogs && blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog: BlogPost) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground mb-6">We're working on some great content. Check back soon!</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function BlogCard({ blog }: { blog: BlogPost }) {
  const imageUrl = extractFirstImage(blog);
  const excerpt = extractPlainText(blog).slice(0, 120) + '...';
  const readingTime = calculateReadingTime(blog);
  const formattedDate = formatBlogDate(blog.created_at);

  return (
    <Link to={`/blogs/${blog.slug}` as any} className="group">
      <Card className="h-full bg-card/80 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group-hover:scale-[1.02] overflow-hidden">
        {/* Image */}
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        <CardHeader className="pb-3">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BlogCardSkeleton() {
  return (
    <Card className="h-full bg-card/80 backdrop-blur-xl border border-white/10 overflow-hidden">
      <div className="h-48 bg-muted animate-pulse" />
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  );
}

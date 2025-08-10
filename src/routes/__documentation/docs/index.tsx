import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Download, Code, TrendingUp, ArrowRight, Star, Users, Rocket, Target, Globe, Smartphone } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { getPageMetadata } from '@/utils/documentation-loader';
import { createSEO } from '@/utils/create-seo';

export const Route = createFileRoute('/__documentation/docs/')({
  head: () => {
    const seoData = createSEO({
      title: 'DropFi Documentation - Complete Guide to XRPL Wallet & DEX',
      description:
        'Comprehensive documentation for DropFi wallet, browser extension, mobile app, and developer tools. Learn how to use DropFi for XRPL trading, liquidity provision, and NFT management.',
      canonical: '/docs',
      ogImage: '/og-image.png',
      ogType: 'website',
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
    };
  },
  component: DocumentationIndex,
});

// Icon mapping for documentation pages
const pageIcons: Record<string, any> = {
  wallet: Download,
  'xrpl-injection-api': Code,
  'dropfi-extension': Globe,
  'dropfi-mobile-app': Smartphone,
};

// Badge mapping for documentation pages
const pageBadges: Record<string, string> = {
  wallet: 'Essential',
  'xrpl-injection-api': 'Technical',
  'dropfi-extension': 'Browser',
  'dropfi-mobile-app': 'Mobile',
};

// Generate documentation sections dynamically based on available pages
const documentationSections = [
  {
    title: 'Getting Started',
    description: 'Essential guides to get you started with DropFi',
    items: getPageMetadata()
      .filter((page) => ['wallet'].includes(page.slug))
      .map((page) => ({
        title: page.title,
        description: page.description,
        href: `/docs/${page.slug}`,
        icon: pageIcons[page.slug] || BookOpen,
        badge: pageBadges[page.slug],
        color: 'from-emerald-500 to-emerald-600',
      })),
  },
  {
    title: 'Wallet Platforms',
    description: 'Choose your preferred platform for DropFi',
    items: getPageMetadata()
      .filter((page) => ['dropfi-extension', 'dropfi-mobile-app'].includes(page.slug))
      .map((page) => ({
        title: page.title,
        description: page.description,
        href: `/docs/${page.slug}`,
        icon: pageIcons[page.slug] || BookOpen,
        badge: pageBadges[page.slug],
        color: page.slug === 'dropfi-extension' ? 'from-purple-500 to-purple-600' : 'from-teal-500 to-teal-600',
      })),
  },
  {
    title: 'Developer Resources',
    description: 'Technical documentation and API references',
    items: getPageMetadata()
      .filter((page) => ['xrpl-injection-api'].includes(page.slug))
      .map((page) => ({
        title: page.title,
        description: page.description,
        href: `/docs/${page.slug}`,
        icon: pageIcons[page.slug] || BookOpen,
        badge: pageBadges[page.slug],
        color: 'from-slate-500 to-slate-600',
      })),
  },
];

const quickStats = [
  {
    label: 'Active Users',
    value: '50K+',
    icon: Users,
    color: 'text-primary-500',
  },
  {
    label: 'Total Volume',
    value: '$2.5B+',
    icon: TrendingUp,
    color: 'text-emerald-500',
  },
  {
    label: 'Supported Tokens',
    value: '100+',
    icon: Target,
    color: 'text-blue-500',
  },
  {
    label: 'Success Rate',
    value: '99.9%',
    icon: Star,
    color: 'text-amber-500',
  },
];

const gettingStartedSteps = [
  {
    step: 1,
    title: 'Download DropFi Wallet',
    description: 'Get the most secure XRPL wallet for trading',
    href: '/docs/wallet',
  },
  {
    step: 2,
    title: 'Choose Your Platform',
    description: 'Select between browser extension or mobile app',
    href: '/docs/dropfi-extension',
  },
  {
    step: 3,
    title: 'Explore Developer Tools',
    description: 'Learn about XRPL integration and APIs',
    href: '/docs/xrpl-injection-api',
  },
];

function DocumentationIndex() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
          <BookOpen className="h-4 w-4" />
          <span>Welcome to DropFi Documentation</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-medium">
          <span className="gradient-text-flame">Learn DropFi</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to know about DropFi wallet, browser extension, mobile app, and developer tools for the XRP Ledger. From
          beginners to advanced developers, we've got you covered.
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={cn('flex justify-center mb-2', stat.color)}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-medium">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-medium mb-4">Getting Started</h2>
          <p className="text-lg text-muted-foreground">Follow these steps to get up and running with DropFi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gettingStartedSteps.map((step, index) => (
            <Link key={index} to={step.href}>
              <Card className="p-6 glass-card border-border/30 hover:border-primary-500/30 transition-all duration-300 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <div className="flex items-center text-sm text-primary-500 font-medium">
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="space-y-8">
        {documentationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium mb-2">{section.title}</h2>
              <p className="text-muted-foreground">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <Link key={itemIndex} to={item.href}>
                    <Card className="p-6 glass-card border-border/30 hover:border-primary-500/30 transition-all duration-300 group cursor-pointer h-full">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={cn('p-3 rounded-xl bg-gradient-to-r', item.color)}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className={cn(
                                'text-xs',
                                item.badge === 'Essential' && 'bg-emerald-500/10 text-emerald-600',
                                item.badge === 'Popular' && 'bg-primary-500/10 text-primary-600',
                                item.badge === 'Advanced' && 'bg-amber-500/10 text-amber-600',
                                item.badge === 'New' && 'bg-blue-500/10 text-blue-600',
                                item.badge === 'Technical' && 'bg-slate-500/10 text-slate-600',
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                          <div className="flex items-center text-sm text-primary-500 font-medium">
                            Learn More
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="p-8 glass-card border-primary-500/30 bg-gradient-to-r from-primary-500/5 to-secondary-500/5">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
            <Rocket className="h-4 w-4" />
            <span>Ready to Start?</span>
          </div>

          <h3 className="text-2xl font-medium">Begin Your DropFi Journey</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a beginner looking to set up your DropFi wallet or a developer building on XRPL, our comprehensive documentation
            will guide you every step of the way.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to={'/docs/wallet' as any}>
              <Button className="bg-primary-500 hover:bg-primary-600">
                <Download className="h-4 w-4 mr-2" />
                Download Wallet
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to={'/docs/dropfi-extension' as any}>
              <Button variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Browser Extension
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Download, ArrowUpRight, Sparkles, Palette, Code, Globe, Smartphone, Menu, X } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import { TableOfContents } from '@/components/documentation/table-of-contents';
import { DocumentationProvider, useDocumentation } from '@/contexts/documentation-context';
import { getPageMetadata } from '@/utils/documentation-loader';
import { useState } from 'react';

export const Route = createFileRoute('/__documentation')({
  component: DocumentationLayout,
});

// Icon mapping for documentation pages
const pageIcons: Record<string, any> = {
  wallet: Download,
  swap: ArrowUpRight,
  liquidity: Sparkles,
  'nft-marketplace': Palette,
  'xrpl-injection-api': Code,
  'dropfi-extension': Globe,
  'dropfi-mobile-app': Smartphone,
};

// Badge mapping for documentation pages
const pageBadges: Record<string, string> = {
  wallet: 'Essential',
  swap: 'Popular',
  liquidity: 'Advanced',
  'nft-marketplace': 'New',
  'xrpl-injection-api': 'Technical',
  'dropfi-extension': 'Browser',
  'dropfi-mobile-app': 'Mobile',
};

// Generate documentation sections dynamically
const documentationSections = [
  {
    title: 'Getting Started',
    items: getPageMetadata()
      .filter((page) => ['wallet'].includes(page.slug))
      .map((page) => ({
        title: page.title,
        description: page.description,
        href: `/docs/${page.slug}`,
        icon: pageIcons[page.slug] || BookOpen,
        badge: pageBadges[page.slug],
      })),
  },
  // {
  //   title: 'Core Features',
  //   items: getPageMetadata()
  //     .filter((page) => ['swap', 'liquidity', 'nft-marketplace'].includes(page.slug))
  //     .map((page) => ({
  //       title: page.title,
  //       description: page.description,
  //       href: `/docs/${page.slug}`,
  //       icon: pageIcons[page.slug] || BookOpen,
  //       badge: pageBadges[page.slug],
  //     })),
  // },
  {
    title: 'Wallet Platforms',
    items: getPageMetadata()
      .filter((page) => ['dropfi-extension', 'dropfi-mobile-app'].includes(page.slug))
      .map((page) => ({
        title: page.title,
        description: page.description,
        href: `/docs/${page.slug}`,
        icon: pageIcons[page.slug] || BookOpen,
        badge: pageBadges[page.slug],
      })),
  },
  {
    title: 'Developer Resources',
    items: getPageMetadata()
      .filter((page) => ['xrpl-injection-api'].includes(page.slug))
      .map((page) => ({
        title: page.title,
        description: page.description,
        href: `/docs/${page.slug}`,
        icon: pageIcons[page.slug] || BookOpen,
        badge: pageBadges[page.slug],
      })),
  },
];

function DocumentationLayoutContent() {
  const { pathname } = useLocation();
  const { tableOfContents } = useDocumentation();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-background border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            <span className="text-sm font-medium">Menu</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Contents</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Documentation Layout */}
      <div className="flex h-[calc(100vh)] pt-16 lg:pt-16">
        {/* Left Sidebar - Main Sections */}
        <div
          className={cn(
            'fixed lg:static lg:inset-y-0 left-0 z-30 w-80 lg:w-64 border-r border-border/50 bg-background lg:bg-muted/20 overflow-y-auto transform transition-transform duration-300 ease-in-out',
            'top-[calc(4rem+3.5rem)] lg:top-0', // Position below mobile nav bar on mobile, normal on desktop
            isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-500" />
                <h2 className="text-lg font-semibold">Documentation</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsLeftSidebarOpen(false)} className="lg:hidden">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {documentationSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <Link key={itemIndex} to={item.href} onClick={() => setIsLeftSidebarOpen(false)}>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start h-auto p-3 relative overflow-hidden group text-left',
                              isActive
                                ? 'text-primary-500 bg-primary-500/10 border border-primary-500/20'
                                : 'hover:text-primary-500 hover:bg-primary-500/5',
                            )}
                          >
                            <div className="flex items-start gap-3 w-full">
                              <div
                                className={cn(
                                  'p-2 rounded-lg transition-colors flex-shrink-0',
                                  isActive ? 'bg-primary-500/20' : 'bg-muted/50 group-hover:bg-primary-500/10',
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm truncate">{item.title}</span>
                                  {item.badge && (
                                    <Badge
                                      variant="secondary"
                                      className={cn(
                                        'text-xs px-1.5 py-0.5 flex-shrink-0',
                                        item.badge === 'Essential' && 'bg-emerald-500/10 text-emerald-600',
                                        item.badge === 'Popular' && 'bg-primary-500/10 text-primary-600',
                                        item.badge === 'Advanced' && 'bg-amber-500/10 text-amber-600',
                                        item.badge === 'New' && 'bg-blue-500/10 text-blue-600',
                                        item.badge === 'Technical' && 'bg-slate-500/10 text-slate-600',
                                        item.badge === 'Browser' && 'bg-purple-500/10 text-purple-600',
                                        item.badge === 'Mobile' && 'bg-teal-500/10 text-teal-600',
                                      )}
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                              </div>
                            </div>
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-r-full" />
                            )}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Content Area */}
        <div className="flex-1 overflow-y-auto min-w-0">
          <div className="max-w-4xl mx-auto p-4 lg:p-8">
            <Outlet />
          </div>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <div
          className={cn(
            'fixed lg:static lg:inset-y-0 right-0 z-30 w-80 border-l border-border/50 bg-background lg:bg-muted/20 overflow-y-auto transform transition-transform duration-300 ease-in-out',
            'top-[calc(4rem+3.5rem)] lg:top-0', // Position below mobile nav bar on mobile, normal on desktop
            isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
          )}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">On This Page</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsRightSidebarOpen(false)} className="lg:hidden">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {tableOfContents.length > 0 ? (
              <TableOfContents items={tableOfContents} />
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Select a documentation page to see its table of contents</div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Overlay */}
        {(isLeftSidebarOpen || isRightSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => {
              setIsLeftSidebarOpen(false);
              setIsRightSidebarOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function DocumentationLayout() {
  return (
    <DocumentationProvider>
      <DocumentationLayoutContent />
    </DocumentationProvider>
  );
}

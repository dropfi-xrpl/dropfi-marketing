import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
      },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="text-sm text-muted-foreground">No sections available</div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="sm"
          className={cn(
            'w-full justify-start h-auto p-2 text-left relative group',
            'hover:text-primary-500 hover:bg-primary-500/5 transition-colors',
            activeId === item.id && 'text-primary-500 bg-primary-500/10 border border-primary-500/20',
          )}
          style={{ paddingLeft: `${(item.level - 1) * 16 + 8}px` }}
          onClick={() => scrollToSection(item.id)}
        >
          <div className="flex items-center gap-2 w-full">
            <ChevronRight
              className={cn('h-3 w-3 transition-transform', activeId === item.id ? 'rotate-90 text-primary-500' : 'text-muted-foreground')}
            />
            <span className="text-sm font-medium truncate">{item.title}</span>
          </div>
          {activeId === item.id && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-r-full" />
          )}
        </Button>
      ))}
    </div>
  );
}

// Hook to automatically extract headings from the page
export function useTableOfContents() {
  const [items, setItems] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    // Use a small delay to ensure content is rendered
    const timer = setTimeout(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter((heading) => {
          // Only include headings that have an id
          return heading.id && heading.textContent;
        })
        .map((heading) => ({
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
        }));

      setItems(headings);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Also re-run when the URL changes (new page loaded)
  useEffect(() => {
    const handleRouteChange = () => {
      const timer = setTimeout(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
          .filter((heading) => {
            return heading.id && heading.textContent;
          })
          .map((heading) => ({
            id: heading.id,
            title: heading.textContent || '',
            level: parseInt(heading.tagName.charAt(1)),
          }));

        setItems(headings);
      }, 100);

      return () => clearTimeout(timer);
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return items;
}

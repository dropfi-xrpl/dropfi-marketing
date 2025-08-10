import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDocumentation } from '@/contexts/documentation-context';
import appStoreBadge from '@/assets/badge-appstore.svg';
import googlePlayBadge from '@/assets/badge-googleplay.png';
import chromeBadge from '@/assets/badge-chrome.png';
import { STORE_LINKS } from '@/constants/storeLinks';
import {
  Download,
  ArrowUpRight,
  Sparkles,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  ExternalLink,
  Clock,
  DollarSign,
  Percent,
  TrendingUp,
  Zap,
  Code,
  FileText,
  Database,
  Palette,
  Calculator,
  PieChart,
  Star,
  Users,
  Target,
  Rocket,
  BookOpen,
  Monitor,
  Smartphone,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<any>> = {
  Download,
  ArrowUpRight,
  Sparkles,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  ExternalLink,
  Clock,
  DollarSign,
  Percent,
  TrendingUp,
  Zap,
  Code,
  FileText,
  Database,
  Palette,
  Calculator,
  PieChart,
  Star,
  Users,
  Target,
  Rocket,
  BookOpen,
  Monitor,
  Smartphone,
  Globe,
};

// Type definitions for the JSON schema
export interface DocumentationComponent {
  type: string;
  id?: string;
  className?: string;
  [key: string]: any;
}

export interface DocumentationSection {
  type: 'section';
  id: string;
  title: string;
  components: DocumentationComponent[];
}

export interface DocumentationPage {
  title: string;
  description?: string;
  sections: DocumentationSection[];
}

// Component renderers
const renderComponent = (component: DocumentationComponent, index: number): React.ReactNode => {
  const { type, className, ...props } = component;

  switch (type) {
    case 'header':
      return <HeaderComponent {...props} className={className} />;

    case 'row':
      return <RowComponent {...props} className={className} />;

    case 'grid':
      return <GridComponent {...props} className={className} />;

    case 'card':
      return <CardComponent {...props} className={className} />;

    case 'feature-grid':
      return <FeatureGridComponent {...props} className={className} />;

    case 'step-list':
      return <StepListComponent {...props} className={className} />;

    case 'tip-grid':
      return <TipGridComponent {...props} className={className} />;

    case 'stats-grid':
      return <StatsGridComponent {...props} className={className} />;

    case 'code-block':
      return <CodeBlockComponent {...props} className={className} />;

    case 'api-endpoints':
      return <ApiEndpointsComponent {...props} className={className} />;

    case 'call-to-action':
      return <CallToActionComponent {...props} className={className} />;

    case 'download-section':
      return <DownloadSectionComponent {...props} className={className} />;

    case 'badge':
      return <BadgeComponent {...props} className={className} />;

    case 'button':
      return <ButtonComponent {...props} className={className} />;

    case 'text':
      return <TextComponent {...props} className={className} />;

    case 'divider':
      return <DividerComponent {...props} className={className} />;

    case 'list':
      return <ListComponent {...props} className={className} />;

    case 'div':
      return <DivComponent {...props} className={className} />;

    case 'icon':
      return <IconComponent {...props} className={className} />;

    default:
      console.warn(`Unknown component type: ${type}`);
      return null;
  }
};

// Individual component implementations
const HeaderComponent: React.FC<any> = ({ title, subtitle, icon, className }) => {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className={cn('space-y-3 md:space-y-4', className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
        {Icon && <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary-500 flex-shrink-0" />}
        <h1 className="text-2xl md:text-3xl font-medium leading-tight">{title}</h1>
      </div>
      {subtitle && <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
};

const RowComponent: React.FC<any> = ({ children, className, gap = 6 }) => {
  return (
    <div className={cn(`space-y-${gap}`, className)}>
      {children?.map((child: DocumentationComponent, index: number) => renderComponent(child, index))}
    </div>
  );
};

const GridComponent: React.FC<any> = ({ children, className, cols = 1, gap = 6 }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn(`grid gap-${gap}`, gridCols[cols as keyof typeof gridCols], className)}>
      {children?.map((child: DocumentationComponent, index: number) => renderComponent(child, index))}
    </div>
  );
};

const CardComponent: React.FC<any> = ({ children, className, variant = 'default', ...props }) => {
  const cardVariants = {
    default: 'glass-card border-border/30',
    highlighted: 'glass-card border-primary-500/30 bg-primary-500/5',
    success: 'glass-card border-emerald-500/30 bg-emerald-500/5',
    warning: 'glass-card border-amber-500/30 bg-amber-500/5',
  };

  return (
    <Card className={cn(cardVariants[variant as keyof typeof cardVariants], className)} {...props}>
      {children?.map((child: DocumentationComponent, index: number) => renderComponent(child, index))}
    </Card>
  );
};

const FeatureGridComponent: React.FC<any> = ({ features, className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6', className)}>
      {features?.map((feature: any, index: number) => {
        const Icon = feature.icon ? iconMap[feature.icon] : null;
        return (
          <Card key={index} className="p-4 md:p-6 glass-card border-border/30 hover:border-primary-500/30 transition-all duration-300">
            <div className="space-y-3 md:space-y-4">
              <div className={cn('p-2 md:p-3 rounded-xl bg-primary-500/10 w-fit', feature.color)}>
                {Icon && <Icon className="h-5 w-5 md:h-6 md:w-6" />}
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm md:text-base">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const StepListComponent: React.FC<any> = ({ steps, className }) => {
  return (
    <div className={cn('space-y-4 md:space-y-6', className)}>
      {steps?.map((step: any, index: number) => (
        <Card key={index} className="p-4 md:p-6 glass-card border-border/30">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <div className="flex-shrink-0 flex justify-center sm:justify-start">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-base md:text-lg">
                {step.step}
              </div>
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-semibold">{step.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              {step.details && <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed">{step.details}</p>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

const TipGridComponent: React.FC<any> = ({ tips, className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {tips?.map((tip: any, index: number) => {
        const Icon = tip.icon ? iconMap[tip.icon] : null;
        return (
          <Card key={index} className="p-6 glass-card border-border/30">
            <div className="flex items-start gap-4">
              <div className={cn('p-3 rounded-xl', tip.type === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10')}>
                {Icon && <Icon className={cn('h-6 w-6', tip.type === 'warning' ? 'text-amber-500' : 'text-blue-500')} />}
              </div>
              <div>
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const StatsGridComponent: React.FC<any> = ({ stats, className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {stats?.map((stat: any, index: number) => {
        const Icon = stat.icon ? iconMap[stat.icon] : null;
        return (
          <Card key={index} className="p-6 glass-card border-border/30">
            <div className="text-center space-y-4">
              <div className={cn('p-3 rounded-xl bg-primary-500/10 w-fit mx-auto', stat.color)}>{Icon && <Icon className="h-6 w-6" />}</div>
              <div>
                <h3 className="text-2xl font-medium text-primary-500">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const CodeBlockComponent: React.FC<any> = ({ title, code, language = 'json', className }) => {
  return (
    <Card className={cn('p-6 glass-card border-border/30', className)}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {title && (
          <>
            <FileText className="h-5 w-5 text-primary-500" />
            {title}
          </>
        )}
      </h3>
      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-slate-300">
          <code>{code}</code>
        </pre>
      </div>
    </Card>
  );
};

const ApiEndpointsComponent: React.FC<any> = ({ endpoints, className }) => {
  return (
    <Card className={cn('p-6 glass-card border-border/30', className)}>
      <div className="space-y-4">
        {endpoints?.map((endpoint: any, index: number) => (
          <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant="secondary"
                className={cn(
                  'text-xs',
                  endpoint.method === 'GET' && 'bg-blue-500/10 text-blue-600',
                  endpoint.method === 'POST' && 'bg-emerald-500/10 text-emerald-600',
                  endpoint.method === 'PUT' && 'bg-amber-500/10 text-amber-600',
                )}
              >
                {endpoint.method}
              </Badge>
              <code className="text-sm font-mono bg-background px-2 py-1 rounded">{endpoint.endpoint}</code>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
            <p className="text-xs text-muted-foreground">Parameters: {endpoint.params}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CallToActionComponent: React.FC<any> = ({ title, description, buttons, className }) => {
  return (
    <Card className={cn('p-4 md:p-6 glass-card border-primary-500/30 bg-primary-500/5', className)}>
      <div className="text-center space-y-4">
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground px-2">{description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          {buttons?.map((button: any, index: number) => (
            <Button key={index} variant={button.variant || 'default'} className={cn('w-full sm:w-auto', button.className)}>
              {button.icon && iconMap[button.icon] && React.createElement(iconMap[button.icon], { className: 'h-4 w-4 mr-2' })}
              {button.text}
              {button.showArrow && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

const DownloadSectionComponent: React.FC<any> = ({ title, description, className }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/50 to-muted/20 shadow-2xl',
        className,
      )}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
        src="/assets/glowing-blue.mp4"
        aria-label="Abstract glowing background"
      />
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />

      <div className="relative z-10 px-4 md:px-12 py-12 md:py-20 text-center space-y-4 md:space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text drop-shadow-sm">
          {title}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">{description}</p>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
          <a
            href={STORE_LINKS.appstore}
            aria-label="Download on the App Store"
            className="transform hover:scale-105 transition-all duration-200 hover:drop-shadow-lg w-full sm:w-auto"
          >
            <img src={appStoreBadge} alt="Download on the App Store" className="h-10 md:h-12 w-auto mx-auto" loading="lazy" />
          </a>
          <a
            href={STORE_LINKS.playstore}
            aria-label="Get it on Google Play"
            className="transform hover:scale-105 transition-all duration-200 hover:drop-shadow-lg w-full sm:w-auto"
          >
            <img src={googlePlayBadge} alt="Get it on Google Play" className="h-10 md:h-12 w-auto mx-auto" loading="lazy" />
          </a>
          <a
            href={STORE_LINKS.chrome}
            aria-label="Get it from Chrome Web Store"
            className="bg-white rounded-md flex items-center justify-center gap-3 p-2 transform hover:scale-105 transition-all duration-200 hover:drop-shadow-lg hover:bg-gray-50 w-full sm:w-auto"
          >
            <img src={chromeBadge} alt="Get it from Chrome Web Store" className="h-10 md:h-12 w-auto" loading="lazy" />
          </a>
        </div>
      </div>
    </div>
  );
};

const BadgeComponent: React.FC<any> = ({ text, variant, className }) => {
  return (
    <Badge variant="secondary" className={className}>
      {text}
    </Badge>
  );
};

const ButtonComponent: React.FC<any> = ({ text, variant, icon, className, ...props }) => {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <Button variant={variant || 'default'} className={className} {...props}>
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {text}
    </Button>
  );
};

const TextComponent: React.FC<any> = ({ text, variant = 'body', className }) => {
  const textVariants = {
    h1: 'text-3xl font-medium',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    body: 'text-base',
    small: 'text-sm text-muted-foreground',
    caption: 'text-xs text-muted-foreground',
  };

  return <div className={cn(textVariants[variant as keyof typeof textVariants], className)}>{text}</div>;
};

const DividerComponent: React.FC<any> = ({ className }) => {
  return <hr className={cn('border-border/30', className)} />;
};

const ListComponent: React.FC<any> = ({ items, className }) => {
  return (
    <ul className={cn('space-y-2', className)}>
      {items?.map((item: string, index: number) => (
        <li key={index} className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const DivComponent: React.FC<any> = ({ children, className }) => {
  return <div className={className}>{children?.map((child: DocumentationComponent, index: number) => renderComponent(child, index))}</div>;
};

const IconComponent: React.FC<any> = ({ name, className }) => {
  const Icon = name ? iconMap[name] : null;

  if (!Icon) {
    console.warn(`Icon not found: ${name}`);
    return null;
  }

  return <Icon className={className} />;
};

// Main Documentation Page Builder Component
interface DocumentationPageBuilderProps {
  page: DocumentationPage;
}

export const DocumentationPageBuilder: React.FC<DocumentationPageBuilderProps> = ({ page }) => {
  const { setTableOfContents } = useDocumentation();

  // Register sections with the table of contents
  useEffect(() => {
    const tocItems = page.sections.map((section) => ({
      id: section.id,
      title: section.title,
      level: 2, // h2 level
    }));

    setTableOfContents(tocItems);

    // Cleanup when component unmounts
    return () => {
      setTableOfContents([]);
    };
  }, [page.sections, setTableOfContents]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Page Header */}
      <HeaderComponent title={page.title} subtitle={page.description} />

      {/* Render Sections */}
      {page.sections.map((section) => (
        <div key={section.id} className="space-y-4 md:space-y-6">
          <h2 id={section.id} className="text-xl md:text-2xl font-semibold scroll-mt-20">
            {section.title}
          </h2>
          {section.components.map((component, index) => renderComponent(component, index))}
        </div>
      ))}
    </div>
  );
};

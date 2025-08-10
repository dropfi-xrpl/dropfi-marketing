import { createFileRoute } from '@tanstack/react-router';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Hero from '@/components/index/Hero';
import Marquee from '@/components/Marquee';
import HighlightsSection from '@/components/index/HighlightsSection';
import SolutionSection from '@/components/index/SolutionSection';
import FeaturesSection from '@/components/index/FeaturesSection';
import DifferentiatorSection from '@/components/index/DifferentiatorSection';
import CodeTypeSection from '@/components/CodeTypeSection';
import CTASection from '@/components/index/CTASection';
import DownloadSection from '@/components/index/DownloadSection';
import Footer from '@/components/Footer';
import { createSEO } from '@/utils/create-seo';

export const Route = createFileRoute('/__layout/')({
  head: () => {
    const seoData = createSEO({
      title: 'DropFi - Decentralized XRPL Wallet & DEX',
      description:
        'DropFi is the most secure and user-friendly XRPL wallet for trading, liquidity provision, and NFT management. Experience true decentralization with zero permission architecture.',
      canonical: '/',
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
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      <Hero />
      <div className="py-6">
        <Marquee
          items={[
            'Zero Permission Architecture',
            'Local Key Storage',
            'No Camera Required',
            'No Vendor Lock-in',
            'Developer-First',
            'Open Source',
          ]}
        />
      </div>
      <HighlightsSection />
      <SolutionSection />
      <FeaturesSection />
      <DifferentiatorSection />
      <CodeTypeSection />
      <CTASection />
      <DownloadSection />
      <Footer />
    </div>
  );
}

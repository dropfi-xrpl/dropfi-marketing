import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Clock,
  AlertCircle,
  MessageCircle,
  Twitter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Shield,
  Download,
  Smartphone,
  Globe,
  Code,
  Sparkles,
  Zap,
  Star,
  Heart,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { createSEO } from '@/utils/create-seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export const Route = createFileRoute('/__layout/support')({
  head: () => {
    const seoData = createSEO({
      title: 'Support - DropFi Help Center & Contact',
      description:
        'Get help and support for DropFi wallet, browser extension, and mobile app. Contact our team, browse FAQs, and find solutions to common issues.',
      canonical: '/support',
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

// FAQ data
const faqs = [
  {
    category: 'Getting Started',
    icon: Sparkles,
    items: [
      {
        question: 'How do I create a new DropFi wallet?',
        answer:
          "Download the DropFi app from the App Store or Google Play Store, or install the browser extension. Follow the setup wizard to generate a new wallet with a secure seed phrase. Make sure to write down and store your seed phrase safely - it's your backup to recover your wallet.",
      },
      {
        question: 'What is a seed phrase and why is it important?',
        answer:
          "A seed phrase is a series of 12-24 words that act as the master key to your wallet. It's crucial for wallet recovery if you lose access to your device. Never share your seed phrase with anyone, including support staff. Store it securely offline.",
      },
      {
        question: 'Can I use DropFi on multiple devices?',
        answer:
          'Yes! You can import your existing wallet to multiple devices using your seed phrase. This allows you to access your funds from any device while maintaining the same wallet address and balance.',
      },
    ],
  },
  {
    category: 'Security',
    icon: Shield,
    items: [
      {
        question: 'How secure is DropFi?',
        answer:
          'DropFi uses industry-standard encryption and follows best security practices. Your private keys are stored locally on your device and never transmitted to our servers. We also support hardware wallet integration for enhanced security.',
      },
      {
        question: 'What should I do if I suspect my wallet is compromised?',
        answer:
          'Immediately transfer your funds to a new wallet if possible. Never share your seed phrase or private keys with anyone. Contact our support team for guidance, but remember we will never ask for your seed phrase.',
      },
      {
        question: 'Does DropFi support hardware wallets?',
        answer:
          "Yes, DropFi supports popular hardware wallets like Ledger and Trezor. This provides an additional layer of security by keeping your private keys offline while still allowing you to use DropFi's features.",
      },
    ],
  },
  {
    category: 'Trading & DEX',
    icon: Zap,
    items: [
      {
        question: 'How do I swap tokens on DropFi?',
        answer:
          'Navigate to the Swap section in the app, select the token you want to swap from and to, enter the amount, review the transaction details including fees, and confirm the swap. The transaction will be processed on the XRPL network.',
      },
      {
        question: 'What are the trading fees?',
        answer:
          'DropFi charges minimal fees for token swaps and trades. Fees vary based on network conditions and transaction complexity. All fees are clearly displayed before you confirm any transaction.',
      },
      {
        question: 'How do I provide liquidity to pools?',
        answer:
          "Go to the Liquidity section, select a pool you want to contribute to, and follow the prompts to add your tokens. You'll earn a portion of the trading fees from that pool based on your share.",
      },
    ],
  },
  {
    category: 'Technical Issues',
    icon: Code,
    items: [
      {
        question: 'The app is not loading properly. What should I do?',
        answer:
          "Try restarting the app first. If the issue persists, check your internet connection, clear the app cache, or reinstall the app. Make sure you're using the latest version from the official app stores.",
      },
      {
        question: 'My transaction is stuck. What can I do?',
        answer:
          "Check the transaction status in the app's transaction history. XRPL transactions are usually processed within seconds. If a transaction appears stuck, it may be due to network congestion. Contact support if the issue persists.",
      },
      {
        question: 'How do I update DropFi?',
        answer:
          "For mobile apps, updates are available through the App Store or Google Play Store. For browser extensions, updates are typically automatic, but you can manually check for updates in your browser's extension management page.",
      },
    ],
  },
];

function RouteComponent() {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const [animatedElements, setAnimatedElements] = useState<Record<string, boolean>>({});

  const toggleFaq = (faqId: string) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  const getFaqId = (category: string, index: number) => `${category}-${index}`;

  // Animate elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      <main className="relative z-10 pt-20 pb-16">
        {/* Hero Section with Floating Elements */}
        <div className="container mx-auto px-4 text-center py-20 relative">
          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 animate-float-slow">
              <div className="p-3 rounded-full bg-primary-500/20 border border-primary-500/30">
                <Sparkles className="h-6 w-6 text-primary-500" />
              </div>
            </div>
            <div className="absolute top-32 right-20 animate-float-medium">
              <div className="p-3 rounded-full bg-secondary-500/20 border border-secondary-500/30">
                <Zap className="h-6 w-6 text-secondary-500" />
              </div>
            </div>
            <div className="absolute bottom-20 left-20 animate-float-fast">
              <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <Shield className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <div className="absolute bottom-32 right-10 animate-float-slow">
              <div className="p-3 rounded-full bg-amber-500/20 border border-amber-500/30">
                <Heart className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>

          <div data-animate id="hero" className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 animate-fade-in-up">
              <Star className="h-4 w-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-500">24/7 Support Available</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-emerald-500  to-blue-500 bg-clip-text text-transparent">We're Here to Help</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-400">
              Your success is our priority. Get lightning-fast support from our expert team and discover everything DropFi has to offer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg group"
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Support Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 text-lg"
                onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse FAQs
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-section" data-animate className="container mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Multiple ways to reach our expert support team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Primary Contact Card */}
            <Card className="p-8 glass-card border-primary-500/30 bg-primary-500/5 hover:bg-primary-500/10 transition-all duration-300 group hover:scale-105">
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-primary-500/20 border border-primary-500/30 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Email Support</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get detailed responses from our technical experts within 24 hours
                </p>
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 w-full group" asChild>
                  <a href="mailto:support@dropfi.app" className="flex items-center justify-center gap-2">
                    support@dropfi.app
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Response Time Card */}
            <Card className="p-8 glass-card border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 group hover:scale-105">
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-12 w-12 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Response Time</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We aim to respond within 24 hours during business days. Urgent issues get priority attention.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-sm font-medium text-emerald-500">24h Response</span>
                </div>
              </div>
            </Card>

            {/* Social Media Card */}
            <Card className="p-8 glass-card border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 group hover:scale-105">
              <div className="text-center">
                <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-500/30 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Twitter className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Social Media</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Follow us on X (Twitter) for updates and send us direct messages
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 w-full group"
                  asChild
                >
                  <a
                    href="https://twitter.com/DropFi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    @DropFi
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="p-6 glass-card border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Security Notice</h4>
                  <p className="text-muted-foreground">
                    Never share your seed phrase or private keys. Official DropFi support will never ask for them.
                    <span className="text-amber-500 font-medium"> Your security is our top priority.</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq-section" data-animate className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
              <HelpCircle className="h-4 w-4 text-secondary-500" />
              <span className="text-sm font-medium text-secondary-500">Knowledge Base</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Quick answers to the most common questions about DropFi</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-secondary-500/20 border border-secondary-500/30">
                    <category.icon className="h-6 w-6 text-secondary-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">{category.category}</h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((faq, faqIndex) => {
                    const faqId = getFaqId(category.category, faqIndex);
                    const isOpen = openFaqs[faqId];

                    return (
                      <Card
                        key={faqIndex}
                        className="glass-card border-border/30 bg-background/50 hover:bg-background/70 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <button
                          onClick={() => toggleFaq(faqId)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/20 transition-colors rounded-lg group"
                        >
                          <h4 className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary-500 transition-colors">
                            {faq.question}
                          </h4>
                          <div className="flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-primary-500 transition-transform duration-300" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary-500 transition-colors duration-300" />
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 animate-fade-in">
                            <div className="border-t border-border/30 pt-4">
                              <p className="text-muted-foreground leading-relaxed text-base">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div data-animate className="container mx-auto px-4 mt-24">
          <Card className="p-12 glass-card border-primary-500/30 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 max-w-5xl mx-auto text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 border border-primary-500 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border border-secondary-500 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-emerald-500 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Still Need Help?</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our comprehensive documentation has detailed guides and tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg group" asChild>
                  <a href="/docs" className="flex items-center gap-2">
                    Browse Documentation
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 text-lg group"
                  asChild
                >
                  <a href="mailto:support@dropfi.app?subject=Additional%20Support%20Needed" className="flex items-center gap-2">
                    Contact Support
                    <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Lock,
  Eye,
  Users,
  Globe,
  FileText,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Star,
  Heart,
  Zap,
} from 'lucide-react';
import { createSEO } from '@/utils/create-seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export const Route = createFileRoute('/__layout/privacy-policy')({
  head: () => {
    const seoData = createSEO({
      title: 'Privacy Policy - DropFi Wallet Data Protection',
      description:
        'Learn how DropFi protects your privacy and data. Our non-custodial wallet ensures your personal information and digital assets remain secure and private.',
      canonical: '/privacy-policy',
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

// Privacy Policy sections with icons and styling
const privacySections = [
  {
    id: 'no-pii',
    title: 'No Collection of Personal Identifying Information (PII)',
    icon: Shield,
    color: 'primary',
    content: 'Because DropFi is a non-custodial wallet:',
    points: [
      'We do not collect, store, or access your name, email address, government ID, or any other personal identifying information unless you voluntarily provide it via support channels.',
      'We do not have access to or store private keys, seed phrases, wallet credentials, or any digital asset balances.',
    ],
    highlight: 'Your privacy is our priority. We cannot access your funds or personal data.',
  },
  {
    id: 'technical-data',
    title: 'Limited Technical and Usage Data',
    icon: Eye,
    color: 'secondary',
    content: 'To improve performance and stability, we may collect the following non-personal, technical data:',
    points: [
      'Device type, OS version, and language',
      'App version and crash logs',
      'Non-identifiable usage metrics (e.g., screen views, error events)',
    ],
    note: 'This data is anonymized, aggregated, and used solely for diagnostics and app improvement.',
    optional: 'Users may opt-in to share limited usage data via app settings.',
  },
  {
    id: 'support',
    title: 'Support Communications',
    icon: Users,
    color: 'emerald',
    content: 'If you contact our support team, we may temporarily retain your email or communication to resolve your issue.',
    points: [
      'Once resolved, this information is purged unless otherwise required by law.',
      'We do not associate support inquiries with any on-chain activity or wallet address.',
    ],
  },
  {
    id: 'data-usage',
    title: 'How We Use Data',
    icon: CheckCircle,
    color: 'blue',
    content: 'Any data collected (e.g., device logs or crash reports) is used strictly for:',
    points: ['Improving app performance', 'Diagnosing bugs and errors', 'Ensuring compliance with app store policies'],
    highlight: 'We do not use this data for profiling, marketing, or resale.',
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing and Third Parties',
    icon: Lock,
    color: 'amber',
    content: 'We do not sell, trade, or rent your data. We may share non-personal data only with:',
    points: [
      'Infrastructure providers (e.g., analytics tools, app crash services)',
      'Legal or regulatory entities, if compelled under subpoena or court order',
    ],
    note: 'All third-party services used by DropFi must meet industry-standard security and privacy protections.',
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking Technologies',
    icon: Globe,
    color: 'purple',
    content: 'The DropFi App does not use cookies or tracking technologies in the traditional browser-based sense.',
    points: [
      'However, app stores or device OS features may collect app usage data independently.',
      "You are subject to Apple's or Google's respective privacy policies when downloading the App.",
    ],
  },
  {
    id: 'security',
    title: 'Security and Data Retention',
    icon: Shield,
    color: 'emerald',
    content: 'We use encryption and secure development practices to protect against unauthorized access.',
    warning: 'However, DropFi cannot recover lost wallets or access credentials under any circumstances.',
    retention: {
      title: 'Retention:',
      points: ['Technical logs are retained for 90 days.', 'Support inquiries are retained only as long as needed for resolution.'],
    },
  },
  {
    id: 'children',
    title: "Children's Privacy",
    icon: Heart,
    color: 'pink',
    content: 'DropFi is not intended for users under the age of 18.',
    points: [
      'We do not knowingly collect or solicit data from minors.',
      'If you are a parent or guardian and believe your child has submitted data, please contact us immediately.',
    ],
  },
  {
    id: 'cross-border',
    title: 'Cross-Border Considerations',
    icon: Globe,
    color: 'blue',
    content: 'DropFi operates from the United States.',
    points: [
      'If you are accessing the App from outside the U.S., you consent to the processing and transfer of information in and to the United States and other jurisdictions.',
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance with Laws',
    icon: FileText,
    color: 'emerald',
    content: 'DropFi complies with applicable data protection laws, including but not limited to:',
    points: [
      'The California Consumer Privacy Act (CCPA) — DropFi does not sell personal data.',
      'The General Data Protection Regulation (GDPR) — DropFi does not process personal data or engage in profiling.',
    ],
  },
  {
    id: 'rights',
    title: 'Your Rights and Choices',
    icon: CheckCircle,
    color: 'primary',
    content: 'Because DropFi does not collect PII, traditional data subject rights (e.g., access, deletion, portability) may not apply.',
    points: ['If you opt into analytics or submit data via support, you may request deletion by emailing: support@dropfi.app'],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    icon: Calendar,
    color: 'amber',
    content: 'We may update this policy periodically.',
    points: [
      'When we do, the revised version will be posted within the App and/or on our website.',
      'Your continued use of DropFi after such changes constitutes your consent.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    color: 'blue',
    content: 'For questions, concerns, or data inquiries:',
    contact: {
      email: 'support@dropfi.app',
      address: 'DropFi LLC, 539 W Commerce St. STE 3170, Dallas, TX 75208',
    },
  },
];

function RouteComponent() {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: 'border-primary-500/30 bg-primary-500/5 hover:bg-primary-500/10',
      secondary: 'border-secondary-500/30 bg-secondary-500/5 hover:bg-secondary-500/10',
      emerald: 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10',
      blue: 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10',
      amber: 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10',
      purple: 'border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10',
      pink: 'border-pink-500/30 bg-pink-500/5 hover:bg-pink-500/10',
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconColor = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      emerald: 'text-emerald-500',
      blue: 'text-blue-500',
      amber: 'text-amber-500',
      purple: 'text-purple-500',
      pink: 'text-pink-500',
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconBgColor = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: 'bg-primary-500/20 border-primary-500/30',
      secondary: 'bg-secondary-500/20 border-secondary-500/30',
      emerald: 'bg-emerald-500/20 border-emerald-500/30',
      blue: 'bg-blue-500/20 border-blue-500/30',
      amber: 'bg-amber-500/20 border-amber-500/30',
      purple: 'bg-purple-500/20 border-purple-500/30',
      pink: 'bg-pink-500/20 border-pink-500/30',
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      <main className="relative z-10 pt-20 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center py-20 relative">
          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 animate-float-slow">
              <div className="p-3 rounded-full bg-primary-500/20 border border-primary-500/30">
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
            </div>
            <div className="absolute top-32 right-20 animate-float-medium">
              <div className="p-3 rounded-full bg-secondary-500/20 border border-secondary-500/30">
                <Lock className="h-6 w-6 text-secondary-500" />
              </div>
            </div>
            <div className="absolute bottom-20 left-20 animate-float-fast">
              <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <Eye className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <div className="absolute bottom-32 right-10 animate-float-slow">
              <div className="p-3 rounded-full bg-amber-500/20 border border-amber-500/30">
                <CheckCircle className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>

          <div data-animate id="hero" className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 animate-fade-in-up">
              <Shield className="h-4 w-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-500">Your Privacy Matters</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Privacy Policy</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-400">
              Transparent, secure, and privacy-focused. Learn how DropFi protects your data and maintains your digital sovereignty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg group"
                onClick={() => document.getElementById('policy-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Read Full Policy
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 text-lg"
                asChild
              >
                <a href="mailto:support@dropfi.app" className="flex items-center gap-2">
                  Contact Us
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Highlights Section */}
        <div className="container mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Privacy Commitments</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              What makes DropFi different when it comes to protecting your privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Non-Custodial',
                description: 'We never have access to your private keys or funds',
                color: 'primary',
              },
              {
                icon: Eye,
                title: 'No Tracking',
                description: "We don't monitor your transactions or behavior",
                color: 'secondary',
              },
              {
                icon: Lock,
                title: 'Secure by Design',
                description: 'Built with privacy and security as core principles',
                color: 'emerald',
              },
              {
                icon: Users,
                title: 'Your Control',
                description: 'You decide what data to share, if any',
                color: 'blue',
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`p-6 glass-card ${getColorClasses(item.color)} hover:scale-105 transition-all duration-300 group`}
              >
                <div className="text-center">
                  <div
                    className={`p-3 rounded-xl ${getIconBgColor(
                      item.color,
                    )} w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className={`h-8 w-8 ${getIconColor(item.color)}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div id="policy-content" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
              <FileText className="h-4 w-4 text-secondary-500" />
              <span className="text-sm font-medium text-secondary-500">Complete Policy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">DropFi Wallet Privacy Policy</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              This Privacy Policy outlines how DropFi LLC ("DropFi," "we," "us," or "our") collects, uses, and protects user data in
              connection with our non-custodial XRPL wallet mobile application ("App").
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {privacySections.map((section, index) => (
              <Card
                key={section.id}
                className={`glass-card ${getColorClasses(section.color)} transition-all duration-300 hover:scale-[1.01]`}
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${getIconBgColor(section.color)} flex-shrink-0`}>
                      <section.icon className={`h-6 w-6 ${getIconColor(section.color)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {index + 1}. {section.title}
                      </h3>

                      {section.content && <p className="text-muted-foreground mb-4 leading-relaxed">{section.content}</p>}

                      {section.points && (
                        <ul className="space-y-3 mb-4">
                          {section.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getIconColor(section.color)}`}></div>
                              <span className="text-muted-foreground leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.highlight && (
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <p className="text-emerald-600 font-medium">{section.highlight}</p>
                        </div>
                      )}

                      {section.note && (
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <p className="text-blue-600 font-medium">{section.note}</p>
                        </div>
                      )}

                      {section.warning && (
                        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <p className="text-amber-600 font-medium">{section.warning}</p>
                        </div>
                      )}

                      {section.optional && (
                        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <p className="text-purple-600 font-medium">
                            <span className="font-semibold">Optional: </span>
                            {section.optional}
                          </p>
                        </div>
                      )}

                      {section.retention && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-foreground mb-2">{section.retention.title}</h4>
                          <ul className="space-y-2">
                            {section.retention.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getIconColor(section.color)}`}></div>
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.contact && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-blue-500" />
                            <a href={`mailto:${section.contact.email}`} className="text-blue-500 hover:text-blue-600 font-medium">
                              {section.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-blue-500" />
                            <span className="text-muted-foreground">{section.contact.address}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
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
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Questions About Privacy?</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're committed to transparency. If you have any questions about our privacy practices, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg group" asChild>
                  <a href="mailto:support@dropfi.app" className="flex items-center gap-2">
                    Contact Support
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 text-lg group"
                  asChild
                >
                  <a href="/support" className="flex items-center gap-2">
                    Visit Support
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

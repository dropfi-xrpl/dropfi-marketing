import { createFileRoute } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Lock,
  FileText,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Star,
  Heart,
  Zap,
  Scale,
  Gavel,
  Handshake,
  XCircle,
} from 'lucide-react';
import { createSEO } from '@/utils/create-seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export const Route = createFileRoute('/__layout/terms-of-service')({
  head: () => {
    const seoData = createSEO({
      title: 'Terms of Service - DropFi Wallet Legal Agreement',
      description:
        'Read DropFi Wallet Terms of Service. Understand your rights, responsibilities, and our legal agreement for using our non-custodial XRPL wallet.',
      canonical: '/terms-of-service',
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

// Terms of Service sections with icons and styling
const termsSections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: Handshake,
    color: 'primary',
    content:
      'By downloading, installing, or using the DropFi mobile application ("App"), you agree to these Terms and Conditions ("Terms").',
    points: [
      'If you do not agree to these Terms, you must refrain from using the App.',
      'These Terms constitute a legally binding agreement between you and DropFi LLC.',
    ],
  },
  {
    id: 'nature-of-service',
    title: 'Nature of Service',
    icon: Info,
    color: 'blue',
    content: 'DropFi is a non-custodial digital wallet built on the XRP Ledger (XRPL).',
    points: [
      "DropFi facilitates users' interaction with the XRPL but does not hold or manage user assets.",
      "The App merely provides tools to generate and store cryptographic key pairs on the user's device and facilitates communication with XRPL.",
    ],
    warning:
      'DropFi is not a financial institution, money service business (MSB), or virtual asset service provider (VASP). No user funds are ever held by DropFi.',
  },
  {
    id: 'no-custody',
    title: 'No Custody or Control',
    icon: Lock,
    color: 'emerald',
    content: 'DropFi:',
    points: [
      'Does not store, hold, or control digital assets.',
      'Does not have access to user private keys, recovery phrases, or wallet credentials.',
      'Cannot recover lost keys or funds.',
    ],
    additional: {
      title: 'Additional Notes:',
      points: [
        'If you lose your private key or recovery phrase, DropFi cannot restore access. You assume all risks related to the storage and security of your keys.',
        'Transactions on the XRPL are final and irreversible. Use caution when sending funds.',
      ],
    },
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    icon: Users,
    color: 'amber',
    content: 'You agree that you:',
    points: [
      'Are at least 18 years old and capable of entering a binding legal agreement.',
      'Will only use the App in compliance with applicable laws and regulations.',
      'Will not use the App for illegal purposes, including money laundering, terrorism financing, or fraud.',
      'Are solely responsible for managing your wallet credentials and any transactions conducted.',
      'Will conduct your own due diligence and consult legal or tax advisors as needed.',
    ],
  },
  {
    id: 'prohibited-use',
    title: 'Prohibited Use',
    icon: XCircle,
    color: 'red',
    content: 'You agree not to:',
    points: [
      'Use the App to facilitate illegal or unlawful transactions.',
      'Distribute malicious software or attempt to compromise network integrity.',
      'Use automated scripts to interact with the App.',
      'Impersonate another person or misrepresent your identity.',
      'Use the App in a manner that could disable, damage, or impair its functionality.',
    ],
    warning: 'Violation of this section may result in immediate suspension or termination of access to the App and legal action.',
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    icon: Globe,
    color: 'purple',
    content: 'DropFi may integrate third-party APIs and tools (e.g., analytics providers, data services, blockchain APIs).',
    points: ['We do not control or endorse these services. Your use of third-party services is at your own risk.'],
    additional: {
      title: 'Additional Disclosures:',
      points: [
        'DropFi is not liable for downtime, inaccuracies, or breaches stemming from third-party services.',
        'You may be subject to additional terms from such third parties.',
      ],
    },
  },
  {
    id: 'no-investment-advice',
    title: 'No Investment Advice',
    icon: AlertTriangle,
    color: 'amber',
    content: 'DropFi does not:',
    points: ['Offer investment, financial, or legal advice.', 'Guarantee performance of any digital asset or the XRPL.'],
    note: 'You must consult licensed professionals for any investment decisions. All app content is for informational purposes only.',
  },
  {
    id: 'disclaimer-warranties',
    title: 'Disclaimer of Warranties',
    icon: Shield,
    color: 'blue',
    content: 'The App is provided "as is" and "as available" with no warranties, express or implied, including:',
    points: ['Warranties of merchantability', 'Fitness for a particular purpose', 'Non-infringement'],
    additional: {
      title: 'DropFi does not warrant that:',
      points: [
        'The App will be uninterrupted or error-free',
        'The App is secure or free of harmful components',
        'Any bugs or vulnerabilities will be resolved',
      ],
    },
    highlight: 'Use of DropFi is at your sole risk.',
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    icon: Scale,
    color: 'emerald',
    content:
      'To the fullest extent permitted by law, DropFi LLC, its affiliates, and its officers, directors, employees, or contractors shall not be liable for:',
    points: [
      'Any direct, indirect, incidental, special, or consequential damages',
      'Loss of data, revenue, or profits',
      'Loss or theft of digital assets',
      'User error or failure to follow security best practices',
      'Downtime or issues with XRPL',
    ],
    note: 'This limitation applies even if DropFi was advised of the possibility of such damages.',
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    icon: Gavel,
    color: 'amber',
    content:
      "You agree to indemnify, defend, and hold harmless DropFi LLC and its affiliates from any claim, liability, or expense (including reasonable attorneys' fees) arising from:",
    points: [
      'Your use of the App',
      'Your violation of these Terms',
      'Your violation of any applicable laws',
      'Any dispute between you and another user or third party',
    ],
  },
  {
    id: 'arbitration',
    title: 'Binding Arbitration & Waiver of Class Actions',
    icon: Scale,
    color: 'purple',
    content:
      'All disputes arising from these Terms or your use of the App will be resolved through binding arbitration under the rules of the American Arbitration Association, in Dallas, Texas.',
    points: [
      'You agree to waive your right to a trial by jury',
      'You agree to waive participation in class actions or collective proceedings',
    ],
    note: 'Exceptions: You may seek equitable relief in court (e.g., injunctive relief for IP infringement) without breaching this arbitration clause.',
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: XCircle,
    color: 'red',
    content: 'DropFi may suspend or terminate your access at any time, with or without notice, for:',
    points: ['Breach of these Terms', 'Risk to the security or integrity of the App or XRPL', 'Compliance with law enforcement requests'],
    note: 'You may also stop using the App at any time. Termination does not relieve you of obligations incurred while using the App.',
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    icon: Gavel,
    color: 'blue',
    content: 'These Terms are governed by the laws of the State of Texas, without regard to conflict of laws.',
    points: ['Any legal action not subject to arbitration will be brought in the courts of Dallas County, Texas.'],
  },
  {
    id: 'entire-agreement',
    title: 'Entire Agreement',
    icon: FileText,
    color: 'emerald',
    content: 'These Terms constitute the entire agreement between you and DropFi LLC.',
    points: [
      'They supersede any prior agreements, communications, or representations.',
      'If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and effect.',
    ],
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
      red: 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10',
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
      red: 'text-red-500',
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
      red: 'bg-red-500/20 border-red-500/30',
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
                <Gavel className="h-6 w-6 text-primary-500" />
              </div>
            </div>
            <div className="absolute top-32 right-20 animate-float-medium">
              <div className="p-3 rounded-full bg-secondary-500/20 border border-secondary-500/30">
                <Scale className="h-6 w-6 text-secondary-500" />
              </div>
            </div>
            <div className="absolute bottom-20 left-20 animate-float-fast">
              <div className="p-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <FileText className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
            <div className="absolute bottom-32 right-10 animate-float-slow">
              <div className="p-3 rounded-full bg-amber-500/20 border border-amber-500/30">
                <Handshake className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>

          <div data-animate id="hero" className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 animate-fade-in-up">
              <Scale className="h-4 w-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-500">Legal Agreement</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Terms of Service</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up animation-delay-400">
              Clear, fair, and comprehensive terms that protect both you and DropFi. Understand your rights and responsibilities when using
              our platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg group"
                onClick={() => document.getElementById('terms-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Read Full Terms
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-8 py-4 text-lg"
                asChild
              >
                <a href="/privacy-policy" className="flex items-center gap-2">
                  Privacy Policy
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Highlights Section */}
        <div className="container mx-auto px-4 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What You Need to Know</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key points about our Terms of Service and what they mean for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: Handshake,
                title: 'Agreement Required',
                description: 'Using DropFi means you accept these terms',
                color: 'primary',
              },
              {
                icon: Lock,
                title: 'Non-Custodial',
                description: 'We never hold or control your assets',
                color: 'emerald',
              },
              {
                icon: Users,
                title: '18+ Only',
                description: 'Must be legally capable of entering agreements',
                color: 'blue',
              },
              {
                icon: Scale,
                title: 'Texas Law',
                description: 'Governed by Texas state law',
                color: 'amber',
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

        {/* Terms of Service Content */}
        <div id="terms-content" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-6">
              <FileText className="h-4 w-4 text-secondary-500" />
              <span className="text-sm font-medium text-secondary-500">Complete Terms</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">DropFi Wallet Terms of Service</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These Terms constitute a legally binding agreement between you and DropFi LLC for the use of our non-custodial XRPL wallet
              application.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {termsSections.map((section, index) => (
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

                      {section.additional && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-foreground mb-2">{section.additional.title}</h4>
                          <ul className="space-y-2">
                            {section.additional.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getIconColor(section.color)}`}></div>
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
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
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Questions About Our Terms?</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We believe in transparency and clear communication. If you have questions about these terms, our support team is here to
                help.
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

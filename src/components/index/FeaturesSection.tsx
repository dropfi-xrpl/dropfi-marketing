import { Card } from '@/components/ui/card';
import { SecureIcon, SpeedIcon, DecentralizedIcon, DevIcon } from '@/components/icons';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Secure',
      description: 'Military-grade encryption with local key storage. Your assets, your control, your security.',
      Icon: SecureIcon,
    },
    {
      title: 'Fast',
      description: 'Lightning-fast transactions on XRPL. No delays, no bottlenecks, just pure speed.',
      Icon: SpeedIcon,
    },
    {
      title: 'Decentralized',
      description: 'Zero backend dependencies. Fully decentralized architecture that puts you in control.',
      Icon: DecentralizedIcon,
    },
    {
      title: 'Dev Friendly',
      description: 'Built by developers, for developers. Clean APIs, zero friction integration.',
      Icon: DevIcon,
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-medium mb-4">
            DropFi is <span className="text-gradient">everything</span> you need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for the modern XRP ecosystem with developers in mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="gradient-card border-border/50 p-8 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-liberation group"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-2xl bg-secondary border border-primary/20 text-primary group-hover:scale-105 transition-transform duration-300">
                <feature.Icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-medium mt-6 mb-3 text-gradient">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

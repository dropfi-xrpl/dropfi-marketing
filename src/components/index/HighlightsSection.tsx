import { Shield, Zap, Lock, Code2, Box, Network } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { Card } from '@/components/ui/card';

const items = [
  { title: 'Zero Permission', desc: 'No camera, no KYC, no vendor lock-in. DropFi asks for nothing.', Icon: Lock },
  { title: 'Local Keys', desc: 'Keys encrypted and stored locally on your device.', Icon: Shield },
  { title: 'Lightning Fast', desc: 'XRPL-native performance with minimal overhead.', Icon: Zap },
  { title: 'Developer First', desc: 'Simple APIs and clean flows. Drop in and build.', Icon: Code2 },
  { title: 'Modular', desc: 'Use only what you need. No forced UX.', Icon: Box },
  { title: 'Interoperable', desc: 'Connect to XRPL apps with minimal friction.', Icon: Network },
];

const HighlightsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-medium">
            What makes <span className="text-gradient">DropFi</span> different
          </h2>
          <p className="text-muted-foreground text-lg">
            A wallet engineered like infrastructure — streamlined, private, and built for builders.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ title, desc, Icon }, i) => (
            <TiltCard key={i}>
              <Card className="gradient-card border-border/50 p-6 h-full hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="w-5 h-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Card>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;

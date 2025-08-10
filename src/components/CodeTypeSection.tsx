import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const lines = [
  "const tx = await wallet.sign({ destination: 'rDropFi', amount: '1000' })",
  'await ledger.submit(tx)',
  'await wallet.exportKeys({ encrypted: true })',
  '// No camera. No permissions. No backend.',
];

const CodeTypeSection = () => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const lineRef = useRef('');

  useEffect(() => {
    const full = lines[index];
    lineRef.current = '';

    let i = 0;
    const step = () => {
      if (i <= full.length) {
        lineRef.current = full.slice(0, i);
        setDisplay(lineRef.current);
        i++;
        setTimeout(step, 30);
      } else {
        setTimeout(() => setIndex((p) => (p + 1) % lines.length), 1200);
      }
    };
    step();
  }, [index]);

  return (
    <section id="developers" className="py-24">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-medium">
            Developer Experience that <span className="text-gradient">snaps</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Build on XRPL without hoops. DropFi acts like a stateless, zero-permission signing engine.
          </p>
          <div className="flex gap-4">
            <Link to="/docs">
              <Button variant="liberation" size="lg">
                View Dev Docs
              </Button>
            </Link>
            <Link to={'/docs/xrpl-injection-api' as any}>
              <Button variant="glass" size="lg">
                API Reference
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent" />
          <pre className="relative z-10 text-sm md:text-base leading-8 text-foreground font-mono">
            <code>
              {`> ${display}`}
              <span className="inline-block w-2 bg-primary align-text-bottom animate-pulse ml-1" />
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default CodeTypeSection;

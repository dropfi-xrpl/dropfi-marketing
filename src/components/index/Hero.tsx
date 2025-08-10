import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-10rem)] flex items-center justify-center pt-16">
      <div className="container mx-auto gap-12 justify-center text-center items-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary backdrop-blur-xs">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
            <span>Loved by developers worldwide</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium leading-tight max-w-5xl mx-auto">
            Finally, a Modern <span className="text-gradient">XRP Wallet</span> That Doesn't <span className="text-primary">Suck</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            No QR scans. No SDK worship. No walled gardens. Just pure, decentralized access to the XRP Ledger - on-chain, on your terms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center text-center items-center">
            <Link to={'/#download' as any}>
              <Button variant="liberation" size="xl" className="animate-glow">
                Download DropFi Wallet
              </Button>
            </Link>
            <Link to={'/docs' as any}>
              <Button variant="hero" size="xl">
                View Dev Docs →
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center text-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Zero Permission</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No Backend</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Developer First</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

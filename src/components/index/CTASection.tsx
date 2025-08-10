import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl gradient-card border border-primary/20 p-8 md:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>

          <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-medium">
              Ready to break free from <span className="text-destructive">vendor babysitting</span>?
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of developers who've already liberated their XRP development with DropFi's zero-permission architecture. No QR
              codes, no forced UX, no walled gardens - just pure XRP Ledger access.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to={'/#download' as any}>
                <Button variant="liberation" size="xl" className="animate-glow">
                  Download DropFi Wallet
                </Button>
              </Link>
              <Link to={'/docs' as any}>
                <Button variant="glass" size="xl">
                  Read Documentation
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Available on all platforms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Open source</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Always free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import authService from '@/services/auth-service';
import { useXrplReact } from '@dropfi/xrpl-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Wallet, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { createSEO } from '@/utils/create-seo';

export const Route = createFileRoute('/__layout/login')({
  head: () => {
    const seoData = createSEO({
      title: 'Login - DropFi Wallet',
      description: 'Connect your wallet to access DropFi - the most secure and user-friendly XRPL wallet.',
      canonical: '/login',
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
  const { connect: connectDropFi, signMessage } = useXrplReact();
  const connecting = useRef(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  async function handleConnectDropFi() {
    if (connecting.current) return;
    connecting.current = true;
    setIsConnecting(true);

    try {
      const address = await connectDropFi();
      if (!address) throw new Error('User canceled request');

      const message = `Welcome to DropFi!\nSign this message to prove ownership:\n\nWallet: ${address}\nTimestamp: ${new Date().toISOString()}`;
      const { signature, publicKey } = (await signMessage(message)) as { signature: string; publicKey: string };

      if (!signature || !publicKey) throw new Error('User rejected message');
      await authService.signIn(message, publicKey, signature);

      toast.success('Wallet connected successfully!');
      navigate({ to: '/post-builder/$id', params: { id: 'new' } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      connecting.current = false;
      setIsConnecting(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Floating Icons */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 text-primary/30 animate-float-slow">
              <Sparkles className="w-full h-full" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 text-primary/20 animate-float-medium">
              <Shield className="w-full h-full" />
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-5 h-5 text-primary/25 animate-float-fast">
              <Zap className="w-full h-full" />
            </div>
          </div>

          {/* Login Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-75 animate-pulse-slow"></div>

            <div className="relative bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-4">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>

                <p className="text-muted-foreground leading-relaxed">Connect your wallet to access DropFi Admin</p>
              </div>

              {/* Connect Button */}
              <Button
                onClick={handleConnectDropFi}
                disabled={isConnecting}
                variant="liberation"
                size="xl"
                className="w-full h-14 text-lg font-semibold animate-glow hover:scale-105 transition-transform duration-300"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    Connect Your Wallet
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              {/* Features */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Zero Permission Architecture</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Local Key Storage</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>No Backend Required</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground/60">
              By connecting your wallet, you agree to our{' '}
              <a href="/terms-of-service" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

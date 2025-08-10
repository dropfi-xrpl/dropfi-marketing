import React from "react";

const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* Glow background */}
      <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" aria-hidden="true" />

      {/* Main orb */}
      <div className="relative z-10 h-full w-full rounded-full border border-primary/30 bg-linear-to-br from-primary/10 via-transparent to-primary/5 overflow-hidden">
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/40 mask-[radial-gradient(circle,black_55%,transparent_60%)] animate-[spin_18s_linear_infinite]" />
        <div className="absolute inset-0 rounded-full border border-primary/20 mask-[radial-gradient(circle,transparent_60%,black_62%,transparent_66%)] animate-[spin_24s_linear_infinite_reverse]" />

        {/* Floating signals */}
        <span className="absolute left-10 top-16 h-2 w-2 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.8)] animate-float" />
        <span className="absolute right-12 bottom-14 h-2 w-2 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.8)] animate-float" style={{ animationDelay: '0.6s' }} />
        <span className="absolute left-1/2 top-1/3 -ml-1 h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.8)] animate-float" style={{ animationDelay: '1.1s' }} />

        {/* Chips */}
        <div className="absolute left-6 bottom-8">
          <div className="rounded-full px-3 py-1 text-xs bg-secondary/70 border border-primary/20 text-foreground/90 backdrop-blur-xs animate-slide-up">Sign Transaction</div>
        </div>
        <div className="absolute right-6 top-8">
          <div className="rounded-full px-3 py-1 text-xs bg-secondary/70 border border-primary/20 text-foreground/90 backdrop-blur-xs animate-slide-up" style={{ animationDelay: '0.2s' }}>Send XRP</div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1/3">
          <div className="rounded-full px-3 py-1 text-xs bg-secondary/70 border border-primary/20 text-foreground/90 backdrop-blur-xs animate-slide-up" style={{ animationDelay: '0.4s' }}>Manage Assets</div>
        </div>
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 rounded-full bg-grid opacity-30 pointer-events-none" aria-hidden="true" />
    </div>
  );
};

export default HeroVisual;

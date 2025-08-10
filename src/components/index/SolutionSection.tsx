const SolutionSection = () => {
  return (
    <section className="py-24 bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-medium">
              We don't ask. <br />
              <span className="text-gradient">We enable</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Zero Permission Architecture</h3>
                  <p className="text-muted-foreground">
                    Your private keys are stored locally encrypted on your device. Fully decentralized. No backend. No lock-in.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">No Forced UX</h3>
                  <p className="text-muted-foreground">
                    Build your applications without being constrained by our opinions. DropFi adapts to your workflow, not the other way
                    around.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Liberation Layer</h3>
                  <p className="text-muted-foreground">
                    We're not just a wallet. We're a liberation layer for XRP that puts developers and users back in control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card/50 backdrop-blur-xs border border-border/50 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-semibold">DropFi Architecture</h4>
                  <p className="text-sm text-muted-foreground">Fully decentralized by design</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm">Private Keys</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Local Device</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm">Backend</span>
                    <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">None</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm">Permissions</span>
                    <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">Zero</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <span className="text-sm">Developer Control</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

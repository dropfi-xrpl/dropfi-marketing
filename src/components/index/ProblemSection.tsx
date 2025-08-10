import { Card } from '@/components/ui/card';

const ProblemSection = () => {
  const problems = [
    {
      competitor: 'Xaman',
      issue: 'wants your camera',
      description: 'Forced biometric requirements that compromise privacy',
    },
    {
      competitor: 'Crossmark',
      issue: 'wants your browser',
      description: 'Limited to browser extensions with vendor lock-in',
    },
    {
      competitor: 'Others',
      issue: 'half-baked tools',
      description: 'The XRP stack feels like a scavenger hunt',
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-medium">
            XRP devs deserve <span className="text-primary">better</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The current XRP ecosystem forces developers into vendor babysitting. We're changing that with zero-permission architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="gradient-card border-border/50 p-8 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-destructive">{problem.competitor}</h3>
                <p className="text-lg font-medium">{problem.issue}</p>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-2xl font-semibold mb-8">
            You deserve a wallet that lets you <span className="text-primary">build</span>, <span className="text-primary">move</span>,{' '}
            <span className="text-primary">sign</span>, and <span className="text-primary">send</span>
            <br />
            <span className="text-gradient">without vendor babysitting.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

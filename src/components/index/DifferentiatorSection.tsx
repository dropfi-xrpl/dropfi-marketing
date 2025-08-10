import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const choices = [
  { other: 'QR scans', ours: 'Direct signing' },
  { other: 'SDK worship', ours: 'NO SDK Required' },
  { other: 'Walled gardens', ours: 'Zero permission' },
  { other: 'Vendor lock-in', ours: 'Local keys' },
];

const DifferentiatorSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-medium">
            Why <span className="text-gradient">DropFi</span> wins
          </h2>
          <p className="text-muted-foreground mt-3">A wallet that behaves like infrastructure — not a gatekeeper.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {choices.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted/30 border border-border/50 rounded-xl p-5 flex items-center justify-between"
              >
                <span className="text-sm text-muted-foreground">Others</span>
                <span className="text-lg font-medium line-through text-destructive/80">{c.other}</span>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            {choices.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="gradient-card border border-primary/30 rounded-xl p-5 flex items-center justify-between"
              >
                <span className="text-sm text-primary-foreground/80">DropFi</span>
                <span className="text-lg font-semibold text-gradient">{c.ours}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="liberation" size="xl">
            Download Wallet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;

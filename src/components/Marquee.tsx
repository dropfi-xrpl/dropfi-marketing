type MarqueeProps = {
  items: string[];
  speed?: number; // seconds for one loop
};

const Marquee = ({ items, speed = 30 }: MarqueeProps) => {
  const content = items.join("  •  ");
  return (
    <div className="relative w-full overflow-hidden mask-fade-x">
      <div
        className="whitespace-nowrap animate-marquee text-muted-foreground/80 hover:text-foreground transition-colors"
        style={{ animationDuration: `${speed}s` }}
        aria-label="Scrolling highlights"
      >
        <span>{content} &nbsp; {content}</span>
      </div>
    </div>
  );
};

export default Marquee;
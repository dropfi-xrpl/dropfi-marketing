import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * 10;
      el.style.setProperty("--tilt-x", `${y}deg`);
      el.style.setProperty("--tilt-y", `${-x}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 bg-grid" style={{
      perspective: "1000px",
    }}>
      {/* Glowing blobs */}
      <div className="absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full blur-3xl bg-primary/20 animate-blob" style={{ transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))" }} />
      <div className="absolute top-1/3 -right-24 w-[35vw] h-[35vw] rounded-full blur-3xl bg-primary/10 animate-blob" style={{ animationDelay: "-4s", transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))" }} />
      <div className="absolute -bottom-40 left-1/4 w-[30vw] h-[30vw] rounded-full blur-3xl bg-primary/10 animate-blob" style={{ animationDelay: "-8s", transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))" }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/40 to-background" />
    </div>
  );
};

export default AnimatedBackground;
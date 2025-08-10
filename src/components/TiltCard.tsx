import { PropsWithChildren, useRef } from "react";

const TiltCard = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12; // degrees
    const rotateX = ((y / rect.height) - 0.5) * -12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="transition-transform duration-200 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
import * as React from "react";

const SpeedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M21 13a9 9 0 10-18 0" />
    <path d="M12 13l6-6" />
    <path d="M5 19h14" />
  </svg>
);

export default SpeedIcon;

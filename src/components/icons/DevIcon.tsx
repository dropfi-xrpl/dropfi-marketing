import * as React from "react";

const DevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M7 8l-4 4 4 4" />
    <path d="M17 8l4 4-4 4" />
    <path d="M14 4l-4 16" />
  </svg>
);

export default DevIcon;

import React from 'react';

interface PulseLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function PulseLogo({ className = '', size = 36, animated = true }: PulseLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle glow backplate */}
          <path
            d="M6 32H18L26 12L38 52L46 32H58"
            stroke="#1B7A5A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
            className="blur-sm"
          />
          {/* Main heartbeat/pulse path */}
          <path
            d="M6 32H18L26 12L38 52L46 32H58"
            stroke="#1B7A5A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? "animate-[pulse_2s_infinite]" : ""}
          />
        </svg>
      </div>
      <span className="font-display font-extrabold text-2xl tracking-tight">
        <span className="text-brand-dark">Beat</span>
        <span className="text-brand-accent">Flow</span>
      </span>
    </div>
  );
}

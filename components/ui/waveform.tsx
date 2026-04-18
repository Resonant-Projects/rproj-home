interface WaveformProps {
  className?: string;
  height?: number;
}

export function Waveform({ className, height = 24 }: WaveformProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      width="100%"
      height={height}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 12 L20 12 L24 4 L28 20 L32 8 L36 16 L40 10 L44 14 L48 6 L52 18 L56 11 L60 13 L80 12 L84 10 L88 14 L92 7 L96 17 L100 12 L120 12 L124 5 L128 19 L132 9 L136 15 L140 12 L160 12 L164 11 L168 13 L172 8 L176 16 L180 10 L184 14 L188 12 L208 12 L212 4 L216 20 L220 9 L224 15 L228 12 L248 12 L252 10 L256 14 L260 6 L264 18 L268 12 L288 12 L292 11 L296 13 L300 8 L304 16 L308 12 L328 12 L332 5 L336 19 L340 10 L344 14 L348 12 L368 12 L372 9 L376 15 L380 11 L384 13 L400 12"
        stroke="url(#wave-gradient)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="15%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="85%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

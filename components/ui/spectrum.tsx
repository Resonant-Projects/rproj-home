"use client";

import { type PointerEvent, useCallback, useRef, useState } from "react";

interface SpectrumProps {
  bars?: number;
  className?: string;
}

// Organic rest heights — looks like a captured frame of an EQ at rest floor.
// Not a sine wave; deliberately uneven so it doesn't feel algorithmic.
const REST_HEIGHTS = [
  0.24, 0.42, 0.3, 0.52, 0.36, 0.28, 0.46, 0.34, 0.58, 0.4, 0.3, 0.48, 0.32, 0.26,
];

const FALLOFF = 28;

export function Spectrum({ bars = 14, className }: SpectrumProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  const handleMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setCursor(Math.min(1, Math.max(0, x)));
  }, []);

  const handleLeave = useCallback(() => setCursor(null), []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerDown={handleMove}
      className={`group relative flex items-end gap-[3px] h-4 ${className ?? ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const rest = REST_HEIGHTS[i % REST_HEIGHTS.length];
        const barPos = (i + 0.5) / bars;
        let scale = rest;
        if (cursor !== null) {
          const distance = cursor - barPos;
          const response = Math.exp(-(distance * distance) * FALLOFF);
          scale = rest + response * (1 - rest * 0.9);
        }
        const intensity = cursor !== null ? (scale - rest) / (1 - rest * 0.9) : 0;

        return (
          <span
            key={`bar-${
              // biome-ignore lint/suspicious/noArrayIndexKey: static bars
              i
            }`}
            className="block w-[2px] h-full origin-bottom rounded-full"
            style={{
              transform: `scaleY(${scale})`,
              backgroundColor: `color-mix(in oklch, var(--color-glow) ${
                55 + intensity * 45
              }%, var(--color-ink-700))`,
              transition:
                cursor === null
                  ? "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), background-color 500ms ease-out"
                  : "transform 120ms cubic-bezier(0.22, 1, 0.36, 1), background-color 120ms ease-out",
            }}
          />
        );
      })}
    </div>
  );
}

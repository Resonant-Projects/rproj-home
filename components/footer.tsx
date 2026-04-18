"use client";

import { useEffect, useState } from "react";
import { Waveform } from "@/components/ui/waveform";

export function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="pt-10 pb-2 space-y-5">
      <div className="text-glow/30">
        <Waveform height={22} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
        <span>{year} · Keith Elliott</span>
        <span>Next.js / Tailwind</span>
      </div>
    </footer>
  );
}

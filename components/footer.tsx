"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="text-center py-6 border-t border-border">
      <p className="text-sm text-muted-foreground">
        © {year} Keith Elliott. Built with Next.js & Tailwind CSS.
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Designed for performance, accessibility, and elegance.
      </p>
    </footer>
  );
}

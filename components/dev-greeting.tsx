"use client";

import { useEffect } from "react";

export function DevGreeting() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV === "production") return;
    const w = window as Window & { __ke_greeted?: boolean };
    if (w.__ke_greeted) return;
    w.__ke_greeted = true;

    const title = ["%c", "  keith elliott  "].join("");
    const titleStyle = [
      "font-family: ui-serif, Georgia, serif",
      "font-style: italic",
      "font-size: 28px",
      "color: #a87da3",
      "padding: 12px 0",
    ].join(";");

    const body = [
      "%c",
      "Poked around the console? Good ear.",
      "\nBuilt with Next.js, Tailwind, and a little 432 Hz.",
      "\nSay hi → info@resonantprojects.art",
    ].join("");
    const bodyStyle = ["color: #a87da3", "font-size: 12px", "line-height: 1.6"].join(";");

    console.log(title, titleStyle);
    console.log(body, bodyStyle);
  }, []);

  return null;
}

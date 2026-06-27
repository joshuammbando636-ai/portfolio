"use client";

import { motion } from "framer-motion";

/**
 * Fade + translate-up reveal, triggered once when scrolled into view.
 * Animates only transform/opacity so it stays smooth on low-power devices.
 * Framer Motion automatically shortens this to a near-instant fade when the
 * user has prefers-reduced-motion enabled.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const Component = motion[as];

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}

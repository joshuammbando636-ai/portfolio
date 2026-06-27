"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LottieCharacter from "@/components/LottieCharacter";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <LottieCharacter size={260} />

      <motion.h1
        {...fadeUp(0.1)}
        className="mt-6 font-display font-black leading-none text-paper"
        style={{ fontSize: "clamp(4rem, 8vw, 9rem)" }}
      >
        404
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-paper/50"
      >
        Page not found
      </motion.p>

      <motion.div {...fadeUp(0.3)} className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-ember hover:text-ember"
        >
          Back home →
        </Link>
      </motion.div>
    </main>
  );
}

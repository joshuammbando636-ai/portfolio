"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

const HEADLINE = [
  "I build fast,",
  "considered",
  "interfaces for",
  "brands that care.",
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LINE_STAGGER = 0.08;
const BUTTONS_DELAY = 0.2 + HEADLINE.length * LINE_STAGGER + 0.1;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink px-6 pb-10 pt-24 sm:px-10 sm:pt-28 lg:px-16"
    >

      {/* ── Fullscreen background image ───────────────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      >
        <Image
          src="/home/me-hero.png"
          alt="Joshua Mmbando"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay so headline text stays legible */}
        <div className="absolute inset-0 bg-ink/60" />
      </motion.div>

      {/* ── Headline — line-by-line mask reveal ───────────────────────── */}
      <h1
        className="relative z-10 font-display font-black leading-[0.92] tracking-[-0.04em] text-paper"
        style={{ fontSize: "clamp(2.5rem, 9vw, 9rem)" }}
      >
        {HEADLINE.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.88,
                delay: 0.2 + i * LINE_STAGGER,
                ease: EASE,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* ── CTA row ───────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mt-8 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE, delay: BUTTONS_DELAY }}
      >
        <Magnetic strength={0.25}>
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ember px-7 py-4 text-sm font-semibold tracking-wide text-espresso transition-opacity duration-300 hover:opacity-85"
          >
            View my work
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </Magnetic>

        <Magnetic strength={0.25}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-paper/20 px-7 py-4 text-sm font-semibold tracking-wide text-paper transition-colors duration-300 hover:border-paper/50"
          >
            Get in touch
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </Magnetic>
      </motion.div>

    </section>
  );
}

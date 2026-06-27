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
      className="relative grid min-h-screen grid-cols-1 items-center gap-10 overflow-hidden bg-ink px-6 py-28 sm:px-10 sm:py-32 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-16"
    >
      {/* ── Text column ──────────────────────────────────────────────── */}
      <div className="relative z-10 order-2 lg:order-1">
        <h1
          className="font-display font-black leading-[0.92] tracking-[-0.04em] text-paper"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
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

        {/* ── CTA row ───────────────────────────────────────────────── */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4"
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
      </div>

      {/* ── Photo panel — its own contained zone, never overlapped by text ── */}
      <motion.div
        className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-3xl lg:order-2 lg:aspect-auto lg:h-[70vh]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        <Image
          src="/home/me-hero.png"
          alt="Joshua Mmbando"
          fill
          className="object-cover object-top"
          priority
        />
      </motion.div>
    </section>
  );
}

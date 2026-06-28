"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import LottieCharacter from "@/components/LottieCharacter";

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
      className="relative grid min-h-screen grid-cols-1 items-center gap-10 overflow-hidden px-6 py-28 sm:px-10 sm:py-32 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-16"
    >
      {/* ── Text column ──────────────────────────────────────────────── */}
      <div className="relative z-10 order-2 lg:order-1">
        <h1
          className="font-display font-black leading-[0.92] tracking-[-0.04em] text-espresso"
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
              className="group inline-flex items-center gap-2.5 rounded-full border border-espresso/20 px-7 py-4 text-sm font-semibold tracking-wide text-espresso transition-colors duration-300 hover:border-espresso/50"
            >
              Get in touch
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="/resume/Joshua_Mmbando_Resume.pdf"
              download
              className="group inline-flex items-center gap-2.5 px-1 py-4 text-sm font-semibold tracking-wide text-espresso/70 transition-colors duration-300 hover:text-espresso"
            >
              Download résumé
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* ── Lottie illustration ──────────────────────────────────────── */}
      <motion.div
        className="relative order-1 flex justify-center lg:order-2 lg:h-[70vh] lg:items-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        <LottieCharacter src="/music.json" size={460} mobileSize={220} mobileBreakpoint={1024} />
      </motion.div>
    </section>
  );
}

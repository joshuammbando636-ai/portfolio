"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "#work",    label: "Work"    },
  { href: "#about",   label: "About"   },
  { href: "#skills",  label: "Skills"  },
  { href: "#contact", label: "Contact" },
];

// ── Spring presets ────────────────────────────────────────────────────────────
// Mobile panel: heavy spring overshoot (notification-shade feel)
const PANEL_SPRING = { type: "spring", stiffness: 320, damping: 18, mass: 1.1 } as const;
// Desktop panel: slide from right with a gentle bounce
const SLIDE_SPRING = { type: "spring", stiffness: 260, damping: 24, mass: 1 } as const;
// Per-link stagger
const ITEM_SPRING  = { type: "spring", stiffness: 500, damping: 24 } as const;
// Bubble mount
const BTN_SPRING   = { type: "spring", stiffness: 420, damping: 16 } as const;
// Per-link hover nudge — natural spring settle, not a linear ease
const HOVER_SPRING  = { type: "spring", stiffness: 300, damping: 22, mass: 0.7 } as const;

export default function Nav() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isDesktop,  setIsDesktop]  = useState(false);
  const [canHover,   setCanHover]   = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const shouldReduce                = useReducedMotion();
  const buttonRef                   = useRef<HTMLButtonElement>(null);

  // Sync breakpoint (sm = 640 px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const update = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // True hover capability only (excludes touch, even on wide/desktop-class
  // touchscreens) — prevents the per-row thumbnail effect from getting
  // stuck "on" after a tap.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const update = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Esc
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsOpen(false); buttonRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Clear any stale per-row hover state when the panel closes
  useEffect(() => {
    if (!isOpen) setHoveredHref(null);
  }, [isOpen]);

  const close = () => { setIsOpen(false); buttonRef.current?.focus(); };

  // Per-character 3D barrel-roll on hover (desktop only) — purely additive on
  // top of the existing translate-x nudge; doesn't touch font-size or layout.
  const handleCharRotate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canHover || shouldReduce) return;
    const chars = e.currentTarget.querySelectorAll<HTMLSpanElement>(".nav-char");
    // Two compounding bugs caused characters to drift to scattered, wrong
    // screen positions after repeated hovers:
    // 1. transformOrigin had a -24px Z offset (for a "tube" depth illusion),
    //    which combined with perspective made each character orbit off its
    //    own position instead of flipping in place — worse the more it spun.
    // 2. "+=360" accumulated unbounded across hovers (thousands of degrees
    //    after enough re-hovers), amplifying any precision drift.
    // Fix: pivot exactly on each character's own center (no Z offset), and
    // normalize the current rotation via modulo before adding the next turn
    // so the value never grows unbounded. overwrite:true still prevents
    // overlapping tweens from fighting each other on rapid re-hover.
    gsap.to(chars, {
      rotationX: (_i, target) => (gsap.getProperty(target, "rotationX") as number) % 360 + 360,
      stagger: 0.045,
      duration: 0.7,
      ease: "power2.out",
      transformOrigin: "50% 50%",
      overwrite: true,
    });
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    setTimeout(() => {
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(href, { duration: 1.2 });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      {/* ── Backdrop (both) ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            aria-hidden
            className="fixed inset-0 z-[65] bg-ink/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.2 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* ── Floating bubble button (both layouts) ────────────────────────── */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[70]">
        <motion.button
          ref={buttonRef}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso border border-paper/15 shadow-[0_4px_28px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...BTN_SPRING, delay: 0.3 }}
          whileHover={shouldReduce ? {} : { scale: 1.12 }}
          whileTap={shouldReduce   ? {} : { scale: 0.88 }}
        >
          {/* Hamburger ↔ X morph */}
          <span aria-hidden className="relative flex h-[18px] w-5 flex-col items-center justify-between">
            <span
              className="block h-[2px] w-full rounded-full bg-paper/90 origin-center"
              style={{
                transition: shouldReduce ? "none" : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isOpen ? "translateY(8px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-[2px] w-full rounded-full bg-paper/90"
              style={{
                transition: shouldReduce ? "none" : "opacity 0.15s ease, transform 0.15s ease",
                opacity:   isOpen ? 0 : 1,
                transform: isOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block h-[2px] w-full rounded-full bg-paper/90 origin-center"
              style={{
                transition: shouldReduce ? "none" : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isOpen ? "translateY(-8px) rotate(-45deg)" : "none",
              }}
            />
          </span>
        </motion.button>
      </div>

      {/* ── Panels ───────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isOpen && (
          isDesktop
            /* ── Desktop: full-height right-side panel ────────────────── */
            ? (
              <motion.nav
                key="panel-desktop"
                aria-label="Main navigation"
                className="fixed inset-y-0 right-0 z-[68] flex flex-col justify-center
                           w-[min(50vw,660px)] bg-paper
                           border-l border-espresso/10
                           shadow-[-16px_0_80px_rgba(0,0,0,0.22)]"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{    x: "100%",
                           transition: shouldReduce
                             ? { duration: 0 }
                             : { ...SLIDE_SPRING } }}
                transition={shouldReduce ? { duration: 0 } : { ...SLIDE_SPRING }}
              >
                <ul className="flex flex-col px-14 xl:px-20">
                  {NAV_LINKS.map((link, i) => {
                    const isHovered = canHover && hoveredHref === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 48 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={shouldReduce
                          ? { duration: 0 }
                          : { ...ITEM_SPRING, delay: 0.1 + i * 0.07 }}
                      >
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          onMouseEnter={(e) => { canHover && setHoveredHref(link.href); handleCharRotate(e); }}
                          onMouseLeave={() => canHover && setHoveredHref(null)}
                          className="w-full text-left py-4"
                        >
                          <motion.span
                            className="block font-display font-black uppercase leading-none
                                       tracking-[-0.02em] text-espresso
                                       text-[clamp(3rem,6vw,5.5rem)]"
                            animate={{ x: isHovered ? 24 : 0 }}
                            transition={shouldReduce ? { duration: 0 } : HOVER_SPRING}
                            style={{ perspective: 700, transformStyle: "preserve-3d" }}
                          >
                            {link.label.split("").map((ch, ci) => (
                              <span
                                key={ci}
                                className="nav-char"
                                style={{ display: "inline-block", backfaceVisibility: "hidden" }}
                              >
                                {ch}
                              </span>
                            ))}
                          </motion.span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>
            )
            /* ── Mobile: compact bouncy card (unchanged) ──────────────── */
            : (
              <motion.nav
                key="panel-mobile"
                aria-label="Main navigation"
                className="fixed top-24 right-6 z-[68] overflow-hidden rounded-3xl
                           border border-paper/10 bg-espresso
                           shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                           w-[min(82vw,310px)]"
                style={{ transformOrigin: "top right" }}
                initial={{ opacity: 0, scale: 0.72, y: -24 }}
                animate={{ opacity: 1, scale: 1,    y: 0   }}
                exit={{    opacity: 0, scale: 0.78, y: -16,
                           transition: { duration: shouldReduce ? 0 : 0.18, ease: "easeIn" } }}
                transition={shouldReduce
                  ? { duration: 0 }
                  : { ...PANEL_SPRING, opacity: { duration: 0.12 } }}
              >
                <ul className="py-3">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={shouldReduce
                        ? { duration: 0 }
                        : { ...ITEM_SPRING, delay: 0.06 + i * 0.055 }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="w-full px-6 text-left font-display font-semibold tracking-tight
                                   text-paper/75 transition-colors duration-150
                                   hover:bg-paper/[0.07] hover:text-paper
                                   py-5 text-[2.2rem] leading-none"
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            )
        )}
      </AnimatePresence>
    </>
  );
}

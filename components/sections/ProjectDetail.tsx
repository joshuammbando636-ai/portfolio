"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { mshot } from "@/lib/mshot";
import { type Project } from "@/data/projects";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import ScrubAnimation from "@/components/ScrubAnimation";

export default function ProjectDetail({ project }: { project: Project }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const update = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pin the showcase image in place while the detail blocks beside it scroll
  // past — the "sticky figure, scrolling annotations" pattern, desktop only.
  useEffect(() => {
    if (reducedMotion || !isDesktop) return;
    const wrap = wrapRef.current;
    const left = leftColRef.current;
    if (!wrap || !left) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        pin: left,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    return () => ctx.revert();
  }, [reducedMotion, isDesktop]);

  return (
    <main className="relative">
      {/* ── Back bar ─────────────────────────────────────────────────── */}
      <div className="px-6 pt-28 sm:px-10 sm:pt-32 lg:px-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm tracking-wide text-espresso/55 hover:text-espresso transition-colors duration-300"
        >
          <span aria-hidden>←</span> All work
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-10 pb-16 sm:px-10 sm:pb-20 lg:px-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
            {project.role} — {project.year}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {project.name}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-base text-espresso/65 leading-relaxed sm:text-lg">
            {project.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8">
            <Magnetic strength={0.3}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold tracking-wide text-paper transition-opacity duration-300 hover:opacity-85"
              >
                Visit live site
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      {/* ── Pinned showcase: sticky preview, scrolling detail blocks ────── */}
      <section ref={wrapRef} className="px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div
            ref={leftColRef}
            className="w-full shrink-0 lg:flex lg:h-screen lg:w-[42%] lg:items-center"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-espresso/12 bg-espresso/10">
              <Image
                src={mshot(project.liveUrl, 1200, 900)}
                alt={`${project.name} — live preview`}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-20 py-4 lg:space-y-44 lg:py-44">
            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  The brief
                </h2>
              </Reveal>
              <div className="mt-5 max-w-xl text-base text-espresso/65 leading-relaxed">
                <Reveal delay={0.06}>
                  <p>{project.longDescription[0]}</p>
                </Reveal>
              </div>
            </div>

            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  The approach
                </h2>
              </Reveal>
              <div className="mt-5 space-y-4 max-w-xl text-base text-espresso/65 leading-relaxed">
                {project.longDescription.slice(1).map((para, i) => (
                  <Reveal key={i} delay={0.06 * i}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  What I built
                </h2>
              </Reveal>
              <ul className="mt-5 max-w-xl space-y-3">
                {project.highlights.map((point, i) => (
                  <Reveal key={point} delay={0.06 * i}>
                    <li className="flex gap-3 text-base text-espresso/70 leading-relaxed">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      {point}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Stack
                </h2>
              </Reveal>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-espresso/15 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-espresso/70"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className="flex min-h-screen flex-col justify-center px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Want something like this built?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.25}>
              <a
                href="mailto:joshua050mmbando@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-sm font-semibold tracking-wide text-espresso transition-opacity duration-300 hover:opacity-85"
              >
                Get in touch
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <Link
              href="/#work"
              className="text-sm tracking-wide text-espresso/55 hover:text-espresso transition-colors duration-300"
            >
              ← Back to all work
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

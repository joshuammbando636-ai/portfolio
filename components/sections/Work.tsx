"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { mshot } from "@/lib/mshot";
import { projects, type Project } from "@/data/projects";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-espresso/12 bg-panel/60 transition-colors duration-500 hover:border-espresso/30">
      <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden rounded-t-3xl bg-espresso/10">
        <Image
          src={mshot(project.liveUrl)}
          alt={`${project.name} — live preview`}
          fill
          sizes="(min-width: 1024px) 52vw, (min-width: 640px) 64vw, 85vw"
          className="object-cover object-top grayscale contrast-[1.08] brightness-95 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-espresso/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden p-5 sm:p-7">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-espresso/65 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic strength={0.3}>
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold tracking-wide text-paper transition-opacity duration-300 hover:opacity-85"
              >
                View project
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-espresso/30 pb-1 text-sm tracking-wide hover:border-espresso transition-colors duration-300"
              >
                Live site
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>

            {project.githubUrl ? (
              <Magnetic strength={0.3}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm tracking-wide text-espresso/50 hover:text-espresso transition-colors duration-300"
                >
                  Source
                </a>
              </Magnetic>
            ) : (
              // TODO: swap this for a real <a href="https://github.com/..."> once the repo is public.
              <span className="text-sm tracking-wide text-espresso/30">Source — coming soon</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section || reducedMotion) return;

    track.classList.remove("overflow-x-auto", "snap-x", "snap-mandatory");

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - track.clientWidth;

      // The pin holds for ~1.6x the horizontal travel distance, so the
      // signature moment reads as deliberate rather than a quick flick-past.
      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() * 1.6}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    // If the page loads directly on #work, the browser's native hash-jump
    // fires before GSAP inserts the pin spacer, so the section ends up
    // scrolled to a stale position (too low, clipping the cards' bottom
    // edge). Re-align once the pinned layout has settled.
    if (window.location.hash === "#work") {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const lenis = (window as any).__lenis;
        if (lenis) lenis.scrollTo(section, { immediate: true });
        else section.scrollIntoView();
      });
    }

    return () => {
      ctx.revert();
      track.classList.add("overflow-x-auto", "snap-x", "snap-mandatory");
      gsap.set(track, { clearProps: "transform" });
    };
  }, [reducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex h-dvh min-h-[640px] flex-col justify-center overflow-hidden py-10 sm:py-0"
    >
      <div className="shrink-0 px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 mb-8 sm:mb-12">
        <Reveal delay={0.05}>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl">
            Three sites. Three different problems worth solving.
          </h2>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 sm:gap-8 px-6 sm:px-10 lg:px-16 pb-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="h-[58vh] sm:h-[60vh] min-h-[420px] w-[85vw] sm:w-[64vw] lg:w-[52vw] shrink-0 snap-center"
          >
            <ProjectCard project={project} />
          </div>
        ))}
        <div className="w-[2vw] shrink-0" aria-hidden />
      </div>
    </section>
  );
}

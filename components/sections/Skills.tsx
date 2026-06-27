"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Reveal from "@/components/Reveal";

const groups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "Python", "REST APIs", "SQL & NoSQL databases"],
  },
  {
    label: "Design",
    items: ["Photoshop", "Illustrator", "Visual identity", "Layout & typography"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const columns = section.querySelectorAll<HTMLElement>("[data-skill-column]");

      columns.forEach((column) => {
        const rows = column.querySelectorAll<HTMLElement>("[data-skill-row]");
        const bars = column.querySelectorAll<HTMLElement>("[data-skill-bar]");

        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(rows, { opacity: 0, y: 14 });

        gsap.timeline({
          scrollTrigger: {
            trigger: column,
            start: "top 85%",
            once: true,
          },
        })
          .to(rows, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
          })
          .to(
            bars,
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.07,
            },
            "<"
          );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
    >
      <Reveal delay={0.05}>
        <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl">
          The toolkit behind the work.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {groups.map((group) => (
          <div key={group.label} data-skill-column className="border-t border-espresso/15 pt-6">
            <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-espresso/90">
              {group.label}
            </h3>
            <ul className="mt-5 space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  data-skill-row
                  className="group flex items-center gap-3 text-sm sm:text-base text-espresso/75 transition-colors duration-300 hover:text-espresso"
                >
                  <span
                    data-skill-bar
                    aria-hidden
                    className="inline-block h-px w-5 shrink-0 bg-espresso/40 transition-all duration-300 group-hover:w-8 group-hover:bg-ember"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

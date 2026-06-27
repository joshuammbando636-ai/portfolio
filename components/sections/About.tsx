import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="flex min-h-screen flex-col justify-center px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="max-w-4xl">
        <Reveal delay={0.05}>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
            I build things that work — then make them feel inevitable.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-6 max-w-2xl text-base sm:text-lg text-espresso/70 leading-relaxed">
          <Reveal delay={0.1}>
            <p>
              I&apos;m Joshua Godwin Mmbando — a React/Next.js developer
              currently studying biomedical engineering, which is a stranger
              combination than it sounds, and a more useful one. Engineering
              taught me to think in systems and constraints. Design taught me
              that the system still has to feel like something when a person
              meets it.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              Day to day that means full-stack web apps — Node and Python
              underneath, React and Next.js up front — built and finished
              with the same care I&apos;d put into a layout in Photoshop or
              Illustrator.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="text-espresso/90">
              My edge isn&apos;t that I can code, or that I can design.
              It&apos;s that I do both, on the same project, without handing
              it off — so nothing gets lost in translation between the idea
              and the interface.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

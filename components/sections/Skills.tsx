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
  return (
    <section id="skills" className="flex min-h-screen flex-col justify-center px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <Reveal delay={0.05}>
        <h2 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl">
          The toolkit behind the work.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {groups.map((group, i) => (
          <Reveal key={group.label} delay={0.12 + i * 0.08}>
            <div className="border-t border-espresso/15 pt-6">
              <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-espresso/90">
                {group.label}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm sm:text-base text-espresso/75 hover:text-espresso transition-colors duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

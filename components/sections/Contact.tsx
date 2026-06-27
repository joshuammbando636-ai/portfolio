import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import LottieCharacter from "@/components/LottieCharacter";

const EMAIL = "joshua050mmbando@gmail.com";

// TODO: add real social links once they exist — e.g.
// { label: "GitHub", href: "https://github.com/your-handle" }
// { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" }
const socials: { label: string; href: string }[] = [];

export default function Contact() {
  return (
    <section id="contact" className="flex min-h-screen flex-col justify-center px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-12">
        {/* Character — above the text on mobile, beside it on desktop */}
        <div className="flex shrink-0 flex-col items-center md:order-2 md:w-[240px]">
          <LottieCharacter size={180} className="md:hidden" />
          <LottieCharacter size={240} className="hidden md:block" />
          <p className="mt-3 font-display text-sm italic text-espresso/50">
            Let&apos;s hop on this together.
          </p>
        </div>

        <div className="flex-1">
          <Reveal delay={0.05}>
            <h2 className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] max-w-3xl">
              Got something worth building? Let&apos;s talk.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-base sm:text-lg text-espresso/65 leading-relaxed">
              I&apos;m open to freelance work, collaborations, and roles where
              design and engineering aren&apos;t treated as separate jobs. The
              fastest way to reach me is email — I read everything.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[7vw] sm:text-4xl lg:text-5xl font-semibold tracking-tight border-b border-espresso/25 pb-3 hover:border-espresso transition-colors duration-300 max-w-full break-all sm:break-normal"
                >
                  {EMAIL}
                  <span className="inline-block text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {socials.length > 0 && (
            <Reveal delay={0.24}>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
                {socials.map((social) => (
                  <Magnetic key={social.label} strength={0.35}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-wide text-espresso/55 hover:text-espresso transition-colors duration-300"
                    >
                      {social.label}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.3}>
            <p className="mt-24 text-xs sm:text-sm text-espresso/65 font-mono tracking-wide">
              Joshua Godwin Mmbando — built with Next.js, Tailwind, GSAP & Framer Motion.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

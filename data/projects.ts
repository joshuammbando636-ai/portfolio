export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  role: string;
  year: string;
  stack: string[];
  highlights: string[];
  liveUrl: string;
  githubUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "brancon",
    name: "Brancon",
    tagline:
      "A motion-first marketing site built to make a six-year-old trading company feel like a global, premium brand.",
    description:
      "Motion-first marketing site for an East African commodity trading company — a cinematic, scroll-told story built to read as a global, premium brand.",
    longDescription: [
      "Brancon connects East African farmers, miners, and cooperatives to international buyers — but those buyers have never seen the warehouses or the fields, so the website had to carry the entire first impression. It needed to feel comparable to a multinational, explain nine product categories and six services without overwhelming anyone, and still perform well on the slower connections common in the markets it serves.",
      "I built it as a scroll-told narrative rather than a static brochure: a cinematic canvas preloader hands off into a hero, then line-by-line text reveals and horizontal product galleries walk the visitor through why the company exists and what it trades, before closing with client proof and a clear call to action.",
      "All business content — products, services, clients — lives in one typed data file, so adding a new product line is a one-line change, not a layout rewrite. And every scroll interaction is built on position: sticky instead of GSAP's DOM-mutating pin: true, which kept introducing layout jumps during development.",
    ],
    role: "Design & Front-End Development",
    year: "2024",
    stack: ["Next.js", "TypeScript", "GSAP", "Lenis", "EmailJS"],
    highlights: [
      "Replaced GSAP's pin: true with a sticky + measured-wrapper pattern across two pages, eliminating layout jank",
      "Hydration-safe Google Maps embed — mount-gated so it never collides with React's hydration",
      "Lenis and ScrollTrigger share a single ticker, and Lenis steps aside entirely on the page with manual scroll control",
      "Responsive interaction swaps via gsap.matchMedia — full pinned/horizontal interactions on desktop, clean stacked layouts on mobile",
    ],
    liveUrl: "https://brancon.vercel.app",
    githubUrl: "https://github.com/joshuammbando636-ai/brancon",
  },
  {
    slug: "preetie-decor",
    name: "Preetie Decor",
    tagline:
      "A visual-first site for an event-decoration studio, built to let real wedding and party photography do the selling.",
    description:
      "Site for a Dar es Salaam event-decoration studio — a photo-led gallery experience with a WhatsApp-first booking flow, built for how clients actually book in that market.",
    longDescription: [
      "Preetie Decor styles weddings, bridal showers, birthdays, and corporate openings around Dar es Salaam — work that sells itself on photos, not paragraphs. The site needed to get out of the way of the photography, while still being findable: local searches like \"wedding decoration Masaki\" matter more here than generic traffic.",
      "I built it as a React single-page app — React, TypeScript, and Vite, styled with styled-components against a small set of design tokens (a Playfair Display and Poppins pairing, a deep red brand accent) — with a photo gallery as the centerpiece rather than a traditional services-first homepage.",
      "Because a client-rendered SPA is invisible to search engines by default, the site ships its own prerendering step that outputs static HTML per route, plus per-page metadata and a maintained sitemap, so the local-SEO searches that actually bring in bookings still work. Booking itself goes straight to WhatsApp — the channel clients in this market actually use — rather than a contact form.",
    ],
    role: "Design & Front-End Development",
    year: "2024",
    stack: ["React", "TypeScript", "Vite", "styled-components"],
    highlights: [
      "Photo-first gallery experience instead of a copy-heavy homepage",
      "Custom prerendering pipeline so a client-rendered SPA stays crawlable for local SEO",
      "WhatsApp-first booking CTA — matched to how clients in this market actually reach out",
      "Centralized design tokens so the brand palette and type system stay consistent everywhere",
    ],
    liveUrl: "https://www.preetiedecor.com/",
    githubUrl: "https://github.com/joshuammbando636-ai/pretti",
  },
  {
    slug: "flowconvertlab",
    name: "FlowConvertLab",
    tagline:
      "An affiliate marketing site engineered around one goal: turning content into LiveChat sign-ups.",
    description:
      "Affiliate marketing site for LiveChat and its sister products — motion-driven UX and a single-variable design system, built around one conversion path.",
    longDescription: [
      "FlowConvertLab promotes LiveChat, ChatBot, HelpDesk, and KnowledgeBase as an independent affiliate site — every page exists to get the visitor to start a LiveChat free trial through a tracked link. That meant the site had to read as premium and trustworthy enough to convert a technical buyer, while staying honest: no invented stats, no fabricated testimonials, and every comparison backed by a real link out to live pricing.",
      "I built the whole system end-to-end — information architecture, a tokenized design system driven entirely by CSS custom properties (the brand can be re-themed by changing a single accent variable), and the motion layer on GSAP, Lenis, and Framer Motion. The blog is JSON-driven and statically generated at build time, with headings auto-IDed to build a scroll-spy table of contents.",
      "The trickiest bug was a sticky sidebar that refused to pin on the blog's article page — it turned out overflow-x: hidden on html/body was silently creating a new scroll container, which breaks position: sticky in any descendant. Switching to overflow-x: clip kept the horizontal-overflow protection without breaking the pin.",
    ],
    role: "Design & Front-End Development",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Lenis", "Framer Motion"],
    highlights: [
      "Floating bubble nav that morphs into a notification-style panel with a spring transition",
      "Blog built on a pinned scroll-spy table of contents, with only the article column scrolling",
      "Fixed a sticky-sidebar bug caused by overflow-x: hidden silently breaking position: sticky",
      "Affiliate links carry correct rel=\"sponsored nofollow noopener\" attribution and site-wide disclosure — zero fabricated stats or testimonials",
    ],
    liveUrl: "https://www.flowconvertlab.com/",
    githubUrl: "https://github.com/joshuammbando636-ai/flowconvertlab",
  },
];

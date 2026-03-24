"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero/PageHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    num: "001",
    title: "Our Goals",
    body: "To create nature-friendly residences that seamlessly blend luxury and affordability — fulfilling the specific needs of homebuyers and investors while enriching Vadodara's urban landscape.",
  },
  {
    num: "002",
    title: "Our Vision",
    body: "To be Vadodara's most trusted real estate developer — recognised for transparent dealings, uncompromising quality, and developments that stand as enduring landmarks for generations.",
  },
  {
    num: "003",
    title: "Our Mission",
    body: "To deliver not just customer satisfaction but genuine customer happiness — through honesty, craftsmanship, and a deep-rooted commitment to every family that entrusts us with their dream home.",
  },
];

const STATS = [
  { value: "1992", label: "Founded", sub: "Over 3 decades of legacy" },
  { value: "30+", label: "Years of Trust", sub: "Consistently delivering quality" },
  { value: "120+", label: "Projects Completed", sub: "Across residential & commercial" },
  { value: "3,000+", label: "Happy Families", sub: "80% clients via word of mouth" },
];

const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Honesty",
    desc: "We believe transparent communication is the foundation of every lasting relationship.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Transparency",
    desc: "From pricing to timelines, we keep our clients fully informed at every stage of a project.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Quality",
    desc: "Premium materials, certified processes, and a craftsman's eye — on every project, every time.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Reliability",
    desc: "Consistent delivery, on-schedule handovers, and after-sales support you can count on.",
  },
];

const TEAM: {
  id: number;
  name: string;
  title: string;
  education: string;
  credentials: string[];
  photo: string;
}[] = [
  {
    id: 1,
    name: "Taher Zabuawala",
    title: "Director",
    education: "BE Civil · MBA (Marketing) · LLB",
    credentials: [
      "Gov. Approved Property Valuer (Wealth Tax & Black Money Act)",
      "Gov. Approved Arbitrator",
      "Project Development & Management",
    ],
    photo: "/images/Taher-Zabuawala.jpg",
  },
  {
    id: 2,
    name: "Ajab Zabuawala",
    title: "Director",
    education: "BE Civil · ME (Structure) · MBA (Finance)",
    credentials: [
      "Gov. Approved Property Valuer (Wealth Tax & Black Money Act)",
      "Competent Person under Section 6 & 112 of Factories Act",
    ],
    photo: "/images/Ajab-Zabuawala.jpg",
  },
  {
    id: 3,
    name: "Juzer Nalwala",
    title: "Director",
    education: "BE Civil · MSc Hydrogeology (Germany)",
    credentials: [
      "Environmental Consultant",
      "Licensed Hydrogeologist Works",
      "Ground Water Consultant",
      "Project Manager & Property Valuer",
    ],
    photo: "/images/Juzer-Nalwala.jpg",
  },
  {
    id: 4,
    name: "Amatullah Juzer Nalwala",
    title: "Director",
    education: "BArch · LLB · Master of Property & Development (UNSW, Sydney)",
    credentials: [
      "Licensed under the Council of Architecture of India",
      "VMC & SMC Licensed",
      "Property Valuer",
      "Real Estate Investment Consultant",
    ],
    photo: "/images/Amatullah-nalwala.jpg",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const pillarsRef = useScrollReveal<HTMLElement>();
  const storyRef = useScrollReveal<HTMLElement>();
  const valuesRef = useScrollReveal<HTMLElement>();
  const teamRef = useScrollReveal<HTMLElement>();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          PAGE HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <PageHero
        title="About Us"
        subtitle="Discover the story of our studio where passion meets purpose and values"
        image="/images/About.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#1c1c2e" }}>
        <div className="section-container">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="px-7 py-8 flex flex-col"
                style={{ background: "#1c1c2e" }}
              >
                <span
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#c9a84c",
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-sm font-semibold text-white mb-1"
                >
                  {s.label}
                </span>
                <span
                  className="text-[11px] leading-snug"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DRIVEN BY PURPOSE — 3 NUMBERED PILLARS
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={pillarsRef}
        className="py-24 md:py-32"
        style={{ background: "#ffffff" }}
      >
        <div className="section-container">
          {/* 3-col header row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 items-start mb-16">
            {/* Left: label */}
            <div className="reveal-left flex items-start gap-3 pt-1">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                style={{ background: "#c9a84c" }}
              />
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: "#1c1c2e" }}
              >
                Our Goals
              </span>
            </div>

            {/* Centre: bold heading */}
            <div className="reveal-up">
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.15]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1c1c2e",
                }}
              >
                Driven by purpose &amp;
                <br />
                principles.
              </h2>
            </div>

            {/* Right: description */}
            <div className="reveal-right">
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#4a4a5e" }}
              >
                Our mission is to deliver emotionally resonant and functionally
                brilliant spaces — homes and commercial developments that reflect
                individuality and elevate everyday living.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-14"
            style={{ background: "#e8e2d9" }}
          />

          {/* Numbered cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className={`reveal-up delay-${(i + 1) * 100} flex flex-col p-8 md:p-10`}
                style={{
                  background: "#f5f1ec",
                  borderRadius: "2px",
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest mb-6"
                  style={{ color: "#b0a898" }}
                >
                  ({p.num})
                </span>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#1c1c2e",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-[1.85] flex-1"
                  style={{ color: "#5a5a6a" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          OUR STORY — TEXT LEFT + 2×2 IMAGES RIGHT
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={storyRef}
        className="py-24 md:py-32"
        style={{ background: "#faf9f6" }}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-16 lg:gap-20 items-center">
            {/* Left column */}
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-6 h-px"
                  style={{ background: "#c9a84c" }}
                />
                <span
                  className="text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: "#c9a84c" }}
                >
                  Our Story
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-[1.2] mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1c1c2e",
                }}
              >
                Rooted in Clear Vision.
                <br />
                <span style={{ color: "#c9a84c" }}>Driven by Legacy.</span>
              </h2>

              <div
                className="space-y-4 text-[15px] leading-[1.85] mb-10"
                style={{ color: "#4a4a5e" }}
              >
                <p>
                  Since day one, we&apos;ve believed that spaces and people
                  shape each other. What started as a small but determined
                  construction venture in 1992 has grown into one of
                  Vadodara&apos;s most respected full-service real estate
                  developers — spanning landmark residential townships,
                  premium farmhouses, riverfront properties, and vibrant
                  commercial hubs.
                </p>
                <p>
                  Our passion for craftsmanship, transparency, and client
                  happiness drives every decision. The rare combination of
                  luxury and affordability remains our defining USP — and with
                  over 80% of our new clients arriving through word of mouth,
                  we let the quality of our work speak louder than any
                  promise. Not concrete jungles, but nature-friendly homes
                  where families truly thrive.
                </p>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-2 gap-px"
                style={{ background: "#e8e2d9" }}
              >
                {[
                  { num: "120+", label: "Homes Transformed", sub: "From apartments to luxury villas, each project is unique" },
                  { num: "3,000+", label: "Happy Families", sub: "Transforming spaces, delighting homeowners and investors" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="px-6 py-7"
                    style={{ background: "#faf9f6" }}
                  >
                    <p
                      className="text-4xl font-bold mb-1"
                      style={{ color: "#b0a898", fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.num}
                    </p>
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ color: "#1c1c2e" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-xs leading-snug"
                      style={{ color: "#7a7a8e" }}
                    >
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: 2×2 image grid */}
            <div className="reveal-right grid grid-cols-2 gap-3">
              {[
                { src: "/images/test1.jpg", tall: true },
                { src: "/images/test2.jpg", tall: false },
                { src: "/images/test3.jpeg", tall: false },
                { src: "/images/project-1.jpg", tall: true },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: img.tall ? "3/4" : "4/3",
                    borderRadius: "2px",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={`Space Age Group project ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CORE VALUES
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={valuesRef}
        className="py-24 md:py-28"
        style={{ background: "#1c1c2e" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
                <span
                  className="text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: "#c9a84c" }}
                >
                  Our Pillars
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Values That Define Us
              </h2>
            </div>
            <p
              className="reveal-right md:max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Every brick, every decision, and every conversation is shaped
              by the principles we have held since 1992.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`reveal-up delay-${(i + 1) * 100} px-8 py-9 group transition-all duration-300`}
                style={{ background: "#1c1c2e" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222236")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1c1c2e")}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "#c9a84c",
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  className="text-base font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          OUR TEAM
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        ref={teamRef}
        className="py-24 md:py-32"
        style={{ background: "#faf9f6" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
                <span
                  className="text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: "#c9a84c" }}
                >
                  Leadership
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.15]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1c1c2e",
                }}
              >
                Meet the Directors
              </h2>
            </div>
            <p
              className="reveal-right md:max-w-xs text-sm leading-relaxed"
              style={{ color: "#4a4a5e" }}
            >
              Our leadership team brings together deep expertise in civil
              engineering, architecture, law, and finance — giving every
              project a multi-dimensional advantage.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <div
                key={member.id}
                className={`reveal-up delay-${(i + 1) * 100} group flex flex-col overflow-hidden`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8e2d9",
                  transition: "border-color 0.35s, box-shadow 0.35s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px -10px rgba(28,28,46,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e2d9";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Photo */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gold overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(201,168,76,0.18) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="px-6 pt-6 pb-7 flex flex-col flex-1">
                  <h3
                    className="text-[1.1rem] font-bold mb-0.5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#1c1c2e",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-[11px] font-bold tracking-widest uppercase mb-3"
                    style={{ color: "#c9a84c" }}
                  >
                    {member.title}
                  </p>

                  {/* Education */}
                  <p
                    className="text-xs leading-snug mb-4 pb-4"
                    style={{
                      color: "#6b6b80",
                      borderBottom: "1px solid #f0ece7",
                    }}
                  >
                    {member.education}
                  </p>

                  {/* Credentials */}
                  <ul className="flex flex-col gap-2">
                    {member.credentials.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-xs leading-snug"
                        style={{ color: "#4a4a5e" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: "#c9a84c" }}
                        />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CLOSING QUOTE / CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-24 relative overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Background texture lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #1c1c2e 0px, #1c1c2e 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div className="section-container relative z-10 text-center">
          <span
            className="inline-block text-[80px] md:text-[100px] leading-none mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#e8e2d9",
            }}
          >
            &ldquo;
          </span>
          <blockquote
            className="-mt-8 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.6] max-w-3xl mx-auto mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1c1c2e",
            }}
          >
            Our priority is not just customer satisfaction — but genuine{" "}
            <em style={{ color: "#c9a84c" }}>customer happiness.</em>
          </blockquote>
          <p
            className="text-sm mb-10"
            style={{ color: "#7a7a8e" }}
          >
            — Space Age Group, Vadodara. Since 1992.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-white text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
            style={{ background: "#c9a84c" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#b8952a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#c9a84c")
            }
          >
            Explore Our Projects
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

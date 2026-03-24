"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PageHero from "@/components/PageHero/PageHero";

// ─── Palette ──────────────────────────────────────────────────────────────────
// Charcoal: #1c1c2e  |  Soft-gold: #c9a84c  |  Off-white: #faf9f6

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILTERS = ["All", "Residential", "Commercial", "Township"] as const;
type Filter = (typeof FILTERS)[number];

type Status = "Ongoing" | "Ready to Move" | "Upcoming";

const ALL_PROJECTS: {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  location: string;
  image: string;
  status: Status;
}[] = [
  {
    id: 1,
    slug: "space-age-residency",
    name: "Space Age Residency",
    subtitle: "Luxury 3BHK Apartments",
    category: "Residential",
    location: "Alkapuri, Vadodara",
    image: "/images/project-1.jpg",
    status: "Ongoing",
  },
  {
    id: 2,
    slug: "siddhi-heights",
    name: "Siddhi Heights",
    subtitle: "Premium 2 & 3BHK Apartments",
    category: "Residential",
    location: "Alkapuri, Vadodara",
    image: "/images/test1.jpg",
    status: "Ready to Move",
  },
  {
    id: 3,
    slug: "space-age-commerce",
    name: "Space Age Commerce",
    subtitle: "Grade-A Office & Retail Spaces",
    category: "Commercial",
    location: "Manjalpur, Vadodara",
    image: "/images/test2.jpg",
    status: "Ongoing",
  },
  {
    id: 4,
    slug: "greenwood-township",
    name: "Greenwood Township",
    subtitle: "Integrated Self-Sufficient Township",
    category: "Township",
    location: "Waghodia Road, Vadodara",
    image: "/images/test3.jpeg",
    status: "Upcoming",
  },
  {
    id: 5,
    slug: "crown-residences",
    name: "The Crown Residences",
    subtitle: "Ultra-Luxury 4BHK Penthouses",
    category: "Residential",
    location: "Akota, Vadodara",
    image: "/images/project-1.jpg",
    status: "Ongoing",
  },
  {
    id: 6,
    slug: "riverside-villas",
    name: "Riverside Villas",
    subtitle: "Exclusive Independent Villas",
    category: "Township",
    location: "Vishwamitri, Vadodara",
    image: "/images/test1.jpg",
    status: "Ready to Move",
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { bg: string; text: string; dot: string }> =
  {
    Ongoing: { bg: "rgba(201,168,76,0.12)", text: "#96720f", dot: "#c9a84c" },
    "Ready to Move": {
      bg: "rgba(16,185,129,0.10)",
      text: "#065f46",
      dot: "#10b981",
    },
    Upcoming: { bg: "rgba(100,116,139,0.10)", text: "#475569", dot: "#94a3b8" },
  };

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase"
      style={{
        background: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.dot}40`,
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: cfg.dot }}
      />
      {status}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const gridRef = useScrollReveal<HTMLElement>();

  const filteredProjects =
    activeFilter === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          PAGE HERO
      ════════════════════════════════════════════════════════════════════ */}
      <PageHero
        title="Our Projects"
        subtitle="Every project a landmark — crafted with precision, purpose, and an enduring sense of quality."
        image="/images/project-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
        ]}
      />

      {/* ════════════════════════════════════════════════════════════════════
          PROJECTS GRID
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="projects-grid"
        ref={gridRef}
        className="py-24 md:py-32"
        style={{ background: "#faf9f6" }}
      >
        <div className="section-container">
          {/* ── Section Header ── */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
                <span
                  className="text-[10px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: "#c9a84c" }}
                >
                  Our Portfolio
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold leading-[1.12]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1c1c2e",
                }}
              >
                Crafted with
                <br />
                <em className="not-italic" style={{ color: "#c9a84c" }}>
                  Distinction.
                </em>
              </h2>
            </div>
            <p
              className="reveal-right md:max-w-sm text-base leading-relaxed"
              style={{ color: "#4a4a5e" }}
            >
              Each project is a testament to our uncompromising standards —
              where architectural vision meets meticulous craftsmanship and
              enduring quality.
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-12 reveal-up"
            style={{ background: "rgba(201,168,76,0.2)" }}
          />

          {/* ── Filter Tabs ── */}
          <div className="flex flex-wrap gap-2 mb-14 reveal-up">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-6 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-250"
                style={
                  activeFilter === filter
                    ? {
                        background: "#1c1c2e",
                        color: "#ffffff",
                        border: "1px solid #1c1c2e",
                      }
                    : {
                        background: "transparent",
                        color: "#4a4a5e",
                        border: "1px solid #d5cfc8",
                      }
                }
                onMouseEnter={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.color = "#c9a84c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter) {
                    e.currentTarget.style.borderColor = "#d5cfc8";
                    e.currentTarget.style.color = "#4a4a5e";
                  }
                }}
              >
                {filter}
              </button>
            ))}
            <span
              className="ml-auto self-center text-[12px] hidden sm:block"
              style={{ color: "#9090a0" }}
            >
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* ── Project Cards Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`reveal-up delay-${Math.min((i % 3) * 100 + 100, 300)} group block overflow-hidden project-card`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8e2d9",
                  transition: "border-color 0.4s, box-shadow 0.4s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.45)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px -12px rgba(28,28,46,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e2d9";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover project-card-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(28,28,46,0.35) 0%, transparent 50%)",
                    }}
                  />
                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    <StatusBadge status={project.status} />
                  </div>
                  {/* Category chip on hover */}
                  <div className="absolute bottom-4 left-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span
                      className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 text-white"
                      style={{ background: "rgba(201,168,76,0.9)" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-7 pt-6 pb-7">
                  <h3
                    className="text-xl font-bold leading-snug mb-1.5 transition-colors duration-300 group-hover:text-[#c9a84c]"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#1c1c2e",
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-sm mb-5" style={{ color: "#4a4a5e" }}>
                    {project.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="flex items-center gap-1.5 text-[12px]"
                      style={{ color: "#7a7a8e" }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {project.location}
                    </span>
                    {/* Arrow */}
                    <span
                      className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                      style={{ border: "1px solid #e0d8ce", color: "#7a7a8e" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#c9a84c";
                        e.currentTarget.style.borderColor = "#c9a84c";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "#e0d8ce";
                        e.currentTarget.style.color = "#7a7a8e";
                      }}
                    >
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
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p style={{ color: "#7a7a8e" }}>
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BOTTOM CTA STRIP
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#1c1c2e" }}>
        <div className="section-container text-center">
          <p
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: "#c9a84c" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Interested in a Project?
          </h2>
          <p
            className="text-base max-w-lg mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Our team is ready to walk you through every detail — site visits,
            floor plans, and flexible payment plans.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-white text-[12px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
            style={{ background: "#c9a84c" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#b8952a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#c9a84c")
            }
          >
            Schedule a Site Visit
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

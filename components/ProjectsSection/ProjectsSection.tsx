"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    name: "Space Age Residency",
    category: "Residential Township",
    location: "Vadodara, Gujarat",
    year: "2023",
    src: "/images/project-1.jpg",
  },
  {
    id: 2,
    name: "Siddhi Heights",
    category: "Premium Apartments",
    location: "Alkapuri, Vadodara",
    year: "2022",
    src: "/images/project-1.jpg",
  },
  {
    id: 3,
    name: "Space Age Commerce",
    category: "Commercial Hub",
    location: "Manjalpur, Vadodara",
    year: "2024",
    src: "/images/project-1.jpg",
  },
  {
    id: 4,
    name: "Greenwood Township",
    category: "Integrated Township",
    location: "Waghodia Road, Vadodara",
    year: "2021",
    src: "/images/project-1.jpg",
  },
];

export default function ProjectsSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="projects" className="w-full bg-white py-24 md:py-32">
      <div className="section-container">
        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="reveal-left">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#0d9488]" />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0d9488]">
                Our Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
              Landmark projects
              <br />
              <span className="text-[#0d9488]">crafted with pride.</span>
            </h2>
          </div>
          <div className="reveal-right md:max-w-sm">
            <p className="text-base text-gray-500 leading-relaxed">
              From luxurious residences to thriving commercial spaces, every
              project reflects our commitment to uncompromising quality.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-16" />

        {/* ── Projects grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.id}
              href="/projects"
              className={`reveal-up delay-${(i + 1) * 100} group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0d9488]/20 transition-all duration-300`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={project.src}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/30" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase bg-white text-[#0d9488] px-3 py-1.5 rounded-md shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="px-7 py-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-[#0d9488] transition-colors duration-200">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1.5 flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                    <span className="text-gray-300">·</span>
                    {project.year}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#0d9488] group-hover:text-[#0d9488] group-hover:bg-[#0d9488]/5 transition-all duration-200 flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="reveal-up delay-500 flex justify-center mt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#0d9488] hover:bg-[#0f766e] transition-colors duration-200"
          >
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

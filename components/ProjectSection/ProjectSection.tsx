// components/ProjectsSection/ProjectsSection.tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    name: "Fakhri Colony",
    category: "Residential Township",
    location: "Open Plot Scheme, Seguwada, Dabhoi Road",
    year: "2023",
    size: "25 Acres",
    units: "450+",
    src: "/images/fakhri-colony.png",
    featured: true,
  },
  {
    id: 2,
    name: "Bhagyalakshmi Riverfront",
    category: "Premium Apartments",
    location: "Weekend Home and Resort Savli-Timba Road, Near Manjusar GIDC",
    year: "2022",
    size: "5 Acres",
    units: "120+",
    src: "/images/Blaxmi.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Burhani Plaza",
    category: "Commercial Hub",
    location: "Shops & 2/3 bhk spacious apartments Ajwa road, Vadodara",
    year: "2024",
    size: "8 Acres",
    units: "80+",
    src: "/images/Burhani-plaza.png",
    featured: true,
  },
  {
    id: 4,
    name: "Aambawadi Sangma",
    category: "Integrated Township",
    location: "Affordable 1, 2 Bhk Apartments Sangma, Padra, Vadodara",
    year: "2021",
    size: "35 Acres",
    units: "600+",
    src: "/images/Ambawadi.jpg",
    featured: false,
  },
];

export default function ProjectsSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  // First project is the large featured card; rest go in the 3-col row
  const [featuredProject, ...restProjects] = PROJECTS;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f7f5f2] py-28 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium mb-4 block">
            Our Portfolio
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6"
          >
            Landmark Projects,
            <br />
            Crafted with Pride
          </h2>
          <p className="text-base text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed">
            Each development tells a story of excellence, innovation, and unwavering
            commitment to quality that defines the SpaceAge standard.
          </p>
        </div>

        {/* Row 1: Large featured card — full width, aspect 21/9 */}
        <div className="mb-6">
          <Link
            href={`/projects/${featuredProject.id}`}
            className="group block relative overflow-hidden rounded-none bg-white"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "21/9" }}>
              <Image
                src={featuredProject.src}
                alt={featuredProject.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
              />
              {/* Featured label */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-xs uppercase tracking-widest text-[#c9a84c] border border-[#c9a84c] px-3 py-1 bg-[#0f0f0f]/60">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-6 border-t-2 border-[#c9a84c] bg-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium">
                {featuredProject.category}
              </span>
              <h3
                className="text-xl font-bold text-[#1a1a1a] mt-1"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                {featuredProject.name}
              </h3>
              <div className="text-sm text-[#9a9a9a] mt-2 flex gap-4">
                <span>{featuredProject.location}</span>
                <span>{featuredProject.year}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Row 2: 3 smaller cards — grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block relative overflow-hidden rounded-none bg-white"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={project.src}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 border-t-2 border-[#c9a84c] bg-white">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-[#1a1a1a] mt-1">
                  {project.name}
                </h3>
                <div className="text-sm text-[#9a9a9a] mt-2 flex gap-4">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA — underlined text link */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="text-sm font-medium text-[#1a1a1a] underline underline-offset-4 inline-flex items-center gap-2 hover:text-[#c9a84c] transition-colors duration-200"
          >
            Explore All Projects
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

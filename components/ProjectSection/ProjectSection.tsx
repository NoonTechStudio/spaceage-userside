// components/ProjectsSection/ProjectsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import Link from "next/link";

interface MediaItem {
  url: string;
  isMainImage?: boolean;
  alt?: string;
}

interface Project {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  address?: string;
  estYear?: string;
  featured?: boolean;
  heroImages: MediaItem[];
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const DEFAULT_PROJECTS: Project[] = [
  {
    _id: "1",
    title: "Fakhri Colony",
    category: "Residential Township",
    address: "Open Plot Scheme, Seguwada, Dabhoi Road",
    estYear: "2023",
    featured: true,
    slug: "fakhri-colony",
    heroImages: [{ url: "/images/fakhri-colony.png" }],
  },
  {
    _id: "2",
    title: "Bhagyalakshmi Riverfront",
    category: "Premium Apartments",
    address: "Weekend Home and Resort Savli-Timba Road, Near Manjusar GIDC",
    estYear: "2022",
    featured: false,
    slug: "bhagyalakshmi-riverfront",
    heroImages: [{ url: "/images/Blaxmi.jpg" }],
  },
  {
    _id: "3",
    title: "Burhani Plaza",
    category: "Commercial Hub",
    address: "Shops & 2/3 bhk spacious apartments Ajwa road, Vadodara",
    estYear: "2024",
    featured: true,
    slug: "burhani-plaza",
    heroImages: [{ url: "/images/Burhani-plaza.png" }],
  },
  {
    _id: "4",
    title: "Aambawadi Sangma",
    category: "Integrated Township",
    address: "Affordable 1, 2 Bhk Apartments Sangma, Padra, Vadodara",
    estYear: "2021",
    featured: false,
    slug: "aambawadi-sangma",
    heroImages: [{ url: "/images/Ambawadi.jpg" }],
  },
];

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    setUseMock(localStorage.getItem("use_mock_data") === "true");
  }, []);

  const activeProjects = !useMock && projects && projects.length > 0 ? projects.slice(0, 4) : DEFAULT_PROJECTS;

  // Find the featured project (marked true)
  let featuredIndex = activeProjects.findIndex((p) => p.featured);
  if (featuredIndex === -1) {
    featuredIndex = 0; // fallback to first
  }

  const featuredProject = activeProjects[featuredIndex];
  const restProjects = activeProjects.filter((_, index) => index !== featuredIndex).slice(0, 3);

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
        {featuredProject && (
          <div className="mb-6">
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="group block relative overflow-hidden rounded-none bg-white"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "21/9" }}>
                <Image
                  src={featuredProject.heroImages?.find(img => img.isMainImage)?.url || featuredProject.heroImages?.[0]?.url || "/images/project-1.jpg"}
                  alt={featuredProject.title}
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
                  {featuredProject.category || "Project"}
                </span>
                <h3
                  className="text-xl font-bold text-[#1a1a1a] mt-1"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  }}
                >
                  {featuredProject.title}
                </h3>
                <div className="text-sm text-[#9a9a9a] mt-2 flex gap-4">
                  <span>{featuredProject.address}</span>
                  <span>{featuredProject.estYear}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Row 2: 3 smaller cards — grid-cols-3 */}
        {restProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restProjects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="group block relative overflow-hidden rounded-none bg-white"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={project.heroImages?.find(img => img.isMainImage)?.url || project.heroImages?.[0]?.url || "/images/project-1.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 border-t-2 border-[#c9a84c] bg-white">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium">
                    {project.category || "Project"}
                  </span>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mt-1">
                    {project.title}
                  </h3>
                  <div className="text-sm text-[#9a9a9a] mt-2 flex gap-4">
                    <span>{project.address}</span>
                    <span>{project.estYear}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

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


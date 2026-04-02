// app/projects/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

type Filter = "All" | "Residential" | "Commercial" | "Township" | "Luxury";
type Status = "Completed" | "Ongoing" | "Upcoming";

interface Project {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  category: Filter;
  location: string;
  image: string;
  status: Status;
  year: string;
  area: string;
  units: number;
  featured?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "space-age-residency",
    name: "Space Age Residency",
    subtitle: "Luxury 3BHK Apartments with Premium Amenities",
    category: "Residential",
    location: "Alkapuri, Vadodara",
    image: "/images/project-1.jpg",
    status: "Ongoing",
    year: "2024",
    area: "2.5 Acres",
    units: 128,
    featured: true,
  },
  {
    id: 2,
    slug: "siddhi-heights",
    name: "Siddhi Heights",
    subtitle: "Premium 2 & 3BHK Apartments",
    category: "Residential",
    location: "Alkapuri, Vadodara",
    image: "/images/test1.jpg",
    status: "Completed",
    year: "2022",
    area: "1.8 Acres",
    units: 96,
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
    year: "2025",
    area: "3.2 Acres",
    units: 45,
    featured: true,
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
    year: "2026",
    area: "35 Acres",
    units: 850,
  },
  {
    id: 5,
    slug: "crown-residences",
    name: "The Crown Residences",
    subtitle: "Ultra-Luxury 4BHK Penthouses",
    category: "Luxury",
    location: "Akota, Vadodara",
    image: "/images/project-1.jpg",
    status: "Ongoing",
    year: "2024",
    area: "1.2 Acres",
    units: 48,
    featured: true,
  },
  {
    id: 6,
    slug: "riverside-villas",
    name: "Riverside Villas",
    subtitle: "Exclusive Independent Villas",
    category: "Luxury",
    location: "Vishwamitri, Vadodara",
    image: "/images/test1.jpg",
    status: "Completed",
    year: "2023",
    area: "5 Acres",
    units: 32,
  },
  {
    id: 7,
    slug: "business-park",
    name: "Space Age Business Park",
    subtitle: "Modern Corporate Offices",
    category: "Commercial",
    location: "Gotri, Vadodara",
    image: "/images/test2.jpg",
    status: "Completed",
    year: "2021",
    area: "4.5 Acres",
    units: 120,
  },
  {
    id: 8,
    slug: "luxury-homes",
    name: "Palm Grove Enclave",
    subtitle: "Premium Residential Community",
    category: "Residential",
    location: "New VIP Road, Vadodara",
    image: "/images/test3.jpeg",
    status: "Ongoing",
    year: "2025",
    area: "8 Acres",
    units: 240,
  },
  {
    id: 9,
    slug: "retail-hub",
    name: "Space Age Retail Hub",
    subtitle: "High-Street Retail Destination",
    category: "Commercial",
    location: "Manjalpur, Vadodara",
    image: "/images/project-1.jpg",
    status: "Upcoming",
    year: "2026",
    area: "2.8 Acres",
    units: 65,
  },
];

const FILTERS: Filter[] = ["All", "Residential", "Commercial", "Township", "Luxury"];

const STATUS_COLORS = {
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Ongoing: "bg-amber-50 text-amber-600 border-amber-100",
  Upcoming: "bg-gray-50 text-gray-500 border-gray-100",
};

const LOCATION_PINS = [
  { id: 1, name: "Space Age Residency", location: "Alkapuri", top: "38%", left: "42%" },
  { id: 2, name: "Siddhi Heights", location: "Alkapuri", top: "42%", left: "44%" },
  { id: 3, name: "Space Age Commerce", location: "Manjalpur", top: "58%", left: "52%" },
  { id: 4, name: "Greenwood Township", location: "Waghodia Rd", top: "62%", left: "68%" },
  { id: 5, name: "The Crown Residences", location: "Akota", top: "45%", left: "36%" },
  { id: 6, name: "Riverside Villas", location: "Vishwamitri", top: "34%", left: "50%" },
  { id: 7, name: "Space Age Business Park", location: "Gotri", top: "28%", left: "44%" },
  { id: 8, name: "Palm Grove Enclave", location: "New VIP Road", top: "22%", left: "55%" },
  { id: 9, name: "Space Age Retail Hub", location: "Manjalpur", top: "60%", left: "54%" },
];

// ─── Components ─────────────────────────────────────────────────────────────

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

function ProjectCard({ project, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white transition-all duration-300"
      style={{
        boxShadow: isHovered ? "0 20px 35px -12px rgba(0,0,0,0.1)" : "0 1px 2px rgba(0,0,0,0.02)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: featured ? "21/9" : "4/3" }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={featured ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
        {project.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] uppercase tracking-wider text-[#c9a84c] border border-[#c9a84c] px-2 py-1 bg-white font-medium">
              Featured
            </span>
          </div>
        )}
        <div className={`absolute top-4 right-4 z-10`}>
          <span className={`text-[10px] uppercase tracking-wider px-2 py-1 border font-medium ${STATUS_COLORS[project.status]}`}>
            {project.status}
          </span>
        </div>
      </div>
      <div className="p-6 border-t border-[#c9a84c] bg-white">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mt-1 font-serif">{project.name}</h3>
        <div className="text-sm text-gray-400 mt-2 flex items-center gap-4">
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {project.area} · {project.units} Units
        </div>
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-gray-900 group-hover:text-[#c9a84c] transition-colors">
          View Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedStatus, setSelectedStatus] = useState<Status | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesStatus && matchesSearch;
  });

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const stats = {
    total: PROJECTS.length,
    residential: PROJECTS.filter((p) => p.category === "Residential").length,
    commercial: PROJECTS.filter((p) => p.category === "Commercial").length,
    luxury: PROJECTS.filter((p) => p.category === "Luxury").length,
  };

  const isFiltered = activeFilter !== "All" || selectedStatus !== "All" || searchQuery !== "";
  const featuredCard = featuredProjects[0];
  const remainingProjects = isFiltered
    ? filteredProjects
    : filteredProjects.filter((p) => p.id !== featuredCard?.id);

  return (
    <LayoutWrapper>
      <div className="bg-white min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative w-full bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
                <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-[#c9a84c]">Projects</span>
              </nav>

              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">
                Our Portfolio
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                Spaces That
                <br />
                <span className="italic text-[#c9a84c]">Define Living.</span>
              </h1>
              <div className="w-12 h-px bg-[#c9a84c] mb-8" />
              <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                Discover spaces that redefine luxury, comfort, and innovation — each project a testament
                to our commitment to excellence in Vadodara's real estate landscape.
              </p>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ───────────────────────────────────────────────────── */}
        <div className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {[
                { value: `${stats.total}+`, label: "Total Projects" },
                { value: `${stats.residential}+`, label: "Residential" },
                { value: `${stats.commercial}+`, label: "Commercial" },
                { value: `${stats.luxury}+`, label: "Luxury Projects" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`px-8 py-10 text-center ${idx < 3 ? "border-r border-gray-200" : ""}`}
                >
                  <div className="text-4xl font-bold text-gray-900 font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filter Bar ──────────────────────────────────────────────────── */}
        <div className="border-b border-gray-100 sticky top-[72px] bg-white z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-6 overflow-x-auto py-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-sm font-medium py-3 whitespace-nowrap transition-all duration-200 ${activeFilter === filter
                    ? "text-gray-900 border-b-2 border-[#c9a84c]"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {filter === "All" ? "All Projects" : filter}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-4 pl-4 shrink-0">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as Status | "All")}
                  className="text-xs text-gray-500 border-none bg-transparent focus:outline-none cursor-pointer py-3"
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
                <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${viewMode === "grid" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${viewMode === "list" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">
                  {filteredProjects.length} Projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Projects Grid ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search projects by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 pl-11 bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors text-gray-900 placeholder:text-gray-400"
                />
                <svg className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-sm text-gray-400 py-20 text-center">
                No projects found in this category.
              </div>
            ) : viewMode === "list" ? (
              <div className="space-y-4">
                {filteredProjects.map((project, idx) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group flex gap-6 bg-white border border-gray-100 p-5 hover:border-[#c9a84c] transition-all duration-200 hover:shadow-md"
                  >
                    <div className="relative w-32 h-24 shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="128px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold">
                            {project.category}
                          </span>
                          <h3 className="text-base font-bold text-gray-900 mt-0.5">{project.name}</h3>
                          <p className="text-xs text-gray-400 mt-1">{project.location} · {project.year} · {project.area} · {project.units} Units</p>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-1 border font-medium ${STATUS_COLORS[project.status]}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {!isFiltered && featuredCard && (
                  <ProjectCard project={featuredCard} index={0} featured={true} />
                )}
                {remainingProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingProjects.map((project, idx) => (
                      <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Map / Location View ───────────────────────────────────────────── */}
        <section className="py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                Across Vadodara
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Where We've Built
              </h2>
              <div className="w-12 h-px bg-[#c9a84c] mx-auto mt-5" />
            </div>

            <div className="grid lg:grid-cols-[3fr_2fr] gap-0 border border-gray-200 bg-white">
              <div className="relative overflow-hidden min-h-[400px] lg:min-h-[500px] bg-gray-50" style={{ borderRight: "1px solid #f0f0f0" }}>
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    opacity: 0.3,
                  }}
                />
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-xs uppercase tracking-[0.22em] text-gray-400 font-medium">
                    Vadodara, Gujarat
                  </span>
                </div>
                {LOCATION_PINS.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => setActiveLocation(activeLocation === pin.id ? null : pin.id)}
                    className="absolute z-10 flex flex-col items-center"
                    style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -100%)" }}
                    aria-label={pin.name}
                  >
                    <div
                      className="transition-all duration-200"
                      style={{
                        width: activeLocation === pin.id ? "12px" : "8px",
                        height: activeLocation === pin.id ? "12px" : "8px",
                        borderRadius: "50%",
                        backgroundColor: activeLocation === pin.id ? "#1a1a1a" : "#c9a84c",
                        boxShadow: activeLocation === pin.id
                          ? "0 0 0 3px rgba(26,26,26,0.1)"
                          : "0 0 0 2px rgba(201,168,76,0.2)",
                      }}
                    />
                    {activeLocation === pin.id && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-medium px-2 py-1 whitespace-nowrap">
                        {pin.location}
                      </div>
                    )}
                  </button>
                ))}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Projects</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-900" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Selected</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-y-auto max-h-[500px]">
                {LOCATION_PINS.map((pin, idx) => (
                  <button
                    key={pin.id}
                    onClick={() => setActiveLocation(activeLocation === pin.id ? null : pin.id)}
                    className={`w-full flex items-start gap-4 p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 text-left ${activeLocation === pin.id ? "bg-gray-50 border-l-2 border-l-[#c9a84c]" : ""
                      }`}
                  >
                    <span className="text-xs font-mono text-[#c9a84c] w-6 shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{pin.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{pin.location}</p>
                      <p className="text-xs text-[#c9a84c] uppercase tracking-wider mt-1">
                        {PROJECTS.find((p) => p.id === pin.id)?.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────────────── */}
        <section className="bg-gray-900 border-t border-[#c9a84c]">
          <div className="max-w-2xl mx-auto text-center py-28 px-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-6 block">
              Let's Connect
            </span>
            <h2 className="text-5xl font-serif font-bold text-white leading-tight">
              Interested in a Project?
            </h2>
            <p className="text-base text-gray-400 leading-relaxed mt-5 max-w-lg mx-auto">
              Schedule a site visit or consultation with our experts to experience
              our projects firsthand — and find the space that matches your vision.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a84c] text-gray-900 font-semibold text-sm hover:bg-[#b8962e] transition-colors duration-200"
              >
                Schedule a Site Visit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-700 text-white text-sm font-medium hover:border-gray-500 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </LayoutWrapper>
  );
}
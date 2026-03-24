"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Ongoing" | "Ready to Move" | "Upcoming";

interface SpecItem {
  icon: string;
  label: string;
  value: string;
}

interface FloorPlan {
  name: string;
  area: string;
  image: string;
}

interface ProjectData {
  name: string;
  headline: string;
  status: Status;
  location: string;
  area: string;
  possession: string;
  type: string;
  images: string[];
  intro: string;
  floorPlans: FloorPlan[];
  masterPlan: string;
  commonSpecs: SpecItem[];
  commercialSpecs: SpecItem[];
  amenities: string[];
  gallery: string[];
  youtubeId: string;
  brochureUrl: string;
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const PROJECTS_DATA: Record<string, ProjectData> = {
  "space-age-residency": {
    name: "Space Age Residency",
    headline: "Where Every Detail Speaks of Luxury",
    status: "Ongoing",
    location: "Alkapuri, Vadodara",
    area: "1,200 – 2,800 sq.ft.",
    possession: "December 2025",
    type: "Residential",
    images: [
      "/images/project-1.jpg",
      "/images/test1.jpg",
      "/images/test2.jpg",
      "/images/test3.jpeg",
    ],
    intro:
      "Space Age Residency is a thoughtfully crafted luxury residential development located in the vibrant heart of Alkapuri, Vadodara. Conceived for the discerning few, this landmark project merges contemporary architectural language with timeless materials — creating homes that are as enduring as they are beautiful. Every apartment is designed to maximise natural light, cross-ventilation, and panoramic views, while a curated suite of amenities transforms everyday living into a resort-like experience.",
    floorPlans: [
      { name: "2 BHK — Type A", area: "1,200 sq.ft.", image: "/images/test1.jpg" },
      { name: "3 BHK — Type B", area: "1,800 sq.ft.", image: "/images/test2.jpg" },
      { name: "3 BHK Premium", area: "2,200 sq.ft.", image: "/images/test3.jpeg" },
      { name: "4 BHK Penthouse", area: "2,800 sq.ft.", image: "/images/project-1.jpg" },
    ],
    masterPlan: "/images/test2.jpg",
    commonSpecs: [
      { icon: "structure", label: "Structure", value: "Earthquake-Resistant RCC Framed Structure" },
      { icon: "wall", label: "External Walls", value: "AAC Blocks with Textured Paint Finish" },
      { icon: "plaster", label: "Internal Plaster", value: "Smooth Gypsum Plaster, OBD Paint" },
      { icon: "floor", label: "Flooring", value: "Imported Vitrified Tiles (800×800 mm)" },
      { icon: "door", label: "Main Door", value: "Engineered Teak Frame, Laminate Flush Shutter" },
      { icon: "window", label: "Windows", value: "Powder-Coated Aluminium Sliding with MS Grill" },
      { icon: "elec", label: "Electrical", value: "ISI Modular Switches, Concealed Copper Wiring" },
      { icon: "plumbing", label: "Plumbing", value: "CPVC Pipes, Chrome-Plated CP Fittings" },
    ],
    commercialSpecs: [
      { icon: "parking", label: "Parking", value: "Dedicated Stilt + Basement Covered Parking" },
      { icon: "lift", label: "Lifts", value: "2 Passenger + 1 Service Elevator (Otis / Kone)" },
      { icon: "power", label: "Power Backup", value: "100% DG Backup for Lifts & Common Areas" },
      { icon: "security", label: "Security", value: "24×7 CCTV Surveillance & Video Door Phone" },
      { icon: "sewage", label: "Sewage Treatment", value: "In-House STP — 100 KLD Capacity" },
      { icon: "water", label: "Water Supply", value: "24-Hour Municipal + Overhead Borewell" },
      { icon: "fire", label: "Fire Safety", value: "Fire Hydrant System & Sprinklers, FM200" },
      { icon: "internet", label: "Connectivity", value: "Pre-wired Conduits for Fibre Optic Internet" },
    ],
    amenities: [
      "Swimming Pool",
      "Gymnasium",
      "Clubhouse",
      "Kids Play Area",
      "Landscaped Garden",
      "Jogging Track",
      "Indoor Games Room",
      "Party Hall",
      "Yoga & Meditation Deck",
      "24×7 Security",
      "Power Backup",
      "Covered Parking",
    ],
    gallery: [
      "/images/project-1.jpg",
      "/images/test1.jpg",
      "/images/test2.jpg",
      "/images/test3.jpeg",
      "/images/project-1.jpg",
      "/images/test2.jpg",
    ],
    youtubeId: "V8zrPL0HMNE",
    brochureUrl: "#",
  },
};

// Fallback for unrecognised slugs
const FALLBACK: ProjectData = PROJECTS_DATA["space-age-residency"];

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function SpecIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    structure: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
    wall: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="4" rx="1" /><rect x="2" y="10" width="20" height="4" rx="1" /><rect x="2" y="16" width="20" height="4" rx="1" />
      </svg>
    ),
    plaster: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    floor: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16M4 4h16v12H4z" /><path d="M4 10h16M12 4v12" />
      </svg>
    ),
    door: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 4H6v16h12V4h-5zM14 12h.01" />
      </svg>
    ),
    window: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    elec: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    plumbing: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v16a2 2 0 0 0 4 0V9h6v10a2 2 0 0 0 4 0V3" /><path d="M9 9H5" />
      </svg>
    ),
    parking: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M9 15V9h4a3 3 0 0 1 0 6H9" />
      </svg>
    ),
    lift: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M12 6l4 4-4 4M12 18l-4-4 4-4" />
      </svg>
    ),
    power: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    security: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    sewage: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5c0 2.5 2.5 5 5 8 2.5-3 5-5.5 5-8a5 5 0 0 0-5-5z" />
      </svg>
    ),
    water: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    fire: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c0 1.38-1.12 2.5-2.5 2.5" /><path d="M12 22a8 8 0 0 0 0-16 8 8 0 0 0-5.95 2.67C4.47 10.72 3 13.05 3 16a9 9 0 0 0 9 6z" />
      </svg>
    ),
    internet: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };
  return (
    <span className="text-[#c9a84c]">{icons[type] ?? icons["structure"]}</span>
  );
}

function AmenityIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    "Swimming Pool": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s2-3 5-3 5 6 8 6 5-3 5-3" /><path d="M2 17s2-3 5-3 5 6 8 6 5-3 5-3" /><path d="M12 3v6" /><path d="M8 5l4-2 4 2" />
      </svg>
    ),
    "Gymnasium": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v16M18 4v16M4 8h2M18 8h2M4 16h2M18 16h2M8 12h8" />
      </svg>
    ),
    "Clubhouse": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    "Kids Play Area": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" /><path d="M5 12h14M7 12V7.5L12 5l5 2.5V12" /><path d="M7 12l-2 8M17 12l2 8M10 20h4" />
      </svg>
    ),
    "Landscaped Garden": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 7 3 3 5c0 4 4 7 9 7M12 12c0-5 5-9 9-7 0 4-4 7-9 7" />
      </svg>
    ),
    "Jogging Track": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="4" r="2" /><path d="M14 9l-2 3 3 3-2 5" /><path d="M8 12l2-3 4 2" /><path d="M3 20c1-5 5-8 9-8s8 3 9 8" />
      </svg>
    ),
    "Indoor Games Room": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M8 12h2M9 11v2M15 12h.01M17 12h.01" />
      </svg>
    ),
    "Party Hall": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    "Yoga & Meditation Deck": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" /><path d="M12 7c-2.5 0-5 1.5-5 4 0 2 2 2 4 4s2 4 1 5" /><path d="M12 7c2.5 0 5 1.5 5 4 0 2-2 2-4 4s-2 4-1 5" />
      </svg>
    ),
    "24×7 Security": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    "Power Backup": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    "Covered Parking": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="7" width="22" height="11" rx="2" /><path d="M5 18v3M19 18v3M1 11h22" /><circle cx="7" cy="14.5" r="1.5" /><circle cx="17" cy="14.5" r="1.5" /><path d="M7 14.5h10" />
      </svg>
    ),
  };
  const fallback = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
    </svg>
  );
  return (
    <span className="text-[#c9a84c]">{icons[name] ?? fallback}</span>
  );
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { bg: string; text: string; dot: string }> = {
  Ongoing: { bg: "rgba(201,168,76,0.15)", text: "#96720f", dot: "#c9a84c" },
  "Ready to Move": { bg: "rgba(16,185,129,0.12)", text: "#065f46", dot: "#10b981" },
  Upcoming: { bg: "rgba(100,116,139,0.12)", text: "#475569", dot: "#94a3b8" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [zooming, setZooming] = useState(true);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setZooming(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setZooming(true)));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => goTo((current + 1) % images.length), 5500);
    return () => clearTimeout(t);
  }, [current, goTo, images.length]);

  return (
    <section className="relative w-full h-dvh min-h-[560px] overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src + i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <div className={`absolute inset-0 will-change-transform ${i === current && zooming ? "animate-zoom-out" : ""}`}>
            <Image src={src} alt={`Project view ${i + 1}`} fill priority={i === 0} sizes="100vw" className="object-cover object-center" />
          </div>
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] bg-black/50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[1] pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(5,5,15,0.85))" }} />

      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + images.length) % images.length)}
        aria-label="Previous image"
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % images.length)}
        aria-label="Next image"
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={{ width: i === current ? "32px" : "20px", height: "2px", background: i === current ? "#c9a84c" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 text-white/50 text-xs font-mono tabular-nums">
        {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </section>
  );
}

function Lightbox({
  images,
  activeIndex,
  onClose,
}: {
  images: FloorPlan[];
  activeIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(activeIndex);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((p) => (p - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(5,5,15,0.93)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={images[idx].image} alt={images[idx].name} fill className="object-contain" />
        <div className="absolute bottom-0 left-0 right-0 py-5 px-6 flex justify-between items-end" style={{ background: "linear-gradient(to top, rgba(5,5,15,0.8), transparent)" }}>
          <div>
            <p className="text-white font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{images[idx].name}</p>
            <p className="text-white/60 text-sm">{images[idx].area}</p>
          </div>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: i === idx ? "#c9a84c" : "rgba(255,255,255,0.3)" }} />
            ))}
          </div>
        </div>
        {/* Arrows */}
        <button onClick={() => setIdx((p) => (p - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={() => setIdx((p) => (p + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
      {/* Close */}
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";
  const project = PROJECTS_DATA[slug] ?? FALLBACK;

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeSpecTab, setActiveSpecTab] = useState<"common" | "commercial">("common");
  const [videoPlaying, setVideoPlaying] = useState(false);

  const introRef = useScrollReveal<HTMLElement>();
  const floorRef = useScrollReveal<HTMLElement>();
  const specRef = useScrollReveal<HTMLElement>();
  const amenRef = useScrollReveal<HTMLElement>();
  const gallRef = useScrollReveal<HTMLElement>();
  const tourRef = useScrollReveal<HTMLElement>();

  const statusCfg = STATUS_CONFIG[project.status];

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          STICKY DOWNLOAD BROCHURE BUTTON
      ═══════════════════════════════════════════════════ */}
      <a
        href={project.brochureUrl}
        className="fixed bottom-7 right-7 z-[100] flex items-center gap-2.5 text-white text-[11px] font-bold tracking-[0.12em] uppercase px-5 py-3.5 shadow-xl transition-all duration-300 group"
        style={{ background: "#c9a84c" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b8952a")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#c9a84c")}
      >
        <svg
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Brochure
      </a>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={project.floorPlans}
          activeIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      {/* ═══════════════════════════════════════════════════
          HERO CAROUSEL
      ═══════════════════════════════════════════════════ */}
      <HeroCarousel images={project.images} />

      {/* ═══════════════════════════════════════════════════
          PROJECT HEADER
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-14 md:py-16"
        style={{ background: "#1c1c2e" }}
      >
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Title + Headline */}
            <div>
              {/* Status Badge */}
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase mb-5"
                style={{
                  background: statusCfg.bg,
                  color: statusCfg.text,
                  border: `1px solid ${statusCfg.dot}50`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusCfg.dot }} />
                {project.status}
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.name}
              </h1>
              <p
                className="text-lg md:text-xl font-light italic"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                &ldquo;{project.headline}&rdquo;
              </p>
            </div>

            {/* Right: Back link */}
            <Link
              href="/projects"
              className="self-start md:self-center flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All Projects
            </Link>
          </div>

          {/* Quick Stats Bar */}
          <div
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {[
              { label: "Location", value: project.location },
              { label: "Area", value: project.area },
              { label: "Possession", value: project.possession },
              { label: "Type", value: project.type },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-6 py-5"
                style={{ background: "#1c1c2e" }}
              >
                <p
                  className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                  style={{ color: "#c9a84c" }}
                >
                  {stat.label}
                </p>
                <p className="text-white font-semibold text-sm">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          INTRODUCTION
      ═══════════════════════════════════════════════════ */}
      <section
        ref={introRef}
        className="py-24 md:py-28"
        style={{ background: "#faf9f6" }}
      >
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal-up flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ background: "#c9a84c" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                About the Project
              </span>
              <span className="w-8 h-px" style={{ background: "#c9a84c" }} />
            </div>
            <h2
              className="reveal-up text-3xl md:text-4xl font-bold mb-8"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1c1c2e" }}
            >
              A Vision of Refined Living
            </h2>
            <p
              className="reveal-up text-base md:text-lg leading-[1.9] text-center"
              style={{ color: "#4a4a5e" }}
            >
              {project.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FLOOR PLANS
      ═══════════════════════════════════════════════════ */}
      <section
        ref={floorRef}
        className="py-24 md:py-28"
        style={{ background: "#ffffff" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="reveal-left mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                Floor Plans
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1c1c2e" }}
            >
              Thoughtfully Designed Layouts
            </h2>
          </div>

          {/* Floor Plan Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {project.floorPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`reveal-up delay-${Math.min((i + 1) * 100, 400)} group cursor-pointer overflow-hidden`}
                style={{ border: "1px solid #e8e2d9", background: "#faf9f6" }}
                onClick={() => setLightboxIdx(i)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c9a84c"; e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(201,168,76,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d9"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image src={plan.image} alt={plan.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 25vw" />
                  {/* Hover zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(28,28,46,0.4)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#c9a84c" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="font-semibold text-sm" style={{ color: "#1c1c2e" }}>{plan.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#c9a84c" }}>{plan.area}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Master Layout Plan */}
          <div className="reveal-up">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                Master Layout Plan
              </span>
            </div>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "21/9", border: "1px solid #e8e2d9" }}
            >
              <Image
                src={project.masterPlan}
                alt="Master Layout Plan"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-center justify-between"
                style={{ background: "rgba(28,28,46,0.7)", backdropFilter: "blur(8px)" }}
              >
                <span className="text-white font-semibold text-sm">Site Master Plan — {project.name}</span>
                <span className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase">Not to Scale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SPECIFICATIONS
      ═══════════════════════════════════════════════════ */}
      <section
        ref={specRef}
        className="py-24 md:py-28"
        style={{ background: "#1c1c2e" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="reveal-left mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                Specifications
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Built to the Finest Standards
            </h2>
          </div>

          {/* Tabs */}
          <div className="reveal-up flex gap-0 mb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {(["common", "commercial"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSpecTab(tab)}
                className="px-6 py-3.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-250 relative"
                style={{
                  color: activeSpecTab === tab ? "#c9a84c" : "rgba(255,255,255,0.4)",
                  borderBottom: activeSpecTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                {tab === "common" ? "Common Specifications" : "Commercial Specifications"}
              </button>
            ))}
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {(activeSpecTab === "common" ? project.commonSpecs : project.commercialSpecs).map((spec) => (
              <div
                key={spec.label}
                className="reveal-up px-7 py-6 group"
                style={{ background: "#1c1c2e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
                  >
                    <SpecIcon type={spec.icon} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#c9a84c" }}>
                      {spec.label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {spec.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          AMENITIES
      ═══════════════════════════════════════════════════ */}
      <section
        ref={amenRef}
        className="py-24 md:py-28"
        style={{ background: "#faf9f6" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                  Amenities
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#1c1c2e" }}
              >
                A Lifestyle Crafted for the Best
              </h2>
            </div>
            <p className="reveal-right md:max-w-xs text-sm leading-relaxed" style={{ color: "#4a4a5e" }}>
              Every amenity is curated to elevate daily living — from energising wellness spaces to vibrant social zones.
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {project.amenities.map((amenity, i) => (
              <div
                key={amenity}
                className={`reveal-up delay-${Math.min((i % 6) * 50 + 50, 300)} flex flex-col items-center text-center py-7 px-4 group transition-all duration-300`}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8e2d9",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c9a84c";
                  e.currentTarget.style.background = "rgba(201,168,76,0.04)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px -8px rgba(201,168,76,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e2d9";
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="mb-3">
                  <AmenityIcon name={amenity} />
                </div>
                <p className="text-xs font-semibold leading-snug text-center" style={{ color: "#1c1c2e" }}>
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SAMPLE HOUSE GALLERY
      ═══════════════════════════════════════════════════ */}
      <section
        ref={gallRef}
        className="py-24 md:py-28"
        style={{ background: "#ffffff" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="reveal-left mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px" style={{ background: "#c9a84c" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                Gallery
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1c1c2e" }}
            >
              Sample House — A Glimpse Within
            </h2>
          </div>

          {/* Masonry Grid */}
          <div
            className="reveal-up"
            style={{
              columnCount: 3,
              columnGap: "16px",
            }}
          >
            {project.gallery.map((src, i) => (
              <div
                key={src + i}
                className="overflow-hidden group mb-4 cursor-pointer"
                style={{
                  breakInside: "avoid",
                  border: "1px solid #e8e2d9",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c9a84c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e8e2d9";
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "16/10" : "1/1" }}
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(28,28,46,0.35)" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#c9a84c" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          VIRTUAL TOUR
      ═══════════════════════════════════════════════════ */}
      <section
        ref={tourRef}
        className="py-24 md:py-28"
        style={{ background: "#10101c" }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="reveal-up text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: "#c9a84c" }} />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                Virtual Tour
              </span>
              <span className="w-8 h-px" style={{ background: "#c9a84c" }} />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Experience It Before You Walk In
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              Take a cinematic walkthrough of {project.name} from anywhere in the world.
            </p>
          </div>

          {/* YouTube Embed with Custom Overlay */}
          <div
            className="reveal-up relative max-w-4xl mx-auto overflow-hidden"
            style={{ aspectRatio: "16/9", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            {!videoPlaying ? (
              <>
                {/* Thumbnail */}
                <Image
                  src={project.images[0]}
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0" style={{ background: "rgba(10,10,20,0.55)" }} />
                {/* Gold play button */}
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 group cursor-pointer"
                  aria-label="Play virtual tour"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "#c9a84c",
                      boxShadow: "0 0 0 10px rgba(201,168,76,0.2), 0 0 0 20px rgba(201,168,76,0.08)",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="white"
                      style={{ marginLeft: "4px" }}
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="text-white text-sm font-semibold tracking-widest uppercase">
                    Play Virtual Tour
                  </span>
                </button>

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-8 py-4"
                  style={{ background: "linear-gradient(to top, rgba(10,10,20,0.8), transparent)" }}
                >
                  <p className="text-white/70 text-xs">
                    {project.name} — Full Walkthrough
                  </p>
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.name} Virtual Tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ENQUIRE / CTA STRIP
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{
          background: "#c9a84c",
        }}
      >
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(28,28,46,0.6)" }}>
              Interested in {project.name}?
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book a Site Visit Today
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-white text-[12px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200"
              style={{ color: "#1c1c2e" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1c2e") || (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff") || (e.currentTarget.style.color = "#1c1c2e")}
            >
              Enquire Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={project.brochureUrl}
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] uppercase border-2 border-white/40 text-white px-6 py-3.5 transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Brochure
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

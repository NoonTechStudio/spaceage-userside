// app/media/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Flyer {
    id: number;
    title: string;
    project: string;
    year: string;
    tag: string;
    src: string;
    downloadSrc?: string;
}

interface Brochure {
    id: number;
    title: string;
    project: string;
    pages: number;
    size: string;
    year: string;
    coverSrc: string;
    downloadSrc?: string;
}

interface Video {
    id: number;
    title: string;
    description: string;
    youtubeId: string;
    duration: string;
    category: string;
    year: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FLYERS: Flyer[] = [
    {
        id: 1,
        title: "Space Age Residency Launch",
        project: "Space Age Residency",
        year: "2023",
        tag: "Launch",
        src: "/images/media/flyer-1.jpg",
        downloadSrc: "/media/flyers/flyer-1.jpg",
    },
    {
        id: 2,
        title: "Siddhi Heights — Festive Offer",
        project: "Siddhi Heights",
        year: "2022",
        tag: "Offer",
        src: "/images/media/flyer-2.jpg",
        downloadSrc: "/media/flyers/flyer-2.jpg",
    },
    {
        id: 3,
        title: "Space Age Commerce — Pre-Launch",
        project: "Space Age Commerce",
        year: "2024",
        tag: "Pre-Launch",
        src: "/images/media/flyer-3.jpg",
        downloadSrc: "/media/flyers/flyer-3.jpg",
    },
    {
        id: 4,
        title: "Greenwood Township — Phase 2",
        project: "Greenwood Township",
        year: "2021",
        tag: "Phase 2",
        src: "/images/media/flyer-4.jpg",
        downloadSrc: "/media/flyers/flyer-4.jpg",
    },
    {
        id: 5,
        title: "Monsoon Offers 2023",
        project: "Multiple Projects",
        year: "2023",
        tag: "Seasonal",
        src: "/images/media/flyer-5.jpg",
        downloadSrc: "/media/flyers/flyer-5.jpg",
    },
    {
        id: 6,
        title: "New Year Campaign 2024",
        project: "SpaceAge Group",
        year: "2024",
        tag: "Campaign",
        src: "/images/media/flyer-6.jpg",
        downloadSrc: "/media/flyers/flyer-6.jpg",
    },
];

const BROCHURES: Brochure[] = [
    {
        id: 1,
        title: "Space Age Residency",
        project: "Space Age Residency",
        pages: 24,
        size: "8.2 MB",
        year: "2023",
        coverSrc: "/images/media/brochure-1.jpg",
        downloadSrc: "/media/brochures/space-age-residency.pdf",
    },
    {
        id: 2,
        title: "Siddhi Heights",
        project: "Siddhi Heights",
        pages: 16,
        size: "5.4 MB",
        year: "2022",
        coverSrc: "/images/media/brochure-2.jpg",
        downloadSrc: "/media/brochures/siddhi-heights.pdf",
    },
    {
        id: 3,
        title: "Space Age Commerce",
        project: "Space Age Commerce",
        pages: 20,
        size: "7.1 MB",
        year: "2024",
        coverSrc: "/images/media/brochure-3.jpg",
        downloadSrc: "/media/brochures/space-age-commerce.pdf",
    },
    {
        id: 4,
        title: "Greenwood Township",
        project: "Greenwood Township",
        pages: 32,
        size: "12.8 MB",
        year: "2021",
        coverSrc: "/images/media/brochure-4.jpg",
        downloadSrc: "/media/brochures/greenwood-township.pdf",
    },
];

const VIDEOS: Video[] = [
    {
        id: 1,
        title: "Space Age Residency — Project Walkthrough",
        description: "A complete virtual tour of our flagship 25-acre township — from the grand entrance to every residential block.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "4:32",
        category: "Walkthrough",
        year: "2023",
    },
    {
        id: 2,
        title: "Greenwood Township — Aerial Drone Tour",
        description: "Stunning aerial footage of the 35-acre Greenwood Township showing all phases, amenities, and green corridors.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "3:15",
        category: "Drone View",
        year: "2022",
    },
    {
        id: 3,
        title: "SpaceAge Group — Brand Story",
        description: "25 years of building Vadodara. Our founding directors share the journey, the vision, and the promise.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "6:48",
        category: "Brand",
        year: "2023",
    },
    {
        id: 4,
        title: "Siddhi Heights — Handover Ceremony",
        description: "Celebrating 120 families receiving their keys at Siddhi Heights. A moment of pride for SpaceAge Group.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "2:20",
        category: "Event",
        year: "2022",
    },
    {
        id: 5,
        title: "Space Age Commerce — Construction Update",
        description: "Month 18 progress update — structural work complete, interior fit-outs underway across all floors.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "5:10",
        category: "Update",
        year: "2024",
    },
    {
        id: 6,
        title: "Client Testimonials — Residency Buyers",
        description: "Hear from 6 families who chose SpaceAge Residency — what made them trust us and how life has changed.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "7:22",
        category: "Testimonial",
        year: "2023",
    },
];

const VIDEO_CATEGORIES = ["All", "Walkthrough", "Drone View", "Brand", "Event", "Update", "Testimonial"];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

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

function SectionHeader({ number, label, title, subtitle }: { number: string; label: string; title: string; subtitle?: string }) {
    return (
        <RevealSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-serif font-bold text-gray-200 tracking-tighter">{number}</span>
                <div>
                    <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#c9a84c] mb-1">{label}</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{title}</h2>
                </div>
            </div>
            <div className="w-12 h-px bg-[#c9a84c] ml-[4.5rem]" />
            {subtitle && <p className="ml-[4.5rem] mt-4 text-sm text-gray-400 leading-relaxed max-w-lg">{subtitle}</p>}
        </RevealSection>
    );
}

function MediaPlaceholder({ label }: { label: string }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-300">
            <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[10px] uppercase tracking-wider">{label}</span>
        </div>
    );
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────

function Lightbox({ items, activeIndex, onClose, onPrev, onNext, type }: {
    items: (Flyer | Brochure)[];
    activeIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    type: "flyer" | "brochure";
}) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handler);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handler);
        };
    }, [onClose, onPrev, onNext]);

    const item = items[activeIndex];
    const downloadSrc = (item as Flyer).downloadSrc ?? "";
    const coverSrc = type === "brochure" ? (item as Brochure).coverSrc : (item as Flyer).src;
    const extraLeft = type === "brochure" ? `${(item as Brochure).pages} Pages · ${(item as Brochure).size}` : (item as Flyer).tag;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={onClose}>
            <div className="relative flex flex-col lg:flex-row max-w-5xl w-full mx-4 bg-white" style={{ maxHeight: "92vh" }} onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c9a84c] z-10" />
                <div className="relative lg:w-3/5 bg-gray-50 flex items-center justify-center overflow-hidden" style={{ minHeight: "360px" }}>
                    <MediaPlaceholder label={item.title} />
                    {activeIndex > 0 && (
                        <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                            <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {activeIndex < items.length - 1 && (
                        <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                            <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-500 bg-white/80 px-3 py-1">
                        {activeIndex + 1} / {items.length}
                    </div>
                </div>
                <div className="lg:w-2/5 flex flex-col p-8">
                    <button onClick={onClose} className="self-end w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors mb-6">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-3">{type === "flyer" ? "Flyer" : "Brochure"} · {item.year}</span>
                    <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-1">{item.project}</p>
                    <p className="text-xs text-[#c9a84c] mb-6">{extraLeft}</p>
                    <div className="w-8 h-px bg-gray-200 mb-6" />
                    <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                        {type === "flyer"
                            ? "This flyer was released as part of the project marketing campaign. Download the high-resolution version for print or digital sharing."
                            : "This brochure contains detailed floor plans, specifications, amenity details, and investment information for this project."}
                    </p>
                    <div className="space-y-3">
                        <a href={downloadSrc || "#"} download className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download {type === "brochure" ? "PDF" : "Image"}
                        </a>
                        <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3.5 border border-gray-200 text-gray-500 text-sm hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                            Enquire About This Project
                        </Link>
                    </div>
                    <p className="text-center text-[10px] text-gray-300 mt-5 tracking-wider">← → Arrow keys · Esc to close</p>
                </div>
            </div>
        </div>
    );
}

// ─── VIDEO MODAL ──────────────────────────────────────────────────────────────

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handler);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={onClose}>
            <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="absolute -top-px left-0 right-0 h-0.5 bg-[#c9a84c]" />
                <button onClick={onClose} className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-wider">
                    <span>Close</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" }}>
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <div className="bg-gray-900 px-6 py-4 flex items-start justify-between gap-4 border-t border-white/10">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] block mb-1">{video.category} · {video.year}</span>
                        <h3 className="text-white font-bold text-base leading-tight font-serif">{video.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/40 shrink-0 mt-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" />
                            <path strokeLinecap="round" d="M12 6v6l4 2" />
                        </svg>
                        {video.duration}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── CARDS ─────────────────────────────────────────────────────────────────

function FlyerCard({ flyer, index, onClick }: { flyer: Flyer; index: number; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    return (
        <RevealSection delay={index * 60}>
            <div className="group cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "3/4", boxShadow: hovered ? "0 20px 35px -12px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.02)", transition: "box-shadow 0.35s ease" }}>
                    <MediaPlaceholder label={flyer.title} />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(15,15,15,0.7)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}>
                        <div className="flex flex-col items-center gap-2 text-white">
                            <div className="w-12 h-12 border border-white/50 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-white/70">View Full Size</span>
                        </div>
                    </div>
                    <div className="absolute top-3 left-3">
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-[#c9a84c] text-gray-900">{flyer.tag}</span>
                    </div>
                </div>
                <div className="pt-4 pb-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-1">{flyer.project}</p>
                    <h4 className="text-gray-900 font-bold text-sm leading-snug font-serif">{flyer.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{flyer.year}</p>
                </div>
            </div>
        </RevealSection>
    );
}

function BrochureCard({ brochure, index, onClick }: { brochure: Brochure; index: number; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    return (
        <RevealSection delay={index * 70}>
            <div className="group cursor-pointer" style={{ borderLeft: hovered ? "3px solid #c9a84c" : "3px solid transparent", transition: "border-color 0.3s ease" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <div className="flex gap-5 p-5 bg-white border border-gray-100" style={{ boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.07)" : "none", transition: "box-shadow 0.3s ease" }}>
                    <div className="relative overflow-hidden shrink-0 bg-gray-100" style={{ width: "100px", aspectRatio: "3/4" }}>
                        <MediaPlaceholder label="" />
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(15,15,15,0.55)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease" }}>
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-0.5">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold block mb-1.5">{brochure.project}</span>
                            <h4 className="text-gray-900 font-bold leading-tight font-serif text-base">{brochure.title}</h4>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-xs text-gray-400">{brochure.pages} Pages</span>
                            <span className="w-px h-3 bg-gray-200" />
                            <span className="text-xs text-gray-400">{brochure.size}</span>
                            <span className="w-px h-3 bg-gray-200" />
                            <span className="text-xs text-gray-400">{brochure.year}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-900 underline underline-offset-4 group-hover:text-[#c9a84c] transition-colors">
                                View Brochure
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <span className="text-gray-300 text-xs">·</span>
                            <a href={brochure.downloadSrc || "#"} download onClick={(e) => e.stopPropagation()} className="text-xs text-gray-400 hover:text-[#c9a84c] transition-colors inline-flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                PDF
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </RevealSection>
    );
}

function VideoCard({ video, index, onClick }: { video: Video; index: number; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    return (
        <RevealSection delay={index * 70}>
            <div className="group cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <div className="relative overflow-hidden bg-gray-900" style={{ aspectRatio: "16/9" }}>
                    <img src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.45)", opacity: hovered ? 0.7 : 0.35, transition: "opacity 0.3s ease" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center transition-all duration-300" style={{ width: "56px", height: "56px", backgroundColor: hovered ? "#c9a84c" : "rgba(255,255,255,0.9)", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
                            <svg className="w-5 h-5 ml-0.5" style={{ color: hovered ? "#0f0f0f" : "#1a1a1a" }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5">{video.duration}</div>
                    <div className="absolute top-3 left-3">
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-white/90 text-gray-900">{video.category}</span>
                    </div>
                </div>
                <div className="pt-4 pb-2 border-t-2" style={{ borderTopColor: hovered ? "#c9a84c" : "#f0f0f0", transition: "border-color 0.3s ease" }}>
                    <h4 className="text-gray-900 font-bold leading-snug mb-1 group-hover:text-[#c9a84c] transition-colors font-serif text-base">{video.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{video.description}</p>
                    <p className="text-[10px] text-[#c9a84c] uppercase tracking-wider mt-2">{video.year}</p>
                </div>
            </div>
        </RevealSection>
    );
}

function JumpNav({ active, onScroll }: { active: string; onScroll: (id: string) => void }) {
    const sections = [
        { id: "flyers", label: "Flyers", count: FLYERS.length },
        { id: "brochures", label: "Brochures", count: BROCHURES.length },
        { id: "videos", label: "Videos", count: VIDEOS.length },
    ];

    return (
        <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center gap-0 overflow-x-auto">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => onScroll(s.id)}
                            className={`flex items-center gap-2 text-sm font-medium px-6 py-4 whitespace-nowrap border-b-2 transition-all duration-200 ${active === s.id ? "text-gray-900 border-[#c9a84c]" : "text-gray-400 border-transparent hover:text-gray-600"
                                }`}
                        >
                            {s.label}
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 ${active === s.id ? "bg-[#c9a84c] text-gray-900" : "bg-gray-100 text-gray-400"}`}>
                                {s.count}
                            </span>
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{FLYERS.length + BROCHURES.length + VIDEOS.length} Total Items</span>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function MediaPage() {
    const [flyerLightbox, setFlyerLightbox] = useState<number | null>(null);
    const [brochureLightbox, setBrochureLightbox] = useState<number | null>(null);
    const [activeVideo, setActiveVideo] = useState<Video | null>(null);
    const [videoFilter, setVideoFilter] = useState("All");
    const [activeSection, setActiveSection] = useState("flyers");

    const filteredVideos = videoFilter === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === videoFilter);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const ids = ["flyers", "brochures", "videos"];
        const observers = ids.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { rootMargin: "-30% 0px -60% 0px" });
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach((o) => o?.disconnect());
    }, []);

    return (
        <LayoutWrapper>
            <div className="bg-white min-h-screen">

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <section className="relative w-full bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
                        <div className="max-w-3xl">
                            <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
                                <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
                                <span className="text-gray-300">/</span>
                                <span className="text-[#c9a84c]">Media</span>
                            </nav>
                            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">SpaceAge Group · Vadodara</div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                                Media &
                                <br />
                                <span className="italic text-[#c9a84c]">Resources.</span>
                            </h1>
                            <div className="w-12 h-px bg-[#c9a84c] mb-8" />
                            <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                                Explore our project flyers, detailed brochures, and video content —
                                everything you need to understand the SpaceAge Group story and portfolio.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-10">
                                {[
                                    { label: "Flyers", count: FLYERS.length, id: "flyers" },
                                    { label: "Brochures", count: BROCHURES.length, id: "brochures" },
                                    { label: "Videos", count: VIDEOS.length, id: "videos" },
                                ].map((item) => (
                                    <button key={item.id} onClick={() => scrollToSection(item.id)} className="flex items-center gap-3 px-5 py-2.5 border border-gray-200 hover:border-[#c9a84c] transition-colors group">
                                        <span className="text-xl font-bold text-gray-900 group-hover:text-[#c9a84c] transition-colors font-serif">{item.count}</span>
                                        <span className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JUMP NAV ──────────────────────────────────────────────── */}
                <JumpNav active={activeSection} onScroll={scrollToSection} />

                {/* ── FLYERS SECTION ───────────────────────────────────────── */}
                <section id="flyers" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="01" label="Marketing Flyers" title="Project Flyers" subtitle="Campaign and launch flyers for our residential and commercial projects. Click any flyer to view full size or download." />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                            {FLYERS.map((flyer, i) => <FlyerCard key={flyer.id} flyer={flyer} index={i} onClick={() => setFlyerLightbox(i)} />)}
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 lg:px-8"><div className="h-px bg-gray-100" /></div>

                {/* ── BROCHURES SECTION ────────────────────────────────────── */}
                <section id="brochures" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="02" label="Project Brochures" title="Download Brochures" subtitle="Detailed brochures with floor plans, specifications, amenity details, and investment information. Available for download in PDF." />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {BROCHURES.map((brochure, i) => <BrochureCard key={brochure.id} brochure={brochure} index={i} onClick={() => setBrochureLightbox(i)} />)}
                        </div>
                        <div className="mt-10 p-6 border border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-gray-900 font-semibold text-sm font-serif">Looking for a specific project brochure?</p>
                                <p className="text-xs text-gray-400 mt-1">Contact us and we'll send the latest version directly to your inbox.</p>
                            </div>
                            <Link href="/contact" className="flex items-center gap-2 text-xs font-semibold px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors whitespace-nowrap shrink-0">
                                Request a Brochure
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 lg:px-8"><div className="h-px bg-gray-100" /></div>

                {/* ── VIDEOS SECTION ───────────────────────────────────────── */}
                <section id="videos" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="03" label="YouTube · SpaceAge Group" title="Video Gallery" subtitle="Project walkthroughs, drone footage, brand stories, and client testimonials — straight from our YouTube channel." />

                        <div className="flex flex-wrap gap-2 mb-12">
                            {VIDEO_CATEGORIES.map((cat) => (
                                <button key={cat} onClick={() => setVideoFilter(cat)} className={`text-xs font-medium px-4 py-2 border transition-all duration-200 ${videoFilter === cat ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"}`}>
                                    {cat}
                                    {cat !== "All" && <span className="ml-1.5 text-[10px] opacity-60">({VIDEOS.filter((v) => v.category === cat).length})</span>}
                                </button>
                            ))}
                        </div>

                        {filteredVideos.length > 0 && (
                            <div className="mb-8">
                                <div className="group relative overflow-hidden cursor-pointer bg-gray-900" style={{ aspectRatio: "21/9" }} onClick={() => setActiveVideo(filteredVideos[0])}>
                                    <img src={`https://img.youtube.com/vi/${filteredVideos[0].youtubeId}/maxresdefault.jpg`} alt={filteredVideos[0].title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute inset-0 flex items-center px-10 lg:px-16">
                                        <div className="max-w-xl">
                                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold block mb-3">Featured · {filteredVideos[0].category} · {filteredVideos[0].year}</span>
                                            <h3 className="text-white leading-tight mb-3 text-2xl md:text-3xl font-serif font-bold">{filteredVideos[0].title}</h3>
                                            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">{filteredVideos[0].description}</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-[#c9a84c] flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                                                    <svg className="w-5 h-5 ml-0.5 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-medium">Watch Now</p>
                                                    <p className="text-white/40 text-xs">{filteredVideos[0].duration}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {filteredVideos.length > 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                {filteredVideos.slice(1).map((video, i) => <VideoCard key={video.id} video={video} index={i} onClick={() => setActiveVideo(video)} />)}
                            </div>
                        )}

                        {filteredVideos.length === 0 && <div className="text-center py-20"><p className="text-sm text-gray-400">No videos in this category yet.</p></div>}

                        <div className="mt-14 text-center">
                            <a href="https://www.youtube.com/@SpaceAgeGroup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 border border-gray-200 bg-white hover:border-[#c9a84c] transition-colors text-sm font-medium text-gray-900 group">
                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                Visit Our YouTube Channel
                                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c9a84c] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── CTA BANNER ────────────────────────────────────────────── */}
                <section className="bg-gray-900 border-t border-[#c9a84c] py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold block mb-3">Interested in a project?</span>
                            <h2 className="text-white leading-tight text-2xl md:text-3xl font-serif font-bold">
                                Schedule a site visit or
                                <br />
                                <span className="italic text-[#c9a84c]">request full details.</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4 shrink-0">
                            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-4 bg-[#c9a84c] text-gray-900 hover:bg-[#b8962e] transition-colors">
                                Get in Touch
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium px-7 py-4 border border-gray-700 text-white hover:border-gray-500 transition-colors">
                                View All Projects
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>

            {flyerLightbox !== null && <Lightbox items={FLYERS} activeIndex={flyerLightbox} onClose={() => setFlyerLightbox(null)} onPrev={() => setFlyerLightbox((i) => Math.max(0, (i ?? 0) - 1))} onNext={() => setFlyerLightbox((i) => Math.min(FLYERS.length - 1, (i ?? 0) + 1))} type="flyer" />}
            {brochureLightbox !== null && <Lightbox items={BROCHURES} activeIndex={brochureLightbox} onClose={() => setBrochureLightbox(null)} onPrev={() => setBrochureLightbox((i) => Math.max(0, (i ?? 0) - 1))} onNext={() => setBrochureLightbox((i) => Math.min(BROCHURES.length - 1, (i ?? 0) + 1))} type="brochure" />}
            {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
        </LayoutWrapper>
    );
}
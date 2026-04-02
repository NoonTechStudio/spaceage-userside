// app/csr/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function coverSrc(images: string[]): string | null {
    return images.find((s) => s && s.trim() !== "") ?? null;
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface CSRPost {
    id: number;
    slug: string;
    title: string;
    category: string;
    date: string;
    description: string;
    longDescription: string;
    images: string[];
    imageCount: number;
    impact: string;
    likes: number;
    color: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const CSR_POSTS: CSRPost[] = [
    {
        id: 1,
        slug: "chakli-ghar",
        title: "Chakli Ghar",
        category: "Education & Welfare",
        date: "March 2024",
        description:
            "Supporting underprivileged children with food, shelter, and educational resources at Chakli Ghar — a home that transforms lives.",
        longDescription:
            "Our partnership with Chakli Ghar has enabled consistent support to over 50 children through monthly provisions of food, stationery, and learning materials. Space Age Group believes every child deserves a fair start in life.",
        images: ["/images/csr/chakli-1.jpg", "/images/csr/chakli-2.jpg", "/images/csr/chakli-3.jpg"],
        imageCount: 5,
        impact: "50+ Children Supported",
        likes: 124,
        color: "#c9a84c",
    },
    {
        id: 2,
        slug: "school-notebook-vitran",
        title: "School Note Book Vitran – Malharpur",
        category: "Education",
        date: "June 2023",
        description:
            "Distributing school notebooks to 400+ students in Malharpur to ensure no child is held back from learning due to lack of stationery.",
        longDescription:
            "In collaboration with local schools in Malharpur, Space Age Group organized a comprehensive notebook distribution drive reaching students across 8 government schools. The initiative ensures continuity in education for economically disadvantaged families.",
        images: ["/images/csr/notebook-1.jpg", "/images/csr/notebook-2.jpg"],
        imageCount: 10,
        impact: "400+ Students Reached",
        likes: 89,
        color: "#2e7d6b",
    },
    {
        id: 3,
        slug: "tree-replantation",
        title: "Tree Replantation",
        category: "Environment",
        date: "August 2023",
        description:
            "Planting hundreds of saplings across Vadodara's green belts to combat deforestation and build a greener tomorrow.",
        longDescription:
            "As a responsible real estate developer, Space Age Group leads by example in environmental stewardship. Our tree replantation drives have planted over 600 saplings along project sites, parks, and community areas across Vadodara, contributing to urban biodiversity.",
        images: ["/images/csr/tree-1.jpg", "/images/csr/tree-2.jpg"],
        imageCount: 9,
        impact: "600+ Trees Planted",
        likes: 203,
        color: "#4a7c59",
    },
    {
        id: 4,
        slug: "medical-checkup-blood-donation",
        title: "Medical Checkup & Blood Donation",
        category: "Health",
        date: "January 2024",
        description:
            "Organizing free medical camps and blood donation drives to serve the community's health needs with dignity and care.",
        longDescription:
            "Our annual medical initiative brought together 12 specialist doctors providing free checkups to over 300 residents from low-income areas. The attached blood donation drive collected 85+ units, directly benefiting patients at Vadodara's SSG Hospital.",
        images: ["/images/csr/medical-1.jpg", "/images/csr/medical-2.jpg", "/images/csr/medical-3.jpg"],
        imageCount: 38,
        impact: "300+ Patients Served",
        likes: 312,
        color: "#c0392b",
    },
    {
        id: 5,
        slug: "flag-hosting",
        title: "Flag Hosting",
        category: "National Pride",
        date: "August 2023",
        description:
            "Celebrating the spirit of Independence Day with a grand flag hoisting ceremony bringing our community together in patriotic unity.",
        longDescription:
            "Space Age Group organized a vibrant Independence Day flag hoisting ceremony at our office premises with participation from employees, clients, and community members. The event included cultural performances and tributes to freedom fighters.",
        images: ["/images/csr/flag-1.jpg", "/images/csr/flag-2.jpg"],
        imageCount: 20,
        impact: "200+ Participants",
        likes: 178,
        color: "#f39c12",
    },
    {
        id: 6,
        slug: "flood-relief-red-cross",
        title: "Flood Relief with Red Cross",
        category: "Disaster Relief",
        date: "September 2023",
        description:
            "Partnering with Red Cross to deliver emergency relief supplies to flood-affected families in the Vadodara district.",
        longDescription:
            "During the devastating floods of 2023, Space Age Group mobilized resources in partnership with the Indian Red Cross Society to deliver food packets, drinking water, blankets, and hygiene kits to over 500 displaced families across flood-affected villages.",
        images: ["/images/csr/flood-1.jpg", "/images/csr/flood-2.jpg"],
        imageCount: 11,
        impact: "500+ Families Helped",
        likes: 267,
        color: "#2980b9",
    },
    {
        id: 7,
        slug: "tree-plantation",
        title: "Tree Plantation Drive",
        category: "Environment",
        date: "July 2024",
        description:
            "A community-wide plantation drive with residents, employees, and volunteers coming together to green our city.",
        longDescription:
            "Building on our replantation efforts, this year's drive focused on native species of trees that require minimal water and provide maximum canopy coverage. Over 300 volunteers from our residential projects joined hands to plant 400+ saplings.",
        images: ["/images/csr/plant-1.jpg", "/images/csr/plant-2.jpg"],
        imageCount: 6,
        impact: "400+ Saplings Planted",
        likes: 145,
        color: "#4a7c59",
    },
    {
        id: 8,
        slug: "bvm-farewell-expo",
        title: "BVM, V.V Nagar's Farewell & Expo '25",
        category: "Education",
        date: "March 2025",
        description:
            "Sponsoring and participating in BVM Engineering College's farewell and technology expo to nurture the next generation of engineers.",
        longDescription:
            "Space Age Group proudly sponsored the annual farewell & technology expo at BVM Engineering College, V.V Nagar. Our team mentored graduating students on careers in real estate and infrastructure, and provided internship opportunities to 5 promising engineers.",
        images: ["/images/csr/bvm-1.jpg", "/images/csr/bvm-2.jpg"],
        imageCount: 7,
        impact: "200+ Students Inspired",
        likes: 93,
        color: "#8e44ad",
    },
    {
        id: 9,
        slug: "world-environment-day",
        title: "World Environment Day",
        category: "Environment",
        date: "June 2024",
        description:
            "Marking World Environment Day with awareness campaigns, cleanups, and a pledge to build sustainably for the future.",
        longDescription:
            "On World Environment Day 2024, Space Age Group launched a week-long campaign across all project sites. Activities included neighbourhood cleanup drives, awareness sessions on sustainable construction, and a commitment to achieving net-zero construction waste by 2027.",
        images: ["/images/csr/env-1.jpg", "/images/csr/env-2.jpg"],
        imageCount: 4,
        impact: "Sustainability Pledge Signed",
        likes: 156,
        color: "#27ae60",
    },
];

const CATEGORIES = ["All", "Education", "Environment", "Health", "Disaster Relief", "National Pride", "Education & Welfare"];

// ─── REVEAL SECTION ─────────────────────────────────────────────────────────

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

// ─── LIKE BUTTON ────────────────────────────────────────────────────────────

function LikeButton({ postId, initialLikes }: { postId: number; initialLikes: number }) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialLikes);
    const [animating, setAnimating] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (liked) {
            setLiked(false);
            setCount((c) => c - 1);
        } else {
            setLiked(true);
            setCount((c) => c + 1);
            setAnimating(true);
            setTimeout(() => setAnimating(false), 600);
        }
    };

    return (
        <button
            onClick={handleLike}
            className="flex items-center gap-2 group/like transition-all duration-200"
            aria-label={liked ? "Unlike" : "Like"}
        >
            <span
                className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                style={{
                    backgroundColor: liked ? "rgba(201,168,76,0.15)" : "rgba(0,0,0,0.04)",
                    transform: animating ? "scale(1.35)" : "scale(1)",
                }}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={liked ? "#c9a84c" : "none"}
                    stroke={liked ? "#c9a84c" : "#9a9a9a"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </span>
            <span
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: liked ? "#c9a84c" : "#9a9a9a" }}
            >
                {count}
            </span>
        </button>
    );
}

// ─── IMAGE GALLERY MODAL ────────────────────────────────────────────────────

function GalleryModal({ post, onClose }: { post: CSRPost; onClose: () => void }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % post.images.length);
            if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + post.images.length) % post.images.length);
        };
        window.addEventListener("keydown", handleKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKey);
        };
    }, [onClose, post.images.length]);

    const hasImages = post.images.length > 0 && post.images[0]?.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={onClose}>
            <div className="relative max-w-5xl w-full mx-4 bg-white" onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c9a84c] z-10" />

                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-wider flex items-center gap-2"
                >
                    Close <span className="text-base">✕</span>
                </button>

                <div className="relative bg-gray-100 flex items-center justify-center" style={{ minHeight: "400px", aspectRatio: "16/9" }}>
                    {hasImages ? (
                        <Image
                            src={post.images[current]}
                            alt={post.title}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                            <span className="text-xs">No image available</span>
                        </div>
                    )}

                    {post.images.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrent((c) => (c - 1 + post.images.length) % post.images.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrent((c) => (c + 1) % post.images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1">
                                {current + 1} / {post.imageCount}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 bg-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold block mb-1">
                                {post.category} · {post.date}
                            </span>
                            <h3 className="text-xl font-serif font-bold text-gray-900">{post.title}</h3>
                        </div>
                        <span
                            className="text-xs font-medium px-3 py-1.5 border"
                            style={{ color: post.color, borderColor: post.color + "40" }}
                        >
                            {post.impact}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed">{post.longDescription}</p>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <LikeButton postId={post.id} initialLikes={post.likes} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── CSR CARD ───────────────────────────────────────────────────────────────

function CSRCard({ post, index }: { post: CSRPost; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const isFeature = index === 0;

    return (
        <>
            {showGallery && <GalleryModal post={post} onClose={() => setShowGallery(false)} />}

            <RevealSection delay={index * 70}>
                <article
                    className={`group bg-white overflow-hidden transition-all duration-300 cursor-pointer ${isFeature ? "col-span-1 md:col-span-2" : ""}`}
                    style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
                    onClick={() => setShowGallery(true)}
                >
                    <div className="relative overflow-hidden" style={{ aspectRatio: isFeature ? "21/9" : "4/3" }}>
                        {coverSrc(post.images) ? (
                            <Image
                                src={coverSrc(post.images)!}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                No image available
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white text-center">
                                <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span className="text-xs font-medium tracking-wider uppercase">View Gallery</span>
                            </div>
                        </div>

                        <div className="absolute top-4 left-4">
                            <span
                                className="text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5"
                                style={{ backgroundColor: post.color }}
                            >
                                {post.category}
                            </span>
                        </div>

                        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 text-white text-xs px-2.5 py-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            {post.imageCount} images
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-400 uppercase tracking-[0.15em]">{post.date}</span>
                            <span
                                className="text-xs font-bold uppercase tracking-[0.15em] px-2 py-0.5 border"
                                style={{ color: post.color, borderColor: post.color + "40" }}
                            >
                                {post.impact}
                            </span>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#c9a84c] transition-colors">
                            {post.title}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            {expanded ? post.longDescription : post.description}
                        </p>

                        <button
                            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                            className="mt-3 text-xs font-medium uppercase tracking-wider transition-colors duration-200 hover:opacity-70"
                            style={{ color: post.color }}
                        >
                            {expanded ? "Read less ↑" : "Read more ↓"}
                        </button>

                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <LikeButton postId={post.id} initialLikes={post.likes} />
                            <span className="text-xs text-gray-400 hover:text-[#c9a84c] transition-colors flex items-center gap-1.5 uppercase tracking-wider font-medium">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                Open Gallery
                            </span>
                        </div>
                    </div>
                </article>
            </RevealSection>
        </>
    );
}

// ─── JUMP NAV ───────────────────────────────────────────────────────────────

function JumpNav({ active, onScroll }: { active: string; onScroll: (id: string) => void }) {
    const sections = [
        { id: "initiatives", label: "Initiatives", count: CSR_POSTS.length },
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
                    <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{CSR_POSTS.length} Total Initiatives</span>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function CSRPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSection, setActiveSection] = useState("initiatives");

    const uniqueCategories = ["All", ...Array.from(new Set(CSR_POSTS.map((p) => p.category)))];

    const filtered = activeCategory === "All"
        ? CSR_POSTS
        : CSR_POSTS.filter((p) => p.category === activeCategory);

    const totalImpact = {
        children: "50+",
        trees: "1000+",
        families: "500+",
        events: CSR_POSTS.length,
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const ids = ["initiatives"];
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
                                <span className="text-[#c9a84c]">CSR</span>
                            </nav>
                            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">SpaceAge Group · Vadodara</div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                                Corporate
                                <br />
                                <span className="italic text-[#c9a84c]">Social Responsibility.</span>
                            </h1>
                            <div className="w-12 h-px bg-[#c9a84c] mb-8" />
                            <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                                Building communities, nurturing lives, and giving back to the society that shaped us.
                                Explore our initiatives in education, environment, health, and disaster relief.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-10">
                                <button onClick={() => scrollToSection("initiatives")} className="flex items-center gap-3 px-5 py-2.5 border border-gray-200 hover:border-[#c9a84c] transition-colors group">
                                    <span className="text-xl font-bold text-gray-900 group-hover:text-[#c9a84c] transition-colors font-serif">{CSR_POSTS.length}</span>
                                    <span className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors">Initiatives</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JUMP NAV ──────────────────────────────────────────────── */}
                <JumpNav active={activeSection} onScroll={scrollToSection} />

                {/* ── MISSION STATEMENT ──────────────────────────────────────── */}
                <section className="bg-gray-50 py-20 md:py-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
                            <div>
                                <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium block mb-4">
                                    Our Commitment
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-[1.1]">
                                    Building More Than Just Structures
                                </h2>
                                <div className="w-12 h-px bg-[#c9a84c] mt-6 mb-8" />

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { value: totalImpact.children, label: "Children Supported" },
                                        { value: totalImpact.trees, label: "Trees Planted" },
                                        { value: totalImpact.families, label: "Families Helped" },
                                        { value: String(totalImpact.events), label: "Initiatives" },
                                    ].map((stat) => (
                                        <div key={stat.label}>
                                            <p className="text-3xl font-bold text-gray-900 font-serif">{stat.value}</p>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:pt-14">
                                <p className="text-gray-600 text-lg leading-[1.85] mb-6">
                                    At Space Age Group, we believe that true progress goes beyond concrete and steel. Since our founding, we have embraced a deep responsibility to the communities that host our projects — investing in their education, health, environment, and resilience.
                                </p>
                                <p className="text-gray-500 text-base leading-relaxed">
                                    Our Corporate Social Responsibility initiatives are not afterthoughts — they are integral to how we measure success as a company. Every project we build is accompanied by a promise: to leave the community better than we found it.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── INITIATIVES SECTION ────────────────────────────────────── */}
                <section id="initiatives" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="01" label="Our Impact" title="CSR Initiatives" subtitle="Every initiative we undertake is rooted in the belief that real growth is shared growth. Here's how we're making a difference." />

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            {uniqueCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-xs font-medium px-4 py-2 border transition-all duration-200 ${activeCategory === cat ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"}`}
                                >
                                    {cat}
                                    {cat !== "All" && <span className="ml-1.5 text-[10px] opacity-60">({CSR_POSTS.filter((p) => p.category === cat).length})</span>}
                                </button>
                            ))}
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-sm text-gray-400">No initiatives in this category.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((post, idx) => (
                                    <CSRCard key={post.id} post={post} index={idx} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── CTA BANNER ────────────────────────────────────────────── */}
                <section className="bg-gray-900 border-t border-[#c9a84c] py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold block mb-3">Partner With Us</span>
                            <h2 className="text-white leading-tight text-2xl md:text-3xl font-serif font-bold">
                                Want to Make an Impact Together?
                                <br />
                                <span className="italic text-[#c9a84c]">Let's collaborate.</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4 shrink-0">
                            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-4 bg-[#c9a84c] text-gray-900 hover:bg-[#b8962e] transition-colors">
                                Contact CSR Team
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium px-7 py-4 border border-gray-700 text-white hover:border-gray-500 transition-colors">
                                Explore Projects
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </LayoutWrapper>
    );
}
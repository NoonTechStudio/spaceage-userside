// app/csr/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";
import DevDataToggle from "@/components/DevDataToggle/DevDataToggle";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function coverSrc(images: string[]): string | null {
    return images.find((s) => s && s.trim() !== "") ?? null;
}

const getYoutubeId = (url: string) => {
    if (!url) return "dQw4w9WgXcQ";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "dQw4w9WgXcQ";
};

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface CSRPost {
    id: string | number;
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
    items?: {
        url: string;
        title?: string;
        description?: string;
        category?: string;
        provider?: string;
    }[];
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

function LikeButton({ postId, initialLikes, useMock }: { postId: string | number; initialLikes: number; useMock: boolean }) {
    const storageKey = `liked_csr_${postId}`;
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialLikes);
    const [animating, setAnimating] = useState(false);

    // Sync count when initialLikes changes
    useEffect(() => {
        setCount(initialLikes);
    }, [initialLikes]);

    // Read initial liked status for this Chrome profile from localStorage
    useEffect(() => {
        try {
            const isLiked = localStorage.getItem(storageKey) === 'true';
            setLiked(isLiked);
        } catch (e) {
            console.error('LocalStorage read error:', e);
        }
    }, [storageKey]);

    const handleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextLikedState = !liked;
        const action = nextLikedState ? 'like' : 'unlike';

        setLiked(nextLikedState);
        setCount((c) => nextLikedState ? c + 1 : Math.max(0, c - 1));

        if (nextLikedState) {
            setAnimating(true);
            setTimeout(() => setAnimating(false), 600);
        }

        // Persist Chrome profile like state in localStorage
        try {
            if (nextLikedState) {
                localStorage.setItem(storageKey, 'true');
            } else {
                localStorage.removeItem(storageKey);
            }
        } catch (e) {
            console.error('LocalStorage write error:', e);
        }

        try {
            const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://spaceagegroupadmin.vercel.app';
            const res = await fetch(`${adminApiUrl}/api/csr/${postId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.likes === 'number') {
                    setCount(data.likes);
                }
            }
        } catch (err) {
            console.error("Failed to update like in db:", err);
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

function GalleryModal({ post, onClose, useMock }: { post: CSRPost; onClose: () => void; useMock: boolean }) {
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
    const currentItem = post.items && post.items[current];

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

                <div className="relative bg-gray-100 flex items-center justify-center overflow-hidden" style={{ minHeight: "400px", aspectRatio: "16/9" }}>
                    {hasImages ? (
                        currentItem && (currentItem.category === 'video' || currentItem.provider === 'youtube') ? (
                            currentItem.provider === 'youtube' ? (
                                <iframe 
                                    className="absolute inset-0 w-full h-full p-4 md:p-8" 
                                    src={`https://www.youtube.com/embed/${getYoutubeId(currentItem.url)}?autoplay=1&rel=0`} 
                                    title={currentItem.title || post.title} 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen 
                                />
                            ) : (
                                <video 
                                    className="absolute inset-0 w-full h-full p-4 md:p-8" 
                                    src={currentItem.url} 
                                    controls 
                                    autoPlay 
                                    playsInline
                                />
                            )
                        ) : (
                            <Image
                                src={post.images[current]}
                                alt={post.title}
                                fill
                                className="object-contain"
                            />
                        )
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
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors z-10"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrent((c) => (c + 1) % post.images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors z-10"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 z-10">
                                {current + 1} / {post.imageCount}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold block mb-1">
                                {post.category} · {post.date}
                            </span>
                            <h3 className="text-xl font-serif font-bold text-gray-900 truncate">
                                {post.title}
                            </h3>
                            {currentItem && currentItem.title && (
                                <h4 className="text-sm font-bold text-gray-800 mt-2 block">
                                    Asset: {currentItem.title}
                                </h4>
                            )}
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                {currentItem && currentItem.description ? currentItem.description : post.longDescription}
                            </p>
                        </div>
                        <span
                            className="text-xs font-medium px-3 py-1.5 border shrink-0"
                            style={{ color: post.color, borderColor: post.color + "40" }}
                        >
                            {post.impact}
                        </span>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <LikeButton postId={post.id} initialLikes={post.likes} useMock={useMock} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── CSR CARD ───────────────────────────────────────────────────────────────

function CSRCard({ post, index, useMock }: { post: CSRPost; index: number; useMock: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const isFeature = index === 0;

    return (
        <>
            {showGallery && <GalleryModal post={post} onClose={() => setShowGallery(false)} useMock={useMock} />}

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
                            <LikeButton postId={post.id} initialLikes={post.likes} useMock={useMock} />
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

function JumpNav({ active, onScroll, count }: { active: string; onScroll: (id: string) => void; count: number }) {
    const sections = [
        { id: "initiatives", label: "Initiatives", count: count },
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
                    <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{count} Total Initiatives</span>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function CSRPage() {
    const [useMock, setUseMock] = useState(false);
    const [csrList, setCsrList] = useState<any[]>([]);

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSection, setActiveSection] = useState("initiatives");

    useEffect(() => {
        setUseMock(localStorage.getItem("use_mock_data") === "true");

        const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://spaceagegroupadmin.vercel.app';
        fetch(`${adminApiUrl}/api/csr`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCsrList(data);
            })
            .catch(console.error);
    }, []);

    const activePosts = useMemo<CSRPost[]>(() => {
        if (useMock || !csrList || csrList.length === 0) return CSR_POSTS;

        return csrList.map((item) => {
            const rawItems = Array.isArray(item.items) ? item.items : [];
            const sortedItems = [...rawItems].sort((a: any, b: any) => (b.isMainImage ? 1 : 0) - (a.isMainImage ? 1 : 0));
            let mappedImages = sortedItems
                .filter((x: any) => x.url && x.category !== 'video')
                .map((x: any) => x.url);

            if (mappedImages.length === 0) {
                mappedImages = Array.isArray(item.images) && item.images.length > 0 
                    ? item.images 
                    : ["/images/csr/placeholder.jpg"];
            }

            return {
                id: item._id,
                slug: item.slug,
                title: item.title,
                category: item.category,
                date: item.date,
                description: item.description,
                longDescription: item.longDescription,
                images: mappedImages,
                imageCount: mappedImages.length,
                impact: item.impact,
                likes: item.likes || 0,
                color: item.color || "#c9a84c",
                items: item.items || [],
            };
        });
    }, [useMock, csrList]);

    const uniqueCategories = ["All", ...Array.from(new Set(activePosts.map((p) => p.category)))];

    const filtered = activeCategory === "All"
        ? activePosts
        : activePosts.filter((p) => p.category === activeCategory);

    const totalImpact = {
        children: "50+",
        trees: "1000+",
        families: "500+",
        events: activePosts.length,
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
                            <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-serif italic mb-12">
                                Building sustainable futures, fostering inclusive growth, and greening our communities across Vadodara.
                            </p>
                        </div>

                        {/* Impact Summary Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-100">
                            <div>
                                <span className="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">{totalImpact.children}</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Underprivileged Children Supported</span>
                            </div>
                            <div>
                                <span className="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">{totalImpact.trees}</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Saplings Planted</span>
                            </div>
                            <div>
                                <span className="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">{totalImpact.families}</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Families Aided in Disasters</span>
                            </div>
                            <div>
                                <span className="text-3xl md:text-4xl font-serif font-bold text-gray-900 block mb-1">{totalImpact.events}</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Completed Initiatives</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JUMP NAV ──────────────────────────────────────────────── */}
                <JumpNav active={activeSection} onScroll={scrollToSection} count={activePosts.length} />

                {/* ── INTRO DETAILS ─────────────────────────────────────────── */}
                <section className="py-24 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold block mb-4">Our Philosophy</span>
                                <h2 className="text-gray-900 leading-tight text-3xl md:text-4xl font-serif font-bold mb-8">
                                    Greening the Environment &
                                    <br />
                                    <span className="italic text-[#c9a84c]">Nurturing the Future.</span>
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { label: "Environmental Stewardship", desc: "Leading massive tree replantation drives, urban forestry, and implementing zero-waste practices across project sites." },
                                        { label: "Community Support & Disaster Relief", desc: "Partnering with the Red Cross and government bodies to deliver critical relief supplies, food, and essentials in times of natural disasters." },
                                        { label: "Healthcare & Welfare Camps", desc: "Organizing free medical checkups, blood donation drives, and supporting underfunded shelters for children and seniors." }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-sm">
                                            <div className="w-6 h-6 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">{idx + 1}</div>
                                            <div>
                                                <h4 className="text-gray-900 font-bold text-sm mb-1">{item.label}</h4>
                                                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 border border-gray-100">
                                <h3 className="font-serif font-bold text-lg mb-6">Our Core Vision</h3>
                                <p className="text-gray-500 leading-relaxed text-sm mb-6">
                                    At Space Age Group, we believe that true progress goes beyond concrete and steel. Since our founding, we have embraced a deep responsibility to the communities that host our projects — investing in their education, health, environment, and resilience.
                                </p>
                                <p className="text-gray-500 leading-relaxed text-sm">
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
                                    {cat !== "All" && <span className="ml-1.5 text-[10px] opacity-60">({activePosts.filter((p) => p.category === cat).length})</span>}
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
                                    <CSRCard key={post.id} post={post} index={idx} useMock={useMock} />
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
                <DevDataToggle />
            </div>
        </LayoutWrapper>
    );
}
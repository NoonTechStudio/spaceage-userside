// app/blog/page.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function coverSrc(src: string | undefined): string | null {
    return src && src.trim() !== "" ? src : null;
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

type BlogCategory = "All" | "News" | "Events" | "Investment" | "Real Estate Tips" | "Community";

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: BlogCategory;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
    tags: string[];
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        slug: "investment-opportunity-manjusar",
        title: "Investment Opportunity in Manjusar – Fastest Growing Industrial Area",
        excerpt:
            "Manjusar is emerging as Vadodara's most promising investment corridor. With rapid infrastructure expansion, GIDC proximity, and rising commercial demand, this is the opportunity investors have been waiting for.",
        content: "",
        category: "Investment",
        author: "Taher Zabuawala",
        authorRole: "Director, BE Civil · MBA · LLB",
        date: "September 14, 2024",
        readTime: "5 min read",
        image: "/images/blog/manjusar.jpg",
        featured: true,
        tags: ["Investment", "Manjusar", "Industrial", "Gujarat"],
    },
    {
        id: 2,
        slug: "groundwater-property-investment",
        title: "Water Availability: The Hidden Factor When Buying Property in Vadodara",
        excerpt:
            "As city water supply becomes increasingly strained, groundwater availability is fast becoming one of the most critical factors in property valuation. Here's how to evaluate it before you buy.",
        content: "",
        category: "Real Estate Tips",
        author: "Juzer Nalwala",
        authorRole: "Director, MSc Hydrogeology (Germany)",
        date: "August 24, 2023",
        readTime: "4 min read",
        image: "/images/blog/groundwater.jpg",
        tags: ["Water", "Property Tips", "Vadodara", "Infrastructure"],
    },
    {
        id: 3,
        slug: "benefits-investing-in-plot",
        title: "Why a Plot Investment Still Outperforms Apartments in the Long Run",
        excerpt:
            "In an era of rising apartment prices and shrinking carpet areas, buying a plot remains the most flexible, appreciating, and legacy-building investment you can make in real estate.",
        content: "",
        category: "Real Estate Tips",
        author: "Ajab Zabuawala",
        authorRole: "Director, ME Structure · MBA Finance",
        date: "January 2, 2023",
        readTime: "6 min read",
        image: "/images/blog/plot.jpg",
        tags: ["Plot Investment", "Real Estate", "Appreciation", "Tips"],
    },
    {
        id: 4,
        slug: "rental-income-buy-back",
        title: "Bhada ni Milkat – Earning Rental Income with Buy-Back Security",
        excerpt:
            "A unique model where your investment earns consistent rental income while a guaranteed buy-back clause ensures capital protection. Space Age Group explains how this works.",
        content: "",
        category: "Investment",
        author: "Amatullah Nalwala",
        authorRole: "Director, BArch · LLB · UNSW Sydney",
        date: "December 15, 2022",
        readTime: "5 min read",
        image: "/images/blog/rental.jpg",
        tags: ["Rental Income", "Buy-Back", "Commercial", "Returns"],
    },
    {
        id: 5,
        slug: "vadodara-real-estate-2024-outlook",
        title: "Vadodara Real Estate 2024: What Buyers and Investors Should Know",
        excerpt:
            "From the rise of the Waghodia corridor to BRTS connectivity improvements and new township projects — here's the comprehensive outlook for Vadodara's property market in 2024.",
        content: "",
        category: "News",
        author: "Taher Zabuawala",
        authorRole: "Director, BE Civil · MBA · LLB",
        date: "February 10, 2024",
        readTime: "7 min read",
        image: "/images/blog/vadodara-market.jpg",
        tags: ["Market Outlook", "Vadodara", "2024", "Real Estate"],
    },
    {
        id: 6,
        slug: "aambawadi-sangam-launch-event",
        title: "Aambawadi Sangam Launch — A Day of Dreams and Milestones",
        excerpt:
            "The launch of Aambawadi Sangam brought together hundreds of families, investors, and community members to witness the beginning of an affordable housing milestone in Padra.",
        content: "",
        category: "Events",
        author: "Space Age Group",
        authorRole: "Media & Communications",
        date: "March 22, 2024",
        readTime: "3 min read",
        image: "/images/blog/sangam-launch.jpg",
        tags: ["Events", "Aambawadi", "Launch", "Affordable Housing"],
    },
    {
        id: 7,
        slug: "rera-compliance-guide-buyers",
        title: "RERA Compliance: What Every Gujarat Homebuyer Must Verify Before Booking",
        excerpt:
            "The Real Estate Regulatory Authority has transformed buyer protection in India. This guide walks you through exactly what to check, verify, and demand from your developer before signing anything.",
        content: "",
        category: "Real Estate Tips",
        author: "Amatullah Nalwala",
        authorRole: "Director, BArch · LLB · UNSW Sydney",
        date: "April 5, 2024",
        readTime: "8 min read",
        image: "/images/blog/rera.jpg",
        tags: ["RERA", "Legal", "Buyers", "Gujarat"],
    },
    {
        id: 8,
        slug: "misty-woods-weekend-home-lifestyle",
        title: "The Rise of the Weekend Home: Why Diwalipura is Vadodara's New Escape",
        excerpt:
            "Work-from-anywhere culture has redefined how families think about a second home. Discover why weekend homes near Vadodara are seeing unprecedented demand — and what to look for.",
        content: "",
        category: "Community",
        author: "Juzer Nalwala",
        authorRole: "Director, MSc Hydrogeology (Germany)",
        date: "May 18, 2024",
        readTime: "5 min read",
        image: "/images/blog/weekend-home.jpg",
        tags: ["Weekend Homes", "Lifestyle", "Diwalipura", "Community"],
    },
];

const CATEGORIES: BlogCategory[] = ["All", "News", "Events", "Investment", "Real Estate Tips", "Community"];

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

// ─── AUTHOR AVATAR ──────────────────────────────────────────────────────────

function AuthorAvatar({ name, size = 36 }: { name: string; size?: number }) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <div
            className="shrink-0 flex items-center justify-center rounded-full font-bold text-white text-xs"
            style={{
                width: size,
                height: size,
                backgroundColor: "#c9a84c",
                fontSize: size < 36 ? 10 : 12,
            }}
        >
            {initials}
        </div>
    );
}

// ─── FEATURED HERO CARD ─────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
    const src = coverSrc(post.image);

    return (
        <Link href={`/blog/${post.slug}`} className="group relative block overflow-hidden bg-gray-900" style={{ minHeight: 480 }}>
            {src ? (
                <Image
                    src={src}
                    alt={post.title}
                    fill
                    className="object-cover opacity-50 transition-all duration-700 group-hover:opacity-40 group-hover:scale-105"
                    priority
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12" style={{ minHeight: 480 }}>
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#c9a84c] text-gray-900 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5">
                            Featured
                        </span>
                        <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-semibold border border-white/20 px-3 py-1.5">
                            {post.category}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-serif font-bold leading-[1.15] mb-4 group-hover:text-[#c9a84c] transition-colors duration-300">
                        {post.title}
                    </h2>

                    <p className="text-white/65 text-base leading-relaxed max-w-2xl mb-6 hidden md:block">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-5">
                        <AuthorAvatar name={post.author} />
                        <div>
                            <p className="text-white text-sm font-semibold">{post.author}</p>
                            <p className="text-white/45 text-xs">{post.date} · {post.readTime}</p>
                        </div>
                        <span className="ml-auto text-[#c9a84c] text-sm font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-200">
                            Read Article →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ─── BLOG CARD ─────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const src = coverSrc(post.image);

    return (
        <RevealSection delay={index * 60}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col bg-white overflow-hidden transition-all duration-300 hover:shadow-lg" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    {src ? (
                        <Image
                            src={src}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </div>
                    )}

                    <div className="absolute top-3 left-3">
                        <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1">
                            {post.category}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] text-gray-400 uppercase tracking-[0.18em]">{post.date}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-[0.18em]">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#c9a84c] transition-colors duration-200">
                        {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] text-gray-400 border border-gray-100 px-2 py-0.5 uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <AuthorAvatar name={post.author} size={30} />
                            <div>
                                <p className="text-xs font-semibold text-gray-900 leading-tight">{post.author}</p>
                                <p className="text-[10px] text-gray-400 leading-tight">{post.authorRole.split(",")[0]}</p>
                            </div>
                        </div>
                        <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform duration-200">
                            Read →
                        </span>
                    </div>
                </div>
            </Link>
        </RevealSection>
    );
}

// ─── JUMP NAV ───────────────────────────────────────────────────────────────

function JumpNav({ active, onScroll }: { active: string; onScroll: (id: string) => void }) {
    const sections = [
        { id: "articles", label: "Articles", count: BLOG_POSTS.length },
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
                    <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{BLOG_POSTS.length} Total Articles</span>
                </div>
            </div>
        </div>
    );
}

// ─── SIDEBAR ────────────────────────────────────────────────────────────────

function Sidebar({
    posts,
    activeCategory,
    onCategory,
    searchQuery,
    onSearch,
}: {
    posts: BlogPost[];
    activeCategory: BlogCategory;
    onCategory: (c: BlogCategory) => void;
    searchQuery: string;
    onSearch: (q: string) => void;
}) {
    const recent = [...posts].sort((a, b) => b.id - a.id).slice(0, 4);

    const allTags = posts.flatMap((p) => p.tags);
    const tagCount = allTags.reduce<Record<string, number>>((acc, t) => {
        acc[t] = (acc[t] || 0) + 1;
        return acc;
    }, {});
    const topTags = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([tag]) => tag);

    return (
        <aside className="flex flex-col gap-8">
            {/* Search */}
            <div className="bg-white p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
                <h4 className="text-lg font-serif font-bold text-gray-900 mb-5">Search</h4>
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full pl-9 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-100 outline-none focus:border-[#c9a84c] transition-colors"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
                <h4 className="text-lg font-serif font-bold text-gray-900 mb-5">Categories</h4>
                <div className="flex flex-col gap-1">
                    {CATEGORIES.map((cat) => {
                        const count = cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length;
                        return (
                            <button
                                key={cat}
                                onClick={() => onCategory(cat)}
                                className="flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-200 text-left"
                                style={{
                                    backgroundColor: activeCategory === cat ? "rgba(201,168,76,0.08)" : "transparent",
                                    color: activeCategory === cat ? "#c9a84c" : "#666",
                                    borderLeft: activeCategory === cat ? "2px solid #c9a84c" : "2px solid transparent",
                                    fontWeight: activeCategory === cat ? 600 : 400,
                                }}
                            >
                                {cat}
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: activeCategory === cat ? "#c9a84c" : "#f0f0f0",
                                        color: activeCategory === cat ? "#0f0f0f" : "#999",
                                    }}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
                <h4 className="text-lg font-serif font-bold text-gray-900 mb-5">Recent Posts</h4>
                <div className="flex flex-col gap-4">
                    {recent.map((post) => {
                        const src = coverSrc(post.image);
                        return (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3 items-start">
                                <div className="relative w-16 h-14 shrink-0 overflow-hidden bg-gray-100">
                                    {src && (
                                        <Image
                                            src={src}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="64px"
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-gray-900 group-hover:text-[#c9a84c] transition-colors duration-200 leading-snug line-clamp-2">
                                        {post.title}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{post.date}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
                <h4 className="text-lg font-serif font-bold text-gray-900 mb-5">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {topTags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] border border-gray-100 text-gray-500 px-2.5 py-1 uppercase tracking-wider cursor-default hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors duration-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-900 p-6 border-t-2 border-[#c9a84c]">
                <h4 className="text-lg font-serif font-bold text-white mb-2">Stay Updated</h4>
                <p className="text-white/50 text-xs leading-relaxed mb-5">
                    Get the latest real estate insights, project launches, and investment tips delivered to you.
                </p>
                <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm px-4 py-2.5 outline-none focus:border-[#c9a84c] transition-colors duration-200 mb-3"
                />
                <button className="w-full bg-[#c9a84c] text-gray-900 text-xs font-bold uppercase tracking-wider py-2.5 hover:bg-[#b8962e] transition-colors duration-200">
                    Subscribe →
                </button>
            </div>
        </aside>
    );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSection, setActiveSection] = useState("articles");

    const featuredPost = BLOG_POSTS.find((p) => p.featured);

    const filtered = useMemo(() => {
        let posts = BLOG_POSTS.filter((p) => !p.featured || activeCategory !== "All");
        if (activeCategory !== "All") {
            posts = BLOG_POSTS.filter((p) => p.category === activeCategory);
        } else {
            posts = BLOG_POSTS.filter((p) => !p.featured);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            posts = posts.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q)) ||
                    p.category.toLowerCase().includes(q)
            );
        }
        return posts;
    }, [activeCategory, searchQuery]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const ids = ["articles"];
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
                                <span className="text-[#c9a84c]">Blog</span>
                            </nav>
                            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">SpaceAge Group · Vadodara</div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                                Insights &
                                <br />
                                <span className="italic text-[#c9a84c]">Perspectives.</span>
                            </h1>
                            <div className="w-12 h-px bg-[#c9a84c] mb-8" />
                            <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                                Expert analysis, market trends, and investment wisdom from the leaders at SpaceAge Group.
                                Read the latest in Vadodara real estate.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-10">
                                <button onClick={() => scrollToSection("articles")} className="flex items-center gap-3 px-5 py-2.5 border border-gray-200 hover:border-[#c9a84c] transition-colors group">
                                    <span className="text-xl font-bold text-gray-900 group-hover:text-[#c9a84c] transition-colors font-serif">{BLOG_POSTS.length}</span>
                                    <span className="text-xs uppercase tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors">Articles</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JUMP NAV ──────────────────────────────────────────────── */}
                <JumpNav active={activeSection} onScroll={scrollToSection} />

                {/* ── FEATURED POST ─────────────────────────────────────────── */}
                {featuredPost && activeCategory === "All" && !searchQuery && (
                    <section className="bg-gray-900">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium">Editor's Pick</span>
                                <div className="h-px flex-1 bg-white/10 mx-6" />
                            </div>
                            <FeaturedCard post={featuredPost} />
                        </div>
                    </section>
                )}

                {/* ── ARTICLES SECTION ──────────────────────────────────────── */}
                <section id="articles" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="01" label="Latest Stories" title="From the Blog" subtitle="Expert analysis, market trends, and investment wisdom from the leaders at SpaceAge Group." />

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-12">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-xs font-medium px-4 py-2 border transition-all duration-200 ${activeCategory === cat ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"}`}
                                >
                                    {cat}
                                    {cat !== "All" && <span className="ml-1.5 text-[10px] opacity-60">({BLOG_POSTS.filter((p) => p.category === cat).length})</span>}
                                </button>
                            ))}
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="text-xs font-medium px-4 py-2 border border-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    Clear Search ✕
                                </button>
                            )}
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50">
                                <svg className="mx-auto mb-4 text-gray-300" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <p className="text-sm text-gray-400">No articles found. Try a different category or search term.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((post, idx) => (
                                    <BlogCard key={post.id} post={post} index={idx} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── CTA BANNER ────────────────────────────────────────────── */}
                <section className="bg-gray-900 border-t border-[#c9a84c] py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold block mb-3">Have a Question?</span>
                            <h2 className="text-white leading-tight text-2xl md:text-3xl font-serif font-bold">
                                Ready to Find Your Perfect Property?
                                <br />
                                <span className="italic text-[#c9a84c]">Let's talk.</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4 shrink-0">
                            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-4 bg-[#c9a84c] text-gray-900 hover:bg-[#b8962e] transition-colors">
                                Talk to Our Experts
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
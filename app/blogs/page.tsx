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

// ─── NEWSPAPER STYLES ────────────────────────────────────────────────────────

const npStyles = `
  @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IM+Fell+English:ital@0;1&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

  :root {
    --newsprint: #f5f0e8;
    --ink: #1a1008;
    --ink-faded: #4a3f30;
    --rule: #2a1f10;
    --gold: #c9a84c;
    --gold-muted: #b8962e;
    --column-gap: 1px solid #2a1f10;
  }

  .np-root {
    background-color: var(--newsprint);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    color: var(--ink);
    font-family: 'Libre Baskerville', Georgia, serif;
    min-height: 100vh;
  }

  .np-masthead-font { font-family: 'UnifrakturMaguntia', cursive; }
  .np-headline-font { font-family: 'Playfair Display', Georgia, serif; }
  .np-body-font    { font-family: 'IM Fell English', Georgia, serif; }

  /* Decorative rules */
  .rule-thick  { border-top: 3px solid var(--rule); }
  .rule-double { border-top: 3px double var(--rule); }
  .rule-thin   { border-top: 1px solid var(--rule); }
  .rule-bottom-thick { border-bottom: 3px solid var(--rule); }
  .rule-bottom-thin  { border-bottom: 1px solid var(--rule); }

  /* Newspaper column divider */
  .col-divide {
    column-gap: 24px;
    column-rule: var(--column-gap);
  }

  /* Clipping / torn paper effect on cards */
  .clipping {
    background: var(--newsprint);
    border: 1px solid #c8b89a;
    box-shadow:
      2px 2px 0 #c0a870,
      4px 4px 0 rgba(0,0,0,0.08),
      0 8px 32px rgba(0,0,0,0.12);
    position: relative;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .clipping:hover {
    transform: translateY(-3px) rotate(0.3deg);
    box-shadow:
      2px 2px 0 #c0a870,
      6px 10px 32px rgba(0,0,0,0.18);
  }

  /* Slight random tilt variants */
  .tilt-l { transform: rotate(-0.6deg); }
  .tilt-r { transform: rotate(0.5deg); }
  .tilt-l:hover { transform: rotate(-0.2deg) translateY(-3px); }
  .tilt-r:hover { transform: rotate(0.2deg) translateY(-3px); }

  /* Stamp / dateline */
  .dateline {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--ink-faded);
    text-transform: uppercase;
  }

  /* Category ribbon */
  .cat-ribbon {
    display: inline-block;
    background: var(--ink);
    color: var(--newsprint);
    font-family: 'Libre Baskerville', serif;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 3px 8px;
  }
  .cat-ribbon.gold {
    background: var(--gold);
    color: var(--ink);
  }

  /* Pull quote decoration */
  .pull-quote::before {
    content: '"';
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    line-height: 0.6;
    color: var(--gold);
    float: left;
    margin-right: 8px;
  }

  /* Masthead ornament lines */
  .masthead-ornament {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--ink);
  }
  .masthead-ornament::before,
  .masthead-ornament::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--ink);
  }

  /* Photo caption style */
  .photo-caption {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 0.68rem;
    color: var(--ink-faded);
    border-top: 1px solid #b0a090;
    padding-top: 4px;
    margin-top: 4px;
  }

  /* Aged photo effect */
  .aged-photo {
    filter: sepia(25%) contrast(1.05) brightness(0.97);
  }

  /* Scissors cut line on featured */
  .scissors-border {
    border: 2px dashed #a09070;
    padding: 2px;
  }

  /* Animated fade-in for reveal */
  @keyframes np-reveal {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .np-reveal { animation: np-reveal 0.6s ease forwards; }

  /* Input newspaper style */
  .np-input {
    background: rgba(255,255,255,0.4);
    border: 1px solid #a09070;
    font-family: 'IM Fell English', serif;
    font-style: italic;
    color: var(--ink);
    outline: none;
    width: 100%;
    padding: 8px 12px;
    font-size: 0.875rem;
  }
  .np-input:focus { border-color: var(--gold); background: rgba(255,255,255,0.7); }
  .np-input::placeholder { color: #9a8878; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--newsprint); }
  ::-webkit-scrollbar-thumb { background: #a09070; }
`;

// ─── REVEAL SECTION ─────────────────────────────────────────────────────────

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(22px)";
        el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
            { threshold: 0.06 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);
    return <div ref={ref} className={className}>{children}</div>;
}

// ─── AUTHOR AVATAR ──────────────────────────────────────────────────────────

function AuthorAvatar({ name, size = 34 }: { name: string; size?: number }) {
    const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    return (
        <div
            className="shrink-0 flex items-center justify-center rounded-full font-bold text-white"
            style={{ width: size, height: size, backgroundColor: "#c9a84c", fontSize: size < 36 ? 10 : 12, fontFamily: "'Libre Baskerville', serif" }}
        >
            {initials}
        </div>
    );
}

// ─── TODAY'S DATE ────────────────────────────────────────────────────────────

function TodayDate() {
    const d = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    return <span>{d}</span>;
}

// ─── MASTHEAD ────────────────────────────────────────────────────────────────

function Masthead() {
    return (
        <header style={{ borderBottom: "4px double #2a1f10" }} className="pb-4 mb-0">
            {/* Top info bar */}
            <div className="flex flex-wrap items-center justify-between px-4 sm:px-8 py-2" style={{ borderBottom: "1px solid #2a1f10", fontSize: "0.65rem", fontFamily: "'IM Fell English', serif", color: "#4a3f30", fontStyle: "italic" }}>
                <span><TodayDate /></span>
                <span className="hidden sm:inline" style={{ letterSpacing: "0.15em", textTransform: "uppercase", fontStyle: "normal", fontFamily: "'Libre Baskerville', serif", fontSize: "0.55rem" }}>Est. 2005 · Vadodara, Gujarat</span>
                <span>Vol. XIX · No. 42</span>
            </div>

            {/* Masthead title */}
            <div className="text-center px-4 py-6 sm:py-8">
                <div className="masthead-ornament mb-3 px-4 sm:px-12">
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Libre Baskerville', serif" }}>SpaceAge Group</span>
                </div>
                <h1 className="np-masthead-font" style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1, color: "#1a1008", letterSpacing: "-0.01em" }}>
                    The Property Gazette
                </h1>
                <div className="masthead-ornament mt-3 px-4 sm:px-12">
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Libre Baskerville', serif" }}>Vadodara's Premier Real Estate Journal</span>
                </div>
            </div>

            {/* Nav bar */}
            <div className="flex flex-wrap items-center justify-center gap-0 px-4" style={{ borderTop: "1px solid #2a1f10", borderBottom: "1px solid #2a1f10" }}>
                {["Home", "Projects", "Blog", "Community", "Contact"].map((item, i) => (
                    <Link
                        key={item}
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className="px-4 sm:px-6 py-2 text-center transition-colors hover:bg-amber-900/10"
                        style={{
                            fontFamily: "'Libre Baskerville', serif",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: item === "Blog" ? "#c9a84c" : "#1a1008",
                            borderRight: i < 4 ? "1px solid #2a1f10" : "none",
                        }}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </header>
    );
}

// ─── FEATURED CARD (newspaper front-page style) ─────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
    const src = coverSrc(post.image);

    return (
        <Link href={`/blog/${post.slug}`} className="group block scissors-border clipping" style={{ background: "#f5f0e8" }}>
            <div className="p-4 sm:p-6">
                {/* Header of clipping */}
                <div className="flex items-center justify-between mb-3" style={{ borderBottom: "2px solid #2a1f10", paddingBottom: "8px" }}>
                    <span className="cat-ribbon gold">{post.category}</span>
                    <span className="dateline">{post.date} · {post.readTime}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image */}
                    {src && (
                        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                            <Image src={src} alt={post.title} fill className="object-cover aged-photo" />
                            <div className="photo-caption absolute bottom-0 left-0 right-0 bg-amber-50/90 px-2 pb-1">
                                Above: Manjusar Industrial Corridor · SpaceAge Group
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="text-center mb-3" style={{ borderBottom: "1px solid #a09070", paddingBottom: "6px" }}>
                                <span style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.7rem", color: "#4a3f30", letterSpacing: "0.1em" }}>
                                    ✦ Editor's Selection ✦
                                </span>
                            </div>
                            <h2 className="np-headline-font group-hover:text-amber-800 transition-colors"
                                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem", color: "#1a1008" }}>
                                {post.title}
                            </h2>
                            <p className="np-body-font" style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#3a2f20" }}>
                                {post.excerpt}
                            </p>
                        </div>
                        <div className="mt-4 pt-3 flex items-center gap-3" style={{ borderTop: "1px solid #a09070" }}>
                            <AuthorAvatar name={post.author} />
                            <div>
                                <p style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, fontSize: "0.75rem", color: "#1a1008" }}>{post.author}</p>
                                <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.65rem", color: "#6a5a48" }}>{post.authorRole}</p>
                            </div>
                            <span className="ml-auto np-headline-font group-hover:translate-x-1 transition-transform"
                                style={{ color: "#c9a84c", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                                Read Full Story →
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tags as keywords */}
                <div className="mt-4 pt-3 flex flex-wrap gap-2" style={{ borderTop: "1px dashed #a09070" }}>
                    <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6a5a48" }}>KEYWORDS:</span>
                    {post.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.68rem", color: "#4a3f30" }}>{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

// ─── BLOG CARD (newspaper clipping) ─────────────────────────────────────────

const TILT_CLASSES = ["tilt-l", "", "tilt-r", "", "tilt-l", "tilt-r", "", "tilt-l"];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const src = coverSrc(post.image);
    const tilt = TILT_CLASSES[index % TILT_CLASSES.length];

    return (
        <RevealSection delay={index * 55}>
            <Link href={`/blog/${post.slug}`} className={`group block clipping ${tilt}`} style={{ background: "#f5f0e8" }}>
                <div className="p-4">
                    {/* Clipping top rule */}
                    <div className="flex items-center justify-between mb-2" style={{ borderBottom: "2px solid #2a1f10", paddingBottom: "6px" }}>
                        <span className="cat-ribbon">{post.category}</span>
                        <span className="dateline">{post.readTime}</span>
                    </div>

                    {/* Photo */}
                    {src && (
                        <div className="relative overflow-hidden mb-3 aged-photo" style={{ aspectRatio: "16/9" }}>
                            <Image src={src} alt={post.title} fill className="object-cover" />
                        </div>
                    )}
                    {!src && (
                        <div className="mb-3 flex items-center justify-center" style={{ aspectRatio: "16/9", background: "#e8e0cc", border: "1px solid #c8b89a" }}>
                            <span style={{ fontFamily: "'UnifrakturMaguntia', cursive", fontSize: "1.8rem", color: "#a09070", opacity: 0.5 }}>✦</span>
                        </div>
                    )}

                    {/* Dateline */}
                    <p className="dateline mb-2">{post.date} — Vadodara</p>

                    {/* Headline */}
                    <h3 className="np-headline-font group-hover:text-amber-800 transition-colors mb-2"
                        style={{ fontSize: "1.05rem", fontWeight: 900, lineHeight: 1.2, color: "#1a1008" }}>
                        {post.title}
                    </h3>

                    {/* Thin rule */}
                    <div style={{ borderTop: "1px solid #a09070", margin: "8px 0" }} />

                    {/* Excerpt */}
                    <p className="np-body-font line-clamp-3" style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#3a2f20" }}>
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: "1px dashed #a09070" }}>
                        <AuthorAvatar name={post.author} size={28} />
                        <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, fontSize: "0.68rem", color: "#1a1008", lineHeight: 1.2 }}>{post.author}</p>
                            <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.6rem", color: "#6a5a48" }}>{post.authorRole.split("·")[0].trim()}</p>
                        </div>
                        <span className="np-headline-font shrink-0 group-hover:translate-x-0.5 transition-transform"
                            style={{ color: "#c9a84c", fontWeight: 700, fontSize: "0.68rem" }}>
                            Read →
                        </span>
                    </div>
                </div>
            </Link>
        </RevealSection>
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
    const tagCount = allTags.reduce<Record<string, number>>((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {});
    const topTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([tag]) => tag);

    const SideWidget = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="clipping" style={{ background: "#f5f0e8", marginBottom: "20px" }}>
            <div className="p-4">
                <div style={{ borderBottom: "2px solid #2a1f10", paddingBottom: "6px", marginBottom: "12px" }}>
                    <h4 className="np-headline-font" style={{ fontSize: "1rem", fontWeight: 900, color: "#1a1008" }}>{title}</h4>
                </div>
                {children}
            </div>
        </div>
    );

    return (
        <aside>
            {/* Search */}
            <SideWidget title="Search the Archive">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9a8878" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search articles..."
                        className="np-input"
                        style={{ paddingLeft: "2rem" }}
                    />
                </div>
            </SideWidget>

            {/* Categories */}
            <SideWidget title="Sections">
                <div className="flex flex-col gap-0.5">
                    {CATEGORIES.map((cat) => {
                        const count = cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length;
                        const isActive = activeCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => onCategory(cat)}
                                className="flex items-center justify-between py-2 px-2 text-left transition-colors"
                                style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: "0.72rem",
                                    fontWeight: isActive ? 700 : 400,
                                    color: isActive ? "#c9a84c" : "#3a2f20",
                                    background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                                    borderLeft: isActive ? "3px solid #c9a84c" : "3px solid transparent",
                                    borderBottom: "1px dashed #c8b89a",
                                }}
                            >
                                {cat}
                                <span style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: "0.6rem",
                                    background: isActive ? "#c9a84c" : "#d8ceb8",
                                    color: isActive ? "#1a1008" : "#6a5a48",
                                    padding: "1px 6px",
                                    borderRadius: "2px",
                                }}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </SideWidget>

            {/* Recent Posts */}
            <SideWidget title="Recent Dispatches">
                <div className="flex flex-col gap-3">
                    {recent.map((post) => {
                        const src = coverSrc(post.image);
                        return (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3 items-start" style={{ borderBottom: "1px dashed #c8b89a", paddingBottom: "10px" }}>
                                {src && (
                                    <div className="relative w-14 h-12 shrink-0 overflow-hidden aged-photo" style={{ border: "1px solid #a09070" }}>
                                        <Image src={src} alt={post.title} fill className="object-cover" sizes="56px" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="np-headline-font group-hover:text-amber-800 transition-colors line-clamp-2"
                                        style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1a1008", lineHeight: 1.3 }}>
                                        {post.title}
                                    </p>
                                    <p className="dateline mt-1">{post.date}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </SideWidget>

            {/* Tags */}
            <SideWidget title="Popular Topics">
                <div className="flex flex-wrap gap-1.5">
                    {topTags.map((tag) => (
                        <span key={tag}
                            style={{
                                fontFamily: "'IM Fell English', serif",
                                fontStyle: "italic",
                                fontSize: "0.68rem",
                                border: "1px solid #a09070",
                                color: "#4a3f30",
                                padding: "2px 7px",
                                background: "rgba(255,255,255,0.3)",
                                cursor: "default",
                            }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </SideWidget>

            {/* Newsletter */}
            <div className="clipping" style={{ background: "#1a1008", borderColor: "#c9a84c" }}>
                <div className="p-5">
                    <div style={{ borderBottom: "1px solid #c9a84c", marginBottom: "10px", paddingBottom: "8px" }}>
                        <h4 className="np-headline-font" style={{ color: "#c9a84c", fontSize: "1rem", fontWeight: 900 }}>Subscribe to The Gazette</h4>
                    </div>
                    <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.6, marginBottom: "12px" }}>
                        Receive the latest real estate insights, project launches, and investment tips delivered to your door.
                    </p>
                    <input type="email" placeholder="Your email address" className="np-input mb-3"
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(201,168,76,0.3)", color: "#f5f0e8" }} />
                    <button className="w-full transition-colors hover:opacity-90"
                        style={{ background: "#c9a84c", color: "#1a1008", fontFamily: "'Libre Baskerville', serif", fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "10px" }}>
                        Subscribe Now ✦
                    </button>
                </div>
            </div>
        </aside>
    );
}

// ─── JUMP NAV ───────────────────────────────────────────────────────────────

function JumpNav({ active, onScroll }: { active: string; onScroll: (id: string) => void }) {
    return (
        <div className="sticky top-0 sm:top-[72px] z-30" style={{ background: "#1a1008", borderBottom: "2px solid #c9a84c" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between overflow-x-auto">
                    <button
                        onClick={() => onScroll("articles")}
                        className="flex items-center gap-2 py-3 px-4"
                        style={{
                            fontFamily: "'Libre Baskerville', serif",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: active === "articles" ? "#c9a84c" : "rgba(245,240,232,0.6)",
                            borderBottom: active === "articles" ? "2px solid #c9a84c" : "2px solid transparent",
                        }}
                    >
                        Latest Articles
                        <span style={{ background: "#c9a84c", color: "#1a1008", fontSize: "0.55rem", fontWeight: 900, padding: "1px 5px" }}>
                            {BLOG_POSTS.length}
                        </span>
                    </button>
                    <span style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.68rem", color: "rgba(245,240,232,0.4)" }} className="hidden sm:inline">
                        {BLOG_POSTS.length} Editions Published
                    </span>
                </div>
            </div>
        </div>
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
        const el = document.getElementById("articles");
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection("articles"); }, { rootMargin: "-30% 0px -60% 0px" });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <LayoutWrapper>
            {/* Inject newspaper CSS */}
            <style dangerouslySetInnerHTML={{ __html: npStyles }} />

            <div className="np-root">
                {/* ── MASTHEAD ─────────────────────────────────────────────────── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <Masthead />
                </div>

                {/* ── JUMP NAV ──────────────────────────────────────────────────── */}
                <JumpNav active={activeSection} onScroll={scrollToSection} />

                {/* ── HERO / PAGE TITLE ─────────────────────────────────────────── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                    <div className="text-center pb-4" style={{ borderBottom: "3px double #2a1f10" }}>
                        <nav className="flex items-center justify-center gap-2 mb-2" style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.7rem", color: "#6a5a48" }}>
                            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
                            <span>›</span>
                            <span style={{ color: "#c9a84c" }}>Blog</span>
                        </nav>
                        <h2 className="np-headline-font" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 900, color: "#1a1008", lineHeight: 1.1 }}>
                            Insights &amp; Perspectives
                        </h2>
                        <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#6a5a48", marginTop: "6px" }}>
                            Expert analysis, market trends, and investment wisdom from the leaders at SpaceAge Group
                        </p>
                    </div>
                </div>

                {/* ── FEATURED POST ─────────────────────────────────────────────── */}
                {featuredPost && activeCategory === "All" && !searchQuery && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div style={{ borderTop: "1px solid #2a1f10", flex: 1 }} />
                            <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#1a1008" }}>
                                ✦ Front Page Story ✦
                            </span>
                            <div style={{ borderTop: "1px solid #2a1f10", flex: 1 }} />
                        </div>
                        <FeaturedCard post={featuredPost} />
                    </div>
                )}

                {/* ── MAIN CONTENT + SIDEBAR ────────────────────────────────────── */}
                <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ scrollMarginTop: "80px" }}>

                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-6">
                        <div style={{ borderTop: "3px solid #2a1f10", flex: 1 }} />
                        <span className="np-headline-font" style={{ fontSize: "1rem", fontWeight: 900, color: "#1a1008", whiteSpace: "nowrap" }}>
                            Latest Dispatches
                        </span>
                        <div style={{ borderTop: "3px solid #2a1f10", flex: 1 }} />
                    </div>

                    {/* Category filter – pill style on newsprint */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: "0.6rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    padding: "5px 12px",
                                    border: "1px solid #2a1f10",
                                    background: activeCategory === cat ? "#1a1008" : "transparent",
                                    color: activeCategory === cat ? "#f5f0e8" : "#2a1f10",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                            >
                                {cat}
                                {cat !== "All" && (
                                    <span style={{ marginLeft: "5px", opacity: 0.6, fontSize: "0.55rem" }}>
                                        ({BLOG_POSTS.filter((p) => p.category === cat).length})
                                    </span>
                                )}
                            </button>
                        ))}
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                style={{
                                    fontFamily: "'Libre Baskerville', serif",
                                    fontSize: "0.6rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    padding: "5px 12px",
                                    border: "1px solid #a09070",
                                    background: "transparent",
                                    color: "#6a5a48",
                                    cursor: "pointer",
                                }}
                            >
                                Clear ✕
                            </button>
                        )}
                    </div>

                    {/* Two-column layout: articles + sidebar */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-8 lg:gap-10">

                        {/* Articles grid */}
                        <div>
                            {filtered.length === 0 ? (
                                <div className="clipping text-center py-16" style={{ background: "#f5f0e8" }}>
                                    <p className="np-headline-font" style={{ fontSize: "1.2rem", color: "#6a5a48" }}>No stories found</p>
                                    <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.8rem", color: "#a09070", marginTop: "6px" }}>
                                        Try a different section or search term.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {filtered.map((post, idx) => (
                                        <BlogCard key={post.id} post={post} index={idx} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:border-l lg:pl-8" style={{ borderColor: "#2a1f10" }}>
                            <Sidebar
                                posts={BLOG_POSTS}
                                activeCategory={activeCategory}
                                onCategory={setActiveCategory}
                                searchQuery={searchQuery}
                                onSearch={setSearchQuery}
                            />
                        </div>
                    </div>
                </section>

                {/* ── CTA BANNER ────────────────────────────────────────────────── */}
                <section style={{ background: "#1a1008", borderTop: "3px solid #c9a84c", borderBottom: "3px solid #c9a84c" }} className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "8px" }}>
                                ✦ Have a Question? ✦
                            </div>
                            <h2 className="np-headline-font" style={{ color: "#f5f0e8", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, lineHeight: 1.2 }}>
                                Ready to Find Your Perfect Property?
                                <br />
                                <span style={{ fontStyle: "italic", color: "#c9a84c" }}>Let's talk.</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4 shrink-0">
                            <Link href="/contact"
                                className="inline-flex items-center gap-2 transition-colors hover:opacity-90"
                                style={{ background: "#c9a84c", color: "#1a1008", fontFamily: "'Libre Baskerville', serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 28px" }}>
                                Talk to Our Experts →
                            </Link>
                            <Link href="/projects"
                                className="inline-flex items-center gap-2 transition-colors"
                                style={{ background: "transparent", color: "#f5f0e8", fontFamily: "'Libre Baskerville', serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 28px", border: "1px solid rgba(245,240,232,0.25)" }}>
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
// app/blog/[slug]/page.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";
import DevDataToggle from "@/components/DevDataToggle/DevDataToggle";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function coverSrc(src: string | undefined): string | null {
    return src && src.trim() !== "" ? src : null;
}

const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// ─── TYPES ───────────────────────────────────────────────────────────────────

type BlogCategory = "All" | "News" | "Events" | "Investment" | "Real Estate Tips" | "Community";

interface BlogPost {
    id: number | string;
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
    videoUrl?: string;
    allowLikes?: boolean;
    allowComments?: boolean;
    likesCount?: number;
}

interface CommentItem {
    _id: string;
    authorName: string;
    content: string;
    createdAt: string;
}

// ─── MOCK DATA FALLBACK ──────────────────────────────────────────────────────

const MOCK_POSTS: BlogPost[] = [
    {
        id: 1,
        slug: "investment-opportunity-manjusar",
        title: "Investment Opportunity in Manjusar – Fastest Growing Industrial Area",
        excerpt:
            "Manjusar is emerging as Vadodara's most promising investment corridor. With rapid infrastructure expansion, GIDC proximity, and rising commercial demand, this is the opportunity investors have been waiting for.",
        content: "Manjusar is emerging as Vadodara's most promising investment corridor. With rapid infrastructure expansion, GIDC proximity, and rising commercial demand, this is the opportunity investors have been waiting for.\n\nOver the last decade, Vadodara's industrial footprint has expanded exponentially. At the heart of this industrial boom lies Manjusar, a location that has quickly transitioned from a quiet suburb into Gujarat's fastest-growing manufacturing and engineering cluster.\n\n### Strategic Connectivity\n\nOne of the primary drivers of Manjusar's growth is its exceptional geographical positioning. Situated with direct access to major state highways and connecting links to the upcoming Delhi-Mumbai Industrial Corridor (DMIC), logistics and transit times are minimal. For manufacturing units, logistics companies, and warehousing enterprises, this provides a massive structural advantage.\n\n### Industrial Ecosystem\n\nThe presence of the Gujarat Industrial Development Corporation (GIDC) estate in Manjusar has attracted multinational corporations and domestic industry giants alike. From pharmaceutical formulation units to heavy engineering and automotive components, the diverse industrial base creates a robust ecosystem that supports ancillary businesses and commercial real estate development.\n\n### High Yield Investment Potential\n\nFor real estate investors, Manjusar offers a rare combination of high rental yields and strong capital appreciation. Industrial plotting and commercial warehousing demand has driven land valuations up steadily over the past three years. As infrastructure upgrades continue, including improved power distribution and water supply pipelines, this upward trajectory is projected to sustain.",
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
        content: "As city water supply becomes increasingly strained, groundwater availability is fast becoming one of the most critical factors in property valuation. Here's how to evaluate it before you buy.\n\nWhen evaluating real estate, buyers traditionally look at location, pricing, and amenities. However, in rapid development zones across Vadodara, water security is quietly emerging as the single most critical factor dictating long-term property satisfaction and value appreciation.\n\n### The Challenge of Rapid Urbanization\n\nVadodara's outward expansion has outpaced municipal water connection pipelines in several new sectors. Consequently, housing societies and commercial hubs rely heavily on local groundwater. Properties with depleting water tables or poor groundwater quality face massive operational challenges, often forcing residents to rely on expensive water tankers.\n\n### How to Verify Water Security Before Buying\n\n1. **Conduct a Hydrogeological Assessment:** Ask the developer for the water table report. A healthy aquifer depth of under 150 feet is highly desirable.\n2. **Check TDS Levels:** Test the groundwater's Total Dissolved Solids (TDS). Ideal residential levels are below 500 ppm. Anything over 1500 ppm requires industrial-grade RO treatment systems, which increase maintenance costs.\n3. **Rainwater Harvesting Systems:** Verify if the project integrates active recharge wells. Groundwater recharge is no longer an optional green feature; it is essential to long-term community survival.",
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
        content: "In an era of rising apartment prices and shrinking carpet areas, buying a plot remains the most flexible, appreciating, and legacy-building investment you can make in real estate.\n\nFor generations, land has been the ultimate wealth-builder. While modern investment portfolios are filled with complex financial instruments, the simplicity and power of land ownership remain unmatched. At Space Age Group, we examine why buying a plot outperforms vertical spaces over long investment horizons.\n\n### 100% Ownership Control\n\nWhen you buy an apartment, you own a share of an undivided land structure, but you have no independent rights to the physical soil. A plot gives you absolute ownership. You have the freedom to design, construct, expand, and modify your structure in accordance with local regulations whenever you choose.\n\n### Lower Initial Outflow, Higher Appreciation\n\nPlots generally carry a lower entry price point compared to built-up residential structures in similar localities. However, historical data shows that land appreciates at a significantly faster rate than apartments. Buildings depreciate as they age, requiring constant repairs, whereas land values grow organically with surrounding infrastructure growth.",
        category: "Real Estate Tips",
        author: "Ajab Zabuawala",
        authorRole: "Director, ME Structure · MBA Finance",
        date: "January 2, 2023",
        readTime: "6 min read",
        image: "/images/blog/plot.jpg",
        tags: ["Plot Investment", "Real Estate", "Appreciation", "Tips"],
    },
];

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
    column-gap: 32px;
    column-rule: var(--column-gap);
  }

  .dateline {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    color: var(--ink-faded);
    text-transform: uppercase;
  }

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

  .pull-quote::before {
    content: '"';
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    line-height: 0.6;
    color: var(--gold);
    float: left;
    margin-right: 8px;
  }

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

  .photo-caption {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 0.75rem;
    color: var(--ink-faded);
    border-top: 1px solid #b0a090;
    padding-top: 6px;
    margin-top: 6px;
  }

  .aged-photo {
    filter: sepia(25%) contrast(1.05) brightness(0.97);
  }

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
`;

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [useMock, setUseMock] = useState(true);
    const [dbPost, setDbPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Likes & comments state
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState<CommentItem[]>([]);
    
    // Comment form inputs
    const [commentForm, setCommentForm] = useState({ name: "", email: "", content: "" });
    const [commentSubmitting, setCommentSubmitting] = useState(false);

    useEffect(() => {
        setUseMock(localStorage.getItem("use_mock_data") === "true");
    }, []);

    useEffect(() => {
        setLoading(true);
        if (useMock) {
            setLoading(false);
            return;
        }

        const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';

        // Fetch dynamic blog data from backend API
        fetch(`${adminApiUrl}/api/blog/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error("Post not found");
                return res.json();
            })
            .then(data => {
                setDbPost(data);
                setLikes(data.likesCount || 0);
                // Fetch comments
                return fetch(`${adminApiUrl}/api/blog/${data._id}/engagement`);
            })
            .then(res => res ? res.json() : [])
            .then(commentData => {
                if (Array.isArray(commentData)) setComments(commentData);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug, useMock]);

    // Compute post data
    const post = useMemo<BlogPost | null>(() => {
        const mockMatch = MOCK_POSTS.find(p => p.slug === slug);
        if (useMock) {
            return mockMatch || MOCK_POSTS[0];
        }

        if (!dbPost) return mockMatch || null;

        return {
            id: dbPost._id,
            slug: dbPost.slug,
            title: dbPost.title,
            excerpt: dbPost.excerpt || dbPost.description?.substring(0, 180) + '...',
            content: dbPost.description,
            category: dbPost.category as BlogCategory,
            author: dbPost.author || "Space Age Group",
            authorRole: dbPost.authorRole || "Media & Communications",
            date: new Date(dbPost.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            readTime: dbPost.readTime || "5 min read",
            image: dbPost.image?.url || "/images/blog/manjusar.jpg",
            tags: Array.isArray(dbPost.tags) ? dbPost.tags : [],
            videoUrl: dbPost.videoUrl,
            allowLikes: dbPost.settings?.allowLikes !== false,
            allowComments: dbPost.settings?.allowComments !== false,
            likesCount: dbPost.likesCount || 0
        };
    }, [useMock, dbPost, slug]);

    // Sync initial likes
    useEffect(() => {
        if (post && !useMock) {
            setLikes(post.likesCount || 0);
        } else if (post && useMock) {
            setLikes(14); // Fixed mock likes
        }
    }, [post, useMock]);

    const handleLike = async () => {
        if (hasLiked || useMock || !post) return;
        setHasLiked(true);
        setLikes(prev => prev + 1);

        try {
            const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
            const res = await fetch(`${adminApiUrl}/api/blog/${post.id}/engagement`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "like" })
            });
            if (!res.ok) throw new Error("Like failed");
        } catch (err) {
            console.error(err);
            setLikes(prev => prev - 1);
            setHasLiked(false);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentForm.name.trim() || !commentForm.content.trim() || useMock || !post) return;
        setCommentSubmitting(true);

        try {
            const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
            const res = await fetch(`${adminApiUrl}/api/blog/${post.id}/engagement`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "comment",
                    authorName: commentForm.name,
                    authorEmail: commentForm.email,
                    content: commentForm.content
                })
            });
            if (!res.ok) throw new Error("Failed to post comment");
            const newComment = await res.json();
            setComments(prev => [newComment, ...prev]);
            setCommentForm({ name: "", email: "", content: "" });
        } catch (err) {
            console.error(err);
            alert("Error publishing comment. Please try again.");
        } finally {
            setCommentSubmitting(false);
        }
    };

    if (loading) {
        return (
            <LayoutWrapper>
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0e8] gap-3">
                    <div className="w-8 h-8 border-4 border-amber-900/30 border-t-amber-950 rounded-full animate-spin" />
                    <span className="text-xs font-serif italic text-amber-900/70">Unrolling print scrolls…</span>
                </div>
            </LayoutWrapper>
        );
    }

    if (!post) {
        return (
            <LayoutWrapper>
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f0e8] p-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Dispatch Missing</h2>
                    <p className="text-sm font-serif italic text-gray-500 mb-6">The requested edition is not found in our archive files.</p>
                    <Link href="/blogs" className="px-6 py-2.5 bg-gray-950 text-white text-xs tracking-wider uppercase font-semibold hover:bg-gray-800 transition-colors">
                        ← Return to Gazette
                    </Link>
                </div>
            </LayoutWrapper>
        );
    }

    const youtubeId = post.videoUrl ? getYoutubeId(post.videoUrl) : null;

    return (
        <LayoutWrapper>
            <style dangerouslySetInnerHTML={{ __html: npStyles }} />

            <div className="np-root pb-24">
                {/* ── Masthead bar ── */}
                <div className="max-w-4xl mx-auto px-4 pt-8">
                    <header style={{ borderBottom: "4px double #2a1f10" }} className="pb-4 mb-8">
                        <div className="flex items-center justify-between py-1 text-[10px] uppercase font-bold tracking-widest text-[#4a3f30]" style={{ borderBottom: "1px solid #2a1f10" }}>
                            <Link href="/blogs" className="hover:text-amber-800 transition-colors flex items-center gap-1">
                                ✕ Close Article
                            </Link>
                            <span>The Property Gazette</span>
                            <span>{post.date}</span>
                        </div>
                    </header>

                    {/* Back Arrow link */}
                    <div className="mb-6">
                        <Link href="/blogs" className="inline-flex items-center gap-1.5 text-xs text-amber-900/60 hover:text-amber-900 font-bold font-serif transition-colors">
                            ← Return to Archives
                        </Link>
                    </div>

                    {/* Article Headline */}
                    <span className="cat-ribbon mb-4">{post.category}</span>
                    <h1 className="np-headline-font text-3xl md:text-5xl font-black text-gray-950 leading-tight mb-4">
                        {post.title}
                    </h1>

                    {/* Short Teaser Excerpt */}
                    <p className="text-lg text-gray-800 font-serif italic mb-6 leading-relaxed border-l-2 border-[#c9a84c] pl-4">
                        {post.excerpt}
                    </p>

                    {/* Author Dateline */}
                    <div className="flex items-center gap-3 py-4 border-y border-dashed border-[#a09070] mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#c9a84c] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {post.author.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <p className="font-bold text-sm text-gray-950">{post.author}</p>
                            <p className="text-[10px] font-serif italic text-gray-600 leading-none mt-0.5">{post.authorRole}</p>
                        </div>
                        <span className="ml-auto text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                            {post.readTime}
                        </span>
                    </div>

                    {/* Main Image Illustration */}
                    {post.image && (
                        <div className="mb-8 bg-white border border-[#c8b89a] p-3 shadow-md">
                            <div className="relative aspect-video overflow-hidden aged-photo">
                                <Image 
                                    src={post.image} 
                                    alt={post.title} 
                                    fill 
                                    className="object-cover" 
                                    priority
                                />
                            </div>
                            <div className="photo-caption text-center mt-2.5">
                                Illustration: {post.title} · Reported by {post.author}
                            </div>
                        </div>
                    )}

                    {/* Body Content Column */}
                    <article className="prose max-w-none text-gray-950 font-serif text-base leading-[1.8] space-y-6">
                        {post.content.split("\n\n").map((para, idx) => {
                            if (para.startsWith("###")) {
                                return (
                                    <h3 key={idx} className="np-headline-font text-xl md:text-2xl font-bold mt-8 mb-4 border-b border-gray-900 pb-1.5 pt-2 text-gray-950">
                                        {para.replace("###", "").trim()}
                                    </h3>
                                );
                            }
                            if (para.startsWith("1.") || para.startsWith("2.") || para.startsWith("3.")) {
                                return (
                                    <div key={idx} className="pl-4 border-l border-amber-900/30 py-1 my-2 bg-amber-50/10 italic text-gray-800">
                                        {para}
                                    </div>
                                );
                            }
                            return (
                                <p key={idx} className="first-letter:font-serif first-letter:text-3xl first-letter:font-bold first-letter:text-gray-950 first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                                    {para}
                                </p>
                            );
                        })}
                    </article>

                    {/* Youtube Video Embed Frame */}
                    {youtubeId && (
                        <div className="my-10 bg-white border border-[#c8b89a] p-3 shadow-md">
                            <div className="aspect-video relative overflow-hidden">
                                <iframe 
                                    className="absolute inset-0 w-full h-full" 
                                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0`} 
                                    title={post.title} 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen 
                                />
                            </div>
                            <div className="photo-caption text-center mt-2.5">
                                Supplemental Media: Associated Video Broadcast Footage
                            </div>
                        </div>
                    )}

                    {/* Likes Heart Button Section */}
                    {post.allowLikes !== false && (
                        <div className="my-12 py-6 border-t border-b border-gray-950 flex flex-col items-center justify-center gap-2">
                            <button
                                onClick={handleLike}
                                disabled={hasLiked}
                                className={`w-14 h-14 rounded-full border border-gray-900 flex items-center justify-center transition-all ${
                                    hasLiked ? "bg-rose-500 text-white border-rose-600 cursor-default" : "bg-white text-gray-900 hover:bg-rose-50 hover:text-rose-600 hover:scale-105"
                                }`}
                            >
                                <svg 
                                    className="w-6 h-6" 
                                    fill={hasLiked ? "currentColor" : "none"} 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth={2}
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                    />
                                </svg>
                            </button>
                            <span className="text-xs uppercase font-bold tracking-widest text-gray-900">
                                {likes} Likes
                            </span>
                        </div>
                    )}

                    {/* Tags section */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-12">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Index Keywords:</span>
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs italic font-serif text-gray-800 border border-gray-400 px-2 py-0.5 bg-white/40">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Comments Section */}
                    {post.allowComments !== false && (
                        <div className="mt-12 pt-8 border-t border-gray-950">
                            <h3 className="np-headline-font text-2xl font-black text-gray-950 mb-6">
                                Reader Discussions ({comments.length})
                            </h3>

                            {/* Comment post form */}
                            <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8 bg-white/40 border border-[#c8b89a] p-5">
                                <span className="text-xs uppercase font-bold tracking-widest text-[#4a3f30] block mb-2">Publish a Response</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text"
                                        required
                                        value={commentForm.name}
                                        onChange={e => setCommentForm({ ...commentForm, name: e.target.value })}
                                        placeholder="Your Name"
                                        disabled={useMock}
                                        className="np-input"
                                    />
                                    <input 
                                        type="email"
                                        value={commentForm.email}
                                        onChange={e => setCommentForm({ ...commentForm, email: e.target.value })}
                                        placeholder="Email Address (Will not be shown)"
                                        disabled={useMock}
                                        className="np-input"
                                    />
                                </div>
                                <textarea 
                                    rows={4}
                                    required
                                    value={commentForm.content}
                                    onChange={e => setCommentForm({ ...commentForm, content: e.target.value })}
                                    placeholder="Share your perspective on this article..."
                                    disabled={useMock}
                                    className="np-input resize-none"
                                />
                                <button 
                                    type="submit"
                                    disabled={commentSubmitting || useMock}
                                    className="px-6 py-2.5 bg-gray-900 text-white font-serif italic text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                                >
                                    {commentSubmitting ? "Printing Response…" : useMock ? "Discussions disabled in demo mode" : "Publish Comment ✦"}
                                </button>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {comments.length === 0 ? (
                                    <p className="text-sm font-serif italic text-gray-500 py-4 text-center">No comments have been posted on this edition yet.</p>
                                ) : (
                                    comments.map((comm) => (
                                        <div key={comm._id} className="border-b border-[#c8b89a]/60 pb-4 mb-4">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-bold text-sm text-gray-950">{comm.authorName}</span>
                                                <span className="text-[10px] text-gray-500 font-serif italic">
                                                    {new Date(comm.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-800 leading-relaxed font-serif">
                                                {comm.content}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <DevDataToggle />
            </div>

            <Footer />
        </LayoutWrapper>
    );
}

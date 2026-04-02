// app/services/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
    {
        id: "residential-development",
        number: "01",
        category: "Core Development",
        title: "Residential Development",
        tagline: "Homes that hold generations.",
        description:
            "From plotted townships to high-rise apartments — we design, build and deliver residential spaces rooted in Vadodara's lifestyle, climate, and community fabric. Every unit is built with RERA compliance, quality materials, and timely delivery guarantees.",
        stats: [{ value: "3000+", label: "Homes Delivered" }, { value: "25+", label: "Years Building" }],
        features: ["RERA Registered Projects", "Vastu-Compliant Layouts", "Gated Township Planning", "Pre-Primary to Senior Living"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 42V20L24 6l18 14v22H30V30h-12v12H6z" />
                <rect x="20" y="30" width="8" height="12" />
            </svg>
        ),
    },
    {
        id: "commercial-construction",
        number: "02",
        category: "Core Development",
        title: "Commercial Construction",
        tagline: "Spaces where business grows.",
        description:
            "Offices, retail complexes, mixed-use developments — we build commercial real estate that meets modern business demands. Our commercial projects are strategically located, structurally superior, and designed for long-term rental yield.",
        stats: [{ value: "120+", label: "Projects Built" }, { value: "8+", label: "Commercial Hubs" }],
        features: ["Office Complexes & IT Parks", "Retail & Mall Development", "Mixed-Use Developments", "Commercial Leasing Advisory"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="10" width="24" height="32" />
                <rect x="28" y="18" width="16" height="24" />
                <path d="M10 18h12M10 26h12M10 34h12" />
                <path d="M34 26h4M34 32h4" />
            </svg>
        ),
    },
    {
        id: "integrated-townships",
        number: "03",
        category: "Core Development",
        title: "Integrated Townships",
        tagline: "A city within a city.",
        description:
            "We master-plan and develop self-sufficient townships with residential zones, schools, hospitals, shopping, and green corridors — all integrated into a single cohesive community. Built for families who want everything within reach.",
        stats: [{ value: "35+", label: "Acres Developed" }, { value: "600+", label: "Township Units" }],
        features: ["Master Planning & Zoning", "Infrastructure Development", "Community Amenities Design", "Sustainable Green Corridors"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="24" r="18" />
                <path d="M24 6v36M6 24h36" />
                <path d="M10 14s4 4 14 4 14-4 14-4M10 34s4-4 14-4 14 4 14 4" />
            </svg>
        ),
    },
    {
        id: "property-valuation",
        number: "04",
        category: "Consultation",
        title: "Property Valuation",
        tagline: "Know what your property is truly worth.",
        description:
            "Our government-approved valuers assess residential, commercial, and industrial properties for sale, mortgage, legal dispute, insurance, and investment purposes. Trusted by banks, courts, and private clients across Gujarat.",
        stats: [{ value: "500+", label: "Properties Valued" }, { value: "Govt.", label: "Approved Valuers" }],
        features: ["Bank & Mortgage Valuations", "Legal & Court Valuations", "Insurance Valuations", "Investment Grade Reports"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 40V12l16-8 16 8v28" />
                <circle cx="24" cy="22" r="6" />
                <path d="M18 40v-8h12v8" />
            </svg>
        ),
    },
    {
        id: "architectural-design",
        number: "05",
        category: "Consultation",
        title: "Architecture & Design",
        tagline: "Designed to endure. Built to inspire.",
        description:
            "Our in-house architectural team delivers concept design, working drawings, and construction supervision for residential bungalows, commercial buildings, and institutional projects. Licensed by VMC and the Council of Architecture.",
        stats: [{ value: "80+", label: "Design Projects" }, { value: "CoA", label: "Licensed Architects" }],
        features: ["Concept & Schematic Design", "Working Drawing Sets", "3D Visualization", "Construction Supervision"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 42L24 6l18 36" />
                <path d="M12 30h24" />
                <circle cx="24" cy="20" r="3" />
                <path d="M24 6v40" />
            </svg>
        ),
    },
    {
        id: "environmental-consulting",
        number: "06",
        category: "Consultation",
        title: "Environmental Consulting",
        tagline: "Build responsibly. Build for the future.",
        description:
            "Our licensed hydrogeologist leads environmental due diligence, ground water assessment, EIA reports, and sustainability audits for real estate and industrial projects. Trusted by developers seeking statutory approvals across Gujarat.",
        stats: [{ value: "50+", label: "EIA Reports" }, { value: "MSc", label: "Hydrogeology" }],
        features: ["Environmental Impact Assessments", "Ground Water Studies", "Sustainability Audits", "Statutory Approval Support"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M24 6C14 6 8 14 8 22c0 10 16 22 16 22s16-12 16-22c0-8-6-16-16-16z" />
                <circle cx="24" cy="22" r="5" />
            </svg>
        ),
    },
    {
        id: "project-management",
        number: "07",
        category: "Consultation",
        title: "Project Management",
        tagline: "On time. On budget. No compromise.",
        description:
            "We provide end-to-end project management services — from procurement and contractor selection to quality control and handover. Our structural engineers ensure every build meets specification, deadline, and safety standard.",
        stats: [{ value: "120+", label: "Projects Managed" }, { value: "ME", label: "Structural Experts" }],
        features: ["Procurement & Tendering", "Site Supervision & QC", "Schedule & Cost Control", "Safety & Compliance Audits"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="8" y="8" width="32" height="32" rx="2" />
                <path d="M16 24l6 6 10-10" />
                <path d="M8 18h32" />
            </svg>
        ),
    },
    {
        id: "real-estate-advisory",
        number: "08",
        category: "Consultation",
        title: "Real Estate Advisory",
        tagline: "Smart decisions. Maximum returns.",
        description:
            "Whether you're a first-time buyer, an NRI investor, or a developer seeking land — our advisory team provides data-driven guidance on market timing, location selection, legal due diligence, and investment structuring.",
        stats: [{ value: "25+", label: "Years Experience" }, { value: "LLB", label: "Legal Expertise" }],
        features: ["Investment Strategy & ROI Analysis", "NRI Property Advisory", "Land Acquisition Support", "Legal Due Diligence"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 36l10-12 8 6 14-18" />
                <circle cx="36" cy="14" r="4" />
            </svg>
        ),
    },
    {
        id: "legal-arbitration",
        number: "09",
        category: "Consultation",
        title: "Legal & Arbitration Services",
        tagline: "Resolve disputes. Protect your assets.",
        description:
            "Our government-approved arbitrator and LLB-qualified director offers legal consultation for property disputes, RERA complaints, title verification, and out-of-court settlement for real estate matters across Gujarat.",
        stats: [{ value: "Govt.", label: "Approved Arbitrator" }, { value: "LLB", label: "Qualified" }],
        features: ["RERA Dispute Resolution", "Property Title Verification", "Out-of-Court Arbitration", "Legal Documentation Review"],
        accent: "#c9a84c",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M24 6v36M12 12l24 24M36 12L12 36" />
                <circle cx="24" cy="24" r="6" />
            </svg>
        ),
    },
];

const CATEGORIES = ["All Services", "Core Development", "Consultation"];

const PROCESS_STEPS = [
    { number: "01", title: "Initial Consultation", body: "We understand your goals, budget, timeline, and site conditions in a free discovery session." },
    { number: "02", title: "Feasibility & Strategy", body: "Our experts assess legal, technical, and market factors to chart the most viable path forward." },
    { number: "03", title: "Proposal & Agreement", body: "We present a clear scope, timeline, and fee structure — no hidden costs, no ambiguity." },
    { number: "04", title: "Execution & Delivery", body: "Our team executes with precision, keeping you informed at every milestone until handover." },
];

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

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    return (
        <RevealSection delay={index * 80} className="h-full">
            <div
                className="group h-full flex flex-col bg-white border border-gray-100 cursor-pointer transition-all duration-500"
                style={{
                    boxShadow: hovered ? "0 20px 35px -12px rgba(0,0,0,0.08)" : "0 1px 2px rgba(0,0,0,0.02)",
                    transform: hovered ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Card Top */}
                <div className="p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                        {/* Icon */}
                        <div
                            className="w-12 h-12 flex items-center justify-center transition-colors duration-300"
                            style={{ color: hovered ? "#c9a84c" : "#d4d4d4" }}
                        >
                            <div className="w-6 h-6">
                                {service.icon}
                            </div>
                        </div>
                        {/* Number */}
                        <span className="text-sm font-mono tracking-wider text-gray-300">
                            {service.number}
                        </span>
                    </div>

                    {/* Category pill */}
                    <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#c9a84c] mb-3 block">
                        {service.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 font-serif">
                        {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-gray-400 mb-4">{service.tagline}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-b border-gray-100 bg-gray-50/30">
                    {service.stats.map((s, i) => (
                        <div key={i} className="px-6 py-4 text-center">
                            <div className="text-xl font-bold text-gray-900 font-serif">{s.value}</div>
                            <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="p-6 flex-1">
                    <ul className="space-y-2">
                        {service.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 mt-auto">
                    <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-xs font-medium text-gray-900 group-hover:text-[#c9a84c] transition-colors"
                    >
                        <span className="underline underline-offset-4">Learn More</span>
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </RevealSection>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState("All Services");
    const [hoveredProcess, setHoveredProcess] = useState<number | null>(null);

    const filtered = activeCategory === "All Services"
        ? SERVICES
        : SERVICES.filter(s => s.category === activeCategory);

    return (
        <LayoutWrapper>
            <div className="bg-white min-h-screen">

                {/* ── HERO ─────────────────────────────────────────────────── */}
                <section className="relative w-full bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
                        <div className="max-w-3xl">
                            {/* Breadcrumb */}
                            <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
                                <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
                                <span className="text-gray-300">/</span>
                                <span className="text-[#c9a84c]">Services</span>
                            </nav>

                            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">
                                SpaceAge Group · Vadodara
                            </div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                                What We
                                <br />
                                <span className="italic text-[#c9a84c]">Build & Advise.</span>
                            </h1>
                            <div className="w-12 h-px bg-[#c9a84c] mb-8" />
                            <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                                From landmark residential townships to precision legal arbitration —
                                SpaceAge Group delivers nine specialist services across construction,
                                design, valuation, and real estate consulting in Vadodara, Gujarat.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── FILTER TABS ──────────────────────────────────────────── */}
                <div className="border-b border-gray-100 sticky top-[72px] bg-white z-30">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center gap-6 overflow-x-auto py-3">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-sm font-medium py-3 whitespace-nowrap transition-all duration-200 ${activeCategory === cat
                                        ? "text-gray-900 border-b-2 border-[#c9a84c]"
                                        : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                            <span className="ml-auto text-xs text-gray-400">
                                {filtered.length} Service{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── SERVICES GRID ────────────────────────────────────────── */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <RevealSection className="mb-16 text-center">
                            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#c9a84c]">
                                {activeCategory === "All Services" ? "All Services" : activeCategory}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-3 leading-tight">
                                {activeCategory === "All Services"
                                    ? "Everything We Do"
                                    : activeCategory === "Core Development"
                                        ? "What We Build"
                                        : "How We Advise"}
                            </h2>
                            <div className="w-12 h-px bg-[#c9a84c] mx-auto mt-5" />
                        </RevealSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((service, index) => (
                                <ServiceCard key={service.id} service={service} index={index} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HOW WE WORK ──────────────────────────────────────────── */}
                <section className="bg-gray-50 py-28 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <RevealSection className="mb-20">
                            <div className="grid lg:grid-cols-2 gap-16 items-end">
                                <div>
                                    <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#c9a84c] block mb-4">Our Process</span>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                                        From First Call
                                        <br />
                                        to Final Handover.
                                    </h2>
                                    <div className="w-12 h-px bg-[#c9a84c] mt-6" />
                                </div>
                                <div>
                                    <p className="text-gray-500 leading-relaxed text-base">
                                        Whether you're buying your first home, developing a commercial complex,
                                        or resolving a property dispute — our process is the same:
                                        transparent, structured, and outcome-focused.
                                    </p>
                                </div>
                            </div>
                        </RevealSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
                            {PROCESS_STEPS.map((step, i) => (
                                <RevealSection key={i} delay={i * 100}>
                                    <div
                                        className="bg-white p-8 h-full cursor-default transition-all duration-300"
                                        style={{
                                            borderTop: hoveredProcess === i ? "2px solid #c9a84c" : "2px solid transparent",
                                        }}
                                        onMouseEnter={() => setHoveredProcess(i)}
                                        onMouseLeave={() => setHoveredProcess(null)}
                                    >
                                        <div
                                            className="text-4xl font-bold mb-6 font-serif transition-colors duration-300"
                                            style={{ color: hoveredProcess === i ? "#c9a84c" : "#e5e5e5" }}
                                        >
                                            {step.number}
                                        </div>
                                        <h3 className="text-gray-900 font-semibold text-base mb-3 font-serif">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY SPACEAGE ─────────────────────────────────────────── */}
                <section className="bg-white py-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <RevealSection className="mb-16 text-center">
                            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#c9a84c] block mb-4">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                                The SpaceAge Difference
                            </h2>
                            <div className="w-12 h-px bg-[#c9a84c] mx-auto mt-5" />
                        </RevealSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Government-Approved Experts",
                                    body: "Our directors hold government approvals for property valuation and arbitration — credentials that banks, courts, and clients trust unconditionally.",
                                    num: "01",
                                },
                                {
                                    title: "End-to-End Under One Roof",
                                    body: "From land acquisition and architecture to legal advisory and project handover — you never need to leave our ecosystem to complete a real estate transaction.",
                                    num: "02",
                                },
                                {
                                    title: "25 Years. Vadodara-Born.",
                                    body: "We know Vadodara's micro-markets, approval authorities, and growth corridors better than anyone. This local depth is our competitive edge.",
                                    num: "03",
                                },
                            ].map((item, i) => (
                                <RevealSection key={i} delay={i * 120}>
                                    <div className="bg-gray-50 border border-gray-100 p-8 h-full">
                                        <div className="text-4xl font-bold text-gray-200 mb-8 font-serif">{item.num}</div>
                                        <h3 className="text-gray-900 font-bold text-lg mb-4 font-serif">{item.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
                <section className="bg-gray-50 py-24 border-t border-gray-100">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                        <RevealSection>
                            <div className="text-5xl text-gray-200 mb-6 font-serif">"</div>
                            <blockquote className="text-gray-800 leading-snug mb-8 text-2xl md:text-3xl font-serif italic font-medium">
                                SpaceAge doesn't just build properties — they build confidence.
                                From valuation to handover, every step was clear and professional.
                            </blockquote>
                            <div className="w-8 h-px bg-[#c9a84c] mx-auto mb-5" />
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                                Verified Client · Vadodara Residential Buyer
                            </p>
                        </RevealSection>
                    </div>
                </section>

                {/* ── CTA BANNER ───────────────────────────────────────────── */}
                <section className="bg-gray-900 border-t border-[#c9a84c]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <RevealSection>
                                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] block mb-6">
                                    Get Started Today
                                </span>
                                <h2 className="text-white leading-tight mb-6 text-4xl md:text-5xl font-serif font-bold">
                                    Ready to Work
                                    <br />
                                    <span className="italic text-[#c9a84c]">With the Best?</span>
                                </h2>
                                <div className="w-12 h-px bg-[#c9a84c] mb-6" />
                                <p className="text-gray-400 text-base leading-relaxed max-w-md mb-10">
                                    Whether you need a property valued, a project managed, or a
                                    township developed — our experts are ready.
                                    One call is all it takes to get started.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-4 bg-[#c9a84c] text-gray-900 hover:bg-[#b8962e] transition-colors"
                                    >
                                        Book a Free Consultation
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <a
                                        href="tel:+916247137241"
                                        className="inline-flex items-center gap-2 text-sm font-medium px-8 py-4 border border-gray-700 text-white hover:border-gray-500 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call Now
                                    </a>
                                </div>
                            </RevealSection>

                            <RevealSection delay={200}>
                                <div className="space-y-0 border border-gray-800">
                                    {[
                                        { label: "Phone", value: "+91 62471 37241", href: "tel:+916247137241" },
                                        { label: "Email", value: "info@spaceagegroup.net", href: "mailto:info@spaceagegroup.net" },
                                        { label: "Office", value: "210, Silver Coin, Akota, Vadodara — 390020", href: "#" },
                                        { label: "Hours", value: "Mon – Sat · 9:00 AM to 7:00 PM", href: "#" },
                                    ].map((c, i) => (
                                        <a
                                            key={i}
                                            href={c.href}
                                            className="flex items-start gap-6 px-8 py-6 border-b border-gray-800 hover:bg-gray-800/50 transition-colors group"
                                        >
                                            <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] w-12 shrink-0 mt-0.5">{c.label}</span>
                                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors leading-relaxed">{c.value}</span>
                                        </a>
                                    ))}
                                </div>
                            </RevealSection>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </LayoutWrapper>
    );
}
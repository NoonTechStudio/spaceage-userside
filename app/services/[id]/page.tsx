// app/services/[id]/page.tsx
"use client";

import { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";
import DevDataToggle from "@/components/DevDataToggle/DevDataToggle";

// Static Services fallback copy
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
        icon: "home",
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
        icon: "building",
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
        icon: "globe",
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
        icon: "scale",
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
        icon: "compass",
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
        icon: "leaf",
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
        icon: "checkSquare",
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
        icon: "trendingUp",
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
        icon: "gavel",
    },
];

const IconMapper: Record<string, React.ReactNode> = {
    home: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 42V20L24 6l18 14v22H30V30h-12v12H6z" />
            <rect x="20" y="30" width="8" height="12" />
        </svg>
    ),
    building: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="10" width="24" height="32" />
            <rect x="28" y="18" width="16" height="24" />
            <path d="M10 18h12M10 26h12M10 34h12" />
            <path d="M34 26h4M34 32h4" />
        </svg>
    ),
    globe: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="24" cy="24" r="18" />
            <path d="M24 6v36M6 24h36" />
            <path d="M10 14s4 4 14 4 14-4 14-4M10 34s4-4 14-4 14 4 14 4" />
        </svg>
    ),
    scale: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 40V12l16-8 16 8v28" />
            <circle cx="24" cy="22" r="6" />
            <path d="M18 40v-8h12v8" />
        </svg>
    ),
    compass: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 42L24 6l18 36" />
            <path d="M12 30h24" />
            <circle cx="24" cy="20" r="3" />
            <path d="M24 6v40" />
        </svg>
    ),
    leaf: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M24 6C14 6 8 14 8 22c0 10 16 22 16 22s16-12 16-22c0-8-6-16-16-16z" />
            <circle cx="24" cy="22" r="5" />
        </svg>
    ),
    checkSquare: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="8" y="8" width="32" height="32" rx="2" />
            <path d="M16 24l6 6 10-10" />
            <path d="M8 18h32" />
        </svg>
    ),
    trendingUp: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 36l10-12 8 6 14-18" />
            <circle cx="36" cy="14" r="4" />
        </svg>
    ),
    gavel: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M24 6v36M12 12l24 24M36 12L12 36" />
            <circle cx="24" cy="24" r="6" />
        </svg>
    )
};

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [useMock, setUseMock] = useState(true);
    const [dbService, setDbService] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Contact Form state
    const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    useEffect(() => {
        const storedMock = localStorage.getItem("use_mock_data") === "true";
        setUseMock(storedMock);

        if (storedMock) {
            setLoading(false);
            return;
        }

        const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
        fetch(`${adminApiUrl}/api/services/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Service not found");
                return res.json();
            })
            .then(data => setDbService(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const service = useMemo(() => {
        if (useMock) {
            return SERVICES.find(s => s.id === id) || null;
        }
        return dbService;
    }, [useMock, dbService, id]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitting(true);

        const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';

        try {
            const res = await fetch(`${adminApiUrl}/api/inquiry`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    phone: formState.phone,
                    message: formState.message,
                    serviceTitle: service?.title || "Unknown Service"
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to submit inquiry");
            }

            setFormSuccess(true);
            setFormState({ name: "", email: "", phone: "", message: "" });
        } catch (err: any) {
            console.error(err);
            alert(`Error: ${err.message || "Something went wrong. Please try again."}`);
        } finally {
            setFormSubmitting(false);
        }
    };

    if (loading) {
        return (
            <LayoutWrapper>
                <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-3">
                    <div className="w-8 h-8 border-4 border-amber-500/30 border-t-[#c9a84c] rounded-full animate-spin" />
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Retrieving Service Details…</span>
                </div>
            </LayoutWrapper>
        );
    }

    if (!service) {
        return (
            <LayoutWrapper>
                <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Service Not Found</h2>
                    <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
                        The service you are looking for does not exist or has been archived.
                    </p>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-[#c9a84c] transition-colors text-xs font-bold uppercase tracking-wider px-6 py-3"
                    >
                        Return to Services
                    </Link>
                </div>
            </LayoutWrapper>
        );
    }

    const currentAccent = service.accent || "#c9a84c";
    const mappedIcon = typeof service.icon === "string" ? IconMapper[service.icon] : null;

    return (
        <LayoutWrapper>
            <div className="bg-white min-h-screen">
                
                {/* ── Header / Breadcrumb ────────────────────────────────────── */}
                <section className="relative w-full bg-white border-b border-gray-100 py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
                                <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
                                <span className="text-gray-300">/</span>
                                <Link href="/services" className="hover:text-[#c9a84c] transition-colors">Services</Link>
                                <span className="text-gray-300">/</span>
                                <span className="text-[#c9a84c] truncate">{service.title}</span>
                            </nav>

                            <div className="flex items-center gap-3 mb-4">
                                <span 
                                    className="text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5"
                                    style={{ backgroundColor: `${currentAccent}15`, color: currentAccent }}
                                >
                                    {service.category}
                                </span>
                                <span className="text-xs font-mono text-gray-400 font-bold">No. {service.number}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-5">
                                {service.title}
                            </h1>
                            
                            <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: currentAccent }} />
                            
                            <p 
                                className="text-lg md:text-xl font-serif italic max-w-2xl leading-relaxed"
                                style={{ color: currentAccent }}
                            >
                                "{service.tagline}"
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Main Details Grid ──────────────────────────────────────── */}
                <section className="py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        
                        {/* Left column: Overview & Capabilities */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentAccent }} />
                                    Service Overview
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>

                            {/* Features list */}
                            {service.features && service.features.length > 0 && (
                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentAccent }} />
                                        Core Capabilities & Scope
                                    </h2>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {service.features.map((feat: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <span 
                                                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                                                    style={{ backgroundColor: `${currentAccent}15`, color: currentAccent }}
                                                >
                                                    ✓
                                                </span>
                                                <span className="text-sm text-gray-700 leading-normal">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Predefined Icon Showcase */}
                            {mappedIcon && (
                                <div className="p-8 border border-gray-100 bg-gray-50/50 flex gap-6 items-center rounded-sm">
                                    <div className="w-12 h-12 flex items-center justify-center shrink-0 border rounded-full bg-white shadow-sm" style={{ color: currentAccent, borderColor: `${currentAccent}40` }}>
                                        <div className="w-6 h-6">
                                            {mappedIcon}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 font-serif">Certified Vadodara Standards</h4>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">This consultation practice is compliant with RERA, VMC rules, Council of Architecture regulations, and statutory codes of Gujarat.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right column: Stats & Contact form */}
                        <div className="lg:col-span-5 space-y-8">
                            
                            {/* Stats */}
                            {(() => {
                                let statsList: any[] = [];
                                if (Array.isArray(service.stats)) {
                                    statsList = service.stats;
                                } else if (typeof service.stats === 'string') {
                                    try { statsList = JSON.parse(service.stats); } catch { statsList = []; }
                                }
                                if (!Array.isArray(statsList)) statsList = [];

                                if (statsList.length === 0) return null;

                                return (
                                    <div className="grid grid-cols-2 gap-4">
                                        {statsList.map((st: any, idx: number) => (
                                            <div 
                                                key={idx} 
                                                className="bg-white border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                                                style={{ borderTop: `3px solid ${currentAccent}` }}
                                            >
                                                <div className="text-3xl font-bold text-gray-950 font-serif mb-1">{st.value}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-normal">{st.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}

                            {/* Contact Form Card */}
                            <div className="bg-gray-950 text-white p-8 rounded-sm shadow-xl relative overflow-hidden border-t-2" style={{ borderColor: currentAccent }}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                                
                                <h3 className="text-xl font-bold font-serif mb-2 text-white">Inquire About This Service</h3>
                                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                                    Leave your contact details and our experts will get back to you with advice within one business day.
                                </p>

                                {formSuccess ? (
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 text-xs font-semibold text-center rounded-sm">
                                        ✓ Consultation inquiry sent successfully! We will contact you soon.
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="space-y-4">
                                        <div>
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Your Name</label>
                                            <input 
                                                type="text"
                                                required
                                                value={formState.name}
                                                onChange={e => setFormState({...formState, name: e.target.value})}
                                                placeholder="John Doe"
                                                className="w-full bg-white/5 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none transition-colors"
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Email Address</label>
                                                <input 
                                                    type="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Phone Number</label>
                                                <input 
                                                    type="tel"
                                                    required
                                                    value={formState.phone}
                                                    onChange={e => setFormState({...formState, phone: e.target.value})}
                                                    placeholder="+91 99999 99999"
                                                    className="w-full bg-white/5 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Inquiry / Requirements</label>
                                            <textarea 
                                                rows={3}
                                                required
                                                value={formState.message}
                                                onChange={e => setFormState({...formState, message: e.target.value})}
                                                placeholder={`I am interested in ${service.title} services...`}
                                                className="w-full bg-white/5 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white focus:border-white/30 focus:outline-none transition-colors resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formSubmitting}
                                            className="w-full py-3 text-xs uppercase font-bold tracking-widest text-center transition-colors shadow-lg cursor-pointer"
                                            style={{ backgroundColor: currentAccent, color: '#000' }}
                                        >
                                            {formSubmitting ? "Submitting Inquiry..." : "Submit Consultation Details"}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Back link */}
                            <div className="text-center pt-2">
                                <Link 
                                    href="/services"
                                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium group"
                                >
                                    <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                                    <span className="underline underline-offset-4">Back to all services list</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

                <Footer />
                <DevDataToggle />
            </div>
        </LayoutWrapper>
    );
}

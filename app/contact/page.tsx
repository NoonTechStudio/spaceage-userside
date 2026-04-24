// app/contact/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface ProjectLocation {
    id: number;
    name: string;
    address: string;
    status: "Ongoing" | "Completed" | "Upcoming";
    mapUrl: string;
    embedUrl: string;
    category: string;
    contactPerson: string;
    contactNumber: string;
}

interface FormState {
    name: string;
    email: string;
    phone: string;
    interest: string;
    project: string;
    budget: string;
    message: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECT_LOCATIONS: ProjectLocation[] = [
    {
        id: 1,
        name: "Space Age Residency",
        address: "Alkapuri, Vadodara, Gujarat – 390007",
        status: "Ongoing",
        category: "Residential",
        mapUrl: "https://maps.google.com/?q=Alkapuri,Vadodara",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.1812!3d22.3119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf00d2e1c111%3A0x83e4b8d3c7e2a2e0!2sAlkapuri%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
        contactPerson: "Mr. Rajesh Mehta",
        contactNumber: "+91 98765 43210",
    },
    {
        id: 2,
        name: "Space Age Commerce",
        address: "Manjalpur, Vadodara, Gujarat – 390011",
        status: "Ongoing",
        category: "Commercial",
        mapUrl: "https://maps.google.com/?q=Manjalpur,Vadodara",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.2!3d22.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcef8b2c2c111%3A0x1234!2sManjalpur%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
        contactPerson: "Ms. Priya Shah",
        contactNumber: "+91 98765 43211",
    },
    {
        id: 3,
        name: "Aambawadi",
        address: "Hetampura, Dabhoi Road, Vadodara, Gujarat",
        status: "Completed",
        category: "Villas",
        mapUrl: "https://maps.google.com/?q=Hetampura,Dabhoi+Road,Vadodara",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.09!3d22.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzAwLjAiTiA3M8KwMDUnMjQuMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
        contactPerson: "Mr. Amit Desai",
        contactNumber: "+91 98765 43212",
    },
    {
        id: 4,
        name: "Bhagyalakshmi Riverfront",
        address: "Savli-Timba Road, Near Manjusar GIDC, Vadodara",
        status: "Completed",
        category: "Weekend Homes",
        mapUrl: "https://maps.google.com/?q=Manjusar+GIDC,Vadodara",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.15!3d22.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDIxJzM2LjAiTiA3M8KwMDknMDAuMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
        contactPerson: "Mrs. Neha Patel",
        contactNumber: "+91 98765 43213",
    },
    {
        id: 5,
        name: "Burhani Plaza",
        address: "Ajwa Road, Vadodara, Gujarat – 390019",
        status: "Completed",
        category: "Mixed Use",
        mapUrl: "https://maps.google.com/?q=Ajwa+Road,Vadodara",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.1550!3d22.325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f0b4b4a111%3A0x5678!2sAjwa%20Rd%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
        contactPerson: "Mr. Vikram Singh",
        contactNumber: "+91 98765 43214",
    },
    {
        id: 6,
        name: "Greenwood Township",
        address: "Waghodia Road, Vadodara, Gujarat – 391760",
        status: "Upcoming",
        category: "Township",
        mapUrl: "https://maps.google.com/?q=Waghodia+Road,Vadodara",
        embedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1!2d73.22!3d22.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzAwLjAiTiA3M8KwMTMnMTIuMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
        contactPerson: "Mr. Rohan Joshi",
        contactNumber: "+91 98765 43215",
    },
];

const STATUS_STYLES = {
    Ongoing: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    Completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    Upcoming: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
};

const CONTACT_INFO = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Head Office",
        lines: ["210, Silver Coin, Akota,", "Vadodara, Gujarat – 390020"],
        link: "https://maps.google.com/?q=Silver+Coin,Akota,Vadodara",
        linkLabel: "Get Directions",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" />
            </svg>
        ),
        label: "Phone",
        lines: ["+91 89803 55444", "+91 89803 55445"],
        link: "tel:+918980355444",
        linkLabel: "Call Now",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email",
        lines: ["info@spaceagegroup.net", "sales@spaceagegroup.net"],
        link: "mailto:info@spaceagegroup.net",
        linkLabel: "Send Email",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        label: "Office Hours",
        lines: ["Mon – Sat: 10:00 AM – 6:30 PM", "Sunday: By Appointment"],
        link: null,
        linkLabel: null,
    },
];

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

// ─── FORM ────────────────────────────────────────────────────────────────────

function InquiryForm() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        phone: "",
        interest: "",
        project: "",
        budget: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormState>>({});

    const validate = () => {
        const errs: Partial<FormState> = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
        if (!form.phone.match(/^[0-9+\- ]{8,15}$/)) errs.phone = "Valid phone required";
        if (!form.message.trim()) errs.message = "Please tell us about your requirements";
        return errs;
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    const field = (
        key: keyof FormState,
        label: string,
        type: string = "text",
        placeholder: string = ""
    ) => (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                {label}
                {["name", "email", "phone", "message"].includes(key) && (
                    <span className="text-[#c9a84c] ml-0.5">*</span>
                )}
            </label>
            <input
                type={type}
                value={form[key]}
                onChange={(e) => {
                    setForm((f) => ({ ...f, [key]: e.target.value }));
                    setErrors((er) => ({ ...er, [key]: undefined }));
                }}
                placeholder={placeholder}
                className={`border px-4 py-3 text-sm text-gray-900 bg-white outline-none transition-colors duration-200 placeholder:text-gray-400 ${errors[key]
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-[#c9a84c]"
                    }`}
            />
            {errors[key] && (
                <span className="text-xs text-red-500">{errors[key]}</span>
            )}
        </div>
    );

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "rgba(201,168,76,0.12)" }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    Inquiry Submitted!
                </h3>
                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Thank you, {form.name}. Our team will reach out within 24 hours on <strong>{form.phone}</strong>.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", interest: "", project: "", budget: "", message: "" }); }}
                    className="mt-8 text-xs text-[#c9a84c] underline underline-offset-4"
                >
                    Submit another inquiry
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {field("name", "Full Name", "text", "Your full name")}
            {field("email", "Email Address", "email", "your@email.com")}
            {field("phone", "Phone Number", "tel", "+91 XXXXX XXXXX")}

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    I'm Interested In
                </label>
                <select
                    value={form.interest}
                    onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
                    className="border border-gray-200 focus:border-[#c9a84c] px-4 py-3 text-sm text-gray-900 bg-white outline-none transition-colors duration-200"
                >
                    <option value="">Select an option</option>
                    <option>Buying a Property</option>
                    <option>Site Visit</option>
                    <option>Investment Partnership</option>
                    <option>CSR Collaboration</option>
                    <option>General Inquiry</option>
                    <option>Career / Internship</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Project of Interest
                </label>
                <select
                    value={form.project}
                    onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                    className="border border-gray-200 focus:border-[#c9a84c] px-4 py-3 text-sm text-gray-900 bg-white outline-none transition-colors duration-200"
                >
                    <option value="">Select a project</option>
                    {PROJECT_LOCATIONS.map((p) => (
                        <option key={p.id}>{p.name}</option>
                    ))}
                    <option>Not Sure Yet</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Under ₹30L", "₹30L – ₹60L", "₹60L – ₹1Cr", "₹1Cr+"].map((b) => (
                        <button
                            key={b}
                            onClick={() => setForm((f) => ({ ...f, budget: b }))}
                            className="px-4 py-2.5 text-xs font-semibold border transition-all duration-200"
                            style={{
                                borderColor: form.budget === b ? "#c9a84c" : "#e5e5e5",
                                backgroundColor: form.budget === b ? "rgba(201,168,76,0.08)" : "white",
                                color: form.budget === b ? "#c9a84c" : "#666",
                            }}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Your Message <span className="text-[#c9a84c]">*</span>
                </label>
                <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                        setForm((f) => ({ ...f, message: e.target.value }));
                        setErrors((er) => ({ ...er, message: undefined }));
                    }}
                    placeholder="Tell us about your requirements, timeline, or any questions you have…"
                    className={`border px-4 py-3 text-sm text-gray-900 bg-white outline-none resize-none transition-colors duration-200 placeholder:text-gray-400 ${errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-[#c9a84c]"
                        }`}
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </div>

            <div className="md:col-span-2">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#c9a84c] hover:text-gray-900 transition-all duration-300 disabled:opacity-60 flex items-center gap-3"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Submitting…
                        </>
                    ) : (
                        "Send Inquiry →"
                    )}
                </button>
                <p className="text-xs text-gray-400 mt-3">
                    We typically respond within 24 hours on business days.
                </p>
            </div>
        </div>
    );
}

// ─── JUMP NAV ───────────────────────────────────────────────────────────────

function JumpNav({ active, onScroll }: { active: string; onScroll: (id: string) => void }) {
    const sections = [
        { id: "contact-info", label: "Contact Info", count: 4 },
        { id: "locations", label: "Project Locations", count: PROJECT_LOCATIONS.length },
        { id: "inquiry", label: "Inquiry Form", count: 1 },
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
                </div>
            </div>
        </div>
    );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function ContactPage() {
    const [activeLocation, setActiveLocation] = useState<ProjectLocation>(PROJECT_LOCATIONS[0]);
    const [activeSection, setActiveSection] = useState("contact-info");

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        const ids = ["contact-info", "locations", "inquiry"];
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
                                <span className="text-[#c9a84c]">Contact</span>
                            </nav>
                            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">SpaceAge Group · Vadodara</div>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                                Get in
                                <br />
                                <span className="italic text-[#c9a84c]">Touch.</span>
                            </h1>
                            <div className="w-12 h-px bg-[#c9a84c] mb-8" />
                            <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                                We'd love to hear from you. Reach out to our team for any enquiries — whether you're looking to buy, invest, or simply learn more.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-10">
                                {[
                                    { label: "Contact Info", count: 4, id: "contact-info" },
                                    { label: "Locations", count: PROJECT_LOCATIONS.length, id: "locations" },
                                    { label: "Inquiry", count: 1, id: "inquiry" },
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

                {/* ── CONTACT INFO SECTION ──────────────────────────────────── */}
                <section id="contact-info" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="01" label="Connect With Us" title="Contact Information" subtitle="Our team is ready to assist you with any questions about our projects, investments, or partnerships." />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {CONTACT_INFO.map((info, i) => (
                                <RevealSection key={i} delay={i * 80}>
                                    <div className="p-6 bg-white border border-gray-100 hover:border-[#c9a84c] transition-all duration-300" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
                                        <div className="w-12 h-12 flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#c9a84c" }}>
                                            {info.icon}
                                        </div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-2">
                                            {info.label}
                                        </p>
                                        {info.lines.map((line, j) => (
                                            <p key={j} className="text-sm text-gray-700 leading-relaxed">
                                                {line}
                                            </p>
                                        ))}
                                        {info.link && (
                                            <a
                                                href={info.link}
                                                target={info.link.startsWith("http") ? "_blank" : undefined}
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-[#c9a84c] font-medium mt-3 hover:underline"
                                            >
                                                {info.linkLabel} →
                                            </a>
                                        )}
                                    </div>
                                </RevealSection>
                            ))}
                        </div>

                        {/* Social Links */}
                        <RevealSection delay={320} className="mt-8">
                            <div className="p-6 bg-gray-900 flex flex-wrap items-center justify-between gap-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-semibold">
                                    Follow Us
                                </p>
                                <div className="flex gap-3">
                                    {[
                                        { label: "Facebook", href: "https://facebook.com", icon: "F" },
                                        { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
                                        { label: "Twitter", href: "https://twitter.com", icon: "𝕏" },
                                        { label: "Instagram", href: "https://instagram.com", icon: "IG" },
                                    ].map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors duration-200 text-sm font-bold"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </RevealSection>
                    </div>
                </section>

                {/* ── PROJECT LOCATIONS SECTION ─────────────────────────────── */}
                <section id="locations" className="py-24 bg-gray-50" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="02" label="Across Vadodara" title="Find Our Projects" subtitle="Explore our ongoing and completed projects across Vadodara. Visit any location to experience SpaceAge living firsthand." />

                        <RevealSection>
                            <div className="grid lg:grid-cols-[2fr_3fr] gap-0 border border-gray-200 overflow-hidden bg-white">
                                {/* Left: Project list with contact person */}
                                <div className="overflow-y-auto border-r border-gray-200" style={{ maxHeight: "520px" }}>
                                    {PROJECT_LOCATIONS.map((proj, idx) => {
                                        const statusStyle = STATUS_STYLES[proj.status];
                                        const isActive = activeLocation.id === proj.id;
                                        return (
                                            <button
                                                key={proj.id}
                                                onClick={() => setActiveLocation(proj)}
                                                className={`w-full flex flex-col p-5 border-b border-gray-100 text-left transition-all duration-200 ${isActive ? "bg-white border-l-2 border-l-[#c9a84c]" : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <span className="text-xs font-mono text-[#c9a84c] w-6 shrink-0 mt-0.5 font-bold">
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 leading-tight">{proj.name}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5 leading-snug truncate">{proj.address}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-[10px] text-[#c9a84c] uppercase tracking-wider font-semibold">
                                                                {proj.category}
                                                            </span>
                                                            <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                                                                {proj.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* ✅ NEW: Contact person & phone number for this property */}
                                                <div className="mt-3 ml-10 pt-3 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="text-gray-400">📞 Contact:</span>
                                                        <span className="font-semibold text-gray-800">{proj.contactPerson}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <a
                                                            href={`tel:${proj.contactNumber.replace(/\s/g, '')}`}
                                                            className="text-sm font-bold text-[#c9a84c] hover:underline"
                                                        >
                                                            {proj.contactNumber}
                                                        </a>
                                                        <a
                                                            href={`https://wa.me/${proj.contactNumber.replace(/\s/g, '').replace('+', '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[10px] bg-[#25D366] text-white px-2 py-1 rounded flex items-center gap-1 hover:opacity-90"
                                                        >
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                            </svg>
                                                            WhatsApp
                                                        </a>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Right: Embedded Map */}
                                <div className="flex flex-col">
                                    <div className="bg-gray-900 px-5 py-3.5 flex items-center justify-between flex-wrap gap-2">
                                        <div>
                                            <p className="text-white text-sm font-semibold">{activeLocation.name}</p>
                                            <p className="text-white/40 text-xs mt-0.5">{activeLocation.address}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={`tel:${activeLocation.contactNumber.replace(/\s/g, '')}`}
                                                className="text-[#c9a84c] text-xs hover:underline flex items-center gap-1"
                                            >
                                                📞 {activeLocation.contactNumber}
                                            </a>
                                            <a
                                                href={activeLocation.mapUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#c9a84c] text-xs hover:underline shrink-0"
                                            >
                                                Open in Maps →
                                            </a>
                                        </div>
                                    </div>
                                    <iframe
                                        key={activeLocation.id}
                                        src={activeLocation.embedUrl}
                                        width="100%"
                                        height="460"
                                        style={{ border: 0, display: "block", flex: 1 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map for ${activeLocation.name}`}
                                    />
                                </div>
                            </div>
                        </RevealSection>
                    </div>
                </section>

                {/* ── INQUIRY FORM SECTION ──────────────────────────────────── */}
                <section id="inquiry" className="py-24 bg-white" style={{ scrollMarginTop: "112px" }}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <SectionHeader number="03" label="Get In Touch" title="Send Us a Message" subtitle="Whether you're looking to buy your dream home, explore investment opportunities, or simply learn more about our projects — our dedicated team is here to guide you." />

                        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
                            {/* Left */}
                            <RevealSection>
                                <div className="sticky top-32">
                                    <div className="p-8 bg-gray-50 border border-gray-100">
                                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                            Fill out the form and our team will get back to you within 24 hours. You can also reach us directly through the channels below.
                                        </p>
                                        <div className="space-y-4">
                                            <a
                                                href="https://wa.me/918980355444"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-5 py-3.5 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe57] transition-colors duration-200"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                Chat on WhatsApp
                                            </a>
                                            <a
                                                href="tel:+918980355444"
                                                className="flex items-center gap-3 px-5 py-3.5 border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" />
                                                </svg>
                                                Call Us Directly
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </RevealSection>

                            {/* Right: Form */}
                            <RevealSection delay={100}>
                                <div className="bg-white p-8 md:p-10 border border-gray-100" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.05)" }}>
                                    <InquiryForm />
                                </div>
                            </RevealSection>
                        </div>
                    </div>
                </section>

                {/* ── LEADERSHIP CTA ──────────────────────────────────────────── */}
                <section className="bg-gray-900 border-t border-[#c9a84c] py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-semibold block mb-3">Our Leadership</span>
                            <h2 className="text-white leading-tight text-2xl md:text-3xl font-serif font-bold">
                                Speak Directly with Our Directors
                                <br />
                                <span className="italic text-[#c9a84c]">Accessible & Committed.</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-4 shrink-0">
                            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-4 bg-[#c9a84c] text-gray-900 hover:bg-[#b8962e] transition-colors">
                                Meet the Team
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
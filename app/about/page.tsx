// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── Data ───────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: "1992", title: "The Beginning", description: "Space Age Group founded with a vision to transform Vadodara's real estate landscape." },
  { year: "1998", title: "First Landmark", description: "Completed first residential township, setting new standards for quality construction." },
  { year: "2005", title: "Commercial Expansion", description: "Ventured into commercial real estate with our first business park." },
  { year: "2012", title: "Luxury Segment", description: "Launched premium luxury residences redefining urban living." },
  { year: "2018", title: "Sustainable Focus", description: "Introduced eco-friendly construction practices across all projects." },
  { year: "2024", title: "Today", description: "120+ projects completed, 3000+ happy families, and counting." },
];

const VALUES = [
  {
    icon: "🏛️",
    title: "Excellence",
    description: "Uncompromising quality in every project we undertake.",
  },
  {
    icon: "🤝",
    title: "Integrity",
    description: "Transparent dealings and honest communication always.",
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "Embracing modern design and sustainable practices.",
  },
  {
    icon: "❤️",
    title: "Care",
    description: "Putting customer happiness above everything else.",
  },
];

const LEADERSHIP = [
  {
    name: "Taher Zabuawala",
    role: "Director",
    expertise: ["Property Valuation", "Arbitration", "Project Development"],
    image: "/images/Taher-Zabuawala.jpg",
    quote: "Quality isn't just a standard — it's our promise to every family that trusts us with their dream home.",
  },
  {
    name: "Ajab Zabuawala",
    role: "Director",
    expertise: ["Structural Engineering", "Finance", "Project Management"],
    image: "/images/Ajab-Zabuawala.jpg",
    quote: "Every structure we build tells a story of precision, passion, and permanence.",
  },
  {
    name: "Juzer Nalwala",
    role: "Director",
    expertise: ["Environmental Consulting", "Hydrogeology", "Sustainability"],
    image: "/images/Juzer-Nalwala.jpg",
    quote: "Building responsibly means thinking about tomorrow, today.",
  },
  {
    name: "Amatullah Nalwala",
    role: "Director",
    expertise: ["Architecture", "Property Law", "Investment Strategy"],
    image: "/images/Amatullah-nalwala.jpg",
    quote: "Great design isn't just about aesthetics — it's about creating spaces where life happens beautifully.",
  },
];

const STAT_TARGETS = [35, 120, 5000, 98];
const STAT_SUFFIXES = ["+", "+", "+", "%"];
const STAT_LABELS = ["Years of Excellence", "Projects Completed", "Happy Families", "Client Satisfaction"];

// ─── Components ─────────────────────────────────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "vision">("story");
  const [counted, setCounted] = useState(false);
  const [displayCounts, setDisplayCounts] = useState([0, 0, 0, 0]);
  const statsRef = useRef<HTMLDivElement>(null);

  // Count-up on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  useEffect(() => {
    if (!counted) return;
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCounts(STAT_TARGETS.map((t) => Math.round(t * eased)));
      if (step >= steps) {
        setDisplayCounts(STAT_TARGETS);
        clearInterval(timer);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [counted]);

  return (
    <LayoutWrapper>
      <div className="bg-white min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative w-full bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
                <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
                <span className="text-gray-300">/</span>
                <span className="text-[#c9a84c]">About</span>
              </nav>

              <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c9a84c] mb-4">
                Our Story
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
                Crafting Vadodara's
                <br />
                <span className="italic text-[#c9a84c]">Skyline Since 1990</span>
              </h1>
              <div className="w-12 h-px bg-[#c9a84c] mb-8" />
              <p className="text-gray-500 leading-relaxed text-lg max-w-xl">
                From a small construction venture to one of Vadodara's most trusted real estate developers —
                our journey has been defined by quality, transparency, and customer happiness.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 2: Story / Mission / Vision ──────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Tab nav */}
            <div className="flex border-b border-gray-100 mb-16 overflow-x-auto">
              {(["story", "mission", "vision"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-medium transition-all duration-200 border-b-2 -mb-px whitespace-nowrap shrink-0 ${activeTab === tab
                    ? "text-gray-900 border-[#c9a84c]"
                    : "text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-200"
                    }`}
                >
                  {tab === "story" ? "Our Story" : tab === "mission" ? "Mission" : "Vision & Values"}
                </button>
              ))}
            </div>

            {/* Story Tab */}
            {activeTab === "story" && (
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                    Our History
                  </span>
                  <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Building Dreams
                    <br />
                    Since 1990
                  </h2>
                  <div className="w-12 h-px bg-[#c9a84c] my-6" />
                  <div className="space-y-4 text-base text-gray-500 leading-relaxed">
                    <p>
                      What started as a small construction venture with a big dream has grown into
                      one of Vadodara's most trusted real estate developers. Over three decades,
                      we've transformed not just skylines, but lives.
                    </p>
                    <p>
                      Our journey has been defined by an unwavering commitment to quality,
                      transparency, and customer happiness. From residential townships to
                      commercial landmarks, every project we undertake reflects our dedication
                      to excellence.
                    </p>
                    <p>
                      Today, with over 120 successful projects and 5000+ happy families,
                      we continue to push boundaries and set new standards in real estate development.
                    </p>
                  </div>
                  <blockquote className="text-xl font-semibold text-gray-900 border-l-2 border-[#c9a84c] pl-5 mt-8 italic leading-snug font-serif">
                    "Every brick we lay is a promise kept, every project completed is a dream realized."
                  </blockquote>
                </div>
                <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src="/images/About.jpg"
                    alt="Space Age Group Story"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}

            {/* Mission Tab */}
            {activeTab === "mission" && (
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                    What Drives Us
                  </span>
                  <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Our Mission
                  </h2>
                  <div className="w-12 h-px bg-[#c9a84c] my-6" />
                  <div className="space-y-4 text-base text-gray-500 leading-relaxed">
                    <p>
                      To deliver not just customer satisfaction, but genuine customer happiness —
                      through honesty, craftsmanship, and a deep-rooted commitment to every family
                      that entrusts us with their dream home.
                    </p>
                    <p>
                      We believe that a home is more than just a structure; it's where memories are
                      made, families grow, and futures are built. Our mission is to create spaces
                      that nurture these precious moments.
                    </p>
                  </div>
                  <blockquote className="text-xl font-semibold text-gray-900 border-l-2 border-[#c9a84c] pl-5 mt-8 italic leading-snug font-serif">
                    "Creating Happiness Through Homes"
                  </blockquote>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                    Where We're Headed
                  </span>
                  <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Our Vision
                  </h2>
                  <div className="w-12 h-px bg-[#c9a84c] my-6" />
                  <p className="text-base text-gray-500 leading-relaxed">
                    To be Vadodara's most trusted and admired real estate developer —
                    recognized for transparent dealings, uncompromising quality, and
                    developments that stand as enduring landmarks for generations.
                  </p>
                </div>
              </div>
            )}

            {/* Vision & Values Tab */}
            {activeTab === "vision" && (
              <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                    Where We're Headed
                  </span>
                  <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Our Vision
                  </h2>
                  <div className="w-12 h-px bg-[#c9a84c] my-6" />
                  <div className="space-y-4 text-base text-gray-500 leading-relaxed">
                    <p>
                      To be Vadodara's most trusted and admired real estate developer —
                      recognized for transparent dealings, uncompromising quality, and
                      developments that stand as enduring landmarks for generations.
                    </p>
                    <p>
                      We envision a future where sustainable design meets luxurious living,
                      where communities thrive, and where every Space Age project becomes
                      a cherished part of Vadodara's architectural heritage.
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                    What We Stand For
                  </span>
                  <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                    Core Values
                  </h2>
                  <div className="w-12 h-px bg-[#c9a84c] my-6" />
                  <div>
                    {VALUES.map((v, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 py-4 border-b border-gray-100"
                      >
                        <span className="text-xl">{v.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{v.title}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{v.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Centered pull quote */}
          <div className="max-w-3xl mx-auto text-center mt-24 px-6">
            <p className="text-3xl md:text-4xl text-gray-800 leading-snug font-serif italic font-medium">
              "We don't just build structures — we build the places where futures begin."
            </p>
            <div className="w-12 h-px bg-[#c9a84c] mx-auto mt-6" />
          </div>
        </section>

        {/* ── Section 3: Stats Strip ───────────────────────────────────────── */}
        <div ref={statsRef} className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {STAT_TARGETS.map((_, idx) => (
                <div
                  key={idx}
                  className={`px-10 py-8 text-center ${idx < STAT_TARGETS.length - 1 ? "border-r border-gray-200" : ""
                    }`}
                >
                  <div className="text-5xl font-bold text-gray-900 font-serif">
                    {displayCounts[idx]}
                    {STAT_SUFFIXES[idx]}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-3 font-medium">
                    {STAT_LABELS[idx]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 4: Timeline ──────────────────────────────────────────── */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                Since 1992
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Our Journey
              </h2>
              <div className="w-12 h-px bg-[#c9a84c] mx-auto mt-6" />
            </div>

            {/* Desktop timeline */}
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-16">
                {TIMELINE.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative flex items-start ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className="flex-1 px-12">
                      {idx % 2 === 0 && (
                        <div className="text-right max-w-sm ml-auto">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed mt-2">{item.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="relative flex flex-col items-center shrink-0 w-32">
                      <div className="text-4xl font-bold text-[#c9a84c] text-center mb-3 font-serif">
                        {item.year}
                      </div>
                      <div className="w-3 h-3 bg-[#c9a84c] rounded-full" />
                    </div>
                    <div className="flex-1 px-12">
                      {idx % 2 !== 0 && (
                        <div className="max-w-sm">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed mt-2">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-10">
                {TIMELINE.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-5 top-1.5 w-2.5 h-2.5 bg-[#c9a84c] rounded-full" />
                    <div className="text-2xl font-bold text-[#c9a84c] mb-1 font-serif">{item.year}</div>
                    <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Leadership ────────────────────────────────────────── */}
        <section className="py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-4 block">
                Our Leadership
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
                Meet the Visionaries
              </h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Our leadership team brings together decades of expertise in engineering,
                architecture, law, and sustainable development — united by a shared vision
                to build better futures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEADERSHIP.map((leader, idx) => (
                <RevealSection key={idx} delay={idx * 100}>
                  <div className="group flex flex-col sm:flex-row bg-white border border-gray-100 transition-all duration-300 hover:shadow-lg">
                    <div className="w-full sm:w-48 shrink-0 overflow-hidden bg-gray-100">
                      <div className="relative w-full h-48 sm:h-full min-h-[192px]">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold">
                        {leader.role}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 font-serif">
                        {leader.name}
                      </h3>
                      <div className="border-t border-gray-100 mt-4 pt-4">
                        <p className="text-sm text-gray-500 leading-relaxed italic">
                          "{leader.quote}"
                        </p>
                        <div className="flex flex-wrap gap-3 mt-3">
                          {leader.expertise.map((exp, i) => (
                            <span key={i} className="text-xs text-gray-400">
                              · {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 border border-gray-200 px-8 py-4 bg-white">
                <svg className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-500">
                  Combined expertise of over{" "}
                  <strong className="text-gray-900">80+ years</strong> in construction,
                  law, and real estate
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 6: CTA Banner ────────────────────────────────────────── */}
        <section className="bg-gray-900 border-t border-[#c9a84c]">
          <div className="max-w-2xl mx-auto text-center py-28 px-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-6 block">
              Start a Conversation
            </span>
            <h2 className="text-5xl font-serif font-bold text-white leading-tight">
              Let's Build Something Lasting
            </h2>
            <p className="text-base text-gray-400 leading-relaxed mt-5 max-w-lg mx-auto">
              Partner with Vadodara's most trusted real estate developer. Our team is ready
              to bring your vision to life with craftsmanship that endures for generations.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#c9a84c] text-gray-900 font-semibold text-sm hover:bg-[#b8962e] transition-colors duration-200"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-700 text-white text-sm font-medium hover:border-gray-500 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </LayoutWrapper>
  );
}
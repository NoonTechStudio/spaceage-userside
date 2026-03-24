"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "25+", label: "Years of Experience" },
  { value: "120+", label: "Projects Delivered" },
  { value: "3000+", label: "Happy Families" },
  { value: "4", label: "Expert Directors" },
];

export default function AboutSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="about" className="w-full bg-white py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ── Section Header ── */}
        <div className="text-center mb-20">
          <div className="reveal-up inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#0d9488]" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0d9488]">
              About Us
            </span>
            <span className="w-6 h-px bg-[#0d9488]" />
          </div>

          <h2 className="reveal-up delay-100 text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.12] tracking-tight mb-6">
            About <span className="text-[#0d9488]">SpaceAge Group</span>
          </h2>

          <p className="reveal-up delay-200 text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Our journey is defined by our passion for construction and our
            unwavering dedication to our clients. We believe in building
            relationships through integrity, reliability, and craftsmanship —
            developments that stand the test of time across Vadodara and beyond.
          </p>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Left: Image ── */}
          <div className="reveal-left relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-sm"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/images/About.jpg"
                alt="Space Age Group"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-[#0d9488] text-white rounded-xl px-6 py-4 shadow-lg">
              <p className="text-3xl font-black leading-none">
                25<span className="text-white/50">+</span>
              </p>
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mt-1.5 text-white/60">
                Years of Trust
              </p>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="reveal-right flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-base text-gray-500 leading-relaxed">
                Our mission is to deliver high-quality construction services that
                exceed our clients&apos; expectations — developments that stand the
                test of time across Vadodara and beyond.
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                From residential townships to commercial hubs, every project we
                undertake reflects our commitment to precision, quality, and the
                communities we serve.
              </p>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-gray-100 rounded-xl p-5 hover:border-[#0d9488]/20 hover:shadow-sm transition-all duration-200"
                >
                  <p className="text-3xl font-black text-[#0d9488] leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#0d9488] hover:bg-[#0f766e] transition-colors duration-200"
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:+916247137241"
                className="inline-flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-[#0d9488] transition-colors duration-200"
              >
                <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 hover:border-[#0d9488]/40 transition-colors duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-gray-400 font-normal leading-none mb-1 tracking-wide">
                    Call support centre
                  </p>
                  <p className="font-bold text-[#0d9488] text-sm tracking-wide">
                    +91 6247 137 241
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

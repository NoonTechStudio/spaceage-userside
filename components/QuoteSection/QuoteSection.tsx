"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

export default function QuoteSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 md:py-32">
      <div className="section-container">
        <div className="reveal-up rounded-2xl bg-[#0d9488] overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* ── Left content ── */}
            <div className="flex-1 px-10 py-14 md:px-16 md:py-16 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50 mb-6">
                Let&apos;s Work Together
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-white leading-[1.2] tracking-tight mb-5">
                Let&apos;s collaborate and achieve{" "}
                <em className="not-italic text-white/70">greatness.</em>
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-md mb-10">
                Don&apos;t delay in making your construction dreams come true. Team up
                with Space Age Group for exceptional service and quality that
                stands the test of time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-[#0d9488] bg-white hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
                >
                  Get a Quote
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </Link>
                <a
                  href="tel:+916247137241"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white border border-white/25 hover:border-white/50 hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                  </svg>
                  Call Us Now
                </a>
              </div>
            </div>

            {/* ── Right — stat panel ── */}
            <div className="hidden md:flex flex-col justify-center items-center gap-0 border-l border-white/10 px-14 py-16 min-w-[260px]">
              <div className="text-center py-8 border-b border-white/10 w-full">
                <p className="text-4xl font-bold text-white mb-1">
                  80<span className="text-white/50">+</span>
                </p>
                <p className="text-[11px] font-medium tracking-widest uppercase text-white/45">
                  Years Combined
                </p>
              </div>
              <div className="text-center py-8 border-b border-white/10 w-full">
                <p className="text-4xl font-bold text-white mb-1">
                  200<span className="text-white/50">+</span>
                </p>
                <p className="text-[11px] font-medium tracking-widest uppercase text-white/45">
                  Projects Completed
                </p>
              </div>
              <div className="text-center py-8 w-full">
                <p className="text-4xl font-bold text-white mb-1">4</p>
                <p className="text-[11px] font-medium tracking-widest uppercase text-white/45">
                  Expert Directors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

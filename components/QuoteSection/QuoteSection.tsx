// components/QuoteSection/QuoteSection.tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

export default function QuoteSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-[#3282B8] border-t-2 border-[#c9a84c] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.22em] text-[#ffffff] font-medium mb-6 block">
              Let&apos;s Collaborate
            </span>

            <h2
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
              className="text-5xl lg:text-6xl text-white"
            >
              Ready to Build Your
              <br />
              Dream Project?
            </h2>

            <p className="text-base text-white/60 leading-relaxed mt-6 max-w-md">
              Join hands with Vadodara&apos;s most trusted real estate developer.
              Let&apos;s transform your vision into reality with exceptional craftsmanship
              and unwavering dedication.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ffffff] text-[#0f0f0f] font-semibold text-sm rounded-none hover:bg-[#b8962e] transition-colors duration-200"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+916247137241"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium rounded-none hover:border-white/60 transition-colors duration-200"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Right — Stacked stats */}
          <div className="flex flex-col">
            {[
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Expert Support" },
              { value: "15+", label: "Awards Won" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div>
                  <div className="text-5xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-[#ffffff] mt-1">
                    {stat.label}
                  </div>
                </div>
                {idx < 2 && (
                  <div className="w-12 h-px bg-white/10 my-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

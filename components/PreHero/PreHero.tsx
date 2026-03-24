"use client";

import Link from "next/link";
import Image from "next/image";

export default function PreHero() {
  return (
    <section className="w-full min-h-[calc(100vh-108px)] grid md:grid-cols-2 bg-white overflow-hidden">
      {/* ── LEFT: Text content ── */}
      <div
        className="flex flex-col justify-center gap-6 py-16 md:py-0"
        style={{
          fontFamily: "Rubik, sans-serif",
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-6 h-[2px] rounded-full bg-[#0d9488]" />
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#0d9488]">
            Vadodara&apos;s Trusted Developer
          </span>
        </div>

        <h1
          className="font-bold text-gray-900 leading-[1.05] tracking-[-0.03em]"
          style={{
            fontFamily: "Rubik, sans-serif",
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
          }}
        >
          Building spaces
          <br />
          that <span className="text-[#0d9488]">inspire</span>
          <br />
          generations.
        </h1>

        <p
          className="text-[15px] leading-relaxed text-gray-500 max-w-[360px]"
          style={{ fontFamily: "Rubik, sans-serif" }}
        >
          From premium residential townships to vibrant commercial spaces —
          crafting landmark developments across Vadodara for over two decades.
        </p>

        <div className="flex flex-row items-center gap-4 mt-1">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white bg-[#0d9488] hover:bg-[#0f766e] transition-colors duration-200 whitespace-nowrap"
          >
            Explore Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-gray-700 bg-white border border-gray-300 hover:border-[#0d9488] hover:text-[#0d9488] transition-colors duration-200 whitespace-nowrap"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>

      {/* ── RIGHT: Image ── */}
      <div className="relative w-full h-full min-h-[400px]">
        <Image
          src="/BG.png"
          alt="Space Age Group building"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  );
}

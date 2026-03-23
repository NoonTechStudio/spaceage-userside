"use client";

import Link from "next/link";
import Image from "next/image";

export default function PreHero() {
  return (
    <section
      className="w-full h-[70vh] grid md:grid-cols-2 bg-white overflow-hidden"
      style={{ marginTop: "108px" }} /* 36px ribbon + 72px navbar */
    >

      {/* ── LEFT: Text content ── */}
      <div
        className="flex flex-col justify-center gap-6 px-8 md:px-16 lg:px-24"
        style={{ fontFamily: "Rubik, sans-serif" }}
      >

        {/* Eyebrow */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-6 h-[2px] rounded-full bg-[#1a56db]" />
          <span
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#1a56db]"
            style={{ fontFamily: "Rubik, sans-serif" }}
          >
            Vadodara's Trusted Developer
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold text-gray-900 leading-[1.05] tracking-[-0.03em]"
          style={{
            fontFamily: "Rubik, sans-serif",
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
          }}
        >
          Building spaces
          <br />
          that{" "}
          <span className="text-[#1a56db]">inspire</span>
          <br />
          generations.
        </h1>

        {/* Subtitle */}
        <p
          className="text-[15px] leading-relaxed text-gray-500 max-w-[360px]"
          style={{ fontFamily: "Rubik, sans-serif" }}
        >
          From premium residential townships to vibrant commercial spaces —
          crafting landmark developments across Vadodara for over two decades.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center gap-4 mt-1">

          {/* Primary */}
          <Link
            href="/projects"
            style={{ fontFamily: "Rubik, sans-serif" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white bg-[#1a56db] hover:bg-[#1648c0] transition-colors duration-200 whitespace-nowrap"
          >
            Explore Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Secondary */}
          <Link
            href="/contact"
            style={{ fontFamily: "Rubik, sans-serif" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-gray-700 bg-white border border-gray-300 hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
          >
            Talk to an Expert
          </Link>

        </div>
      </div>

      {/* ── RIGHT: Image ── */}
      <div className="relative w-full h-full">
        <Image
          src="/BG.png"
          alt="Space Age Group building"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

    </section>
  );
}
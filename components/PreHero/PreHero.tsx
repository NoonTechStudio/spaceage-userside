// components/PreHero/PreHero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function PreHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#f7f5f2] overflow-hidden pt-[72px]">
      <div className="grid lg:grid-cols-[55fr_45fr] min-h-[calc(100vh-72px)]">

        {/* Left Content */}
        <div className="flex flex-col justify-center pl-6 lg:pl-16 pr-6 lg:pr-12 py-20 lg:py-0 max-w-3xl">
          {/* Gold Label */}
          <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium mb-8 block">
            Vadodara&apos;s Trusted Developer
          </span>

          {/* ✅ CLEAN HEADING — each statement on its own line, visually balanced */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a]"
          >
            Acquiring land with vision.
            <br />
            Developing with integrity.
            <br />
            <span className="text-[#c9a84c]">Inspiring generations.</span>
          </h1>

          {/* Optional: small supporting line (remove if you want zero text below heading) */}
          <p className="text-sm text-[#8a8a8a] mt-6 max-w-sm tracking-wide">
            Land acquisition | Development | Consultation
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-none hover:bg-[#333] transition-colors duration-200"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#e8e4de] text-[#1a1a1a] text-sm font-medium rounded-none hover:border-[#1a1a1a] transition-colors duration-200"
            >
              Talk to an Expert
            </Link>
          </div>

          {/* Stat Row */}
          <div className="mt-14 pt-8 border-t border-[#e8e4de] flex gap-10 items-center flex-wrap">
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">35+</div>
              <div className="text-xs uppercase tracking-wider text-[#9a9a9a] mt-1">
                Years Excellence
              </div>
            </div>
            <div className="w-px h-8 bg-[#e8e4de]" />
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">120+</div>
              <div className="text-xs uppercase tracking-wider text-[#9a9a9a] mt-1">
                Projects Completed
              </div>
            </div>
            <div className="w-px h-8 bg-[#e8e4de]" />
            <div>
              <div className="text-2xl font-bold text-[#1a1a1a]">5000+</div>
              <div className="text-xs uppercase tracking-wider text-[#9a9a9a] mt-1">
                Happy Families
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative hidden lg:block overflow-hidden">
          <Image
            src="/BG.png"
            alt="Space Age Group - Premium Real Estate Developer in Vadodara"
            fill
            className="object-cover object-center"
            priority
            sizes="45vw"
          />
        </div>

        {/* Mobile image */}
        <div className="lg:hidden relative h-72 overflow-hidden">
          <Image
            src="/BG.png"
            alt="Space Age Group - Premium Real Estate Developer in Vadodara"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
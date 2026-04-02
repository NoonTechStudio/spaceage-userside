// components/AboutSection/AboutSection.tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "25+", label: "Years of Excellence" },
  { value: "120+", label: "Projects Completed" },
  { value: "3000+", label: "Happy Families" },
  { value: "4", label: "Expert Directors" },
];

export default function AboutSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-28 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — Image */}
          <div className="group">
            <div
              className="relative overflow-hidden rounded-none"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/images/About.jpg"
                alt="Space Age Group Leadership"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Caption below image */}
            <p className="text-xs text-[#9a9a9a] mt-3 uppercase tracking-wider">
              SpaceAge Group · Vadodara
            </p>
          </div>

          {/* Right — Content */}
          <div>
            {/* Section Label */}
            <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium mb-6 block">
              About SpaceAge Group
            </span>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
              className="text-5xl lg:text-6xl text-[#1a1a1a]"
            >
              Crafting Legacy,
              <br />
              Building Trust
            </h2>

            {/* Body */}
            <div className="mt-6 space-y-4 text-base text-[#5a5a5a] leading-relaxed">
              <p>
                For over two decades, SpaceAge Group has been synonymous with excellence
                in real estate development across Vadodara.
              </p>
              <p>
                Our journey is defined by an unwavering commitment to quality, innovation,
                and the communities we serve. Every project we undertake reflects our
                dedication to creating spaces that inspire and endure.
              </p>
            </div>

            {/* Stats Row */}
            <div className="mt-10 pt-8 border-t border-[#e8e4de] grid grid-cols-4 gap-6">
              {STATS.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-[#9a9a9a] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="mt-10 flex gap-5 items-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-none hover:bg-[#333] transition-colors duration-200"
              >
                Discover Our Story
              </Link>
              <a
                href="tel:+916247137241"
                className="text-sm text-[#5a5a5a] underline underline-offset-4 hover:text-[#1a1a1a] transition-colors duration-200"
              >
                Talk to Experts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

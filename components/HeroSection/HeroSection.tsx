"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ── Replace these src paths with your actual images in /public/gallery/ ──
const SLIDES = [
  { src: "/images/test1.jpg",   alt: "Majestic mountains at sunrise" },
  { src: "/images/test2.jpg",   alt: "Turquoise coastal waters" },
  { src: "/images/test3.jpeg",   alt: "Ancient temple ruins" }
//   { src: "/gallery/hero-4.jpg",   alt: "Golden desert dunes" },
];

const SLIDE_DURATION = 6000; // ms

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState<number | null>(null);
  const [zooming, setZooming] = useState(true);
  const [loaded,  setLoaded]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  // Entry animation
  useEffect(() => { setLoaded(true); }, []);

  function goTo(index: number) {
    setPrev(current);
    setCurrent(index);
    setZooming(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setZooming(true)));
  }

  return (
    <section className="relative w-full h-dvh min-h-[600px] overflow-hidden flex flex-col">

      {/* ── CAROUSEL SLIDES ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={[
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out pointer-events-none",
              i === current ? "opacity-100 pointer-events-auto" : "opacity-0",
            ].join(" ")}
          >
            {/* Zoom-out wrapper */}
            <div className={`absolute inset-0 will-change-transform ${i === current && zooming ? "animate-zoom-out" : ""}`}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(8,8,8,0.28) 0%, rgba(8,8,8,0.08) 38%, rgba(8,8,8,0.60) 78%, rgba(8,8,8,0.92) 100%)"
          }}
        />
      </div>

      {/* ── HERO CONTENT ── */}
      <div
        className={[
          "relative z-10 mt-auto px-6 pb-20 md:px-12 max-w-3xl",
          "transition-all duration-[1000ms] delay-300 ease-out",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        <p className="font-sans text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-5">
          Discover the World with Us
        </p>

        <h1 className="font-serif text-[clamp(3rem,7vw,6rem)] font-black leading-[1.05] text-white mb-5">
          Journeys That <br />
          <span className="italic text-[#e6c97a]">Move the Soul</span>
        </h1>

        <p className="font-sans text-[clamp(0.95rem,1.4vw,1.1rem)] font-light leading-[1.85] text-white/70 max-w-[520px] tracking-wide">
          Handcrafted travel experiences across every continent — authentic,
          luxurious, unforgettable.
        </p>
      </div>

      {/* ── CAROUSEL DOTS ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-[3px] rounded-sm border-none cursor-pointer p-0 overflow-hidden transition-all duration-300"
            style={{
              width: i === current ? "32px" : "22px",
              background: "rgba(255,255,255,0.25)",
            }}
          >
            <span
              className={`absolute inset-0 rounded-sm origin-left bg-[#c9a84c] ${i === current ? "animate-dot-fill" : ""}`}
              style={{ transform: i === current ? undefined : "scaleX(0)" }}
            />
          </button>
        ))}
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10 w-7 h-11 border border-white/30 rounded-[14px] flex justify-center pt-1.5">
        <span className="w-1 h-2 bg-[#c9a84c] rounded-sm animate-scroll-bounce" />
      </div>

    </section>
  );
}
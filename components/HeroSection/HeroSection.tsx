"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/images/test1.jpg", alt: "Majestic mountains at sunrise" },
  { src: "/images/test2.jpg", alt: "Turquoise coastal waters" },
  { src: "/images/test3.jpeg", alt: "Ancient temple ruins" },
];

const SLIDE_DURATION = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [, setPrev] = useState<number | null>(null);
  const [zooming, setZooming] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
            <div
              className={`absolute inset-0 will-change-transform ${
                i === current && zooming ? "animate-zoom-out" : ""
              }`}
            >
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

        {/* Subtle dark overlay for text contrast */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-black/40" />
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%] z-[1] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.7) 100%)",
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
        <p className="font-sans text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-[#5eead4] mb-5">
          Vadodara&apos;s Trusted Developer
        </p>

        <h1 className="font-sans text-[clamp(2.8rem,6.5vw,5.5rem)] font-black leading-[1.05] text-white mb-5">
          Premium Living, <br />
          <span className="italic text-[#5eead4]">Lasting Legacy.</span>
        </h1>

        <p className="font-sans text-[clamp(0.95rem,1.4vw,1.1rem)] font-light leading-[1.85] text-white/70 max-w-[520px] tracking-wide">
          From landmark residential townships to vibrant commercial spaces —
          crafting Vadodara&apos;s skyline for over 25 years.
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
              className={`absolute inset-0 rounded-sm origin-left bg-[#14b8a6] ${
                i === current ? "animate-dot-fill" : ""
              }`}
              style={{ transform: i === current ? undefined : "scaleX(0)" }}
            />
          </button>
        ))}
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 right-6 md:right-12 z-10 w-7 h-11 border border-white/30 rounded-[14px] flex justify-center pt-1.5">
        <span className="w-1 h-2 bg-[#14b8a6] rounded-sm animate-scroll-bounce" />
      </div>
    </section>
  );
}

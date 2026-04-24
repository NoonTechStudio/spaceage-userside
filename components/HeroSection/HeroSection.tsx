// components/HeroSection/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { src: "/images/hero1.jpg", alt: "Luxury residential architecture", title: "Premium Living" },
  { src: "/images/Hero2.jpg", alt: "Modern commercial spaces", title: "Commercial Excellence" },
  { src: "/images/Hero3.jpg", alt: "Sustainable developments", title: "Eco-Conscious Design" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
      setAnimKey((prev) => prev + 1);
    }, 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${index === current ? "opacity-100" : "opacity-0"
              }`}
            style={{ willChange: "opacity" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              style={{
                animation: index === current
                  ? `kenBurnsOut 7s ease-out forwards`
                  : "none",
                animationDelay: "0ms",
                // Re-trigger by using animKey as part of inline key
                transform: index !== current ? "scale(1.08)" : undefined,
              }}
              key={index === current ? `slide-${animKey}` : `slide-idle-${index}`}
            />
          </div>
        ))}

        {/* Directional Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(15,15,15,0.75) 0%, rgba(15,15,15,0.35) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Slide Counter — bottom-right */}
      <div className="absolute bottom-8 right-8 z-10 hidden sm:block">
        <span className="text-xs text-white/50 font-mono">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slide Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrent(index); setAnimKey((prev) => prev + 1); }}
            className={`transition-all duration-300 ${index === current
              ? "w-8 h-1.5 bg-[#c9a84c]"
              : "w-4 h-1.5 bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Thin Gold Line at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#c9a84c] opacity-60 z-10" />
    </section>
  );
}
// components/PageHero/PageHero.tsx (Enhanced with Parallax)
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumbs?: Breadcrumb[];
  overlayOpacity?: number;
  height?: "full" | "large" | "medium" | "small";
  animated?: boolean;
  centered?: boolean;
  parallax?: boolean;
  showScrollIndicator?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  image = "/images/img1.jpg",
  breadcrumbs,
  overlayOpacity = 0.55,
  height = "large",
  animated = true,
  centered = false,
  parallax = true,
  showScrollIndicator = true,
}: PageHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = window.scrollY;
        setScrollY(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  const heightClasses = {
    full: "h-screen",
    large: "h-[70vh] min-h-[500px]",
    medium: "h-[60vh] min-h-[450px]",
    small: "h-[50vh] min-h-[400px]",
  };

  const imageTransform = parallax ? `translateY(${scrollY * 0.4}px)` : "none";

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${heightClasses[height]}`}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: imageTransform,
          transition: "transform 0.1s ease-out",
        }}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </div>

      {/* Clean Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,15,15,0.5) 0%, rgba(15,15,15,0.7) 100%)",
        }}
      />

      {/* Thin Gold Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 w-full bg-[#c9a84c]" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="w-full px-6 lg:px-8 pt-6 md:pt-8">
            <div className="max-w-7xl mx-auto">
              <nav
                className={`flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link href="/" className="text-white/50 hover:text-white transition-colors">
                  Home
                </Link>
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <span key={crumb.href ?? crumb.label} className="flex items-center gap-2">
                      <span className="text-white/40">›</span>
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className="text-white/50 hover:text-white/80 transition-colors duration-200"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-[#c9a84c]">{crumb.label}</span>
                      )}
                    </span>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div
                className={`transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${centered ? "text-center" : ""}`}
              >
                {/* Title */}
                <h1
                  className="font-bold text-white leading-[1.02]"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: centered
                      ? "clamp(2.5rem, 7vw, 5rem)"
                      : "clamp(3rem, 8vw, 6rem)",
                  }}
                >
                  {title}
                </h1>

                {/* Decorative Horizontal Rule (non-centered only) */}
                {!centered && (
                  <div className="w-16 h-0.5 bg-[#c9a84c] mt-5" />
                )}

                {/* Subtitle */}
                {subtitle && (
                  <p
                    className={`text-base text-white/70 mt-5 max-w-xl leading-relaxed ${
                      centered ? "mx-auto" : ""
                    }`}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && height !== "small" && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              Scroll
            </span>
            <div className="w-5 h-8 border border-white/20 flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-[#c9a84c] rounded-none" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

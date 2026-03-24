"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "CSR", href: "/csr" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "Google+",
    href: "https://plus.google.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function FlipLink({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
  solid: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative px-3.5 py-1.5 group overflow-hidden block"
      style={{ perspective: "400px" }}
    >
      <span
        className={[
          "block text-[14px] font-semibold tracking-[0.06em] uppercase select-none",
          "transition-all duration-300 ease-in-out origin-bottom",
          "group-hover:-translate-y-full group-hover:opacity-0",
          isActive ? "text-[#0d9488]" : "text-[#0f766e]",
        ].join(" ")}
        style={{ backfaceVisibility: "hidden" }}
      >
        {label}
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center text-[14px] font-semibold tracking-[0.06em] uppercase select-none text-[#14b8a6] transition-all duration-300 ease-in-out origin-top translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ backfaceVisibility: "hidden" }}
      >
        {label}
      </span>
      {isActive && (
        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#0d9488]" />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ribbonVisible, setRibbonVisible] = useState(true);
  const pathname = usePathname();
  const isHome =
    pathname === "/" ||
    pathname === "/projects" ||
    pathname.startsWith("/projects/") ||
    pathname === "/about";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setRibbonVisible(window.scrollY < 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = !isHome || scrolled;
  const ribbonH = ribbonVisible ? 36 : 0;
  const navH = 72;

  return (
    <>
      {/* ── TOP RIBBON ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-evenly px-6 md:px-14 transition-all duration-300 overflow-hidden bg-[#f0fdfa] border-b border-[#ccfbf1]"
        style={{ height: `${ribbonH}px`, opacity: ribbonVisible ? 1 : 0 }}
      >
        <div className="flex items-center gap-5">
          <a
            href="https://maps.google.com/?q=210+Silver+Coin+Akota+Vadodara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-[#0d9488] transition-colors whitespace-nowrap"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            210, Silver Coin, Akota, Vadodara
          </a>
          <span className="w-px h-3 bg-gray-300" />
          <a
            href="tel:+918980355444"
            className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-[#0d9488] transition-colors whitespace-nowrap"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.18 19.79 19.79 0 0 1 1.65 3.6 2 2 0 0 1 3.62 1.44h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.03a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 8980355444
          </a>
          <span className="w-px h-3 bg-gray-300" />
          <a
            href="mailto:info@spaceagegroup.net"
            className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-[#0d9488] transition-colors whitespace-nowrap"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            info@spaceagegroup.net
          </a>
        </div>
        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 bg-white hover:text-white hover:bg-[#0d9488] hover:border-[#0d9488] transition-all duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className={[
          "fixed left-0 right-0 z-50 flex items-center justify-evenly transition-all duration-300 ease-in-out",
          solid
            ? "bg-white/97 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.03)]"
            : "bg-transparent",
        ].join(" ")}
        style={{
          top: `${ribbonH}px`,
          height: `${navH}px`,
          paddingLeft: "clamp(1.5rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 3.5rem)",
        }}
      >
        <Link href="/" className="flex items-center h-full shrink-0">
          <Image
            src="/logo.png"
            alt="Space Age Group"
            width={200}
            height={60}
            className="object-contain"
            priority
            style={{ maxHeight: "52px", width: "auto" }}
          />
        </Link>
        <nav className="hidden md:flex gap-1 items-center h-full ml-auto">
          {NAV_LINKS.map((link) => (
            <FlipLink
              key={link.label}
              label={link.label}
              href={link.href}
              isActive={pathname === link.href}
              solid={solid}
            />
          ))}
        </nav>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="md:hidden relative z-50 flex flex-col justify-center items-end gap-[5px] w-8 h-8 ml-auto"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={[
                "block h-[2px] rounded-full transition-all duration-300 origin-center",
                solid || menuOpen ? "bg-gray-900" : "bg-white",
                i === 0 && menuOpen ? "translate-y-[7px] rotate-45 w-6" : "",
                i === 1 && menuOpen ? "opacity-0 w-5" : i === 1 ? "w-5" : "w-6",
                i === 2 && menuOpen ? "-translate-y-[7px] -rotate-45 w-6" : "",
              ].join(" ")}
            />
          ))}
        </button>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={[
          "fixed inset-0 z-40 flex flex-col bg-white",
          "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
          menuOpen ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div style={{ height: `${ribbonH + navH}px` }} className="shrink-0" />
        <div className="flex flex-col items-start justify-center flex-1 px-8 gap-3">
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "group flex items-center gap-4 py-3 w-full border-b border-gray-100 transition-colors duration-200",
                  active ? "text-[#0d9488]" : "text-gray-800 hover:text-[#0d9488]",
                ].join(" ")}
                style={{
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${i * 45}ms, opacity 0.4s ease ${i * 45}ms, color 0.2s`,
                }}
              >
                <span className="text-[10px] font-medium text-gray-400 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "Rubik, sans-serif" }}>
                  {link.label}
                </span>
                <svg
                  className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
        <div className="px-8 pb-8 pt-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-3">Get in touch</p>
          <div className="flex flex-col gap-1.5">
            <a href="tel:+918980355444" className="text-sm font-medium text-gray-700 hover:text-[#0d9488] transition-colors">
              +91 89803 55444
            </a>
            <a href="mailto:info@spaceagegroup.net" className="text-sm font-medium text-gray-700 hover:text-[#0d9488] transition-colors">
              info@spaceagegroup.net
            </a>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 hover:text-white hover:bg-[#0d9488] hover:border-[#0d9488] transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// components/Header/Header.tsx
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
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

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-500 ease-in-out ${scrolled ? "header-scrolled" : "header-top"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Space Age Group"
                width={160}
                height={44}
                className="object-contain"
                priority
                style={{ height: "auto", width: "auto", maxHeight: "44px" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 h-full">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-normal transition-colors duration-200 ${pathname === link.href
                    ? "text-[#1a1a1a]"
                    : "text-[#1a1a1a] hover:text-[#c9a84c]"
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#c9a84c]" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center border border-[#1a1a1a] text-[#1a1a1a] text-sm font-medium px-5 py-2 rounded-none hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8"
              >
                <span
                  className={`block h-0.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2 w-6" : "w-6"
                    } ${scrolled || menuOpen ? "bg-[#1a1a1a]" : "bg-white"}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0 w-6" : "w-5"
                    } ${scrolled || menuOpen ? "bg-[#1a1a1a]" : "bg-white"}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2 w-6" : "w-6"
                    } ${scrolled || menuOpen ? "bg-[#1a1a1a]" : "bg-white"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0f0f0f] transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 right-6 w-10 h-10 flex flex-col gap-1 justify-center items-center"
        >
          <span className="block h-0.5 w-6 bg-white rotate-45 translate-y-[3px]" />
          <span className="block h-0.5 w-6 bg-white -rotate-45 -translate-y-[3px]" />
        </button>

        <div className="h-full flex flex-col justify-between px-8 py-20 overflow-y-auto">
          {/* Nav Items */}
          <nav className="flex flex-col">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-baseline gap-5 py-4 border-b border-white/10 transition-colors duration-200 ${pathname === link.href ? "text-white" : "text-white/50 hover:text-white"
                  }`}
              >
                <span className="text-xs font-medium text-[#c9a84c] w-6 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Contact Details at Bottom */}
          <div className="pt-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium mb-4">
              Get in Touch
            </p>
            <div className="space-y-2">
              <a
                href="tel:+918980355444"
                className="block text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                +91 89803 55444
              </a>
              <a
                href="mailto:info@spaceagegroup.net"
                className="block text-sm text-white/50 hover:text-white transition-colors duration-200"
              >
                info@spaceagegroup.net
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
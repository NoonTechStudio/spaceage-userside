// components/Footer/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "CSR", href: "/csr" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  "Residential Development",
  "Commercial Construction",
  "Integrated Townships",
  "Architecture & Design",
  "Property Valuation",
  "Environmental Consulting",
  "Project Management",
  "Real Estate Advisory",
];

const SOCIAL = [
  { label: "FB", href: "https://facebook.com" },
  { label: "IG", href: "https://instagram.com" },
  { label: "LI", href: "https://linkedin.com" },
  { label: "X", href: "https://twitter.com" },
];

const NEWSLETTER_PLACEHOLDER = "Enter your email address";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-[#3282B8] text-white overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">

          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Space Age Group"
                width={160}
                height={48}
                className="object-contain"
              />
            </Link>

            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              Vadodara&apos;s most trusted real estate developer, crafting landmark
              residential and commercial spaces with uncompromising quality and
              unwavering dedication for over 25 years.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium mb-4">
                Subscribe to Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={NEWSLETTER_PLACEHOLDER}
                  className="flex-1 border-b border-white/20 bg-transparent text-white text-sm py-2.5 focus:border-[#c9a84c] outline-none placeholder:text-white/30 transition-colors duration-200"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="text-white/50 hover:text-[#c9a84c] transition-colors duration-200 text-lg px-2 pb-1"
                >
                  →
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-[#c9a84c] mt-2">
                  Thanks for subscribing! We&apos;ll keep you updated.
                </p>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium mb-6">
              Contact Us
            </h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href="tel:+916247137241"
                  className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                >
                  +91 6247 137 241
                </a>
              </div>

              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href="mailto:info@spaceagegroup.net"
                  className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                >
                  info@spaceagegroup.net
                </a>
              </div>

              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="text-sm text-white/40 leading-relaxed">
                  210, Silver Coin, Akota,
                  <br />
                  Vadodara, Gujarat - 390020
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-white/30 text-center md:text-left">
            © {year} Space Age Group. All rights reserved. | Crafted with ❤ by Noon Tech Studio &amp; ZainTech Technologies
          </p>

          {/* Social Links as plain text */}
          <div className="flex items-center gap-4">
            {SOCIAL.map((s, idx) => (
              <span key={s.label} className="flex items-center gap-4">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/30 hover:text-white transition-colors duration-200"
                >
                  {s.label}
                </a>
                {idx < SOCIAL.length - 1 && (
                  <span className="text-white/20 text-xs">·</span>
                )}
              </span>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-3 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-[#c9a84c] transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms" className="hover:text-[#c9a84c] transition-colors duration-200">
              Terms of Use
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/sitemap" className="hover:text-[#c9a84c] transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

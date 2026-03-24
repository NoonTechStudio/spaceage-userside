import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  /** Large bold page title — e.g. "About Us" */
  title: string;
  /** Short line shown bottom-right */
  subtitle?: string;
  /** Background image path */
  image: string;
  /** Optional breadcrumb trail */
  breadcrumbs?: Breadcrumb[];
}

/**
 * Full-width static banner hero — used on interior pages like About and Projects.
 * Sits directly behind the transparent Navbar via a negative-margin layout wrapper.
 */
export default function PageHero({
  title,
  subtitle,
  image,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "62vh", minHeight: "420px" }}
    >
      {/* ── Background Image ── */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ── Layered overlays ── */}
      {/* Base dark tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(8, 8, 20, 0.52)" }}
      />
      {/* Strong bottom-left gradient so title is always readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,8,20,0.75) 0%, rgba(8,8,20,0.10) 55%, transparent 100%)",
        }}
      />
      {/* Bottom fade for text area */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, rgba(8,8,20,0.70) 0%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-[var(--header-total)]">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="section-container pt-6">
            <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-200"
                    style={{
                      color:
                        i === breadcrumbs.length - 1
                          ? "#c9a84c"
                          : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        )}

        {/* Bottom row: title + subtitle */}
        <div className="section-container pb-12 md:pb-14 w-full flex items-end justify-between gap-8">
          <h1
            className="font-bold text-white leading-[1.0]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="hidden md:block text-sm leading-relaxed max-w-[280px] text-right flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── Gold accent bar at very bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(to right, #c9a84c 0%, rgba(201,168,76,0.4) 40%, transparent 100%)",
        }}
      />
    </section>
  );
}

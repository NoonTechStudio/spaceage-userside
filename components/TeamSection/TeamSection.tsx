// components/TeamSection/TeamSection.tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";

const TEAM = [
  {
    id: 1,
    name: "Taher Zabuawala",
    title: "Director",
    education: "BE.Civil · MBA (Marketing) · LLB",
    expertise: ["Property Valuation", "Project Development", "Arbitration"],
    credentials: [
      "Gov. Approved Property Valuer",
      "Gov. Approved Arbitrator",
      "25+ Years Experience",
    ],
    photo: "/images/Taher-Zabuawala.jpg",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: 2,
    name: "Ajab Zabuawala",
    title: "Director",
    education: "BE Civil · ME (Structure) · MBA (Finance)",
    expertise: ["Structural Engineering", "Financial Planning", "Project Management"],
    credentials: [
      "Gov. Approved Property Valuer",
      "Competent Person - Factories Act",
      "20+ Years Experience",
    ],
    photo: "/images/Ajab-Zabuawala.jpg",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: 3,
    name: "Juzer Nalwala",
    title: "Director",
    education: "BE Civil · MSc Hydrogeology (Germany)",
    expertise: ["Environmental Consulting", "Hydrogeology", "Ground Water"],
    credentials: [
      "Licensed Hydrogeologist",
      "Environmental Consultant",
      "15+ Years Experience",
    ],
    photo: "/images/Juzer-Nalwala.jpg",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: 4,
    name: "Amatullah Nalwala",
    title: "Director",
    education: "BArch · LLB · Master of Property Development (UNSW)",
    expertise: ["Architecture", "Property Law", "Investment Consulting"],
    credentials: [
      "Council of Architecture Licensed",
      "VMC & SMC Licensed",
      "Real Estate Investment Expert",
    ],
    photo: "/images/Amatullah-nalwala.jpg",
    social: { linkedin: "#", email: "#" },
  },
];

function TeamCard({ member }: { member: typeof TEAM[0] }) {
  return (
    <div className="group flex flex-col sm:flex-row bg-white border border-[#e8e4de] rounded-none transition-all duration-300 hover:border-[#c9a84c] hover:border-l-4">
      {/* Photo — square, left zone */}
      <div className="w-full sm:w-48 shrink-0 overflow-hidden">
        <div className="relative w-full h-48 sm:h-full">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover"
            style={{ filter: "grayscale(15%) saturate(90%)" }}
            sizes="(max-width: 640px) 100vw, 192px"
          />
        </div>
      </div>

      {/* Content — right zone */}
      <div className="flex-1 p-6">
        <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-medium">
          {member.title}
        </span>
        <h3
          className="text-xl font-bold text-[#1a1a1a] mt-1"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          }}
        >
          {member.name}
        </h3>
        <p className="text-sm text-[#9a9a9a] mt-1">{member.education}</p>

        <div className="border-t border-[#e8e4de] mt-4 pt-4">
          <div className="space-y-1">
            {member.credentials.map((cred, idx) => (
              <p key={idx} className="text-xs text-[#5a5a5a] leading-relaxed">
                · {cred}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-28 md:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-medium mb-4 block">
            Our Leadership
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
            className="text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6"
          >
            Meet the Visionaries
            <br />
            Behind Every Success
          </h2>
          <p className="text-base text-[#5a5a5a] max-w-2xl mx-auto leading-relaxed">
            Our leadership team brings together decades of expertise in engineering,
            architecture, law, and sustainable development — united by a shared
            vision to build better futures.
          </p>
        </div>

        {/* Team Grid — 2 per row on desktop, horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 border border-[#e8e4de]">
            <svg
              className="w-5 h-5 text-[#c9a84c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-[#5a5a5a]">
              Combined expertise of over <strong className="text-[#1a1a1a]">80+ years</strong> in construction, law, and real estate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

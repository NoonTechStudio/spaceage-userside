// components/TeamSection/TeamSection.tsx
"use client";

import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";

interface DBTeamMember {
  _id: string;
  name: string;
  position: string;
  study: string;
  experience: string;
  description: string;
  relationToGroup: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  order?: number;
}

interface TeamSectionProps {
  team?: DBTeamMember[];
}

interface UnifiedMember {
  id: string;
  name: string;
  title: string;
  education: string;
  credentials: string[];
  photo: string;
  social: { linkedin?: string; instagram?: string; facebook?: string; email?: string };
}

const TEAM: UnifiedMember[] = [
  {
    id: "1",
    name: "Taher Zabuawala",
    title: "Director",
    education: "BE.Civil · MBA (Marketing) · LLB",
    credentials: [
      "Gov. Approved Property Valuer",
      "Gov. Approved Arbitrator",
      "25+ Years Experience",
    ],
    photo: "/images/Taher-Zabuawala.jpg",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: "2",
    name: "Ajab Zabuawala",
    title: "Director",
    education: "BE Civil · ME (Structure) · MBA (Finance)",
    credentials: [
      "Gov. Approved Property Valuer",
      "Competent Person - Factories Act",
      "20+ Years Experience",
    ],
    photo: "/images/Ajab-Zabuawala.jpg",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: "3",
    name: "Juzer Nalwala",
    title: "Director",
    education: "BE Civil · MSc Hydrogeology (Germany)",
    credentials: [
      "Licensed Hydrogeologist",
      "Environmental Consultant",
      "15+ Years Experience",
    ],
    photo: "/images/Juzer-Nalwala.jpg",
    social: { linkedin: "#", email: "#" },
  },
  {
    id: "4",
    name: "Amatullah Nalwala",
    title: "Director",
    education: "BArch · LLB · Master of Property Development (UNSW)",
    credentials: [
      "Council of Architecture Licensed",
      "VMC & SMC Licensed",
      "Real Estate Investment Expert",
    ],
    photo: "/images/Amatullah-nalwala.jpg",
    social: { linkedin: "#", email: "#" },
  },
];

function TeamCard({ member }: { member: UnifiedMember }) {
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

        {/* Social Icons */}
        {(member.social.linkedin || member.social.instagram || member.social.facebook) && (
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#e8e4de]/60">
            {member.social.linkedin && member.social.linkedin !== "#" && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#9a9a9a] hover:text-[#c9a84c] transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {member.social.instagram && member.social.instagram !== "#" && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[#9a9a9a] hover:text-[#c9a84c] transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            )}
            {member.social.facebook && member.social.facebook !== "#" && (
              <a
                href={member.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[#9a9a9a] hover:text-[#c9a84c] transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamSection({ team }: TeamSectionProps) {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    setUseMock(localStorage.getItem("use_mock_data") === "true");
  }, []);

  const activeTeam = !useMock && team && team.length > 0 ? team.map(member => {
    // Get only the first line of description and truncate if too long
    const bioLine = member.description ? member.description.split("\n")[0].trim() : "";
    const cleanBio = bioLine.length > 50 ? bioLine.substring(0, 50) + "..." : bioLine;

    return {
      id: member._id,
      name: member.name,
      title: member.position,
      education: member.study,
      credentials: [
        member.relationToGroup,
        member.experience,
        cleanBio
      ].filter(Boolean).slice(0, 3),
      photo: member.image?.url || "/images/team-placeholder.jpg",
      social: {
        linkedin: member.socialLinks?.linkedin || "",
        instagram: member.socialLinks?.instagram || "",
        facebook: member.socialLinks?.facebook || "",
        email: "#"
      }
    };
  }) : TEAM;

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
          {activeTeam.map((member) => (
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

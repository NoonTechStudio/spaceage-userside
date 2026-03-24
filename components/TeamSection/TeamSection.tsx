"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  education: string;
  credentials: string[];
  photo: string;
}

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Taher Zabuawala",
    title: "Director",
    education: "BE.Civil · MBA (Marketing) · LLB",
    credentials: [
      "Gov. Approved Property Valuer under Wealth Tax Act & Black Money Act",
      "Gov. Approved Arbitrator",
      "Project Development & Management",
    ],
    photo: "/images/Taher-Zabuawala.jpg",
  },
  {
    id: 2,
    name: "Ajab Zabuawala",
    title: "Director",
    education: "BE Civil · ME (Structure) · MBA (Finance)",
    credentials: [
      "Gov. Approved Property Valuer under Wealth Tax Act & Black Money Act",
      "Competent Person under Section 6 & 112 of Factories Act for Structure Stability",
    ],
    photo: "/images/Ajab-Zabuawala.jpg",
  },
  {
    id: 3,
    name: "Juzer Nalwala",
    title: "Director",
    education: "BE Civil · MSc Hydrogeology (Germany)",
    credentials: [
      "Environmental Consultant",
      "Licensed Hydrogeologist Works",
      "Ground Water Consultant",
      "Project Manager & Property Valuer",
    ],
    photo: "/images/Juzer-Nalwala.jpg",
  },
  {
    id: 4,
    name: "Amatullah Juzer Nalwala",
    title: "Director",
    education: "BArch · LLB · Master of Property & Development (UNSW, Sydney)",
    credentials: [
      "Licensed under the Council of Architecture of India",
      "VMC & SMC Licensed",
      "Property Valuer",
      "Real Estate Investment Consultant",
    ],
    photo: "/images/Amatullah-nalwala.jpg",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];

  return (
    <div
      className={`reveal-up ${delays[index]} team-card group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm`}
    >
      <div
        className="relative w-full overflow-hidden bg-gray-50"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0d9488]" />
      </div>

      <div className="p-6">
        <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-[#0d9488] bg-[#f0fdfa] px-2.5 py-1 rounded mb-4">
          {member.title}
        </span>
        <h3 className="font-bold text-gray-900 text-[1.35rem] leading-snug mb-5">
          {member.name}
        </h3>
        <div className="w-8 h-[2px] bg-gray-200 mb-5" />
        <p className="text-[0.8rem] text-gray-400 font-medium mb-6 leading-relaxed tracking-wide">
          {member.education}
        </p>
        <ul className="space-y-3">
          {member.credentials.map((cred, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#0d9488] flex-shrink-0" />
              <span className="text-[0.85rem] text-gray-600 leading-snug">
                {cred}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="team" className="w-full bg-white py-24 md:py-32">
      <div className="section-container">
        <div className="text-center mb-20">
          <div className="reveal-up inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#0d9488]" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#0d9488]">
              Our Leadership
            </span>
            <span className="w-6 h-px bg-[#0d9488]" />
          </div>

          <h2 className="reveal-up delay-100 text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5">
            Meet the experts behind
            <br />
            <span className="text-[#0d9488]">every landmark.</span>
          </h2>

          <p className="reveal-up delay-200 text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
            Our leadership brings together decades of expertise in civil
            engineering, architecture, law, and sustainability — united by a
            shared vision to build better futures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        <p className="reveal-up delay-500 text-center text-sm text-gray-400 mt-16">
          Combined expertise of over{" "}
          <span className="font-semibold text-[#0d9488]">80+ years</span> in
          construction, law, and real estate.
        </p>
      </div>
    </section>
  );
}

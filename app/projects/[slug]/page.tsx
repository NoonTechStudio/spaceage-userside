// app/projects/[slug]/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import Footer from "@/components/Footer/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Specification {
  field: string;
  value: string;
}

interface Amenity {
  name: string;
  icon: string;
  category: string;
}

interface Photo {
  id: number;
  url: string;
  roomType: string;
}

interface FloorPlan {
  type: string;
  image: string;
  area: string;
}

// ─── Demo Data ────────────────────────────────────────────────────────────────

const PROJECT_DATA = {
  id: 1,
  slug: "space-age-residency",
  title: "Space Age Residency",
  headline: "2 & 3 BHK Luxurious Flats",
  status: "Ongoing",
  shortIntro: "Experience modern living at its finest with premium amenities and thoughtful design. Located in the heart of Alkapuri, this project offers unparalleled comfort and convenience.",
  
  heroImages: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=900&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&h=900&fit=crop",
  ],
  
  layoutPlan: "/images/Fplan-1.png",
  
  floorPlans: [
    { type: "3BHK", image: "/images/FP-1.png", area: "850 sq ft" },
    { type: "2BHK", image: "/images/FP-2.png", area: "1200 sq ft" },
    { type: "Penthouse", image: "/images/FP-3.png", area: "1600 sq ft" },
  ],
  
  commonSpecs: [
    { field: "Structure", value: "RCC Frame Structure with Earthquake Resistant Design" },
    { field: "Flooring", value: "Vitrified Tiles in Living/Dining, Ceramic Tiles in Bedrooms" },
    { field: "Doors", value: "Decorative Flush Doors with Premium Hardware" },
    { field: "Windows", value: "UPVC Sliding Windows with Mosquito Net" },
    { field: "Walls", value: "Premium Emulsion Paint with Putty Finish" },
    { field: "Plumbing", value: "CP Fittings of Jaquar/Kohler or Equivalent" },
    { field: "Electrical", value: "Anchor/Anchor Roma or Equivalent Switches with Copper Wiring" },
    { field: "Lift", value: "High-Speed VTF Elevators with Backup" },
  ],
  
  commercialSpecs: [
    { field: "Base Price", value: "₹5,999 per sq ft (All Inclusive)" },
    { field: "Payment Plan", value: "10% Booking, 80% Construction Linked, 10% Possession" },
    { field: "Possession Date", value: "December 2026" },
    { field: "RERA Number", value: "GJ/RVR/2025/001234" },
    { field: "Bank Approval", value: "SBI, HDFC, ICICI, Axis, Yes Bank" },
    { field: "Maintenance", value: "₹5 per sq ft (Annual Advance)" },
    { field: "GST", value: "5% (with ITC Benefit)" },
    { field: "Car Parking", value: "One Covered Car Park Included" },
  ],
  
  amenities: [
    { name: "Swimming Pool", icon: "🏊", category: "Recreation" },
    { name: "Gymnasium", icon: "💪", category: "Fitness" },
    { name: "Clubhouse", icon: "🏛️", category: "Recreation" },
    { name: "Jogging Track", icon: "🏃", category: "Fitness" },
    { name: "Children Play Area", icon: "🎠", category: "Kids" },
    { name: "Landscaped Garden", icon: "🌿", category: "Green Spaces" },
    { name: "CCTV Surveillance", icon: "📹", category: "Security" },
    { name: "24/7 Security", icon: "🛡️", category: "Security" },
    { name: "Power Backup", icon: "⚡", category: "Utilities" },
    { name: "Lift / Elevator", icon: "🛗", category: "Utilities" },
    { name: "Car Parking", icon: "🅿️", category: "Utilities" },
    { name: "Indoor Games", icon: "🎯", category: "Recreation" },
    { name: "Yoga Deck", icon: "🧘", category: "Wellness" },
    { name: "Senior Citizen Sit-out", icon: "👴", category: "Community" },
  ],
  
  samplePhotos: [
    { id: 1, url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop", roomType: "Living Room" },
    { id: 2, url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop", roomType: "Master Bedroom" },
    { id: 3, url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop", roomType: "Kitchen" },
    { id: 4, url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop", roomType: "Bathroom" },
    { id: 5, url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop", roomType: "Dining Area" },
  ],
  
  virtualTour: {
    type: "YouTube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Take a virtual walkthrough of our stunning 3BHK sample flat with premium finishes and smart home features."
  },
  
  brochureUrl: "/brochures/space-age-residency.pdf",
};

// ─── Components ─────────────────────────────────────────────────────────────

function SectionWrapper({ children, title, className = "" }: { children: React.ReactNode; title?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref} className={`py-16 border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {title && (
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold mb-3 block">
              {title}
            </span>
            <div className="w-12 h-px bg-[#c9a84c]" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function HeroCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  
  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-900">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`Hero ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ))}
      
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 h-0.5 bg-[#c9a84c]"
                : "w-4 h-0.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-20"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-20"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

function SpecificationsTable({ specs, title }: { specs: Specification[]; title?: string }) {
  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      {title && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-gray-100">
        {specs.map((spec, idx) => (
          <div key={idx} className="px-6 py-4 flex flex-col md:flex-row md:items-start gap-2 hover:bg-gray-50 transition-colors">
            <div className="md:w-1/3">
              <span className="text-xs uppercase tracking-wider text-[#c9a84c] font-semibold">
                {spec.field}
              </span>
            </div>
            <div className="md:w-2/3">
              <p className="text-sm text-gray-700 leading-relaxed">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmenitiesGrid({ amenities }: { amenities: Amenity[] }) {
  const categories = [...new Set(amenities.map(a => a.category))];
  
  return (
    <div className="space-y-10">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
            {category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {amenities.filter(a => a.category === category).map((amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-[#c9a84c]/5 transition-colors group cursor-default"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{amenity.icon}</span>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto]);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer overflow-hidden bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.roomType}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="p-4">
              <span className="text-xs uppercase tracking-wider text-[#c9a84c] font-semibold">
                {photo.roomType}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#c9a84c] transition-colors z-10"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh]">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.roomType}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="text-center mt-4">
              <p className="text-white text-sm uppercase tracking-wider">{selectedPhoto.roomType}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VirtualTour({ tour }: { tour: typeof PROJECT_DATA.virtualTour }) {
  const getEmbedUrl = () => {
    if (tour.type === "YouTube" && tour.embedUrl.includes("youtube.com/embed/")) {
      return tour.embedUrl;
    }
    return tour.embedUrl;
  };
  
  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={getEmbedUrl()}
          title="Virtual Tour"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {tour.description && (
        <p className="text-sm text-gray-600 leading-relaxed mt-4">{tour.description}</p>
      )}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="px-2 py-1 bg-gray-100 rounded">{tour.type}</span>
        <span>Virtual Tour</span>
      </div>
    </div>
  );
}

function DownloadBrochure() {
  const handleDownload = () => {
    // In real implementation, this would download the actual PDF
    alert("Brochure download started. (Demo - PDF would download here)");
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c9a84c]/10 rounded-full mb-4">
        <svg className="w-8 h-8 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">Download Brochure</h3>
      <p className="text-sm text-gray-500 mb-6">Get detailed project information, floor plans, and pricing in our comprehensive brochure (PDF, 5.2 MB)</p>
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-gray-900 font-semibold text-sm hover:bg-[#b8962e] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download PDF Brochure
      </button>
      <p className="text-xs text-gray-400 mt-4">PDF only · 5.2 MB</p>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ProjectDetailsPage() {
  const params = useParams();
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  
  const sections = [
    { id: "overview", label: "Overview", icon: "ℹ️" },
    { id: "specifications", label: "Specifications", icon: "📋" },
    { id: "amenities", label: "Amenities", icon: "🏊" },
    { id: "floor-plans", label: "Floor Plans", icon: "📐" },
    { id: "gallery", label: "Gallery", icon: "📸" },
    { id: "virtual-tour", label: "Virtual Tour", icon: "🎥" },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
      
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);
  
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  }, []);
  
  return (
    <LayoutWrapper>
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <HeroCarousel images={PROJECT_DATA.heroImages} />
        
        {/* Project Info Bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold">
                    {PROJECT_DATA.status}
                  </span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs uppercase tracking-wider text-gray-400">RERA Registered</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                  {PROJECT_DATA.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">{PROJECT_DATA.headline}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => scrollToSection("virtual-tour")}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                >
                  Virtual Tour
                </button>
                <button
                  onClick={() => scrollToSection("brochure")}
                  className="px-5 py-2.5 bg-[#c9a84c] text-gray-900 text-sm font-semibold hover:bg-[#b8962e] transition-colors"
                >
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Short Intro */}
        <SectionWrapper title="Introduction">
          <div className="max-w-3xl">
            <p className="text-gray-600 leading-relaxed text-lg">
              {PROJECT_DATA.shortIntro}
            </p>
          </div>
        </SectionWrapper>
        
        {/* Sticky Navigation */}
        <div
          className={`sticky top-[72px] z-40 bg-white border-b border-gray-100 transition-shadow duration-300 ${
            isSticky ? "shadow-sm" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-6 py-3 scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 px-1 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeSection === section.id
                      ? "text-gray-900 border-b-2 border-[#c9a84c]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Common Specifications */}
        <div id="specifications">
          <SectionWrapper title="Common Specifications">
            <SpecificationsTable specs={PROJECT_DATA.commonSpecs} title="Building Specifications" />
          </SectionWrapper>
        </div>
        
        {/* Commercial Specifications */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 mb-8">
          <SpecificationsTable specs={PROJECT_DATA.commercialSpecs} title="Commercial Details & Pricing" />
        </div>
        
        {/* Layout Plan */}
        <div id="overview">
          <SectionWrapper title="Layout Plan">
            <div className="relative aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={PROJECT_DATA.layoutPlan}
                alt="Site Layout Plan"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer" />
            </div>
            <p className="text-sm text-gray-500 mt-3">Master plan showing project layout, tower positions, and green spaces</p>
          </SectionWrapper>
        </div>
        
        {/* Floor Plans */}
        <div id="floor-plans">
          <SectionWrapper title="Floor Plans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECT_DATA.floorPlans.map((plan: FloorPlan, idx: number) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                    <Image
                      src={plan.image}
                      alt={`${plan.type} Floor Plan`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-semibold text-gray-900">{plan.type}</h3>
                    <p className="text-sm text-gray-500">{plan.area}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
        
        {/* Amenities */}
        <div id="amenities">
          <SectionWrapper title="Amenities">
            <AmenitiesGrid amenities={PROJECT_DATA.amenities} />
          </SectionWrapper>
        </div>
        
        {/* Sample House Photos */}
        <div id="gallery">
          <SectionWrapper title="Sample House Photos">
            <PhotoGallery photos={PROJECT_DATA.samplePhotos} />
          </SectionWrapper>
        </div>
        
        {/* Virtual Tour & Brochure Row */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="virtual-tour">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold">Virtual Tour</span>
                <div className="w-12 h-px bg-[#c9a84c] mt-2" />
              </div>
              <VirtualTour tour={PROJECT_DATA.virtualTour} />
            </div>
            
            <div id="brochure">
              <div className="mb-4">
                <span className="text-xs uppercase tracking-[0.22em] text-[#c9a84c] font-semibold">Download Brochure</span>
                <div className="w-12 h-px bg-[#c9a84c] mt-2" />
              </div>
              <DownloadBrochure />
            </div>
          </div>
        </div>
        
        {/* Enquiry CTA */}
        <div className="bg-gray-900 mt-8">
          <div className="max-w-4xl mx-auto text-center py-16 px-6">
            <h2 className="text-3xl font-serif font-bold text-white">Interested in This Project?</h2>
            <p className="text-gray-400 mt-3">Get detailed pricing, floor plans, and schedule a site visit</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button className="px-8 py-3 bg-[#c9a84c] text-gray-900 font-semibold hover:bg-[#b8962e] transition-colors">
                Request Callback
              </button>
              <button className="px-8 py-3 border border-gray-700 text-white hover:border-gray-500 transition-colors">
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </LayoutWrapper>
  );
}
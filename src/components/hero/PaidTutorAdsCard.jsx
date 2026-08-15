"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ChevronLeft, ChevronRight, GraduationCap, MapPin, Star, UserCheck } from "lucide-react";

export default function PaidTutorAdsCard({ ads }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback demo ads matching the wireframe design
  const displayAds = ads && ads.length > 0 ? ads : [
    {
      id: "demo1",
      tutorSlug: "physics-expert",
      tutorName: "Kamal Wickramasinghe",
      university: "B.Sc. Eng (Hons) — University of Moratuwa",
      location: "Colombo / Islandwide",
      languages: ["English", "Sinhala"],
      rating: 5.0,
      title: "Physics Expert A/L & O/L",
      tagline: "Clear concepts. Better grades. Brighter future.",
      ctaText: "View Tutor Profile",
      badge: "PAID AD",
      tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "demo2",
      tutorSlug: "ict-master",
      tutorName: "Dilshan Jayasinghe",
      university: "B.Sc. Computer Science — University of Colombo",
      location: "Kandy / Online",
      languages: ["English"],
      rating: 4.9,
      title: "ICT Masterclass A/L & O/L",
      tagline: "Master Python. Excel in Exams. Build Future.",
      ctaText: "View Tutor Profile",
      badge: "FEATURED AD",
      tutorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const currentAd = displayAds[currentIndex % displayAds.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayAds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayAds.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 p-4 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-full relative">
      <div className="flex flex-col h-full space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Megaphone size={14} />
            </div>
            <h3 className="font-extrabold text-sm text-dark">Featured Tutor Ads</h3>
          </div>
          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-teal-700 text-white shadow-2xs">
            {currentAd.badge || "PAID AD"}
          </span>
        </div>

        {/* Tall Big Paid Advertisement Banner */}
        <div className="relative flex-1 min-h-[340px] rounded-2xl bg-gradient-to-br from-[#e6f7f2] via-[#d2f1e8] to-[#bde7dc] p-4 lg:p-5 border border-teal-200/80 shadow-inner flex flex-col justify-between overflow-hidden">
          
          {/* Top Info Section */}
          <div className="space-y-2.5 z-10 max-w-[62%] sm:max-w-[58%]">
            
            {/* Tutor Name Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-dark shadow-2xs border border-white/80">
              <UserCheck size={12} className="text-teal-700 shrink-0" />
              <span className="truncate max-w-[140px]">{currentAd.tutorName}</span>
            </div>

            {/* Ad Headline */}
            <h4 className="font-black text-lg sm:text-xl lg:text-2xl text-dark leading-tight tracking-tight">
              {currentAd.title}
            </h4>

            {/* Tagline Bullet Points */}
            <div className="space-y-1 text-[11px] font-bold text-gray-700 leading-snug">
              {currentAd.tagline ? (
                currentAd.tagline.split(".").map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  return (
                    <p key={idx} className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />
                      <span className="truncate">{trimmed}.</span>
                    </p>
                  );
                })
              ) : (
                <>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />Clear concepts.</p>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />Better grades.</p>
                </>
              )}
            </div>

            {/* Rich Tutor Metadata Pills */}
            <div className="space-y-1 pt-1 text-[10px] text-teal-950 font-medium">
              <div className="flex items-center gap-1 truncate bg-white/40 backdrop-blur-2xs px-2 py-0.5 rounded-md border border-teal-200/50">
                <GraduationCap size={11} className="text-teal-800 shrink-0" />
                <span className="truncate">{currentAd.university || "Qualified Educator"}</span>
              </div>
              <div className="flex items-center gap-1 truncate bg-white/40 backdrop-blur-2xs px-2 py-0.5 rounded-md border border-teal-200/50">
                <MapPin size={11} className="text-teal-800 shrink-0" />
                <span className="truncate">{currentAd.location || "Online & Physical Classes"}</span>
              </div>
              <div className="flex items-center gap-1 truncate bg-white/40 backdrop-blur-2xs px-2 py-0.5 rounded-md border border-teal-200/50">
                <Star size={11} className="text-amber-500 fill-amber-500 shrink-0" />
                <span>{currentAd.rating || 5.0} • Verified Tutor</span>
              </div>
            </div>
          </div>

          {/* Right Standing Tutor Portrait Photo (Elegantly Framed) */}
          <div className="absolute right-3.5 top-3.5 bottom-3.5 w-[36%] sm:w-[38%] flex items-center justify-end z-10">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/90 shadow-xl bg-teal-900/10 relative group">
              {currentAd.tutorImage ? (
                <img
                  src={currentAd.tutorImage}
                  alt={currentAd.tutorName}
                  className="w-full h-full object-cover object-[top_center] transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-teal-800 text-white font-black text-4xl flex items-center justify-center">
                  {currentAd.tutorName?.charAt(0) || "T"}
                </div>
              )}
              {/* Soft overlay gradient at bottom of photo */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-teal-950/60 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Bottom Left CTA Button */}
          <div className="z-10 pt-3">
            <Link
              href={`/tutors/${currentAd.tutorSlug || currentAd.tutorId}`}
              className="inline-flex items-center justify-center px-4 py-2 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-bold text-xs rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {currentAd.ctaText || "View Tutor Profile"}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 mt-2.5 shrink-0">
        <button
          onClick={handlePrev}
          className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Previous Ad"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1">
          {displayAds.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-5 bg-teal-700" : "w-1.5 bg-gray-200"
              }`}
              aria-label={`Go to ad slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Next Ad"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

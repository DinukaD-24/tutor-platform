"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ChevronLeft, ChevronRight, GraduationCap, MapPin, Star, UserCheck, ArrowUpRight } from "lucide-react";

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
        {/* Top Card Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Megaphone size={14} />
            </div>
            <h3 className="font-extrabold text-sm text-dark">Featured Tutor Ads</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-teal-700 text-white shadow-2xs">
            {currentAd.badge || "PAID AD"}
          </span>
        </div>

        {/* Big Paid Advertisement Card */}
        <div className="flex-1 rounded-2xl bg-gradient-to-br from-[#e6f7f2] via-[#d2f1e8] to-[#bde7dc] p-4 border border-teal-200/80 shadow-inner flex flex-col justify-between">
          
          <div className="space-y-3">
            {/* Tutor Profile Header Bar */}
            <div className="flex items-center justify-between gap-2 bg-white/80 backdrop-blur-md p-2 rounded-xl border border-white/90 shadow-2xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-teal-200 bg-teal-100 shrink-0">
                  {currentAd.tutorImage ? (
                    <img src={currentAd.tutorImage} alt={currentAd.tutorName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full text-teal-800 font-bold flex items-center justify-center text-xs">
                      {currentAd.tutorName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-xs text-dark truncate">{currentAd.tutorName}</h5>
                  <p className="text-[10px] font-semibold text-teal-700 truncate">{currentAd.tutorSubject || "Verified Tutor"}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-md text-[10px] font-extrabold text-amber-700 border border-amber-200/60 shrink-0">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span>{currentAd.rating || 5.0}</span>
              </div>
            </div>

            {/* Ad Headline & Photo Section */}
            <div className="grid grid-cols-12 gap-3 items-center pt-1">
              <div className="col-span-7 space-y-2">
                <h4 className="font-black text-base lg:text-lg text-dark leading-tight tracking-tight">
                  {currentAd.title}
                </h4>

                {/* Tagline list */}
                <div className="space-y-1 text-[11px] font-bold text-gray-700 leading-snug">
                  {currentAd.tagline ? (
                    currentAd.tagline.split(".").map((line, idx) => {
                      const trimmed = line.trim();
                      if (!trimmed) return null;
                      return (
                        <p key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0 mt-1" />
                          <span className="leading-tight">{trimmed}.</span>
                        </p>
                      );
                    })
                  ) : (
                    <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />Clear concepts & better grades.</p>
                  )}
                </div>
              </div>

              {/* Tutor Photo Card */}
              <div className="col-span-5 flex justify-end">
                <div className="w-24 h-28 lg:w-28 lg:h-32 rounded-xl overflow-hidden border-2 border-white shadow-md bg-teal-900/10 shrink-0">
                  {currentAd.tutorImage ? (
                    <img
                      src={currentAd.tutorImage}
                      alt={currentAd.tutorName}
                      className="w-full h-full object-cover object-[top_center]"
                    />
                  ) : (
                    <div className="w-full h-full bg-teal-800 text-white font-black text-2xl flex items-center justify-center">
                      {currentAd.tutorName?.charAt(0) || "T"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Metadata Badges */}
            <div className="grid grid-cols-1 gap-1 text-[10px] text-teal-950 font-medium pt-1">
              {currentAd.university && (
                <div className="flex items-center gap-1.5 truncate bg-white/50 backdrop-blur-2xs px-2.5 py-1 rounded-lg border border-teal-200/60">
                  <GraduationCap size={12} className="text-teal-800 shrink-0" />
                  <span className="truncate">{currentAd.university}</span>
                </div>
              )}
              {currentAd.location && (
                <div className="flex items-center gap-1.5 truncate bg-white/50 backdrop-blur-2xs px-2.5 py-1 rounded-lg border border-teal-200/60">
                  <MapPin size={12} className="text-teal-800 shrink-0" />
                  <span className="truncate">{currentAd.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA Button */}
          <div className="pt-3">
            <Link
              href={`/tutors/${currentAd.tutorSlug || currentAd.tutorId}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-bold text-xs rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {currentAd.ctaText || "View Tutor Profile"}
              <ArrowUpRight size={14} />
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";

export default function PaidTutorAdsCard({ ads }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback demo ads matching the wireframe design
  const displayAds = ads && ads.length > 0 ? ads : [
    {
      id: "demo1",
      tutorSlug: "physics-expert",
      tutorName: "Kamal Wickramasinghe",
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
    <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-full relative">
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <Megaphone size={16} />
            </div>
            <h3 className="font-extrabold text-base text-dark">Tutor Ads</h3>
          </div>
          <Link href="/tutors" className="text-xs font-bold text-primary hover:underline">
            View all
          </Link>
        </div>

        {/* Tall Big Paid Advertisement Banner (Matching Wireframe) */}
        <div className="relative flex-1 min-h-[420px] rounded-3xl bg-gradient-to-b from-[#e3f4ee] via-[#d6f0ea] to-[#c7ebe3] p-6 border border-teal-200/60 shadow-inner flex flex-col justify-between overflow-hidden">
          
          {/* Top Title & Taglines */}
          <div className="space-y-4 z-10 max-w-[65%] sm:max-w-[60%]">
            <h4 className="font-black text-2xl sm:text-3xl text-dark leading-tight tracking-tight">
              {currentAd.title}
            </h4>

            <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">
              {currentAd.tagline ? (
                currentAd.tagline.split(".").map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  return (
                    <p key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />
                      {trimmed}.
                    </p>
                  );
                })
              ) : (
                <>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />Clear concepts.</p>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />Better grades.</p>
                  <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0" />Brighter future.</p>
                </>
              )}
            </div>
          </div>

          {/* Right Standing Tutor Portrait Photo */}
          <div className="absolute right-0 bottom-0 top-12 w-[48%] sm:w-[45%] flex items-end justify-end pointer-events-none overflow-hidden">
            {currentAd.tutorImage ? (
              <img
                src={currentAd.tutorImage}
                alt={currentAd.tutorName}
                className="w-full h-[95%] object-cover object-top rounded-tl-3xl border-l-2 border-t-2 border-white/60 shadow-2xl"
              />
            ) : (
              <div className="w-full h-[85%] bg-teal-800 text-white font-black text-5xl flex items-center justify-center rounded-tl-3xl shadow-2xl">
                {currentAd.tutorName?.charAt(0) || "T"}
              </div>
            )}
          </div>

          {/* Bottom Left CTA Button */}
          <div className="z-10 pt-6">
            <Link
              href={`/tutors/${currentAd.tutorSlug || currentAd.tutorId}`}
              className="inline-flex items-center justify-center px-5 py-3 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {currentAd.ctaText || "View Tutor Profile"}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4 shrink-0">
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-xs"
          aria-label="Previous Ad"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1.5">
          {displayAds.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-6 bg-teal-700" : "w-2 bg-gray-200"
              }`}
              aria-label={`Go to ad slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-xs"
          aria-label="Next Ad"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

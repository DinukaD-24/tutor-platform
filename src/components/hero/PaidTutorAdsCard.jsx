"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";

export default function PaidTutorAdsCard({ ads }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback demo ads if no paid ads in database yet
  const displayAds = ads && ads.length > 0 ? ads : [
    {
      id: "demo1",
      tutorSlug: "physics-expert",
      tutorName: "Kamal Wickramasinghe",
      title: "Physics Expert A/L & O/L",
      tagline: "Clear concepts. Better grades. Brighter future.",
      ctaText: "View Tutor Profile",
      badge: "PAID AD",
      tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "demo2",
      tutorSlug: "ict-master",
      tutorName: "Dilshan Jayasinghe",
      title: "ICT Masterclass A/L",
      tagline: "Python, Networking, Database & Logic Gates Made Easy.",
      ctaText: "View Tutor Profile",
      badge: "FEATURED AD",
      tutorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
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
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-full relative">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
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

        {/* Big Paid Advertisement Banner */}
        <div className="relative rounded-2xl bg-gradient-to-br from-teal-50 via-cyan-50/70 to-emerald-100/60 p-5 border border-teal-100/70 min-h-[260px] flex flex-col justify-between overflow-hidden">
          <div className="grid grid-cols-12 items-center gap-3">
            {/* Ad copy text */}
            <div className="col-span-7 space-y-2.5">
              <h4 className="font-black text-xl text-dark leading-snug">
                {currentAd.title}
              </h4>
              
              <div className="text-[11px] text-gray-600 font-medium leading-relaxed space-y-1">
                {currentAd.tagline ? (
                  currentAd.tagline.split(".").map((line, idx) => line.trim() && (
                    <p key={idx} className="line-clamp-2">
                      {line}.
                    </p>
                  ))
                ) : (
                  <p>Clear concepts. Better grades. Brighter future.</p>
                )}
              </div>

              <div className="pt-2">
                <Link
                  href={`/tutors/${currentAd.tutorSlug || currentAd.tutorId}`}
                  className="inline-block px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  {currentAd.ctaText || "View Tutor Profile"}
                </Link>
              </div>
            </div>

            {/* Ad Tutor Portrait */}
            <div className="col-span-5 flex justify-end">
              <div className="w-28 h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white shrink-0">
                {currentAd.tutorImage ? (
                  <img
                    src={currentAd.tutorImage}
                    alt={currentAd.tutorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-700 text-white font-black text-3xl flex items-center justify-center">
                    {currentAd.tutorName?.charAt(0) || "A"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer"
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
                currentIndex === idx ? "w-6 bg-teal-600" : "w-2 bg-gray-200"
              }`}
              aria-label={`Go to ad slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer"
          aria-label="Next Ad"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

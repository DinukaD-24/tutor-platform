"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Megaphone, ChevronLeft, ChevronRight, GraduationCap, MapPin, Star, ArrowUpRight, Play, Phone, BookOpen, Target, User, Sparkles } from "lucide-react";

export default function PaidTutorAdsCard({ ads }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback demo ads matching the wireframe design
  const displayAds = ads && ads.length > 0 ? ads : [
    {
      id: "demo1",
      tutorSlug: "samith-nonis",
      tutorName: "Samith Nonis",
      tutorSubject: "Physics",
      university: "University of Moratuwa",
      location: "Gampaha",
      phone: "+94701501621",
      rating: 5.0,
      title: "Physics Specialist",
      tagline: "I am a final-year undergraduate at the University of Moratuwa, pursuing a BSc Engineering (Honours).",
      ctaText: "View Tutor Profile",
      badge: "TOP CONTRIBUTOR",
      tutorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      videos: [
        {
          id: "v1",
          youtubeId: "dQw4w9WgXcQ",
          title: "Electric Fields - Day 01",
          subjectName: "Physics",
          duration: "15:20"
        },
        {
          id: "v2",
          youtubeId: "dQw4w9WgXcQ",
          title: "Thermal Physics Practical - 01",
          subjectName: "Physics",
          duration: "18:45"
        }
      ]
    },
    {
      id: "demo2",
      tutorSlug: "dilshan-jayasinghe",
      tutorName: "Dilshan Jayasinghe",
      tutorSubject: "ICT",
      university: "University of Colombo",
      location: "Kandy / Online",
      phone: "+94771234567",
      rating: 4.9,
      title: "ICT Masterclass",
      tagline: "Master Python programming & database architecture for A/L & O/L ICT.",
      ctaText: "View Tutor Profile",
      badge: "FEATURED AD",
      tutorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      videos: [
        {
          id: "v3",
          youtubeId: "dQw4w9WgXcQ",
          title: "Python Flow Control & Loops",
          subjectName: "ICT",
          duration: "12:10"
        },
        {
          id: "v4",
          youtubeId: "dQw4w9WgXcQ",
          title: "Database Normalization ERD",
          subjectName: "ICT",
          duration: "14:30"
        }
      ]
    }
  ];

  useEffect(() => {
    if (isHovered || displayAds.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayAds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, displayAds.length]);

  const currentAd = displayAds[currentIndex % displayAds.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayAds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayAds.length - 1 ? 0 : prev + 1));
  };

  // Helper to split title into main title and highlighted specialist title
  const renderTitle = (title) => {
    if (!title) return <span className="text-white font-black text-2xl">Physics Specialist</span>;
    const parts = title.split(" ");
    if (parts.length > 1) {
      const firstPart = parts.slice(0, parts.length - 1).join(" ");
      const lastPart = parts[parts.length - 1];
      return (
        <div className="leading-tight">
          <span className="block text-2xl sm:text-3xl font-black text-white tracking-tight">{firstPart}</span>
          <span className="block text-2xl sm:text-3xl font-black italic bg-gradient-to-r from-[#4ef2d2] via-[#22e6bd] to-[#14c7a6] bg-clip-text text-transparent tracking-tight">
            {lastPart}
          </span>
        </div>
      );
    }
    return <span className="text-2xl sm:text-3xl font-black italic text-[#4ef2d2]">{title}</span>;
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-3xl border border-gray-100/90 p-3.5 sm:p-4.5 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div className="flex flex-col h-full space-y-3">
        {/* Top Card Outer Header */}
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4f8e8] text-[#0d7a5f] flex items-center justify-center border border-[#b2f0d4] shadow-2xs">
              <Megaphone size={15} />
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-dark tracking-tight">Featured Tutor Ads</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Promoted educator spotlight</p>
            </div>
          </div>

          <div className="px-3 py-1 bg-[#09473b] text-white text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-2xs border border-[#0d6353]">
            <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" />
            <span>{currentAd.badge || "TOP CONTRIBUTOR"}</span>
          </div>
        </div>

        {/* Big Dark Emerald Paid Poster Container */}
        <div className="flex-1 rounded-3xl bg-gradient-to-b from-[#032924] via-[#063833] to-[#021d19] p-3.5 sm:p-4.5 border border-teal-500/30 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
          
          {/* Ambient Glowing Cyan Backdrop Light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14e1be]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Math/Physics Pattern Watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,225,190,0.12),transparent_70%)] pointer-events-none" />

          <div className="space-y-3.5 relative z-10">
            {/* Top Floating White Tutor Profile Bar */}
            <div className="flex items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-lg">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-teal-400/40 bg-teal-100 shrink-0">
                  {currentAd.tutorImage ? (
                    <img src={currentAd.tutorImage} alt={currentAd.tutorName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full text-teal-800 font-bold flex items-center justify-center text-xs">
                      {currentAd.tutorName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h5 className="font-black text-xs text-dark truncate leading-tight">{currentAd.tutorName}</h5>
                  <p className="text-[10px] font-extrabold text-teal-700 truncate leading-tight">{currentAd.tutorSubject || "Physics"}</p>
                </div>
              </div>
              
              <div className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-black text-xs flex items-center gap-1 border border-amber-200/80 shrink-0">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span>{currentAd.rating || 5}</span>
              </div>
            </div>

            {/* Headline Title */}
            <div className="pt-0.5 border-b border-teal-500/20 pb-2">
              {renderTitle(currentAd.title)}
            </div>

            {/* Grid Section: Left Bio & Meta Pills vs Right Tutor Cutout */}
            <div className="grid grid-cols-12 gap-2.5 items-center">
              
              {/* Left Column: Bio & Metadata Pills */}
              <div className="col-span-7 space-y-2 min-w-0">
                
                {/* Translucent Bio Box */}
                {currentAd.tagline && (
                  <div className="bg-[#05453e]/80 border border-teal-400/30 rounded-2xl p-2 sm:p-2.5 backdrop-blur-md flex items-start gap-2 text-[10px] sm:text-[11px] text-teal-50 leading-relaxed font-medium shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Target size={11} />
                    </div>
                    <p className="line-clamp-3 italic">
                      &ldquo;{currentAd.tagline}&rdquo;
                    </p>
                  </div>
                )}

                {/* Metadata Pills List */}
                <div className="space-y-1 text-[10px] sm:text-[11px] font-extrabold text-teal-100">
                  {currentAd.university && (
                    <div className="bg-[#06423c]/80 hover:bg-[#07534b] border border-teal-400/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 truncate transition-all">
                      <GraduationCap size={12} className="text-[#35e8c6] shrink-0" />
                      <span className="truncate">{currentAd.university}</span>
                    </div>
                  )}

                  {(() => {
                    const sylStr = Array.isArray(currentAd.syllabuses) ? currentAd.syllabuses.filter(Boolean).join(", ") : (currentAd.syllabuses || "Local A/L");
                    return (
                      <div className="bg-[#06423c]/80 hover:bg-[#07534b] border border-teal-400/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 truncate transition-all">
                        <BookOpen size={12} className="text-[#35e8c6] shrink-0" />
                        <span className="truncate">{sylStr}</span>
                      </div>
                    );
                  })()}

                  {currentAd.location && (
                    <div className="bg-[#06423c]/80 hover:bg-[#07534b] border border-teal-400/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 truncate transition-all">
                      <MapPin size={12} className="text-[#35e8c6] shrink-0" />
                      <span className="truncate">{currentAd.location}</span>
                    </div>
                  )}

                  {currentAd.phone && (
                    <div className="bg-[#06423c]/80 hover:bg-[#07534b] border border-teal-400/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 truncate transition-all">
                      <Phone size={12} className="text-[#35e8c6] shrink-0" />
                      <span className="truncate">{currentAd.phone}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Tutor Cutout Portrait with Energy Glow Ring */}
              <div className="col-span-5 flex justify-end items-center relative">
                {/* Glowing cyan swirl halo */}
                <div className="absolute inset-0 bg-[#14e1be]/25 blur-xl rounded-full pointer-events-none" />
                
                <div className="relative w-28 h-40 sm:w-32 sm:h-48 rounded-3xl overflow-hidden border-2 border-[#35e8c6]/50 shadow-[0_0_25px_rgba(20,225,190,0.3)] bg-gradient-to-b from-teal-900 to-[#021d19] shrink-0">
                  {currentAd.tutorImage ? (
                    <img
                      src={currentAd.tutorImage}
                      alt={currentAd.tutorName}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-teal-800 text-white font-black text-2xl flex items-center justify-center">
                      {currentAd.tutorName?.charAt(0) || "T"}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Yellow Paint Brush Banner */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#ffc800] text-black font-black text-[10px] sm:text-[11px] rounded-full uppercase tracking-wider shadow-md">
                <GraduationCap size={13} className="text-black shrink-0" />
                <span>SAMPLE LESSONS BY THIS TUTOR</span>
                <span className="text-black ml-0.5">↴</span>
              </div>
            </div>

            {/* Side-by-Side Sample Videos Cards */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              {currentAd.videos && currentAd.videos.length > 0 ? (
                currentAd.videos.slice(0, 2).map((vid) => (
                  <Link
                    key={vid.id}
                    href={`/watch/${vid.id}`}
                    className="bg-[#05453e]/90 hover:bg-[#075950] border border-teal-400/40 rounded-2xl p-1.5 transition-all duration-200 group flex flex-col justify-between shadow-sm"
                  >
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-teal-950 border border-teal-400/20">
                      <img
                        src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-colors flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/90 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={10} className="fill-[#088f76] text-[#088f76] ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-1.5 px-0.5">
                      <h6 className="font-extrabold text-[10px] text-white line-clamp-1 leading-tight group-hover:text-[#35e8c6] transition-colors">
                        {vid.title}
                      </h6>
                      <div className="flex items-center gap-1 mt-0.5 text-[9px] font-bold text-teal-300">
                        <Play size={9} className="fill-teal-300 text-teal-300" />
                        <span>{vid.subjectName || "Physics"}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  <div className="bg-[#05453e]/60 border border-dashed border-teal-400/30 rounded-2xl p-2 text-center flex flex-col items-center justify-center min-h-[70px]">
                    <Play size={16} className="text-teal-300/60 mb-1" />
                    <span className="text-[9px] font-bold text-teal-200">Electric Fields - Day 01</span>
                  </div>
                  <div className="bg-[#05453e]/60 border border-dashed border-teal-400/30 rounded-2xl p-2 text-center flex flex-col items-center justify-center min-h-[70px]">
                    <Play size={16} className="text-teal-300/60 mb-1" />
                    <span className="text-[9px] font-bold text-teal-200">Thermal Physics Practical</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Glowing Cyan Capsule CTA Button */}
          <div className="pt-3.5 relative z-10">
            <Link
              href={`/tutors/${currentAd.tutorSlug || currentAd.tutorId}`}
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-[#0db899] via-[#0ca88c] to-[#088f76] hover:from-[#0fc9a8] hover:to-[#09a084] text-white font-black text-xs sm:text-sm rounded-full shadow-[0_0_25px_rgba(13,184,153,0.45)] flex items-center justify-between transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-teal-300/50 group"
            >
              <div className="w-7 h-7 rounded-full bg-dark/40 border border-white/20 text-teal-200 flex items-center justify-center shrink-0">
                <User size={14} />
              </div>
              
              <span className="font-black tracking-tight">{currentAd.ctaText || "View Tutor Profile"}</span>
              
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight size={15} />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100/80 mt-2.5 shrink-0">
        <button
          onClick={handlePrev}
          className="w-7 h-7 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Previous Ad"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1.5">
          {displayAds.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-5 bg-[#0db899]" : "w-1.5 bg-gray-200"
              }`}
              aria-label={`Go to ad slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-7 h-7 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Next Ad"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

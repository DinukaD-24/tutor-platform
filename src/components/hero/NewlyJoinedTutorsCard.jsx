"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, ChevronLeft, ChevronRight, MapPin, GraduationCap, Star, Languages, BookOpen, Sparkles, ChevronRight as ArrowIcon } from "lucide-react";

export default function NewlyJoinedTutorsCard({ tutors }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback demo tutors matching the design mockup
  const displayTutors = tutors && tutors.length > 0 ? tutors : [
    {
      id: "demo1",
      slug: "boorika",
      name: "Boorika",
      subject: "Tamil science maths",
      university: "Qualified Educator",
      location: "Online & Physical",
      languages: ["Tamil"],
      rating: 5.0,
      syllabuses: ["Local A/L"],
      grades: ["Grade 1 - 5", "Grade 6 - 11"],
      image: "",
    },
    {
      id: "demo2",
      slug: "kasun-perera",
      name: "Kasun Perera",
      subject: "Chemistry Specialist",
      university: "University of Colombo",
      location: "Colombo / Online",
      languages: ["English", "Sinhala"],
      rating: 4.9,
      syllabuses: ["Local A/L"],
      grades: ["Grade 12 - 13"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    }
  ];

  useEffect(() => {
    if (isHovered || displayTutors.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTutors.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, displayTutors.length]);

  const currentTutor = displayTutors[currentIndex % displayTutors.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayTutors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayTutors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-3xl border border-gray-100/90 p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative"
    >
      <div className="flex flex-col h-full space-y-3">
        {/* Outer Card Header */}
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#e6f7f2] text-[#0d8a6e] flex items-center justify-center border border-[#b2e8d4] shadow-2xs">
              <Users size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-dark tracking-tight">Newly Joined Tutors</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Latest verified educators</p>
            </div>
          </div>

          <Link href="/tutors" className="text-xs font-bold text-[#0d8a6e] hover:text-[#065443] flex items-center gap-0.5 hover:underline">
            View all
            <ArrowIcon size={14} />
          </Link>
        </div>

        {/* Inner Spotlight Poster Box */}
        <div className="flex-1 rounded-3xl bg-gradient-to-br from-[#e8f7f2] via-[#d6f2e8] to-[#c2edd9] p-4 sm:p-5 border border-[#b2e8d4] shadow-inner relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          
          {/* Decorative Swirl Background */}
          <div className="absolute right-0 bottom-0 w-52 h-52 bg-gradient-to-t from-[#aee5d1]/50 to-transparent rounded-full pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:10px_10px] opacity-40 pointer-events-none" />

          {/* Top Bar: Spotlight Pill + Star Rating */}
          <div className="flex items-center justify-between gap-2 mb-2.5 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#096d57] text-white shadow-2xs">
              SPOTLIGHT
              <Sparkles size={11} className="text-emerald-200 fill-emerald-200" />
            </span>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-dark shadow-xs border border-white">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{currentTutor.rating || 5.0}</span>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-12 items-center gap-3 relative z-10">
            
            {/* Left Info Column */}
            <div className="col-span-7 space-y-2 min-w-0">
              <div>
                <h4 className="font-black text-xl sm:text-2xl text-[#0f2537] truncate leading-tight tracking-tight">
                  {currentTutor.name}
                </h4>
                <p className="text-xs sm:text-sm font-extrabold text-[#0d8a6e] truncate mt-0.5">
                  {currentTutor.subject || "Educator"}
                </p>
              </div>

              {/* Metadata List */}
              <div className="space-y-1.5 text-[11px] text-gray-700 font-medium pt-1">
                <div className="flex items-center gap-1.5 truncate">
                  <div className="w-5 h-5 rounded-full bg-[#d2f3e7] text-[#0d8a6e] flex items-center justify-center shrink-0">
                    <GraduationCap size={11} />
                  </div>
                  <span className="truncate font-semibold">{currentTutor.university || "Qualified Educator"}</span>
                </div>

                {(() => {
                  const sylStr = Array.isArray(currentTutor.syllabuses) ? currentTutor.syllabuses.filter(Boolean).join(", ") : (currentTutor.syllabuses || "");
                  const grdStr = Array.isArray(currentTutor.grades) ? currentTutor.grades.filter(Boolean).join(", ") : (currentTutor.grades || "");
                  const combined = [sylStr, grdStr].filter(Boolean).join(" • ");
                  if (!combined) return null;
                  return (
                    <div className="flex items-center gap-1.5 truncate font-semibold text-gray-800">
                      <div className="w-5 h-5 rounded-full bg-[#d2f3e7] text-[#0d8a6e] flex items-center justify-center shrink-0">
                        <BookOpen size={11} />
                      </div>
                      <span className="truncate">{combined}</span>
                    </div>
                  );
                })()}

                <div className="flex items-center gap-1.5 truncate">
                  <div className="w-5 h-5 rounded-full bg-[#d2f3e7] text-[#0d8a6e] flex items-center justify-center shrink-0">
                    <MapPin size={11} />
                  </div>
                  <span className="truncate font-semibold">{currentTutor.location || "Online & Physical"}</span>
                </div>

                <div className="flex items-center gap-1.5 truncate">
                  <div className="w-5 h-5 rounded-full bg-[#d2f3e7] text-[#0d8a6e] flex items-center justify-center shrink-0">
                    <Languages size={11} />
                  </div>
                  <span className="truncate font-semibold">
                    {Array.isArray(currentTutor.languages) ? currentTutor.languages.join(", ") : "English & Sinhala"}
                  </span>
                </div>
              </div>

              {/* View Profile Button */}
              <div className="pt-2">
                <Link
                  href={`/tutors/${currentTutor.slug || currentTutor.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-extrabold text-xs rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span>View Profile</span>
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowIcon size={11} />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column: Tutor Avatar Card on Pedestal */}
            <div className="col-span-5 flex justify-end items-center relative">
              
              {/* 3D Pedestal Platform Effect */}
              <div className="relative flex flex-col items-center justify-center shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-[#0d8a6e] to-[#065443] flex items-center justify-center text-white text-3xl font-black shrink-0 relative z-10">
                  {currentTutor.image ? (
                    <img
                      src={currentTutor.image}
                      alt={currentTutor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="drop-shadow-md">
                      {currentTutor.name?.charAt(0) || "T"}
                    </span>
                  )}
                </div>

                {/* Pedestal Base Oval */}
                <div className="w-28 h-5 bg-[#a4e2cd] rounded-full border border-[#85d4ba] shadow-xs mt-[-10px] relative z-0" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 mt-3 shrink-0">
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Previous Tutor"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1.5">
          {displayTutors.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-6 bg-[#0d8a6e]" : "w-2 bg-gray-200"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Next Tutor"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

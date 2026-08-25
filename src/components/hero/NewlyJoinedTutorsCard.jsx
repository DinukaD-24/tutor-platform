"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, ChevronLeft, ChevronRight, MapPin, GraduationCap, Star, Languages, BookOpen } from "lucide-react";

export default function NewlyJoinedTutorsCard({ tutors }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback demo tutors if no tutors exist
  const displayTutors = tutors && tutors.length > 0 ? tutors : [
    {
      id: "demo1",
      slug: "chemistry-tutor",
      name: "Kasun Perera",
      subject: "Chemistry Specialist",
      university: "University of Colombo",
      location: "Colombo / Online",
      languages: ["English", "Sinhala"],
      rating: 5.0,
      bio: "Building strong concepts & exam techniques for A/L & O/L Chemistry",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "demo2",
      slug: "biology-expert",
      name: "Nimmi Fernando",
      subject: "Biology Specialist",
      university: "University of Sri Jayewardenepura",
      location: "Gampaha / Online",
      languages: ["English", "Sinhala"],
      rating: 4.9,
      bio: "Simplified diagrams & past paper secrets for A/L Bio students",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    }
  ];

  useEffect(() => {
    if (isHovered || displayTutors.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTutors.length);
    }, 4000);
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
      className="bg-white rounded-3xl border border-gray-100/90 p-4.5 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/15 shadow-2xs">
              <Users size={15} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-dark tracking-tight">Newly Joined Tutors</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Latest verified educators</p>
            </div>
          </div>
          <Link href="/tutors" className="text-[11px] font-extrabold text-primary hover:text-primary-dark hover:underline">
            View all
          </Link>
        </div>

        {/* Card Carousel Box */}
        <div className="relative rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-emerald-100/50 p-4 overflow-hidden border border-emerald-100/90 min-h-[200px] flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between gap-2 mb-2">
            {/* Free Ad Badge */}
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
              SPOTLIGHT
            </span>

            {/* Rating pill */}
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-extrabold text-dark border border-emerald-100/80 shadow-2xs">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{currentTutor.rating || 5.0}</span>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-3">
            <div className="col-span-7 space-y-1.5 min-w-0">
              {/* Tutor Name & Subject */}
              <div>
                <h4 className="font-black text-sm text-dark truncate leading-tight">
                  {currentTutor.name}
                </h4>
                <p className="text-[11px] font-extrabold text-emerald-700 truncate">
                  {currentTutor.subject || "Educator"}
                </p>
              </div>

              {/* Rich Metadata Pills */}
              <div className="space-y-0.5 text-[10px] text-gray-600 font-medium">
                <div className="flex items-center gap-1 truncate">
                  <GraduationCap size={11} className="text-emerald-600 shrink-0" />
                  <span className="truncate">{currentTutor.university || "Qualified Educator"}</span>
                </div>
                {(() => {
                  const sylStr = Array.isArray(currentTutor.syllabuses) ? currentTutor.syllabuses.filter(Boolean).join(", ") : (currentTutor.syllabuses || "");
                  const grdStr = Array.isArray(currentTutor.grades) ? currentTutor.grades.filter(Boolean).join(", ") : (currentTutor.grades || "");
                  const combined = [sylStr, grdStr].filter(Boolean).join(" • ");
                  if (!combined) return null;
                  return (
                    <div className="flex items-center gap-1 truncate font-bold text-emerald-950">
                      <BookOpen size={11} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{combined}</span>
                    </div>
                  );
                })()}
                <div className="flex items-center gap-1 truncate">
                  <MapPin size={11} className="text-emerald-600 shrink-0" />
                  <span className="truncate">{currentTutor.location || "Online & Physical"}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <Languages size={11} className="text-emerald-600 shrink-0" />
                  <span className="truncate">
                    {Array.isArray(currentTutor.languages) ? currentTutor.languages.join(", ") : "English & Sinhala"}
                  </span>
                </div>
              </div>

              <div className="pt-1.5">
                <Link
                  href={`/tutors/${currentTutor.slug || currentTutor.id}`}
                  className="inline-block px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-full shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Tutor Image */}
            <div className="col-span-5 flex justify-end">
              <div className="w-20 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white ring-2 ring-emerald-500/20 shrink-0">
                {currentTutor.image ? (
                  <img
                    src={currentTutor.image}
                    alt={currentTutor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-600 text-white font-black text-xl flex items-center justify-center">
                    {currentTutor.name?.charAt(0) || "T"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/80 mt-3">
        <button
          onClick={handlePrev}
          className="w-7 h-7 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Previous Tutor"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1.5">
          {displayTutors.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-5 bg-emerald-600" : "w-1.5 bg-gray-200"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-7 h-7 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer shadow-2xs"
          aria-label="Next Tutor"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

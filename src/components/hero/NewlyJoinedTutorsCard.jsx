"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, ChevronLeft, ChevronRight, MapPin, GraduationCap, Star, Languages } from "lucide-react";

export default function NewlyJoinedTutorsCard({ tutors }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentTutor = displayTutors[currentIndex % displayTutors.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayTutors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === displayTutors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 p-4 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-full relative">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Users size={14} />
            </div>
            <h3 className="font-extrabold text-sm text-dark">Newly Joined Tutors</h3>
          </div>
          <Link href="/tutors" className="text-[11px] font-bold text-primary hover:underline">
            View all
          </Link>
        </div>

        {/* Card Carousel Box */}
        <div className="relative rounded-xl bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-emerald-100/40 p-3.5 overflow-hidden border border-emerald-100/80 min-h-[195px] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            {/* Free Ad Badge */}
            <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-2xs">
              FREE AD
            </span>

            {/* Rating pill */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/80 backdrop-blur-xs rounded-full text-[10px] font-bold text-dark border border-emerald-100">
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

              <div className="pt-1">
                <Link
                  href={`/tutors/${currentTutor.slug || currentTutor.id}`}
                  className="inline-block px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-2xs transition-all"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Tutor Image */}
            <div className="col-span-5 flex justify-end">
              <div className="w-20 h-24 rounded-xl overflow-hidden shadow-sm border-2 border-white bg-white shrink-0">
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
      <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 mt-2.5">
        <button
          onClick={handlePrev}
          className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer"
          aria-label="Previous Tutor"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1">
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
          className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer"
          aria-label="Next Tutor"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

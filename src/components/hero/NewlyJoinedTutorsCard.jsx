"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

export default function NewlyJoinedTutorsCard({ tutors }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback demo tutors if no tutors exist
  const displayTutors = tutors && tutors.length > 0 ? tutors : [
    {
      id: "demo1",
      slug: "chemistry-tutor",
      name: "Kasun Perera",
      subject: "Chemistry Tutor",
      bio: "Building strong concepts for a better tomorrow",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "demo2",
      slug: "biology-expert",
      name: "Nimmi Fernando",
      subject: "Biology Specialist",
      bio: "Simplified diagrams & exam secrets for A/L Bio",
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
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-full relative">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Users size={16} />
            </div>
            <h3 className="font-extrabold text-base text-dark">Newly Joined Tutors</h3>
          </div>
          <Link href="/tutors" className="text-xs font-bold text-primary hover:underline">
            View all
          </Link>
        </div>

        {/* Card Carousel Box */}
        <div className="relative rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/50 p-5 overflow-hidden border border-emerald-100/60 min-h-[260px] flex flex-col justify-between">
          {/* Badge */}
          <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
            FREE AD
          </span>

          <div className="grid grid-cols-12 items-end gap-2 my-3">
            <div className="col-span-7 space-y-2">
              <h4 className="font-black text-lg text-dark leading-tight">
                {currentTutor.subject || `${currentTutor.name}`}
                <span className="block text-xs font-bold text-emerald-700/80 mt-0.5">
                  A/L & O/L
                </span>
              </h4>
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed line-clamp-2">
                {currentTutor.bio || "Building strong concepts for a better tomorrow"}
              </p>
              <div className="pt-2">
                <Link
                  href={`/tutors/${currentTutor.slug || currentTutor.id}`}
                  className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Tutor Image */}
            <div className="col-span-5 flex justify-end">
              <div className="w-24 h-32 rounded-xl overflow-hidden shadow-md border-2 border-white bg-white shrink-0">
                {currentTutor.image ? (
                  <img
                    src={currentTutor.image}
                    alt={currentTutor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-600 text-white font-black text-2xl flex items-center justify-center">
                    {currentTutor.name?.charAt(0) || "T"}
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
          aria-label="Previous Tutor"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Carousel Dots */}
        <div className="flex gap-1.5">
          {displayTutors.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-6 bg-emerald-600" : "w-2 bg-gray-200"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-dark hover:border-gray-300 transition-all cursor-pointer"
          aria-label="Next Tutor"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

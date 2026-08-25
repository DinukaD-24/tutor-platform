"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, ArrowRight, BookOpen, Zap, Atom, User, ChevronRight } from "lucide-react";

export default function PopularVideosCard({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const displayVideos = videos && videos.length > 0 ? videos : [
    {
      id: "demo1",
      youtubeId: "dQw4w9WgXcQ",
      title: "GCE O/L 2025 Mathematics Paper...",
      gradeName: "Grade 11",
      tutorName: "Sudesh Yodhasinghe",
      duration: "10:00",
    },
    {
      id: "demo2",
      youtubeId: "dQw4w9WgXcQ",
      title: "Electric Fields - Day 01",
      gradeName: "Grade 13",
      tutorName: "Samith Nonis",
      duration: "10:00",
    },
    {
      id: "demo3",
      youtubeId: "dQw4w9WgXcQ",
      title: "Thermal Physics - Rapid Revision - Day 01",
      gradeName: "Grade 13",
      tutorName: "Samith Nonis",
      duration: "10:00",
    }
  ];

  // Create a looped array: pad with copies at start/end for infinite feel
  const loopedVideos = [
    displayVideos[displayVideos.length - 1], // ghost before
    ...displayVideos,
    displayVideos[0], // ghost after
  ];

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayVideos.length);
    }, 3000);
  };

  useEffect(() => {
    if (!isHovered) startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [isHovered, displayVideos.length]);

  const getSubjectIcon = (title) => {
    const lower = (title || "").toLowerCase();
    if (lower.includes("field") || lower.includes("electr")) return <Zap size={13} className="text-[#0d8a6e]" />;
    if (lower.includes("physic") || lower.includes("therma")) return <Atom size={13} className="text-[#0d8a6e]" />;
    return <BookOpen size={13} className="text-[#0d8a6e]" />;
  };

  // For a 3-slot viewport: prev (blurred), active (full), next (blurred)
  const getSlotIndex = (offset) => {
    return (activeIndex + offset + displayVideos.length) % displayVideos.length;
  };

  const slots = [
    { video: displayVideos[getSlotIndex(-1)], position: "prev" },
    { video: displayVideos[getSlotIndex(0)],  position: "active" },
    { video: displayVideos[getSlotIndex(1)],  position: "next" },
  ];

  return (
    <div
      onMouseEnter={() => { setIsHovered(true); clearInterval(intervalRef.current); }}
      onMouseLeave={() => { setIsHovered(false); }}
      className="bg-white rounded-3xl border border-gray-100/90 p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative"
    >
      <div className="flex flex-col h-full gap-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#e6f7f2] text-[#0d8a6e] flex items-center justify-center border border-[#b2e8d4] shadow-2xs">
              <Play size={16} className="fill-[#0d8a6e] ml-0.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-dark tracking-tight">Popular Videos</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Top video tutorials</p>
            </div>
          </div>
          <Link href="/syllabus" className="text-xs font-bold text-[#0d8a6e] hover:text-[#065443] flex items-center gap-0.5 hover:underline">
            View all <ChevronRight size={14} />
          </Link>
        </div>

        {/* Scroll Viewport — fixed height so card doesn't stretch */}
        <div className="relative overflow-hidden" style={{ height: "230px" }}>
          {/* Top fade mask */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          {/* Bottom fade mask */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          <div className="flex flex-col gap-2 py-2 transition-all duration-500">
            {slots.map(({ video, position }, i) => {
              const isActive = position === "active";
              const isPrev = position === "prev";
              const isNext = position === "next";

              return (
                <div
                  key={`${video.id}-${i}`}
                  onClick={() => {
                    if (isPrev) setActiveIndex(getSlotIndex(-1));
                    if (isNext) setActiveIndex(getSlotIndex(1));
                  }}
                  className={`
                    relative rounded-3xl border transition-all duration-500 ease-in-out overflow-hidden cursor-pointer
                    ${isActive
                      ? "border-[#0d8a6e]/30 shadow-sm opacity-100 scale-100 z-10"
                      : "border-gray-100/60 opacity-40 scale-95 z-0"
                    }
                  `}
                  style={{
                    filter: isActive ? "none" : "blur(1.5px)",
                    pointerEvents: isActive ? "auto" : "all",
                  }}
                >
                  {/* Glass overlay on non-active */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 rounded-3xl" />
                  )}

                  <Link
                    href={video.id.startsWith("demo") ? "/syllabus" : `/watch/${video.id}`}
                    className="flex items-start gap-3 p-2.5 sm:p-3 bg-white group"
                    tabIndex={isActive ? 0 : -1}
                    onClick={(e) => !isActive && e.preventDefault()}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 sm:w-32 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-2xs">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play size={11} className="fill-[#0d8a6e] text-[#0d8a6e] ml-0.5" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-1 right-1 bg-dark/85 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                        {video.duration || "10:00"}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-1 min-w-0 flex-1 pt-0.5">
                      <div className="w-5.5 h-5.5 rounded-lg bg-[#e6f7f2] text-[#0d8a6e] flex items-center justify-center border border-[#c2edd9]">
                        {getSubjectIcon(video.title)}
                      </div>
                      <h4 className={`font-black text-xs sm:text-sm leading-snug line-clamp-2 pt-0.5 transition-colors ${isActive ? "text-dark group-hover:text-[#0d8a6e]" : "text-gray-600"}`}>
                        {video.title}
                      </h4>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-[#0d8a6e] bg-[#e6f7f2] border border-[#c2edd9]">
                        {video.gradeName || video.subjectName || "Grade 11"}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold truncate">
                        <User size={10} className="text-gray-300 shrink-0" />
                        <span className="truncate">{video.tutorName}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-1.5 py-1 shrink-0">
          {displayVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${activeIndex === idx ? "w-5 bg-[#0d8a6e]" : "w-1.5 bg-gray-200"}`}
              aria-label={`Go to video ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="shrink-0">
          <Link
            href="/syllabus"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#0d8a6e] via-[#096d57] to-[#065443] hover:from-[#096d57] hover:to-[#044033] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-emerald-400/20"
          >
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:6px_6px] opacity-40 pointer-events-none" />
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Play size={12} className="fill-white ml-0.5" />
            </div>
            <span className="font-extrabold tracking-tight relative z-10">View All Video Lessons</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform relative z-10" />
          </Link>
        </div>
      </div>
    </div>
  );
}

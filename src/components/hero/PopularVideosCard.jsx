"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, ArrowRight, BookOpen, Zap, Atom, User, ChevronRight } from "lucide-react";

export default function PopularVideosCard({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const displayVideos = videos && videos.length > 0 ? videos : [
    { id: "demo1", youtubeId: "dQw4w9WgXcQ", title: "GCE O/L 2025 Mathematics Paper...", gradeName: "Grade 11", tutorName: "Sudesh Yodhasinghe", duration: "10:00" },
    { id: "demo2", youtubeId: "dQw4w9WgXcQ", title: "Electric Fields - Day 01",           gradeName: "Grade 13", tutorName: "Samith Nonis",       duration: "10:00" },
    { id: "demo3", youtubeId: "dQw4w9WgXcQ", title: "Thermal Physics - Rapid Revision",   gradeName: "Grade 13", tutorName: "Samith Nonis",       duration: "10:00" },
  ];

  const goTo = (newIndex) => {
    setActiveIndex(newIndex);
    setAnimKey((k) => k + 1); // bump key to re-trigger animation
  };

  useEffect(() => {
    if (isHovered) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      goTo((activeIndex + 1) % displayVideos.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, activeIndex, displayVideos.length]);

  const currentVideo = displayVideos[activeIndex];

  const getSubjectIcon = (title = "") => {
    const l = title.toLowerCase();
    if (l.includes("field") || l.includes("electr")) return <Zap size={12} className="text-[#0d8a6e]" />;
    if (l.includes("physic") || l.includes("therma")) return <Atom size={12} className="text-[#0d8a6e]" />;
    return <BookOpen size={12} className="text-[#0d8a6e]" />;
  };

  const upcomingVideos = displayVideos
    .map((v, i) => ({ ...v, i }))
    .filter((v) => v.i !== activeIndex)
    .slice(0, 2);

  return (
    <>
      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes slideUpFadeIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .video-card-enter { animation: slideUpFadeIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white rounded-3xl border border-gray-100/90 p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 h-full relative"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#e6f7f2] flex items-center justify-center border border-[#b2e8d4] shadow-2xs">
              <Play size={16} className="fill-[#0d8a6e] text-[#0d8a6e] ml-0.5" />
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

        {/* ── Active Video Card (animated on change) ── */}
        <div className="shrink-0">
          <Link
            key={animKey}
            href={currentVideo.id.startsWith("demo") ? "/syllabus" : `/watch/${currentVideo.id}`}
            className="video-card-enter flex items-start gap-3 p-3 rounded-3xl border border-gray-100 hover:border-[#0d8a6e]/30 hover:shadow-md transition-colors duration-200 group block"
          >
            {/* Thumbnail */}
            <div className="relative w-32 sm:w-36 aspect-video rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm">
              <img
                src={`https://img.youtube.com/vi/${currentVideo.youtubeId}/mqdefault.jpg`}
                alt={currentVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-dark/25 group-hover:bg-dark/10 transition-colors flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/95 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={14} className="fill-[#0d8a6e] text-[#0d8a6e] ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-1.5 right-1.5 bg-dark/80 text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                {currentVideo.duration || "10:00"}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5 min-w-0 flex-1 pt-0.5">
              <div className="w-6 h-6 rounded-lg bg-[#e6f7f2] flex items-center justify-center border border-[#c2edd9] shrink-0">
                {getSubjectIcon(currentVideo.title)}
              </div>
              <h4 className="font-black text-sm sm:text-base text-dark group-hover:text-[#0d8a6e] transition-colors leading-snug line-clamp-2">
                {currentVideo.title}
              </h4>
              <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-[#0d8a6e] bg-[#e6f7f2] border border-[#c2edd9]">
                {currentVideo.gradeName || currentVideo.subjectName || "Grade 11"}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold truncate">
                <User size={11} className="text-gray-300 shrink-0" />
                <span className="truncate">{currentVideo.tutorName}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* ── Upcoming Videos (mini previews) ── */}
        <div className="flex gap-2 shrink-0">
          {upcomingVideos.map(({ i, ...video }) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex items-center gap-2 flex-1 p-2 rounded-2xl border border-gray-100/80 hover:border-[#0d8a6e]/30 hover:bg-[#f0fdf8] transition-all duration-200 text-left group cursor-pointer"
            >
              <div className="relative w-12 aspect-video rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-dark/30 flex items-center justify-center">
                  <Play size={8} className="fill-white text-white ml-0.5" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-black text-dark group-hover:text-[#0d8a6e] transition-colors line-clamp-2 leading-tight">
                  {video.title}
                </p>
                <p className="text-[8px] text-gray-400 font-semibold mt-0.5 truncate">{video.gradeName}</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Progress Dots ── */}
        <div className="flex items-center justify-center gap-1.5 shrink-0">
          {displayVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? "w-6 bg-[#0d8a6e]" : "w-1.5 bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Video ${idx + 1}`}
            />
          ))}
        </div>

        {/* ── CTA Button ── */}
        <div className="shrink-0 mt-auto">
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
    </>
  );
}

import Link from "next/link";
import { Play, ArrowRight, BookOpen, Zap, Atom, MoreVertical, User, ChevronRight } from "lucide-react";

export default function PopularVideosCard({ videos }) {
  // Fallback demo data matching the design mockup
  const displayVideos = videos && videos.length > 0 ? videos : [
    {
      id: "demo1",
      youtubeId: "dQw4w9WgXcQ",
      title: "GCE O/L 2025 Mathematics Paper...",
      gradeName: "Grade 11",
      tutorName: "Sudesh Yodhasinghe",
      duration: "10:00",
      iconType: "book"
    },
    {
      id: "demo2",
      youtubeId: "dQw4w9WgXcQ",
      title: "Electric Fields - Day 01",
      gradeName: "Grade 13",
      tutorName: "Samith Nonis",
      duration: "10:00",
      iconType: "zap"
    },
    {
      id: "demo3",
      youtubeId: "dQw4w9WgXcQ",
      title: "Thermal Physics - Rapid Revision -...",
      gradeName: "Grade 13",
      tutorName: "Samith Nonis",
      duration: "10:00",
      iconType: "atom"
    }
  ];

  const getSubjectIcon = (index, title) => {
    const lower = (title || "").toLowerCase();
    if (lower.includes("field") || lower.includes("electr")) {
      return <Zap size={13} className="text-[#0d8a6e]" />;
    }
    if (lower.includes("physic") || lower.includes("therma")) {
      return <Atom size={13} className="text-[#0d8a6e]" />;
    }
    return <BookOpen size={13} className="text-[#0d8a6e]" />;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 p-4 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative">
      <div className="space-y-3">
        {/* Outer Card Header */}
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
            View all
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Video Items List (3 Cards) */}
        <div className="space-y-2.5">
          {displayVideos.slice(0, 3).map((video, idx) => (
            <Link
              key={video.id}
              href={video.id.startsWith("demo") ? "/syllabus" : `/watch/${video.id}`}
              className="bg-white rounded-3xl border border-gray-100/90 p-2.5 sm:p-3 shadow-2xs hover:border-[#0d8a6e]/40 hover:shadow-md transition-all duration-200 flex items-start gap-3 relative group"
            >
              {/* Thumbnail with overlay play icon */}
              <div className="relative w-28 sm:w-32 aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-2xs">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={11} className="fill-[#0d8a6e] text-[#0d8a6e] ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-dark/85 backdrop-blur-xs text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                  {video.duration || "10:00"}
                </div>
              </div>

              {/* Video Info Section */}
              <div className="space-y-1 min-w-0 flex-1 pr-1">
                <div className="flex items-center justify-between gap-1">
                  <div className="w-5.5 h-5.5 rounded-lg bg-[#e6f7f2] text-[#0d8a6e] flex items-center justify-center shrink-0 border border-[#c2edd9]">
                    {getSubjectIcon(idx, video.title)}
                  </div>
                  <MoreVertical size={14} className="text-gray-300 shrink-0" />
                </div>

                <h4 className="font-black text-xs sm:text-sm text-dark group-hover:text-[#0d8a6e] transition-colors leading-snug line-clamp-2 pt-0.5">
                  {video.title}
                </h4>

                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-[#0d8a6e] bg-[#e6f7f2] border border-[#c2edd9]">
                    {video.gradeName || video.subjectName || "Grade 11"}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold truncate pt-0.5">
                  <User size={11} className="text-gray-400 shrink-0" />
                  <span className="truncate">{video.tutorName}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-3">
        <Link
          href="/syllabus"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#0d8a6e] via-[#096d57] to-[#065443] hover:from-[#096d57] hover:to-[#044033] text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group border border-emerald-400/20"
        >
          {/* Decorative Dot Texture */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-[radial-gradient(circle,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:6px_6px] opacity-40 pointer-events-none" />

          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
            <Play size={12} className="fill-white ml-0.5" />
          </div>

          <span className="font-extrabold tracking-tight relative z-10">View All Video Lessons</span>

          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform relative z-10" />
        </Link>
      </div>
    </div>
  );
}

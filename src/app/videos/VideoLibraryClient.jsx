"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Play, Search, BookOpen, User, Eye, Sparkles, Filter, Video, ArrowRight } from "lucide-react";

export default function VideoLibraryClient({ initialVideos = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("ALL");

  // Extract unique subjects from videos for filter pills
  const availableSubjects = useMemo(() => {
    const subjectsSet = new Set();
    initialVideos.forEach((v) => {
      if (v.subjectName) subjectsSet.add(v.subjectName);
    });
    return ["ALL", ...Array.from(subjectsSet)];
  }, [initialVideos]);

  // Filter videos based on search query and subject
  const filteredVideos = useMemo(() => {
    return initialVideos.filter((video) => {
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.gradeName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSubject =
        selectedSubject === "ALL" ||
        video.subjectName.toLowerCase() === selectedSubject.toLowerCase();

      return matchesSearch && matchesSubject;
    });
  }, [initialVideos, searchQuery, selectedSubject]);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-6">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#063d34] via-[#0d8a6e] to-[#096d57] text-white py-14 px-4 sm:px-6 rounded-3xl max-w-7xl mx-auto shadow-xl">
        <div className="absolute inset-0 -z-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_30%_20%,#2eedc4_0,transparent_50%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#2eedc4] shadow-sm">
            <Sparkles size={14} />
            <span>TutorHub Video Library</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Explore All Video Lessons
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 font-medium max-w-2xl mx-auto leading-relaxed">
            Watch free educational video tutorials, exam revisions, and model paper solutions published by top verified Sri Lankan tutors.
          </p>

          {/* Search Input Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-emerald-700/60 pointer-events-none" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by lesson title, subject, or tutor name..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-gray-800 placeholder-gray-400 font-medium text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-[#2eedc4]/40 shadow-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wider pr-2 shrink-0">
            <Filter size={14} className="text-[#0d8a6e]" />
            <span>Subjects:</span>
          </div>
          {availableSubjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 shrink-0 cursor-pointer ${
                selectedSubject === sub
                  ? "bg-[#0d8a6e] text-white shadow-md shadow-[#0d8a6e]/20"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-[#0d8a6e] border border-gray-200/80"
              }`}
            >
              {sub === "ALL" ? "All Subjects" : sub}
            </button>
          ))}
        </div>

        {/* Video Stats Bar */}
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
          <p className="text-xs sm:text-sm font-bold text-gray-600">
            Showing <span className="text-[#0d8a6e] font-black">{filteredVideos.length}</span> video lessons
          </p>
          {(searchQuery || selectedSubject !== "ALL") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("ALL");
              }}
              className="text-xs font-bold text-[#0d8a6e] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ── Videos Grid ── */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <Link
                key={video.id}
                href={`/watch/${video.id}`}
                className="group bg-white rounded-3xl border border-gray-100/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
                  />
                  {/* Dark overlay with play button */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={18} className="fill-[#0d8a6e] text-[#0d8a6e] ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-0.5 rounded-md">
                    {video.duration || "10:00"}
                  </div>

                  {/* Grade Badge */}
                  <div className="absolute top-2 left-2 bg-[#063d34]/90 backdrop-blur-xs text-[#2eedc4] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#2eedc4]/30 shadow-xs">
                    {video.gradeName}
                  </div>
                </div>

                {/* Video Info Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0d8a6e]">
                      <BookOpen size={13} />
                      <span className="truncate">{video.subjectName}</span>
                    </div>

                    <h3 className="font-extrabold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-[#0d8a6e] transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
                    <div className="flex items-center gap-1.5 truncate">
                      {video.tutorImage ? (
                        <img
                          src={video.tutorImage}
                          alt={video.tutorName}
                          className="w-5 h-5 rounded-full object-cover border border-emerald-200"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[#0d8a6e]">
                          <User size={12} />
                        </div>
                      )}
                      <span className="truncate text-gray-700 font-bold">{video.tutorName}</span>
                    </div>

                    {video.viewsCount > 0 && (
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
                        <Eye size={12} />
                        <span>{video.viewsCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto space-y-4 my-10 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-[#0d8a6e]">
              <Video size={28} />
            </div>
            <h3 className="text-lg font-black text-gray-900">No Video Lessons Found</h3>
            <p className="text-xs text-gray-500 font-medium">
              We couldn't find any video lessons matching your search query or subject filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("ALL");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0d8a6e] text-white font-bold text-xs hover:bg-[#096d57] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

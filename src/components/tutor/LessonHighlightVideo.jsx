"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function LessonHighlightVideo({ youtubeId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative shadow-xs">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
          title={title || "Lesson Highlight Video"}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-900 relative group cursor-pointer shadow-xs">
      {/* Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title || "Lesson Preview"}
        width={400}
        height={225}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/15 transition-colors flex items-center justify-center">
        {/* Play Button */}
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play lesson video: ${title || "Lesson Highlight"}`}
          className="w-12 h-12 rounded-full bg-[#0b735c] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#095e4b] transition-all duration-200 cursor-pointer"
        >
          <Play size={20} className="fill-white text-white ml-0.5" />
        </button>
      </div>

      {/* Hint badge */}
      <div className="absolute bottom-2 left-2 bg-dark/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 pointer-events-none">
        <Play size={10} className="fill-white" />
        Click to Play
      </div>
    </div>
  );
}

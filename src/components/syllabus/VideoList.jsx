"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Play } from "lucide-react";

export default function VideoList({ videos, tutors }) {
  // 0(1) tutor lookup instead of 0(n) find on every render
  const tutorMap = useMemo(
    () => Object.fromEntries(tutors.map((t) => [t.slug, t])),
    [tutors]
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {videos.map((video) => {
        const tutor = tutorMap[video.tutorSlug];

        return (
          <Link
            key={video.id}
            href={`/watch/${video.id}`}
            className="border rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col hover:shadow-md transition duration-200"
          >
            <div className="aspect-video w-full bg-gray-100 relative group cursor-pointer overflow-hidden">
              {/* Thumbnail — hqdefault is reliable higher quality */}
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play fill="white" size={24} className="ml-1" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Taught by{" "}
                <span className="font-medium text-gray-700">
                  {tutor?.name || video.tutorSlug}
                </span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

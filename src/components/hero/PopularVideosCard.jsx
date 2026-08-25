import Link from "next/link";
import { Play, ArrowRight, Video } from "lucide-react";

export default function PopularVideosCard({ videos }) {
  // Fallback demo data if no videos in DB yet
  const displayVideos = videos && videos.length > 0 ? videos : [
    {
      id: "demo1",
      youtubeId: "dQw4w9WgXcQ",
      title: "Limits and Derivatives",
      gradeName: "Advanced Level Mathematics",
      tutorName: "Tharindu D.",
      duration: "12:45"
    },
    {
      id: "demo2",
      youtubeId: "dQw4w9WgXcQ",
      title: "Photosynthesis in Plants",
      gradeName: "Grade 09 Science",
      tutorName: "Pasindu L.",
      duration: "10:30"
    },
    {
      id: "demo3",
      youtubeId: "dQw4w9WgXcQ",
      title: "Parts of Speech",
      gradeName: "Grade 06 English",
      tutorName: "Shenal M.",
      duration: "08:15"
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 p-4.5 lg:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(33,131,150,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-2xs">
              <Play size={14} className="fill-primary ml-0.5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-dark tracking-tight">Popular Videos</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Top video tutorials</p>
            </div>
          </div>
          <Link href="/syllabus" className="text-[11px] font-extrabold text-primary hover:text-primary-dark hover:underline">
            View all
          </Link>
        </div>

        {/* Video items list */}
        <div className="space-y-2">
          {displayVideos.slice(0, 3).map((video) => (
            <Link
              key={video.id}
              href={video.id.startsWith("demo") ? "/syllabus" : `/watch/${video.id}`}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50/80 border border-transparent hover:border-gray-100 transition-all duration-200 group"
            >
              {/* Thumbnail with overlay icon */}
              <div className="relative w-24 aspect-video rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200/60 shadow-2xs">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                    <Play size={10} className="fill-primary text-primary ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-dark/80 backdrop-blur-xs text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md">
                  {video.duration || "10:00"}
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-0.5 min-w-0 flex-1">
                <h4 className="font-extrabold text-xs text-dark group-hover:text-primary transition-colors line-clamp-1">
                  {video.title}
                </h4>
                <p className="text-[11px] font-extrabold text-primary/90 truncate">
                  {video.gradeName || video.subjectName}
                </p>
                <p className="text-[10px] text-gray-400 font-semibold truncate">
                  {video.tutorName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pt-3 border-t border-gray-100/80 mt-3">
        <Link
          href="/syllabus"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-gray-50 hover:bg-primary/10 hover:text-primary border border-gray-100 hover:border-primary/20 rounded-2xl text-xs font-extrabold text-gray-700 transition-all duration-200 shadow-2xs"
        >
          View All Video Lessons
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

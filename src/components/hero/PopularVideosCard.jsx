import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

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
    <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Play size={16} className="fill-primary ml-0.5" />
            </div>
            <h3 className="font-extrabold text-base text-dark">Popular Tutors</h3>
          </div>
          <Link href="/syllabus" className="text-xs font-bold text-primary hover:underline">
            View all
          </Link>
        </div>

        {/* Video items list */}
        <div className="space-y-3">
          {displayVideos.map((video) => (
            <Link
              key={video.id}
              href={video.id.startsWith("demo") ? "/syllabus" : `/watch/${video.id}`}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              {/* Thumbnail with duration badge */}
              <div className="relative w-28 aspect-video rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {video.duration || "10:00"}
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-0.5 min-w-0 flex-1">
                <h4 className="font-bold text-xs text-dark group-hover:text-primary transition-colors line-clamp-1">
                  {video.title}
                </h4>
                <p className="text-[11px] font-semibold text-primary/80 truncate">
                  {video.gradeName || video.subjectName}
                </p>
                <p className="text-[11px] text-gray-400 font-medium truncate">
                  {video.tutorName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="pt-4 border-t border-gray-50 mt-4">
        <Link
          href="/syllabus"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-primary/5 hover:text-primary border border-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-all"
        >
          View All Videos
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

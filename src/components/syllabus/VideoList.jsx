"use client";

import { useState, useMemo } from "react";
import { Play } from "lucide-react";

export default function VideoList({ videos, tutors }) {
    const [activeVideoId, setActiveId] = useState(null);

    //0(1) tutor lookup instead of 0(n) find on every render
    const tutorMap = useMemo(() => (
        Object.fromEntries(tutors.map((t) => [t.slug, t]))
    ), [tutors]);

    const handlePlayVideo = async (video) => {
        setActiveId(video.youtubeId);
        if (video.id) {
            try {
                await fetch("/api/student/visit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ videoId: video.id }),
                });
            } catch (err) {
                console.error("Failed to log video view:", err);
            }
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => {
                const tutor = tutorMap[video.tutorSlug];
                const isPlaying = activeVideoId === video.youtubeId;

                return (
                    <div
                        key={video.youtubeId}
                        className="border rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col hover:shadow-md transition duration-200"
                    >
                        {isPlaying ? (
                            <div className="aspect-video w-full bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                                    className="h-full w-full border-0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    frameBorder="0"
                                />
                            </div>
                        ) : (
                            <div
                                onClick={() => handlePlayVideo(video)}
                                className="aspect-video w-full bg-gray-100 relative group cursor-pointer overflow-hidden"
                            >
                                {/* Plain <img> is intentional — Next Image requires next.config domain config for img.youtube.com */}
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div 
                                    className="
                                        absolute 
                                        inset-0 
                                        bg-black/30 
                                        group-hover:bg-black/40 
                                        transition-colors 
                                        flex
                                        items-center
                                        justify-center"
                                >
                                    <div 
                                        className="
                                            w-14
                                            h-14
                                            rounded-full
                                            bg-primary
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            shadow-lg
                                            group-hover:scale-110
                                            transition-transform
                                            duration-300"
                                    >
                                        <Play fill="white" size={24} className="ml-1"/>
                                    </div>
                                </div>
                            </div>
                        )}
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
                    </div>
                );
            })}
        </div>
    );
}
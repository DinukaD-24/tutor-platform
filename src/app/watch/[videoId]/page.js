import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isValidYoutubeId } from "@/utils/youtube";
import LogVisit from "@/components/watch/LogVisit";
import { ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function WatchPage({ params }) {
  const { videoId } = await params;

  const video = await prisma.video.findUnique({
    where: { id: videoId },
    include: {
      tutor: true,
      topic: { include: { subject: { include: { grade: { include: { syllabus: true } } } } } },
    },
  });

  if (!video || !isValidYoutubeId(video.youtubeId)) {
    notFound();
  }

  const { subject } = video.topic;
  const { grade } = subject;
  const { syllabus } = grade;

  return (
    <main className="min-h-screen bg-background text-dark pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider flex-wrap">
          <Link href={`/syllabus/${syllabus.slug}/${grade.slug}/${subject.slug}/${video.topic.slug}`} className="hover:text-primary">
            {video.topic.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-600 font-bold">{video.title}</span>
        </div>

        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-dark">{video.title}</h1>
          {video.description && <p className="text-gray-500 text-sm leading-relaxed">{video.description}</p>}
          <Link
            href={`/tutors/${video.tutor.slug || video.tutor.id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark"
          >
            Taught by {video.tutor.name}
          </Link>
        </div>

        <LogVisit videoId={video.id} />
      </div>
    </main>
  );
}
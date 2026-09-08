import { getAllVideos } from "@/utils/getData";
import VideoLibraryClient from "./VideoLibraryClient";

export const metadata = {
  title: "Explore Video Lessons | TutorHub.LK",
  description: "Browse free educational video lessons, revisions, and tutorials published by top verified tutors in Sri Lanka.",
};

export default async function VideosPage() {
  const videos = await getAllVideos();

  return <VideoLibraryClient initialVideos={videos} />;
}

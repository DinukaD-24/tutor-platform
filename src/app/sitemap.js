import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = "https://www.tutorhub.lk";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/tutors",
    "/syllabus",
    "/explore",
    "/become-a-tutor",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Tutors
  let tutorRoutes = [];
  try {
    const tutors = await prisma.tutor.findMany({
      select: { id: true, slug: true, createdAt: true },
    });
    tutorRoutes = tutors.map((tutor) => ({
      url: `${baseUrl}/tutors/${tutor.slug || tutor.id}`,
      lastModified: (tutor.createdAt || new Date()).toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Sitemap tutor fetch error:", error);
  }

  // Dynamic Video Lessons
  let videoRoutes = [];
  try {
    const videos = await prisma.video.findMany({
      select: { id: true },
    });
    videoRoutes = videos.map((v) => ({
      url: `${baseUrl}/watch/${v.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap video fetch error:", error);
  }

  return [...staticRoutes, ...tutorRoutes, ...videoRoutes];
}

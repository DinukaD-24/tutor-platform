import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("1. Testing getPopularVideos query...");
  try {
    const videos = await prisma.video.findMany({
      take: 3,
      include: {
        tutor: true,
        topic: {
          include: {
            subject: {
              include: {
                grade: true
              }
            }
          }
        },
        visitors: { select: { id: true } }
      },
      orderBy: [
        { visitors: { _count: "desc" } },
        { id: "desc" }
      ]
    });
    console.log("Popular videos fetched successfully! Count:", videos.length);
  } catch (err) {
    console.error("Error fetching popular videos:", err);
  }

  console.log("\n2. Testing getNewlyJoinedTutors query...");
  try {
    const tutors = await prisma.tutor.findMany({
      take: 6,
      orderBy: { createdAt: "desc" }
    });
    console.log("Newly joined tutors fetched successfully! Count:", tutors.length);
  } catch (err) {
    console.error("Error fetching newly joined tutors:", err);
  }

  console.log("\n3. Testing getPaidTutorAds query...");
  try {
    const ads = await prisma.tutorAd.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: { tutor: true }
    });
    console.log("Paid tutor ads fetched successfully! Count:", ads.length);
  } catch (err) {
    console.error("Error fetching paid tutor ads:", err);
  }
}

main().finally(() => prisma.$disconnect());

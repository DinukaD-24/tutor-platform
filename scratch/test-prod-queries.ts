import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Production DB Connection string from .env.production
const prodDbUrl = "postgresql://postgres.pcxjnswjmaxilrcgwiuv:wjeFVXordA3DFHRk@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";

const adapter = new PrismaPg({ connectionString: prodDbUrl });
const prisma = new PrismaClient({ adapter });

async function testProdDbQueries() {
  console.log("=== TESTING PRODUCTION SUPABASE DB (pcxjnswjmaxilrcgwiuv) ===");

  try {
    console.log("\n1. Testing getSiteStats on Prod DB...");
    const [tutorsCount, subjectsCount, studentsCount, syllabusesCount, avgRatingRes] = await Promise.all([
      prisma.tutor.count(),
      prisma.subject.count(),
      prisma.student.count(),
      prisma.syllabus.count(),
      prisma.tutor.aggregate({ _avg: { rating: true } }),
    ]);
    console.log("Stats success:", { tutorsCount, subjectsCount, studentsCount, syllabusesCount, avgRatingRes });
  } catch (err) {
    console.error("Stats Error on Prod DB:", err);
  }

  try {
    console.log("\n2. Testing getTopReviews on Prod DB...");
    const reviews = await prisma.review.findMany({
      take: 6,
      orderBy: { rating: "desc" },
      include: {
        tutor: {
          select: { id: true, name: true, slug: true, subject: true }
        }
      }
    });
    console.log("Top Reviews success:", reviews.length);
  } catch (err) {
    console.error("Top Reviews Error on Prod DB:", err);
  }

  try {
    console.log("\n3. Testing getPopularVideos on Prod DB...");
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
    console.log("Popular Videos success:", videos.length);
  } catch (err) {
    console.error("Popular Videos Error on Prod DB:", err);
  }

  try {
    console.log("\n4. Testing getNewlyJoinedTutors on Prod DB...");
    const tutors = await prisma.tutor.findMany({
      take: 6,
      orderBy: { createdAt: "desc" }
    });
    console.log("Newly Joined Tutors success:", tutors.length);
  } catch (err) {
    console.error("Newly Joined Tutors Error on Prod DB:", err);
  }

  try {
    console.log("\n5. Testing getPaidTutorAds on Prod DB...");
    const ads = await prisma.tutorAd.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      include: { tutor: true }
    });
    console.log("Paid Tutor Ads success:", ads.length);
  } catch (err) {
    console.error("Paid Tutor Ads Error on Prod DB:", err);
  }
}

testProdDbQueries().finally(() => prisma.$disconnect());

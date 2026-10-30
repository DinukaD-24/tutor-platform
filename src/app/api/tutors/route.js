import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const PAGE_SIZE = 12;

function serializeTutor(tutor) {
  return {
    id: tutor.id,
    slug: tutor.slug,
    name: tutor.name,
    subject: tutor.subject,
    tutorType: tutor.tutorType,
    image: tutor.image,
    rating: tutor.rating,
    reviewsCount: tutor.reviewsCount,
    experience: tutor.experience,
    lessonsCount: tutor.lessonsCount,
    studentsCount: tutor.studentsCount,
    university: tutor.university,
    languages: tutor.languages,
    syllabuses: tutor.syllabuses,
    grades: tutor.grades,
    price: tutor.price,
    onlineAvailable: tutor.onlineAvailable,
    physicalAvailable: tutor.physicalAvailable,
    location: tutor.location,
    qualifications: tutor.qualifications,
    specializations: tutor.specializations,
    teachingStyle: tutor.teachingStyle,
    bio: tutor.bio,
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const search = searchParams.get("search") || "";
    const types = searchParams.getAll("type");
    const syllabuses = searchParams.getAll("syllabus");
    const mediums = searchParams.getAll("medium");
    const formats = searchParams.getAll("format");
    const online = searchParams.get("online") === "true";
    const physical = searchParams.get("physical") === "true";
    const minRating = parseFloat(searchParams.get("minRating") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "99999", 10);

    // Build Prisma where clause
    const where = {};
    const andConditions = [];

    // Search: name or subject
    if (search.trim()) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { subject: { contains: search, mode: "insensitive" } },
          { specializations: { hasSome: [search] } },
        ],
      });
    }

    // Tutor type
    if (types.length > 0) {
      andConditions.push({ tutorType: { in: types } });
    }

    // Syllabuses (array overlap)
    if (syllabuses.length > 0) {
      andConditions.push({
        OR: syllabuses.map((s) => ({
          syllabuses: { hasSome: [s] },
        })),
      });
    }

    // Teaching medium / language
    if (mediums.length > 0) {
      andConditions.push({
        OR: mediums.map((m) => ({
          languages: { hasSome: [m] },
        })),
      });
    }

    // Online / physical availability
    if (online) andConditions.push({ onlineAvailable: true });
    if (physical) andConditions.push({ physicalAvailable: true });

    // Min rating
    if (minRating > 0) {
      andConditions.push({ rating: { gte: minRating } });
    }

    if (andConditions.length > 0) where.AND = andConditions;

    const skip = (page - 1) * PAGE_SIZE;

    const [tutors, total] = await Promise.all([
      prisma.tutor.findMany({
        where,
        skip,
        take: PAGE_SIZE,
        orderBy: [{ rating: "desc" }, { reviewsCount: "desc" }],
        // Do NOT include reviews — we only need the count which is stored on the tutor
      }),
      prisma.tutor.count({ where }),
    ]);

    // Filter by maxPrice in JS (price is stored as a string like "Rs. 1500/hr")
    const priceFiltered = maxPrice < 99999
      ? tutors.filter((t) => {
          const num = parseInt((t.price || "0").replace(/[^0-9]/g, "")) || 0;
          return num === 0 || num <= maxPrice;
        })
      : tutors;

    return NextResponse.json(
      {
        tutors: priceFiltered.map(serializeTutor),
        total,
        page,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(total / PAGE_SIZE),
      },
      {
        headers: {
          // Cache at the CDN/edge for 60s, stale-while-revalidate for 5 min
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return NextResponse.json({ error: "Failed to fetch tutors" }, { status: 500 });
  }
}

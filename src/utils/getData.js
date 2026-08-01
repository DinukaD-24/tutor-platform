import { prisma } from "@/lib/prisma";

const topicInclude = {
  subject: { include: { grade: { include: { syllabus: true } } } },
  relatedTo: true,
  videos: { include: { tutor: true } },
  materials: true,
  tutors: true,
};

function serializeTopic(topic) {
  return {
    id: topic.id,
    slug: topic.slug,
    name: topic.name,
    description: topic.description,
    order: topic.order,
    difficulty: topic.difficulty,
    estimatedHours: topic.estimatedHours,
    prerequisites: topic.prerequisites,
    learningOutcomes: topic.learningOutcomes,
    subjectSlug: topic.subject.slug,
    gradeSlug: topic.subject.grade.slug,
    syllabusSlug: topic.subject.grade.syllabus.slug,
    relatedTopics: topic.relatedTo.map((t) => t.slug),
    videos: topic.videos.map((v) => ({
      id: v.id,
      tutorSlug: v.tutor.slug,
      youtubeId: v.youtubeId,
      title: v.title,
    })),
    materials: topic.materials.map((m) => ({ title: m.title, url: m.url })),
    tutors: topic.tutors.map((t) => t.slug),
  };
}

function serializeTutor(t) {
  return {
    id: t.id,
    slug: t.slug,
    name: t.name,
    subject: t.subject,
    tutorType: t.tutorType,
    image: t.image,
    rating: t.rating,
    reviewsCount: t.reviewsCount,
    experience: t.experience,
    lessonsCount: t.lessonsCount,
    studentsCount: t.studentsCount,
    university: t.university,
    languages: t.languages,
    syllabuses: t.syllabuses,
    price: t.price,
    availability: { online: t.onlineAvailable, physical: t.physicalAvailable },
    email: t.email,
    phone: t.phone,
    location: t.location,
    qualifications: t.qualifications,
    specializations: t.specializations,
    teachingStyle: t.teachingStyle,
    bio: t.bio,
    reviews: (t.reviews ?? []).map((r) => ({
      id: r.id,
      student: r.student,
      rating: r.rating,
      comment: r.comment,
      date: r.date.toISOString().slice(0, 10),
    })),
    videos: (t.videos ?? []).map((v) => ({
      id: v.id,
      youtubeId: v.youtubeId,
      title: v.title,
      description: v.description,
      duration: v.duration,
      topic: v.topic ? {
        id: v.topic.id,
        name: v.topic.name,
        subject: v.topic.subject ? {
          id: v.topic.subject.id,
          name: v.topic.subject.name,
        } : null
      } : null
    })),
  };
}

const gradeInclude = {
  subjects: { include: { topics: { select: { slug: true } } } },
};

function serializeGrade(g) {
  return {
    id: g.id,
    slug: g.slug,
    name: g.name,
    order: g.order,
    subjects: g.subjects.map((sub) => ({
      id: sub.id,
      slug: sub.slug,
      name: sub.name,
      topics: sub.topics.map((t) => t.slug),
    })),
  };
}

export async function getAllSyllabuses() {
  const syllabuses = await prisma.syllabus.findMany({
    include: { grades: { orderBy: { order: "asc" }, include: gradeInclude } },
  });
  return syllabuses.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    grades: s.grades.map(serializeGrade),
  }));
}

export async function getSyllabus(syllabusSlug) {
  const syllabus = await prisma.syllabus.findUnique({
    where: { slug: syllabusSlug },
    include: { grades: { orderBy: { order: "asc" }, include: gradeInclude } },
  });
  if (!syllabus) return null;
  return {
    id: syllabus.id,
    slug: syllabus.slug,
    name: syllabus.name,
    grades: syllabus.grades.map(serializeGrade),
  };
}

export async function getGrade(syllabusSlug, gradeSlug) {
  const syllabus = await prisma.syllabus.findUnique({ where: { slug: syllabusSlug } });
  if (!syllabus) return null;
  const grade = await prisma.grade.findUnique({
    where: { syllabusId_slug: { syllabusId: syllabus.id, slug: gradeSlug } },
    include: gradeInclude,
  });
  if (!grade) return null;
  return serializeGrade(grade);
}

export async function getSubject(syllabusSlug, gradeSlug, subjectSlug) {
  const syllabus = await prisma.syllabus.findUnique({ where: { slug: syllabusSlug } });
  if (!syllabus) return null;
  const grade = await prisma.grade.findUnique({
    where: { syllabusId_slug: { syllabusId: syllabus.id, slug: gradeSlug } },
  });
  if (!grade) return null;
  const subject = await prisma.subject.findUnique({
    where: { gradeId_slug: { gradeId: grade.id, slug: subjectSlug } },
    include: { topics: { select: { slug: true }, orderBy: { order: "asc" } } },
  });
  if (!subject) return null;
  return {
    id: subject.id,
    slug: subject.slug,
    name: subject.name,
    topics: subject.topics.map((t) => t.slug),
  };
}

export async function getTopic(syllabusSlug, gradeSlug, subjectSlug, topicSlug) {
  const topic = await prisma.topic.findUnique({
    where: { slug: topicSlug },
    include: topicInclude,
  });
  if (!topic) return null;
  if (
    topic.subject.slug !== subjectSlug ||
    topic.subject.grade.slug !== gradeSlug ||
    topic.subject.grade.syllabus.slug !== syllabusSlug
  ) {
    return null;
  }
  return serializeTopic(topic);
}

export async function getTopicsBySlugs(slugs) {
  if (!slugs?.length) return [];
  const topics = await prisma.topic.findMany({
    where: { slug: { in: slugs } },
    include: topicInclude,
  });
  const bySlug = new Map(topics.map((t) => [t.slug, serializeTopic(t)]));
  return slugs.map((s) => bySlug.get(s)).filter(Boolean);
}

export async function getAllTutors() {
  const tutors = await prisma.tutor.findMany({ include: { reviews: true } });
  return tutors.map(serializeTutor);
}

export async function getTutorById(idOrSlug) {
  const t = await prisma.tutor.findFirst({
    where: {
      OR: [
        { id: idOrSlug },
        { slug: idOrSlug }
      ]
    },
    include: {
      reviews: true,
      videos: {
        include: {
          topic: {
            include: {
              subject: true
            }
          }
        }
      }
    }
  });
  return t ? serializeTutor(t) : null;
}

export async function getTutorsBySlugs(slugs) {
  if (!slugs?.length) return [];
  const tutors = await prisma.tutor.findMany({ where: { slug: { in: slugs } } });
  const bySlug = new Map(tutors.map((t) => [t.slug, serializeTutor(t)]));
  return slugs.map((s) => bySlug.get(s)).filter(Boolean);
}

export async function getSiteStats() {
  try {
    const [tutorsCount, subjectsCount, studentsCount, syllabusesCount, avgRatingRes] = await Promise.all([
      prisma.tutor.count(),
      prisma.subject.count(),
      prisma.student.count(),
      prisma.syllabus.count(),
      prisma.tutor.aggregate({ _avg: { rating: true } }),
    ]);

    const avgRating = avgRatingRes._avg.rating ? avgRatingRes._avg.rating.toFixed(1) : "5.0";

    return {
      tutorsCount,
      subjectsCount,
      studentsCount,
      syllabusesCount,
      avgRating,
      formatted: {
        tutors: tutorsCount > 0 ? `${tutorsCount}+` : "50+",
        subjects: subjectsCount > 0 ? `${subjectsCount}+` : "500+",
        students: studentsCount > 0 ? `${studentsCount}+` : "1,000+",
        syllabuses: syllabusesCount > 0 ? `${syllabusesCount}` : "4",
        avgRating: avgRating,
      }
    };
  } catch (error) {
    console.error("Error fetching site stats:", error);
    return {
      tutorsCount: 50,
      subjectsCount: 500,
      studentsCount: 1000,
      syllabusesCount: 4,
      avgRating: "4.9",
      formatted: {
        tutors: "50+",
        subjects: "500+",
        students: "1,000+",
        syllabuses: "4",
        avgRating: "4.9",
      }
    };
  }
}

export async function getTopReviews(limit = 6) {
  try {
    const reviews = await prisma.review.findMany({
      take: limit,
      orderBy: { rating: "desc" },
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
            slug: true,
            subject: true,
          }
        }
      }
    });

    return reviews.map((r) => ({
      id: r.id,
      student: r.student,
      grade: r.tutor?.subject ? `${r.tutor.subject} Tuition` : "Student Review",
      rating: r.rating,
      comment: r.comment || "",
      tutor: r.tutor?.name || "Verified Tutor",
      tutorSlug: r.tutor?.slug || r.tutorId,
      avatar: r.student.charAt(0).toUpperCase(),
    }));
  } catch (error) {
    console.error("Error fetching top reviews:", error);
    return [];
  }
}
import { prisma } from "@/lib/prisma";
import TutorsClient from "@/components/tutor/TutorsClient";

// ISR: regenerate this page at most once every 60 seconds
export const revalidate = 60;

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

export const metadata = {
  title: "Find a Tutor | TutorHub Sri Lanka",
  description:
    "Search and filter verified tutors by subject, syllabus, class format and budget. Find your perfect tutor for Local A/L, O/L, Cambridge, Edexcel and more.",
};

export default async function TutorPage() {
  // Fetch only the first page for the initial SSG render
  const [tutors, total] = await Promise.all([
    prisma.tutor.findMany({
      take: PAGE_SIZE,
      orderBy: [{ rating: "desc" }, { reviewsCount: "desc" }],
    }),
    prisma.tutor.count(),
  ]);

  return (
    <TutorsClient
      initialTutors={tutors.map(serializeTutor)}
      initialTotal={total}
      pageSize={PAGE_SIZE}
    />
  );
}
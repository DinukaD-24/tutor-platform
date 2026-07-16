import { getAllSyllabuses } from "@/utils/getData";

export async function getFeaturedSubjects() {
  const syllabuses = await getAllSyllabuses();
  return syllabuses.flatMap((syllabus) =>
    syllabus.grades.flatMap((grade) =>
      grade.subjects.map((subject) => ({
        ...subject,
        syllabus: syllabus.name,
        syllabusSlug: syllabus.slug,
        gradeSlug: grade.slug,
      }))
    )
  );
}
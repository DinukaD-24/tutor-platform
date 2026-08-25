import { getAllSyllabuses } from "@/utils/getData";

export async function getFeaturedSubjects() {
  try {
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
  } catch (error) {
    console.error("Error fetching featured subjects:", error);
    return [];
  }
}
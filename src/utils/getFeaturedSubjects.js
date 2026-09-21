import { getAllSyllabuses } from "@/utils/getData";

export async function getFeaturedSubjects(limit = 8) {
  try {
    const syllabuses = await getAllSyllabuses();
    const allSubjects = syllabuses.flatMap((syllabus) =>
      syllabus.grades.flatMap((grade) =>
        grade.subjects.map((subject) => ({
          ...subject,
          syllabus: syllabus.name,
          syllabusSlug: syllabus.slug,
          gradeSlug: grade.slug,
        }))
      )
    );

    // Deduplicate by subject name to avoid showing duplicate subjects across grades
    const seen = new Set();
    const uniqueSubjects = [];

    for (const subject of allSubjects) {
      const normalizedName = subject.name.trim().toLowerCase();
      if (!seen.has(normalizedName)) {
        seen.add(normalizedName);
        uniqueSubjects.push(subject);
      }
      if (limit && uniqueSubjects.length >= limit) {
        break;
      }
    }

    return uniqueSubjects;
  } catch (error) {
    console.error("Error fetching featured subjects:", error);
    return [];
  }
}
import { syllabuses } from "@/data/syllabuses";

export function getFeaturedSubjects() {
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
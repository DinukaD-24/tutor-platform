import SubjectCard from "@/components/cards/SubjectCard";
import { getSyllabus, getGrade } from "@/utils/getData";

export default async function GradePage({ params }) {

    const { syllabusSlug, gradeSlug } = await params;

    const syllabus = getSyllabus(
        syllabusSlug
    );
    const grade = getGrade(
        syllabusSlug,
        gradeSlug
    );

    if (!grade) return <div> Grade not found</div>

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">
                {grade.name}
            </h1>

            <p className="text-gray-500 mb-8">
                Browse subjects available for this grade
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                {grade.subjects.map((subject) => (
                    <SubjectCard
                        key={subject.slug}
                        syllabusSlug={syllabus.slug}
                        gradeSlug={grade.slug}
                        subject={subject}
                    />
                ))}
            </div>
        </div>
    );
}
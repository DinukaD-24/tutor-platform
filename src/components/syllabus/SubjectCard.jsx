import Link from "next/link";

export default function SubjectCard({ syllabusSlug, gradeSlug, subject }) {

    const finalSyllabusSlug = syllabusSlug || subject.syllabusSlug;
    const finalGradeSlug = gradeSlug || subject.gradeSlug;

    return (

        <Link 
            href={`/syllabus/${finalSyllabusSlug}/${finalGradeSlug}/${subject.slug}`}
            className="
                block
                bg-white
                rounded-2xl
                border
                border-gray-200
                p-6
                shadow-sm
                hover:shadow-lg
                transition
                hover:translate-y-1"
        >
            <h3 className="text-lg font-semibold">
                {subject.name}
            </h3>

            {subject.syllabus && (
                <p className="text-gray-500 text-sm mt-1">
                    {subject.syllabus}
                </p>
            )}
        </Link>
    );
}
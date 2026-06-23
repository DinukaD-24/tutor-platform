import Link from "next/link";

export default function GradeCard({ syllabusSlug, grade}) {
    return (
        <Link
            href={`/syllabus/${syllabusSlug}/${grade.slug}`}
            className="block border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition hover:-translate-y-1"
        >
            <h3 className="text-lg font-semibold">{grade.name}</h3>
        </Link>
    );
}
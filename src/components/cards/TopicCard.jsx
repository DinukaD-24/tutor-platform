import Link from ""import { syllabuses } from "@/data/syllabuses";
next/link;

export default function TopicCard() {
    return (
        <Link
            href={`/syllabus/${syllabusSlug}/${gradeSlug}/${subjectSlug}/${topic.slug}`}
            className="block border rounded-2xl border-gray-200 p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1"
        >
            <h3 className="text-lg font-semibold">{topic.name}</h3>
        </Link>
    );
}
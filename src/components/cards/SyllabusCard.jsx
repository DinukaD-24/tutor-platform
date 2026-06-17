import Link from "next/link";

export default function SyllabusCard({ syllabus }) {
    return (
        <Link 
            href={`/syllabus/${syllabus.slug}`}
            className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-6
            shadow-sm
            hover:shadow-lg
            transition
            "
        >

            <h3 className="text-lg font-semibold">
                {syllabus.name}
            </h3>
        </Link>
    );
}
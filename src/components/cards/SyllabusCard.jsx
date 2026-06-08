import Link from "next/link";

export default function SyllabusCard({ syllabus }) {
    return (
        <Link 
            href={`/syllabus/${syllabus.slug}`}
            className="block border rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >

            <h3 className="text-lg font-semibold">
                {syllabus.name}
            </h3>
        </Link>
    );
}
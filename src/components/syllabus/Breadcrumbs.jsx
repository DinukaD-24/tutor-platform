import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs ({
    syllabusName, syllabusSlug,
    gradeName, gradeSlug,
    subjectName, subjectSlug,
    topicName
}) {
    const items = [
        { label: "Syllabuses", href: "/syllabus" },
        { label: syllabusName, href: `/syllabus/${syllabusSlug}`},
        { label: gradeName, href: `/syllabus/${syllabusSlug}/${gradeSlug}` },
        { label: subjectName, href: `/syllabus/${syllabusSlug}/${gradeSlug}/${subjectSlug}` },
        { label: topicName, href:null }
    ];

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto py-2">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <div
                        key={index}
                        className="flex items-center space-x-2 flex-shrink-0"
                    >
                        {index > 0 && <ChevronRight size={14} className="text-gray-400"/>}
                        {isLast ? (
                            <span className="font-semibold text-gray-800">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="hover:text-primary transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
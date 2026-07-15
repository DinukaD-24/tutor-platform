import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

export default function SyllabusCard({ syllabus }) {
    return (
        <Link 
            href={`/syllabus/${syllabus.slug}`}
            className="
                group
                relative
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-6
                shadow-[0_8px_30px_rgb(0,0,0,0.02)]
                hover:border-primary/20
                hover:-translate-y-1
                hover:shadow-[0_15px_30px_rgba(33,131,150,0.06)]
                transition-all
                duration-300
                flex
                flex-col
                justify-between
                min-h-[140px]
            "
        >
            {/* Top color accent strip */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="space-y-2">
                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors duration-200">
                    {syllabus.name}
                </h3>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                    <Layers size={14} className="text-primary/70" />
                    {syllabus.grades ? syllabus.grades.length : 0} Levels Available
                </span>
                
                <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Explore
                    <ChevronRight size={14} />
                </span>
            </div>
        </Link>
    );
}

import Link from "next/link";
import { GraduationCap, BookOpen, Atom, Cpu, CheckCircle, ArrowUpRight } from "lucide-react";

export default function SubjectCard({ syllabusSlug, gradeSlug, subject }) {
    const finalSyllabusSlug = syllabusSlug || subject.syllabusSlug;
    const finalGradeSlug = gradeSlug || subject.gradeSlug;

    // Select an icon based on subject name
    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("math")) return <GraduationCap className="text-primary group-hover:text-white transition-colors" size={22} />;
        if (lowerName.includes("phys")) return <Atom className="text-primary group-hover:text-white transition-colors" size={22} />;
        if (lowerName.includes("ict") || lowerName.includes("computer")) return <Cpu className="text-primary group-hover:text-white transition-colors" size={22} />;
        return <BookOpen className="text-primary group-hover:text-white transition-colors" size={22} />;
    };

    return (
        <Link 
            href={`/syllabus/${finalSyllabusSlug}/${finalGradeSlug}/${subject.slug}`}
            className="
                group
                relative
                block
                bg-white
                rounded-3xl
                border
                border-gray-100/90
                p-6
                shadow-[0_8px_30px_rgb(0,0,0,0.02)]
                hover:border-primary/40
                hover:-translate-y-1.5
                hover:shadow-[0_20px_40px_rgba(33,131,150,0.08)]
                transition-all
                duration-300
                overflow-hidden
                h-full
                flex
                flex-col
                justify-between
            "
        >
            {/* Top color gradient highlight strip on hover */}
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary-dark rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                <div className="flex justify-between items-start gap-4">
                    <div className="p-3.5 bg-primary/10 rounded-2xl border border-primary/15 group-hover:bg-primary transition-all duration-300 shrink-0 shadow-2xs">
                        {getIcon(subject.name)}
                    </div>

                    {(subject.syllabus || subject.gradeSlug) && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-100/80 px-2.5 py-1 rounded-full border border-gray-200/60">
                            {subject.syllabus || subject.gradeSlug}
                        </span>
                    )}
                </div>

                <div className="mt-5">
                    <h3 className="text-lg font-black text-dark group-hover:text-primary transition-colors duration-200 tracking-tight">
                        {subject.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5 font-medium">
                        <CheckCircle size={14} className="text-primary" />
                        Verified Syllabus Content
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100/80 flex items-center justify-between text-xs font-extrabold text-primary group-hover:text-primary-dark">
                <span>View Modules</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
        </Link>
    );
}

import { GraduationCap, BookOpen, Atom, Cpu, CheckCircle } from "lucide-react";

export default function SubjectCard({ subject }) {
    // Select an icon based on subject name
    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("math")) return <GraduationCap className="text-primary" size={24} />;
        if (lowerName.includes("phys")) return <Atom className="text-primary" size={24} />;
        if (lowerName.includes("ict") || lowerName.includes("computer")) return <Cpu className="text-primary" size={24} />;
        return <BookOpen className="text-primary" size={24} />;
    };

    return (
        <div className="
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
        ">
            {/* Top color strip on hover */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex justify-between items-start gap-4">
                <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors shrink-0">
                    {getIcon(subject.name)}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                    {subject.syllabus}
                </span>
            </div>

            <div className="mt-5">
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors duration-200">
                    {subject.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-secondary" />
                    Verified Syllabus Content
                </p>
            </div>

        </div>
    );
}
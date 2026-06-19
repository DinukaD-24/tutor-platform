import Link from "next/link";
import { BookOpen, Award, ArrowRight } from "lucide-react";

export default function TutorCard({ tutor }) {
    const isUni = tutor.tutorType.toLowerCase().includes("uni");

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
            flex
            flex-col
            justify-between
        ">
            {/* Top accent badge indicator on hover */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                <div className="flex items-center gap-4">
                    {tutor.image ? (
                        <img 
                            src={tutor.image} 
                            alt={tutor.name} 
                            className="w-14 h-14 rounded-xl object-cover shadow-md shrink-0"
                        />
                    ) : (
                        <div className="
                            w-14
                            h-14
                            rounded-xl
                            bg-gradient-to-tr
                            from-primary
                            to-primary-dark
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-xl
                            shadow-md
                            shrink-0
                        ">
                            {tutor.name.charAt(0)}
                        </div>
                    )}

                    <div>
                        <h3 className="font-bold text-lg text-dark group-hover:text-primary transition-colors">
                            {tutor.name}
                        </h3>

                        <span className={`
                            inline-flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            px-2.5
                            py-0.5
                            rounded-full
                            mt-1
                            ${isUni ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}
                        `}>
                            <Award size={12} />
                            {tutor.tutorType}
                        </span>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                        <BookOpen size={16} className="text-primary/70 shrink-0" />
                        <span className="font-semibold text-dark">Specialty:</span>
                        <span className="truncate">{tutor.subject}</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-400">Available Online & Physical</span>
                <Link
                    href="/contact"
                    className="
                        inline-flex
                        items-center
                        gap-1
                        text-xs
                        font-bold
                        text-primary
                        group-hover:text-primary-dark
                        transition-colors
                    "
                >
                    Contact Tutor
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

        </div>
    );
}
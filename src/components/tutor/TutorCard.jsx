import Link from "next/link";
import { BookOpen, Award, ArrowRight, Star, Users, GraduationCap } from "lucide-react";

export default function TutorCard({ tutor }) {
    const isUni = tutor.tutorType.toLowerCase().includes("uni");

    // Helper to render rating stars
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} size={14} className="fill-amber-400 text-amber-400 shrink-0" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative shrink-0">
                        <Star size={14} className="text-gray-200" />
                        <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} size={14} className="text-gray-200 shrink-0" />);
            }
        }
        return stars;
    };

    return (
        <div className="
            group
            relative
            bg-white
            rounded-3xl
            border
            border-gray-100
            p-6
            shadow-[0_8px_30px_rgb(0,0,0,0.015)]
            hover:border-primary/20
            hover:-translate-y-1
            hover:shadow-[0_20px_40px_rgba(33,131,150,0.06)]
            transition-all
            duration-300
            flex
            flex-col
            justify-between
        ">
            {/* Hover Accent Line */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                {/* Header Information */}
                <div className="flex items-start gap-4">
                    {tutor.image ? (
                        <img 
                            src={tutor.image} 
                            alt={tutor.name} 
                            className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-50 shrink-0"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-extrabold text-xl shadow-sm shrink-0">
                            {tutor.name.charAt(0)}
                        </div>
                    )}

                    <div className="space-y-1 min-w-0">
                        <h3 className="font-extrabold text-base text-dark truncate group-hover:text-primary transition-colors">
                            {tutor.name}
                        </h3>

                        {/* Ratings */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center">
                                {renderStars(tutor.rating)}
                            </div>
                            <span className="text-xs font-bold text-gray-700 mt-0.5">{tutor.rating}</span>
                            <span className="text-gray-400 text-[10px] mt-0.5">({tutor.reviewsCount})</span>
                        </div>

                        {/* Badge / Classification */}
                        <span className={`
                            inline-flex
                            items-center
                            gap-1
                            text-[10px]
                            font-bold
                            px-2.5
                            py-0.5
                            rounded-full
                            ${isUni ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}
                        `}>
                            <Award size={10} />
                            {tutor.tutorType}
                        </span>
                    </div>
                </div>

                {/* Institute & Specialty Details */}
                <div className="mt-5 space-y-2.5 border-t border-b border-gray-50 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <GraduationCap size={14} className="text-primary/70 shrink-0" />
                        <span className="truncate">{tutor.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                        <BookOpen size={14} className="text-primary/70 shrink-0" />
                        <span className="font-bold">Subject:</span>
                        <span className="truncate">{tutor.subject}</span>
                    </div>
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-gray-50/50 rounded-xl p-2.5 text-center">
                        <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Lessons Conducted</span>
                        <strong className="block text-sm font-black text-dark mt-0.5">{tutor.lessonsCount}</strong>
                    </div>
                    <div className="bg-gray-50/50 rounded-xl p-2.5 text-center">
                        <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Active Students</span>
                        <strong className="block text-sm font-black text-dark mt-0.5">{tutor.studentsCount}</strong>
                    </div>
                </div>
            </div>

            {/* Footer Action Links */}
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-medium text-gray-400">Verified Educator</span>
                <Link
                    href={`/tutors/${tutor.id}`}
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
                    View Profile
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

        </div>
    );
}

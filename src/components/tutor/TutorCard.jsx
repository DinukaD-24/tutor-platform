import Link from "next/link";
import { BookOpen, Award, ArrowRight, Star, GraduationCap, CheckCircle2 } from "lucide-react";

export default function TutorCard({ tutor }) {
    const isUni = tutor.tutorType?.toLowerCase().includes("uni");

    // Helper to render rating stars
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 5);
        const hasHalfStar = (rating || 5) % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} size={13} className="fill-amber-400 text-amber-400 shrink-0" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative shrink-0">
                        <Star size={13} className="text-gray-200" />
                        <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                            <Star size={13} className="fill-amber-400 text-amber-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} size={13} className="text-gray-200 shrink-0" />);
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
            border-gray-100/90
            p-5
            lg:p-6
            shadow-[0_8px_30px_rgb(0,0,0,0.02)]
            hover:border-primary/40
            hover:-translate-y-1.5
            hover:shadow-[0_20px_40px_rgba(33,131,150,0.08)]
            transition-all
            duration-300
            flex
            flex-col
            justify-between
            overflow-hidden
            h-full
        ">
            {/* Top Accent Gradient Line */}
            <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary-dark rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                {/* Header Information */}
                <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                        {tutor.image ? (
                            <img 
                                src={tutor.image} 
                                alt={tutor.name} 
                                className="w-16 h-16 rounded-2xl object-cover shadow-xs border-2 border-white ring-1 ring-gray-200/80 group-hover:ring-primary/40 transition-all duration-300"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-black text-xl shadow-xs border-2 border-white ring-1 ring-gray-200/80 shrink-0">
                                {tutor.name?.charAt(0) || "T"}
                            </div>
                        )}
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white shadow-2xs">
                            <CheckCircle2 size={10} />
                        </span>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="font-black text-base text-dark truncate group-hover:text-primary transition-colors tracking-tight">
                            {tutor.name}
                        </h3>

                        {/* Ratings */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center">
                                {renderStars(tutor.rating)}
                            </div>
                            <span className="text-xs font-black text-dark mt-0.5">{tutor.rating || 5.0}</span>
                            <span className="text-gray-400 text-[10px] mt-0.5 font-semibold">({tutor.reviewsCount || 0})</span>
                        </div>

                        {/* Badge / Classification */}
                        <span className={`
                            inline-flex
                            items-center
                            gap-1
                            text-[10px]
                            font-black
                            uppercase
                            tracking-wider
                            px-2.5
                            py-0.5
                            rounded-full
                            ${isUni ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-primary/10 text-primary border border-primary/20'}
                        `}>
                            <Award size={10} />
                            {tutor.tutorType || "Verified Tutor"}
                        </span>
                    </div>
                </div>

                {/* Institute & Specialty Details */}
                <div className="mt-4 space-y-2 border-t border-b border-gray-100/80 py-3.5">
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <GraduationCap size={14} className="text-primary shrink-0" />
                        <span className="truncate">{tutor.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-800">
                        <BookOpen size={14} className="text-primary shrink-0" />
                        <span className="font-extrabold text-dark">Subject:</span>
                        <span className="truncate font-semibold">{tutor.subject}</span>
                    </div>
                    {((tutor.syllabuses && tutor.syllabuses.length > 0) || (tutor.grades && tutor.grades.length > 0)) && (
                        <div className="flex flex-wrap gap-1 pt-1">
                            {tutor.syllabuses?.map((syl) => (
                                <span key={syl} className="text-[10px] font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                                    {syl}
                                </span>
                            ))}
                            {tutor.grades?.map((grd) => (
                                <span key={grd} className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                                    {grd}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3.5">
                    <div className="bg-gray-50/80 rounded-2xl p-2.5 text-center border border-gray-100">
                        <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Lessons</span>
                        <strong className="block text-xs sm:text-sm font-black text-dark mt-0.5">{tutor.lessonsCount || "10+"}</strong>
                    </div>
                    <div className="bg-gray-50/80 rounded-2xl p-2.5 text-center border border-gray-100">
                        <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Students</span>
                        <strong className="block text-xs sm:text-sm font-black text-dark mt-0.5">{tutor.studentsCount || "5+"}</strong>
                    </div>
                </div>
            </div>

            {/* Footer Action Links */}
            <div className="mt-5 pt-3 border-t border-gray-100/80 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400">Verified Educator</span>
                <Link
                    href={`/tutors/${tutor.id}`}
                    className="
                        inline-flex
                        items-center
                        gap-1
                        text-xs
                        font-black
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

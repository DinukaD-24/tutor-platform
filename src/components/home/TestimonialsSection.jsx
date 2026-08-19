import { Star } from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

const defaultTestimonials = [
    {
        id: "1",
        student: "Tharushi Perera",
        grade: "Local A/L — Combined Maths",
        rating: 5,
        comment: "I went from a C to an A in just 3 months. The way my tutor explains calculus from first principles completely changed how I think about maths.",
        tutor: "John Perera",
        tutorSlug: "",
        avatar: "T",
        color: "from-primary to-primary-dark",
    },
    {
        id: "2",
        student: "Kamal Bandara",
        grade: "Local A/L — Physics",
        rating: 5,
        comment: "The online simulations for mechanics made everything click instantly. I never thought I'd enjoy physics revision this much.",
        tutor: "Sarah Silva",
        tutorSlug: "",
        avatar: "K",
        color: "from-primary to-emerald-600",
    },
    {
        id: "3",
        student: "Nimasha Rathnayake",
        grade: "Local O/L — ICT",
        rating: 5,
        comment: "Practical coding lessons are hands-down the best I have found. I built my first database after just two sessions.",
        tutor: "Nimal Fernando",
        tutorSlug: "",
        avatar: "N",
        color: "from-purple-500 to-indigo-600",
    },
];

const colorGradients = [
    "from-primary to-primary-dark",
    "from-primary to-emerald-600",
    "from-purple-500 to-indigo-600",
    "from-rose-400 to-pink-600",
    "from-amber-500 to-orange-500",
    "from-teal-500 to-cyan-600",
];

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={13}
                    className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                />
            ))}
        </div>
    );
}

export default function TestimonialsSection({ dbReviews }) {
    if (!dbReviews || dbReviews.length === 0) {
        return null; // Gracefully hide until real student reviews are posted
    }

    return (
        <section className="py-24 bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        What students are saying
                    </h2>
                    <p className="text-gray-500">
                        Real experiences from students who found their ideal tutor through TutorHub.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dbReviews.map((t, idx) => {
                        const color = t.color || colorGradients[idx % colorGradients.length];
                        return (
                            <StaggerItem key={t.id}>
                                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(33,131,150,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-5 h-full">
                                    
                                    {/* Stars + Quote */}
                                    <div className="space-y-3">
                                        <StarRating rating={t.rating} />
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            &ldquo;{t.comment}&rdquo;
                                        </p>
                                    </div>

                                    {/* Student Info */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} text-white font-extrabold text-sm flex items-center justify-center shrink-0`}>
                                            {t.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <strong className="block text-sm text-dark font-extrabold truncate">
                                                {t.student}
                                            </strong>
                                            <span className="text-[10px] text-gray-400 font-semibold truncate block">
                                                {t.grade}
                                            </span>
                                        </div>
                                        {t.tutorSlug ? (
                                            <Link
                                                href={`/tutors/${t.tutorSlug}`}
                                                className="ml-auto text-[10px] font-bold text-primary hover:text-primary-dark bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-lg border border-primary/10 shrink-0 transition-colors"
                                            >
                                                via {t.tutor}
                                            </Link>
                                        ) : (
                                            <span className="ml-auto text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10 shrink-0">
                                                via {t.tutor}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

            </div>
        </section>
    );
}

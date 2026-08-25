import { Star, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

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
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={14}
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
        <section className="py-20 lg:py-24 bg-gray-50/50 border-t border-gray-100 relative">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 shadow-2xs">
                        <MessageSquareQuote size={13} />
                        Student Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-tight">
                        What Students Are Saying
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        Real experiences from students who found their ideal tutor through TutorHub.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dbReviews.map((t, idx) => {
                        const color = t.color || colorGradients[idx % colorGradients.length];
                        return (
                            <StaggerItem key={t.id}>
                                <div className="bg-white rounded-3xl border border-gray-100/90 p-6 lg:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(33,131,150,0.08)] transition-all duration-300 flex flex-col justify-between gap-5 h-full relative overflow-hidden group">
                                    
                                    {/* Quote watermark */}
                                    <div className="absolute top-4 right-6 text-gray-100 font-serif text-7xl select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                                        &ldquo;
                                    </div>

                                    {/* Stars + Quote */}
                                    <div className="space-y-3.5 relative z-10">
                                        <StarRating rating={t.rating} />
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
                                            &ldquo;{t.comment}&rdquo;
                                        </p>
                                    </div>

                                    {/* Student Info */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100/80 relative z-10">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs border-2 border-white`}>
                                            {t.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <strong className="block text-sm text-dark font-black truncate">
                                                {t.student}
                                            </strong>
                                            <span className="text-[10px] text-gray-400 font-bold truncate block">
                                                {t.grade}
                                            </span>
                                        </div>
                                        {t.tutorSlug ? (
                                            <Link
                                                href={`/tutors/${t.tutorSlug}`}
                                                className="ml-auto text-[10px] font-extrabold text-primary hover:text-primary-dark bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-full border border-primary/20 shrink-0 transition-colors"
                                            >
                                                via {t.tutor}
                                            </Link>
                                        ) : (
                                            <span className="ml-auto text-[10px] font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 shrink-0">
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

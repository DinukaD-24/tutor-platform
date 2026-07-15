import { Star } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

const testimonials = [
    {
        id: 1,
        student: "Tharushi Perera",
        grade: "Local A/L — Combined Maths",
        rating: 5,
        comment: "I went from a C to an A in just 3 months. The way John explains calculus from first principles completely changed how I think about maths.",
        tutor: "John Perera",
        avatar: "T",
        color: "from-primary to-primary-dark",
    },
    {
        id: 2,
        student: "Kamal Bandara",
        grade: "Local A/L — Physics",
        rating: 5,
        comment: "Sarah's online simulations for mechanics made everything click instantly. I never thought I'd enjoy physics revision this much.",
        tutor: "Sarah Silva",
        avatar: "K",
        color: "from-secondary to-emerald-600",
    },
    {
        id: 3,
        student: "Nimasha Rathnayake",
        grade: "Local O/L — ICT",
        rating: 5,
        comment: "Nimal's practical coding lessons are hands-down the best I have found. I built my first database after just two sessions.",
        tutor: "Nimal Fernando",
        avatar: "N",
        color: "from-purple-500 to-indigo-600",
    },
    {
        id: 4,
        student: "Sachini Wijesinghe",
        grade: "Local A/L — Biology",
        rating: 5,
        comment: "Anne's mnemonics are legendary in our class. She made the entire human physiology chapter memorable overnight before my mock exam.",
        tutor: "Anne De Silva",
        avatar: "S",
        color: "from-rose-400 to-pink-600",
    },
    {
        id: 5,
        student: "Dulith Jayawardena",
        grade: "Edexcel — Mathematics",
        rating: 5,
        comment: "The structured approach to past paper practice made exam conditions feel familiar. My confidence going into A2 is completely different now.",
        tutor: "John Perera",
        avatar: "D",
        color: "from-amber-500 to-orange-500",
    },
    {
        id: 6,
        student: "Anupama Herath",
        grade: "Cambridge — Physics",
        rating: 5,
        comment: "I was struggling with waves and oscillations for months. After two sessions with Sarah, I finally understood the underlying concepts.",
        tutor: "Sarah Silva",
        avatar: "A",
        color: "from-teal-500 to-cyan-600",
    },
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

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        Student Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        What students are saying
                    </h2>
                    <p className="text-gray-500">
                        Real experiences from students who found their ideal tutor through TutorHub.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
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
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} text-white font-extrabold text-sm flex items-center justify-center shrink-0`}>
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
                                    <span className="ml-auto text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10 shrink-0">
                                        via {t.tutor}
                                    </span>
                                </div>

                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

            </div>
        </section>
    );
}

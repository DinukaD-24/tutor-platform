import Link from "next/link";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

export default function HeroContent() {
    return (
        <div className="space-y-8">
            <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                    TutorHub — Sri Lanka's Tutor Discovery Platform
                </span>

                <h1 className="text-4xl md:text-6xl font-black leading-tight text-dark tracking-tight">
                    Welcome to <span className="text-primary">TutorHub</span>
                    <br />
                    Find the Right Tutor. Learn Your Way.
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                    TutorHub is Sri Lanka's tutor discovery platform connecting students with verified tutors across Local A/L, O/L, Edexcel, and Cambridge syllabuses. Browse subjects, compare teaching styles, and connect directly with qualified educators.
                </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
                {["Verified Tutors", "Free to Browse", "All Syllabuses"].map((badge) => (
                    <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-gray-100 text-xs font-semibold text-gray-600 shadow-sm">
                        <ShieldCheck size={12} className="text-primary" />
                        {badge}
                    </span>
                ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/syllabus"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-glow-primary hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                    Browse Subjects
                    <ArrowRight size={16} />
                </Link>
                <Link
                    href="/tutors"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border-2 border-gray-100 hover:border-primary/30 hover:text-primary text-dark font-bold rounded-2xl hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                    <Search size={15} />
                    Find a Tutor
                </Link>
            </div>
        </div>
    );
}

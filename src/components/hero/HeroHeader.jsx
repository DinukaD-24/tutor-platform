import Link from "next/link";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
          TutorHub.LK — Sri Lanka's Tutor Discovery Platform
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-dark tracking-tight">
          Welcome to <span className="text-primary">TutorHub.LK</span>
          <br />
          Find the Right Tutor. Learn Your Way.
        </h1>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl">
          TutorHub.LK is Sri Lanka's tutor discovery platform connecting students with verified tutors across Local A/L, O/L, Edexcel, and Cambridge syllabuses. Browse subjects, compare teaching styles, and connect directly with qualified educators.
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2.5">
        {["Verified Tutors", "Free to Browse", "All Syllabuses"].map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-gray-100 text-xs font-semibold text-gray-600 shadow-xs">
            <ShieldCheck size={13} className="text-primary" />
            {badge}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          href="/syllabus"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-glow-primary hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm"
        >
          Browse Subjects
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/tutors"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:border-primary/40 hover:text-primary text-dark font-bold rounded-2xl hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm shadow-xs"
        >
          <Search size={14} />
          Find a Tutor
        </Link>
      </div>
    </div>
  );
}

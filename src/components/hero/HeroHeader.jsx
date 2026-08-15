import Link from "next/link";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="space-y-3.5 text-left max-w-4xl">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20">
          TutorHub.LK — Sri Lanka's Tutor Discovery Platform
        </span>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-dark tracking-tight">
          Welcome to <span className="text-primary">TutorHub.LK</span>
          <br />
          Find the Right Tutor. Learn Your Way.
        </h1>

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
          Sri Lanka's #1 tutor discovery platform connecting students with top verified educators for Local A/L, O/L, Edexcel & Cambridge syllabuses.
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2">
        {["Verified Tutors", "Free to Browse", "All Syllabuses"].map((badge) => (
          <span key={badge} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white rounded-lg border border-gray-100 text-[11px] font-semibold text-gray-600 shadow-2xs">
            <ShieldCheck size={12} className="text-primary" />
            {badge}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-2.5 pt-0.5">
        <Link
          href="/syllabus"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-glow-primary hover:-translate-y-0.5 transition-all duration-200 text-xs"
        >
          Browse Subjects
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/tutors"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 hover:border-primary/40 hover:text-primary text-dark font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-200 text-xs shadow-2xs"
        >
          <Search size={13} />
          Find a Tutor
        </Link>
      </div>
    </div>
  );
}

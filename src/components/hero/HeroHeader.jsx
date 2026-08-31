import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Sparkles } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="space-y-4 text-left max-w-4xl relative">
      <div className="space-y-3">
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="truncate">TutorHub.LK — Sri Lanka&apos;s Premier Tutor Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] text-dark tracking-tight">
          Welcome to <span className="bg-gradient-to-r from-primary via-primary-dark to-teal-800 bg-clip-text text-transparent">TutorHub.LK</span>
          <br />
          Find the Right Tutor. <span className="underline decoration-primary/30 underline-offset-4">Learn Your Way.</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium">
          Sri Lanka&apos;s #1 tutor discovery platform connecting students with top verified educators for Local A/L, O/L, Edexcel &amp; Cambridge syllabuses.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {["Verified Tutors", "Free to Browse", "All Syllabuses"].map((badge) => (
          <span 
            key={badge} 
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-gray-200/70 text-xs font-extrabold text-dark/80 shadow-xs hover:border-primary/30 transition-all"
          >
            <ShieldCheck size={13} className="text-primary" />
            {badge}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="/syllabus"
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            bg-primary
            hover:bg-primary-dark
            text-white
            font-black
            rounded-full
            shadow-[0_4px_16px_rgba(33,131,150,0.35)]
            hover:shadow-[0_6px_22px_rgba(33,131,150,0.45)]
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all
            duration-200
            text-xs
            sm:text-sm
          "
        >
          Browse Subjects
          <ArrowRight size={15} />
        </Link>
        
        <Link
          href="/tutors"
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            bg-white
            border
            border-gray-200/90
            hover:border-primary/40
            hover:text-primary
            text-dark
            font-extrabold
            rounded-full
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all
            duration-200
            text-xs
            sm:text-sm
            shadow-xs
          "
        >
          <Search size={14} className="text-primary" />
          Find a Tutor
        </Link>

        <Link
          href="/explore"
          className="
            inline-flex
            items-center
            gap-2
            px-5
            py-3
            bg-gradient-to-r
            from-emerald-600
            to-[#0d8a6e]
            hover:from-emerald-700
            hover:to-[#096d57]
            text-white
            font-black
            rounded-full
            shadow-[0_4px_16px_rgba(13,138,110,0.3)]
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all
            duration-200
            text-xs
            sm:text-sm
            border
            border-emerald-300/30
          "
        >
          <Sparkles size={14} className="text-emerald-200" />
          Tuition Requests ✦
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroContent() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                    Sri Lanka's Modern Tutor Discovery
                </span>
                
                <h1 className="text-4xl md:text-6xl font-black leading-tight text-dark tracking-tight">
                    Find the{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Right Tutor.
                    </span>
                    <br/>
                    Learn at Your Own Pace.
                </h1>
            </div>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Discover qualified tutors across multiple syllabuses. Find the teaching style, experience, and approach that fits your personal learning goals.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                    href="/syllabus"
                    className="
                        group
                        flex
                        items-center
                        gap-2
                        px-7
                        py-3.5
                        bg-primary
                        text-white
                        font-semibold
                        rounded-xl
                        shadow-glow-primary
                        hover:bg-primary-dark
                        hover:-translate-y-0.5
                        transition-all
                        duration-200
                    "
                >
                    Browse Syllabuses
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                    href="/contact"
                    className="
                        px-7
                        py-3.5
                        border-2
                        border-primary/20
                        text-primary
                        font-semibold
                        rounded-xl
                        hover:border-primary
                        hover:bg-primary/5
                        hover:-translate-y-0.5
                        transition-all
                        duration-200
                    "
                >
                    Become a Tutor
                </Link>
            </div>
        </div>
    );
}
import { getFeaturedSubjects } from "@/utils/getFeaturedSubjects";
import SubjectCard from "../syllabus/SubjectCard";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default async function FeaturedSubjects() {
    const subjects = await getFeaturedSubjects().catch(() => []);

    return (
        <section className="bg-white py-20 lg:py-24 border-y border-gray-100/80 relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 shadow-2xs">
                        <BookOpen size={13} />
                        Syllabuses &amp; Subjects
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-tight">
                        Featured Subjects
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        Explore core subjects mapped to Sri Lankan curricula and find qualified tutors who specialize in these exact modules.
                    </p>
                </FadeIn>

                {/* Staggered Subjects Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {subjects.map((subject) => (
                        <StaggerItem key={`${subject.syllabusSlug}-${subject.gradeSlug}-${subject.slug}`}>
                            <SubjectCard subject={subject} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Section CTA */}
                <FadeIn className="text-center">
                    <Link
                        href="/syllabus"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-6
                            py-3.5
                            bg-white
                            border
                            border-gray-200/90
                            hover:border-primary/40
                            text-dark
                            hover:text-primary
                            font-extrabold
                            rounded-full
                            shadow-xs
                            hover:shadow-md
                            hover:-translate-y-0.5
                            transition-all
                            duration-200
                            text-sm
                        "
                    >
                        Explore All Subjects
                        <ArrowRight size={16} />
                    </Link>
                </FadeIn>

            </div>
        </section>
    );
}

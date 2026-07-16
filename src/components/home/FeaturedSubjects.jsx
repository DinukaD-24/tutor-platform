import { getFeaturedSubjects } from "@/utils/getFeaturedSubjects";
import SubjectCard from "../syllabus/SubjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default async function FeaturedSubjects() {
    const subjects = await getFeaturedSubjects();

    return (
        <section className="bg-white py-24 border-y border-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        Syllabuses
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        Featured Subjects
                    </h2>
                    <p className="text-gray-500">
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
                            py-3
                            border-2
                            border-gray-100
                            text-dark
                            hover:border-primary
                            hover:text-primary
                            font-semibold
                            rounded-xl
                            transition-all
                            duration-200
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

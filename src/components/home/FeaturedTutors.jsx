import { getAllTutors } from "@/utils/getData";
import TutorCard from "@/components/tutor/TutorCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default async function FeaturedTutors() {
    const tutors = await getAllTutors();
    
    return (
        <section className="bg-gray-50/50 py-24 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        Educators
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        Meet Our Featured Tutors
                    </h2>
                    <p className="text-gray-500">
                        Browse top-rated university students and professional educators dedicated to helping you achieve your learning milestones.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {tutors.map((tutor) => (
                        <StaggerItem key={tutor.id}>
                            <TutorCard tutor={tutor} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                <FadeIn className="text-center">
                    <Link
                        href="/tutors"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-dark hover:border-primary hover:text-primary font-semibold rounded-xl transition-all duration-200"
                    >
                        Explore All Tutors
                        <ArrowRight size={16} />
                    </Link>
                </FadeIn>

            </div>
        </section>
    );
}

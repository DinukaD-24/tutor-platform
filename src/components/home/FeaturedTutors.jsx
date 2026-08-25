import { getAllTutors } from "@/utils/getData";
import TutorCard from "@/components/tutor/TutorCard";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default async function FeaturedTutors() {
    const tutors = await getAllTutors().catch(() => []);
    
    return (
        <section className="bg-gray-50/50 py-20 lg:py-24 border-b border-gray-100 relative">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 shadow-2xs">
                        <Users size={13} />
                        Verified Educators
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-tight">
                        Meet Our Featured Tutors
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
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
                        Explore All Tutors
                        <ArrowRight size={16} />
                    </Link>
                </FadeIn>

            </div>
        </section>
    );
}

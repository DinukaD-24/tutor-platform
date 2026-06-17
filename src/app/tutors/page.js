import { tutors } from "@/data/tutors";
import TutorCard from "@/components/cards/TutorCard";

export default function TutorPage() {
    return (
        <section className="pt-24">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-5xl font-bold mb-4">
                    Find Tutors
                </h1>

                <p className="text-gray-600 mb-10">
                    Discover tutors, explore teaching styles, and find the right match for your learning journey.
                </p>

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                ">
                    {tutors.map((tutor) => (
                        <TutorCard
                            key={tutor.id}
                            tutor={tutor}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
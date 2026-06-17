import {tutors} from "@/data/tutors";
import TutorCard from "../cards/TutorCard";

export default function FeaturedTutors() {
    return (
        <section className="px-8 py-16">
            <h2 className="text-3xl font-bold text-center mb-8">
                Featured Tutors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tutors.map((tutor) => (
                    <TutorCard
                        key={tutor.id}
                        tutor={tutor}
                    />
                ))}
            </div>
        </section>
    );
}
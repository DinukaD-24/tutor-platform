import {subjects} from "@/data/subjects";
import SubjectCard from "../cards/SubjectCard";

export default function FeaturedSubject() {
    return (
        <section className="px-8 py-16">
            <h2 className="text-3xl font-bold text-center mb-8">
                Featured Subjects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                    />
                ))}
            </div>
        </section>
    );
}
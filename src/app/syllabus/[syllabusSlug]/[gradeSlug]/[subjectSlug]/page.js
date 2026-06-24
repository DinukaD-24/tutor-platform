import TopicCard from "@/components/cards/TopicCard";
import { getGrade, getSubject, getSyllabus } from "@/utils/getData";

export default async function SubjectPage({ params }) {

    const { syllabusSlug , gradeSlug , subjectSlug } = await params;
    const syllabus = getSyllabus(syllabusSlug);
    const grade = getGrade(syllabusSlug, gradeSlug);
    const subject = getSubject(syllabusSlug, gradeSlug, subjectSlug);

    if (!subject) return <div>Subject not found</div>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">
                {subject.name}
            </h1>

            <p className="grid gap-6 md:grid-cols-2">
                Browse topics available in this subject.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                {subject.topics.map((topic) => (
                    <TopicCard 
                        key={topic.slug}
                        syllabusSlug={syllabus.slug}
                        gradeSlug={grade.slug}
                        subjectSlug={subject.slug}
                        topic={topic}
                    />
                ))}
            </div>
        </div>
    );
}
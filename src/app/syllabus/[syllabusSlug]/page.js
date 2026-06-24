import GradeCard from "@/components/cards/GradeCard";
import { getSyllabus } from "@/utils/getData";

export default async function SyllabusDetailPage({ params }) {
    const{ syllabusSlug } = await params;
    const syllabus = getSyllabus(syllabusSlug);

    if(!syllabus) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold">Syllabus not found </h1>
            </div>
            );
        }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">{syllabus.name}</h1>
            <p className="text-gray-500 mb-8">Browse grades available in this syllabus.</p>

            <div className="grid gap-6 md:grid-cols-2">
                {syllabus.grades.map(grade => (
                    <GradeCard 
                        key={grade.slug}
                        syllabusSlug={syllabus.slug}
                        grade={grade}
                    />
                ))}
            </div>
        </div>
    )
}
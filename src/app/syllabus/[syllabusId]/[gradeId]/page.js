import { syllabuses } from "@/data/syllabuses";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function Page({ params }) {
    const { syllabusId, gradeId } = await params;
    const syllabus = syllabuses.find((s) => s.slug === syllabusId);
    const grade = syllabus?.grades.find((g) => g.slug === gradeId);

    if (!syllabus || !grade) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold text-dark">Grade or Syllabus Not Found</h1>
                <Link href="/syllabus" className="text-primary mt-4 inline-block hover:underline">
                    Back to Syllabuses
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-dark py-12">
            <div className="max-w-5xl mx-auto px-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/syllabus" className="hover:text-primary transition-colors">
                        Syllabuses
                    </Link>
                    <ChevronRight size={14} />
                    <Link href={`/syllabus/${syllabus.slug}`} className="hover:text-primary transition-colors">
                        {syllabus.name}
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{grade.name}</span>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm mb-10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {syllabus.name}
                    </span>
                    <h1 className="text-4xl font-bold mt-4 mb-4">{grade.name}</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Select a subject below to view specific topics and meet our featured tutors who specialize in the {grade.name} {syllabus.name} curriculum.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6">Available Subjects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {grade.subjects.map((subject) => (
                            <Link
                                key={subject.id}
                                href={`/syllabus/${syllabus.slug}/${grade.slug}/${subject.slug}`}
                                className="p-6 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                                        {subject.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {subject.topics?.length || 0} topics covered
                                    </p>
                                </div>
                                <div className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                    <ChevronRight size={20} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
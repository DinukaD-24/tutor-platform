import { syllabuses } from "@/data/syllabuses";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function Page({ params }) {
    const { syllabusId } = await params;
    const syllabus = syllabuses.find((s) => s.slug === syllabusId);

    if (!syllabus) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold text-dark">Syllabus Not Found</h1>
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
                    <span className="text-gray-900 font-medium">{syllabus.name}</span>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm mb-10">
                    <h1 className="text-4xl font-bold mb-4">{syllabus.name} Syllabus</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Select a grade or level below to explore the subject options and find the right tutoring resources for your academic goals.
                    </p>
                </div>

                <div className="space-y-12">
                    {syllabus.grades.map((grade) => (
                        <div key={grade.id} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-semibold text-dark">{grade.name}</h2>
                                <Link 
                                    href={`/syllabus/${syllabus.slug}/${grade.slug}`}
                                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                                >
                                    View Grade Details <ChevronRight size={16} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {grade.subjects.map((subject) => (
                                    <Link
                                        key={subject.id}
                                        href={`/syllabus/${syllabus.slug}/${grade.slug}/${subject.slug}`}
                                        className="p-5 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                                    >
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                            {subject.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {subject.topics?.length || 0} topics covered
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
import { getSyllabus, getGrade } from "@/utils/getData";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

export default async function GradePage({ params }) {
    const { syllabusSlug, gradeSlug } = await params;

    const syllabus = getSyllabus(syllabusSlug);
    const grade    = getGrade(syllabusSlug, gradeSlug);

    if (!grade || !syllabus) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
                <h1 className="text-3xl font-black text-dark">Grade Not Found</h1>
                <p className="text-gray-500 text-sm">The grade level you are looking for does not exist or has been removed.</p>
                <Link href="/syllabus" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition">
                    Back to Syllabuses
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background text-dark py-12">
            <div className="max-w-5xl mx-auto px-6 space-y-8">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Link href="/syllabus" className="hover:text-primary transition-colors">Syllabuses</Link>
                    <ChevronRight size={12} />
                    <Link href={`/syllabus/${syllabus.slug}`} className="hover:text-primary transition-colors">{syllabus.name}</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-600 font-bold">{grade.name}</span>
                </div>

                {/* Hero Header */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
                        {syllabus.name}
                    </span>
                    <h1 className="text-4xl font-extrabold text-dark tracking-tight">{grade.name}</h1>
                    <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
                        Select a subject below to view specific topics, lessons, resources, and meet our verified tutors specializing in the {grade.name} curriculum.
                    </p>
                </div>

                {/* Subjects Grid */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                    <h2 className="text-xl font-extrabold text-dark">Available Subjects</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {grade.subjects.map((subject) => (
                            <Link
                                key={subject.slug}
                                href={`/syllabus/${syllabus.slug}/${grade.slug}/${subject.slug}`}
                                className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group flex justify-between items-center"
                            >
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-base">
                                        {subject.name}
                                    </h3>
                                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                                        <Layers size={13} className="text-primary/70" />
                                        {subject.topics?.length || 0} topics covered
                                    </span>
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

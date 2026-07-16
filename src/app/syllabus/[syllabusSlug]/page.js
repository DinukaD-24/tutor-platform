import { getSyllabus } from "@/utils/getData";
import Link from "next/link";
import { ChevronRight, Layers, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SyllabusDetailPage({ params }) {
    const { syllabusSlug } = await params;
    const syllabus = await getSyllabus(syllabusSlug);

    if (!syllabus) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
                <h1 className="text-3xl font-black text-dark">Syllabus Not Found</h1>
                <p className="text-gray-500 text-sm">The syllabus you are looking for does not exist or has been removed.</p>
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
                    <Link href="/syllabus" className="hover:text-primary transition-colors">
                        Syllabuses
                    </Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-600 font-bold">{syllabus.name}</span>
                </div>

                {/* Hero Header */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
                        Syllabus Directory
                    </span>
                    <h1 className="text-4xl font-extrabold text-dark tracking-tight">{syllabus.name} Curriculum</h1>
                    <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
                        Select a grade or level below to explore the subject options and find the right tutoring resources for your academic goals.
                    </p>
                </div>

                {/* Grades Listing */}
                <div className="space-y-10">
                    {syllabus.grades.map((grade) => (
                        <div key={grade.slug} className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                            
                            {/* Grade Header */}
                            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                                <h2 className="text-2xl font-extrabold text-dark">{grade.name}</h2>
                                <Link 
                                    href={`/syllabus/${syllabus.slug}/${grade.slug}`}
                                    className="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                                >
                                    Explore Grade <ArrowRight size={12} />
                                </Link>
                            </div>

                            {/* Subjects Preview Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {grade.subjects.map((subject) => (
                                    <Link
                                        key={subject.slug}
                                        href={`/syllabus/${syllabus.slug}/${grade.slug}/${subject.slug}`}
                                        className="p-5 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group flex flex-col justify-between min-h-[110px]"
                                    >
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm">
                                            {subject.name}
                                        </h3>
                                        <span className="text-[10px] font-semibold text-gray-400 mt-2 flex items-center gap-1.5">
                                            <Layers size={12} className="text-primary/70" />
                                            {subject.topics?.length || 0} Topics Available
                                        </span>
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

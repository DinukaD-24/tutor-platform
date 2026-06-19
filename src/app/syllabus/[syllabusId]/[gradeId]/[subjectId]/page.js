import { syllabuses } from "@/data/syllabuses";
import { tutors } from "@/data/tutors";
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";
import TutorCard from "@/components/cards/TutorCard";

export default async function Page({ params }) {
    const { syllabusId, gradeId, subjectId } = await params;
    
    const syllabus = syllabuses.find((s) => s.slug === syllabusId);
    const grade = syllabus?.grades.find((g) => g.slug === gradeId);
    const subject = grade?.subjects.find((sub) => sub.slug === subjectId);

    if (!syllabus || !grade || !subject) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold text-dark">Subject Not Found</h1>
                <Link href="/syllabus" className="text-primary mt-4 inline-block hover:underline">
                    Back to Syllabuses
                </Link>
            </div>
        );
    }

    // Filter tutors who offer this subject. 
    // We do a simple case-insensitive match on subject name.
    const matchingTutors = tutors.filter(
        (t) => t.subject.toLowerCase() === subject.name.toLowerCase()
    );

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
                    <Link href={`/syllabus/${syllabus.slug}/${grade.slug}`} className="hover:text-primary transition-colors">
                        {grade.name}
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{subject.name}</span>
                </div>

                {/* Hero Header Card */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm mb-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {syllabus.name}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                            {grade.name}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{subject.name}</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Explore key learning topics covered under this subject, and find qualified tutors who specialize in teaching this specific curriculum.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Topics Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-4 text-dark border-b pb-2">
                                Topics Covered
                            </h2>
                            {subject.topics && subject.topics.length > 0 ? (
                                <ul className="space-y-3">
                                    {subject.topics.map((topic) => (
                                        <li key={topic.id} className="flex items-start gap-2 text-gray-600 text-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                            <span>{topic.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No specific topics listed.</p>
                            )}
                        </div>
                    </div>

                    {/* Tutors Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 text-dark flex items-center gap-2">
                                <User size={24} className="text-primary" />
                                Tutors for {subject.name}
                            </h2>

                            {matchingTutors.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {matchingTutors.map((tutor) => (
                                        <TutorCard key={tutor.id} tutor={tutor} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border border-dashed rounded-2xl">
                                    <p className="text-gray-500 mb-4">
                                        No tutors are currently registered specifically for {subject.name}.
                                    </p>
                                    <Link 
                                        href="/contact"
                                        className="inline-block bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition"
                                    >
                                        Become a Tutor for this Subject
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
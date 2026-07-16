import { getGrade, getSubject, getSyllabus, getTopicsBySlugs, getTutorsBySlugs } from "@/utils/getData";
import Link from "next/link";
import { ChevronRight, Clock, BookOpen, Users, ArrowRight, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

const difficultyConfig = {
    "Beginner":     { color: "text-green-700", bg: "bg-green-50",  border: "border-green-100" },
    "Intermediate": { color: "text-amber-700", bg: "bg-amber-50",  border: "border-amber-100" },
    "Advanced":     { color: "text-red-700",   bg: "bg-red-50",    border: "border-red-100"   },
};

export default async function SubjectPage({ params }) {
    const { syllabusSlug, gradeSlug, subjectSlug } = await params;
    const syllabus = await getSyllabus(syllabusSlug);
    const grade    = await getGrade(syllabusSlug, gradeSlug);
    const subject  = await getSubject(syllabusSlug, gradeSlug, subjectSlug);

    if (!subject) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-24 text-center space-y-4">
                <h1 className="text-3xl font-black text-dark">Subject Not Found</h1>
                <p className="text-gray-500 text-sm">This subject does not exist or has been removed.</p>
                <Link href="/syllabus" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition">
                    Back to Syllabuses
                </Link>
            </div>
        );
    }

// Resolve each topic slug into a full topic object
    const topicObjects = await getTopicsBySlugs(subject.topics);
    // Count matched tutors across all topics
    const allTutorSlugs = [...new Set(topicObjects.flatMap((t) => t.tutors || []))];
    const matchedTutors = await getTutorsBySlugs(allTutorSlugs);
    const totalHours = topicObjects.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Link href="/syllabus" className="hover:text-primary transition-colors">Syllabuses</Link>
                    <ChevronRight size={12} />
                    <Link href={`/syllabus/${syllabus.slug}`} className="hover:text-primary transition-colors">{syllabus.name}</Link>
                    <ChevronRight size={12} />
                    <Link href={`/syllabus/${syllabus.slug}/${grade.slug}`} className="hover:text-primary transition-colors">{grade.name}</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-600 font-bold">{subject.name}</span>
                </div>

                {/* Subject Hero Card */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
                                {syllabus.name}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10">
                                {grade.name}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">
                            {subject.name}
                        </h1>
                        <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
                            Explore all topics available in this subject. Each topic includes video lessons, study notes, and recommended tutors to guide your learning.
                        </p>
                    </div>

                    {/* Subject Summary Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50 max-w-sm">
                        <div className="text-center">
                            <strong className="block text-2xl font-black text-dark">{topicObjects.length}</strong>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Topics</span>
                        </div>
                        <div className="text-center">
                            <strong className="block text-2xl font-black text-dark">{totalHours}h</strong>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Est. Hours</span>
                        </div>
                        <div className="text-center">
                            <strong className="block text-2xl font-black text-dark">{matchedTutors.length}</strong>
                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Tutors</span>
                        </div>
                    </div>
                </div>

                {/* Topic List */}
                <section className="space-y-4">
                    <h2 className="text-xl font-extrabold text-dark">Topics in this Subject</h2>

                    <div className="space-y-3">
                        {topicObjects.map((topic, index) => {
                            const difficulty = topic.difficulty || "Intermediate";
                            const diffStyle  = difficultyConfig[difficulty] || difficultyConfig["Intermediate"];

                            return (
                                <Link
                                    key={topic.slug}
                                    href={`/syllabus/${syllabusSlug}/${gradeSlug}/${subjectSlug}/${topic.slug}`}
                                    className="group flex items-center gap-5 bg-white rounded-2xl border border-gray-100 p-5 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(33,131,150,0.06)] transition-all duration-200"
                                >
                                    {/* Order Number */}
                                    <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary font-black text-base flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-200">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    {/* Topic Info */}
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <h3 className="font-extrabold text-dark text-sm group-hover:text-primary transition-colors truncate">
                                            {topic.name}
                                        </h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-1">
                                            {topic.description}
                                        </p>
                                    </div>

                                    {/* Meta badges */}
                                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${diffStyle.color} ${diffStyle.bg} ${diffStyle.border}`}>
                                            {difficulty}
                                        </span>
                                        {topic.estimatedHours && (
                                            <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                                                <Clock size={10} />
                                                {topic.estimatedHours}h
                                            </span>
                                        )}
                                    </div>

                                    {/* Chevron */}
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Featured Tutors for this Subject */}
                {matchedTutors.length > 0 && (
                    <section className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-dark">Tutors for {subject.name}</h2>
                            <Link
                                href="/tutors"
                                className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
                            >
                                View All Tutors <ArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {matchedTutors.map((tutor) => {
                                const isUni = tutor.tutorType.toLowerCase().includes("uni");
                                return (
                                    <Link
                                        key={tutor.slug}
                                        href={`/tutors/${tutor.id}`}
                                        className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:border-primary/20 hover:shadow-[0_10px_30px_rgba(33,131,150,0.06)] transition-all duration-200"
                                    >
                                        {tutor.image ? (
                                            <img
                                                src={tutor.image}
                                                alt={tutor.name}
                                                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-50"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                                                {tutor.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-extrabold text-sm text-dark group-hover:text-primary transition-colors truncate">
                                                {tutor.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 truncate">{tutor.university}</p>
                                            <span className={`inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${isUni ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                                                {tutor.tutorType}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}

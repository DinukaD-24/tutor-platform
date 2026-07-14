import { getSyllabus, getGrade, getSubject, getTopic } from "@/utils/getData";
import { tutors } from "@/data/tutors";
import { topics } from "@/data/topics";
import Breadcrumbs from "@/components/syllabus/Breadcrumbs";
import VideoList from "@/components/syllabus/VideoList";
import TutorCard from "@/components/tutor/TutorCard";
import Link from "next/link";
import {
    FileText, Users, Video, Download, Clock, Zap,
    CheckCircle, BookOpen, ArrowRight, AlertCircle, ChevronRight
} from "lucide-react";

const difficultyConfig = {
    "Beginner":     { color: "text-green-700",  bg: "bg-green-50",  border: "border-green-100",  dot: "bg-green-500"  },
    "Intermediate": { color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-100",  dot: "bg-amber-500"  },
    "Advanced":     { color: "text-red-700",    bg: "bg-red-50",    border: "border-red-100",    dot: "bg-red-500"    },
};

export default async function TopicPage({ params }) {
    const { syllabusSlug, gradeSlug, subjectSlug, topicSlug } = await params;

    const syllabus = getSyllabus(syllabusSlug);
    const grade    = getGrade(syllabusSlug, gradeSlug);
    const subject  = getSubject(syllabusSlug, gradeSlug, subjectSlug);
    const topic    = getTopic(syllabusSlug, gradeSlug, subjectSlug, topicSlug);

    if (!topic || !subject || !grade || !syllabus) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-24 text-center space-y-4">
                <h1 className="text-3xl font-black text-dark">Topic Not Found</h1>
                <p className="text-gray-500 text-sm">The topic you are looking for does not exist or has been removed.</p>
                <Link href="/syllabus" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition">
                    Back to Syllabuses
                </Link>
            </div>
        );
    }

    const recommendedTutors = tutors.filter((t) => topic.tutors?.includes(t.slug));
    const relatedTopicObjects = topics.filter((t) => topic.relatedTopics?.includes(t.slug));

    const videoCount    = topic.videos?.length    || 0;
    const materialCount = topic.materials?.length || 0;
    const tutorCount    = recommendedTutors.length;

    const difficulty = topic.difficulty || "Intermediate";
    const diffStyle  = difficultyConfig[difficulty] || difficultyConfig["Intermediate"];

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

                {/* Breadcrumbs */}
                <Breadcrumbs
                    syllabusName={syllabus.name}
                    syllabusSlug={syllabus.slug}
                    gradeName={grade.name}
                    gradeSlug={grade.slug}
                    subjectName={subject.name}
                    subjectSlug={subject.slug}
                    topicName={topic.name}
                />

                {/* ── Topic Hero ── */}
                <div className="bg-gradient-to-br from-primary/8 to-indigo-50 border border-primary/10 rounded-3xl p-8 md:p-10 space-y-6">
                    
                    {/* Context breadcrumb line */}
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {syllabus.name} &bull; {grade.name} &bull; {subject.name}
                    </p>

                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            {topic.name}
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                            {topic.description}
                        </p>
                    </div>

                    {/* Meta badges row */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {/* Difficulty */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${diffStyle.color} ${diffStyle.bg} ${diffStyle.border}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${diffStyle.dot}`} />
                            {difficulty}
                        </span>

                        {/* Estimated hours */}
                        {topic.estimatedHours && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-200 bg-white text-gray-600">
                                <Clock size={12} className="text-primary/70" />
                                {topic.estimatedHours} hrs estimated
                            </span>
                        )}

                        {/* Topic order */}
                        {topic.order && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-200 bg-white text-gray-600">
                                <BookOpen size={12} className="text-primary/70" />
                                Topic {topic.order} of {subject.topics.length}
                            </span>
                        )}
                    </div>

                    {/* Quick stats row */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/60 max-w-sm">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white rounded-xl shadow-sm text-primary shrink-0">
                                <Video size={16} />
                            </div>
                            <div>
                                <p className="text-lg font-black text-gray-900 leading-none">{videoCount}</p>
                                <p className="text-[10px] text-gray-500 font-semibold">Videos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600 shrink-0">
                                <FileText size={16} />
                            </div>
                            <div>
                                <p className="text-lg font-black text-gray-900 leading-none">{materialCount}</p>
                                <p className="text-[10px] text-gray-500 font-semibold">Notes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-white rounded-xl shadow-sm text-emerald-600 shrink-0">
                                <Users size={16} />
                            </div>
                            <div>
                                <p className="text-lg font-black text-gray-900 leading-none">{tutorCount}</p>
                                <p className="text-[10px] text-gray-500 font-semibold">Tutors</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Two-column info cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Prerequisites */}
                    {topic.prerequisites?.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.015)] space-y-4">
                            <h2 className="font-extrabold text-dark flex items-center gap-2 text-base">
                                <AlertCircle size={18} className="text-amber-500" />
                                Prerequisites
                            </h2>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Make sure you are comfortable with these topics before starting.
                            </p>
                            <ul className="space-y-2">
                                {topic.prerequisites.map((pre) => (
                                    <li key={pre} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                                        {pre}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Learning Outcomes */}
                    {topic.learningOutcomes?.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.015)] space-y-4">
                            <h2 className="font-extrabold text-dark flex items-center gap-2 text-base">
                                <Zap size={18} className="text-primary" />
                                Learning Outcomes
                            </h2>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                By the end of this topic you will be able to:
                            </p>
                            <ul className="space-y-2.5">
                                {topic.learningOutcomes.map((outcome) => (
                                    <li key={outcome} className="flex items-start gap-2.5 text-sm text-gray-600">
                                        <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                                        <span>{outcome}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* ── Video Lessons ── */}
                <section className="space-y-5">
                    <h2 className="text-2xl font-extrabold text-gray-900">Video Lessons</h2>
                    {videoCount > 0 ? (
                        <VideoList videos={topic.videos} tutors={tutors} />
                    ) : (
                        <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 bg-gray-50/50 space-y-2">
                            <Video size={32} className="mx-auto opacity-30" />
                            <p className="font-semibold text-sm">No videos yet</p>
                            <p className="text-xs">Check back soon for new lessons.</p>
                        </div>
                    )}
                </section>

                {/* ── Study Materials ── */}
                <section className="space-y-5">
                    <h2 className="text-2xl font-extrabold text-gray-900">Study Materials</h2>
                    {materialCount > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {topic.materials.map((material) => (
                                <div
                                    key={material.title}
                                    className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.015)] hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(33,131,150,0.06)] transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0">
                                            PDF
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{material.title}</h3>
                                            <p className="text-xs text-gray-400 mt-0.5">Free Download</p>
                                        </div>
                                    </div>
                                    <a
                                        href={material.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="p-2.5 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition-all text-gray-500 border border-gray-100 hover:border-primary"
                                    >
                                        <Download size={18} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 bg-gray-50/50 space-y-2">
                            <FileText size={32} className="mx-auto opacity-30" />
                            <p className="font-semibold text-sm">No materials uploaded</p>
                            <p className="text-xs">Study materials will appear here when available.</p>
                        </div>
                    )}
                </section>

                {/* ── Recommended Tutors ── */}
                <section className="space-y-5">
                    <h2 className="text-2xl font-extrabold text-gray-900">Recommended Tutors</h2>
                    {tutorCount > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {recommendedTutors.map((tutor) => (
                                <TutorCard key={tutor.slug} tutor={tutor} />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 bg-gray-50/50 space-y-2">
                            <Users size={32} className="mx-auto opacity-30" />
                            <p className="font-semibold text-sm">No tutors assigned yet</p>
                            <p className="text-xs">Tutors will be linked to this topic soon.</p>
                        </div>
                    )}
                </section>

                {/* ── Related Topics ── */}
                {relatedTopicObjects.length > 0 && (
                    <section className="space-y-5">
                        <h2 className="text-2xl font-extrabold text-gray-900">Related Topics</h2>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {relatedTopicObjects.map((related) => {
                                const relDiff   = related.difficulty || "Intermediate";
                                const relStyle  = difficultyConfig[relDiff] || difficultyConfig["Intermediate"];
                                return (
                                    <Link
                                        key={related.slug}
                                        href={`/syllabus/${related.syllabusSlug}/${related.gradeSlug}/${related.subjectSlug}/${related.slug}`}
                                        className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(33,131,150,0.07)] transition-all duration-200 flex flex-col justify-between gap-4"
                                    >
                                        <div className="space-y-1.5">
                                            <h3 className="font-extrabold text-sm text-dark group-hover:text-primary transition-colors">
                                                {related.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                                {related.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${relStyle.color} ${relStyle.bg} ${relStyle.border}`}>
                                                {relDiff}
                                            </span>
                                            <ChevronRight size={14} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                        </div>
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

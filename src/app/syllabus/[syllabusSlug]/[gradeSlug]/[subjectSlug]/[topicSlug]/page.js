import { getSyllabus, getGrade, getSubject, getTopic } from "@/utils/getData";
import { tutors } from "@/data/tutors";
import Breadcrumbs from "@/components/syllabus/Breadcrumbs";
import VideoList from "@/components/syllabus/VideoList";
import TutorCard from "@/components/tutor/TutorCard";
import { FileText, Users, Video, Download } from "lucide-react";

export default async function TopicPage( {params} ) {

    const { syllabusSlug, gradeSlug, subjectSlug, topicSlug} = await params;

    const syllabus = getSyllabus(syllabusSlug);
    const grade = getGrade(syllabusSlug, gradeSlug);
    const subject = getSubject(syllabusSlug, gradeSlug, subjectSlug);    

    //validates all 4 url slugs
    const topic = getTopic(syllabusSlug, gradeSlug, subjectSlug, topicSlug);

    if(!topic || !subject || !grade || !syllabus ) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold text-gray-800">Topic not found</h1>
                <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
            </div>
        );
    }

    const recommendedTutors = tutors.filter(
        (tutor) => 
        topic.tutors.includes(tutor.slug)
    );
    const videoCount = topic.videos?.length || 0;
    const materialCount = topic.materials?.length || 0;
    const tutorCount = recommendedTutors.length;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

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

            {/* Topic Hero */}
            <div className="bg-gradient-to-br from-primary/10 to-indigo-50 border border-primary/10 rounded-3xl p-8 md:p-10">
                <div className="space-y-4 max-w-2xl">

                    {/* Context line: Local A/L • Grade 12 • Combined Maths */}
                    <p className="text-sm text-gray-500 font-medium tracking-wide">
                        {syllabus.name} &bull; {grade.name} &bull; {subject.name}
                    </p>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        {topic.name}
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {topic.description}
                    </p>
                </div>

                {/* Stats — 1 col on mobile, 3 cols on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200/50 max-w-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm text-primary">
                            <Video size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{videoCount}</p>
                            <p className="text-xs text-gray-500">Videos</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-600">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{materialCount}</p>
                            <p className="text-xs text-gray-500">Notes</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm text-emerald-600">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{tutorCount}</p>
                            <p className="text-xs text-gray-500">Tutors</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Lessons */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Video Lessons</h2>
                {videoCount > 0 ? (
                    // tutors passed as prop — VideoList does not import data itself
                    <VideoList videos={topic.videos} tutors={tutors} />
                ) : (
                    <div className="border rounded-2xl p-10 text-center text-gray-400 bg-gray-50">
                        <Video size={32} className="mx-auto mb-3 opacity-40" />
                        <p className="font-medium">No videos yet</p>
                        <p className="text-sm mt-1">Check back soon for new lessons.</p>
                    </div>
                )}
            </section>

            {/* Study Materials */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Study Materials
                </h2>

                {materialCount > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {topic.materials.map((material) => (
                            <div 
                                key={material.title}
                                className="bg-white border rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-sm font-bold">
                                        PDF
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{material.title}</h3>
                                        <p className="text-xs text-gray-500">Free PDF Download</p>
                                    </div>
                                </div>
                                <a
                                    href={material.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="p-2.5 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition text-gray-600"
                                >
                                    <Download size={20} />
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-2xl p-10 text-center text-gray-400 bg-gray-50">
                        <FileText size={32} className="mx-auto mb-3 opacity-40" />
                        <p className="font-medium">No materials uploaded</p>
                        <p className="text-sm mt-1">Study materials will appear here when available.</p>
                    </div>
                )}
            </section>

            {/* Recommended Tutors */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Recommended Tutors
                </h2>

                {tutorCount > 0? (
                    <div className="grid gap-6 md:grid-cols-2">
                        {recommendedTutors.map((tutor) => (
                            <TutorCard key={tutor.slug} tutor={tutor} />
                        ))}
                    </div>
                ) : (
                    <div className="border rounded-2xl p-10 text-center text-gray-400 bg-gray-50">
                        <Users size={32} className="mx-auto mb-3 opacity-40" />
                        <p className="font-medium">No tutors available</p>
                        <p className="text-sm mt-1">Tutors will be assigned to this topic soon.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
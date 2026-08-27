import { getTutorById } from "@/utils/getData";
import Link from "next/link";
import FollowButton from "@/components/tutor/FollowButton";
import AddReviewModal from "@/components/tutor/AddReviewModal";
import ContactTutorButton from "@/components/tutor/ContactTutorButton";
import {
    ChevronRight, BookOpen, Star, Users, GraduationCap,
    CheckCircle, Mail, Phone, MapPin, Globe, Clock,
    ShieldCheck, Play, BarChart2, Languages, Target,
    MessageSquare, X, User
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TutorProfilePage({ params }) {
    const { tutorId } = await params;
    const tutor = await getTutorById(tutorId);

    if (!tutor) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-4">
                <h1 className="text-3xl font-black text-dark">Tutor Profile Not Found</h1>
                <p className="text-gray-500 text-sm">The tutor profile you are looking for does not exist or has been removed.</p>
                <Link href="/tutors" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold transition">
                    Back to Tutor Directory
                </Link>
            </div>
        );
    }

    const renderStars = (rating, size = 14) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} size={size} className="fill-amber-400 text-amber-400 shrink-0" />);
            } else if (i === fullStars + 1 && hasHalf) {
                stars.push(
                    <div key={i} className="relative shrink-0">
                        <Star size={size} className="text-gray-300" />
                        <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                            <Star size={size} className="fill-amber-400 text-amber-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} size={size} className="text-gray-300 shrink-0" />);
            }
        }
        return stars;
    };

    return (
        <main className="min-h-screen bg-[#f4f9f8] text-dark pb-16 pt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 mb-5 tracking-wide uppercase">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={11} />
                    <Link href="/tutors" className="hover:text-primary transition-colors">Tutors</Link>
                    <ChevronRight size={11} />
                    <span className="text-gray-600 font-bold uppercase">{tutor.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* ══════════════════════════════════════════
                        LEFT COLUMN
                    ══════════════════════════════════════════ */}
                    <div className="lg:col-span-8 space-y-5">

                        {/* ── HERO BANNER ── */}
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#063d34] via-[#074a3f] to-[#032924] min-h-[240px] sm:min-h-[280px] shadow-xl border border-teal-900/30">
                            {/* Ambient glow */}
                            <div className="absolute top-0 right-0 w-72 h-72 bg-[#14e1be]/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-800/20 rounded-full blur-3xl pointer-events-none" />

                            {/* Dot pattern overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(20,225,190,0.07)_1px,transparent_1px)] [background-size:18px_18px] opacity-60 pointer-events-none" />

                            {/* X icon top-left */}
                            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center z-10">
                                <X size={13} className="text-white/60" />
                            </div>

                            {/* Tutor Photo */}
                            <div className="absolute bottom-0 left-0 w-40 sm:w-52 h-full flex items-end">
                                {tutor.image ? (
                                    <img
                                        src={tutor.image}
                                        alt={tutor.name}
                                        className="w-full h-full object-cover object-top"
                                        style={{ maskImage: "linear-gradient(to right, black 80%, transparent 100%)" }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-t from-teal-800 to-teal-700 flex items-center justify-center">
                                        <span className="text-white font-black text-6xl opacity-40">{tutor.name?.charAt(0)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Text overlay — right side */}
                            <div className="relative z-10 ml-36 sm:ml-48 p-5 sm:p-7 flex flex-col justify-center min-h-[240px] sm:min-h-[280px]">
                                {/* Name + Verified */}
                                <div className="flex flex-wrap items-start gap-2 mb-2">
                                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                                        {tutor.name}
                                    </h1>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-[#2eedc4] border border-[#2eedc4]/40 bg-[#2eedc4]/10 shrink-0 mt-1">
                                        <ShieldCheck size={10} />
                                        Verified Profile
                                    </span>
                                </div>

                                {/* University + Subject */}
                                <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-teal-200/80 font-semibold mb-3">
                                    <span className="flex items-center gap-1">
                                        <GraduationCap size={13} className="text-[#2eedc4]/70" />
                                        {tutor.university || "Qualified Educator"}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-teal-600 hidden sm:inline-block" />
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={13} className="text-[#2eedc4]/70" />
                                        Specialist in {tutor.subject}
                                    </span>
                                </div>

                                {/* Rating + Experience */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold text-white">
                                        <div className="flex items-center gap-0.5">{renderStars(tutor.rating || 5, 12)}</div>
                                        <span>{tutor.rating || 5.0}</span>
                                        <span className="text-white/50 font-normal">({tutor.reviewsCount || 0} reviews)</span>
                                    </div>
                                    {tutor.experience && (
                                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-bold text-white">
                                            {tutor.experience} Teaching Experience
                                        </div>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-5 text-xs text-teal-200/70 border-t border-white/10 pt-3">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={13} className="text-[#2eedc4]/60" />
                                        <span><strong className="text-white font-extrabold">{tutor.studentsCount || 0}</strong> Active Students</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={13} className="text-[#2eedc4]/60" />
                                        <span><strong className="text-white font-extrabold">{tutor.lessonsCount || 0}</strong> Total Lessons Conducted</span>
                                    </div>
                                </div>

                                {/* VERIFIED badge bottom-left absolute */}
                                <div className="absolute bottom-4 left-5 flex items-center gap-1 bg-white/10 border border-[#2eedc4]/30 backdrop-blur-sm rounded-xl px-2.5 py-1">
                                    <ShieldCheck size={11} className="text-[#2eedc4]" />
                                    <span className="text-[9px] font-black uppercase tracking-wide text-[#2eedc4]">Verified Profile</span>
                                </div>
                            </div>
                        </div>

                        {/* ── ABOUT THE EDUCATOR ── */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4 relative overflow-hidden">
                            {/* Watermark quote */}
                            <div className="absolute top-3 right-5 text-7xl font-black text-[#0d8a6e]/8 select-none pointer-events-none leading-none">&ldquo;</div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#e6f7f2] border border-[#b2e8d4] flex items-center justify-center shrink-0">
                                    <User size={18} className="text-[#0d8a6e]" />
                                </div>
                                <h2 className="text-lg font-extrabold text-dark tracking-tight">About the Educator</h2>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{tutor.bio}</p>

                            {tutor.teachingStyle && (
                                <div className="bg-[#f0fdf9] border border-[#c2edd9] rounded-2xl p-4 flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-[#d4f5ea] border border-[#b2e8d4] flex items-center justify-center shrink-0 mt-0.5">
                                        <Target size={15} className="text-[#0d8a6e]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-extrabold text-[#0d8a6e] mb-1">Teaching Methodology</p>
                                        <p className="text-xs text-gray-500 leading-relaxed italic">{tutor.teachingStyle}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── EXPERTISE & TOPICS ── */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#e6f7f2] border border-[#b2e8d4] flex items-center justify-center shrink-0">
                                    <GraduationCap size={18} className="text-[#0d8a6e]" />
                                </div>
                                <h2 className="text-lg font-extrabold text-dark tracking-tight">Expertise &amp; Topics</h2>
                            </div>

                            {/* Topics label + subject pill */}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Core Topics Covered</span>
                                {tutor.subject && (
                                    <span className="text-xs font-extrabold text-[#0d8a6e]">{tutor.subject}</span>
                                )}
                            </div>

                            {/* Specializations tags */}
                            {tutor.specializations?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tutor.specializations.map((spec) => (
                                        <span key={spec} className="text-xs font-bold text-[#0d8a6e] bg-[#e6f7f2] px-3 py-1.5 rounded-xl border border-[#c2edd9]">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* 3-column icon tiles */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                                <div className="bg-[#f4f9f8] rounded-2xl border border-gray-100/80 p-4 space-y-2">
                                    <div className="w-8 h-8 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center">
                                        <BookOpen size={15} className="text-[#0d8a6e]" />
                                    </div>
                                    <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Target Syllabus</p>
                                    <p className="text-sm font-extrabold text-dark leading-snug">
                                        {tutor.syllabuses?.length ? tutor.syllabuses.join(", ") : "Not specified"}
                                    </p>
                                </div>
                                <div className="bg-[#f4f9f8] rounded-2xl border border-gray-100/80 p-4 space-y-2">
                                    <div className="w-8 h-8 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center">
                                        <BarChart2 size={15} className="text-[#0d8a6e]" />
                                    </div>
                                    <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Target Grades / Levels</p>
                                    <p className="text-sm font-extrabold text-dark leading-snug">
                                        {tutor.grades?.length ? tutor.grades.join(", ") : "Not specified"}
                                    </p>
                                </div>
                                <div className="bg-[#f4f9f8] rounded-2xl border border-gray-100/80 p-4 space-y-2">
                                    <div className="w-8 h-8 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center">
                                        <Languages size={15} className="text-[#0d8a6e]" />
                                    </div>
                                    <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Medium of Instruction</p>
                                    <p className="text-sm font-extrabold text-dark leading-snug">
                                        {tutor.languages?.length ? tutor.languages.join(", ") : "Not specified"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── ACADEMIC QUALIFICATIONS ── */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#e6f7f2] border border-[#b2e8d4] flex items-center justify-center shrink-0">
                                    <GraduationCap size={18} className="text-[#0d8a6e]" />
                                </div>
                                <h2 className="text-lg font-extrabold text-dark tracking-tight">Academic Qualifications</h2>
                            </div>

                            {tutor.qualifications?.length > 0 ? (
                                <div className="space-y-3">
                                    {tutor.qualifications.map((qual, i) => (
                                        <div key={i} className="flex gap-3 items-start p-3 rounded-2xl bg-[#f4f9f8] border border-gray-100/80">
                                            <CheckCircle size={16} className="text-[#0d8a6e] shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm leading-relaxed">{qual}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                                    <div className="w-16 h-16 rounded-full bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center">
                                        <GraduationCap size={30} className="text-[#0d8a6e]/50" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-semibold">No qualifications listed yet.</p>
                                </div>
                            )}
                        </div>

                        {/* ── STUDENT REVIEWS ── */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                                        <Star size={18} className="fill-amber-400 text-amber-400" />
                                    </div>
                                    <h2 className="text-lg font-extrabold text-dark tracking-tight">
                                        Student Reviews ({tutor.reviewsCount || 0})
                                    </h2>
                                </div>
                                <AddReviewModal tutorId={tutor.id} tutorName={tutor.name} />
                            </div>

                            {tutor.reviews?.length > 0 ? (
                                <div className="space-y-4 divide-y divide-gray-100">
                                    {tutor.reviews.map((rev) => (
                                        <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <strong className="block text-sm text-dark font-extrabold">{rev.student}</strong>
                                                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700">
                                                    <Star size={11} className="fill-amber-400 text-amber-400" />
                                                    {rev.rating?.toFixed(1)}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 text-sm italic">&ldquo;{rev.comment}&rdquo;</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                                    <div className="w-14 h-14 rounded-full bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center">
                                        <MessageSquare size={24} className="text-[#0d8a6e]/50" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-semibold">No reviews yet. Be the first to review!</p>
                                </div>
                            )}
                        </div>

                        {/* ── VIDEO LESSONS ── */}
                        {tutor.videos?.length > 0 && (
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#e6f7f2] border border-[#b2e8d4] flex items-center justify-center shrink-0">
                                        <Play size={17} className="fill-[#0d8a6e] text-[#0d8a6e] ml-0.5" />
                                    </div>
                                    <h2 className="text-lg font-extrabold text-dark tracking-tight">
                                        Video Lessons ({tutor.videos.length})
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {tutor.videos.map((video) => (
                                        <Link
                                            key={video.id}
                                            href={`/watch/${video.id}`}
                                            className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0d8a6e]/30 hover:shadow-md transition-all duration-200 bg-white"
                                        >
                                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <div className="w-10 h-10 bg-[#0d8a6e] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                        <Play fill="white" size={16} className="ml-0.5 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <p className="font-bold text-sm text-dark line-clamp-2">{video.title}</p>
                                                {video.topic && (
                                                    <p className="text-[10px] text-[#0d8a6e] mt-0.5 font-semibold">
                                                        {video.topic.subject?.name}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* ══════════════════════════════════════════
                        RIGHT SIDEBAR
                    ══════════════════════════════════════════ */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                        
                        {/* ── VIDEO LESSON HIGHLIGHT ── */}
                        {(() => {
                            const hasVideo = tutor.videos && tutor.videos.length > 0;
                            const featuredVideo = hasVideo ? tutor.videos[0] : null;
                            
                            return (
                                <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-black text-sm text-dark tracking-tight flex items-center gap-1.5">
                                            <span className="text-[#0d8a6e]">{tutor.subject || "Video"}</span> Lesson Highlight
                                        </h4>
                                        <span className="px-2 py-0.5 bg-[#e6f7f2] text-[#0d8a6e] text-[9px] font-black rounded-full border border-[#c2edd9] uppercase tracking-wider">
                                            {hasVideo ? "FEATURED" : "LESSONS"}
                                        </span>
                                    </div>
                                    
                                    {hasVideo ? (
                                        <>
                                            <div className="p-1 bg-[#f4f9f8] rounded-2xl border-2 border-[#b2e8d4] shadow-xs overflow-hidden">
                                                <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
                                                        title={featuredVideo.title || "Lesson Highlight"}
                                                        className="w-full h-full border-0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="pt-1 flex items-center justify-between">
                                                <p className="font-extrabold text-xs text-dark truncate flex-1 pr-2">{featuredVideo.title}</p>
                                                <Link
                                                    href={`/watch/${featuredVideo.id}`}
                                                    className="text-[10px] font-extrabold text-[#0d8a6e] hover:underline shrink-0"
                                                >
                                                    Watch Full →
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 bg-[#f4f9f8] rounded-2xl border border-dashed border-[#b2e8d4] text-center space-y-2 my-1">
                                            <div className="w-10 h-10 rounded-full bg-[#e6f7f2] text-[#0d8a6e] flex items-center justify-center mx-auto border border-[#c2edd9]">
                                                <Play size={18} className="fill-[#0d8a6e] ml-0.5 text-[#0d8a6e]" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-extrabold text-xs text-dark">No Sample Lessons Uploaded Yet</p>
                                                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                                    This tutor hasn&apos;t uploaded video lessons yet. You can contact them directly or follow their profile for updates!
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]">

                            {/* Class Format */}
                            <div className="p-5 border-b border-gray-50">
                                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Class Format</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between px-3 py-2.5 bg-[#f4f9f8] rounded-2xl border border-gray-100/80">
                                        <span className="text-sm text-gray-700 font-semibold flex items-center gap-2">
                                            <Globe size={15} className="text-[#0d8a6e]" />
                                            Online Classes
                                        </span>
                                        <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${tutor.availability?.online ? "text-[#0d8a6e] bg-[#e6f7f2] border border-[#c2edd9]" : "text-gray-400 bg-gray-100"}`}>
                                            {tutor.availability?.online ? "Yes" : "No"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2.5 bg-[#f4f9f8] rounded-2xl border border-gray-100/80">
                                        <span className="text-sm text-gray-700 font-semibold flex items-center gap-2">
                                            <MapPin size={15} className="text-[#0d8a6e]" />
                                            Physical Classes
                                        </span>
                                        <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${tutor.availability?.physical ? "text-[#0d8a6e] bg-[#e6f7f2] border border-[#c2edd9]" : "text-gray-400 bg-gray-100"}`}>
                                            {tutor.availability?.physical ? "Yes" : "No"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Channels */}
                            <div className="p-5 border-b border-gray-50 space-y-3">
                                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Contact Channels</p>
                                {tutor.email && (
                                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                        <div className="w-7 h-7 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center shrink-0">
                                            <Mail size={13} className="text-[#0d8a6e]" />
                                        </div>
                                        <span className="truncate text-xs font-medium">{tutor.email}</span>
                                    </div>
                                )}
                                {tutor.phone && (
                                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                        <div className="w-7 h-7 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center shrink-0">
                                            <Phone size={13} className="text-[#0d8a6e]" />
                                        </div>
                                        <span className="text-xs font-medium">{tutor.phone}</span>
                                    </div>
                                )}
                                {tutor.location && (
                                    <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                        <div className="w-7 h-7 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center shrink-0">
                                            <MapPin size={13} className="text-[#0d8a6e]" />
                                        </div>
                                        <span className="text-xs font-medium">{tutor.location}</span>
                                    </div>
                                )}
                            </div>

                            {/* CTA Buttons */}
                            <div className="p-5 space-y-3 relative overflow-hidden">
                                {/* Wave decoration */}
                                <div className="absolute bottom-0 right-0 w-32 h-16 opacity-10 pointer-events-none">
                                    <svg viewBox="0 0 128 64" className="w-full h-full text-[#0d8a6e] fill-current">
                                        <path d="M0,32 C32,0 96,64 128,32 L128,64 L0,64 Z" />
                                    </svg>
                                </div>

                                <FollowButton tutorId={tutor.id} />
                                <ContactTutorButton
                                    tutor={{ id: tutor.id, name: tutor.name, email: tutor.email }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

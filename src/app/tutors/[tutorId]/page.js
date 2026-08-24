import { getTutorById } from "@/utils/getData";
import Link from "next/link";
import FollowButton from "@/components/tutor/FollowButton";
import AddReviewModal from "@/components/tutor/AddReviewModal";
import ContactTutorButton from "@/components/tutor/ContactTutorButton";
import { 
    ChevronRight, BookOpen, Award, Star, Users, GraduationCap, 
    CheckCircle, MessageSquare, Mail, Phone, MapPin, Globe, Clock, ShieldCheck, Play
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

    const isUni = tutor.tutorType.toLowerCase().includes("uni");

    // Helper to render rating stars
    const renderStars = (rating, size = 16) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} size={size} className="fill-amber-400 text-amber-400 shrink-0" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative shrink-0">
                        <Star size={size} className="text-gray-200" />
                        <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                            <Star size={size} className="fill-amber-400 text-amber-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} size={size} className="text-gray-200 shrink-0" />);
            }
        }
        return stars;
    };

    return (
        <main className="min-h-screen bg-background text-dark py-24">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-10 tracking-wide uppercase">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/tutors" className="hover:text-primary transition-colors">Tutors</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-600 font-bold">{tutor.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: Main Profile Info */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Profile Header Details Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                                {/* Photo aspect-ratio 3:4 portrait */}
                                <div className="w-40 aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 shadow-md shrink-0 relative">
                                    {tutor.image ? (
                                        <img 
                                            src={tutor.image} 
                                            alt={tutor.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-extrabold text-4xl">
                                            {tutor.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                            <h1 className="text-3xl font-black text-dark tracking-tight">{tutor.name}</h1>
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 border border-green-100">
                                                <ShieldCheck size={12} />
                                                Verified Profile
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-sm text-gray-500 font-semibold">
                                            <span className="flex items-center gap-1">
                                                <GraduationCap size={16} className="text-primary/70" />
                                                {tutor.university}
                                            </span>
                                            <span className="h-1.5 w-1.5 rounded-full bg-gray-300 hidden sm:inline" />
                                            <span className="flex items-center gap-1">
                                                <BookOpen size={16} className="text-primary/70" />
                                                Specialist in {tutor.subject}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100">
                                            <div className="flex items-center">{renderStars(tutor.rating, 14)}</div>
                                            <span>{tutor.rating}</span>
                                            <span className="text-gray-400 font-normal">({tutor.reviewsCount} reviews)</span>
                                        </div>
                                        <div className="text-xs font-semibold text-gray-500 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100">
                                            <strong>{tutor.experience}</strong> Teaching Experience
                                        </div>
                                    </div>

                                    {/* primary mini badges */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-gray-500 border-t border-gray-50 pt-4">
                                        <div className="flex items-center gap-1">
                                            <Users size={14} className="text-gray-400" />
                                            <span><strong>{tutor.studentsCount}</strong> Active Students</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} className="text-gray-400" />
                                            <span><strong>{tutor.lessonsCount}</strong> Total Lessons Conducted</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About/Bio Section */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                            <h2 className="text-xl font-extrabold text-dark border-b border-gray-50 pb-3">About the Educator</h2>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{tutor.bio}</p>
                            
                            <div className="pt-2">
                                <h3 className="font-bold text-dark text-sm mb-2">Teaching Methodology</h3>
                                <p className="text-gray-500 text-xs leading-relaxed italic">{tutor.teachingStyle}</p>
                            </div>
                        </div>

                        {/* Expertise & Topics */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                            <h2 className="text-xl font-extrabold text-dark border-b border-gray-50 pb-3">Expertise & Topics</h2>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Core Topics Covered</span>
                                    <div className="flex flex-wrap gap-2">
                                        {tutor.specializations.map((spec) => (
                                            <span key={spec} className="text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target Syllabus</span>
                                        <span className="block text-sm font-bold text-dark mt-1">
                                            {tutor.syllabuses?.length ? tutor.syllabuses.join(", ") : "Not specified"}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target Grades / Levels</span>
                                        <span className="block text-sm font-bold text-dark mt-1">
                                            {tutor.grades?.length ? tutor.grades.join(", ") : "Not specified"}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Medium of Instruction</span>
                                        <span className="block text-sm font-bold text-dark mt-1">
                                            {tutor.languages?.length ? tutor.languages.join(", ") : "Not specified"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Qualifications */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                            <h2 className="text-xl font-extrabold text-dark border-b border-gray-50 pb-3">Academic Qualifications</h2>
                            <div className="space-y-3.5">
                                {tutor.qualifications.map((qual, index) => (
                                    <div key={index} className="flex gap-3 items-start">
                                        <CheckCircle className="text-primary shrink-0 mt-0.5" size={16} />
                                        <span className="text-gray-600 text-sm">{qual}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews / Testimonials */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                                <h2 className="text-xl font-extrabold text-dark flex items-center gap-2">
                                    <MessageSquare size={20} className="text-primary" />
                                    Student Reviews ({tutor.reviewsCount})
                                </h2>
                                <AddReviewModal tutorId={tutor.id} tutorName={tutor.name} />
                            </div>
                            
                            <div className="space-y-4 divide-y divide-gray-100">
                                {tutor.reviews.map((rev) => (
                                    <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <strong className="block text-sm text-dark font-extrabold">{rev.student}</strong>
                                                <span className="text-[10px] text-gray-400">{rev.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-amber-50/50 border border-amber-100 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-700">
                                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                                {rev.rating.toFixed(1)}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm italic">&ldquo;{rev.comment}&rdquo;</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Videos Section */}
                        {tutor.videos && tutor.videos.length > 0 && (
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                <h2 className="text-xl font-extrabold text-dark border-b border-gray-50 pb-3 flex items-center gap-2">
                                    <Play size={20} className="text-primary" />
                                    Video Lessons ({tutor.videos.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {tutor.videos.map((video) => (
                                        <Link
                                        key={video.id}
                                        href={`/watch/${video.id}`}
                                        className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-200 bg-white"
                                        >
                                        <div className="aspect-video relative overflow-hidden bg-gray-100">
                                            <img
                                            src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <Play fill="white" size={18} className="ml-0.5 text-white" />
                                            </div>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="font-bold text-sm text-dark line-clamp-2">{video.title}</p>
                                            {video.topic && (
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                {video.topic.subject?.name} · {video.topic.name}
                                            </p>
                                            )}
                                        </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN: Booking Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                        
                        {/* Instant Booking Details */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.03)] space-y-6">
                            {/* Class Format Details */}

                            {/* Service Badges */}
                            <div className="space-y-2 pt-2 border-t border-gray-50">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Class Format</span>
                                <div className="flex items-center justify-between text-xs py-2 px-3 bg-gray-50/50 rounded-xl">
                                    <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                                        <Globe size={14} className="text-primary/70" /> Online Classes
                                    </span>
                                    <span className={`font-bold ${tutor.availability.online ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'} px-2 py-0.5 rounded`}>
                                        {tutor.availability.online ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-2 px-3 bg-gray-50/50 rounded-xl">
                                    <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                                        <MapPin size={14} className="text-primary/70" /> Physical Classes
                                    </span>
                                    <span className={`font-bold ${tutor.availability.physical ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'} px-2 py-0.5 rounded`}>
                                        {tutor.availability.physical ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </div>

                            {/* Direct Contacts details */}
                            <div className="space-y-3 pt-4 border-t border-gray-50 text-xs">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Contact Channels</span>
                                <div className="flex items-center gap-2.5 text-gray-500">
                                    <Mail size={14} className="text-primary shrink-0" />
                                    <span className="truncate">{tutor.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-gray-500">
                                    <Phone size={14} className="text-primary shrink-0" />
                                    <span>{tutor.phone}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-gray-500">
                                    <MapPin size={14} className="text-primary shrink-0" />
                                    <span>{tutor.location}</span>
                                </div>
                            </div>

                            {/* Follow Button for Students */}
                            <FollowButton tutorId={tutor.id} />

                            {/* Contact CTA */}
                            <ContactTutorButton
                                tutor={{
                                    id: tutor.id,
                                    name: tutor.name,
                                    email: tutor.email,
                                }}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}

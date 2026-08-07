"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    LayoutDashboard, BookOpen, Users, Star,
    Play, UserCheck, LogOut, GraduationCap
} from "lucide-react";

export default function StudentDashboardClient({ student }) {
    const supabase = createClient();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Overview");

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const navItems = [
        { label: "Overview",        icon: <LayoutDashboard size={18} /> },
        { label: "Watched Videos",  icon: <Play size={18} /> },
        { label: "Following",       icon: <Users size={18} /> },
        { label: "Sign Out",        icon: <LogOut size={18} />, onClick: handleSignOut, isDestructive: true },
    ];

    const stats = [
        {
            label: "Videos Watched",
            value: student.visitedVideos.length.toString(),
            change: "Video lessons viewed",
            icon: <Play size={20} />,
            color: "text-primary bg-primary/10",
        },
        {
            label: "Tutors Following",
            value: student.followedTutors.length.toString(),
            change: "Tutors you follow",
            icon: <UserCheck size={20} />,
            color: "text-purple-600 bg-purple-50",
        },
    ];

    return (
        <main className="min-h-screen bg-background text-dark pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-3">
                            <GraduationCap size={14} />
                            Student Portal
                        </span>
                        <h1 className="text-3xl font-black text-dark tracking-tight">
                            Welcome back, {student.name}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Track your learning journey and explore new tutors.
                        </p>
                    </div>
                    <Link
                        href="/syllabus"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-glow-primary transition-all"
                    >
                        <BookOpen size={16} />
                        Browse Lessons
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Sidebar Nav */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-1 lg:sticky lg:top-28">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={item.onClick ? item.onClick : () => setActiveTab(item.label)}
                                    className={`
                                        w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left cursor-pointer
                                        ${item.isDestructive
                                            ? "text-red-500 hover:bg-red-50"
                                            : activeTab === item.label
                                                ? "bg-primary/10 text-primary"
                                                : "text-gray-400 hover:bg-gray-50 hover:text-dark"
                                        }
                                    `}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">

                        {activeTab === "Overview" && (
                            <>
                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-5">
                                    {stats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(33,131,150,0.06)] transition-all duration-300"
                                        >
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${stat.color}`}>
                                                {stat.icon}
                                            </div>
                                            <div>
                                                <strong className="block text-2xl font-black text-dark">{stat.value}</strong>
                                                <span className="block text-xs font-bold text-gray-500 mt-0.5">{stat.label}</span>
                                                <span className="block text-[10px] text-gray-400 mt-0.5">{stat.change}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Videos */}
                                <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                        <h2 className="font-extrabold text-dark flex items-center gap-2">
                                            <Play size={18} className="text-primary" />
                                            Recently Watched
                                        </h2>
                                        {student.visitedVideos.length > 5 && (
                                            <button onClick={() => setActiveTab("Watched Videos")} className="text-xs font-bold text-primary hover:underline cursor-pointer">
                                                View all
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        {student.visitedVideos.length > 0 ? (
                                            student.visitedVideos.slice(0, 5).map((video) => (
                                                <div key={video.id} className="flex items-center gap-4 p-3 rounded-2xl border border-gray-50 hover:border-primary/10 hover:bg-gray-50/30 transition-all">
                                                    <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                                        <Play size={15} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-bold text-sm text-dark truncate">{video.title}</p>
                                                        <p className="text-[10px] text-gray-400">{video.tutorName}</p>
                                                    </div>
                                                    <Link
                                                        href={`/watch/${video.id}`}
                                                        className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg hover:bg-primary/10 transition-colors shrink-0"
                                                    >
                                                        Watch
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-sm space-y-2">
                                                <Play size={32} className="mx-auto opacity-20" />
                                                <p>No videos watched yet. <Link href="/syllabus" className="text-primary font-bold hover:underline">Browse lessons</Link> to get started.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Following Tutors */}
                                <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                        <h2 className="font-extrabold text-dark flex items-center gap-2">
                                            <Users size={18} className="text-primary" />
                                            Tutors You Follow
                                        </h2>
                                    </div>
                                    <div className="space-y-3">
                                        {student.followedTutors.length > 0 ? (
                                            student.followedTutors.map((tutor) => (
                                                <Link
                                                    key={tutor.id}
                                                    href={`/tutors/${tutor.id}`}
                                                    className="flex items-center gap-4 p-3 rounded-2xl border border-gray-50 hover:border-primary/10 hover:bg-gray-50/30 transition-all"
                                                >
                                                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-bold text-sm">
                                                        {tutor.image ? (
                                                            <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            tutor.name.charAt(0)
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-sm text-dark truncate">{tutor.name}</p>
                                                        <p className="text-[10px] text-gray-400">{tutor.subject}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 shrink-0">
                                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                                        {tutor.rating?.toFixed(1)}
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-sm space-y-2">
                                                <Users size={32} className="mx-auto opacity-20" />
                                                <p>Not following anyone yet. <Link href="/tutors" className="text-primary font-bold hover:underline">Browse tutors</Link> to follow.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "Watched Videos" && (
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                <h2 className="font-extrabold text-dark border-b border-gray-50 pb-4 flex items-center gap-2">
                                    <Play size={18} className="text-primary" />
                                    All Watched Videos ({student.visitedVideos.length})
                                </h2>
                                <div className="space-y-3">
                                    {student.visitedVideos.length > 0 ? (
                                        student.visitedVideos.map((video) => (
                                            <div key={video.id} className="flex items-center gap-4 p-3 rounded-2xl border border-gray-50 hover:border-primary/10 hover:bg-gray-50/30 transition-all">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                                    alt={video.title}
                                                    className="w-20 aspect-video object-cover rounded-xl shrink-0"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-bold text-sm text-dark line-clamp-2">{video.title}</p>
                                                    <p className="text-[10px] text-gray-400 mt-0.5">{video.tutorName} {video.topicName ? `· ${video.topicName}` : ""}</p>
                                                </div>
                                                <Link
                                                    href={`/watch/${video.id}`}
                                                    className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg hover:bg-primary/10 transition-colors shrink-0"
                                                >
                                                    Rewatch
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-gray-400 text-sm space-y-2">
                                            <Play size={32} className="mx-auto opacity-20" />
                                            <p>No videos watched yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "Following" && (
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                <h2 className="font-extrabold text-dark border-b border-gray-50 pb-4 flex items-center gap-2">
                                    <Users size={18} className="text-primary" />
                                    Tutors You Follow ({student.followedTutors.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {student.followedTutors.length > 0 ? (
                                        student.followedTutors.map((tutor) => (
                                            <Link
                                                key={tutor.id}
                                                href={`/tutors/${tutor.id}`}
                                                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all bg-gray-50/30"
                                            >
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-bold">
                                                    {tutor.image ? (
                                                        <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        tutor.name.charAt(0)
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm text-dark truncate">{tutor.name}</p>
                                                    <p className="text-[10px] text-gray-400">{tutor.subject}</p>
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 mt-1">
                                                        <Star size={10} className="fill-amber-400 text-amber-400" />
                                                        {tutor.rating?.toFixed(1)} ({tutor.reviewsCount} reviews)
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-center py-10 text-gray-400 text-sm space-y-2">
                                            <Users size={32} className="mx-auto opacity-20" />
                                            <p>Not following anyone yet. <Link href="/tutors" className="text-primary font-bold hover:underline">Browse tutors</Link>.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}
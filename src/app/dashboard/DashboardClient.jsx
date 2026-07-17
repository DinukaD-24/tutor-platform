"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    LayoutDashboard, BookOpen, Upload, FileText,
    BarChart2, Users, Star, Clock, TrendingUp,
    CheckCircle, AlertCircle, Plus, Settings, ArrowRight, LogOut
} from "lucide-react";

export default function DashboardClient({ tutor }) {
    const supabase = createClient();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Overview");

    // Upload lesson form states
    const [title, setTitle] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Combined Maths");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const handleUploadLesson = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        // Parse YouTube ID from URL
        let youtubeId = youtubeUrl.trim();
        try {
            const url = new URL(youtubeUrl.trim());
            youtubeId = url.searchParams.get("v") || url.pathname.replace("/", "").split("/").pop();
        } catch {
            // If not a valid URL, use as-is (raw ID fallback)
        }

        if (!youtubeId) {
            setError("Could not parse a valid YouTube video ID from the URL.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/lessons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    youtubeId,
                    description,
                    subject,
                    tutorId: tutor.id
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to upload lesson.");
            }

            setSuccess("Lesson uploaded successfully!");
            setTitle("");
            setYoutubeUrl("");
            setDescription("");
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate dynamic stats
    const stats = [
        { label: "Total Students",    value: tutor.studentsCount.toString(),  change: "Active students", icon: <Users size={20} />,     color: "text-primary bg-primary/10"    },
        { label: "Lessons Uploaded",  value: (tutor.videos?.length || 0).toString(),   change: "Published video tutorials",   icon: <BookOpen size={20} />,  color: "text-primary-dark bg-primary/10" },
        { label: "Average Rating",    value: tutor.rating.toFixed(1),  change: `${tutor.reviewsCount} reviews`,     icon: <Star size={20} />,      color: "text-amber-600 bg-amber-50"    },
        { label: "Lessons Conducted", value: tutor.lessonsCount.toString(), change: "In-person/Online hours",  icon: <TrendingUp size={20} />,color: "text-purple-600 bg-purple-50"  },
    ];

    const navItems = [
        { label: "Overview",          icon: <LayoutDashboard size={18} /> },
        { label: "Upload Lesson",     icon: <Upload size={18} /> },
        { label: "Sign Out",          icon: <LogOut size={18} />, onClick: handleSignOut, isDestructive: true },
    ];

    return (
        <main className="min-h-screen bg-background text-dark pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-3">
                            Tutor Portal
                        </span>
                        <h1 className="text-3xl font-black text-dark tracking-tight">Welcome back, {tutor.name}</h1>
                        <p className="text-gray-400 text-sm mt-1">Here is an overview of your teaching profile and student activity.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/tutors/${tutor.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary border border-gray-100 bg-white hover:border-primary/20 px-4 py-2.5 rounded-xl transition-all"
                        >
                            View Public Profile
                        </Link>
                        <button 
                            onClick={() => setActiveTab("Upload Lesson")}
                            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-glow-primary transition-all"
                        >
                            <Plus size={16} />
                            Upload Lesson
                        </button>
                    </div>
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
                                        w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left
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
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(33,131,150,0.06)] transition-all duration-300">
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

                                {/* Recent Lessons */}
                                <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                        <h2 className="font-extrabold text-dark flex items-center gap-2">
                                            <BookOpen size={18} className="text-primary" />
                                            Uploaded Lessons
                                        </h2>
                                    </div>

                                    <div className="space-y-3">
                                        {tutor.videos && tutor.videos.length > 0 ? (
                                            tutor.videos.map((lesson) => (
                                                <div key={lesson.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-50 hover:border-primary/10 hover:bg-gray-50/30 transition-all duration-200">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                                            <BookOpen size={16} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="font-bold text-sm text-dark truncate">{lesson.title}</h3>
                                                            <span className="text-[10px] text-gray-400 font-semibold">YouTube ID: {lesson.youtubeId}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 shrink-0">
                                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg border text-green-700 bg-green-50 border-green-100">
                                                            Published
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-sm">
                                                No video lessons uploaded yet. Click "Upload Lesson" to start.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "Upload Lesson" && (
                            /* Upload Form */
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5 max-w-xl">
                                <h2 className="font-extrabold text-dark border-b border-gray-50 pb-3 flex items-center gap-2">
                                    <Upload size={18} className="text-primary" />
                                    Upload New Lesson
                                </h2>
                                
                                {error && (
                                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                                        {error}
                                    </p>
                                )}

                                {success && (
                                    <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                                        {success}
                                    </p>
                                )}

                                <form onSubmit={handleUploadLesson} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lesson Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            placeholder="e.g. Trigonometry — Part 3"
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">YouTube Video URL</label>
                                        <input
                                            type="url"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            required
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        />
                                        <p className="text-[10px] text-gray-400 pl-1">Paste any YouTube link — youtu.be, full URL, or short URL.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Description (optional)</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            placeholder="Brief description of what this lesson covers..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Subject</label>
                                        <select 
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        >
                                            <option>Combined Maths</option>
                                            <option>Physics</option>
                                            <option>ICT</option>
                                            <option>Biology</option>
                                        </select>
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all shadow-glow-primary disabled:opacity-50 cursor-pointer"
                                    >
                                        {loading ? "Uploading..." : "Publish Lesson"}
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}

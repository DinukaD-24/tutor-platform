import Link from "next/link";
import {
    LayoutDashboard, BookOpen, Upload, FileText,
    BarChart2, Users, Star, Clock, TrendingUp,
    CheckCircle, AlertCircle, Plus, Settings, ArrowRight
} from "lucide-react";

const stats = [
    { label: "Total Students",    value: "124",  change: "+12 this month", icon: <Users size={20} />,     color: "text-primary bg-primary/10"    },
    { label: "Lessons Conducted", value: "86",   change: "+5 this week",   icon: <BookOpen size={20} />,  color: "text-secondary bg-secondary/10" },
    { label: "Average Rating",    value: "4.9",  change: "18 reviews",     icon: <Star size={20} />,      color: "text-amber-600 bg-amber-50"    },
    { label: "Profile Views",     value: "1,240",change: "+80 this week",  icon: <TrendingUp size={20} />,color: "text-purple-600 bg-purple-50"  },
];

const recentLessons = [
    { id: 1, title: "Trigonometry — Introduction to Identities",   subject: "Combined Maths", date: "2026-07-10", status: "Published", views: 48  },
    { id: 2, title: "Complex Numbers — Argand Diagram",            subject: "Combined Maths", date: "2026-07-07", status: "Published", views: 31  },
    { id: 3, title: "Vectors — Dot Product and Cross Product",     subject: "Combined Maths", date: "2026-06-30", status: "Draft",     views: 0   },
    { id: 4, title: "Mechanics — Newton's Laws of Motion",         subject: "Physics",        date: "2026-06-25", status: "Published", views: 62  },
];

const materials = [
    { id: 1, title: "Trigonometry Theory Notes",       type: "PDF",  size: "2.1 MB", downloads: 134 },
    { id: 2, title: "Combined Maths Tutorial Sheet 1", type: "PDF",  size: "1.4 MB", downloads: 89  },
    { id: 3, title: "Past Paper 2024 Solutions",       type: "PDF",  size: "3.8 MB", downloads: 210 },
];

const navItems = [
    { label: "Overview",          icon: <LayoutDashboard size={18} />, active: true  },
    { label: "My Lessons",        icon: <BookOpen size={18} />,        active: false },
    { label: "Upload Lesson",     icon: <Upload size={18} />,          active: false },
    { label: "Study Materials",   icon: <FileText size={18} />,        active: false },
    { label: "Analytics",         icon: <BarChart2 size={18} />,       active: false },
    { label: "Settings",          icon: <Settings size={18} />,        active: false },
];

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-background text-dark pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-3">
                            Tutor Portal
                        </span>
                        <h1 className="text-3xl font-black text-dark tracking-tight">Welcome back, John</h1>
                        <p className="text-gray-400 text-sm mt-1">Here is an overview of your teaching activity this month.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/become-a-tutor"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary border border-gray-100 bg-white hover:border-primary/20 px-4 py-2.5 rounded-xl transition-all"
                        >
                            Edit Profile
                        </Link>
                        <button className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-glow-primary transition-all">
                            <Plus size={16} />
                            Upload Lesson
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Sidebar Nav */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-1 lg:sticky lg:top-28">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    className={`
                                        w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left
                                        ${item.active
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-400 hover:bg-gray-50 hover:text-dark"
                                        }
                                    `}
                                >
                                    {item.icon}
                                    <span className="hidden lg:block">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-10 space-y-8">

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
                                    Recent Lessons
                                </h2>
                                <button className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors">
                                    View All <ArrowRight size={12} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {recentLessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-50 hover:border-primary/10 hover:bg-gray-50/30 transition-all duration-200">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                                <BookOpen size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-sm text-dark truncate">{lesson.title}</h3>
                                                <span className="text-[10px] text-gray-400 font-semibold">{lesson.subject} · {lesson.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-[10px] text-gray-400 hidden sm:block">{lesson.views} views</span>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                                                lesson.status === "Published"
                                                    ? "text-green-700 bg-green-50 border-green-100"
                                                    : "text-amber-700 bg-amber-50 border-amber-100"
                                            }`}>
                                                {lesson.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Two column: Upload + Materials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Upload New Lesson */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                <h2 className="font-extrabold text-dark border-b border-gray-50 pb-3 flex items-center gap-2">
                                    <Upload size={18} className="text-primary" />
                                    Upload New Lesson
                                </h2>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lesson Title</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Trigonometry — Part 3"
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">YouTube Video ID</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. dQw4w9WgXcQ"
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Subject</label>
                                        <select className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all">
                                            <option>Combined Maths</option>
                                            <option>Physics</option>
                                            <option>ICT</option>
                                            <option>Biology</option>
                                        </select>
                                    </div>
                                    <button className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all shadow-glow-primary">
                                        Submit for Review
                                    </button>
                                    <p className="text-[10px] text-gray-400 text-center">
                                        Full upload system coming in Phase 4 with backend integration.
                                    </p>
                                </div>
                            </div>

                            {/* Study Materials */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                                    <h2 className="font-extrabold text-dark flex items-center gap-2">
                                        <FileText size={18} className="text-primary" />
                                        Study Materials
                                    </h2>
                                    <button className="text-[10px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                                        <Plus size={10} /> Add New
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {materials.map((mat) => (
                                        <div key={mat.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50/30 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center text-[9px] font-extrabold shrink-0">
                                                    {mat.type}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-xs text-dark leading-tight">{mat.title}</h3>
                                                    <span className="text-[10px] text-gray-400">{mat.size} · {mat.downloads} downloads</span>
                                                </div>
                                            </div>
                                            <CheckCircle size={14} className="text-green-400 shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Notice Banner */}
                        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
                            <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-amber-800 text-sm">Dashboard is in Static Preview Mode</h3>
                                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                                    This is a static UI prototype. Full functionality including real lesson uploads, student tracking, and analytics will be available in Phase 4 once backend integration (MongoDB + Cloudinary) is complete.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

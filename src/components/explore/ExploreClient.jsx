"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
    Plus, Search, SlidersHorizontal, RefreshCw, Mail,
    MapPin, Globe, Clock, CheckCircle2, AlertCircle,
    BookOpen, Sparkles, Send, ShieldCheck, X, UserCheck, User
} from "lucide-react";

export default function ExploreClient() {
    const supabase = createClient();

    // Data States
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isTutor, setIsTutor] = useState(false);
    const [tutorProfile, setTutorProfile] = useState(null);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSyllabus, setSelectedSyllabus] = useState("all");
    const [selectedMode, setSelectedMode] = useState("all");

    // Modal States
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [contactingReq, setContactingReq] = useState(null);

    // Form States for Create Request
    const [formSyllabus, setFormSyllabus] = useState("Local A/L");
    const [formGradeOrAge, setFormGradeOrAge] = useState("Grade 12");
    const [formSubject, setFormSubject] = useState("");
    const [formClassType, setFormClassType] = useState("Revision & Theory");
    const [formMode, setFormMode] = useState("Online & Physical");
    const [formLocation, setFormLocation] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [formStudentName, setFormStudentName] = useState("");
    const [formStudentEmail, setFormStudentEmail] = useState("");
    const [submittingReq, setSubmittingReq] = useState(false);
    const [createError, setCreateError] = useState("");

    // Contact Modal Form States
    const [contactMessage, setContactMessage] = useState("");
    const [sendingContact, setSendingContact] = useState(false);
    const [contactStatus, setContactStatus] = useState({ error: "", success: "" });

    // Check Auth Status & User Role
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUser(user);
                setFormStudentEmail(user.email || "");
                setFormStudentName(user.user_metadata?.full_name || user.user_metadata?.name || "");

                // Check if user is a registered tutor
                try {
                    const res = await fetch(`/api/tutor/profile`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data && data.id) {
                            setIsTutor(true);
                            setTutorProfile(data);
                        }
                    }
                } catch (e) {
                    // Not a tutor
                }
            }
        };
        checkUser();
    }, [supabase]);

    // Fetch Requests
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedSyllabus !== "all") params.append("syllabus", selectedSyllabus);
            if (selectedMode !== "all") params.append("mode", selectedMode);
            if (searchQuery.trim()) params.append("search", searchQuery.trim());

            const res = await fetch(`/api/requests?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (err) {
            console.error("Error fetching requests:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedSyllabus, selectedMode, searchQuery]);

    // Handle Create Post
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setCreateError("");
        if (!currentUser) {
            alert("Please sign in with Google to post a tuition request!");
            return;
        }
        if (!formSubject.trim() || !formMessage.trim()) {
            setCreateError("Subject and detailed message are required.");
            return;
        }

        setSubmittingReq(true);
        try {
            const res = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentName: formStudentName,
                    studentEmail: formStudentEmail,
                    syllabus: formSyllabus,
                    gradeOrAge: formGradeOrAge,
                    subject: formSubject,
                    classType: formClassType,
                    mode: formMode,
                    location: formLocation,
                    message: formMessage,
                }),
            });

            if (res.ok) {
                setShowCreateModal(false);
                setFormSubject("");
                setFormMessage("");
                setFormLocation("");
                fetchRequests();
            } else {
                const err = await res.json();
                setCreateError(err.error || "Failed to create post.");
            }
        } catch (err) {
            setCreateError("Network error. Please try again.");
        } finally {
            setSubmittingReq(false);
        }
    };

    // Handle Tutor Contact Submit
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setContactStatus({ error: "", success: "" });
        if (!contactMessage.trim()) {
            setContactStatus({ error: "Please enter a message for the student.", success: "" });
            return;
        }

        setSendingContact(true);
        try {
            const res = await fetch("/api/requests/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requestId: contactingReq.id,
                    message: contactMessage,
                }),
            });

            if (res.ok) {
                setContactStatus({ error: "", success: "Offer sent successfully! An email has been dispatched to the student." });
                setTimeout(() => {
                    setContactingReq(null);
                    setContactMessage("");
                    setContactStatus({ error: "", success: "" });
                }, 2000);
            } else {
                const err = await res.json();
                setContactStatus({ error: err.error || "Failed to send contact offer.", success: "" });
            }
        } catch (err) {
            setContactStatus({ error: "Network error sending offer.", success: "" });
        } finally {
            setSendingContact(false);
        }
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedSyllabus("all");
        setSelectedMode("all");
    };

    return (
        <main className="min-h-screen bg-[#f4f9f8] text-dark pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* ── HERO BANNER ── */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#063d34] via-[#074a3f] to-[#032924] p-6 sm:p-10 mb-8 shadow-xl text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#14e1be]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-3xl space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-[#2eedc4] bg-[#2eedc4]/10 border border-[#2eedc4]/30">
                            <Sparkles size={13} />
                            Student Tuition Request Wall
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            Find a Custom Tutor or Share What You Need
                        </h1>
                        <p className="text-teal-100/80 text-sm sm:text-base leading-relaxed">
                            Students can post custom learning requirements for A/L, O/L, International syllabuses, or extra-curricular skills (music, sports, theory/revision). Verified tutors browse this board to connect directly!
                        </p>
                        
                        <div className="pt-2 flex flex-wrap gap-3">
                            <button
                                onClick={() => {
                                    if (!currentUser) {
                                        alert("Please sign in with Google to post a tuition request!");
                                        return;
                                    }
                                    setShowCreateModal(true);
                                }}
                                className="inline-flex items-center gap-2 bg-[#0d8a6e] hover:bg-[#096d57] text-white px-6 py-3 rounded-full font-black text-sm shadow-[0_4px_20px_rgba(13,138,110,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#2eedc4]/30"
                            >
                                <Plus size={18} />
                                + Post a Tuition Request
                            </button>

                            <Link
                                href="/tutors"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full font-extrabold text-sm backdrop-blur-sm transition-all border border-white/20"
                            >
                                Browse Verified Tutors →
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── FILTER SIDEBAR ── */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <h3 className="font-extrabold text-dark text-sm flex items-center gap-2">
                                    <SlidersHorizontal size={16} className="text-[#0d8a6e]" />
                                    Filter Requests
                                </h3>
                                {(searchQuery || selectedSyllabus !== "all" || selectedMode !== "all") && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="text-[11px] font-bold text-[#0d8a6e] hover:underline cursor-pointer flex items-center gap-1"
                                    >
                                        <RefreshCw size={10} /> Clear
                                    </button>
                                )}
                            </div>

                            {/* Keyword Search */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                                    Search Keywords
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Subject, grade, skill, location..."
                                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 bg-gray-50/50 rounded-xl focus:bg-white focus:border-[#0d8a6e] outline-none transition-all"
                                    />
                                    <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Syllabus Filter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                                    Syllabus / Category
                                </label>
                                <select
                                    value={selectedSyllabus}
                                    onChange={(e) => setSelectedSyllabus(e.target.value)}
                                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                >
                                    <option value="all">All Syllabuses &amp; Categories</option>
                                    <option value="Local A/L">Local A/L</option>
                                    <option value="Local O/L">Local O/L</option>
                                    <option value="Edexcel">Edexcel</option>
                                    <option value="Cambridge">Cambridge</option>
                                    <option value="Other">Other / Skill / Sports / Music</option>
                                </select>
                            </div>

                            {/* Class Mode Filter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
                                    Preferred Class Mode
                                </label>
                                <select
                                    value={selectedMode}
                                    onChange={(e) => setSelectedMode(e.target.value)}
                                    className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-xs text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                >
                                    <option value="all">Any Mode (Online or Physical)</option>
                                    <option value="Online">Online Classes Only</option>
                                    <option value="Physical">Physical Classes Only</option>
                                    <option value="Online & Physical">Online &amp; Physical</option>
                                </select>
                            </div>

                            {/* Info Box */}
                            <div className="bg-[#f0fdf9] border border-[#c2edd9] p-3.5 rounded-2xl text-xs text-gray-600 space-y-1">
                                <p className="font-extrabold text-[#0d8a6e]">🔒 Student Privacy Protected</p>
                                <p className="text-[11px] leading-relaxed">
                                    Student contact details are kept private. Verified tutors click &ldquo;Contact Student&rdquo; to dispatch offers safely.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── POST FEED WALL ── */}
                    <div className="lg:col-span-9 space-y-4">
                        <div className="flex justify-between items-center text-xs text-gray-500 pb-1">
                            <span className="font-bold text-dark">Showing {requests.length} Tuition Request Posts</span>
                            <span>Updated Live</span>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-44 bg-white rounded-3xl border border-gray-100 animate-pulse" />
                                ))}
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-[#e6f7f2] text-[#0d8a6e] flex items-center justify-center mx-auto border border-[#c2edd9]">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="font-black text-lg text-dark">No Request Posts Found</h3>
                                <p className="text-xs text-gray-500 max-w-md mx-auto">
                                    No tuition requests match your current filter settings. Be the first to post a request or clear your filters!
                                </p>
                                <button
                                    onClick={() => {
                                        if (!currentUser) {
                                            alert("Please sign in with Google to post a tuition request!");
                                            return;
                                        }
                                        setShowCreateModal(true);
                                    }}
                                    className="px-5 py-2.5 bg-[#0d8a6e] text-white font-extrabold text-xs rounded-full shadow-md hover:bg-[#096d57] transition-all"
                                >
                                    + Post a Tuition Request Now
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requests.map((req) => (
                                    <div
                                        key={req.id}
                                        className="bg-white rounded-3xl border border-gray-100/90 p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.025)] hover:border-[#0d8a6e]/40 transition-all duration-200 space-y-3 relative group"
                                    >
                                        {/* Top Tag Badges & Time */}
                                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-[#0d8a6e] bg-[#e6f7f2] border border-[#c2edd9]">
                                                    {req.syllabus}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60">
                                                    {req.classType || "Revision & Theory"}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-100 flex items-center gap-1">
                                                    <Globe size={11} className="text-[#0d8a6e]" />
                                                    {req.mode}
                                                </span>
                                                {req.location && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-100 flex items-center gap-1">
                                                        <MapPin size={11} className="text-[#0d8a6e]" />
                                                        {req.location}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-1 shrink-0">
                                                <Clock size={11} />
                                                {new Date(req.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </span>
                                        </div>

                                        {/* Headline / Subject */}
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-black text-base sm:text-lg text-dark tracking-tight leading-snug">
                                                    Need Tutor for: <span className="text-[#0d8a6e]">{req.subject}</span>
                                                </h3>
                                            </div>
                                            <p className="text-xs font-extrabold text-gray-500">
                                                Target Level / Age: <span className="text-dark">{req.gradeOrAge}</span>
                                            </p>
                                        </div>

                                        {/* Description Message Box */}
                                        <div className="bg-[#f4f9f8] rounded-2xl p-4 border border-gray-100/90">
                                            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                                                {req.message}
                                            </p>
                                        </div>

                                        {/* Footer Row: Student Meta + Contact Button */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                                <div className="w-6 h-6 rounded-full bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center text-[#0d8a6e]">
                                                    <User size={12} />
                                                </div>
                                                <span>Requested by {req.studentName || "Student"}</span>
                                            </div>

                                            {/* Contact Student Action Button (Only for Tutors) */}
                                            {isTutor ? (
                                                <button
                                                    onClick={() => {
                                                        setContactingReq(req);
                                                        setContactMessage(`Hello ${req.studentName}, I am ${tutorProfile?.name || "a verified tutor"} on TutorHub.LK. I saw your tuition request for ${req.subject} and I'd be happy to guide you!`);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
                                                >
                                                    <Mail size={13} />
                                                    Contact Student via Email
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        if (!currentUser) {
                                                            alert("Tutors must be registered and signed in on TutorHub.LK to contact students who post requests.");
                                                        } else {
                                                            alert("Only registered verified tutors can contact students directly. If you are a tutor, please complete your tutor application!");
                                                        }
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-full transition-all cursor-pointer"
                                                >
                                                    <ShieldCheck size={13} className="text-[#0d8a6e]" />
                                                    Tutor Contact Access
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ══════════════════════════════════════════
                    CREATE POST MODAL
                ══════════════════════════════════════════ */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-3xl border border-gray-100 max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 relative">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="text-lg font-black text-dark flex items-center gap-2">
                                    <Plus size={18} className="text-[#0d8a6e]" />
                                    Post a Student Tuition Request
                                </h3>
                                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-dark">
                                    <X size={18} />
                                </button>
                            </div>

                            {createError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    {createError}
                                </div>
                            )}

                            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                                {/* Student Info Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Your Display Name *</label>
                                        <input
                                            type="text"
                                            value={formStudentName}
                                            onChange={(e) => setFormStudentName(e.target.value)}
                                            placeholder="e.g. Ruwan K."
                                            required
                                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Your Email (Kept Private) *</label>
                                        <input
                                            type="email"
                                            value={formStudentEmail}
                                            onChange={(e) => setFormStudentEmail(e.target.value)}
                                            placeholder="your.email@gmail.com"
                                            required
                                            disabled={Boolean(currentUser?.email)}
                                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-3 py-2 text-dark font-semibold outline-none disabled:opacity-60"
                                        />
                                    </div>
                                </div>

                                {/* Syllabus & Target Grade/Age */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Syllabus / Category *</label>
                                        <select
                                            value={formSyllabus}
                                            onChange={(e) => setFormSyllabus(e.target.value)}
                                            className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        >
                                            <option value="Local A/L">Local A/L</option>
                                            <option value="Local O/L">Local O/L</option>
                                            <option value="Edexcel">Edexcel</option>
                                            <option value="Cambridge">Cambridge</option>
                                            <option value="Other / Extra Curricular">Other / Skill / Sports / Music</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Grade Level or Age Group *</label>
                                        <input
                                            type="text"
                                            value={formGradeOrAge}
                                            onChange={(e) => setFormGradeOrAge(e.target.value)}
                                            placeholder="e.g. Grade 11, Age 15, or Adult Learner"
                                            required
                                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        />
                                    </div>
                                </div>

                                {/* Subject & Class Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Subject / Skill Needed *</label>
                                        <input
                                            type="text"
                                            value={formSubject}
                                            onChange={(e) => setFormSubject(e.target.value)}
                                            placeholder="e.g. Physics, Combined Maths, Guitar, Spoken English"
                                            required
                                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Class Focus / Type</label>
                                        <select
                                            value={formClassType}
                                            onChange={(e) => setFormClassType(e.target.value)}
                                            className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        >
                                            <option value="Revision & Theory">Revision &amp; Theory</option>
                                            <option value="Paper Class Only">Paper Class Only</option>
                                            <option value="Theory Only">Theory Only</option>
                                            <option value="Individual Coaching">Individual Coaching</option>
                                            <option value="Group Tuition">Group Tuition</option>
                                            <option value="Extra Curricular / Skill">Extra Curricular / Skill</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Mode & Location */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Preferred Class Mode</label>
                                        <select
                                            value={formMode}
                                            onChange={(e) => setFormMode(e.target.value)}
                                            className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        >
                                            <option value="Online & Physical">Online &amp; Physical</option>
                                            <option value="Online Classes Only">Online Classes Only</option>
                                            <option value="Physical Classes Only">Physical Classes Only</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Location / District (if physical)</label>
                                        <input
                                            type="text"
                                            value={formLocation}
                                            onChange={(e) => setFormLocation(e.target.value)}
                                            placeholder="e.g. Colombo, Kandy, Gampaha"
                                            className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-3 py-2 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                        />
                                    </div>
                                </div>

                                {/* Detailed Message */}
                                <div className="space-y-1">
                                    <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Detailed Requirements / Description *</label>
                                    <textarea
                                        value={formMessage}
                                        onChange={(e) => setFormMessage(e.target.value)}
                                        rows={4}
                                        placeholder="Describe what you are looking for, your preferred class times, syllabus details, or specific paper revision needs..."
                                        required
                                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold rounded-full transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submittingReq}
                                        className="px-6 py-2 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-extrabold rounded-full shadow-md transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        {submittingReq ? "Publishing..." : "Publish Request Post"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════════
                    TUTOR CONTACT MODAL
                ══════════════════════════════════════════ */}
                {contactingReq && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl border border-gray-100 max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 className="text-base font-black text-dark flex items-center gap-2">
                                    <Mail size={16} className="text-[#0d8a6e]" />
                                    Send Offer to {contactingReq.studentName}
                                </h3>
                                <button onClick={() => setContactingReq(null)} className="text-gray-400 hover:text-dark">
                                    <X size={18} />
                                </button>
                            </div>

                            {contactStatus.error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    {contactStatus.error}
                                </div>
                            )}

                            {contactStatus.success && (
                                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
                                    <CheckCircle2 size={14} />
                                    {contactStatus.success}
                                </div>
                            )}

                            <div className="bg-[#f0fdf9] border border-[#c2edd9] p-3 rounded-2xl text-xs text-gray-700 space-y-1">
                                <p className="font-extrabold text-[#0d8a6e]">Target Request: {contactingReq.subject}</p>
                                <p className="text-[11px] text-gray-500">{contactingReq.syllabus} · {contactingReq.gradeOrAge}</p>
                            </div>

                            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                                <div className="space-y-1">
                                    <label className="font-extrabold text-gray-400 uppercase tracking-wider block">Your Message &amp; Class Offer *</label>
                                    <textarea
                                        value={contactMessage}
                                        onChange={(e) => setContactMessage(e.target.value)}
                                        rows={5}
                                        placeholder="Introduce your experience, availability, class format, and how to reach you..."
                                        required
                                        className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3 text-dark font-semibold outline-none focus:border-[#0d8a6e]"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setContactingReq(null)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 font-extrabold rounded-full transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={sendingContact}
                                        className="px-5 py-2 bg-[#0d8a6e] hover:bg-[#096d57] text-white font-extrabold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                                    >
                                        <Send size={13} />
                                        {sendingContact ? "Sending..." : "Dispatch Offer Email"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}

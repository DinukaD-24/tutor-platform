"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    LayoutDashboard, BookOpen, Upload, FileText,
    BarChart2, Users, Star, Clock, TrendingUp,
    CheckCircle, AlertCircle, Plus, Settings, ArrowRight, LogOut,
    Edit3, Trash2, MapPin, Globe, DollarSign, Award, HelpCircle, Save,
    Mail, Bell, Phone, MessageSquare
} from "lucide-react";

export default function DashboardClient({ tutor: initialTutor }) {
    const supabase = createClient();
    const router = useRouter();
    const [tutor, setTutor] = useState(initialTutor);
    const [activeTab, setActiveTab] = useState("Overview");

    // Profile Form State
    const [profileForm, setProfileForm] = useState({
        location: tutor.location || "",
        onlineAvailable: tutor.onlineAvailable ?? true,
        physicalAvailable: tutor.physicalAvailable ?? false,
        phone: tutor.phone || "",
        university: tutor.university || "",
        tutorType: tutor.tutorType || "Private Tutor",
        experience: tutor.experience || "",
        bio: tutor.bio || "",
        teachingStyle: tutor.teachingStyle || "",
        subject: tutor.subject || "",
        syllabuses: tutor.syllabuses || [],
        image: tutor.image || "",
    });

    const [specializationsList, setSpecializationsList] = useState(tutor.specializations || [tutor.subject]);
    const [specInput, setSpecInput] = useState("");

    const [syllabusInput, setSyllabusInput] = useState("");

    const [qualificationsList, setQualificationsList] = useState(tutor.qualifications || []);
    const [qualInput, setQualInput] = useState("");

    const [languagesList, setLanguagesList] = useState(tutor.languages || ["English", "Sinhala"]);
    const [langInput, setLangInput] = useState("");

    const [savingProfile, setSavingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState("");

    // Student contact requests state
    const [contactRequests, setContactRequests] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loadingRequests, setLoadingRequests] = useState(false);

    // Curriculum state for lesson upload
    const [curriculum, setCurriculum] = useState([]);
    const [selectedSyllabus, setSelectedSyllabus] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSubject, setSelectedSubject] = useState(tutor.subject || "");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [customSubject, setCustomSubject] = useState("");
    const [customTopic, setCustomTopic] = useState("");
    const [promptAddSubject, setPromptAddSubject] = useState(false);
    const [pendingSubjectToAdd, setPendingSubjectToAdd] = useState("");

    // Video form states
    const [title, setTitle] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Video Editing Modal State
    const [editingVideo, setEditingVideo] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editYoutubeUrl, setEditYoutubeUrl] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // Fetch contact requests when tab is selected
    useEffect(() => {
        if (activeTab === "Student Requests") {
            setLoadingRequests(true);
            fetch("/api/tutor/contact-requests")
                .then(r => r.json())
                .then(data => {
                    if (data.requests) {
                        setContactRequests(data.requests);
                        setUnreadCount(data.unreadCount || 0);
                    }
                })
                .catch(() => {})
                .finally(() => setLoadingRequests(false));
        }
    }, [activeTab]);

    // Also fetch unread count on mount (for badge)
    useEffect(() => {
        fetch("/api/tutor/contact-requests")
            .then(r => r.json())
            .then(data => { if (data.unreadCount) setUnreadCount(data.unreadCount); })
            .catch(() => {});
    }, []);

    const markRequestAsRead = async (id) => {
        try {
            await fetch("/api/tutor/contact-requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            setContactRequests(prev =>
                prev.map(r => r.id === id ? { ...r, isRead: true } : r)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch {}
    };

    // Fetch curriculum for lesson upload dropdowns
    useEffect(() => {
        fetch("/api/lessons")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCurriculum(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setProfileMessage("");
        try {
            const res = await fetch("/api/tutor/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...profileForm,
                    languages: languagesList,
                    specializations: specializationsList,
                    qualifications: qualificationsList,
                    syllabuses: profileForm.syllabuses,
                })
            });
            const data = await res.json();
            if (res.ok) {
                setProfileMessage("Profile updated successfully!");
                setTutor(data.tutor);
            } else {
                setProfileMessage(`Error: ${data.error}`);
            }
        } catch (err) {
            setProfileMessage("Failed to save profile.");
        } finally {
            setSavingProfile(false);
        }
    };

    const handleUploadLesson = async (e, forceAddToProfile = false) => {
        if (e) e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        // Parse YouTube ID from URL
        let youtubeId = youtubeUrl.trim();
        try {
            const url = new URL(youtubeUrl.trim());
            youtubeId = url.searchParams.get("v") || url.pathname.replace("/", "").split("/").pop();
        } catch {
            // fallback raw string
        }

        if (!youtubeId) {
            setError("Could not parse a valid YouTube video ID from the URL.");
            setLoading(false);
            return;
        }

        const finalSubject = selectedSubject === "Other" ? customSubject : selectedSubject;
        const finalTopic = selectedTopic === "Other" ? customTopic : selectedTopic;

        try {
            const res = await fetch("/api/lessons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    youtubeId,
                    description,
                    subject: finalSubject,
                    topicName: finalTopic,
                    syllabusSlug: selectedSyllabus,
                    gradeSlug: selectedGrade,
                    tutorId: tutor.id,
                    addToProfile: forceAddToProfile || promptAddSubject
                })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to upload lesson.");
            }

            if (data.isNewSubjectForTutor && !forceAddToProfile && !promptAddSubject) {
                setPendingSubjectToAdd(data.subjectName);
                setPromptAddSubject(true);
                setLoading(false);
                return;
            }

            setSuccess("Lesson uploaded successfully!");
            setTitle("");
            setYoutubeUrl("");
            setDescription("");
            setCustomSubject("");
            setCustomTopic("");
            setPromptAddSubject(false);
            setPendingSubjectToAdd("");
            
            // Refresh tutor profile videos
            const profileRes = await fetch("/api/tutor/profile");
            if (profileRes.ok) {
                const freshTutor = await profileRes.json();
                setTutor(freshTutor);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        if (!confirm("Are you sure you want to delete this lesson?")) return;
        try {
            const res = await fetch(`/api/lessons?id=${videoId}`, { method: "DELETE" });
            if (res.ok) {
                setTutor(prev => ({
                    ...prev,
                    videos: prev.videos.filter(v => v.id !== videoId)
                }));
            } else {
                alert("Failed to delete lesson");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditVideoSubmit = async (e) => {
        e.preventDefault();
        if (!editingVideo) return;
        try {
            let youtubeId = editYoutubeUrl.trim();
            try {
                const url = new URL(editYoutubeUrl.trim());
                youtubeId = url.searchParams.get("v") || url.pathname.replace("/", "").split("/").pop();
            } catch {}

            const res = await fetch("/api/lessons", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editingVideo.id,
                    title: editTitle,
                    youtubeId,
                    description: editDescription
                })
            });
            if (res.ok) {
                const data = await res.json();
                setTutor(prev => ({
                    ...prev,
                    videos: prev.videos.map(v => v.id === editingVideo.id ? data.lesson : v)
                }));
                setEditingVideo(null);
            } else {
                alert("Failed to edit lesson");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Calculate dynamic stats
    const stats = [
        { label: "Total Students",    value: tutor.studentsCount.toString(),  change: "Active students", icon: <Users size={20} />,     color: "text-primary bg-primary/10"    },
        { label: "Lessons Uploaded",  value: (tutor.videos?.length || 0).toString(),   change: "Published video tutorials",   icon: <BookOpen size={20} />,  color: "text-primary-dark bg-primary/10" },
        { label: "Average Rating",    value: tutor.rating ? tutor.rating.toFixed(1) : "5.0",  change: `${tutor.reviewsCount || 0} reviews`,     icon: <Star size={20} />,      color: "text-amber-600 bg-amber-50"    },
        { label: "Lessons Conducted", value: tutor.lessonsCount.toString(), change: "In-person/Online hours",  icon: <TrendingUp size={20} />,color: "text-purple-600 bg-purple-50"  },
    ];

    const navItems = [
        { label: "Overview",          icon: <LayoutDashboard size={18} /> },
        { label: "Edit Profile",      icon: <Edit3 size={18} /> },
        { label: "Upload Lesson",     icon: <Upload size={18} /> },
        {
            label: "Student Requests",
            icon: <Mail size={18} />,
            badge: unreadCount > 0 ? unreadCount : null,
        },
        { label: "Sign Out",          icon: <LogOut size={18} />, onClick: handleSignOut, isDestructive: true },
    ];

    // Get current syllabus object
    const activeSyllabusObj = curriculum.find(s => s.slug === selectedSyllabus);
    const activeGrades = activeSyllabusObj?.grades || [];
    const activeGradeObj = activeGrades.find(g => g.slug === selectedGrade);
    const rawSubjects = activeGradeObj?.subjects || [];
    const activeSubjects = Array.from(
        new Map(rawSubjects.map(sub => [sub.name.trim().toLowerCase(), sub])).values()
    );
    const activeSubjectObj = activeSubjects.find(sub => sub.name === selectedSubject);
    const rawTopics = activeSubjectObj?.topics || [];
    const activeTopics = Array.from(
        new Map(rawTopics.map(t => [t.name.trim().toLowerCase(), t])).values()
    );

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
                            href={`/tutors/${tutor.slug || tutor.id}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary border border-gray-100 bg-white hover:border-primary/20 px-4 py-2.5 rounded-xl transition-all"
                        >
                            View Public Profile
                        </Link>
                        <button 
                            onClick={() => setActiveTab("Upload Lesson")}
                            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-glow-primary transition-all cursor-pointer"
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
                                    <span className="flex-1">{item.label}</span>
                                    {item.badge && (
                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-black">
                                            {item.badge > 9 ? "9+" : item.badge}
                                        </span>
                                    )}
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
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <button
                                                            onClick={() => {
                                                                setEditingVideo(lesson);
                                                                setEditTitle(lesson.title);
                                                                setEditYoutubeUrl(`https://www.youtube.com/watch?v=${lesson.youtubeId}`);
                                                                setEditDescription(lesson.description || "");
                                                            }}
                                                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors cursor-pointer"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteVideo(lesson.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-sm">
                                                No video lessons uploaded yet. Click &quot;Upload Lesson&quot; to start.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "Edit Profile" && (
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                                <div>
                                    <h2 className="text-xl font-extrabold text-dark flex items-center gap-2">
                                        <Edit3 size={20} className="text-primary" />
                                        Edit Educator Profile
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">Keep your profile updated so students find accurate class details.</p>
                                </div>

                                {profileMessage && (
                                    <div className={`p-3.5 rounded-xl text-xs font-semibold ${
                                        profileMessage.includes("Error")
                                            ? "bg-red-50 text-red-600 border border-red-100"
                                            : "bg-green-50 text-green-700 border border-green-100"
                                    }`}>
                                        {profileMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSaveProfile} className="space-y-6">
                                    
                                    {/* Availability & Location */}
                                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl space-y-3">
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs">
                                            <Star size={14} />
                                            <span>Location & Class Formats</span>
                                        </div>
                                        
                                        <div>
                                            <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Location / Town</label>
                                            <input
                                                type="text"
                                                value={profileForm.location}
                                                onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                                                placeholder="e.g. Nugegoda, Colombo"
                                                className="w-full border border-gray-100 bg-white rounded-xl px-3 py-2.5 text-xs text-dark focus:border-primary outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-6 pt-2">
                                            <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={profileForm.onlineAvailable}
                                                    onChange={e => setProfileForm({ ...profileForm, onlineAvailable: e.target.checked })}
                                                    className="w-4 h-4 rounded text-primary border-gray-200"
                                                />
                                                Available for Online Classes
                                            </label>
                                            <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={profileForm.physicalAvailable}
                                                    onChange={e => setProfileForm({ ...profileForm, physicalAvailable: e.target.checked })}
                                                    className="w-4 h-4 rounded text-primary border-gray-200"
                                                />
                                                Available for Physical / Home Tuition
                                            </label>
                                        </div>
                                    </div>

                                    {/* Contact & Institution */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                value={profileForm.phone}
                                                onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">University / Institution</label>
                                            <input
                                                type="text"
                                                value={profileForm.university}
                                                onChange={e => setProfileForm({ ...profileForm, university: e.target.value })}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Tutor Category / Type</label>
                                            <select
                                                value={profileForm.tutorType}
                                                onChange={e => setProfileForm({ ...profileForm, tutorType: e.target.value })}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none cursor-pointer"
                                            >
                                                <option value="Private Tutor">Private Tutor</option>
                                                <option value="School Teacher">School Teacher</option>
                                                <option value="University Lecturer">University Lecturer</option>
                                                <option value="University Student">University Student</option>
                                                <option value="Institute Educator">Institute Educator</option>
                                                <option value="Online Specialist">Online Specialist</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Primary Subject</label>
                                            <input
                                                type="text"
                                                value={profileForm.subject}
                                                onChange={e => setProfileForm({ ...profileForm, subject: e.target.value })}
                                                placeholder="e.g. Physics, Chemistry"
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Years of Experience</label>
                                            <input
                                                type="text"
                                                value={profileForm.experience}
                                                onChange={e => setProfileForm({ ...profileForm, experience: e.target.value })}
                                                placeholder="e.g. 5 years"
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block">Target Syllabuses</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={syllabusInput}
                                                onChange={e => setSyllabusInput(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        const trimmed = syllabusInput.trim();
                                                        if (trimmed && !profileForm.syllabuses.includes(trimmed)) {
                                                            setProfileForm({ ...profileForm, syllabuses: [...profileForm.syllabuses, trimmed] });
                                                            setSyllabusInput("");
                                                        }
                                                    }
                                                }}
                                                placeholder="Add a syllabus and press Enter"
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const trimmed = syllabusInput.trim();
                                                    if (trimmed && !profileForm.syllabuses.includes(trimmed)) {
                                                        setProfileForm({ ...profileForm, syllabuses: [...profileForm.syllabuses, trimmed] });
                                                        setSyllabusInput("");
                                                    }
                                                }}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {profileForm.syllabuses.map((syl) => (
                                                <span key={syl} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold">
                                                    {syl}
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfileForm({
                                                            ...profileForm,
                                                            syllabuses: profileForm.syllabuses.filter((item) => item !== syl)
                                                        })}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-gray-400">Add one syllabus per tag, e.g. Local A/L, Edexcel, Cambridge.</p>
                                    </div>

                                    {/* Teaching Specializations Tag Manager */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block">Teaching Specializations</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={specInput}
                                                onChange={e => setSpecInput(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        if (specInput.trim() && !specializationsList.includes(specInput.trim())) {
                                                            setSpecializationsList([...specializationsList, specInput.trim()]);
                                                            setSpecInput("");
                                                        }
                                                    }
                                                }}
                                                placeholder="Type specialization & press Enter or Add..."
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (specInput.trim() && !specializationsList.includes(specInput.trim())) {
                                                        setSpecializationsList([...specializationsList, specInput.trim()]);
                                                        setSpecInput("");
                                                    }
                                                }}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {specializationsList.map(s => (
                                                <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold">
                                                    {s}
                                                    <button
                                                        type="button"
                                                        onClick={() => setSpecializationsList(specializationsList.filter(item => item !== s))}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1">⭐ Tip: Adding specific sub-topics helps students searching by topic find your profile.</p>
                                    </div>

                                    {/* Qualifications Tag Manager */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block">Qualifications</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={qualInput}
                                                onChange={e => setQualInput(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        if (qualInput.trim() && !qualificationsList.includes(qualInput.trim())) {
                                                            setQualificationsList([...qualificationsList, qualInput.trim()]);
                                                            setQualInput("");
                                                        }
                                                    }
                                                }}
                                                placeholder="e.g. B.Sc Engineering, 5+ Yrs Experience..."
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (qualInput.trim() && !qualificationsList.includes(qualInput.trim())) {
                                                        setQualificationsList([...qualificationsList, qualInput.trim()]);
                                                        setQualInput("");
                                                    }
                                                }}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {qualificationsList.map(q => (
                                                <span key={q} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold">
                                                    {q}
                                                    <button
                                                        type="button"
                                                        onClick={() => setQualificationsList(qualificationsList.filter(item => item !== q))}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Languages Tag Manager */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block">Medium of Instruction / Languages</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={langInput}
                                                onChange={e => setLangInput(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        if (langInput.trim() && !languagesList.includes(langInput.trim())) {
                                                            setLanguagesList([...languagesList, langInput.trim()]);
                                                            setLangInput("");
                                                        }
                                                    }
                                                }}
                                                placeholder="e.g. English, Sinhala, Tamil..."
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (langInput.trim() && !languagesList.includes(langInput.trim())) {
                                                        setLanguagesList([...languagesList, langInput.trim()]);
                                                        setLangInput("");
                                                    }
                                                }}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {languagesList.map(l => (
                                                <span key={l} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold">
                                                    {l}
                                                    <button
                                                        type="button"
                                                        onClick={() => setLanguagesList(languagesList.filter(item => item !== l))}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Profile Photo Uploader */}
                                    <div className="space-y-1.5 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block">
                                            Profile Photo
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {profileForm.image ? (
                                                <img
                                                    src={profileForm.image}
                                                    alt="Profile preview"
                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/30 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 font-bold text-xs shrink-0">
                                                    No Photo
                                                </div>
                                            )}
                                            <div className="flex-1 space-y-1">
                                                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm">
                                                    Upload New Photo
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;
                                                            const reader = new FileReader();
                                                            reader.onload = (event) => {
                                                                const img = new Image();
                                                                img.onload = () => {
                                                                    const canvas = document.createElement("canvas");
                                                                    const maxDim = 800;
                                                                    let width = img.width;
                                                                    let height = img.height;
                                                                    if (width > height) {
                                                                        if (width > maxDim) {
                                                                            height = Math.round((height * maxDim) / width);
                                                                            width = maxDim;
                                                                        }
                                                                    } else {
                                                                        if (height > maxDim) {
                                                                            width = Math.round((width * maxDim) / height);
                                                                            height = maxDim;
                                                                        }
                                                                    }
                                                                    canvas.width = width;
                                                                    canvas.height = height;
                                                                    const ctx = canvas.getContext("2d");
                                                                    ctx.drawImage(img, 0, 0, width, height);
                                                                    const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
                                                                    setProfileForm(prev => ({ ...prev, image: compressedDataUrl }));
                                                                };
                                                                img.src = event.target.result;
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                    />
                                                </label>
                                                {profileForm.image && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfileForm(prev => ({ ...prev, image: "" }))}
                                                        className="block text-[11px] text-red-500 font-semibold hover:underline cursor-pointer"
                                                    >
                                                        Remove photo
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Biography / About You</label>
                                        <textarea
                                            value={profileForm.bio}
                                            onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                                            rows={4}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold text-dark uppercase tracking-wider block mb-1">Teaching Methodology</label>
                                        <textarea
                                            value={profileForm.teachingStyle}
                                            onChange={e => setProfileForm({ ...profileForm, teachingStyle: e.target.value })}
                                            rows={2}
                                            placeholder="Describe how you structure lessons, revision, and exam paper practice..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={savingProfile}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-glow-primary transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        <Save size={14} />
                                        {savingProfile ? "Saving Profile..." : "Save Profile Changes"}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === "Student Requests" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-black text-dark flex items-center gap-2">
                                            <Mail size={20} className="text-primary" />
                                            Student Requests
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-1">Students who contacted you via your profile page.</p>
                                    </div>
                                    {unreadCount > 0 && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                                            <Bell size={12} />
                                            {unreadCount} New
                                        </span>
                                    )}
                                </div>

                                {loadingRequests ? (
                                    <div className="flex items-center justify-center py-16">
                                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : contactRequests.length === 0 ? (
                                    <div className="bg-white rounded-3xl border border-gray-100 p-12 flex flex-col items-center text-center gap-3">
                                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
                                            <Mail size={24} className="text-gray-300" />
                                        </div>
                                        <p className="font-bold text-dark">No student requests yet</p>
                                        <p className="text-xs text-gray-400 max-w-xs">When students contact you from your profile, their requests will appear here.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {contactRequests.map((req) => (
                                            <div
                                                key={req.id}
                                                className={`bg-white rounded-2xl border p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all ${
                                                    !req.isRead ? "border-primary/30 ring-1 ring-primary/10" : "border-gray-100"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black text-sm flex items-center justify-center shrink-0">
                                                            {req.studentName?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-extrabold text-dark text-sm">{req.studentName}</h4>
                                                                {!req.isRead && (
                                                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">NEW</span>
                                                                )}
                                                            </div>
                                                            <p className="text-[10px] text-gray-400 font-medium">
                                                                {new Date(req.createdAt).toLocaleDateString("en-LK", {
                                                                    year: "numeric", month: "short", day: "numeric",
                                                                    hour: "2-digit", minute: "2-digit"
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {!req.isRead && (
                                                        <button
                                                            onClick={() => markRequestAsRead(req.id)}
                                                            className="text-[10px] font-bold text-primary hover:underline shrink-0 cursor-pointer"
                                                        >
                                                            Mark as Read
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                                    {req.whatsapp && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                                                            <Phone size={12} className="text-green-600 shrink-0" />
                                                            <span className="font-bold">WhatsApp:</span>
                                                            <a href={`https://wa.me/${req.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-green-700 font-bold hover:underline">{req.whatsapp}</a>
                                                        </div>
                                                    )}
                                                    {req.phone && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                                                            <Phone size={12} className="text-blue-600 shrink-0" />
                                                            <span className="font-bold">Phone:</span>
                                                            <span className="text-blue-700 font-bold">{req.phone}</span>
                                                        </div>
                                                    )}
                                                    {req.studentEmail && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                                                            <Mail size={12} className="text-gray-500 shrink-0" />
                                                            <span className="font-bold">Email:</span>
                                                            <span className="truncate">{req.studentEmail}</span>
                                                        </div>
                                                    )}
                                                    {(req.syllabusName || req.gradeName || req.subjectName) && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                                                            <BookOpen size={12} className="text-primary shrink-0" />
                                                            <span className="font-bold text-primary">
                                                                {[req.syllabusName, req.gradeName, req.subjectName].filter(Boolean).join(" → ")}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {req.message && (
                                                    <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-start gap-2">
                                                        <MessageSquare size={13} className="text-gray-400 shrink-0 mt-0.5" />
                                                        <p className="text-xs text-gray-600 leading-relaxed italic">&ldquo;{req.message}&rdquo;</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "Upload Lesson" && (
                            /* Upload Form with Curriculum Dropdowns */
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5 max-w-2xl">
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

                                {/* Prompt modal / warning if subject is new for tutor */}
                                {promptAddSubject && (
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                                        <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                                            <AlertCircle size={16} />
                                            <span>Add &ldquo;{pendingSubjectToAdd}&rdquo; to your Profile Specializations?</span>
                                        </div>
                                        <p className="text-xs text-amber-700">
                                            You uploaded a video for <strong>{pendingSubjectToAdd}</strong>, but it&apos;s not listed in your profile specializations yet. Would you like to add it to your profile so students searching for {pendingSubjectToAdd} find you?
                                        </p>
                                        <div className="flex items-center gap-3 pt-1">
                                            <button
                                                type="button"
                                                onClick={() => handleUploadLesson(null, true)}
                                                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-glow-primary cursor-pointer"
                                            >
                                                Yes, Add to My Profile & Publish
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPromptAddSubject(false);
                                                    setSuccess("Lesson published without adding subject to profile specializations.");
                                                }}
                                                className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-200 cursor-pointer"
                                            >
                                                No, Keep Profile As-Is
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={e => handleUploadLesson(e, false)} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lesson Title *</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            placeholder="e.g. Trigonometry — Part 3"
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">YouTube Video URL *</label>
                                        <input
                                            type="url"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            required
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary outline-none transition-all"
                                        />
                                        <p className="text-[10px] text-gray-400 pl-1">Paste any YouTube link — youtu.be, full URL, or short URL.</p>
                                    </div>

                                    {/* Curriculum Cascading Selection */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Target Syllabus</label>
                                            <select
                                                value={selectedSyllabus}
                                                onChange={e => {
                                                    setSelectedSyllabus(e.target.value);
                                                    setSelectedGrade("");
                                                    setSelectedSubject("");
                                                    setSelectedTopic("");
                                                }}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark outline-none focus:bg-white focus:border-primary"
                                            >
                                                <option value="">Select Syllabus...</option>
                                                {curriculum.map(s => (
                                                    <option key={s.id} value={s.slug}>{s.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Target Grade</label>
                                            <select
                                                value={selectedGrade}
                                                onChange={e => {
                                                    setSelectedGrade(e.target.value);
                                                    setSelectedSubject("");
                                                    setSelectedTopic("");
                                                }}
                                                disabled={!selectedSyllabus}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark outline-none focus:bg-white focus:border-primary disabled:opacity-40"
                                            >
                                                <option value="">Select Grade...</option>
                                                {activeGrades.map(g => (
                                                    <option key={g.id} value={g.slug}>{g.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Subject *</label>
                                            <select
                                                value={selectedSubject}
                                                onChange={e => {
                                                    setSelectedSubject(e.target.value);
                                                    setSelectedTopic("");
                                                }}
                                                required
                                                disabled={!selectedGrade}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark outline-none focus:bg-white focus:border-primary disabled:opacity-40"
                                            >
                                                <option value="">Select Subject...</option>
                                                {activeSubjects.map(sub => (
                                                    <option key={sub.id} value={sub.name}>{sub.name}</option>
                                                ))}
                                                <option value="Other">+ Add Custom Subject</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Topic</label>
                                            <select
                                                value={selectedTopic}
                                                onChange={e => setSelectedTopic(e.target.value)}
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark outline-none focus:bg-white focus:border-primary"
                                            >
                                                <option value="">Select Topic...</option>
                                                {activeTopics.map(t => (
                                                    <option key={t.id} value={t.name}>{t.name}</option>
                                                ))}
                                                <option value="Other">+ Add Custom Topic</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Custom Subject / Topic Input if "Other" selected */}
                                    {selectedSubject === "Other" && (
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Custom Subject Name</label>
                                            <input
                                                type="text"
                                                value={customSubject}
                                                onChange={e => setCustomSubject(e.target.value)}
                                                placeholder="e.g. Further Mathematics"
                                                required
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                        </div>
                                    )}

                                    {selectedTopic === "Other" && (
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Custom Topic Name</label>
                                            <input
                                                type="text"
                                                value={customTopic}
                                                onChange={e => setCustomTopic(e.target.value)}
                                                placeholder="e.g. Vectors & Matrices"
                                                required
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Description (optional)</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            placeholder="Brief description of what this lesson covers..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary outline-none transition-all resize-none"
                                        />
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

            {/* Video Edit Modal */}
            {editingVideo && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 z-50">
                    <div className="bg-white rounded-3xl border border-gray-100 max-w-md w-full p-6 shadow-2xl space-y-4">
                        <h3 className="text-lg font-black text-dark border-b border-gray-50 pb-2">Edit Lesson</h3>
                        <form onSubmit={handleEditVideoSubmit} className="space-y-3 text-xs">
                            <div>
                                <label className="font-bold text-gray-400 block mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    className="w-full border border-gray-100 rounded-xl p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-bold text-gray-400 block mb-1">YouTube URL</label>
                                <input
                                    type="text"
                                    value={editYoutubeUrl}
                                    onChange={e => setEditYoutubeUrl(e.target.value)}
                                    className="w-full border border-gray-100 rounded-xl p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-bold text-gray-400 block mb-1">Description</label>
                                <textarea
                                    value={editDescription}
                                    onChange={e => setEditDescription(e.target.value)}
                                    rows={3}
                                    className="w-full border border-gray-100 rounded-xl p-2.5 resize-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingVideo(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-xl font-bold shadow-glow-primary cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

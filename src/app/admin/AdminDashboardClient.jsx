"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    Database, Inbox, Check, X, Plus, Trash2, Edit2,
    RefreshCw, LogOut, ShieldCheck, Info, Mail, AlertTriangle, ArrowRight, AlertCircle
} from "lucide-react";

export default function AdminDashboardClient() {
    const supabase = createClient();
    const router = useRouter();
    
    const [activeTab, setActiveTab] = useState("applications"); // "applications" | "database"
    const [applications, setApplications] = useState([]);
    const [loadingApps, setLoadingApps] = useState(true);
    
    // DB Manager States
    const [selectedModel, setSelectedModel] = useState("syllabus");
    const [records, setRecords] = useState([]);
    const [loadingDb, setLoadingDb] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [dbError, setDbError] = useState("");

    // Cascading Dropdown States for Modal
    const [formSyllabusId, setFormSyllabusId] = useState("");
    const [formGradeId, setFormGradeId] = useState("");
    const [formSubjectId, setFormSubjectId] = useState("");
    const [formTopicId, setFormTopicId] = useState("");

    // Foreign Key Lookup Tables
    const [lookupSyllabuses, setLookupSyllabuses] = useState([]);
    const [lookupGrades, setLookupGrades] = useState([]);
    const [lookupSubjects, setLookupSubjects] = useState([]);
    const [lookupTopics, setLookupTopics] = useState([]);
    const [lookupTutors, setLookupTutors] = useState([]);

    // Rejection Modal States
    const [rejectingApp, setRejectingApp] = useState(null);
    const [rejectionMessage, setRejectionMessage] = useState("");

    const modelsList = [
        { id: "syllabus", name: "Syllabuses" },
        { id: "grade", name: "Grades" },
        { id: "subject", name: "Subjects" },
        { id: "topic", name: "Topics" },
        { id: "video", name: "Videos" },
        { id: "material", name: "Materials" },
        { id: "tutor", name: "Tutors" },
        { id: "review", name: "Reviews" },
        { id: "student", name: "Students" },
        { id: "tutorapplication", name: "Applications" },
        { id: "contactmessage", name: "Contact Messages" }
    ];

    const fetchApplications = async () => {
        setLoadingApps(true);
        try {
            const res = await fetch("/api/admin/applications");
            if (res.ok) {
                const data = await res.json();
                setApplications(data);
            }
        } catch (err) {
            console.error("Error fetching applications:", err);
        } finally {
            setLoadingApps(false);
        }
    };

    const fetchLookups = async () => {
        try {
            const [sylRes, grdRes, subRes, topRes, tutRes] = await Promise.all([
                fetch("/api/admin/db/syllabus"),
                fetch("/api/admin/db/grade"),
                fetch("/api/admin/db/subject"),
                fetch("/api/admin/db/topic"),
                fetch("/api/admin/db/tutor"),
            ]);
            if (sylRes.ok) setLookupSyllabuses(await sylRes.json());
            if (grdRes.ok) setLookupGrades(await grdRes.json());
            if (subRes.ok) setLookupSubjects(await subRes.json());
            if (topRes.ok) setLookupTopics(await topRes.json());
            if (tutRes.ok) setLookupTutors(await tutRes.json());
        } catch (e) {
            console.error("Error loading lookups:", e);
        }
    };

    const fetchDbRecords = async (model) => {
        setLoadingDb(true);
        setDbError("");
        try {
            const res = await fetch(`/api/admin/db/${model}`);
            if (res.ok) {
                const data = await res.json();
                setRecords(data);
            } else {
                const err = await res.json();
                setDbError(err.error || "Failed to load database records");
            }
        } catch (err) {
            setDbError("Network error fetching records");
        } finally {
            setLoadingDb(false);
        }
    };

    useEffect(() => {
        if (activeTab === "applications") {
            fetchApplications();
        } else {
            fetchDbRecords(selectedModel);
            fetchLookups();
        }
    }, [activeTab, selectedModel]);

    const handleApplicationApprove = async (id) => {
        try {
            const res = await fetch("/api/admin/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, action: "approve" })
            });
            if (res.ok) {
                fetchApplications();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to process application");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleApplicationRejectConfirm = async () => {
        if (!rejectingApp) return;
        try {
            const res = await fetch("/api/admin/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: rejectingApp.id,
                    action: "reject",
                    rejectionMessage
                })
            });
            if (res.ok) {
                setRejectingApp(null);
                fetchApplications();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to reject application");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openRejectModal = (app) => {
        setRejectingApp(app);
        setRejectionMessage(
`<p>Dear ${app.name},</p>
<p>Thank you for your application to join TutorHub.LK as a tutor.</p>
<p>After reviewing your application, we are unable to approve your tutor profile at this time.</p>
<p>If you have any questions or feel this decision was made in error, please contact us directly at <a href="mailto:tutorhubadmin@gmail.com">tutorhubadmin@gmail.com</a>.</p>`
        );
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    // Database CRUD Handlers
    const handleDeleteRecord = async (rec) => {
        if (selectedModel === "student" && rec.email === "tutorhubadmin@gmail.com") {
            if (!confirm("⚠️ WARNING: This is the primary Administrator account! Are you sure you want to delete the admin record?")) return;
        } else {
            if (!confirm("Are you sure you want to delete this record?")) return;
        }

        try {
            const res = await fetch(`/api/admin/db/${selectedModel}?id=${rec.id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                fetchDbRecords(selectedModel);
            } else {
                const err = await res.json();
                alert(err.error || "Failed to delete record");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openCreateModal = () => {
        setEditingRecord(null);
        setFormSyllabusId("");
        setFormGradeId("");
        setFormSubjectId("");
        setFormTopicId("");

        const template = records[0] ? { ...records[0] } : {};
        delete template.id;
        delete template.slug; // Hide slug field from manual entry
        delete template.createdAt;
        delete template.updatedAt;
        
        // Remove relation objects from template
        ["syllabus", "grade", "subject", "topic", "tutor", "materials", "videos", "grades", "subjects", "topics", "reviews"].forEach(k => delete template[k]);

        Object.keys(template).forEach(k => {
            if (Array.isArray(template[k])) {
                template[k] = "";
            } else if (typeof template[k] === "boolean") {
                template[k] = false;
            } else {
                template[k] = "";
            }
        });

        // Set default foreign keys if lookups exist
        if (selectedModel === "grade" && lookupSyllabuses.length > 0) {
            const sylId = lookupSyllabuses[0].id;
            setFormSyllabusId(sylId);
            template.syllabusId = sylId;
        }
        if (selectedModel === "subject" && lookupGrades.length > 0) {
            const grd = lookupGrades[0];
            setFormSyllabusId(grd.syllabusId || (grd.syllabus ? grd.syllabus.id : ""));
            setFormGradeId(grd.id);
            template.gradeId = grd.id;
        }
        if (selectedModel === "topic" && lookupSubjects.length > 0) {
            const sub = lookupSubjects[0];
            const grdId = sub.gradeId || (sub.grade ? sub.grade.id : "");
            const sylId = sub.grade?.syllabusId || (sub.grade?.syllabus ? sub.grade.syllabus.id : "");
            setFormSyllabusId(sylId);
            setFormGradeId(grdId);
            setFormSubjectId(sub.id);
            template.subjectId = sub.id;
        }
        if ((selectedModel === "video" || selectedModel === "material") && lookupTopics.length > 0) {
            const top = lookupTopics[0];
            const subId = top.subjectId || (top.subject ? top.subject.id : "");
            const grdId = top.subject?.gradeId || (top.subject?.grade ? top.subject.grade.id : "");
            const sylId = top.subject?.grade?.syllabusId || (top.subject?.grade?.syllabus ? top.subject.grade.syllabus.id : "");
            setFormSyllabusId(sylId);
            setFormGradeId(grdId);
            setFormSubjectId(subId);
            setFormTopicId(top.id);
            template.topicId = top.id;
            if (selectedModel === "video" && lookupTutors.length > 0) {
                template.tutorId = lookupTutors[0].id;
            }
        }

        setFormData(template);
        setShowFormModal(true);
    };

    const openEditModal = (record) => {
        if (selectedModel === "student" && record.email === "tutorhubadmin@gmail.com") {
            if (!confirm("⚠️ NOTICE: You are editing the Administrator student account record (tutorhubadmin@gmail.com). Proceed with caution.")) return;
        }
        setEditingRecord(record);
        
        // Populate cascading states from record relationships
        if (selectedModel === "grade") {
            setFormSyllabusId(record.syllabusId || record.syllabus?.id || "");
        } else if (selectedModel === "subject") {
            setFormGradeId(record.gradeId || record.grade?.id || "");
            setFormSyllabusId(record.grade?.syllabusId || record.grade?.syllabus?.id || "");
        } else if (selectedModel === "topic") {
            setFormSubjectId(record.subjectId || record.subject?.id || "");
            setFormGradeId(record.subject?.gradeId || record.subject?.grade?.id || "");
            setFormSyllabusId(record.subject?.grade?.syllabusId || record.subject?.grade?.syllabus?.id || "");
        } else if (selectedModel === "video" || selectedModel === "material") {
            setFormTopicId(record.topicId || record.topic?.id || "");
            setFormSubjectId(record.topic?.subjectId || record.topic?.subject?.id || "");
            setFormGradeId(record.topic?.subject?.gradeId || record.topic?.subject?.grade?.id || "");
            setFormSyllabusId(record.topic?.subject?.grade?.syllabusId || record.topic?.subject?.grade?.syllabus?.id || "");
        }

        const data = { ...record };
        delete data.createdAt;
        delete data.updatedAt;
        delete data.slug;
        ["syllabus", "grade", "subject", "topic", "tutor", "materials", "videos", "grades", "subjects", "topics", "reviews"].forEach(k => delete data[k]);

        Object.keys(data).forEach(k => {
            if (Array.isArray(data[k])) {
                data[k] = data[k].join(", ");
            }
        });
        setFormData(data);
        setShowFormModal(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setDbError("");

        const cleanedData = { ...formData };

        // Auto-generate slug from name or title if creating a new record
        if (!cleanedData.slug && (cleanedData.name || cleanedData.title)) {
            const raw = cleanedData.name || cleanedData.title;
            cleanedData.slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        }

        Object.keys(cleanedData).forEach(k => {
            const val = cleanedData[k];
            if (k === "languages" || k === "qualifications" || k === "specializations" || k === "prerequisites" || k === "learningOutcomes") {
                cleanedData[k] = typeof val === "string" ? val.split(",").map(s => s.trim()).filter(Boolean) : val;
            }
            if (k === "order" || k === "estimatedHours" || k === "rating" || k === "reviewsCount" || k === "lessonsCount" || k === "studentsCount") {
                cleanedData[k] = val === "" ? null : Number(val);
            }
        });

        try {
            const method = editingRecord ? "PUT" : "POST";
            const res = await fetch(`/api/admin/db/${selectedModel}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedData)
            });

            if (res.ok) {
                setShowFormModal(false);
                fetchDbRecords(selectedModel);
                fetchLookups();
            } else {
                const err = await res.json();
                setDbError(err.error || "Failed to save record");
            }
        } catch (err) {
            setDbError("Network error saving record");
        }
    };

    // Filter lookup options for cascading dropdowns
    const filteredGrades = lookupGrades.filter(g => !formSyllabusId || g.syllabusId === formSyllabusId || g.syllabus?.id === formSyllabusId);
    const filteredSubjects = lookupSubjects.filter(s => !formGradeId || s.gradeId === formGradeId || s.grade?.id === formGradeId);
    const filteredTopics = lookupTopics.filter(t => !formSubjectId || t.subjectId === formSubjectId || t.subject?.id === formSubjectId);

    // Dynamic table columns for clean relational rendering
    const renderTableHeaders = () => {
        if (selectedModel === "syllabus") return ["Name", "Slug"];
        if (selectedModel === "grade") return ["Name", "Slug", "Order", "Target Syllabus"];
        if (selectedModel === "subject") return ["Name", "Slug", "Target Grade", "Target Syllabus"];
        if (selectedModel === "topic") return ["Name", "Slug", "Target Subject", "Target Grade", "Target Syllabus"];
        if (selectedModel === "video") return ["Title", "YouTube ID", "Topic", "Subject", "Grade", "Syllabus", "Tutor"];
        if (selectedModel === "material") return ["Title", "URL", "Topic", "Subject", "Grade", "Syllabus"];
        if (selectedModel === "tutor") return ["Name", "Subject", "Type", "Email", "Phone", "Location", "Online", "Physical", "Rating"];
        if (selectedModel === "tutorapplication") return ["Name", "Email", "Phone", "Category", "Subjects", "Syllabuses", "Mediums", "Location", "Online", "Physical", "Status"];
        if (records.length > 0) return Object.keys(records[0]).slice(0, 8);
        return [];
    };

    const renderTableCell = (rec, colName) => {
        const lower = colName.toLowerCase();
        if (lower === "name") return rec.name;
        if (lower === "slug") return rec.slug;
        if (lower === "order") return rec.order ?? 0;
        if (lower === "title") return rec.title;
        if (lower === "youtube id") return rec.youtubeId;
        if (lower === "url") return <a href={rec.url} target="_blank" rel="noreferrer" className="text-primary underline">{rec.url}</a>;
        if (lower === "subject") return rec.subject || rec.topic?.subject?.name || "-";
        if (lower === "type" || lower === "category") return rec.tutorType || "-";
        if (lower === "email") return rec.email;
        if (lower === "phone") return rec.phone || "-";
        if (lower === "location") return rec.location || "-";
        if (lower === "online") return rec.onlineAvailable ? "✅ Yes" : "No";
        if (lower === "physical") return rec.physicalAvailable ? "✅ Yes" : "No";
        if (lower === "rating") return rec.rating ? rec.rating.toFixed(1) : "5.0";
        if (lower === "mediums") return rec.mediums || rec.languages?.join(", ") || "-";
        if (lower === "subjects") return rec.subjects || rec.specializations?.join(", ") || "-";
        if (lower === "syllabuses") return rec.syllabuses || (Array.isArray(rec.syllabuses) ? rec.syllabuses.join(", ") : "-");
        if (lower === "status") {
            const s = rec.status || "pending";
            const colors = { approved: "text-green-700 bg-green-50", rejected: "text-red-700 bg-red-50", pending: "text-amber-700 bg-amber-50" };
            return <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${colors[s] || ""}`}>{s}</span>;
        }

        // Relational Parent Columns
        if (lower.includes("syllabus")) {
            return rec.syllabus?.name || rec.grade?.syllabus?.name || rec.subject?.grade?.syllabus?.name || rec.topic?.subject?.grade?.syllabus?.name || "-";
        }
        if (lower.includes("grade")) {
            return rec.grade?.name || rec.subject?.grade?.name || rec.topic?.subject?.grade?.name || "-";
        }
        if (lower.includes("subject")) {
            return rec.subject?.name || rec.topic?.subject?.name || rec.subject || "-";
        }
        if (lower.includes("topic")) {
            return rec.topic?.name || "-";
        }
        if (lower.includes("tutor")) {
            return rec.tutor?.name || "-";
        }

        const key = Object.keys(rec).find(k => k.toLowerCase() === lower);
        const val = key ? rec[key] : undefined;
        if (typeof val === "object" && val !== null) return JSON.stringify(val);
        return String(val ?? "-");
    };

    return (
        <main className="min-h-screen bg-background text-dark pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 mb-3">
                            <ShieldCheck size={14} />
                            Administrator Console
                        </span>
                        <h1 className="text-3xl font-black text-dark tracking-tight">System Administration</h1>
                        <p className="text-gray-400 text-sm mt-1">Review onboardings and inspect database tables directly.</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 border border-gray-100 bg-white hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>

                {/* Tabs Switcher */}
                <div className="flex border-b border-gray-100 mb-8">
                    <button
                        onClick={() => setActiveTab("applications")}
                        className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                            activeTab === "applications"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-400 hover:text-dark"
                        }`}
                    >
                        <Inbox size={16} />
                        Tutor Applications
                    </button>
                    <button
                        onClick={() => setActiveTab("database")}
                        className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                            activeTab === "database"
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-400 hover:text-dark"
                        }`}
                    >
                        <Database size={16} />
                        Database Manager
                    </button>
                </div>

                {/* Tab content */}
                {activeTab === "applications" ? (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-dark flex items-center gap-2">
                                <Inbox size={18} className="text-primary" />
                                Onboarding Approvals
                            </h2>
                            <button
                                onClick={fetchApplications}
                                className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>

                        {loadingApps ? (
                            <div className="text-center py-20 text-gray-400 text-sm">
                                Loading applications...
                            </div>
                        ) : applications.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                                No tutor applications submitted yet.
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {applications.map((app) => (
                                    <div key={app.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-extrabold text-lg text-dark">{app.name}</h3>
                                                    
                                                    {/* Duplicate warning badge */}
                                                    {app.isDuplicate && (
                                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                                                            <AlertTriangle size={11} />
                                                            {app.hasExistingTutorAccount ? "Already Approved Tutor" : `Submitted ${app.submissionCount}x`}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-400">{app.email} · {app.phone || "No phone"}</p>
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                                                app.status === "approved"
                                                    ? "bg-green-50 border-green-100 text-green-700"
                                                    : app.status === "rejected"
                                                        ? "bg-red-50 border-red-100 text-red-700"
                                                        : "bg-amber-50 border-amber-100 text-amber-700"
                                            }`}>
                                                {app.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Tutor Category</span>
                                                <span className="block text-primary mt-0.5 font-bold">{app.tutorType || "Private Tutor"}</span>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Location & Formats</span>
                                                <span className="block text-dark mt-0.5 font-semibold">
                                                    {app.location || "Online only"} ({[app.onlineAvailable && "Online", app.physicalAvailable && "Physical"].filter(Boolean).join(", ") || "Online"})
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Subjects & Syllabuses</span>
                                                <span className="block text-dark mt-0.5 font-semibold">{app.subjects} ({app.syllabuses})</span>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Mediums & University</span>
                                                <span className="block text-dark mt-0.5 font-semibold">{app.mediums || "English"} · {app.university || "N/A"}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Bio / Qualifications</span>
                                            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/20 p-3.5 rounded-xl border border-gray-100/50">{app.bio}</p>
                                        </div>

                                        {app.status === "pending" && (
                                            <div className="flex items-center gap-3 pt-2">
                                                <button
                                                    onClick={() => handleApplicationApprove(app.id)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-glow-primary transition-all cursor-pointer"
                                                >
                                                    <Check size={14} />
                                                    Approve Application
                                                </button>
                                                <button
                                                    onClick={() => openRejectModal(app)}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 border border-gray-100 hover:border-red-200 text-red-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                                                >
                                                    <X size={14} />
                                                    Reject with Message...
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Sidebar selector */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-1 lg:sticky lg:top-28">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Select Model Table</span>
                                {modelsList.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setSelectedModel(m.id)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left cursor-pointer ${
                                            selectedModel === m.id
                                                ? "bg-primary/10 text-primary"
                                                : "text-gray-400 hover:bg-gray-50 hover:text-dark"
                                        }`}
                                    >
                                        <Database size={14} />
                                        <span>{m.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DB Table Content */}
                        <div className="lg:col-span-9 space-y-6">
                            
                            {/* Entity Relationships Map Banner */}
                            <div className="p-4 bg-gradient-to-r from-gray-900 to-dark rounded-3xl text-white space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-primary-light uppercase tracking-wider">
                                    <Info size={14} />
                                    <span>Database Entity Relationships Map</span>
                                </div>
                                <div className="text-[11px] text-gray-300 flex flex-wrap items-center gap-2 font-mono pt-1">
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Syllabus</span>
                                    <ArrowRight size={12} className="text-primary" />
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Grade</span>
                                    <ArrowRight size={12} className="text-primary" />
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Subject</span>
                                    <ArrowRight size={12} className="text-primary" />
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Topic</span>
                                    <ArrowRight size={12} className="text-primary" />
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold">Video / Material</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-lg font-extrabold text-dark flex items-center gap-2">
                                    <Database size={18} className="text-primary" />
                                    {modelsList.find(m => m.id === selectedModel)?.name}
                                </h2>
                                <button
                                    onClick={openCreateModal}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-glow-primary transition-all cursor-pointer"
                                >
                                    <Plus size={14} />
                                    Create Record
                                </button>
                            </div>

                            {loadingDb ? (
                                <div className="text-center py-20 text-gray-400 text-sm">
                                    Loading database records...
                                </div>
                            ) : records.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 text-sm">
                                    No records found in this table.
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-50 bg-gray-50/50">
                                                    {renderTableHeaders().map((h) => (
                                                        <th key={h} className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                            {h}
                                                        </th>
                                                    ))}
                                                    <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 text-xs">
                                                {records.map((rec) => {
                                                    const isAdminAccount = selectedModel === "student" && rec.email === "tutorhubadmin@gmail.com";
                                                    return (
                                                        <tr key={rec.id} className={`hover:bg-gray-50/30 transition-colors ${isAdminAccount ? 'bg-amber-50/30 font-bold' : ''}`}>
                                                            {renderTableHeaders().map((h) => (
                                                                <td key={h} className="px-5 py-4 max-w-[200px] truncate font-medium text-gray-600">
                                                                    {isAdminAccount && h.toLowerCase() === "email" ? (
                                                                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-bold">
                                                                            <ShieldCheck size={12} />
                                                                            {rec.email} (ADMIN)
                                                                        </span>
                                                                    ) : (
                                                                        renderTableCell(rec, h)
                                                                    )}
                                                                </td>
                                                            ))}
                                                            <td className="px-5 py-4 text-right space-x-1.5 whitespace-nowrap">
                                                                <button
                                                                    onClick={() => openEditModal(rec)}
                                                                    className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer"
                                                                >
                                                                    <Edit2 size={13} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteRecord(rec)}
                                                                    className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all cursor-pointer"
                                                                >
                                                                    <Trash2 size={13} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Form Modal with Full Cascading Selections & Auto-slug */}
                {showFormModal && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fadeIn">
                        <div className="bg-white rounded-3xl border border-gray-100 max-w-xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto">
                            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                                <h3 className="text-lg font-black text-dark">
                                    {editingRecord ? "Edit Record" : "Create Record"} in {selectedModel}
                                </h3>
                                <button
                                    onClick={() => setShowFormModal(false)}
                                    className="p-1 text-gray-400 hover:text-dark rounded-xl cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {dbError && (
                                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs">
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <span>{dbError}</span>
                                </div>
                            )}

                            <form onSubmit={handleFormSubmit} className="space-y-4">

                                {/* 1. Cascading Syllabus Selector for Grade, Subject, Topic, Video, Material */}
                                {(selectedModel === "grade" || selectedModel === "subject" || selectedModel === "topic" || selectedModel === "video" || selectedModel === "material") && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Syllabus</label>
                                        <select
                                            value={formSyllabusId}
                                            onChange={(e) => {
                                                const sylId = e.target.value;
                                                setFormSyllabusId(sylId);
                                                setFormGradeId("");
                                                setFormSubjectId("");
                                                setFormTopicId("");
                                                if (selectedModel === "grade") {
                                                    setFormData(prev => ({ ...prev, syllabusId: sylId }));
                                                } else {
                                                    setFormData(prev => ({ ...prev, gradeId: "", subjectId: "", topicId: "" }));
                                                }
                                            }}
                                            required
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                        >
                                            <option value="">Select Syllabus...</option>
                                            {lookupSyllabuses.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} ({s.slug})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* 2. Cascading Grade Selector for Subject, Topic, Video, Material */}
                                {(selectedModel === "subject" || selectedModel === "topic" || selectedModel === "video" || selectedModel === "material") && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Grade</label>
                                        <select
                                            value={formGradeId}
                                            onChange={(e) => {
                                                const grdId = e.target.value;
                                                setFormGradeId(grdId);
                                                setFormSubjectId("");
                                                setFormTopicId("");
                                                if (selectedModel === "subject") {
                                                    setFormData(prev => ({ ...prev, gradeId: grdId }));
                                                } else {
                                                    setFormData(prev => ({ ...prev, subjectId: "", topicId: "" }));
                                                }
                                            }}
                                            required
                                            disabled={!formSyllabusId}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none disabled:opacity-40"
                                        >
                                            <option value="">Select Grade...</option>
                                            {filteredGrades.map(g => (
                                                <option key={g.id} value={g.id}>{g.name} ({g.slug})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* 3. Cascading Subject Selector for Topic, Video, Material */}
                                {(selectedModel === "topic" || selectedModel === "video" || selectedModel === "material") && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Subject</label>
                                        <select
                                            value={formSubjectId}
                                            onChange={(e) => {
                                                const subId = e.target.value;
                                                setFormSubjectId(subId);
                                                setFormTopicId("");
                                                if (selectedModel === "topic") {
                                                    setFormData(prev => ({ ...prev, subjectId: subId }));
                                                } else {
                                                    setFormData(prev => ({ ...prev, topicId: "" }));
                                                }
                                            }}
                                            required
                                            disabled={!formGradeId}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none disabled:opacity-40"
                                        >
                                            <option value="">Select Subject...</option>
                                            {filteredSubjects.map(s => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* 4. Cascading Topic Selector for Video & Material */}
                                {(selectedModel === "video" || selectedModel === "material") && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Topic</label>
                                        <select
                                            value={formTopicId}
                                            onChange={(e) => {
                                                const topId = e.target.value;
                                                setFormTopicId(topId);
                                                setFormData(prev => ({ ...prev, topicId: topId }));
                                            }}
                                            required
                                            disabled={!formSubjectId}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none disabled:opacity-40"
                                        >
                                            <option value="">Select Topic...</option>
                                            {filteredTopics.map(t => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Other standard input fields */}
                                {Object.keys(formData).map((k) => {
                                    if (k === "id" || k === "slug") return null;
                                    if (k === "syllabusId" || k === "gradeId" || k === "subjectId" || k === "topicId") return null; // already rendered above
                                    
                                    const isBool = typeof formData[k] === "boolean";

                                    if (k === "tutorId") {
                                        return (
                                            <div key={k} className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tutor *</label>
                                                <select
                                                    value={formData[k] ?? ""}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, [k]: e.target.value }))}
                                                    required
                                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark focus:bg-white focus:border-primary outline-none"
                                                >
                                                    <option value="">Select Tutor...</option>
                                                    {lookupTutors.map(tut => (
                                                        <option key={tut.id} value={tut.id}>{tut.name} ({tut.email})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={k} className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                                {k}
                                            </label>
                                            {isBool ? (
                                                <input
                                                    type="checkbox"
                                                    checked={formData[k]}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, [k]: e.target.checked }))}
                                                    className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-200 cursor-pointer"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={formData[k] ?? ""}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, [k]: e.target.value }))}
                                                    placeholder={`Enter ${k}`}
                                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-xs text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                />
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => setShowFormModal(false)}
                                        className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold text-xs rounded-xl transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-glow-primary transition-all cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Rejection Modal */}
                {rejectingApp && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 z-50">
                        <div className="bg-white rounded-3xl border border-gray-100 max-w-lg w-full p-6 shadow-2xl space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                <h3 className="text-base font-extrabold text-dark flex items-center gap-2">
                                    <Mail size={16} className="text-red-500" />
                                    Reject Application & Send Email
                                </h3>
                                <button onClick={() => setRejectingApp(null)} className="text-gray-400 hover:text-dark">
                                    <X size={16} />
                                </button>
                            </div>

                            <p className="text-xs text-gray-500">
                                Applicant: <strong>{rejectingApp.name}</strong> ({rejectingApp.email})
                            </p>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                    Custom Rejection Email Body (HTML Supported)
                                </label>
                                <textarea
                                    value={rejectionMessage}
                                    onChange={e => setRejectionMessage(e.target.value)}
                                    rows={8}
                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl p-3 text-xs text-dark font-mono outline-none focus:bg-white focus:border-red-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setRejectingApp(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 font-bold text-xs rounded-xl cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApplicationRejectConfirm}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                                >
                                    Confirm Rejection & Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}

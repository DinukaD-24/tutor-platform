"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    Database, Inbox, Check, X, Plus, Trash2, Edit2,
    RefreshCw, LogOut, ShieldCheck, FileText, AlertCircle
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

    const modelsList = [
        { id: "syllabus", name: "Syllabuses" },
        { id: "grade", name: "Grades" },
        { id: "subject", name: "Subjects" },
        { id: "topic", name: "Topics" },
        { id: "video", name: "Videos" },
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
        }
    }, [activeTab, selectedModel]);

    const handleApplicationAction = async (id, action) => {
        try {
            const res = await fetch("/api/admin/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, action })
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    // Database CRUD Handlers
    const handleDeleteRecord = async (id) => {
        if (!confirm("Are you sure you want to delete this record?")) return;
        try {
            const res = await fetch(`/api/admin/db/${selectedModel}?id=${id}`, {
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
        // Pre-fill model fields based on existing record keys or defaults
        const template = records[0] ? { ...records[0] } : {};
        delete template.id;
        delete template.createdAt;
        delete template.updatedAt;
        
        // Ensure all values are empty strings/null for typing
        Object.keys(template).forEach(k => {
            if (Array.isArray(template[k])) {
                template[k] = ""; // input parses list separated by comma
            } else if (typeof template[k] === "boolean") {
                template[k] = false;
            } else {
                template[k] = "";
            }
        });
        setFormData(template);
        setShowFormModal(true);
    };

    const openEditModal = (record) => {
        setEditingRecord(record);
        const data = { ...record };
        delete data.createdAt;
        delete data.updatedAt;
        
        // Convert arrays to comma-separated strings for easy input fields
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

        // Parse list formats and types
        const cleanedData = { ...formData };
        Object.keys(cleanedData).forEach(k => {
            const val = cleanedData[k];
            // If the field name usually represents an array or was originally one
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
            } else {
                const err = await res.json();
                setDbError(err.error || "Failed to save record");
            }
        } catch (err) {
            setDbError("Network error saving record");
        }
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
                                                <h3 className="font-extrabold text-lg text-dark">{app.name}</h3>
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

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">University</span>
                                                <span className="block text-dark mt-0.5 font-semibold">{app.university || "Not specified"}</span>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Subjects</span>
                                                <span className="block text-dark mt-0.5 font-semibold">{app.subjects}</span>
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Syllabuses</span>
                                                <span className="block text-dark mt-0.5 font-semibold">{app.syllabuses}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <span className="block font-bold text-gray-400 uppercase tracking-wider text-[9px]">Bio / Qualifications</span>
                                            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/20 p-3.5 rounded-xl border border-gray-100/50">{app.bio}</p>
                                        </div>

                                        {app.status === "pending" && (
                                            <div className="flex items-center gap-3 pt-2">
                                                <button
                                                    onClick={() => handleApplicationAction(app.id, "approve")}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-glow-primary transition-all cursor-pointer"
                                                >
                                                    <Check size={14} />
                                                    Approve Application
                                                </button>
                                                <button
                                                    onClick={() => handleApplicationAction(app.id, "reject")}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 border border-gray-100 hover:border-red-200 text-red-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                                                >
                                                    <X size={14} />
                                                    Reject
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
                                                    {Object.keys(records[0]).slice(0, 5).map((k) => (
                                                        <th key={k} className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                            {k}
                                                        </th>
                                                    ))}
                                                    <th className="px-5 py-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 text-xs">
                                                {records.map((rec) => (
                                                    <tr key={rec.id} className="hover:bg-gray-50/30 transition-colors">
                                                        {Object.keys(rec).slice(0, 5).map((k) => (
                                                            <td key={k} className="px-5 py-4 max-w-[200px] truncate font-medium text-gray-600">
                                                                {typeof rec[k] === "object" && rec[k] !== null
                                                                    ? JSON.stringify(rec[k])
                                                                    : String(rec[k] ?? "")}
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
                                                                onClick={() => handleDeleteRecord(rec.id)}
                                                                className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all cursor-pointer"
                                                            >
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Form Modal */}
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
                                {Object.keys(formData).map((k) => {
                                    if (k === "id") return null;
                                    const isBool = typeof formData[k] === "boolean";
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

            </div>
        </main>
    );
}

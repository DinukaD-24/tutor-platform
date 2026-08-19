"use client";

import { useState, useEffect } from "react";
import { Award, ShieldCheck, Zap, Send, CheckCircle, Users, BookOpen, TrendingUp, MapPin, Globe } from "lucide-react";

const benefits = [
    {
        icon: <Award size={20} />,
        title: "Build Your Brand",
        desc: "Get a premium verified educator profile visible to thousands of students actively searching for tutors in your subject area.",
    },
    {
        icon: <ShieldCheck size={20} />,
        title: "Earn Verified Status",
        desc: "Submit your qualifications and earn a Verified badge that increases your credibility and booking rate with students and parents.",
    },
    {
        icon: <Zap size={20} />,
        title: "Grow Organically",
        desc: "Be discovered through subject and topic pages — no ad spend required. Students come to you when they are already ready to learn.",
    },
    {
        icon: <TrendingUp size={20} />,
        title: "Track Your Impact",
        desc: "See how many students viewed your profile, which subjects drive interest, and how your reviews are growing over time.",
    },
];

const stats = [
    { value: "50+",    label: "Tutors Onboarded" },
    { value: "1,000+", label: "Active Students"  },
    { value: "4.9",    label: "Avg. Tutor Rating" },
];

const presetSyllabuses = ["Local A/L", "Local O/L", "Edexcel", "Cambridge", "Other / Extra Curricular"];

export default function BecomeATutorPage() {
    const [submitted, setSubmitted] = useState(false);
    const [liveStats, setLiveStats] = useState({ tutors: "50+", students: "1,000+", avgRating: "4.9" });

    useEffect(() => {
        fetch("/api/stats")
            .then(res => res.json())
            .then(data => {
                if (data?.formatted) {
                    setLiveStats({
                        tutors: data.formatted.tutors,
                        students: data.formatted.students,
                        avgRating: data.formatted.avgRating,
                    });
                }
            })
            .catch(err => console.error(err));
    }, []);

    const stats = [
        { value: liveStats.tutors,    label: "Tutors Onboarded" },
        { value: liveStats.students, label: "Active Students"  },
        { value: liveStats.avgRating,    label: "Avg. Tutor Rating" },
    ];

    const [form, setForm] = useState({
        name: "", email: "", phone: "", university: "",
        tutorType: "Private Tutor",
        experience: "", bio: "", location: "",
        teachingStyle: "", image: "",
        onlineAvailable: true, physicalAvailable: false,
    });

    const [subjectsList, setSubjectsList] = useState([]);
    const [subjectInput, setSubjectInput] = useState("");

    const [syllabusesList, setSyllabusesList] = useState([]);
    const [syllabusInput, setSyllabusInput] = useState("");

    const [mediumsList, setMediumsList] = useState([]);
    const [mediumInput, setMediumInput] = useState("");

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm((prev) => ({ ...prev, [e.target.name]: value }));
    };

    // Subject handlers
    const handleAddSubject = () => {
        const trimmed = subjectInput.trim();
        if (trimmed && !subjectsList.includes(trimmed)) {
            setSubjectsList([...subjectsList, trimmed]);
            setSubjectInput("");
        }
    };

    const handleRemoveSubject = (subToRemove) => {
        setSubjectsList(subjectsList.filter((s) => s !== subToRemove));
    };

    // Syllabus handlers
    const handleAddSyllabus = (val) => {
        const trimmed = (val || syllabusInput).trim();
        if (trimmed && !syllabusesList.includes(trimmed)) {
            setSyllabusesList([...syllabusesList, trimmed]);
            setSyllabusInput("");
        }
    };

    const handleRemoveSyllabus = (sylToRemove) => {
        setSyllabusesList(syllabusesList.filter((s) => s !== sylToRemove));
    };

    // Medium handlers
    const handleAddMedium = (val) => {
        const trimmed = (val || mediumInput).trim();
        if (trimmed && !mediumsList.includes(trimmed)) {
            setMediumsList([...mediumsList, trimmed]);
            setMediumInput("");
        }
    };

    const handleRemoveMedium = (medToRemove) => {
        setMediumsList(mediumsList.filter((m) => m !== medToRemove));
    };

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (subjectsList.length === 0) {
            setError("Please add at least one subject you teach.");
            return;
        }

        if (syllabusesList.length === 0) {
            setError("Please add at least one target syllabus.");
            return;
        }

        if (mediumsList.length === 0) {
            setError("Please add at least one medium of instruction.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/become-a-tutor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    subjects: subjectsList,
                    syllabuses: syllabusesList,
                    mediums: mediumsList,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to submit application.");
            }
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        Become a Partner
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                        Grow Your Teaching Career with{" "}
                        <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                            TutorHub.LK
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Create your profile, showcase your teaching credentials, and let students across Sri Lanka discover your unique learning programs.
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <strong className="block text-2xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">{s.value}</strong>
                                <span className="text-xs text-gray-400 font-semibold">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left Column — Benefits */}
                    <div className="lg:col-span-5 space-y-5">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-7">
                            <h2 className="text-xl font-extrabold text-dark">Why partner with us?</h2>
                            <div className="space-y-6">
                                {benefits.map((b) => (
                                    <div key={b.title} className="flex gap-4 items-start">
                                        <div className="p-3 bg-primary/5 text-primary rounded-xl shrink-0">
                                            {b.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-dark text-sm">{b.title}</h3>
                                            <p className="text-gray-500 text-xs mt-1 leading-relaxed">{b.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who can apply */}
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white space-y-3">
                            <h3 className="font-extrabold text-base flex items-center gap-2">
                                <Users size={18} /> Who can apply?
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    "University students teaching A/L or O/L",
                                    "Professional tutors with class experience",
                                    "Subject-matter experts building online presence",
                                    "Former teachers offering private tuition",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-xs text-white/80">
                                        <CheckCircle size={12} className="text-white shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column — Application Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            {submitted ? (
                                <div className="text-center py-16 space-y-4">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle size={32} className="text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-dark">Application Received!</h2>
                                    <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                                        Thank you for applying, <strong>{form.name}</strong>. Our team will review your application and reach out to <strong>{form.email}</strong> within 3 business days.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-xs font-bold text-primary border border-primary/20 hover:border-primary px-4 py-2 rounded-xl transition-all cursor-pointer"
                                    >
                                        Submit Another Application
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-dark">Tutor Application</h2>
                                        <p className="text-xs text-gray-400 mt-1">Fields marked * are required.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { name: "name",       label: "Full Name *",         type: "text",  placeholder: "Your full name"            },
                                            { name: "email",      label: "Email Address *",      type: "email", placeholder: "your@email.com"             },
                                            { name: "phone",      label: "Phone Number",         type: "tel",   placeholder: "+94 7X XXX XXXX"            },
                                            { name: "university", label: "University / Institution", type: "text", placeholder: "e.g. University of Colombo" },
                                        ].map((field) => (
                                            <div key={field.name} className="space-y-1.5">
                                                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">{field.label}</label>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={form[field.name]}
                                                    onChange={handleChange}
                                                    required={field.label.includes("*")}
                                                    placeholder={field.placeholder}
                                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-3 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tutor Type / Category */}
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Tutor Category / Type *</label>
                                        <select
                                            name="tutorType"
                                            value={form.tutorType}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-3 text-sm text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all cursor-pointer"
                                        >
                                            <option value="Private Tutor">Private Tutor</option>
                                            <option value="School Teacher">School Teacher</option>
                                            <option value="University Lecturer">University Lecturer</option>
                                            <option value="University Student">University Student</option>
                                            <option value="Institute Educator">Institute Educator</option>
                                            <option value="Online Specialist">Online Specialist</option>
                                        </select>
                                    </div>

                                    {/* Location & Class Format (Optional at application time) */}
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-3">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                            <MapPin size={14} className="text-primary" /> Location & Class Format (Optional)
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">Town / Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={form.location}
                                                onChange={handleChange}
                                                placeholder="e.g. Nugegoda, Kandy, Galle..."
                                                className="w-full border border-gray-100 bg-white rounded-xl px-3 py-2 text-xs text-dark outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-4 pt-1">
                                            <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="onlineAvailable"
                                                    checked={form.onlineAvailable}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded text-primary border-gray-200"
                                                />
                                                Available for Online Classes
                                            </label>
                                            <label className="flex items-center gap-2 text-xs font-semibold text-dark cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="physicalAvailable"
                                                    checked={form.physicalAvailable}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded text-primary border-gray-200"
                                                />
                                                Available for Physical Classes
                                            </label>
                                        </div>
                                    </div>

                                    {/* Subjects Tag Input */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Subjects You Teach *</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={subjectInput}
                                                onChange={(e) => setSubjectInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleAddSubject();
                                                    }
                                                }}
                                                placeholder="Type subject & press Enter or Add..."
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleAddSubject()}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark transition-all cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {subjectsList.map((sub) => (
                                                <span key={sub} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold">
                                                    {sub}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSubject(sub)}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Syllabuses Tag Input */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Target Syllabuses *</label>
                                        
                                        {/* Quick Preset Buttons */}
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            {presetSyllabuses.map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => handleAddSyllabus(preset)}
                                                    className="px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors cursor-pointer"
                                                >
                                                    + {preset}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={syllabusInput}
                                                onChange={(e) => setSyllabusInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleAddSyllabus();
                                                    }
                                                }}
                                                placeholder="Type syllabus or click presets above..."
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleAddSyllabus()}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark transition-all cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {syllabusesList.map((syl) => (
                                                <span key={syl} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-dark/10 text-primary-dark border border-primary-dark/20 rounded-xl text-xs font-bold">
                                                    {syl}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSyllabus(syl)}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mediums of Instruction Tag Input */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Mediums of Instruction *</label>
                                        
                                        {/* Quick Preset Buttons */}
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            {["English", "Sinhala", "Tamil"].map((preset) => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => handleAddMedium(preset)}
                                                    className="px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors cursor-pointer"
                                                >
                                                    + {preset}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={mediumInput}
                                                onChange={(e) => setMediumInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleAddMedium();
                                                    }
                                                }}
                                                placeholder="Type medium or click presets above..."
                                                className="flex-1 border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleAddMedium()}
                                                className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-dark transition-all cursor-pointer shrink-0"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {mediumsList.map((med) => (
                                                <span key={med} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                                                    {med}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveMedium(med)}
                                                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Years of Teaching Experience</label>
                                        <select
                                            name="experience"
                                            value={form.experience}
                                            onChange={handleChange}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-3 text-sm text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        >
                                            <option value="">Select...</option>
                                            <option>Less than 1 year</option>
                                            <option>1–2 years</option>
                                            <option>3–5 years</option>
                                            <option>5+ years</option>
                                        </select>
                                    </div>

                                    {/* Profile Photo Uploader */}
                                    <div className="space-y-1.5 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/80">
                                        <label className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                                            Profile Photo (Optional)
                                        </label>
                                        <div className="flex items-center gap-4">
                                            {form.image ? (
                                                <img
                                                    src={form.image}
                                                    alt="Profile preview"
                                                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0">
                                                    Photo
                                                </div>
                                            )}
                                            <div className="flex-1 space-y-1">
                                                <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm">
                                                    Upload Photo
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
                                                                    setForm(prev => ({ ...prev, image: compressedDataUrl }));
                                                                };
                                                                img.src = event.target.result;
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                    />
                                                </label>
                                                {form.image && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm(prev => ({ ...prev, image: "" }))}
                                                        className="block text-[11px] text-red-500 font-semibold hover:underline cursor-pointer"
                                                    >
                                                        Remove photo
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Teaching Methodology / Style */}
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">
                                            Teaching Methodology & Style (Optional)
                                        </label>
                                        <textarea
                                            name="teachingStyle"
                                            value={form.teachingStyle}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Describe your teaching approach (e.g. Past paper discussion, concept visualization, interactive problem solving)..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-3 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Short Bio *</label>
                                        <textarea
                                            name="bio"
                                            value={form.bio}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Tell students about your teaching style, qualifications, and what makes your classes unique..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-3 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                        />
                                    </div>
                                    
                                    {error && (
                                        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                                            {error}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold text-sm rounded-2xl shadow-glow-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={16} />
                                        {loading ? "Submitting..." : "Submit Application"}
                                    </button>
                                    
                                    <p className="text-[10px] text-gray-400 text-center">
                                        By submitting, you agree to be contacted by the TutorHub team.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

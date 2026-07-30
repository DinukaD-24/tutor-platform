"use client";

import { useState } from "react";
import { Award, ShieldCheck, Zap, Send, CheckCircle, Users, BookOpen, TrendingUp } from "lucide-react";

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

export default function BecomeATutorPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "", email: "", phone: "", university: "",
        syllabuses: "", experience: "", bio: "",
    });
    const [subjectsList, setSubjectsList] = useState(["Combined Maths", "Physics"]);
    const [subjectInput, setSubjectInput] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

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

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (subjectsList.length === 0) {
            setError("Please add at least one subject you teach.");
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
                            TutorHub
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
                                        className="text-xs font-bold text-primary border border-primary/20 hover:border-primary px-4 py-2 rounded-xl transition-all"
                                    >
                                        Submit Another Application
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-dark">Tutor Application</h2>
                                        <p className="text-xs text-gray-400 mt-1">All fields marked * are required.</p>
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
                                                 onClick={handleAddSubject}
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

                                     <div className="space-y-1.5">
                                         <label className="block text-[10px] font-bold text-dark uppercase tracking-wider">Syllabuses *</label>
                                         <select
                                             name="syllabuses"
                                             value={form.syllabuses}
                                             onChange={handleChange}
                                             required
                                             className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-3 text-sm text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                         >
                                             <option value="">Select syllabus...</option>
                                             <option>Local A/L</option>
                                             <option>Local O/L</option>
                                             <option>Edexcel</option>
                                             <option>Cambridge</option>
                                             <option>Multiple</option>
                                         </select>
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

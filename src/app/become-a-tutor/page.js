"use client";

import { Award, ShieldCheck, Zap, Send, Mail, MapPin } from "lucide-react";

export default function BecomeATutorPage() {
    return (
        <section className="pt-28 pb-20 bg-background">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Page Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        Become a Partner
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight">
                        Grow Your Teaching Career with{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            TutorHub
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Create your profile, showcase your teaching credentials, and let students across Sri Lanka discover your unique learning programs.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Why Join Card */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-8">
                            <h2 className="text-2xl font-bold text-dark">
                                Why partner with us?
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-primary/5 text-primary rounded-xl shrink-0">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-base">Build Your Brand</h3>
                                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                            Create a professional profile displaying your background, student testimonials, and specialized subjects.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-secondary/5 text-secondary rounded-xl shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-base">Credibility & Trust</h3>
                                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                            Stand out as a verified educator. Our badge status helps build quick trust with parents and students.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-base">Expand Your Reach</h3>
                                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                                            Gain visibility among students searching specifically for your syllabus, subjects, and grade levels.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Contact Info */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                            <h3 className="font-bold text-dark">Need help onboarding?</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                Feel free to reach out directly if you have any questions about registration or profile setup.
                            </p>
                            <div className="space-y-2 text-xs text-gray-500 pt-2">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-primary" />
                                    <span>tutorhubadmin@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-primary" />
                                    <span>Colombo, Sri Lanka</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Tutor Onboarding Form */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            
                            <h2 className="text-2xl font-bold text-dark mb-2">Tutor Registration</h2>
                            <p className="text-xs text-gray-400">Fill in your information to start setting up your educator profile.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-dark">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-dark">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-dark">
                                        Primary Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        placeholder="e.g. Combined Maths, Physics"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-dark">
                                        Tutor Classification
                                    </label>
                                    <select 
                                        required
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    >
                                        <option value="">Select your background</option>
                                        <option value="student">University Student</option>
                                        <option value="private">Private Tutor</option>
                                        <option value="school">School Teacher</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark">
                                    Target Syllabuses (Select all that apply)
                                </label>
                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    {["Local A/L", "Local O/L", "Edexcel", "Cambridge"].map((syllabus) => (
                                        <label key={syllabus} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-200" 
                                            />
                                            <span>{syllabus}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark">
                                    Teaching Bio & Experience
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                    placeholder="Briefly describe your tutoring background, qualifications, and teaching methodology..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                                    w-full
                                    sm:w-auto
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-8
                                    py-4
                                    bg-primary
                                    text-white
                                    font-bold
                                    text-sm
                                    rounded-xl
                                    shadow-glow-primary
                                    hover:bg-primary-dark
                                    hover:-translate-y-0.5
                                    transition-all
                                    duration-200
                                    cursor-pointer
                                "
                            >
                                <Send size={16} />
                                Submit Application
                            </button>                    
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

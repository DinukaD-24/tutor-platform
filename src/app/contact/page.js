"use client";

import { Mail, MapPin, Clock, Award } from "lucide-react";

export default function ContactPage() {
    return (
        <section className="pt-28 pb-20 bg-background">
            <div className="max-w-6xl mx-auto px-6">

                {/* Hero Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        ✉️ Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight">
                        We'd Love to{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Hear from You
                        </span>
                    </h1>
                    <p className="text-gray-500">
                        Have questions about the platform, or interested in joining us as a registered tutor? Drop us a message below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                            <h2 className="text-2xl font-bold text-dark mb-4">
                                Contact Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-primary/5 text-primary rounded-xl shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-sm">Email Address</h3>
                                        <p className="text-gray-500 text-sm mt-0.5">info@tutorhub.lk</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-secondary/5 text-secondary rounded-xl shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-sm">Office Location</h3>
                                        <p className="text-gray-500 text-sm mt-0.5">Colombo, Sri Lanka</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="p-3 bg-red-50 text-red-500 rounded-xl shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-sm">Response Time</h3>
                                        <p className="text-gray-500 text-sm mt-0.5">Usually replies within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Become a Tutor Callout */}
                        <div className="bg-gradient-to-tr from-primary to-primary-dark rounded-3xl p-8 text-white shadow-lg space-y-4">
                            <Award size={32} className="text-white/90" />
                            <h3 className="text-xl font-bold">Join as a Registered Tutor</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                Share your expertise and connect with students across Sri Lanka. Fill out the form or email us to begin onboarding.
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Form Container */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-dark">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-dark">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark">
                                    Subject / Reason
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    placeholder="e.g. Inquiring about Local A/L Physics tuition, Tutor Onboarding"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-dark">
                                    Message
                                </label>
                                <textarea
                                    rows="5"
                                    required
                                    className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                    placeholder="Tell us how we can help..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                                    w-full
                                    sm:w-auto
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
                                Send Message
                            </button>                    
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
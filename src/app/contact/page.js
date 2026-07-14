"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle, HelpCircle, ChevronDown, Clock, MessageSquare } from "lucide-react";

const faqs = [
    { q: "How quickly will you respond?",          a: "We typically respond within 24 hours on weekdays. For urgent tutor inquiries, please include your phone number in the message." },
    { q: "I want to report an issue with a tutor profile.", a: "Use the message form and select 'Report an Issue' as your subject. Our team will review the report within 48 hours." },
    { q: "Can I suggest a new subject or syllabus?", a: "Absolutely. We welcome curriculum expansion suggestions. Use the contact form and mention the syllabus and subjects you'd like added." },
    { q: "Is there a phone number I can call?",    a: "We currently operate via email and our contact form. You can also reach us directly at tutorhubadmin@gmail.com for faster responses." },
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Static submission — in Phase 4 this will POST to an API
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-background text-dark">

            {/* ── Page Hero ── */}
            <section className="pt-28 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight">
                        We would love to{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            hear from you
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Whether you have a question, want to join as a tutor, or just want to say hello — our team is ready to help.
                    </p>
                </div>
            </section>

            {/* ── Main Grid ── */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT: Contact Details */}
                    <div className="lg:col-span-4 space-y-5">

                        {/* Contact Cards */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                            <h2 className="font-extrabold text-dark text-base border-b border-gray-50 pb-3">Contact Details</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-primary/5 text-primary rounded-xl shrink-0">
                                        <Mail size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
                                        <a
                                            href="mailto:tutorhubadmin@gmail.com"
                                            className="text-sm font-bold text-dark hover:text-primary transition-colors"
                                        >
                                            tutorhubadmin@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-secondary/5 text-secondary rounded-xl shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</span>
                                        <span className="text-sm font-bold text-dark">Colombo, Sri Lanka</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Response Time</span>
                                        <span className="text-sm font-bold text-dark">Within 24 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Become a Tutor CTA */}
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white space-y-3">
                            <MessageSquare size={20} className="text-white/80" />
                            <h3 className="font-extrabold text-base">Want to teach on TutorHub?</h3>
                            <p className="text-white/75 text-xs leading-relaxed">
                                Join our growing network of verified educators and start reaching students across Sri Lanka today.
                            </p>
                            <Link
                                href="/become-a-tutor"
                                className="inline-flex items-center gap-2 text-xs font-bold bg-white text-primary px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all mt-2"
                            >
                                Apply as a Tutor
                            </Link>
                        </div>

                    </div>

                    {/* RIGHT: Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">

                            {submitted ? (
                                /* Success State */
                                <div className="text-center py-12 space-y-4">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle size={32} className="text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-dark">Message Sent!</h2>
                                    <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                                        Thank you for reaching out. We will get back to you at <strong>{form.email}</strong> within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "General Inquiry", message: "" }); }}
                                        className="text-xs font-bold text-primary hover:text-primary-dark border border-primary/20 hover:border-primary px-4 py-2 rounded-xl transition-all"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                /* Form */
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <h2 className="text-xl font-extrabold text-dark">Send us a Message</h2>
                                        <p className="text-xs text-gray-400 mt-1">All fields are required.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-bold text-dark uppercase tracking-wider">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your full name"
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-bold text-dark uppercase tracking-wider">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                                className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-dark uppercase tracking-wider">Subject</label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm text-dark focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Become a Tutor</option>
                                            <option>Student Support</option>
                                            <option>Report an Issue</option>
                                            <option>Partnership Inquiry</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-dark uppercase tracking-wider">Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold text-sm rounded-xl shadow-glow-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                                    >
                                        <Send size={16} />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-6 space-y-8">
                    <div className="text-center space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10">
                            FAQ
                        </span>
                        <h2 className="text-2xl font-extrabold text-dark">Common Questions</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <details key={faq.q} className="group bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-bold text-dark text-sm list-none">
                                    <span className="flex items-center gap-2">
                                        <HelpCircle size={15} className="text-primary/70 shrink-0" />
                                        {faq.q}
                                    </span>
                                    <ChevronDown size={15} className="text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
                                </summary>
                                <div className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}

import Link from "next/link";
import {
    Heart, Compass, Target, CheckCircle, ArrowRight,
    Users, BookOpen, Award, TrendingUp, HelpCircle, ChevronDown
} from "lucide-react";
import { getSiteStats } from "@/utils/getData";

export const dynamic = "force-dynamic";

const timeline = [
    { year: "April 2026", title: "The Concept & Vision", desc: "TutorHub.LK was conceived by engineering undergraduates to solve Sri Lanka's fragmented tutor discovery process with a clean, structured directory." },
    { year: "May 2026", title: "Platform Architecture", desc: "Built a structured database model for Local A/L, O/L, Edexcel, and Cambridge syllabuses, onboarding our first cohort of verified educators." },
    { year: "July 2026", title: "Media & Verified Profiles", desc: "Expanded tutor profiles with sample video tutorial highlights, verified credentials, and direct email communication channels." },
    { year: "August 2026", title: "Tuition Request Board & Beyond", desc: "Launched student tuition request posts, live search filters, and an interactive community wall connecting students and tutors island-wide." },
];

const faqs = [
    { q: "Is TutorHub free for students?", a: "Yes! Browsing verified tutors, exploring syllabuses, watching sample video lessons, and posting tuition requests on TutorHub is 100% free for students." },
    { q: "How do I become a tutor on TutorHub?", a: "Click 'Become a Tutor' in the navigation bar, submit your academic qualifications and teaching details, and our admin team will review your application for verification." },
    { q: "How do Student Tuition Requests work?", a: "Students can post custom tuition requests (specifying grade/age, syllabus, subjects, theory/revision, sports or music skills). Approved tutors can browse the request wall and contact students directly via email!" },
    { q: "What syllabuses and subjects does TutorHub support?", a: "We support Local A/L, Local O/L, Edexcel, Cambridge, and custom extra-curricular subjects (sports, music, language skills, and non-standard courses)." },
    { q: "How can tutors and students contact each other?", a: "Students can send direct email messages to tutors from their profile page. Tutors can also contact students who post tuition requests through our verified email dispatch system." },
    { q: "How are tutors verified?", a: "Tutors submit their university affiliation, academic credentials, and teaching experience during registration. Each profile is manually reviewed before receiving the Verified Profile badge." },
];

export default async function AboutPage() {
    const siteStats = await getSiteStats();

    const stats = [
        { number: siteStats?.formatted?.subjects || "500+",   label: "Subjects Offered",      desc: "Local & International" },
        { number: siteStats?.formatted?.tutors || "50+",    label: "Verified Tutors",        desc: "Active Educators" },
        { number: siteStats?.formatted?.students || "1,000+", label: "Active Students",        desc: "Learning Daily" },
        { number: siteStats?.formatted?.syllabuses || "4",      label: "Syllabuses Supported",   desc: "Local, Edexcel, Cambridge" },
    ];

    return (
        <main className="min-h-screen bg-background text-dark">

            {/* ── Hero ── */}
            <section className="pt-28 pb-20 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
                        About TutorHub.LK
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tight leading-tight">
                        Connecting Students with the{" "}
                        <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                            Right Tutors
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
                        TutorHub is Sri Lanka's modern tutor discovery platform — built to bridge the gap between talented educators and students searching for structured, syllabus-aligned learning.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link href="/syllabus" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold shadow-glow-primary hover:-translate-y-0.5 transition-all duration-200">
                            Browse Syllabuses <ArrowRight size={16} />
                        </Link>
                        <Link href="/become-a-tutor" className="inline-flex items-center gap-2 border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5 px-6 py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition-all duration-200">
                            Become a Tutor
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50/30 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-white rounded-3xl border border-gray-100 p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(33,131,150,0.05)] transition-all duration-300">
                                <strong className="block text-4xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">{s.number}</strong>
                                <span className="block text-sm font-bold text-dark mt-2">{s.label}</span>
                                <span className="block text-xs text-gray-400 mt-1">{s.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Mission & Vision ── */}
            <section className="py-20 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-8 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-dark">Our Mission</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                To organize tuition resources across Sri Lanka into a clear, syllabus-aligned structure so every student can find a verified tutor matching their exact subject, syllabus, and learning needs.
                            </p>
                        </div>

                        <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-8 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <Compass size={24} />
                            </div>
                            <h3 className="text-2xl font-extrabold text-dark">Our Vision</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                To become Sri Lanka's leading educational directory — empowering verified educators to showcase their expertise while providing students transparent, free access to quality learning.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="py-20 bg-gray-50/30 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-extrabold text-dark tracking-tight">Our Journey</h2>
                        <p className="text-gray-500 text-sm">How TutorHub grew from an idea into Sri Lanka's dedicated tutor directory.</p>
                    </div>

                    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-32 space-y-10 pl-6">
                        {timeline.map((item) => (
                            <div key={item.year} className="relative group">
                                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary group-hover:scale-125 transition-transform" />
                                <span className="md:absolute md:-left-36 md:top-0 text-sm font-black text-primary tracking-tight">
                                    {item.year}
                                </span>
                                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-1">
                                    <h4 className="font-extrabold text-dark text-base">{item.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ Section ── */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6 space-y-10">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-extrabold text-dark tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-gray-500 text-sm">Have questions about how TutorHub works? We&apos;ve got answers.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group bg-gray-50/50 rounded-2xl border border-gray-100 p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-dark text-sm">
                                    <span>{faq.q}</span>
                                    <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <p className="text-gray-500 text-xs leading-relaxed mt-3 pt-3 border-t border-gray-100">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}

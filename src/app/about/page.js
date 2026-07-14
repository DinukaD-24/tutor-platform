import Link from "next/link";
import {
    Heart, Compass, Target, CheckCircle, ArrowRight,
    Users, BookOpen, Award, TrendingUp, HelpCircle, ChevronDown
} from "lucide-react";

const stats = [
    { number: "500+",   label: "Subjects Offered",      desc: "Local & International" },
    { number: "50+",    label: "Verified Tutors",        desc: "Active Educators" },
    { number: "1,000+", label: "Active Students",        desc: "Learning Daily" },
    { number: "4",      label: "Syllabuses Supported",   desc: "Local, Edexcel, Cambridge" },
];

const timeline = [
    { year: "2023", title: "The Idea", desc: "TutorHub was conceived by a group of undergraduate students who struggled to find structured, syllabus-aligned resources during their A/L preparation." },
    { year: "2024", title: "Building the Foundation", desc: "We built a structured data model for the Sri Lankan, Edexcel, and Cambridge syllabuses and launched the first version of the platform with a small group of tutors." },
    { year: "2025", title: "Growing the Network", desc: "The tutor network expanded to 50+ verified educators. Students began discovering tutors directly through subject and topic pages." },
    { year: "Now",  title: "Phase 3 — Student Experience", desc: "We are building rich tutor profiles, live search and filters, student progress tracking, and preparing for full backend integration." },
];

const faqs = [
    { q: "Is TutorHub free for students?",      a: "Yes. Browsing tutors, subjects, topics, and study materials on TutorHub is completely free for students. Individual tutor session fees are set by the tutors themselves." },
    { q: "How do I become a tutor on TutorHub?", a: "Click the 'Become a Tutor' button in the navigation bar or visit the dedicated registration page to submit your educator profile for review." },
    { q: "What syllabuses does TutorHub support?", a: "We currently support Local A/L, Local O/L, Edexcel, and Cambridge syllabuses. More curricula are planned for the next phase." },
    { q: "Can I contact a tutor directly?",     a: "Yes. Each tutor profile displays their email, phone, and location so students can reach out directly to arrange lessons." },
    { q: "How are tutors verified?",            a: "Tutors submit their qualifications and academic credentials during registration. Our team manually reviews each application before awarding Verified status." },
];

export default function AboutPage() {
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
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
                                <strong className="block text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{s.number}</strong>
                                <span className="block text-sm font-bold text-dark mt-2">{s.label}</span>
                                <span className="block text-xs text-gray-400 mt-1">{s.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Mission & How It Works ── */}
            <section className="py-20 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-8 space-y-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-2xl w-fit">
                            <Heart size={22} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-dark">Our Mission</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Finding the right tutor in Sri Lanka is harder than it should be. Many talented university students and educators struggle to reach the right audience, while students struggle to find quality tutoring that matches their specific syllabus. TutorHub bridges this gap by bringing both sides into one clean, accessible discovery platform.
                        </p>
                    </div>
                    <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-8 space-y-4">
                        <div className="p-3 bg-primary/5 text-primary rounded-2xl w-fit">
                            <Compass size={22} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-dark">How It Works</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Tutors create detail-rich profiles showcasing their teaching styles, subjects, qualifications, and syllabuses they cover. Students browse by syllabus, grade, and subject — comparing teaching approaches, reviews, and rates before directly contacting an educator.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Benefits ── */}
            <section className="py-20 bg-gray-50/50 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6 space-y-12">
                    <div className="text-center space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10">
                            Why TutorHub
                        </span>
                        <h2 className="text-3xl font-extrabold text-dark">Built for both sides of learning</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Students */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <h3 className="text-xl font-extrabold text-dark flex items-center gap-2">
                                <BookOpen size={20} className="text-secondary" /> For Students
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Browse qualified tutors across all national and international syllabuses",
                                    "Filter by subject, syllabus, rate, availability, and tutor type",
                                    "Read reviews and compare teaching styles before committing",
                                    "Explore topic-level resources including video lessons and study notes",
                                    "Contact tutors directly — no middlemen, no platform fees",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-500">
                                        <CheckCircle size={15} className="text-secondary shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Tutors */}
                        <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <h3 className="text-xl font-extrabold text-dark flex items-center gap-2">
                                <Award size={20} className="text-primary" /> For Tutors
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Build a professional educator profile showcasing your credentials and style",
                                    "Be discovered by students actively searching for your subject and syllabus",
                                    "Earn a Verified badge to build trust with parents and students",
                                    "Gain visibility across thousands of students without any upfront costs",
                                    "Grow your tuition classes organically through platform discovery",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-500">
                                        <CheckCircle size={15} className="text-primary shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Our Story Timeline ── */}
            <section className="py-20 bg-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-6 space-y-12">
                    <div className="text-center space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
                            Our Story
                        </span>
                        <h2 className="text-3xl font-extrabold text-dark">How we got here</h2>
                    </div>
                    <div className="relative space-y-0">
                        {/* Vertical line */}
                        <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent" />
                        {timeline.map((item, index) => (
                            <div key={item.year} className="relative flex gap-6 pb-10 last:pb-0">
                                {/* Year bubble */}
                                <div className="w-20 shrink-0 flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-primary text-primary text-[10px] font-black flex items-center justify-center z-10 shrink-0 shadow-sm">
                                        {item.year}
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-5 space-y-1.5 flex-1 mb-2">
                                    <h3 className="font-extrabold text-dark text-base">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Vision Banner ── */}
            <section className="py-20 bg-gray-50/50 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                        <div className="space-y-3 max-w-xl">
                            <div className="flex items-center gap-2">
                                <Target size={20} />
                                <span className="font-bold text-white/80 text-sm uppercase tracking-wider">Our Vision</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                                Becoming Sri Lanka's largest educational discovery platform
                            </h2>
                            <p className="text-white/75 text-sm leading-relaxed">
                                We aim to connect millions of students with verified tutor options across local and international curricula — and eventually power a fully integrated learning management ecosystem.
                            </p>
                        </div>
                        <Link
                            href="/tutors"
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-primary font-bold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all shadow-lg shrink-0"
                        >
                            Explore Tutors <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6 space-y-10">
                    <div className="text-center space-y-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10">
                            FAQ
                        </span>
                        <h2 className="text-3xl font-extrabold text-dark">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <details key={faq.q} className="group bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-bold text-dark text-sm list-none">
                                    <span className="flex items-center gap-2">
                                        <HelpCircle size={16} className="text-primary/70 shrink-0" />
                                        {faq.q}
                                    </span>
                                    <ChevronDown size={16} className="text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
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

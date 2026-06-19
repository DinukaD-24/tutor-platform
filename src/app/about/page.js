import { Heart, Compass, CheckCircle, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage () {
    return (
        <section className="pt-28 pb-20 bg-background">
            <div className="max-w-5xl mx-auto px-6">
                
                {/* Page Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        🎓 About Our Mission
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                        Connecting Students with the{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Right Tutors
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        TutorHub connects students with qualified tutors, giving tutors a platform to showcase their teaching style and reach more students across Sri Lanka.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Mission Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-2xl w-fit">
                            <Heart size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-dark">
                            Our Mission
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Finding the right tutor can be difficult. Many talented university students and educators struggle to reach the right audience, while students struggle to find quality resources matching their specific syllabus. TutorHub bridges this gap by bringing both sides into one clean, accessible discovery platform.
                        </p>
                    </div>

                    {/* How It Works Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
                        <div className="p-3 bg-primary/5 text-primary rounded-2xl w-fit">
                            <Compass size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-dark">
                            How It Works
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Tutors create detail-rich profiles showcasing their teaching styles, subjects, and target syllabuses. Students can browse these profiles by syllabus, grade, and subject, comparing approaches to find the perfect educational partner.
                        </p>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Benefits for Students */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                        <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                            <CheckCircle className="text-secondary shrink-0" size={20} />
                            Benefits for Students
                        </h3>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span>Browse qualified tutors across all national and international syllabuses.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span>Explore various teaching materials, reviews, and credentials before joining.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span>Find customized teaching styles that suit your learning speed.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Benefits for Tutors */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                        <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                            <CheckCircle className="text-primary shrink-0" size={20} />
                            Benefits for Tutors
                        </h3>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                                <span>Promote your teaching style, experience, and custom curriculum packages.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                                <span>Reach thousands of active students searching for specific help.</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                                <span>Build visual credibility and grow your tuition classes directly.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Future Vision Banner */}
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                    
                    <div className="space-y-4 max-w-xl">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Target size={24} />
                            Our Future Vision
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                            We aim to become Sri Lanka's largest educational discovery platform, helping millions of students connect with verified tutor options across local and international curricula.
                        </p>
                    </div>

                    <Link 
                        href="/contact" 
                        className="
                            inline-flex 
                            items-center 
                            gap-2 
                            px-6 
                            py-3.5 
                            bg-white 
                            text-primary 
                            font-bold 
                            rounded-2xl 
                            hover:bg-gray-50 
                            hover:scale-103 
                            transition-all
                            shadow-lg
                            shrink-0
                        "
                    >
                        Get Started Today
                        <ArrowRight size={18} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
import { BookOpen, UserCheck, Sparkles, MessageSquare, Compass } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default function HowItWorksSection() {
    const steps = [
        {
            title: "Browse Subjects & Syllabuses",
            desc: "Navigate through Local A/L, O/L, Edexcel, and Cambridge syllabuses to locate specific subject syllabuses and curriculum topics.",
            icon: <BookOpen className="text-primary group-hover:scale-110 transition-transform" size={24} />,
            badge: "Step 1",
        },
        {
            title: "Explore Verified Profiles",
            desc: "View verified tutor credentials, subject specialties, teaching medium, and student ratings.",
            icon: <UserCheck className="text-primary group-hover:scale-110 transition-transform" size={24} />,
            badge: "Step 2",
            isDark: true, // Featured Dark Slate Card (#0F2537)
        },
        {
            title: "Match Teaching Styles",
            desc: "Review tutor bios and paper class methods to find a teacher whose approach fits your goals.",
            icon: <Sparkles className="text-primary group-hover:scale-110 transition-transform" size={24} />,
            badge: "Step 3",
        },
        {
            title: "Connect & Begin Learning",
            desc: "Reach out directly to arrange class schedules, request sessions, and start learning.",
            icon: <MessageSquare className="text-primary group-hover:scale-110 transition-transform" size={24} />,
            badge: "Step 4",
        },
    ];

    return (
        <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 shadow-2xs">
                        <Compass size={13} />
                        Simple Process
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-tight">
                        How TutorHub Works
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        Our simple step-by-step discovery process is designed to connect students with their ideal tutor in just a few clicks.
                    </p>
                </FadeIn>

                {/* Asymmetric Bento Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Step 1 - Wide Card (Span 2) */}
                    <StaggerItem className="md:col-span-2">
                        <div className="group relative bg-gray-50/80 rounded-3xl p-8 border border-gray-100/90 hover:bg-white hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(33,131,150,0.08)] transition-all duration-300 h-full flex flex-col justify-between overflow-hidden">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-white rounded-2xl shadow-xs border border-gray-100 group-hover:bg-primary/10 transition-colors">
                                        {steps[0].icon}
                                    </div>
                                    <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full shadow-2xs">
                                        {steps[0].badge}
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-dark group-hover:text-primary transition-colors tracking-tight">
                                    {steps[0].title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-lg font-medium">
                                    {steps[0].desc}
                                </p>
                            </div>
                            
                            {/* Visual Indicator Chips */}
                            <div className="flex flex-wrap gap-2 pt-6">
                                {["Local A/L", "Local O/L", "Edexcel", "Cambridge"].map((tag) => (
                                    <span key={tag} className="text-[11px] font-extrabold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200/80 shadow-2xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Step 2 - Featured Dark Slate Card (#0F2537) (Span 1) */}
                    <StaggerItem className="md:col-span-1">
                        <div className="group relative bg-dark text-white rounded-3xl p-8 border border-dark hover:border-primary/50 hover:-translate-y-1.5 shadow-xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                                        {steps[1].icon}
                                    </div>
                                    <span className="text-xs font-black text-white bg-white/15 border border-white/20 px-3.5 py-1 rounded-full shadow-2xs">
                                        {steps[1].badge}
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                    {steps[1].title}
                                </h3>
                                <p className="text-gray-300 text-sm mt-3 leading-relaxed font-medium">
                                    {steps[1].desc}
                                </p>
                            </div>
                            <div className="pt-6">
                                <span className="inline-flex items-center gap-1.5 text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    Verified Educators &amp; Protection
                                </span>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Step 3 - Compact Card (Span 1) */}
                    <StaggerItem className="md:col-span-1">
                        <div className="group relative bg-gray-50/80 rounded-3xl p-8 border border-gray-100/90 hover:bg-white hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(33,131,150,0.08)] transition-all duration-300 h-full overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3.5 bg-white rounded-2xl shadow-xs border border-gray-100 group-hover:bg-primary/10 transition-colors">
                                    {steps[2].icon}
                                </div>
                                <span className="text-xs font-black text-gray-500 bg-gray-200/60 px-3.5 py-1 rounded-full">
                                    {steps[2].badge}
                                </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-dark group-hover:text-primary transition-colors tracking-tight">
                                {steps[2].title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-3 leading-relaxed font-medium">
                                {steps[2].desc}
                            </p>
                        </div>
                    </StaggerItem>

                    {/* Step 4 - Compact Card (Span 2) */}
                    <StaggerItem className="md:col-span-2">
                        <div className="group relative bg-gray-50/80 rounded-3xl p-8 border border-gray-100/90 hover:bg-white hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(33,131,150,0.08)] transition-all duration-300 h-full flex flex-col justify-between overflow-hidden">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-white rounded-2xl shadow-xs border border-gray-100 group-hover:bg-primary/10 transition-colors">
                                        {steps[3].icon}
                                    </div>
                                    <span className="text-xs font-black text-gray-500 bg-gray-200/60 px-3.5 py-1 rounded-full">
                                        {steps[3].badge}
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-dark group-hover:text-primary transition-colors tracking-tight">
                                    {steps[3].title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-3 leading-relaxed max-w-lg font-medium">
                                    {steps[3].desc}
                                </p>
                            </div>
                        </div>
                    </StaggerItem>

                </StaggerContainer>

            </div>
        </section>
    );
}

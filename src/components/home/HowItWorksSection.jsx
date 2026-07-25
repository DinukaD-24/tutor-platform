import { BookOpen, UserCheck, Sparkles, MessageSquare } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default function HowItWorksSection() {
    const steps = [
        {
            title: "Browse Subjects & Syllabuses",
            desc: "Navigate through Local A/L, O/L, Edexcel, and Cambridge syllabuses to locate specific subject syllabuses and curriculum topics.",
            icon: <BookOpen className="text-primary" size={24} />,
            badge: "Step 1",
        },
        {
            title: "Explore Verified Profiles",
            desc: "View verified tutor credentials, subject specialties, teaching medium, and student ratings.",
            icon: <UserCheck className="text-primary" size={24} />,
            badge: "Step 2",
            isDark: true, // Featured Dark Slate Card (#0F2537)
        },
        {
            title: "Match Teaching Styles",
            desc: "Review tutor bios and paper class methods to find a teacher whose approach fits your goals.",
            icon: <Sparkles className="text-primary" size={24} />,
            badge: "Step 3",
        },
        {
            title: "Connect & Begin Learning",
            desc: "Reach out directly to arrange class schedules, request sessions, and start learning.",
            icon: <MessageSquare className="text-primary" size={24} />,
            badge: "Step 4",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        How TutorHub Works
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Our simple step-by-step discovery process is designed to connect students with their ideal tutor in just a few clicks.
                    </p>
                </FadeIn>

                {/* Asymmetric Bento Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Step 1 - Wide Card (Span 2) */}
                    <StaggerItem className="md:col-span-2">
                        <div className="group relative bg-gray-50/70 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-white rounded-2xl shadow-xs group-hover:bg-primary/10 transition-colors">
                                        {steps[0].icon}
                                    </div>
                                    <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1 rounded-full">
                                        {steps[0].badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                                    {steps[0].title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-lg">
                                    {steps[0].desc}
                                </p>
                            </div>
                            
                            {/* Visual Indicator Chips */}
                            <div className="flex flex-wrap gap-2 pt-6">
                                {["Local A/L", "Local O/L", "Edexcel", "Cambridge"].map((tag) => (
                                    <span key={tag} className="text-[11px] font-bold text-gray-500 bg-white px-3 py-1 rounded-xl border border-gray-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Step 2 - Featured Dark Slate Card (#0F2537) (Span 1) */}
                    <StaggerItem className="md:col-span-1">
                        <div className="group relative bg-dark text-white rounded-3xl p-8 border border-dark hover:border-primary/50 hover:-translate-y-1 shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-xs">
                                        {steps[1].icon}
                                    </div>
                                    <span className="text-xs font-black text-white bg-white/10 px-3 py-1 rounded-full">
                                        {steps[1].badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    {steps[1].title}
                                </h3>
                                <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                                    {steps[1].desc}
                                </p>
                            </div>
                            <div className="pt-6">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                                    Verified Educators & Badge Protection
                                </span>
                            </div>
                        </div>
                    </StaggerItem>

                    {/* Step 3 - Compact Card (Span 1) */}
                    <StaggerItem className="md:col-span-1">
                        <div className="group relative bg-gray-50/70 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3.5 bg-white rounded-2xl shadow-xs group-hover:bg-primary/10 transition-colors">
                                    {steps[2].icon}
                                </div>
                                <span className="text-xs font-black text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">
                                    {steps[2].badge}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                                {steps[2].title}
                            </h3>
                            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                {steps[2].desc}
                            </p>
                        </div>
                    </StaggerItem>

                    {/* Step 4 - Compact Card (Span 2) */}
                    <StaggerItem className="md:col-span-2">
                        <div className="group relative bg-gray-50/70 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3.5 bg-white rounded-2xl shadow-xs group-hover:bg-primary/10 transition-colors">
                                        {steps[3].icon}
                                    </div>
                                    <span className="text-xs font-black text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">
                                        {steps[3].badge}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                                    {steps[3].title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-lg">
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

import { BookOpen, UserCheck, Sparkles, MessageSquare } from "lucide-react";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui";

export default function HowItWorksSection() {
    const steps = [
        {
            title: "Browse Subjects",
            desc: "Navigate through Local A/L, O/L, Edexcel, and Cambridge syllabuses to locate specific subject syllabuses.",
            icon: <BookOpen className="text-primary" size={24} />,
        },
        {
            title: "Explore Tutor Profiles",
            desc: "View verified tutor details, specialties, qualifications, ratings, and curriculum areas.",
            icon: <UserCheck className="text-primary" size={24} />,
        },
        {
            title: "Match Teaching Styles",
            desc: "Review tutor bios and student reviews to find a teacher whose method aligns with your individual learning needs.",
            icon: <Sparkles className="text-primary" size={24} />,
        },
        {
            title: "Get in Touch",
            desc: "Reach out directly to arrange schedules, request classes, and begin your lessons.",
            icon: <MessageSquare className="text-primary" size={24} />,
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10">
                        Getting Started
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        How TutorHub Works
                    </h2>
                    <p className="text-gray-500">
                        Our simple step-by-step discovery process is designed to connect students with their ideal tutor in just a few clicks.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <StaggerItem key={step.title}>
                            <div className="group relative bg-gray-50/50 rounded-3xl p-8 border border-gray-100 hover:bg-white hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(33,131,150,0.05)] transition-all duration-300">
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md border-4 border-white">
                                    {index + 1}
                                </div>
                                <div className="p-3 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-primary/5 transition-colors mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

            </div>
        </section>
    );
}

import { StaggerContainer, StaggerItem } from "@/components/ui";
import { BookOpen, Users, GraduationCap, Globe } from "lucide-react";

export default function StatisticsSection({ dynamicStats }) {
    const stats = [
        { 
            number: dynamicStats?.formatted?.subjects || "500+",   
            label: "Subjects Offered",    
            description: "Local & International Syllabuses",
            icon: BookOpen 
        },
        { 
            number: dynamicStats?.formatted?.tutors || "50+",    
            label: "Verified Tutors",      
            description: "Direct Student Matches",
            icon: Users
        },
        { 
            number: dynamicStats?.formatted?.students || "1,000+", 
            label: "Active Students",      
            description: "Empowered Daily",
            icon: GraduationCap
        },
        { 
            number: dynamicStats?.formatted?.syllabuses || "4",      
            label: "Syllabuses Supported", 
            description: "Local, Edexcel, and Cambridge",
            icon: Globe
        },
    ];

    return (
        <section className="py-20 lg:py-24 bg-dark text-white relative overflow-hidden">
            {/* Ambient background glow halos */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <StaggerItem key={stat.label}>
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-7 lg:p-8 text-center hover:border-primary/50 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.25)] group flex flex-col items-center justify-between h-full">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary via-emerald-400 to-teal-200 bg-clip-text text-transparent tracking-tight">
                                            {stat.number}
                                        </h3>
                                        <p className="text-white font-extrabold text-base mt-2 tracking-tight">{stat.label}</p>
                                        <p className="text-gray-400 text-xs mt-1 font-medium">{stat.description}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}

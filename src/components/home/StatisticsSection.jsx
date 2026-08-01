import { StaggerContainer, StaggerItem } from "@/components/ui";

export default function StatisticsSection({ dynamicStats }) {
    const stats = [
        { number: dynamicStats?.formatted?.subjects || "500+",   label: "Subjects Offered",    description: "Local & International Syllabuses" },
        { number: dynamicStats?.formatted?.tutors || "50+",    label: "Verified Tutors",      description: "Direct Student Matches"          },
        { number: dynamicStats?.formatted?.students || "1,000+", label: "Active Students",      description: "Empowered Daily"                 },
        { number: dynamicStats?.formatted?.syllabuses || "4",      label: "Syllabuses Supported", description: "Local, Edexcel, and Cambridge"   },
    ];

    return (
        <section className="py-20 bg-dark text-white relative overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <StaggerItem key={stat.label}>
                            <div className="relative bg-white/5 backdrop-blur-xs rounded-3xl border border-white/10 p-8 text-center hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-5xl font-black text-primary tracking-tight">
                                    {stat.number}
                                </h3>
                                <p className="text-white font-bold text-base mt-3">{stat.label}</p>
                                <p className="text-gray-400 text-xs mt-1.5 font-medium">{stat.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

import { StaggerContainer, StaggerItem } from "@/components/ui";

export default function StatisticsSection() {
    const stats = [
        { number: "500+",   label: "Subjects Offered",    description: "Local & International Syllabuses" },
        { number: "50+",    label: "Verified Tutors",      description: "Direct Student Matches"          },
        { number: "1,000+", label: "Active Students",      description: "Empowered Daily"                 },
        { number: "4",      label: "Syllabuses Supported", description: "Local, Edexcel, and Cambridge"   },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50/30 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <StaggerItem key={stat.label}>
                            <div className="relative bg-white rounded-3xl border border-gray-100/80 p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(33,131,150,0.05)] hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-5xl font-black bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent tracking-tight">
                                    {stat.number}
                                </h3>
                                <p className="text-dark font-bold text-base mt-3">{stat.label}</p>
                                <p className="text-gray-400 text-xs mt-1.5 font-medium">{stat.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

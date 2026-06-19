export default function StatisticsSection() {
    const stats = [
        {
            number: "500+",
            label: "Subjects",
            description: "Mapped to official curricula",
        },
        {
            number: "50+",
            label: "Verified Tutors",
            description: "Undergone strict verification",
        },
        {
            number: "1,000+",
            label: "Active Students",
            description: "Empowered daily by partners",
        },
        {
            number: "4",
            label: "Syllabuses Supported",
            description: "Local & International options",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-transparent to-gray-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">
                        TutorHub by the Numbers
                    </h2>
                    <p className="text-gray-500 text-base">
                        Empowering Sri Lankan students and educators by bridging the gap between local resources and international learning standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="
                                relative
                                bg-white 
                                rounded-3xl 
                                border 
                                border-gray-100 
                                p-8 
                                text-center 
                                shadow-[0_8px_30px_rgb(0,0,0,0.015)]
                                hover:shadow-[0_20px_40px_rgba(33,131,150,0.05)]
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                        >
                            <h3 className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                                {stat.number}
                            </h3>

                            <p className="text-dark font-bold text-lg mt-4">
                                {stat.label}
                            </p>
                            
                            <p className="text-gray-400 text-xs mt-2 font-medium">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
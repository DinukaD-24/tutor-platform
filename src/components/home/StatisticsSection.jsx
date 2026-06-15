export default function StatisticsSection() {
    const stats = [
        {
            number: "500+",
            label: "Lessons",
        },
        {
            number: "50+",
            lable: "Tutors",
        },
        {
            number: "1000+",
            lable: "Students",
        },
        {
            number: "4",
            lable: "Syllabuses",
        },
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="border rounded-2xl p-8 text-center"
                        >
                            <h3 className="text-4xl font-bold">
                                {stat.number}
                            </h3>

                            <p className="text-grey-500 mt-2">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
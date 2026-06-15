export default function HowItWorksSection () {
    const steps = [
        "Browse Subjects",
        "Watch Tutor Lessons",
        "Download Study Materials",
        "Find the Tutor Fits You",
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-3xl font-bold text-center mb-12">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className="bg-white rounded-2xl p-6 border"
                        >
                                <div className="text-2xl font-bold mb-4">
                                    {index + 1}
                                </div>

                                <p>
                                    {step}
                                </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
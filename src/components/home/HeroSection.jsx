export default function HeroSection() {
    return (
        <section className="text-center py-24">
            <h1 className="text-5xl font-bold mb-4">
                Discover Different Teaching Styles
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                Learn freely and find tutors that suit you.
            </p>

            <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-black text-white rounded-lg">
                    Browse Lessons
                </button>

                <button className="px-6 py-3 border rounded-lg">
                    Explore Tutors
                </button>
            </div>
        </section>
    );
}
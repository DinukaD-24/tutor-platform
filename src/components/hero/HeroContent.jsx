import Link from "next/link";

export default function HeroContent() {
    return (
        <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-dark">
                Find the{" "}
                <span className="text-primary">
                    Right Tutor
                </span>
                <br/>
                Learn at Your Own Pace.
            </h1>

            <p className="text-lg text-gray-600 max-w-md">
                Explore qualified tutors across multiple syllabuses and find the right teaching style for you.
            </p>

            <div className="flex gap-6">
                <Link 
                    href="/syllabus"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                    Browse Syllabuses
                </Link>

                <Link 
                    href="/become-a-tutor"
                    className="px-6 py-3 border border-color-primary text-color-primary rounded-lg hover:bg-primary hover:text-white transition">
                    Become a Tutor
                </Link>
            </div>
        </div>
    );
}
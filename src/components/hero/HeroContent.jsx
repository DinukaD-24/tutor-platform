import Link from "next/link";

export default function HeroContent() {
    return (
        <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Find the{" "}
                <span className="underline underline-offset-8">
                    Right Tutor
                </span>
                <br/>
                Learn at Your Own Pace.
            </h1>

            <p className="text-lg text-gray-600 max-w-md">
                Explore free lessons, study materials, and teaching styles from tutors across multiple syllabuses.
            </p>

            <div className="flex gap-6">
                <Link 
                    href="/syllabus"
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                    Browse Syllabuses
                </Link>

                <Link 
                    href="/become-a-tutor"
                    className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition">
                    Become a Tutor
                </Link>
            </div>
        </div>
    );
}
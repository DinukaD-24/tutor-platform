import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t mt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between gap-8">

                    <div>
                        <h3 className="text-xl font-bold">
                            TutorHub.LK
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Helping students discover the right tutor
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <Link href="/syllabus">Browse</Link>
                        <Link href="/tutors">Tutors</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <Link href="/">
                    <Image 
                    src="/logo.svg"
                    alt="TutorHub Logo"
                    width={140}
                    height={50}
                    priority
                    />
                </Link>

                <div className="flex gap-6">
                    <Link href="/syllabus">Browse</Link>
                    <Link href="/tutors">Tutors</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>

            </div>

        </nav>
    );
}
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 border-b">
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
                <a href="#">Lessons</a>
                <a href="#">Subjects</a>
                <a href="#">Tutors</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>

        </nav>
    );
}
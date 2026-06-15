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

                <div className="flex gap-6 text-dark font-medium">
                    <Link 
                        href="/syllabus"
                        className="transition-colors hover:text-primary"
                    >
                            Browse
                    </Link>

                    <Link 
                        href="/tutors"
                        className="transition-colors hover:text-primary"
                    >
                            Tutors
                    </Link>

                    <Link 
                        href="/about"
                        className="transition-colors hover:text-primary"
                    >
                            About
                    </Link>

                    <Link 
                        href="/contact"
                        className="transition-colors hover:text-primary"
                    >
                            Contact
                    </Link>                                        

                </div>

            </div>

        </nav>
    );
}
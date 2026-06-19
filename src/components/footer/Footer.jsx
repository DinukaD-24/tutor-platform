import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer () {
    return (
        <footer className="
            mt-auto
            border-t
            border-gray-100
            bg-gray-50/50
            pt-16
            pb-8
        ">
            <div className="
                max-w-7xl
                mx-auto
                px-6
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-4
                gap-10
                pb-12
                border-b
                border-gray-100
            ">

                {/* Brand Column */}
                <div className="space-y-4">
                    <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                        <Image 
                            src="/logo.svg"
                            alt="TutorHub Logo"
                            width={130}
                            height={46}
                        />
                    </Link>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        Connecting Sri Lankan students with qualified, verified tutors across local and international syllabuses.
                    </p>
                    
                    <div className="flex gap-3 pt-2">
                        <a href="#" className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                            </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Explore Column */}
                <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-5">
                        Platform
                    </h4>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link 
                                href="/syllabus"
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                Browse Syllabuses
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/tutors"
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                Explore Tutors
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/become-a-tutor"
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                Become a Tutor
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company Column */}
                <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-5">
                        Company
                    </h4>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link 
                                href="/about"
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/contact"
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                Contact Support
                            </Link>
                        </li>
                        <li>
                            <a 
                                href="#"
                                className="text-gray-500 hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="font-bold text-dark text-sm uppercase tracking-wider mb-5">
                        Get In Touch
                    </h4>

                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex gap-2.5 items-start">
                            <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                            <span>tutorhubadmin@gmail.com</span>
                        </li>
                        <li className="flex gap-2.5 items-start">
                            <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                            <span>Colombo, Sri Lanka</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>© {new Date().getFullYear()} TutorHub.LK. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}
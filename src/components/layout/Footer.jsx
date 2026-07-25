import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const footerLinks = {
    Explore: [
        { label: "Browse Subjects",   href: "/syllabus"         },
        { label: "Find a Tutor",      href: "/tutors"           },
        { label: "Local A/L",         href: "/syllabus/local-al"},
        { label: "Edexcel",           href: "/syllabus/edexcel" },
        { label: "Cambridge",         href: "/syllabus/cambridge"},
    ],
    Platform: [
        { label: "About TutorHub",    href: "/about"            },
        { label: "Become a Tutor",    href: "/become-a-tutor"   },
        { label: "Privacy Policy",    href: "/privacy"          },
        { label: "Terms of Service",  href: "/terms"            },
        { label: "Contact Us",        href: "/contact"          },
        { label: "Dashboard",         href: "/dashboard"        },
    ],
};

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-100 bg-gray-50/50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-gray-100">

                    {/* Brand Column */}
                    <div className="space-y-4 md:col-span-1">
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
                        
                        {/* Social Icons */}
                        <div className="flex gap-2 pt-1">
                            {[
                                { label: "Facebook", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                            ].map((social) => (
                                <a key={social.label} href="#" aria-label={social.label} className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 flex items-center justify-center transition-colors">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group} className="space-y-4">
                            <h4 className="text-xs font-extrabold text-dark uppercase tracking-wider">{group}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-dark uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5">
                                <Mail size={14} className="text-primary shrink-0 mt-0.5" />
                                <a href="mailto:tutorhubadmin@gmail.com" className="text-sm text-gray-500 hover:text-primary transition-colors break-all">
                                    tutorhubadmin@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-500">Colombo, Sri Lanka</span>
                            </li>
                        </ul>
                        <div className="pt-2">
                            <Link
                                href="/become-a-tutor"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                            >
                                Become a Tutor <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs text-gray-400">
                    <span>&copy; {new Date().getFullYear()} TutorHub.LK. All rights reserved.</span>
                    <div className="flex items-center gap-4">
                        <Link href="/about"   className="hover:text-primary transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        <Link href="/tutors"  className="hover:text-primary transition-colors">Find a Tutor</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { href: "/syllabus", label: "Browse" },
        { href: "/tutors", label: "Tutors" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav className="
            sticky
            top-4
            z-50
            mx-auto
            w-[95%]
            max-w-7xl
            rounded-2xl
            border
            border-white/50
            bg-white/80
            backdrop-blur-md
            shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            transition-all
            duration-300
        ">
            <div className="flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="hover:opacity-90 transition-opacity">
                    <Image 
                        src="/logo.svg"
                        alt="TutorHub Logo"
                        width={130}
                        height={46}
                        priority
                    />
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link 
                                key={link.href}
                                href={link.href}
                                className={`
                                    relative
                                    font-semibold
                                    text-sm
                                    transition-colors
                                    duration-200
                                    py-1
                                    ${active ? 'text-primary' : 'text-dark hover:text-primary'}
                                `}
                            >
                                {link.label}
                                {active && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full animate-pulse" />
                                )}
                            </Link>
                        );
                    })}

                    {/* CTA Button */}
                    <Link
                        href="/become-a-tutor"
                        className="
                            rounded-xl
                            bg-primary
                            px-5
                            py-2.5
                            text-sm
                            text-white
                            font-semibold
                            transition-all
                            duration-250
                            shadow-glow-primary
                            hover:bg-primary-dark
                            hover:scale-102
                            hover:shadow-lg
                        "
                    >
                        Become a Tutor
                    </Link>                                        

                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="md:hidden p-2 rounded-lg text-dark hover:bg-gray-100/50 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div 
                    className="
                        md:hidden
                        flex
                        flex-col
                        gap-4
                        px-6
                        pb-6
                        pt-2
                        border-t
                        border-gray-100
                        animate-slideDown
                    "
                >
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link 
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`
                                    font-semibold
                                    text-base
                                    py-2
                                    px-3
                                    rounded-lg
                                    transition-colors
                                    ${active ? 'bg-primary/10 text-primary' : 'text-dark hover:bg-gray-50 hover:text-primary'}
                                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    {/* CTA Button */}
                    <Link
                        href="/become-a-tutor"
                        onClick={closeMenu}
                        className="
                            rounded-xl
                            bg-primary
                            px-5
                            py-3
                            text-center
                            text-white
                            font-semibold
                            transition-all
                            duration-200
                            shadow-glow-primary
                            hover:bg-primary-dark
                            mt-2
                        "
                    >
                        Become a Tutor
                    </Link>                                        

                </div>
            )}

        </nav>
    );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="
            sticky
            top-2
            z-50
            mx-auto
            w-[95%]
            rounded-2xl
            border
            border-white/20
            bg-white/70
            backdrop-blur-xl
            shadow-lg
        ">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                {/* Logo */}
                <Link href="/" onClick={closeMenu}>
                    <Image 
                        src="/logo.svg"
                        alt="TutorHub Logo"
                        width={140}
                        height={50}
                        priority
                    />
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className="
                                font-medium
                                text-dark
                                transition-colors
                                duration-200
                                hover:text-primary
                        ">
                            {link.label}
                        </Link>
                    ))}
                    
                    {/* CTA Button remains at the bottom of the container */}
                    <Link
                        href="/contact"
                        className="
                        rounded-2xl
                        bg-primary
                        px-5
                        py-2.5
                        text-white
                        font-medium
                        transition-all
                        duration-200
                        hover:bg-primary-dark
                        hover:scale-105
                    ">
                        Become a Tutor
                    </Link>                                        
                </div>

                {/*Mobile Hamburger*/}
                <button 
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >

                    {isOpen ? <X size={28} />: <Menu size={28}/>}
                </button>

            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div 
                    className="
                        md:hidden
                        flex
                        flex-col
                        gap-5
                        px-6
                        pb-6
                        border-t
                        border-white/20
                        animate-slideDown
                    "
                >


                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="
                                font-medium
                                text-dark
                                transition-colors
                                duration-200
                                hover:text-primary
                            "
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* CTA Button */}
                    <Link
                        href="/contact"
                        onClick={closeMenu}
                        className="
                            rounded-2xl
                            bg-primary
                            px-5
                            py-2.5
                            text-center
                            text-white
                            font-medium
                            transition-all
                            duration-200
                            hover:bg-primary-dark
                        "
                    >
                        Become a Tutor
                    </Link>                                        

                </div>

            )}

        </nav>
    );
}
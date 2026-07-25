"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        fetchUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
            if (event === 'SIGNED_OUT') {
                router.push('/login');
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const handleSignOut = async () => {
        closeMenu();
        await supabase.auth.signOut();
    };

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

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
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                    <Image 
                        src="/logo.svg"
                        alt="TutorHub Logo"
                        width={130}
                        height={46}
                        priority
                    />
                    <span className="text-xl font-black text-dark tracking-tight">TutorHub</span>
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-8 mr-4">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        font-medium
                                        transition-colors
                                        duration-200
                                        ${active ? 'text-primary' : 'text-dark hover:text-primary'}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {!loading && (
                        user ? (
                            <>
                                {/* Dashboard Button */}
                                <Link
                                    href="/dashboard"
                                    className="
                                        rounded-2xl
                                        border-2
                                        border-gray-100
                                        hover:border-primary/20
                                        px-5
                                        py-2
                                        text-sm
                                        text-dark
                                        hover:text-primary
                                        font-semibold
                                        transition-all
                                        duration-200
                                        hover:scale-102
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >
                                    <LayoutDashboard size={14} />
                                    Dashboard
                                </Link>
                                
                                {/* Sign Out Button */}
                                <button
                                    onClick={handleSignOut}
                                    className="
                                        rounded-2xl
                                        bg-primary
                                        px-5
                                        py-2.5
                                        text-white
                                        font-semibold
                                        text-sm
                                        transition-all
                                        duration-200
                                        hover:bg-primary-dark
                                        hover:scale-105
                                        shadow-glow-primary
                                        flex
                                        items-center
                                        gap-1.5
                                        cursor-pointer
                                    "
                                >
                                    <LogOut size={14} />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                {/* primary Outline Log In Button */}
                                <Link
                                    href="/login"
                                    className="
                                        rounded-2xl
                                        border-2
                                        border-gray-100
                                        hover:border-primary/20
                                        px-5
                                        py-2
                                        text-sm
                                        text-dark
                                        hover:text-primary
                                        font-semibold
                                        transition-all
                                        duration-200
                                        hover:scale-102
                                    "
                                >
                                    Log In
                                </Link>
                                
                                {/* Primary Become a Tutor Button */}
                                <Link
                                    href="/become-a-tutor"
                                    className="
                                        rounded-2xl
                                        bg-primary
                                        px-5
                                        py-2.5
                                        text-white
                                        font-semibold
                                        text-sm
                                        transition-all
                                        duration-200
                                        hover:bg-primary-dark
                                        hover:scale-105
                                        shadow-glow-primary
                                    "
                                >
                                    Become a Tutor
                                </Link>
                            </>
                        )
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
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
                        border-t
                        border-white/20
                        pt-4
                    "
                >
                    {NAV_LINKS.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link 
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`
                                    font-medium
                                    transition-colors
                                    duration-200
                                    py-1
                                    ${active ? 'text-primary' : 'text-dark hover:text-primary'}
                                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    {!loading && (
                        user ? (
                            <>
                                {/* Mobile Dashboard Button */}
                                <Link
                                    href="/dashboard"
                                    onClick={closeMenu}
                                    className="
                                        rounded-2xl
                                        border-2
                                        border-gray-100
                                        hover:border-primary/20
                                        py-2.5
                                        text-center
                                        text-dark
                                        hover:text-primary
                                        font-semibold
                                        transition-all
                                        duration-200
                                        mt-2
                                        flex
                                        items-center
                                        justify-center
                                        gap-1.5
                                    "
                                >
                                    <LayoutDashboard size={14} />
                                    Dashboard
                                </Link>

                                {/* Mobile Sign Out Button */}
                                <button
                                    onClick={handleSignOut}
                                    className="
                                        rounded-2xl
                                        bg-primary
                                        px-5
                                        py-2.5
                                        text-center
                                        text-white
                                        font-semibold
                                        transition-all
                                        duration-200
                                        hover:bg-primary-dark
                                        flex
                                        items-center
                                        justify-center
                                        gap-1.5
                                        cursor-pointer
                                        w-full
                                    "
                                >
                                    <LogOut size={14} />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Mobile Log In Button */}
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="
                                        rounded-2xl
                                        border-2
                                        border-gray-100
                                        hover:border-primary/20
                                        py-2.5
                                        text-center
                                        text-dark
                                        hover:text-primary
                                        font-semibold
                                        transition-all
                                        duration-200
                                        mt-2
                                    "
                                >
                                    Log In
                                </Link>

                                {/* Mobile Become a Tutor Button */}
                                <Link
                                    href="/become-a-tutor"
                                    onClick={closeMenu}
                                    className="
                                        rounded-2xl
                                        bg-primary
                                        px-5
                                        py-2.5
                                        text-center
                                        text-white
                                        font-semibold
                                        transition-all
                                        duration-200
                                        hover:bg-primary-dark
                                    "
                                >
                                    Become a Tutor
                                </Link>
                            </>
                        )
                    )}
                </div>
            )}
        </nav>
    );
}

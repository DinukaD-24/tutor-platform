"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, Sparkles, UserCheck } from "lucide-react";
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
            top-3
            z-50
            mx-auto
            w-[92%]
            max-w-7xl
            rounded-full
            border
            border-white/80
            bg-white/80
            backdrop-blur-2xl
            shadow-[0_8px_32px_rgba(15,37,55,0.06),0_1px_2px_rgba(255,255,255,0.8)_inset]
            transition-all
            duration-300
        ">
            <div className="flex justify-between items-center px-4 sm:px-6 py-2.5 sm:py-3">

                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group">
                    <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                        <Image 
                            src="/logo.svg"
                            alt="TutorHub Logo"
                            width={128}
                            height={42}
                            priority
                            className="h-9 sm:h-10 w-auto object-contain"
                        />
                    </div>
                </Link>
                
                {/* Desktop Navigation Link Pills */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="flex items-center bg-gray-100/60 p-1.5 rounded-full border border-gray-200/50 shadow-inner">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        relative
                                        px-4
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        font-extrabold
                                        transition-all
                                        duration-200
                                        ${active 
                                            ? 'bg-white text-primary shadow-xs ring-1 ring-black/5' 
                                            : 'text-dark/70 hover:text-primary hover:bg-white/50'}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop User Action Buttons */}
                <div className="hidden md:flex items-center gap-2.5">
                    {!loading && (
                        user ? (
                            <>
                                {/* Dashboard Button */}
                                <Link
                                    href="/dashboard"
                                    className="
                                        px-4.5
                                        py-2
                                        text-xs
                                        font-extrabold
                                        text-dark
                                        hover:text-primary
                                        bg-gray-100/70
                                        hover:bg-primary/10
                                        rounded-full
                                        border
                                        border-gray-200/60
                                        transition-all
                                        duration-200
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >
                                    <LayoutDashboard size={14} className="text-primary" />
                                    Dashboard
                                </Link>
                                
                                {/* Sign Out Button */}
                                <button
                                    onClick={handleSignOut}
                                    className="
                                        px-4.5
                                        py-2.5
                                        text-xs
                                        font-black
                                        text-white
                                        bg-primary
                                        hover:bg-primary-dark
                                        rounded-full
                                        shadow-[0_4px_14px_rgba(33,131,150,0.35)]
                                        hover:shadow-[0_6px_20px_rgba(33,131,150,0.45)]
                                        hover:scale-[1.03]
                                        active:scale-[0.98]
                                        transition-all
                                        duration-200
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
                                {/* Log In Button */}
                                <Link
                                    href="/login"
                                    className="
                                        px-4.5
                                        py-2
                                        text-xs
                                        font-extrabold
                                        text-dark
                                        hover:text-primary
                                        rounded-full
                                        hover:bg-gray-100/80
                                        transition-all
                                        duration-200
                                    "
                                >
                                    Log In
                                </Link>
                                
                                {/* Become a Tutor Button */}
                                <Link
                                    href="/become-a-tutor"
                                    className="
                                        px-5
                                        py-2.5
                                        text-xs
                                        font-black
                                        text-white
                                        bg-primary
                                        hover:bg-primary-dark
                                        rounded-full
                                        shadow-[0_4px_14px_rgba(33,131,150,0.35)]
                                        hover:shadow-[0_6px_20px_rgba(33,131,150,0.45)]
                                        hover:scale-[1.03]
                                        active:scale-[0.98]
                                        transition-all
                                        duration-200
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >
                                    <Sparkles size={13} className="text-white/80" />
                                    Become a Tutor
                                </Link>
                            </>
                        )
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button 
                    className="md:hidden p-2 text-dark hover:text-primary hover:bg-gray-100/60 rounded-full transition-all cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* Mobile Dropdown Drawer */}
            {isOpen && (
                <div 
                    className="
                        md:hidden
                        flex
                        flex-col
                        gap-3
                        px-6
                        pb-6
                        pt-3
                        border-t
                        border-gray-100/80
                        bg-white/95
                        backdrop-blur-2xl
                        rounded-b-3xl
                        shadow-2xl
                        animate-slideDown
                    "
                >
                    <div className="flex flex-col gap-1.5">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`
                                        px-4
                                        py-2.5
                                        rounded-2xl
                                        text-sm
                                        font-extrabold
                                        transition-all
                                        duration-200
                                        ${active 
                                            ? 'bg-primary/10 text-primary' 
                                            : 'text-dark/80 hover:bg-gray-50 hover:text-primary'}
                                    `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                        {!loading && (
                            user ? (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/dashboard"
                                        onClick={closeMenu}
                                        className="
                                            w-full
                                            py-2.5
                                            px-4
                                            rounded-2xl
                                            bg-gray-100/80
                                            hover:bg-primary/10
                                            text-center
                                            text-dark
                                            hover:text-primary
                                            text-xs
                                            font-extrabold
                                            transition-all
                                            duration-200
                                            flex
                                            items-center
                                            justify-center
                                            gap-1.5
                                        "
                                    >
                                        <LayoutDashboard size={14} className="text-primary" />
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="
                                            w-full
                                            py-2.5
                                            px-4
                                            rounded-2xl
                                            bg-primary
                                            text-center
                                            text-white
                                            text-xs
                                            font-black
                                            transition-all
                                            duration-200
                                            hover:bg-primary-dark
                                            shadow-md
                                            flex
                                            items-center
                                            justify-center
                                            gap-1.5
                                            cursor-pointer
                                        "
                                    >
                                        <LogOut size={14} />
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="
                                            w-full
                                            py-2.5
                                            px-4
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            hover:border-primary/40
                                            text-center
                                            text-dark
                                            hover:text-primary
                                            text-xs
                                            font-extrabold
                                            transition-all
                                            duration-200
                                        "
                                    >
                                        Log In
                                    </Link>

                                    <Link
                                        href="/become-a-tutor"
                                        onClick={closeMenu}
                                        className="
                                            w-full
                                            py-2.5
                                            px-4
                                            rounded-2xl
                                            bg-primary
                                            text-center
                                            text-white
                                            text-xs
                                            font-black
                                            transition-all
                                            duration-200
                                            hover:bg-primary-dark
                                            shadow-md
                                            flex
                                            items-center
                                            justify-center
                                            gap-1.5
                                        "
                                    >
                                        <Sparkles size={13} />
                                        Become a Tutor
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

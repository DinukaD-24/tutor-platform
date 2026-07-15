"use client";

import { useState, useEffect } from "react";
import { tutors } from "@/data/tutors";
import { ChevronLeft, ChevronRight, Star, BookOpen, Users } from "lucide-react";
import Link from "next/link";

const slogans = [
    "Specialised in simplifying complex algebra and calculus for A/L students.",
    "Passionate about making mechanics and waves intuitive through real examples.",
    "Interactive programming lessons built around practical, exam-ready concepts.",
    "Structured biology diagrams and memory techniques for fast revision.",
];

export default function TutorCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % tutors.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setActiveIndex((p) => (p - 1 + tutors.length) % tutors.length);
    const next = () => setActiveIndex((p) => (p + 1) % tutors.length);

    return (
        <div className="relative w-full max-w-[340px] mx-auto select-none">

            {/* Card Slider */}
            <div className="overflow-hidden rounded-3xl">
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {tutors.map((tutor, idx) => {
                        const isUni = tutor.tutorType?.toLowerCase().includes("uni");
                        return (
                            <div key={tutor.id} className="w-full shrink-0 px-1">
                                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-7 space-y-5">

                                    {/* Avatar + Name */}
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white bg-gradient-to-br ${isUni ? "from-primary to-primary-dark" : "from-secondary to-emerald-600"} shrink-0`}>
                                            {tutor.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-dark text-base leading-tight">{tutor.name}</h3>
                                            <span className={`inline-flex mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isUni ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                                                {tutor.tutorType}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Slogan */}
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {slogans[idx] || tutor.bio?.slice(0, 100)}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-50">
                                        <div className="text-center">
                                            <Star size={13} className="text-amber-400 mx-auto mb-1" />
                                            <strong className="block text-xs font-extrabold text-dark">{tutor.rating}</strong>
                                            <span className="text-[9px] text-gray-400">Rating</span>
                                        </div>
                                        <div className="text-center">
                                            <Users size={13} className="text-primary mx-auto mb-1" />
                                            <strong className="block text-xs font-extrabold text-dark">{tutor.students}</strong>
                                            <span className="text-[9px] text-gray-400">Students</span>
                                        </div>
                                        <div className="text-center">
                                            <BookOpen size={13} className="text-secondary mx-auto mb-1" />
                                            <strong className="block text-xs font-extrabold text-dark">{tutor.lessonsCount}</strong>
                                            <span className="text-[9px] text-gray-400">Lessons</span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={`/tutors/${tutor.id}`}
                                        className="block w-full text-center py-3 bg-primary/5 hover:bg-primary text-primary hover:text-white font-bold text-xs rounded-2xl border border-primary/10 hover:border-primary transition-all duration-200"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-5 px-1">
                <button onClick={prev} className="p-2 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:text-primary text-gray-400 transition-all shadow-sm">
                    <ChevronLeft size={16} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                    {tutors.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-gray-200"}`}
                        />
                    ))}
                </div>

                <button onClick={next} className="p-2 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:text-primary text-gray-400 transition-all shadow-sm">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { tutors } from "@/data/tutors";
import { BookOpen, Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TutorCarousel () {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % tutors.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + tutors.length) % tutors.length);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % tutors.length);
    };

    // Custom slogans for each tutor to fill the square card space beautifully
    const slogans = [
        "Specialized in simplifying complex algebraic methods and geometry.",
        "Passionate about making mechanical physics and waves intuitive.",
        "Interactive programming lessons focusing on practical concepts.",
        "Dedicated to structured biological diagrams and study methods."
    ];

    return (
        <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
            
            {/* Carousel Frame */}
            <div className="w-full overflow-hidden rounded-3xl p-4">
                <div 
                    className="flex transition-transform duration-700 ease-out" 
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {tutors.map((tutor, idx) => {
                        const isUni = tutor.tutorType.toLowerCase().includes("uni");
                        
                        return (
                            <div key={tutor.id} className="w-full shrink-0 flex justify-center px-2">
                                
                                {/* Large Square Tutor Card */}
                                <div className="
                                    w-full 
                                    max-w-[350px] 
                                    aspect-square 
                                    bg-white 
                                    border 
                                    border-gray-100 
                                    rounded-3xl 
                                    p-8 
                                    shadow-[0_15px_40px_rgba(0,0,0,0.04)]
                                    hover:shadow-[0_20px_50px_rgba(33,131,150,0.08)]
                                    transition-all
                                    duration-300
                                    flex 
                                    flex-col 
                                    justify-between 
                                    items-center 
                                    text-center
                                    relative
                                ">
                                    {/* Accent strip */}
                                    <span className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-primary to-secondary rounded-t-3xl" />

                                    {/* Profile Pic & Title */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md mb-4 border border-gray-50 shrink-0">
                                            {tutor.image ? (
                                                <img 
                                                    src={tutor.image} 
                                                    alt={tutor.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-bold text-2xl">
                                                    {tutor.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="font-extrabold text-xl text-dark">
                                            {tutor.name}
                                        </h3>
                                        
                                        <span className={`
                                            inline-flex
                                            items-center
                                            gap-1
                                            text-xs
                                            font-semibold
                                            px-3
                                            py-0.5
                                            rounded-full
                                            mt-2
                                            ${isUni ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}
                                        `}>
                                            <Award size={12} />
                                            {tutor.tutorType}
                                        </span>
                                    </div>

                                    {/* Motto / Slogan */}
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-[240px] my-3 italic">
                                        "{slogans[idx] || slogans[0]}"
                                    </p>

                                    {/* Subject & CTA */}
                                    <div className="w-full pt-3 border-t border-gray-50 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <BookOpen size={16} className="text-primary/70" />
                                            <span className="font-bold truncate max-w-[120px]">{tutor.subject}</span>
                                        </div>
                                        <Link 
                                            href="/contact" 
                                            className="text-primary hover:text-primary-dark font-extrabold flex items-center gap-0.5"
                                        >
                                            Inquire
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Slider Dots & Navigation */}
            <div className="flex items-center gap-4 mt-2">
                <button 
                    onClick={prevSlide}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 transition-colors"
                >
                    <ChevronLeft size={16} />
                </button>
                
                <div className="flex gap-1.5">
                    {tutors.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`
                                h-1.5 
                                rounded-full 
                                transition-all 
                                duration-300
                                ${activeIndex === idx ? 'w-5 bg-primary' : 'w-1.5 bg-gray-200'}
                            `}
                        />
                    ))}
                </div>

                <button 
                    onClick={nextSlide}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-primary hover:border-primary/30 transition-colors"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
            
        </div>
    );
}
"use client";
import { useState, useEffect } from "react";
import { BookOpen, Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TutorCarousel ({ tutors }) {
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

    const slogans = [
        "Specialized in simplifying complex algebraic methods and geometry.",
        "Passionate about making mechanical physics and waves intuitive.",
        "Interactive programming lessons focusing on practical concepts.",
        "Dedicated to structured biological diagrams and study methods."
    ];

    return (
        <div className="relative w-full max-w-[340px] mx-auto flex flex-col items-center">
            
            {/* Carousel Frame */}
            <div className="w-full overflow-hidden rounded-3xl p-2">
                <div 
                    className="flex transition-transform duration-700 ease-out" 
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {tutors.map((tutor, idx) => {
                        const isUni = tutor.tutorType.toLowerCase().includes("uni");
                        
                        return (
                            <div key={tutor.id} className="w-full shrink-0 flex justify-center px-1">
                                
                                {/* Large Tutor Card */}
                                <div className="
                                    w-full 
                                    max-w-[320px] 
                                    bg-white 
                                    border 
                                    border-gray-100 
                                    rounded-3xl 
                                    p-6 
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
                                    {/* Profile Pic - 3:4 aspect ratio */}
                                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0 mb-4 relative">
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
                                        
                                        {/* Overlay Badge */}
                                        <span className={`
                                            absolute
                                            top-3
                                            right-3
                                            inline-flex
                                            items-center
                                            gap-1
                                            text-[10px]
                                            font-bold
                                            px-2.5
                                            py-1
                                            rounded-lg
                                            shadow-sm
                                            backdrop-blur-md
                                            bg-white/90
                                            ${isUni ? 'text-primary' : 'text-primary'}
                                        `}>
                                            <Award size={10} />
                                            {tutor.tutorType}
                                        </span>
                                    </div>

                                    {/* Name & Motto */}
                                    <div className="w-full text-center">
                                        <h3 className="font-extrabold text-lg text-dark">
                                            {tutor.name}
                                        </h3>
                                        
                                        <p className="text-gray-500 text-xs leading-relaxed max-w-[280px] mx-auto mt-1 mb-2 italic">
                                            &ldquo;{slogans[idx] || slogans[0]}&rdquo;
                                        </p>
                                    </div>

                                    {/* Subject & CTA */}
                                    <div className="w-full pt-3 border-t border-gray-50 flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <BookOpen size={14} className="text-primary/70" />
                                            <span className="font-bold truncate max-w-[150px]">{tutor.subject}</span>
                                        </div>
                                        <Link 
                                            href={`/tutors/${tutor.id}`} 
                                            className="text-primary hover:text-primary-dark font-extrabold flex items-center gap-0.5 animate-pulse hover:animate-none"
                                        >
                                            View Profile
                                            <ArrowRight size={12} />
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

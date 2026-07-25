import { getAllSyllabuses } from "@/utils/getData";
import SyllabusCard from "@/components/syllabus/SyllabusCard";
import { Search, SlidersHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Page() {
    const syllabuses = await getAllSyllabuses();

    return (
        <main className="min-h-screen bg-background text-dark py-24">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Page Hero */}
                <div className="max-w-3xl mb-16 space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                        Explore Supported Syllabuses
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Select your academic curriculum to view subject-specific guidelines, structured topics, and find qualified local tutors specializing in your coursework.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Filter Sidebar */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
                            
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <h3 className="font-bold text-dark flex items-center gap-2">
                                    <SlidersHorizontal size={18} className="text-primary" />
                                    Filters
                                </h3>
                                <button className="text-xs text-gray-400 hover:text-primary transition-colors">Clear All</button>
                            </div>

                            {/* Search */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Search Syllabuses</h4>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Search..."
                                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    />
                                    <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                                </div>
                            </div>

                            {/* Levels */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Academic Levels</h4>
                                <div className="space-y-2.5">
                                    {["Local Ordinary Level", "Local Advanced Level", "primary (AS/A2)", "primary (A Level)"].map((lvl) => (
                                        <label key={lvl} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" />
                                            <span>{lvl}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Verification status */}
                            <div className="space-y-2.5 pt-2">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Verification</h4>
                                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" />
                                    <span>Verified Curriculums</span>
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* Syllabus Cards Grid */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="flex justify-between items-center text-sm text-gray-500 pb-2">
                            <span>Showing all {syllabuses.length} syllabuses</span>
                            <span className="font-semibold text-dark">Active Showcase</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {syllabuses.map((syllabus) => (
                                <SyllabusCard
                                    key={syllabus.id}
                                    syllabus={syllabus}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}

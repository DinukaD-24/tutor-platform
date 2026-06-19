import { tutors } from "@/data/tutors";
import TutorCard from "@/components/cards/TutorCard";
import { Search, SlidersHorizontal, Users } from "lucide-react";

export const metadata = {
    title: "Browse Tutors — TutorHub.LK",
    description: "Discover qualified tutors across all syllabuses and find the right teaching style for your learning journey.",
};

export default function TutorPage() {
    return (
        <main className="min-h-screen bg-background text-dark py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Hero */}
                <div className="max-w-3xl mb-16 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10">
                        Educator Directory
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                        Find Your{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Perfect Tutor
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Discover qualified tutors across local and international syllabuses. Browse profiles, compare teaching styles, and connect with the right educator for your goals.
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
                                <button className="text-xs text-gray-400 hover:text-primary transition-colors">
                                    Clear All
                                </button>
                            </div>

                            {/* Search */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Search Tutors</h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Name or subject..."
                                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    />
                                    <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                                </div>
                            </div>

                            {/* Tutor Type */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Tutor Type</h4>
                                <div className="space-y-2.5">
                                    {["University Student", "Private Tutor", "School Teacher"].map((type) => (
                                        <label key={type} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Syllabus */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Syllabus</h4>
                                <div className="space-y-2.5">
                                    {["Local A/L", "Local O/L", "Edexcel", "Cambridge"].map((s) => (
                                        <label key={s} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                            <input type="checkbox" className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" />
                                            <span>{s}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="space-y-2.5 pt-2">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Availability</h4>
                                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" />
                                    <span>Online Sessions</span>
                                </label>
                                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" />
                                    <span>Physical Classes</span>
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* Tutors Grid */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="flex justify-between items-center text-sm text-gray-500 pb-2">
                            <span className="flex items-center gap-1.5">
                                <Users size={16} className="text-primary/70" />
                                Showing <strong className="text-dark mx-1">{tutors.length}</strong> tutors
                            </span>
                            <span className="font-semibold text-dark">All Syllabuses</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {tutors.map((tutor) => (
                                <TutorCard
                                    key={tutor.id}
                                    tutor={tutor}
                                />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
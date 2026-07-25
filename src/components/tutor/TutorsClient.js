"use client";
import { useState, useMemo } from "react";
import TutorCard from "@/components/tutor/TutorCard";
import { Search, SlidersHorizontal, Users, RefreshCw, X, ChevronDown, ChevronUp } from "lucide-react";

export default function TutorsClient({ tutors }) {
    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedSyllabuses, setSelectedSyllabuses] = useState([]);
    const [selectedMediums, setSelectedMediums] = useState([]);
    const [selectedClassFormats, setSelectedClassFormats] = useState([]);
    const [availability, setAvailability] = useState({ online: false, physical: false });
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Reset all filters
    const handleReset = () => {
        setSearchQuery("");
        setSelectedTypes([]);
        setSelectedSyllabuses([]);
        setSelectedMediums([]);
        setSelectedClassFormats([]);
        setAvailability({ online: false, physical: false });
        setMinRating(0);
        setMaxPrice(3000);
    };

    // Toggle array selections
    const handleToggleType = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleToggleSyllabus = (syllabus) => {
        setSelectedSyllabuses((prev) =>
            prev.includes(syllabus) ? prev.filter((s) => s !== syllabus) : [...prev, syllabus]
        );
    };

    const handleToggleMedium = (medium) => {
        setSelectedMediums((prev) =>
            prev.includes(medium) ? prev.filter((m) => m !== medium) : [...prev, medium]
        );
    };

    const handleToggleClassFormat = (format) => {
        setSelectedClassFormats((prev) =>
            prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
        );
    };

    // Computed Filtered Tutors List
    const filteredTutors = useMemo(() => {
        return tutors.filter((tutor) => {
            // 1. Search Query filter (checks name, subject, and specializations)
            if (searchQuery.trim() !== "") {
                const query = searchQuery.toLowerCase();
                const matchesName = (tutor.name || "").toLowerCase().includes(query);
                const matchesSubject = (tutor.subject || "").toLowerCase().includes(query);
                const matchesSpecs = (tutor.specializations || []).some((spec) => 
                    spec.toLowerCase().includes(query)
                );

                if (!matchesName && !matchesSubject && !matchesSpecs) {
                    return false;
                }
            }

            // 2. Tutor Type filter
            if (selectedTypes.length > 0 && !selectedTypes.includes(tutor.tutorType)) {
                return false;
            }

            // 3. Syllabus filter
            if (selectedSyllabuses.length > 0) {
                const qualificationsStr = (tutor.qualifications || []).join(" ").toLowerCase();
                const matchesSyllabus = selectedSyllabuses.some((syl) => {
                    const sylLower = syl.toLowerCase();
                    if (sylLower.includes("local") && (qualificationsStr.includes("local") || qualificationsStr.includes("a/l") || qualificationsStr.includes("o/l"))) return true;
                    if (sylLower.includes("edexcel") && qualificationsStr.includes("edexcel")) return true;
                    if (sylLower.includes("cambridge") && qualificationsStr.includes("cambridge")) return true;
                    return (tutor.subject || "").toLowerCase().includes(sylLower);
                });
                if (!matchesSyllabus) return false;
            }

            // 4. Medium Filter (Sinhala / English)
            if (selectedMediums.length > 0) {
                const tutorLangs = (tutor.languages || []).map(l => l.toLowerCase());
                const matchesMedium = selectedMediums.some(m => tutorLangs.includes(m.toLowerCase()));
                if (!matchesMedium) return false;
            }

            // 5. Class Format Filter (Paper Classes / Theory + Revision)
            if (selectedClassFormats.length > 0) {
                const tutorSpecs = [
                    ...(tutor.specializations || []),
                    ...(tutor.qualifications || []),
                    tutor.subject || "",
                    tutor.teachingStyle || ""
                ].join(" ").toLowerCase();

                const matchesFormat = selectedClassFormats.some(f => {
                    const fLower = f.toLowerCase();
                    if (fLower.includes("paper")) return tutorSpecs.includes("paper") || tutorSpecs.includes("revision") || tutorSpecs.includes("past paper");
                    if (fLower.includes("theory")) return tutorSpecs.includes("theory") || tutorSpecs.includes("revision");
                    return tutorSpecs.includes(fLower);
                });
                if (!matchesFormat) return false;
            }

            // 6. Availability filter
            if (availability.online && !tutor.availability?.online) return false;
            if (availability.physical && !tutor.availability?.physical) return false;

            // 7. Min Rating filter
            if ((tutor.rating || 0) < minRating) return false;

            // 8. Max Price filter
            const priceNum = parseInt((tutor.price || "0").replace(/[^0-9]/g, "")) || 0;
            if (priceNum > maxPrice) return false;

            return true;
        });
    }, [searchQuery, selectedTypes, selectedSyllabuses, selectedMediums, selectedClassFormats, availability, minRating, maxPrice]);

    return (
        <main className="min-h-screen bg-background text-dark py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Page Hero */}
                <div className="max-w-3xl mb-16 space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
                        Find Your Perfect Tutor
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Filter by subject, syllabus, class format, and budget to find verified tutors tailored to your Sri Lankan curriculum requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Mobile filter toggle */}
                    <div className="lg:hidden mb-2">
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-dark shadow-sm"
                        >
                            <span className="flex items-center gap-2">
                                <SlidersHorizontal size={16} className="text-primary" />
                                Filters
                            </span>
                            {filtersOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </button>
                    </div>

                    {/* Filter Sidebar */}
                    <div className={`lg:col-span-3 space-y-6 lg:sticky lg:top-28 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">

                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <h3 className="font-bold text-dark flex items-center gap-2">
                                    <SlidersHorizontal size={18} className="text-primary" />
                                    Filters
                                </h3>
                                <button 
                                    onClick={handleReset}
                                    className="text-xs font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    <RefreshCw size={10} />
                                    Reset
                                </button>
                            </div>

                            {/* Search */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Search Name/Subject</h4>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Type name, algebra..."
                                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    />
                                    <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                                </div>
                            </div>

                            {/* Tutor Classification */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Tutor Classification</h4>
                                <div className="space-y-2.5">
                                    {["University Student", "Private Tutor", "School Teacher"].map((type) => (
                                        <label key={type} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                            <input 
                                                type="checkbox"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleToggleType(type)}
                                                className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" 
                                            />
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
                                            <input 
                                                type="checkbox"
                                                checked={selectedSyllabuses.includes(s)}
                                                onChange={() => handleToggleSyllabus(s)}
                                                className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" 
                                            />
                                            <span>{s}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Teaching Medium (Sinhala / English) */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Medium</h4>
                                <div className="space-y-2.5">
                                    {["Sinhala", "English"].map((m) => (
                                        <label key={m} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                            <input 
                                                type="checkbox"
                                                checked={selectedMediums.includes(m)}
                                                onChange={() => handleToggleMedium(m)}
                                                className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" 
                                            />
                                            <span>{m} Medium</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Class Format (Paper Classes / Theory + Revision) */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Class Type</h4>
                                <div className="space-y-2.5">
                                    {["Paper Classes", "Theory + Revision"].map((fmt) => (
                                        <label key={fmt} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                            <input 
                                                type="checkbox"
                                                checked={selectedClassFormats.includes(fmt)}
                                                onChange={() => handleToggleClassFormat(fmt)}
                                                className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" 
                                            />
                                            <span>{fmt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Format</h4>
                                <div className="space-y-2.5">
                                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                        <input 
                                            type="checkbox"
                                            checked={availability.online}
                                            onChange={(e) => setAvailability(prev => ({ ...prev, online: e.target.checked }))}
                                            className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" 
                                        />
                                        <span>Online Sessions</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                                        <input 
                                            type="checkbox"
                                            checked={availability.physical}
                                            onChange={(e) => setAvailability(prev => ({ ...prev, physical: e.target.checked }))}
                                            className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200" 
                                        />
                                        <span>Physical Classes</span>
                                    </label>
                                </div>
                            </div>

                            {/* Budget range */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs font-bold text-dark uppercase tracking-wider">
                                    <span>Max Rate</span>
                                    <span className="text-primary font-black">LKR {maxPrice}/hr</span>
                                </div>
                                <input 
                                    type="range"
                                    min="1000"
                                    max="3000"
                                    step="100"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                                    <span>LKR 1,000</span>
                                    <span>LKR 3,000</span>
                                </div>
                            </div>

                            {/* Minimum rating */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Minimum Rating</h4>
                                <div className="flex items-center gap-1">
                                    {[0, 4.5, 4.7, 4.9].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(rating)}
                                            className={`
                                                flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all
                                                ${minRating === rating 
                                                    ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                                                    : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            {rating === 0 ? "All" : `${rating}★`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Tutors Grid */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="flex justify-between items-center text-sm text-gray-500 pb-2">
                            <span className="flex items-center gap-1.5">
                                <Users size={16} className="text-primary/70" />
                                Found <strong className="text-dark mx-1">{filteredTutors.length}</strong> matching tutors
                            </span>
                            
                            {/* Filter Summary Tags */}
                            {(searchQuery || selectedTypes.length > 0 || selectedSyllabuses.length > 0 || selectedMediums.length > 0 || selectedClassFormats.length > 0 || availability.online || availability.physical || minRating > 0 || maxPrice < 3000) && (
                                <button 
                                    onClick={handleReset}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-full border border-red-100"
                                >
                                    Clear Filters <X size={10} />
                                </button>
                            )}
                        </div>

                        {/* List Grid */}
                        {filteredTutors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredTutors.map((tutor) => (
                                    <TutorCard
                                        key={tutor.id}
                                        tutor={tutor}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto">
                                    <Search size={24} />
                                </div>
                                <h3 className="font-extrabold text-lg text-dark">No Tutors Match Your Filters</h3>
                                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                                    Try broadening your search query, adjusting your rate ceiling, or removing active classification tickmarks.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-xl shadow-glow-primary transition-all"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </main>
    );
}

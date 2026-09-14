"use client";

import { useState, useMemo } from "react";
import SyllabusCard from "@/components/syllabus/SyllabusCard";
import { Search, SlidersHorizontal, Layers, RefreshCw, GraduationCap, Globe, Languages, Code, Sparkles } from "lucide-react";

const ICON_MAP = {
  GraduationCap: GraduationCap,
  Globe: Globe,
  Languages: Languages,
  Code: Code,
};

export default function SyllabusBrowseClient({ categories = [], syllabuses = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSyllabuses, setSelectedSyllabuses] = useState([]);

  const availableSyllabusNames = useMemo(() => {
    return Array.from(new Set(syllabuses.map((s) => s.name)));
  }, [syllabuses]);

  const handleToggleSyllabus = (name) => {
    setSelectedSyllabuses((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedSyllabuses([]);
  };

  // Group syllabuses into parent categories for rich structured rendering
  const groupedCategories = useMemo(() => {
    return categories.map((cat) => {
      const filteredSyllabs = cat.syllabuses.filter((s) => {
        // Search Filter
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          const matchesName = (s.name || "").toLowerCase().includes(query);
          const matchesGrades = (s.grades || []).some(
            (g) =>
              (g.name || "").toLowerCase().includes(query) ||
              (g.subjects || []).some((sub) =>
                (sub.name || "").toLowerCase().includes(query)
              )
          );
          if (!matchesName && !matchesGrades) return false;
        }

        // Syllabus checkbox filter
        if (selectedSyllabuses.length > 0 && !selectedSyllabuses.includes(s.name)) {
          return false;
        }

        return true;
      });

      return {
        ...cat,
        syllabuses: filteredSyllabs
      };
    }).filter((cat) => {
      // Category filter pill selection
      if (selectedCategory !== "ALL" && cat.slug !== selectedCategory) {
        return false;
      }
      return cat.syllabuses.length > 0;
    });
  }, [categories, searchQuery, selectedCategory, selectedSyllabuses]);

  const totalFilteredCount = useMemo(() => {
    return groupedCategories.reduce((acc, cat) => acc + cat.syllabuses.length, 0);
  }, [groupedCategories]);

  return (
    <main className="min-h-screen bg-background text-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Hero */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0d8a6e] bg-[#e6f7f2] border border-[#b2e8d4]">
            <Sparkles size={14} /> Curriculum & Skill Directory
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
            Explore Curriculums & Tuition Areas
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Browse through National Curriculums, International Boards, Language Courses, and Extra-Curricular Skill Programs to find structured subjects and verified tutors.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-[#0d8a6e] text-white shadow-md shadow-[#0d8a6e]/20"
                : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
            }`}
          >
            All Categories ({syllabuses.length})
          </button>

          {categories.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || GraduationCap;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat.slug
                    ? "bg-[#0d8a6e] text-white shadow-md shadow-[#0d8a6e]/20"
                    : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                }`}
              >
                <IconComponent size={14} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h3 className="font-bold text-dark flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#0d8a6e]" />
                  Filters
                </h3>
                {(searchQuery || selectedCategory !== "ALL" || selectedSyllabuses.length > 0) && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-[#0d8a6e] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw size={11} /> Clear All
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                  Search Directory
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search syllabus, grade, or subject..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-[#0d8a6e] focus:ring-4 focus:ring-[#0d8a6e]/10 outline-none transition-all"
                  />
                  <Search
                    size={14}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                </div>
              </div>

              {/* Syllabus Checkboxes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                  Programs & Boards
                </h4>
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {availableSyllabusNames.map((name) => (
                    <label
                      key={name}
                      className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-dark font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSyllabuses.includes(name)}
                        onChange={() => handleToggleSyllabus(name)}
                        className="w-3.5 h-3.5 rounded text-[#0d8a6e] focus:ring-[#0d8a6e] border-gray-200 cursor-pointer"
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grouped Category Showcase Sections */}
          <div className="lg:col-span-9 space-y-12">
            {groupedCategories.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-400">
                  <Layers size={24} />
                </div>
                <h3 className="font-bold text-dark text-base">No Matching Programs Found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  No programs match your search query or filter selection.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-5 py-2.5 bg-[#0d8a6e] text-white font-bold text-xs rounded-full shadow-md hover:bg-[#096d57] cursor-pointer transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              groupedCategories.map((category) => {
                const IconComp = ICON_MAP[category.icon] || GraduationCap;
                return (
                  <section key={category.id} className="space-y-5">
                    {/* Category Group Header Banner */}
                    <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#e6f7f2] border border-[#b2e8d4] flex items-center justify-center text-[#0d8a6e]">
                          <IconComp size={20} />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {category.name}
                          </h2>
                          <p className="text-xs text-gray-500 font-medium">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#0d8a6e] bg-[#e6f7f2] px-3 py-1 rounded-full border border-[#b2e8d4]">
                        {category.syllabuses.length} {category.syllabuses.length === 1 ? "Program" : "Programs"}
                      </span>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.syllabuses.map((syllabus) => (
                        <SyllabusCard key={syllabus.id} syllabus={syllabus} />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

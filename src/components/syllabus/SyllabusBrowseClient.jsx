"use client";

import { useState, useMemo } from "react";
import SyllabusCard from "@/components/syllabus/SyllabusCard";
import { Search, SlidersHorizontal, Layers, RefreshCw } from "lucide-react";

export default function SyllabusBrowseClient({ syllabuses }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSyllabuses, setSelectedSyllabuses] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

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
    setSelectedSyllabuses([]);
    setVerifiedOnly(false);
  };

  const filteredSyllabuses = useMemo(() => {
    return syllabuses.filter((syllabus) => {
      // 1. Search filter (checks syllabus name, grade names, and subject names)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = (syllabus.name || "").toLowerCase().includes(query);
        const matchesGrades = (syllabus.grades || []).some(
          (g) =>
            (g.name || "").toLowerCase().includes(query) ||
            (g.subjects || []).some((sub) =>
              (sub.name || "").toLowerCase().includes(query)
            )
        );

        if (!matchesName && !matchesGrades) {
          return false;
        }
      }

      // 2. Syllabus Name Filter
      if (
        selectedSyllabuses.length > 0 &&
        !selectedSyllabuses.includes(syllabus.name)
      ) {
        return false;
      }

      return true;
    });
  }, [syllabuses, searchQuery, selectedSyllabuses]);

  return (
    <main className="min-h-screen bg-background text-dark py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
            Curriculum Directory
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-dark tracking-tight leading-tight">
            Explore Supported Syllabuses
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Select your academic curriculum or extra-curricular program to view structured topics and find qualified tutors for your coursework.
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
                {(searchQuery || selectedSyllabuses.length > 0 || verifiedOnly) && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw size={11} /> Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                  Search Syllabuses
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by syllabus, grade, subject..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  />
                  <Search
                    size={14}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                </div>
              </div>

              {/* Syllabus Names Checkboxes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                  Academic & Extra Curricula
                </h4>
                <div className="space-y-2.5">
                  {availableSyllabusNames.map((name) => (
                    <label
                      key={name}
                      className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-dark font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSyllabuses.includes(name)}
                        onChange={() => handleToggleSyllabus(name)}
                        className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200 cursor-pointer"
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verification status */}
              <div className="space-y-2.5 pt-2 border-t border-gray-50">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider">
                  Verification
                </h4>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-dark font-medium">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200 cursor-pointer"
                  />
                  <span>Verified Curriculums Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Syllabus Cards Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center text-sm text-gray-500 pb-2">
              <span>Showing {filteredSyllabuses.length} of {syllabuses.length} syllabuses</span>
              <span className="font-semibold text-dark">Active Showcase</span>
            </div>

            {filteredSyllabuses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-400">
                  <Layers size={24} />
                </div>
                <h3 className="font-bold text-dark text-base">No Syllabuses Found</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  No syllabuses match your current search query or filter selection. Try clearing your filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl shadow-glow-primary hover:bg-primary-dark cursor-pointer transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSyllabuses.map((syllabus) => (
                  <SyllabusCard key={syllabus.id} syllabus={syllabus} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

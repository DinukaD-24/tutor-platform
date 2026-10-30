"use client";
import { useState, useCallback, useEffect, useTransition, useRef } from "react";
import TutorCard from "@/components/tutor/TutorCard";
import {
  Search,
  SlidersHorizontal,
  Users,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const DEFAULT_MAX_PRICE = 3000;

function buildQueryString(filters, page) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (filters.search) params.set("search", filters.search);
  filters.types.forEach((t) => params.append("type", t));
  filters.syllabuses.forEach((s) => params.append("syllabus", s));
  filters.mediums.forEach((m) => params.append("medium", m));
  filters.formats.forEach((f) => params.append("format", f));
  if (filters.online) params.set("online", "true");
  if (filters.physical) params.set("physical", "true");
  if (filters.minRating > 0) params.set("minRating", String(filters.minRating));
  if (filters.maxPrice < DEFAULT_MAX_PRICE) params.set("maxPrice", String(filters.maxPrice));
  return params.toString();
}

const INITIAL_FILTERS = {
  search: "",
  types: [],
  syllabuses: [],
  mediums: [],
  formats: [],
  online: false,
  physical: false,
  minRating: 0,
  maxPrice: DEFAULT_MAX_PRICE,
};

export default function TutorsClient({ initialTutors, initialTotal, pageSize }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [tutors, setTutors] = useState(initialTutors);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);
  const isInitialMount = useRef(true);

  const totalPages = Math.ceil(total / pageSize);

  const fetchTutors = useCallback(async (newFilters, newPage) => {
    setIsLoading(true);
    try {
      const qs = buildQueryString(newFilters, newPage);
      const res = await fetch(`/api/tutors?${qs}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTutors(data.tutors);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced fetch when filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      startTransition(() => {
        setPage(1);
        fetchTutors(filters, 1);
      });
    }, 300);
    return () => clearTimeout(debounceRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchTutors(filters, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
    // fetch will be triggered by useEffect
  };

  const toggle = (key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));

  const hasActiveFilters =
    filters.search ||
    filters.types.length > 0 ||
    filters.syllabuses.length > 0 ||
    filters.mediums.length > 0 ||
    filters.formats.length > 0 ||
    filters.online ||
    filters.physical ||
    filters.minRating > 0 ||
    filters.maxPrice < DEFAULT_MAX_PRICE;

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
          <div className={`lg:col-span-3 space-y-6 lg:sticky lg:top-28 ${filtersOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">

              {/* ── Sidebar header with reset ── */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                {/* Fixed: h3 → h2 for correct heading order (Lighthouse accessibility) */}
                <h2 className="font-bold text-dark flex items-center gap-2 text-base">
                  <SlidersHorizontal size={18} className="text-primary" />
                  Filters
                </h2>
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
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Search Name/Subject</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                    placeholder="Type name, algebra..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  />
                  <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Tutor Classification */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Tutor Classification</h3>
                <div className="space-y-2.5">
                  {["Private Tutor", "School Teacher", "University Lecturer", "University Student", "Institute Educator", "Online Specialist"].map((type) => (
                    <label key={type} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type)}
                        onChange={() => toggle("types", type)}
                        className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Syllabus */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Syllabus & Category</h3>
                <div className="space-y-2.5">
                  {["Local A/L", "Local O/L", "Junior Secondary (Grade 6-9)", "Primary & Early Years (Grade 1-5)", "Edexcel / Pearson", "Cambridge (CAIE)", "Languages & Communication", "Extra-Curricular & Tech Skills"].map((s) => (
                    <label key={s} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                      <input
                        type="checkbox"
                        checked={filters.syllabuses.includes(s)}
                        onChange={() => toggle("syllabuses", s)}
                        className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200"
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Medium</h3>
                <div className="space-y-2.5">
                  {["Sinhala", "English"].map((m) => (
                    <label key={m} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                      <input
                        type="checkbox"
                        checked={filters.mediums.includes(m)}
                        onChange={() => toggle("mediums", m)}
                        className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200"
                      />
                      <span>{m} Medium</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Class Type */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Class Type</h3>
                <div className="space-y-2.5">
                  {["Paper Classes", "Theory + Revision"].map((fmt) => (
                    <label key={fmt} className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                      <input
                        type="checkbox"
                        checked={filters.formats.includes(fmt)}
                        onChange={() => toggle("formats", fmt)}
                        className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200"
                      />
                      <span>{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Format</h3>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                    <input
                      type="checkbox"
                      checked={filters.online}
                      onChange={(e) => setFilters((p) => ({ ...p, online: e.target.checked }))}
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200"
                    />
                    <span>Online Sessions</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-dark">
                    <input
                      type="checkbox"
                      checked={filters.physical}
                      onChange={(e) => setFilters((p) => ({ ...p, physical: e.target.checked }))}
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary border-gray-200"
                    />
                    <span>Physical Classes</span>
                  </label>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-dark uppercase tracking-wider">Minimum Rating</h3>
                <div className="flex items-center gap-1">
                  {[0, 4.5, 4.7, 4.9].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters((p) => ({ ...p, minRating: rating }))}
                      className={`
                        flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all
                        ${filters.minRating === rating
                          ? "bg-primary/10 border-primary text-primary shadow-sm"
                          : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50"
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

            {/* Results bar */}
            <div className="flex justify-between items-center text-sm text-gray-500 pb-2">
              <span className="flex items-center gap-1.5">
                {isLoading ? (
                  <Loader2 size={16} className="text-primary/70 animate-spin" />
                ) : (
                  <Users size={16} className="text-primary/70" />
                )}
                Found <strong className="text-dark mx-1">{total}</strong> matching tutors
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-full border border-red-100"
                >
                  Clear Filters <X size={10} />
                </button>
              )}
            </div>

            {/* Grid */}
            <div className={`transition-opacity duration-200 ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
              {tutors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tutors.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto">
                    <Search size={24} />
                  </div>
                  <h2 className="font-extrabold text-lg text-dark">No Tutors Match Your Filters</h2>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1 || isLoading}
                  className="p-2 rounded-xl border border-gray-100 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        disabled={isLoading}
                        className={`w-9 h-9 rounded-xl text-sm font-bold border transition-all disabled:cursor-not-allowed ${
                          p === page
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "border-gray-100 text-gray-500 hover:border-primary/40 hover:text-primary"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages || isLoading}
                  className="p-2 rounded-xl border border-gray-100 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Mail, User, Phone, MessageSquare, BookOpen, ChevronDown, CheckCircle, Loader2, Send } from "lucide-react";

export default function ContactTutorModal({ tutor, onClose }) {
  // Form state
  const [form, setForm] = useState({
    studentName: "",
    studentEmail: "",
    whatsapp: "",
    phone: "",
    syllabusName: "",
    gradeName: "",
    subjectName: "",
    message: "",
  });

  // Curriculum data for chained dropdowns
  const [curriculum, setCurriculum] = useState([]);
  const [loadingCurriculum, setLoadingCurriculum] = useState(true);

  // Derived options
  const [gradeOptions, setGradeOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch curriculum (syllabuses → grades → subjects)
  useEffect(() => {
    fetch("/api/lessons")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCurriculum(data);
      })
      .catch(() => {})
      .finally(() => setLoadingCurriculum(false));
  }, []);

  // Update default message whenever key fields change
  const buildDefaultMessage = useCallback(() => {
    const parts = [];
    if (form.subjectName) parts.push(form.subjectName);
    if (form.syllabusName || form.gradeName) {
      const bracket = [form.syllabusName, form.gradeName].filter(Boolean).join(" - ");
      if (bracket) parts.push(`(${bracket})`);
    }
    const subject = parts.length > 0 ? parts.join(" ") : "tuition";
    const contact = form.whatsapp || "my number";
    return `Hi ${tutor.name}, I'm looking for ${subject} tuition. Please contact me at ${contact}. Thank you!`;
  }, [form.subjectName, form.syllabusName, form.gradeName, form.whatsapp, tutor.name]);

  // Keep message in sync with default unless user has manually edited it
  const [messageManuallyEdited, setMessageManuallyEdited] = useState(false);
  useEffect(() => {
    if (!messageManuallyEdited) {
      setForm((prev) => ({ ...prev, message: buildDefaultMessage() }));
    }
  }, [buildDefaultMessage, messageManuallyEdited]);

  // Chained dropdowns: syllabus → grades
  useEffect(() => {
    if (!form.syllabusName) {
      setGradeOptions([]);
      setSubjectOptions([]);
      setForm((prev) => ({ ...prev, gradeName: "", subjectName: "" }));
      return;
    }
    const syllabus = curriculum.find((s) => s.name === form.syllabusName);
    const grades = syllabus?.grades?.map((g) => g.name) ?? [];
    setGradeOptions(grades);
    setSubjectOptions([]);
    setForm((prev) => ({ ...prev, gradeName: "", subjectName: "" }));
  }, [form.syllabusName, curriculum]);

  // Chained dropdowns: grade → subjects
  useEffect(() => {
    if (!form.gradeName || !form.syllabusName) {
      setSubjectOptions([]);
      setForm((prev) => ({ ...prev, subjectName: "" }));
      return;
    }
    const syllabus = curriculum.find((s) => s.name === form.syllabusName);
    const grade = syllabus?.grades?.find((g) => g.name === form.gradeName);
    const subjects = grade?.subjects?.map((sub) => sub.name) ?? [];
    setSubjectOptions(subjects);
    setForm((prev) => ({ ...prev, subjectName: "" }));
  }, [form.gradeName, form.syllabusName, curriculum]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "message") setMessageManuallyEdited(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.studentName.trim()) return setError("Please enter your name.");
    if (!form.whatsapp.trim()) return setError("Please enter your WhatsApp number.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/tutor/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorId: tutor.id,
          tutorName: tutor.name,
          tutorEmail: tutor.email,
          ...form,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const syllabusOptions = curriculum.map((s) => s.name);

  const selectClass =
    "w-full text-sm font-semibold text-dark bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer";
  const inputClass =
    "w-full text-sm font-semibold text-dark bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-gray-400 placeholder:font-normal";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                <Mail size={10} />
                Contact via Email
              </div>
              <h2 className="text-xl font-black text-dark">
                Enquire with <span className="text-primary">{tutor.name}</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                Fill in your details and we'll send your request directly to the tutor.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-dark hover:border-gray-300 transition-all shrink-0 mt-1 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {success ? (
          /* Success State */
          <div className="px-6 py-12 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-black text-dark">Request Sent! 🎉</h3>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Your enquiry has been sent to <strong>{tutor.name}</strong>. They'll
              contact you on your WhatsApp soon!
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <User size={12} className="text-primary" />
                Your Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Nimal Perera"
                value={form.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <Phone size={12} className="text-green-500" />
                WhatsApp Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 0771234567"
                value={form.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <Phone size={12} className="text-primary" />
                Contact Number
                <span className="text-[10px] font-normal text-gray-400">(optional, if different)</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 0112345678"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <Mail size={12} className="text-primary" />
                Your Email
                <span className="text-[10px] font-normal text-gray-400">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. nimal@gmail.com"
                value={form.studentEmail}
                onChange={(e) => handleChange("studentEmail", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen size={10} />
                Looking For
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Syllabus Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">Syllabus</label>
              <div className="relative">
                <select
                  value={form.syllabusName}
                  onChange={(e) => handleChange("syllabusName", e.target.value)}
                  className={selectClass}
                  disabled={loadingCurriculum}
                >
                  <option value="">
                    {loadingCurriculum ? "Loading..." : "Select syllabus..."}
                  </option>
                  {syllabusOptions.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Grade Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">Grade / Year</label>
              <div className="relative">
                <select
                  value={form.gradeName}
                  onChange={(e) => handleChange("gradeName", e.target.value)}
                  className={selectClass}
                  disabled={!form.syllabusName || gradeOptions.length === 0}
                >
                  <option value="">
                    {!form.syllabusName ? "Select syllabus first" : "Select grade..."}
                  </option>
                  {gradeOptions.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600">Subject</label>
              <div className="relative">
                <select
                  value={form.subjectName}
                  onChange={(e) => handleChange("subjectName", e.target.value)}
                  className={selectClass}
                  disabled={!form.gradeName || subjectOptions.length === 0}
                >
                  <option value="">
                    {!form.gradeName ? "Select grade first" : "Select subject..."}
                  </option>
                  {subjectOptions.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <MessageSquare size={12} className="text-primary" />
                Message to Tutor
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Your message..."
                className={`${inputClass} resize-none leading-relaxed`}
              />
              <p className="text-[10px] text-gray-400 font-medium">
                ✏️ Auto-filled from your details above. Feel free to change it.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-xs font-semibold bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                <X size={14} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold rounded-xl shadow-glow-primary hover:-translate-y-0.5 disabled:translate-y-0 transition-all duration-200 text-sm cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Enquiry to {tutor.name}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

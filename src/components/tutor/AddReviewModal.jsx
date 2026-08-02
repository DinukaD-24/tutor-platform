"use client";

import { useState, useEffect } from "react";
import { Star, X, Send, CheckCircle } from "lucide-react";

export default function AddReviewModal({ tutorId, tutorName, onReviewSubmitted }) {
    const [open, setOpen] = useState(false);
    const [canReview, setCanReview] = useState(false); // hide for tutors
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [studentName, setStudentName] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Only show review button for non-tutor users
        fetch(`/api/student/follow?tutorId=${tutorId}`)
            .then(res => res.json())
            .then(data => {
                // if isTutor === true, the user is a tutor — hide the review button
                setCanReview(!data.isTutor);
            })
            .catch(() => setCanReview(false));
    }, [tutorId]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (rating === 0) {
            setError("Please select a star rating.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/tutor/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tutorId, studentName, rating, comment }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to submit review.");
                return;
            }

            setSuccess(true);
            if (onReviewSubmitted) onReviewSubmitted(data.review);
            // Auto-close after 2 seconds
            setTimeout(() => {
                setOpen(false);
                setSuccess(false);
                setRating(0);
                setStudentName("");
                setComment("");
            }, 2000);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setSuccess(false);
        setRating(0);
        setStudentName("");
        setComment("");
    };

    return (
        <>
            {/* Trigger Button — only for non-tutor users */}
            {canReview && <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 hover:border-amber-300 font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer"
            >
                <Star size={14} className="fill-amber-400 text-amber-400" />
                Write a Review
            </button>}

            {/* Modal Overlay */}
            {open && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fadeIn">
                    <div className="bg-white rounded-3xl border border-gray-100 max-w-md w-full p-6 md:p-8 shadow-2xl space-y-6">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                            <div>
                                <h2 className="text-lg font-black text-dark">Write a Review</h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Reviewing <span className="font-bold text-primary">{tutorName}</span>
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-1.5 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Success State */}
                        {success ? (
                            <div className="text-center space-y-4 py-4">
                                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto">
                                    <CheckCircle size={28} className="text-green-500" />
                                </div>
                                <h3 className="font-extrabold text-dark">Review Submitted!</h3>
                                <p className="text-sm text-gray-500">
                                    Thank you for your feedback. Your review is now live on {tutorName}&apos;s profile.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Star Rating Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                        Your Rating *
                                    </label>
                                    <div className="flex items-center gap-1.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHovered(star)}
                                                onMouseLeave={() => setHovered(0)}
                                                className="transition-transform hover:scale-110 cursor-pointer"
                                            >
                                                <Star
                                                    size={28}
                                                    className={
                                                        star <= (hovered || rating)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-gray-200"
                                                    }
                                                />
                                            </button>
                                        ))}
                                        {rating > 0 && (
                                            <span className="ml-2 text-sm font-bold text-amber-600">
                                                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Student Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        required
                                        placeholder="e.g. Tharushi Perera"
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>

                                {/* Comment */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                        Your Review
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={4}
                                        placeholder="Share your experience with this tutor — what helped you most, how they explained things, etc."
                                        className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-3.5 py-2.5 text-sm text-dark placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none transition-all"
                                    />
                                </div>

                                {/* Error */}
                                {error && (
                                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-2.5">
                                        {error}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold text-sm rounded-xl transition-all cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-glow-primary transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        <Send size={14} />
                                        {loading ? "Submitting..." : "Submit Review"}
                                    </button>
                                </div>

                            </form>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}

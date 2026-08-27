"use client";

import { useState, useEffect } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function FollowButton({ tutorId }) {
    const supabase = createClient();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [canFollow, setCanFollow] = useState(false); // only true for authenticated, non-tutor students

    useEffect(() => {
        const checkStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/student/follow?tutorId=${tutorId}`);
                if (res.ok) {
                    const data = await res.json();
                    // If the API says this user is a tutor, don't show the follow button
                    if (data.isTutor) {
                        setCanFollow(false);
                    } else {
                        setIsFollowing(data.following);
                        setCanFollow(true);
                    }
                }
            } catch (err) {
                console.error("Error checking follow status:", err);
            } finally {
                setLoading(false);
            }
        };
        checkStatus();
    }, [tutorId, supabase]);

    const handleFollow = async () => {
        if (!canFollow) return;
        setLoading(true);
        try {
            const res = await fetch("/api/student/follow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tutorId }),
            });
            if (res.ok) {
                const data = await res.json();
                setIsFollowing(data.following);
            }
        } catch (err) {
            console.error("Error toggling follow:", err);
        } finally {
            setLoading(false);
        }
    };

    // Render a subtle skeleton loader while checking status to prevent layout jumps
    if (loading) {
        return <div className="w-full h-[46px] rounded-full bg-gray-100/70 animate-pulse shrink-0" />;
    }

    // If not a student or not allowed to follow, hide button
    if (!canFollow) {
        return null;
    }

    return (
        <button
            onClick={handleFollow}
            className={`
                w-full flex items-center justify-center gap-2
                py-3 font-extrabold text-sm rounded-full
                transition-all duration-200 cursor-pointer
                ${isFollowing
                    ? "bg-white border-2 border-[#0d8a6e]/25 text-[#0d8a6e] hover:bg-[#f0fdf9]"
                    : "bg-[#0d8a6e] text-white hover:bg-[#096d57] shadow-[0_4px_20px_rgba(13,138,110,0.35)] hover:-translate-y-0.5"
                }
            `}
        >
            {isFollowing ? (
                <>
                    <UserCheck size={16} />
                    Following
                </>
            ) : (
                <>
                    <UserPlus size={16} />
                    Follow Tutor
                </>
            )}
        </button>
    );
}

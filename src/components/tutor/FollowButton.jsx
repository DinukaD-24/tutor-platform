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

    // Don't show anything during loading or if not a student
    if (loading || !canFollow) {
        return null;
    }

    return (
        <button
            onClick={handleFollow}
            className={`
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3.5
                font-bold
                text-sm
                rounded-xl
                transition-all
                duration-200
                cursor-pointer
                ${isFollowing
                    ? "bg-white border-2 border-primary/20 text-primary hover:bg-primary/5"
                    : "bg-primary text-white hover:bg-primary-dark shadow-glow-primary hover:-translate-y-0.5"
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

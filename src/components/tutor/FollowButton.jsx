"use client";

import { useState, useEffect } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function FollowButton({ tutorId }) {
    const supabase = createClient();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isStudent, setIsStudent] = useState(false);

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
                    setIsFollowing(data.following);
                    setIsStudent(true);
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
        if (!isStudent) return;
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

    if (loading) {
        return (
            <div className="w-full py-3.5 bg-gray-50 border border-gray-100 text-gray-400 text-xs font-bold rounded-xl text-center">
                Loading follow status...
            </div>
        );
    }

    if (!isStudent) {
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

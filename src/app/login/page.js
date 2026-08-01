"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, GraduationCap, School, ArrowRight, UserPlus } from "lucide-react";

function LoginForm() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get("error");

    const [role, setRole] = useState(errorParam === "no_tutor_app" ? "tutor" : "student"); // "student" | "tutor"
    const [error, setError] = useState(errorParam || "");
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async (selectedRole) => {
        setError("");
        setLoading(true);
        const targetRole = selectedRole || role;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/dashboard&role=${targetRole}`,
            },
        });
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const isNoTutorAppError = error === "no_tutor_app";

    return (
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
            
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-dark tracking-tight">Welcome Back</h1>
                <p className="text-gray-400 text-sm">Sign in to access your TutorHub portal.</p>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                <button
                    type="button"
                    onClick={() => { setRole("student"); setError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        role === "student"
                            ? "bg-white text-primary shadow-sm border border-gray-100/50"
                            : "text-gray-400 hover:text-dark"
                    }`}
                >
                    <GraduationCap size={16} />
                    I am a Student
                </button>
                <button
                    type="button"
                    onClick={() => { setRole("tutor"); setError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        role === "tutor"
                            ? "bg-white text-primary shadow-sm border border-gray-100/50"
                            : "text-gray-400 hover:text-dark"
                    }`}
                >
                    <School size={16} />
                    I am a Tutor
                </button>
            </div>

            {/* Custom No Tutor Application Banner */}
            {isNoTutorAppError ? (
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3.5 text-left animate-slideDown">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                        <ShieldAlert size={18} className="text-amber-600 shrink-0" />
                        <span>No Tutor Profile or Application Found</span>
                    </div>
                    <p className="text-xs text-amber-700 leading-relaxed">
                        We couldn&apos;t find a registered tutor profile or application associated with this Google account. To start teaching on TutorHub, please submit a tutor application first.
                    </p>
                    <Link
                        href="/become-a-tutor"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold text-xs rounded-xl shadow-glow-primary hover:bg-primary-dark transition-all text-center"
                    >
                        <UserPlus size={14} />
                        Apply to Become a Tutor
                    </Link>
                </div>
            ) : error ? (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs animate-slideDown">
                    <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            ) : null}

            {/* Google Login for both Student and Tutor */}
            <div className="space-y-4 pt-1">
                <p className="text-center text-xs text-gray-400 leading-relaxed px-2">
                    {role === "student" 
                        ? "Students can log in instantly using a Google account."
                        : "Approved tutors can log in using their registered Google account."}
                </p>

                <button
                    type="button"
                    onClick={() => handleGoogleLogin(role)}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-100 hover:border-primary/20 bg-white hover:bg-gray-50/50 rounded-xl font-bold text-sm text-dark transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50"
                >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                            fill="#EA4335"
                            d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 15 0 12 0 7.37 0 3.39 2.67 1.5 6.57l3.96 3.07C6.39 6.84 8.97 5.04 12 5.04z"
                        />
                        <path
                            fill="#4285F4"
                            d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.11 2.73-2.36 3.58l3.66 2.84c2.14-1.98 3.39-4.88 3.39-8.57z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.46 14.93C5.22 14.23 5.08 13.48 5.08 12c0-1.48.14-2.23.38-2.93L1.5 6.57C.54 8.57 0 10.74 0 12c0 1.26.54 3.43 1.5 5.43l3.96-3.07z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.01.68-2.31 1.09-3.92 1.09-3.03 0-5.61-1.8-6.54-4.6l-3.96 3.07C3.39 21.33 7.37 24 12 24z"
                        />
                    </svg>
                    {role === "student" ? "Sign In with Google" : "Log In as Tutor with Google"}
                </button>
            </div>

            <div className="text-center text-xs text-gray-400">
                Want to become a tutor?{" "}
                <Link href="/become-a-tutor" className="text-primary font-bold hover:underline">
                    Apply Now
                </Link>
            </div>

        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center pt-24 pb-12 px-6">
            <Suspense fallback={
                <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-center py-16 text-gray-400 text-sm">
                    Loading login portal...
                </div>
            }>
                <LoginForm />
            </Suspense>
        </main>
    );
}

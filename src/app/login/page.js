"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, ShieldAlert } from "lucide-react";

function LoginForm() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(errorParam || "");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6">
            
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-dark tracking-tight">Welcome Back</h1>
                <p className="text-gray-400 text-sm">Log in to manage your TutorHub profile and lessons.</p>
            </div>

            {error && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs">
                    <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        />
                        <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-100 bg-gray-50/50 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        />
                        <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold text-sm rounded-xl shadow-glow-primary hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {loading ? "Logging in..." : "Log In"}
                    <ArrowRight size={16} />
                </button>
            </form>

            <div className="text-center text-xs text-gray-400">
                Don't have an account yet?{" "}
                <Link href="/become-a-tutor" className="text-primary font-bold hover:underline">
                    Apply as a Tutor
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

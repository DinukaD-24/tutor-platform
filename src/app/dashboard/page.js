import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import Link from "next/link";

export default async function DashboardPage() {
    const supabase = await createClient();

    // 1. Get the current logged-in user from Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    // 2. Fetch the tutor profile based on the authenticated email
    const tutor = await prisma.tutor.findUnique({
        where: { email: user.email },
        include: {
            videos: true, // Fetch their uploaded lessons
            reviews: true,
        }
    });

    if (!tutor) {
        // If user is authenticated but no tutor profile exists yet (pending approval)
        return (
            <main className="min-h-screen bg-background text-dark pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="max-w-md bg-white border border-gray-100 rounded-3xl p-8 text-center space-y-5 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto font-bold text-xl">
                        !
                    </div>
                    <h1 className="text-2xl font-black text-dark">Profile Pending Approval</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Your account (<strong>{user.email}</strong>) is registered, but we couldn't find an approved tutor profile. 
                        If you recently applied, please wait 1–3 business days for verification.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                        <Link 
                            href="/" 
                            className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-glow-primary hover:bg-primary-dark transition-all text-center"
                        >
                            Go to Home
                        </Link>
                        <form action={async () => {
                            'use server';
                            const supabase = await createClient();
                            await supabase.auth.signOut();
                            redirect('/login');
                        }}>
                            <button type="submit" className="w-full py-2.5 bg-gray-50 text-gray-500 hover:text-dark hover:bg-gray-100 font-bold text-xs rounded-xl transition-all">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <DashboardClient tutor={tutor} />
    );
}

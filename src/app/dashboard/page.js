import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import StudentDashboardClient from "./StudentDashboardClient";
import Link from "next/link";

export default async function DashboardPage() {
    const supabase = await createClient();

    // 1. Get the current logged-in user from Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    // 2. Check if user is an approved tutor
    const tutor = await prisma.tutor.findUnique({
        where: { email: user.email },
        include: {
            videos: true,
            reviews: true,
        }
    });

    if (tutor) {
        return <DashboardClient tutor={tutor} />;
    }

    // 3. Check if pending tutor application
    const pendingApplication = await prisma.tutorApplication.findFirst({
        where: { email: user.email }
    });

    if (pendingApplication) {
        return (
            <main className="min-h-screen bg-background text-dark pt-24 pb-20 px-6 flex items-center justify-center">
                <div className="max-w-md bg-white border border-gray-100 rounded-3xl p-8 text-center space-y-5 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto font-bold text-xl">
                        !
                    </div>
                    <h1 className="text-2xl font-black text-dark">Application Pending Approval</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Your tutor application for <strong>{user.email}</strong> is under review. 
                        Please wait 1–3 business days for verification.
                    </p>
                    <div className="flex flex-col gap-2 pt-2">
                        <Link href="/" className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-glow-primary hover:bg-primary-dark transition-all text-center">
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

    // 4. Otherwise, treat as student — auto-create profile if missing
    let student = await prisma.student.findUnique({
        where: { email: user.email },
        include: {
            visitedVideos: {
                include: {
                    tutor: true,
                    topic: true,
                }
            },
            followedTutors: true,
        }
    });

    if (!student) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
        student = await prisma.student.create({
            data: { email: user.email, name },
            include: {
                visitedVideos: { include: { tutor: true, topic: true } },
                followedTutors: true,
            }
        });
    }

    // Serialize student to avoid passing Prisma objects to client components
    const serializedStudent = {
        id: student.id,
        name: student.name,
        email: student.email,
        visitedVideos: student.visitedVideos.map(v => ({
            id: v.id,
            title: v.title,
            youtubeId: v.youtubeId,
            tutorName: v.tutor?.name || "Unknown Tutor",
            tutorId: v.tutor?.id || null,
            tutorSlug: v.tutor?.slug || null,
            topicName: v.topic?.name || null,
        })),
        followedTutors: student.followedTutors.map(t => ({
            id: t.id,
            name: t.name,
            slug: t.slug,
            subject: t.subject,
            image: t.image,
            rating: t.rating,
            reviewsCount: t.reviewsCount,
        })),
    };

    return <StudentDashboardClient student={serializedStudent} />;
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const syllabus = searchParams.get("syllabus");
        const mode = searchParams.get("mode");
        const search = searchParams.get("search");

        const where = {
            status: "active",
        };

        if (syllabus && syllabus !== "all") {
            where.syllabus = { contains: syllabus, mode: "insensitive" };
        }

        if (mode && mode !== "all") {
            where.mode = { contains: mode, mode: "insensitive" };
        }

        if (search) {
            where.OR = [
                { subject: { contains: search, mode: "insensitive" } },
                { gradeOrAge: { contains: search, mode: "insensitive" } },
                { message: { contains: search, mode: "insensitive" } },
                { location: { contains: search, mode: "insensitive" } },
                { syllabus: { contains: search, mode: "insensitive" } },
            ];
        }

        const requests = await prisma.tuitionRequest.findMany({
            where,
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        // Hide student private email from the public GET API
        const safeRequests = requests.map((r) => ({
            id: r.id,
            studentName: r.studentName,
            syllabus: r.syllabus,
            gradeOrAge: r.gradeOrAge,
            subject: r.subject,
            classType: r.classType,
            mode: r.mode,
            location: r.location,
            message: r.message,
            createdAt: r.createdAt.toISOString(),
            status: r.status,
        }));

        return NextResponse.json(safeRequests);
    } catch (error) {
        console.error("Tuition requests GET error:", error);
        return NextResponse.json(
            { error: "Failed to fetch tuition requests." },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const body = await request.json();
        const {
            studentName,
            studentEmail,
            syllabus,
            gradeOrAge,
            subject,
            classType,
            mode,
            location,
            message,
        } = body;

        // Ensure student name & email are provided (from auth user or form)
        const email = user?.email || studentEmail;
        const name = studentName || user?.user_metadata?.full_name || user?.user_metadata?.name || "Student";

        if (!email || !subject || !message) {
            return NextResponse.json(
                { error: "Subject, message description, and student email are required." },
                { status: 400 }
            );
        }

        const newRequest = await prisma.tuitionRequest.create({
            data: {
                studentId: user?.id || null,
                studentName: name.trim(),
                studentEmail: email.trim(),
                syllabus: syllabus || "Local A/L",
                gradeOrAge: gradeOrAge || "Not Specified",
                subject: subject.trim(),
                classType: classType || "Revision & Theory",
                mode: mode || "Online & Physical",
                location: location ? location.trim() : null,
                message: message.trim(),
                status: "active",
            },
        });

        return NextResponse.json({ success: true, id: newRequest.id }, { status: 201 });
    } catch (error) {
        console.error("Tuition request create POST error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to create tuition request." },
            { status: 500 }
        );
    }
}

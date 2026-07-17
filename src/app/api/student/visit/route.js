import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { videoId } = await request.json();
    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    // Find the student
    const student = await prisma.student.findUnique({
      where: { email: user.email },
    });

    if (!student) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
    }

    // Connect video to student's visited videos (idempotent in Prisma)
    await prisma.student.update({
      where: { id: student.id },
      data: {
        visitedVideos: {
          connect: { id: videoId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Student visit video error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";

export async function POST(request) {
  try {
    const auth = await requireStudent();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const user = auth.user;

    const { videoId } = await request.json();
    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    // Find or create the student
    let student = await prisma.student.findUnique({
      where: { email: user.email },
    });

    if (!student) {
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
      student = await prisma.student.create({
        data: { email: user.email, name },
      });
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

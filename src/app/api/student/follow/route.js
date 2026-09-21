import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireStudent } from "@/lib/auth";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    const auth = await requireStudent();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }
    const user = auth.user;

    const { tutorId } = await request.json();
    if (!tutorId) {
      return NextResponse.json({ error: "Tutor ID is required" }, { status: 400 });
    }

    // Role Guard: Check if the user is a registered Tutor
    const isTutorAccount = await prisma.tutor.findUnique({
      where: { email: user.email },
    });

    if (isTutorAccount) {
      return NextResponse.json(
        { error: "Tutors cannot follow tutors." },
        { status: 403 }
      );
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


    // Check if currently following
    const followingRecord = await prisma.student.findFirst({
      where: {
        id: student.id,
        followedTutors: {
          some: { id: tutorId },
        },
      },
    });

    const isFollowing = !!followingRecord;

    // Toggle the follow relationship
    await prisma.student.update({
      where: { id: student.id },
      data: {
        followedTutors: {
          [isFollowing ? "disconnect" : "connect"]: { id: tutorId },
        },
      },
    });

    return NextResponse.json({ success: true, following: !isFollowing });
  } catch (error) {
    console.error("Student follow tutor error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ following: false, isTutor: false, isAuthenticated: false });
    }

    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get("tutorId");

    if (!tutorId) {
      return NextResponse.json({ error: "Tutor ID is required" }, { status: 400 });
    }

    // Role Guard: Check if user is a registered Tutor
    const isTutorAccount = await prisma.tutor.findUnique({
      where: { email: user.email },
    });

    if (isTutorAccount) {
      return NextResponse.json({ following: false, isTutor: true, isAuthenticated: true });
    }

    const student = await prisma.student.findUnique({
      where: { email: user.email },
    });

    if (!student) {
      return NextResponse.json({ following: false, isTutor: false, isAuthenticated: true });
    }

    const followingRecord = await prisma.student.findFirst({
      where: {
        id: student.id,
        followedTutors: {
          some: { id: tutorId },
        },
      },
    });

    return NextResponse.json({ following: !!followingRecord, isTutor: false, isAuthenticated: true });
  } catch (error) {
    console.error("Check follow status error:", error);
    return NextResponse.json({ following: false, isTutor: false });
  }
}

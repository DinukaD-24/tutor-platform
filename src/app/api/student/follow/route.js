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

    // Find the student
    const student = await prisma.student.findUnique({
      where: { email: user.email },
    });

    if (!student) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
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
      return NextResponse.json({ following: false, isTutor: false });
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
      return NextResponse.json({ following: false, isTutor: true });
    }

    const student = await prisma.student.findUnique({
      where: { email: user.email },
    });

    if (!student) {
      return NextResponse.json({ following: false, isTutor: false });
    }

    const followingRecord = await prisma.student.findFirst({
      where: {
        id: student.id,
        followedTutors: {
          some: { id: tutorId },
        },
      },
    });

    return NextResponse.json({ following: !!followingRecord, isTutor: false });
  } catch (error) {
    console.error("Check follow status error:", error);
    return NextResponse.json({ following: false, isTutor: false });
  }
}

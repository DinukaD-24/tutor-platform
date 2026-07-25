import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
  try {
    // 1. Authenticate the request
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { title, youtubeId, subject, tutorId, description } = body;

    if (!title || !youtubeId || !subject || !tutorId) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // 3. Find a valid topic to link the video to
    // In our database structure, Videos are grouped under Topics, which are grouped under Subjects.
    const subjectRecord = await prisma.subject.findFirst({
      where: {
        name: {
          contains: subject,
          mode: "insensitive",
        },
      },
      include: {
        topics: true,
      },
    });

    if (!subjectRecord || !subjectRecord.topics || subjectRecord.topics.length === 0) {
      return NextResponse.json(
        { error: `No curriculum topics found for subject '${subject}'.` },
        { status: 400 }
      );
    }

    // Fallback: assign to the first topic found for that subject
    const targetTopicId = subjectRecord.topics[0].id;

    // 4. Save the new video/lesson to the database
    const savedVideo = await prisma.video.create({
      data: {
        title,
        youtubeId,
        tutorId,
        topicId: targetTopicId,
        ...(description ? { description } : {}),
      },
    });

    return NextResponse.json(
      { success: true, lesson: savedVideo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload lesson error:", error);
    return NextResponse.json(
      { error: "Something went wrong saving the lesson. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

// Format helper: capitalize first letter of each word cleanly
function formatName(str) {
  if (!str) return "";
  return str
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function GET(request) {
  try {
    const syllabuses = await prisma.syllabus.findMany({
      include: {
        grades: {
          orderBy: { order: "asc" },
          include: {
            subjects: {
              include: {
                topics: {
                  orderBy: { order: "asc" }
                }
              }
            }
          }
        }
      }
    });
    return NextResponse.json(syllabuses);
  } catch (error) {
    console.error("Fetch curriculum error:", error);
    return NextResponse.json({ error: "Failed to fetch curriculum options" }, { status: 500 });
  }
}

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
    let { title, youtubeId, subject, topicName, syllabusSlug, gradeSlug, tutorId, description, addToProfile } = body;

    if (!title || !youtubeId || !tutorId) {
      return NextResponse.json(
        { error: "Please fill in all required fields (title, video link)." },
        { status: 400 }
      );
    }

    // Verify ownership
    const tutorRecord = await prisma.tutor.findUnique({ where: { id: tutorId } });
    if (!tutorRecord || tutorRecord.email !== user.email) {
      return NextResponse.json(
        { error: "Forbidden. You can only upload lessons to your own profile." },
        { status: 403 }
      );
    }

    const formattedSubject = formatName(subject || "General");
    const formattedTopic = formatName(topicName || title);

    // Resolve grade by selected syllabus + grade slugs
    const gradeRecord = await prisma.grade.findFirst({
      where: {
        slug: gradeSlug,
        syllabus: { slug: syllabusSlug }
      }
    });

    if (!gradeRecord) {
      return NextResponse.json(
        { error: "Selected syllabus and grade do not match any curriculum record." },
        { status: 400 }
      );
    }

    // Find or create subject & topic under the selected grade
    let subjectRecord = await prisma.subject.findFirst({
      where: {
        name: { equals: formattedSubject, mode: "insensitive" },
        gradeId: gradeRecord.id
      },
      include: { topics: true, grade: { include: { syllabus: true } } }
    });

    if (!subjectRecord) {
      const subSlug = formattedSubject.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      subjectRecord = await prisma.subject.create({
        data: {
          name: formattedSubject,
          slug: subSlug,
          gradeId: gradeRecord.id
        },
        include: { topics: true, grade: { include: { syllabus: true } } }
      });
    }

    let targetTopicId;
    if (subjectRecord) {
      // Find matching topic or create one
      let existingTopic = subjectRecord.topics.find(
        t => t.name.toLowerCase() === formattedTopic.toLowerCase()
      );
      if (!existingTopic) {
        const topSlug = `${subjectRecord.slug}-${formattedTopic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
        existingTopic = await prisma.topic.create({
          data: {
            name: formattedTopic,
            slug: topSlug,
            subjectId: subjectRecord.id
          }
        });
      }
      targetTopicId = existingTopic.id;
    } else {
      // Fallback fallback topic
      const fallbackTopic = await prisma.topic.findFirst();
      if (!fallbackTopic) {
        return NextResponse.json({ error: "No target topic found in curriculum database." }, { status: 400 });
      }
      targetTopicId = fallbackTopic.id;
    }

    // 4. Save video
    const savedVideo = await prisma.video.create({
      data: {
        title,
        youtubeId,
        tutorId,
        topicId: targetTopicId,
        ...(description ? { description } : {}),
      },
    });

    // 5. Check if tutor's specializations include this subject; optionally update if addToProfile is true
    const currentSpecs = tutorRecord.specializations || [];
    const isNewSubjectForTutor = !currentSpecs.some(s => s.toLowerCase() === formattedSubject.toLowerCase());

    if (addToProfile && isNewSubjectForTutor) {
      await prisma.tutor.update({
        where: { id: tutorId },
        data: { specializations: [...currentSpecs, formattedSubject] }
      });
    }

    return NextResponse.json(
      {
        success: true,
        lesson: savedVideo,
        isNewSubjectForTutor,
        subjectName: formattedSubject
      },
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

export async function PUT(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, youtubeId, description } = body;

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    const video = await prisma.video.findUnique({
      where: { id },
      include: { tutor: true }
    });

    if (!video || video.tutor.email !== user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.video.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(youtubeId && { youtubeId }),
        ...(description !== undefined && { description })
      }
    });

    return NextResponse.json({ success: true, lesson: updated });
  } catch (error) {
    console.error("Edit lesson error:", error);
    return NextResponse.json({ error: "Failed to edit lesson" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }

    const video = await prisma.video.findUnique({
      where: { id },
      include: { tutor: true }
    });

    if (!video || video.tutor.email !== user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.video.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete lesson error:", error);
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}

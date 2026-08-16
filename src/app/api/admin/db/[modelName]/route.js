import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

function getModel(name) {
  const mapping = {
    syllabus: prisma.syllabus,
    grade: prisma.grade,
    subject: prisma.subject,
    topic: prisma.topic,
    video: prisma.video,
    material: prisma.material,
    tutor: prisma.tutor,
    review: prisma.review,
    student: prisma.student,
    tutorapplication: prisma.tutorApplication,
    contactmessage: prisma.contactMessage,
    tutorad: prisma.tutorAd,
  };
  return mapping[name.toLowerCase()];
}

function getModelIncludes(name) {
  const modelKey = name.toLowerCase();
  if (modelKey === "tutorad") {
    return { tutor: true };
  }

  if (modelKey === "grade") {
    return { syllabus: true };
  }
  if (modelKey === "subject") {
    return { grade: { include: { syllabus: true } } };
  }
  if (modelKey === "topic") {
    return { subject: { include: { grade: { include: { syllabus: true } } } } };
  }
  if (modelKey === "video") {
    return {
      topic: { include: { subject: { include: { grade: { include: { syllabus: true } } } } } },
      tutor: true,
    };
  }
  if (modelKey === "material") {
    return {
      topic: { include: { subject: { include: { grade: { include: { syllabus: true } } } } } },
    };
  }
  if (modelKey === "review") {
    return { tutor: true };
  }
  return undefined;
}

function sanitizeData(data, modelName) {
  const sanitized = { ...data };
  // Remove nested relation objects that might be present when editing
  const relationKeys = [
    "syllabus", "grade", "subject", "topic", "tutor",
    "materials", "videos", "grades", "subjects", "topics",
    "reviews", "followers", "visitors", "relatedTo", "relatedBy"
  ];
  relationKeys.forEach(k => {
    delete sanitized[k];
  });

  // Convert array fields for Tutor model if passed as comma-separated strings
  if (modelName && modelName.toLowerCase() === "tutor") {
    const arrayFields = ["languages", "syllabuses", "qualifications", "specializations"];
    arrayFields.forEach(field => {
      if (typeof sanitized[field] === "string") {
        sanitized[field] = sanitized[field]
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);
      }
    });

    // Keep primary 'subject' in sync with the first item in specializations
    if (Array.isArray(sanitized.specializations) && sanitized.specializations.length > 0) {
      sanitized.subject = sanitized.specializations[0];
    }
  }

  return sanitized;
}

async function verifyAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user || user.email !== "tutorhubadmin@gmail.com") {
    return false;
  }
  return true;
}

export async function GET(request, { params }) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelName } = await params;
    const model = getModel(modelName);
    if (!model) {
      return NextResponse.json({ error: "Invalid model name" }, { status: 400 });
    }

    const includes = getModelIncludes(modelName);
    const records = await model.findMany({
      take: 200,
      ...(includes ? { include: includes } : {})
    });
    return NextResponse.json(records);
  } catch (error) {
    console.error("Admin DB GET error:", error);
    return NextResponse.json({ error: "An error occurred while fetching records." }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelName } = await params;
    const model = getModel(modelName);
    if (!model) {
      return NextResponse.json({ error: "Invalid model name" }, { status: 400 });
    }

    const rawData = await request.json();
    const data = sanitizeData(rawData, modelName);

    const created = await model.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Admin DB POST error:", error);
    return NextResponse.json({ error: error.message || "An error occurred while creating the record." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelName } = await params;
    const model = getModel(modelName);
    if (!model) {
      return NextResponse.json({ error: "Invalid model name" }, { status: 400 });
    }

    const rawData = await request.json();
    const { id, ...rest } = rawData;
    if (!id) {
      return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
    }

    const data = sanitizeData(rest, modelName);
    const updated = await model.update({
      where: { id },
      data
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin DB PUT error:", error);
    return NextResponse.json({ error: error.message || "An error occurred while updating the record." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!await verifyAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { modelName } = await params;
    const model = getModel(modelName);
    if (!model) {
      return NextResponse.json({ error: "Invalid model name" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required for delete" }, { status: 400 });
    }

    await model.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DB DELETE error:", error);
    return NextResponse.json({ error: "An error occurred while deleting the record." }, { status: 500 });
  }
}

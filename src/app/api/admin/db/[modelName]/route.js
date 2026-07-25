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
    tutor: prisma.tutor,
    review: prisma.review,
    student: prisma.student,
    tutorapplication: prisma.tutorApplication,
    contactmessage: prisma.contactMessage,
  };
  return mapping[name.toLowerCase()];
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

    const records = await model.findMany({
      take: 100
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

    const data = await request.json();
    const created = await model.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Admin DB POST error:", error);
    return NextResponse.json({ error: "An error occurred while creating the record." }, { status: 500 });
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

    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
    }

    const updated = await model.update({
      where: { id },
      data
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin DB PUT error:", error);
    return NextResponse.json({ error: "An error occurred while updating the record." }, { status: 500 });
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

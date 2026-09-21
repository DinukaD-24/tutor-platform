import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTutor } from "@/lib/auth";

// GET: Fetch all contact requests for the logged-in tutor
export async function GET() {
  try {
    const auth = await requireTutor();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const tutor = await prisma.tutor.findUnique({
      where: { email: auth.user.email },
      select: { id: true },
    });

    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    const requests = await prisma.tutorContactRequest.findMany({
      where: { tutorId: tutor.id },
      orderBy: { createdAt: "desc" },
    });

    const unreadCount = requests.filter((r) => !r.isRead).length;

    return NextResponse.json({ requests, unreadCount });
  } catch (error) {
    console.error("Error fetching contact requests:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH: Mark a specific request as read
export async function PATCH(request) {
  try {
    const auth = await requireTutor();
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Request ID required" }, { status: 400 });
    }

    const tutor = await prisma.tutor.findUnique({
      where: { email: auth.user.email },
      select: { id: true },
    });

    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }


    // Ensure the request belongs to this tutor
    const contactReq = await prisma.tutorContactRequest.findFirst({
      where: { id, tutorId: tutor.id },
    });

    if (!contactReq) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.tutorContactRequest.update({
      where: { id },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking request as read:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

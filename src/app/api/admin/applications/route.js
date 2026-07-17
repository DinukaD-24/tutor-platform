import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user || user.email !== "tutorhubadmin@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.tutorApplication.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Fetch applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user || user.email !== "tutorhubadmin@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, action } = body; // action is 'approve' or 'reject'

    if (!id || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = await prisma.tutorApplication.findUnique({
      where: { id }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Generate a unique slug
      let baseSlug = application.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      let slug = baseSlug;
      let count = 0;
      while (true) {
        const existingTutor = await prisma.tutor.findUnique({
          where: { slug }
        });
        if (!existingTutor) break;
        count++;
        slug = `${baseSlug}-${count}`;
      }

      await prisma.$transaction(async (tx) => {
        // Create tutor record
        await tx.tutor.create({
          data: {
            slug,
            name: application.name,
            email: application.email,
            phone: application.phone,
            university: application.university || "Other",
            subject: application.subjects.split(",")[0]?.trim() || "ICT",
            tutorType: application.experience?.toLowerCase().includes("school") ? "School Teacher" : "Private Tutor",
            experience: application.experience || "1 year",
            bio: application.bio,
            onlineAvailable: true,
            physicalAvailable: false,
            rating: 5.0,
            reviewsCount: 0,
            lessonsCount: 0,
            studentsCount: 0,
            languages: ["English", "Sinhala"],
            price: "LKR 1,500",
            location: "Colombo",
            qualifications: [application.experience || "Educator"],
            specializations: application.subjects.split(",").map(s => s.trim()),
          }
        });

        // Update application status
        await tx.tutorApplication.update({
          where: { id },
          data: { status: "approved" }
        });
      });

      return NextResponse.json({ success: true, status: "approved" });
    } else if (action === "reject") {
      await prisma.tutorApplication.update({
        where: { id },
        data: { status: "rejected" }
      });
      return NextResponse.json({ success: true, status: "rejected" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Handle application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

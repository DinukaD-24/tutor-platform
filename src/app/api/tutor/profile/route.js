import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tutor = await prisma.tutor.findUnique({
      where: { email: user.email },
      include: {
        videos: {
          include: {
            topic: {
              include: { subject: true }
            }
          }
        },
        reviews: true
      }
    });

    if (!tutor) {
      return NextResponse.json({ error: "Tutor profile not found" }, { status: 404 });
    }

    return NextResponse.json(tutor);
  } catch (error) {
    console.error("Fetch tutor profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tutor = await prisma.tutor.findUnique({
      where: { email: user.email }
    });

    if (!tutor) {
      return NextResponse.json({ error: "Tutor profile not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      university,
      subject,
      tutorType,
      experience,
      bio,
      teachingStyle,
      price,
      onlineAvailable,
      physicalAvailable,
      location,
      languages,
      specializations,
      qualifications,
      image
    } = body;

    const updated = await prisma.tutor.update({
      where: { id: tutor.id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(university !== undefined && { university }),
        ...(subject !== undefined && { subject }),
        ...(tutorType !== undefined && { tutorType }),
        ...(experience !== undefined && { experience }),
        ...(bio !== undefined && { bio }),
        ...(teachingStyle !== undefined && { teachingStyle }),
        ...(price !== undefined && { price }),
        ...(onlineAvailable !== undefined && { onlineAvailable: Boolean(onlineAvailable) }),
        ...(physicalAvailable !== undefined && { physicalAvailable: Boolean(physicalAvailable) }),
        ...(location !== undefined && { location }),
        ...(languages !== undefined && { languages }),
        ...(specializations !== undefined && { specializations }),
        ...(qualifications !== undefined && { qualifications }),
        ...(image !== undefined && { image }),
      }
    });

    return NextResponse.json({ success: true, tutor: updated });
  } catch (error) {
    console.error("Update tutor profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

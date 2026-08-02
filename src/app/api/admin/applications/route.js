import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { resend } from "@/lib/resend";
import { tutorHubEmailTemplate } from "@/lib/emailTemplate";


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

    const existingTutors = await prisma.tutor.findMany({
      select: { email: true }
    });
    const tutorEmails = new Set(existingTutors.map(t => t.email.toLowerCase()));

    // Count occurrences of each applicant email
    const emailCounts = {};
    applications.forEach(app => {
      const e = app.email.toLowerCase();
      emailCounts[e] = (emailCounts[e] || 0) + 1;
    });

    const enrichedApplications = applications.map(app => {
      const emailLower = app.email.toLowerCase();
      return {
        ...app,
        hasExistingTutorAccount: tutorEmails.has(emailLower),
        submissionCount: emailCounts[emailLower] || 1,
        isDuplicate: (emailCounts[emailLower] || 1) > 1 || tutorEmails.has(emailLower)
      };
    });

    return NextResponse.json(enrichedApplications);
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
    const { id, action, rejectionMessage } = body; // action is 'approve' or 'reject'

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

      // Parse mediums and syllabuses arrays from application
      const parsedMediums = application.mediums
        ? application.mediums.split(",").map(m => m.trim()).filter(Boolean)
        : ["English", "Sinhala"];

      const parsedSyllabuses = application.syllabuses
        ? application.syllabuses.split(",").map(s => s.trim()).filter(Boolean)
        : [];

      await prisma.$transaction(async (tx) => {
        // Create tutor record using actual application data
        await tx.tutor.create({
          data: {
            slug,
            name: application.name,
            email: application.email,
            phone: application.phone || null,
            location: application.location || null,
            university: application.university || null,
            subject: application.subjects.split(",")[0]?.trim() || "General",
            tutorType: application.experience?.toLowerCase().includes("school") ? "School Teacher" : "Private Tutor",
            experience: application.experience || null,
            bio: application.bio,
            onlineAvailable: application.onlineAvailable ?? true,
            physicalAvailable: application.physicalAvailable ?? false,
            rating: 5.0,
            reviewsCount: 0,
            lessonsCount: 0,
            studentsCount: 0,
            languages: parsedMediums.length > 0 ? parsedMediums : ["English", "Sinhala"],
            syllabuses: parsedSyllabuses,
            price: null,
            qualifications: [application.experience].filter(Boolean),
            specializations: application.subjects.split(",").map(s => s.trim()).filter(Boolean),
          }
        });

        // Update application status
        await tx.tutorApplication.update({
          where: { id },
          data: { status: "approved" }
        });
      });

      // Approval email to applicant
      try {
        await resend.emails.send({
          from: "TutorHub.LK <noreply@tutorhub.lk>",
          to: application.email,
          subject: "You've been approved as a tutor on TutorHub.LK!",
          html: `
            <h2>Congratulations, ${application.name}!</h2>
            <p>Your tutor application has been approved. Your profile is now live on TutorHub.LK.</p>
            <p>Log in to your dashboard at <a href="https://www.tutorhub.lk/login">tutorhub.lk/login</a> to complete your profile, add pricing/location, and start uploading video lessons.</p>
            <p>If you have any questions or need assistance, please reply or email us directly at <a href="mailto:tutorhubadmin@gmail.com">tutorhubadmin@gmail.com</a>.</p>
            <br>
            <p>— The TutorHub.LK Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Approval email failed (tutor still created):", emailError);
      }

      return NextResponse.json({ success: true, status: "approved" });
    } else if (action === "reject") {
      await prisma.tutorApplication.update({
        where: { id },
        data: { status: "rejected" }
      });

      // Send customizable rejection email to applicant
      try {
        const messageBody = rejectionMessage || `
          <p>Thank you for your interest in joining TutorHub.LK as a tutor.</p>
          <p>After reviewing your application, we regret to inform you that we are unable to approve your application at this time.</p>
          <p>If you believe this is in error or would like to provide additional details, please contact us directly at <a href="mailto:tutorhubadmin@gmail.com">tutorhubadmin@gmail.com</a>.</p>
        `;

        await resend.emails.send({
          from: "TutorHub.LK <noreply@tutorhub.lk>",
          to: application.email,
          subject: "Update on your TutorHub.LK application",
          html: `
            <h2>Hello ${application.name},</h2>
            ${messageBody}
            <br>
            <p>— The TutorHub.LK Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Rejection email failed:", emailError);
      }

      return NextResponse.json({ success: true, status: "rejected" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Handle application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

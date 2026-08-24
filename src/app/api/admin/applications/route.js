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

      // Parse subjects, mediums, syllabuses, and grades arrays from application
      const parsedSubjects = application.subjects
        ? application.subjects.split(",").map(s => s.trim()).filter(Boolean)
        : [];

      const parsedMediums = application.mediums
        ? application.mediums.split(",").map(m => m.trim()).filter(Boolean)
        : ["English", "Sinhala"];

      const parsedSyllabuses = application.syllabuses
        ? application.syllabuses.split(",").map(s => s.trim()).filter(Boolean)
        : [];

      const parsedGrades = application.grades
        ? application.grades.split(",").map(g => g.trim()).filter(Boolean)
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
            subject: parsedSubjects[0] || "General",
            tutorType: application.tutorType || (application.experience?.toLowerCase().includes("school") ? "School Teacher" : "Private Tutor"),
            experience: application.experience || null,
            bio: application.bio,
            image: application.image || null,
            teachingStyle: application.teachingStyle || null,
            onlineAvailable: application.onlineAvailable ?? true,
            physicalAvailable: application.physicalAvailable ?? false,
            rating: 5.0,
            reviewsCount: 0,
            lessonsCount: 0,
            studentsCount: 0,
            languages: parsedMediums.length > 0 ? parsedMediums : ["English", "Sinhala"],
            syllabuses: parsedSyllabuses,
            grades: parsedGrades,
            price: null,
            qualifications: [application.experience].filter(Boolean),
            specializations: parsedSubjects.length > 0 ? parsedSubjects : ["General"],
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
            <p>Log in to your dashboard at <a href="https://www.tutorhub.lk/login" style="color: #218396; font-weight: bold;">tutorhub.lk/login</a> to complete your profile, set pricing & location, and start uploading sample video lessons.</p>
            
            <div style="margin: 24px 0; padding: 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; font-family: sans-serif;">
              <h3 style="margin-top: 0; color: #166534; font-size: 16px; font-weight: 800;">💬 Join Our Early Tutors Community</h3>
              <p style="margin: 8px 0 16px 0; color: #15803d; font-size: 14px; line-height: 1.5;">
                We are building TutorHub.LK together! Join our official WhatsApp group for early registered tutors to share your feedback, request features, and connect directly with the team.
              </p>
              <a href="https://chat.whatsapp.com/KMHSD9cqbUg7UqqCCcXBxD" style="display: inline-block; padding: 11px 22px; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 800; border-radius: 10px; font-size: 14px; box-shadow: 0 4px 12px rgba(37,211,102,0.2);">
                👉 Join Early Tutors WhatsApp Group
              </a>
            </div>

            <div style="margin: 24px 0; padding: 20px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 14px; font-family: sans-serif;">
              <h3 style="margin-top: 0; color: #0369a1; font-size: 16px; font-weight: 800;">🎬 Watch Tutor Platform Guides</h3>
              <p style="margin: 8px 0 12px 0; color: #0284c7; font-size: 14px; line-height: 1.5;">
                Watch our step-by-step video guides to learn how to set up your profile, manage student inquiries, and upload video lessons:
              </p>
              <ul style="margin: 0; padding-left: 20px; color: #0369a1; font-size: 14px; line-height: 1.8;">
                <li>🇸🇮 <strong>Sinhala Guide:</strong> <a href="https://youtu.be/2mzGAIM3Mjk" style="color: #0284c7; font-weight: bold;">https://youtu.be/2mzGAIM3Mjk</a></li>
                <li>🇬🇧 <strong>English Guide:</strong> <a href="https://youtu.be/fK-Q4CVDD4Y" style="color: #0284c7; font-weight: bold;">https://youtu.be/fK-Q4CVDD4Y</a></li>
              </ul>
            </div>

            <p>If you have any questions or need assistance, please feel free to reply directly to this email or reach us at <a href="mailto:tutorhubadmin@gmail.com">tutorhubadmin@gmail.com</a>.</p>
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

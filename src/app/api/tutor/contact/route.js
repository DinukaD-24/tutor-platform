import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      tutorId,
      tutorName,
      tutorEmail,
      studentName,
      studentEmail,
      whatsapp,
      phone,
      syllabusName,
      gradeName,
      subjectName,
      message,
    } = body;

    if (!tutorId || !studentName || !whatsapp) {
      return NextResponse.json(
        { error: "Tutor ID, student name, and WhatsApp number are required." },
        { status: 400 }
      );
    }

    // Resolve tutor from DB
    const targetTutor = await prisma.tutor.findFirst({
      where: {
        OR: [{ id: tutorId }, { slug: tutorId }]
      }
    });

    if (!targetTutor) {
      return NextResponse.json(
        { error: "Tutor profile not found." },
        { status: 404 }
      );
    }

    // Save contact request to DB
    const saved = await prisma.tutorContactRequest.create({
      data: {
        tutorId: targetTutor.id,
        studentName: studentName.trim(),
        studentEmail: studentEmail ? studentEmail.trim() : null,
        whatsapp: whatsapp.trim(),
        phone: phone ? phone.trim() : null,
        syllabusName: syllabusName || null,
        gradeName: gradeName || null,
        subjectName: subjectName || null,
        message: message ? message.trim() : null,
        isRead: false,
      },
    });

    // Build email HTML
    const subject = subjectName
      ? `📚 New Student Enquiry — ${subjectName}${syllabusName ? ` (${syllabusName})` : ""}`
      : `📚 New Student Enquiry on TutorHub.LK`;

    const lookingFor = [syllabusName, gradeName, subjectName]
      .filter(Boolean)
      .join(" → ");

    const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 32px 24px;">
        <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
          
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: #0d8a6e; color: white; padding: 8px 20px; border-radius: 999px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
              TutorHub.LK
            </div>
          </div>

          <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 6px 0;">
            🎓 A student wants to contact you!
          </h2>
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px 0;">
            A student found your profile on TutorHub.LK and sent the following enquiry:
          </p>

          <div style="background: #f0fdf8; border: 1px solid #a7f3d0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #374151; width: 140px;">👤 Student Name</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${studentName}</td>
              </tr>
              ${whatsapp ? `
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #374151;">📱 WhatsApp</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${whatsapp}</td>
              </tr>` : ""}
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #374151;">📞 Contact No.</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${phone}</td>
              </tr>` : ""}
              ${studentEmail ? `
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #374151;">✉️ Email</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${studentEmail}</td>
              </tr>` : ""}
              ${lookingFor ? `
              <tr>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #374151;">📘 Looking For</td>
                <td style="padding: 8px 0; font-size: 13px; color: #0d8a6e; font-weight: 700;">${lookingFor}</td>
              </tr>` : ""}
            </table>

            ${message ? `
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #d1fae5;">
              <p style="font-size: 12px; font-weight: 700; color: #374151; margin: 0 0 6px 0;">💬 Message</p>
              <p style="font-size: 13px; color: #374151; margin: 0; line-height: 1.6; font-style: italic;">"${message}"</p>
            </div>` : ""}
          </div>

          <a href="https://tutorhub.lk/dashboard" style="display: block; text-align: center; background: #0d8a6e; color: white; text-decoration: none; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 14px; margin-bottom: 20px;">
            View in Your Dashboard →
          </a>

          <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 0;">
            You received this email because a student contacted you through TutorHub.LK.<br/>
            <a href="https://tutorhub.lk" style="color: #0d8a6e;">tutorhub.lk</a>
          </p>
        </div>
      </div>
    `;

    // Send email to tutor (or fallback email if present)
    const recipientEmail = tutorEmail || targetTutor.email;
    if (recipientEmail && resend) {
      try {
        await resend.emails.send({
          from: "TutorHub.LK <onboarding@resend.dev>",
          to: recipientEmail,
          subject,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error("Email send failed (request still saved):", emailError);
      }
    }

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Tutor contact request error:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}


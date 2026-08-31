import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "You must be logged in as a registered tutor to contact students." },
                { status: 401 }
            );
        }

        // Verify the logged in user is an approved tutor
        const tutor = await prisma.tutor.findFirst({
            where: { email: user.email },
        });

        if (!tutor) {
            return NextResponse.json(
                { error: "Only verified & registered tutors on TutorHub.LK can contact students who post tuition requests." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { requestId, message } = body;

        if (!requestId || !message?.trim()) {
            return NextResponse.json(
                { error: "Request ID and a message to the student are required." },
                { status: 400 }
            );
        }

        const tuitionReq = await prisma.tuitionRequest.findUnique({
            where: { id: requestId },
        });

        if (!tuitionReq) {
            return NextResponse.json(
                { error: "Tuition request post not found." },
                { status: 404 }
            );
        }

        // Save contact log in DB
        await prisma.tuitionRequestContact.create({
            data: {
                requestId: tuitionReq.id,
                tutorId: tutor.id,
                tutorName: tutor.name,
                tutorEmail: tutor.email,
                message: message.trim(),
            },
        });

        // Email dispatch to student with copy to tutorhubadmin@gmail.com
        const subject = `📩 Tutor Offer: ${tutor.name} responded to your Tuition Request (${tuitionReq.subject})`;

        const emailHtml = `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 32px 24px;">
                <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
                    
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="display: inline-block; background: #0d8a6e; color: white; padding: 8px 20px; border-radius: 999px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                            TutorHub.LK — Student Requests
                        </div>
                    </div>

                    <h2 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 6px 0;">
                        🎓 A verified tutor responded to your request!
                    </h2>
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 24px 0;">
                        Hello ${tuitionReq.studentName}, verified educator <strong>${tutor.name}</strong> saw your tuition request for <strong>${tuitionReq.subject} (${tuitionReq.syllabus})</strong> on TutorHub.LK and sent you an offer message:
                    </p>

                    {/* Tutor Profile Summary Card */}
                    <div style="background: #f0fdf8; border: 1px solid #a7f3d0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #374151; width: 140px;">👨‍🏫 Tutor Name</td>
                                <td style="padding: 6px 0; font-size: 13px; color: #111827; font-weight: 700;">${tutor.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #374151;">🎓 Qualification / Uni</td>
                                <td style="padding: 6px 0; font-size: 13px; color: #111827; font-weight: 600;">${tutor.university || "Verified Tutor"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #374151;">📘 Main Subject</td>
                                <td style="padding: 6px 0; font-size: 13px; color: #0d8a6e; font-weight: 700;">${tutor.subject}</td>
                            </tr>
                            ${tutor.phone ? `
                            <tr>
                                <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #374151;">📞 Direct Phone</td>
                                <td style="padding: 6px 0; font-size: 13px; color: #111827; font-weight: 600;">${tutor.phone}</td>
                            </tr>` : ""}
                            <tr>
                                <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #374151;">✉️ Tutor Email</td>
                                <td style="padding: 6px 0; font-size: 13px; color: #0d8a6e; font-weight: 600;">${tutor.email}</td>
                            </tr>
                        </table>

                        <div style="margin-top: 14px; padding-top: 14px; border-top: 1px solid #d1fae5;">
                            <p style="font-size: 12px; font-weight: 700; color: #374151; margin: 0 0 6px 0;">💬 Message from ${tutor.name}:</p>
                            <p style="font-size: 13px; color: #1f2937; margin: 0; line-height: 1.6; white-space: pre-line; font-style: italic;">"${message.trim()}"</p>
                        </div>
                    </div>

                    <a href="https://tutorhub.lk/tutors/${tutor.id}" style="display: block; text-align: center; background: #0d8a6e; color: white; text-decoration: none; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 14px; margin-bottom: 20px;">
                        View ${tutor.name}'s Profile & Lessons →
                    </a>

                    <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 0;">
                        You received this message because you posted a tuition request on TutorHub.LK.<br/>
                        Reply directly to <strong>${tutor.email}</strong> to organize your lessons.
                    </p>
                </div>
            </div>
        `;

        if (resend) {
            try {
                // 1. Send to student
                await resend.emails.send({
                    from: "TutorHub.LK <noreply@tutorhub.lk>",
                    to: tuitionReq.studentEmail,
                    subject,
                    html: emailHtml,
                });

                // 2. Send copy to admin email as requested
                if (tuitionReq.studentEmail !== "tutorhubadmin@gmail.com") {
                    await resend.emails.send({
                        from: "TutorHub.LK <noreply@tutorhub.lk>",
                        to: "tutorhubadmin@gmail.com",
                        subject: `[COPY — REQUEST OFFER] ${subject}`,
                        html: emailHtml,
                    });
                }
            } catch (emailErr) {
                console.error("Resend email dispatch error:", emailErr);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Tuition request contact POST error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to send contact message." },
            { status: 500 }
        );
    }
}

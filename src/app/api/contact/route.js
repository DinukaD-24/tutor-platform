import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { contactMessageSchema } from "@/lib/validations";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = contactMessageSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage = validation.error.issues.map(i => i.message).join(". ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, subject, message } = validation.data;


    const saved = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    try {
      await resend.emails.send({
        from: "TutorHub.LK <noreply@tutorhub.lk>",
        to: "tutorhubadmin@gmail.com",
        subject: `New Contact Form Message: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email send failed (message still saved):", emailError);
    }

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
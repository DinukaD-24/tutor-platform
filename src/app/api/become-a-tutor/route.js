import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, university, subjects, syllabuses, experience, bio } = body;

    if (!name || !email || !subjects || !syllabuses || !bio) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const saved = await prisma.tutorApplication.create({
      data: { name, email, phone, university, subjects, syllabuses, experience, bio },
    });

    try {
      await resend.emails.send({
        from: "TutorHub <onboarding@resend.dev>",
        to: "tutorhubadmin@gmail.com",
        subject: `New Tutor Application: ${name}`,
        html: `
          <h2>New Tutor Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>University:</strong> ${university || "Not provided"}</p>
          <p><strong>Subjects:</strong> ${subjects}</p>
          <p><strong>Syllabuses:</strong> ${syllabuses}</p>
          <p><strong>Experience:</strong> ${experience || "Not provided"}</p>
          <p><strong>Bio:</strong></p>
          <p>${bio.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email send failed (application still saved):", emailError);
    }

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Tutor application error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
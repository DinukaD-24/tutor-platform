import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(request) {
  try {
    const body = await request.json();
    let { name, email, phone, university, tutorType, subjects, syllabuses, grades, mediums, experience, bio, location, onlineAvailable, physicalAvailable, image, teachingStyle } = body;

    // Convert arrays to comma-separated strings if needed
    if (Array.isArray(subjects)) {
      subjects = subjects.join(", ");
    }
    if (Array.isArray(syllabuses)) {
      syllabuses = syllabuses.join(", ");
    }
    if (Array.isArray(grades)) {
      grades = grades.join(", ");
    }
    if (Array.isArray(mediums)) {
      mediums = mediums.join(", ");
    }

    if (!name || !email || !subjects || !syllabuses || !bio) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Subjects, Syllabuses, Bio)." },
        { status: 400 }
      );
    }

    const saved = await prisma.tutorApplication.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        university: university ? university.trim() : null,
        tutorType: tutorType ? tutorType.trim() : "Private Tutor",
        subjects: subjects.trim(),
        syllabuses: syllabuses.trim(),
        grades: grades ? grades.trim() : "",
        mediums: mediums ? mediums.trim() : "English, Sinhala",
        location: location ? location.trim() : null,
        onlineAvailable: Boolean(onlineAvailable),
        physicalAvailable: Boolean(physicalAvailable),
        experience: experience ? experience.trim() : null,
        bio: bio.trim(),
        image: image ? image.trim() : null,
        teachingStyle: teachingStyle ? teachingStyle.trim() : null,
      },
    });

    // IMPORTANT: Must await before returning — in Vercel serverless, the function is killed
    // immediately after NextResponse.json() is returned, so fire-and-forget promises never complete.
    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: "TutorHub.LK <noreply@tutorhub.lk>",
        to: "tutorhubadmin@gmail.com",
        subject: `New Tutor Application: ${saved.name}`,
        html: `
          <h2>New Tutor Application Received</h2>
          <p><strong>Name:</strong> ${saved.name}</p>
          <p><strong>Email:</strong> ${saved.email}</p>
          <p><strong>Phone:</strong> ${saved.phone || "Not provided"}</p>
          <p><strong>Tutor Type:</strong> ${saved.tutorType || "Private Tutor"}</p>
          <p><strong>Location:</strong> ${saved.location || "Not provided"}</p>
          <p><strong>Class Format:</strong> ${saved.onlineAvailable ? "Online" : ""} ${saved.physicalAvailable ? "Physical" : ""}</p>
          <p><strong>University:</strong> ${saved.university || "Not provided"}</p>
          <p><strong>Subjects:</strong> ${saved.subjects}</p>
          <p><strong>Syllabuses:</strong> ${saved.syllabuses}</p>
          <p><strong>Grades / Levels:</strong> ${saved.grades || "Not specified"}</p>
          <p><strong>Mediums:</strong> ${saved.mediums}</p>
          <p><strong>Experience:</strong> ${saved.experience || "Not provided"}</p>
          <p><strong>Bio:</strong></p>
          <p>${saved.bio.replace(/\n/g, "<br>")}</p>
        `,
      }),
      resend.emails.send({
        from: "TutorHub.LK <noreply@tutorhub.lk>",
        to: saved.email,
        subject: "We've received your tutor application — TutorHub.LK",
        html: `
          <h2>Thanks for applying, ${saved.name}!</h2>
          <p>We've received your tutor application and our team will review it shortly.</p>
          <p>You'll get another email as soon as a decision is made.</p>
          <p>— The TutorHub.LK Team</p>
        `,
      })
    ]);

    emailResults.forEach((result, i) => {
      const label = i === 0 ? "Admin notification" : "Applicant confirmation";
      if (result.status === "rejected") {
        console.error(`[Resend] ${label} email FAILED:`, result.reason);
      } else {
        console.log(`[Resend] ${label} email sent OK. id=`, result.value?.data?.id);
      }
    });

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Tutor application error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save tutor application. Please try again." },
      { status: 500 }
    );
  }
}
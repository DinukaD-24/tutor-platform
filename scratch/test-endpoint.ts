import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function testSubmit() {
  const body = {
    name: "Dinuka Daksitha",
    email: "d.daksitha03@gmail.com",
    phone: "0714349528",
    university: "IIT",
    location: "Gampaha",
    onlineAvailable: true,
    physicalAvailable: true,
    subjects: ["ICT"],
    syllabuses: ["Local A/L"],
    mediums: ["English"],
    experience: "Less than 1 year",
    bio: "I teach ICT.",
    tutorType: "Private Tutor",
  };

  try {
    let { name, email, phone, university, subjects, syllabuses, mediums, experience, bio, location, onlineAvailable, physicalAvailable } = body;

    if (Array.isArray(subjects)) subjects = subjects.join(", ");
    if (Array.isArray(syllabuses)) syllabuses = syllabuses.join(", ");
    if (Array.isArray(mediums)) mediums = mediums.join(", ");

    const saved = await prisma.tutorApplication.create({
      data: {
        name,
        email,
        phone: phone || null,
        university: university || null,
        subjects,
        syllabuses,
        mediums: mediums || "English, Sinhala",
        location: location || null,
        onlineAvailable: onlineAvailable ?? true,
        physicalAvailable: physicalAvailable ?? false,
        experience: experience || null,
        bio,
      },
    });

    console.log("SUCCESS creating app:", saved);
  } catch (err) {
    console.error("ERROR creating app:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testSubmit();

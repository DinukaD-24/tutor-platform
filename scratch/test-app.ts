import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const res = await prisma.tutorApplication.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        subjects: "ICT",
        syllabuses: "Local A/L",
        mediums: "English",
        location: "Gampaha",
        onlineAvailable: true,
        physicalAvailable: true,
        experience: "Less than 1 year",
        bio: "I teach ICT",
      }
    });
    console.log("Success! Saved application ID:", res.id);
  } catch (err) {
    console.error("Error creating application:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

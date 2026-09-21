import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding UserRoles...");

  // 1. Seed Admin User Role
  const adminRole = await prisma.userRole.upsert({
    where: { email: "tutorhubadmin@gmail.com" },
    update: { role: "ADMIN" },
    create: { email: "tutorhubadmin@gmail.com", role: "ADMIN" },
  });
  console.log(`✅ Admin user role seeded: ${adminRole.email} (${adminRole.role})`);

  // 2. Sync all existing Tutors in DB to UserRole table with TUTOR role
  const existingTutors = await prisma.tutor.findMany({
    select: { email: true }
  });

  for (const tutor of existingTutors) {
    if (tutor.email) {
      await prisma.userRole.upsert({
        where: { email: tutor.email.toLowerCase() },
        update: { role: "TUTOR" },
        create: { email: tutor.email.toLowerCase(), role: "TUTOR" },
      });
    }
  }
  console.log(`✅ Synced ${existingTutors.length} existing tutors to UserRole table.`);

  // 3. Sync all existing Students in DB to UserRole table with STUDENT role
  const existingStudents = await prisma.student.findMany({
    select: { email: true }
  });

  for (const student of existingStudents) {
    if (student.email && student.email !== "tutorhubadmin@gmail.com") {
      await prisma.userRole.upsert({
        where: { email: student.email.toLowerCase() },
        update: {},
        create: { email: student.email.toLowerCase(), role: "STUDENT" },
      });
    }
  }
  console.log(`✅ Synced ${existingStudents.length} existing students to UserRole table.`);

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
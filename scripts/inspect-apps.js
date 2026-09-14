const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config({ path: ".env.production" });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("No DATABASE_URL found");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") ? false : { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("\n=======================================================");
  console.log("    INSPECTING RECEIVED TUTOR APPLICATIONS & TUTORS    ");
  console.log("=======================================================\n");

  // 1. Applications
  const applications = await prisma.tutorApplication.findMany();
  console.log(`Total Tutor Applications Received: ${applications.length}\n`);

  const appSyllabuses = new Set();
  const appGrades = new Set();
  const appSubjects = new Set();

  applications.forEach((app, i) => {
    console.log(`--- Application #${i + 1}: ${app.name} (${app.email}) [Status: ${app.status}] ---`);
    console.log(`  Syllabuses : ${app.syllabuses}`);
    console.log(`  Grades     : ${app.grades}`);
    console.log(`  Subjects   : ${app.subjects}`);
    console.log("");

    if (app.syllabuses) {
      app.syllabuses.split(/[,|;]/).map(s => s.trim()).filter(Boolean).forEach(s => appSyllabuses.add(s));
    }
    if (app.grades) {
      app.grades.split(/[,|;]/).map(g => g.trim()).filter(Boolean).forEach(g => appGrades.add(g));
    }
    if (app.subjects) {
      app.subjects.split(/[,|;]/).map(sb => sb.trim()).filter(Boolean).forEach(sb => appSubjects.add(sb));
    }
  });

  // 2. Active Tutors
  const tutors = await prisma.tutor.findMany();
  console.log(`\nTotal Approved/Active Tutors in Database: ${tutors.length}\n`);

  const tutorSyllabuses = new Set();
  const tutorGrades = new Set();
  const tutorSubjects = new Set();

  tutors.forEach((t, i) => {
    console.log(`--- Tutor #${i + 1}: ${t.name} ---`);
    console.log(`  Subject Main : ${t.subject}`);
    console.log(`  Syllabuses   : ${t.syllabuses ? t.syllabuses.join(", ") : "none"}`);
    console.log(`  Grades       : ${t.grades ? t.grades.join(", ") : "none"}`);
    console.log("");

    if (t.subject) tutorSubjects.add(t.subject.trim());
    if (Array.isArray(t.syllabuses)) {
      t.syllabuses.forEach(s => tutorSyllabuses.add(s.trim()));
    }
    if (Array.isArray(t.grades)) {
      t.grades.forEach(g => tutorGrades.add(g.trim()));
    }
  });

  // 3. Student Tuition Requests
  try {
    const requests = await prisma.tuitionRequest.findMany();
    console.log(`\nTotal Student Tuition Requests in Database: ${requests.length}\n`);
  } catch (err) {
    console.log("\n(TuitionRequest table not created in prod DB yet)\n");
  }

  console.log("\n=======================================================");
  console.log("                  SUMMARY RESULT                      ");
  console.log("=======================================================");

  console.log("\n📌 ALL RECEIVED SYLLABUSES (From Tutor Applications):");
  Array.from(appSyllabuses).forEach(s => console.log(`   - ${s}`));

  console.log("\n📌 ALL RECEIVED GRADES (From Tutor Applications):");
  Array.from(appGrades).forEach(g => console.log(`   - ${g}`));

  console.log("\n📌 ALL RECEIVED SUBJECTS (From Tutor Applications):");
  Array.from(appSubjects).forEach(sb => console.log(`   - ${sb}`));

  console.log("\n📌 ALL SYLLABUSES & SUBJECTS (From Active Tutors):");
  console.log("  Syllabuses:", Array.from(tutorSyllabuses).join(", "));
  console.log("  Grades:", Array.from(tutorGrades).join(", "));
  console.log("  Subjects:", Array.from(tutorSubjects).join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

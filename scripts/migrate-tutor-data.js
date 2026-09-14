const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

function getPrisma(envFile = ".env") {
  require("dotenv").config({ path: envFile, override: true });
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(`No DATABASE_URL found in ${envFile}`);
  }
  const pool = new Pool({
    connectionString,
    ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") ? false : { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  return { prisma: new PrismaClient({ adapter }), pool };
}

function normalizeSyllabusString(raw) {
  if (!raw) return "";
  let items = raw.split(/[,|;]/).map(s => s.trim()).filter(Boolean);
  let cleaned = new Set();

  items.forEach(item => {
    const l = item.toLowerCase();
    if (l.includes("edexcel")) cleaned.add("Edexcel / Pearson");
    else if (l.includes("cambridge")) cleaned.add("Cambridge (CAIE)");
    else if (l.includes("local a/l") || l.includes("al")) cleaned.add("Local A/L");
    else if (l.includes("local o/l") || l.includes("ol") || l.includes("local syllabus") || l === "local") cleaned.add("Local O/L");
    else if (l.includes("grade 1") || l.includes("kindergarden")) cleaned.add("Primary & Early Years (Grade 1-5)");
    else if (l.includes("other")) cleaned.add("Extra-Curricular & Tech Skills");
    else cleaned.add(item);
  });

  return Array.from(cleaned).join(", ");
}

function normalizeSyllabusArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  return Array.from(new Set(arr.map(s => normalizeSyllabusString(s)).filter(Boolean)));
}

async function migrateData(envFile) {
  console.log(`\n=======================================================`);
  console.log(`  MIGRATING DATA IN ${envFile}`);
  console.log(`=======================================================\n`);

  const { prisma, pool } = getPrisma(envFile);

  try {
    // 1. Applications
    const apps = await prisma.tutorApplication.findMany();
    console.log(`Found ${apps.length} Tutor Applications in ${envFile}`);

    for (const app of apps) {
      const normalizedSyl = normalizeSyllabusString(app.syllabuses);
      if (normalizedSyl !== app.syllabuses) {
        console.log(` Updating App #${app.id} (${app.name}): "${app.syllabuses}" -> "${normalizedSyl}"`);
        await prisma.tutorApplication.update({
          where: { id: app.id },
          data: { syllabuses: normalizedSyl }
        });
      }
    }

    // 2. Tutors
    const tutors = await prisma.tutor.findMany();
    console.log(`\nFound ${tutors.length} Active Tutors in ${envFile}`);

    for (const tutor of tutors) {
      const normalizedSyl = normalizeSyllabusArray(tutor.syllabuses);
      const sylChanged = JSON.stringify(normalizedSyl) !== JSON.stringify(tutor.syllabuses);

      if (sylChanged) {
        console.log(` Updating Tutor #${tutor.id} (${tutor.name}): [${tutor.syllabuses.join(", ")}] -> [${normalizedSyl.join(", ")}]`);
        await prisma.tutor.update({
          where: { id: tutor.id },
          data: { syllabuses: normalizedSyl }
        });
      }
    }

    console.log(`\n✅ Data Migration completed for ${envFile}!`);
  } catch (err) {
    console.error(`❌ Migration error on ${envFile}:`, err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

async function run() {
  await migrateData(".env");
  await migrateData(".env.production");
}

run();

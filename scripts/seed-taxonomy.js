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

const TAXONOMY = [
  {
    slug: "national-curriculum",
    name: "Local National Curriculum (Sri Lanka)",
    description: "National curriculum for Sri Lankan schools from Primary to G.C.E. Advanced Level.",
    icon: "GraduationCap",
    order: 1,
    syllabuses: [
      {
        slug: "local-al",
        name: "Local A/L",
        order: 1,
        grades: [
          {
            slug: "local-al-grade-12-13",
            name: "Local A/L (Grade 12-13)",
            order: 1,
            subjects: [
              "Combined Mathematics", "Physics", "Chemistry", "Biology", "ICT",
              "Accounting", "Business Studies", "Economics", "Engineering Technology",
              "Science for Technology", "Agricultural Science", "Logic & Scientific Method",
              "Political Science", "Sinhala Literature", "Tamil Literature", "English Literature"
            ]
          }
        ]
      },
      {
        slug: "local-ol",
        name: "Local O/L",
        order: 2,
        grades: [
          {
            slug: "local-ol-grade-10-11",
            name: "Local O/L (Grade 10-11)",
            order: 1,
            subjects: [
              "Mathematics", "Science", "English Language", "Sinhala Language", "Tamil Language",
              "History", "Business & Accounting Studies", "Information Technology (ICT)",
              "Geography", "Civic Education", "Health & Physical Education", "Buddhism",
              "English Literature", "Drama & Theatre", "Music", "Art"
            ]
          }
        ]
      },
      {
        slug: "local-junior",
        name: "Junior Secondary (Grade 6-9)",
        order: 3,
        grades: [
          {
            slug: "local-junior-grade-6-9",
            name: "Grade 6 - 9",
            order: 1,
            subjects: [
              "Mathematics", "Science", "English", "Sinhala", "Tamil",
              "History", "Geography", "ICT", "Health & PE", "Civics", "Art", "Music"
            ]
          }
        ]
      },
      {
        slug: "local-primary",
        name: "Primary & Early Years (Grade 1-5)",
        order: 4,
        grades: [
          {
            slug: "local-primary-grade-1-5",
            name: "Grade 1 - 5 & Preschool",
            order: 1,
            subjects: [
              "Primary All Subjects", "Mathematics & Environment", "Primary Sinhala",
              "Primary English", "Primary Tamil", "Grade 5 Scholarship"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "international-curriculums",
    name: "International Curriculums",
    description: "Edexcel Pearson and Cambridge International Assessment syllabuses.",
    icon: "Globe",
    order: 2,
    syllabuses: [
      {
        slug: "edexcel",
        name: "Edexcel / Pearson",
        order: 1,
        grades: [
          {
            slug: "edexcel-ial",
            name: "International A-Level (IAL)",
            order: 1,
            subjects: [
              "Pure Mathematics", "Mechanics", "Statistics", "Physics", "Chemistry",
              "Biology", "Computer Science", "Business Studies", "Economics"
            ]
          },
          {
            slug: "edexcel-igcse",
            name: "IGCSE (O/L)",
            order: 2,
            subjects: [
              "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
              "English Language", "Business"
            ]
          }
        ]
      },
      {
        slug: "cambridge",
        name: "Cambridge (CAIE)",
        order: 2,
        grades: [
          {
            slug: "cambridge-a-level",
            name: "Cambridge AS & A-Level",
            order: 1,
            subjects: [
              "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics"
            ]
          },
          {
            slug: "cambridge-igcse",
            name: "Cambridge IGCSE",
            order: 2,
            subjects: [
              "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
              "English Language", "Global Perspectives"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "languages-communication",
    name: "Languages & Communication Skills",
    description: "Spoken English fluency, second languages, and foreign language courses.",
    icon: "Languages",
    order: 3,
    syllabuses: [
      {
        slug: "english-mastery",
        name: "English Language & Fluency",
        order: 1,
        grades: [
          {
            slug: "english-fluency-all",
            name: "All Proficiency Levels",
            order: 1,
            subjects: [
              "Spoken English", "English Grammar & Vocabulary", "Business English", "IELTS & PTE Prep"
            ]
          }
        ]
      },
      {
        slug: "national-languages",
        name: "National Languages",
        order: 2,
        grades: [
          {
            slug: "national-languages-all",
            name: "All Proficiency Levels",
            order: 1,
            subjects: ["Sinhala as a 2nd Language", "Tamil as a 2nd Language"]
          }
        ]
      },
      {
        slug: "foreign-languages",
        name: "Foreign Languages",
        order: 3,
        grades: [
          {
            slug: "foreign-languages-all",
            name: "All Proficiency Levels",
            order: 1,
            subjects: ["French", "Japanese", "German", "Chinese (Mandarin)"]
          }
        ]
      }
    ]
  },
  {
    slug: "skills-extracurricular",
    name: "Extra-Curricular & Tech Skills",
    description: "IT, Computer-Aided Design (CAD), programming, arts, and music tuition.",
    icon: "Code",
    order: 4,
    syllabuses: [
      {
        slug: "it-software",
        name: "IT, Software & Engineering",
        order: 1,
        grades: [
          {
            slug: "it-software-all",
            name: "All Skill Levels",
            order: 1,
            subjects: ["CAD / 3D Drafting", "Web Development", "Programming (Python/C++)", "Graphic Design"]
          }
        ]
      },
      {
        slug: "arts-music",
        name: "Arts, Music & Creative",
        order: 2,
        grades: [
          {
            slug: "arts-music-all",
            name: "All Skill Levels",
            order: 1,
            subjects: ["Visual Arts & Drawing", "Music Theory & Instrument"]
          }
        ]
      }
    ]
  }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function seedDatabase(envFile) {
  console.log(`\n🌱 Seeding Taxonomy into ${envFile}...`);
  const { prisma, pool } = getPrisma(envFile);

  try {
    for (const catData of TAXONOMY) {
      const category = await prisma.category.upsert({
        where: { slug: catData.slug },
        update: {
          name: catData.name,
          description: catData.description,
          icon: catData.icon,
          order: catData.order,
        },
        create: {
          slug: catData.slug,
          name: catData.name,
          description: catData.description,
          icon: catData.icon,
          order: catData.order,
        },
      });

      for (const sylData of catData.syllabuses) {
        const syllabus = await prisma.syllabus.upsert({
          where: { slug: sylData.slug },
          update: {
            name: sylData.name,
            order: sylData.order,
            categoryId: category.id,
          },
          create: {
            slug: sylData.slug,
            name: sylData.name,
            order: sylData.order,
            categoryId: category.id,
          },
        });

        for (const gradeData of sylData.grades) {
          const grade = await prisma.grade.upsert({
            where: {
              syllabusId_slug: {
                syllabusId: syllabus.id,
                slug: gradeData.slug,
              },
            },
            update: {
              name: gradeData.name,
              order: gradeData.order,
            },
            create: {
              slug: gradeData.slug,
              name: gradeData.name,
              order: gradeData.order,
              syllabusId: syllabus.id,
            },
          });

          for (const subName of gradeData.subjects) {
            const subSlug = slugify(subName);
            await prisma.subject.upsert({
              where: {
                gradeId_slug: {
                  gradeId: grade.id,
                  slug: subSlug,
                },
              },
              update: {
                name: subName,
              },
              create: {
                slug: subSlug,
                name: subName,
                gradeId: grade.id,
              },
            });
          }
        }
      }
    }
    console.log(`✅ Taxonomy successfully seeded into ${envFile}!`);
  } catch (err) {
    console.error(`❌ Error seeding ${envFile}:`, err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

async function run() {
  await seedDatabase(".env");
  await seedDatabase(".env.production");
}

run();

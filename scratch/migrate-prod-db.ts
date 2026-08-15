import pg from "pg";

const prodDirectUrl = "postgresql://postgres.pcxjnswjmaxilrcgwiuv:wjeFVXordA3DFHRk@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

const client = new pg.Client({ connectionString: prodDirectUrl });

async function migrateProd() {
  console.log("Connecting directly to Production Supabase Database (pcxjnswjmaxilrcgwiuv)...");
  await client.connect();

  console.log("1. Adding 'createdAt' column to 'Tutor' table if missing...");
  await client.query(`
    ALTER TABLE "Tutor" 
    ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
  `);

  console.log("2. Creating 'TutorAd' table if missing...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS "TutorAd" (
      "id" TEXT NOT NULL,
      "tutorId" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "tagline" TEXT,
      "imageUrl" TEXT,
      "ctaText" TEXT NOT NULL DEFAULT 'View Tutor Profile',
      "badge" TEXT NOT NULL DEFAULT 'PAID AD',
      "order" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT "TutorAd_pkey" PRIMARY KEY ("id")
    );
  `);

  console.log("3. Adding Foreign Key Constraint for TutorAd -> Tutor...");
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'TutorAd_tutorId_fkey'
      ) THEN
        ALTER TABLE "TutorAd" 
        ADD CONSTRAINT "TutorAd_tutorId_fkey" 
        FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
    END $$;
  `);

  console.log("Production Database Migration completed successfully!");
}

migrateProd()
  .then(() => client.end())
  .catch((err) => {
    console.error("Migration error on Production DB:", err);
    client.end();
  });

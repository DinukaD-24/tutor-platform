// Temporarily push schema to PRODUCTION database
// This script sets DIRECT_URL to the production connection string then runs prisma db push
import "dotenv/config"; // loads .env first

// Override with production credentials
process.env.DATABASE_URL = "postgresql://postgres.pcxjnswjmaxilrcgwiuv:wjeFVXordA3DFHRk@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";
process.env.DIRECT_URL = "postgresql://postgres.pcxjnswjmaxilrcgwiuv:wjeFVXordA3DFHRk@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Checking TutorApplication columns in PRODUCTION database...");
  const result = await prisma.$queryRaw<{ column_name: string; data_type: string }[]>`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'TutorApplication'
    ORDER BY ordinal_position;
  `;
  console.log("Columns found:");
  result.forEach(r => console.log(` - ${r.column_name}: ${r.data_type}`));

  const missingCols = ["tutorType", "location", "mediums", "onlineAvailable", "physicalAvailable"];
  const existing = result.map(r => r.column_name);
  const missing = missingCols.filter(c => !existing.includes(c));
  if (missing.length > 0) {
    console.log(`\nMissing columns: ${missing.join(", ")}`);
  } else {
    console.log("\nAll required columns exist!");
  }
}

main().finally(() => prisma.$disconnect());

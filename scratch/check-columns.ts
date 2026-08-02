import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  // Check what columns TutorApplication table actually has
  const result = await prisma.$queryRaw<{ column_name: string; data_type: string }[]>`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'TutorApplication'
    ORDER BY ordinal_position;
  `;
  console.log("TutorApplication columns in DB:");
  result.forEach(r => console.log(` - ${r.column_name}: ${r.data_type}`));
}

main().finally(() => prisma.$disconnect());

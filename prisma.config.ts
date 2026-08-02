// prisma.config.ts — Prisma 7 configuration
// CLI operations (db push, generate, migrate) use DIRECT_URL (session mode, port 5432)
// The runtime adapter in src/lib/prisma.js uses DATABASE_URL (transaction pooler, port 6543)

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"), // Use direct connection for CLI (db push / migrate)
  },
});

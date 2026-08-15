// prisma.config.ts — Prisma 7 configuration
// Uses DIRECT_URL for CLI operations with fallback to DATABASE_URL

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});

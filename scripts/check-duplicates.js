/**
 * check-duplicates.js
 * ---------------------
 * Read-only script to detect duplicate / suspicious tutor records
 * in the production Supabase database.
 *
 * Usage:
 *   node scripts/check-duplicates.js
 *
 * Requires DATABASE_URL in your .env file.
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// ── Load .env manually (no extra deps needed) ─────────────────────────────────
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌  .env file not found at project root.');
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌  DATABASE_URL is not set in your .env file.');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function section(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60));
}

function printRows(rows, emptyMsg = 'None found ✅') {
  if (!rows.length) {
    console.log(`  ${emptyMsg}`);
    return;
  }
  rows.forEach((r, i) => {
    console.log(`\n  [${i + 1}]`);
    for (const [k, v] of Object.entries(r)) {
      const display = Array.isArray(v) ? v.join(', ') : v;
      console.log(`      ${k.padEnd(20)} ${display}`);
    }
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();
  console.log('✅  Connected to production database.\n');

  try {

    // ── 1. Duplicate Tutor names ──────────────────────────────────────────────
    section('1. Tutors with the same name (different records)');
    const { rows: nameDups } = await client.query(`
      SELECT
        LOWER(TRIM(name))            AS normalized_name,
        COUNT(*)                     AS count,
        ARRAY_AGG(id)                AS ids,
        ARRAY_AGG(email)             AS emails,
        ARRAY_AGG("createdAt"::text) AS created_ats
      FROM "Tutor"
      GROUP BY LOWER(TRIM(name))
      HAVING COUNT(*) > 1
      ORDER BY count DESC;
    `);
    printRows(nameDups);

    // ── 2. Duplicate phone numbers ────────────────────────────────────────────
    section('2. Tutors sharing the same phone number');
    const { rows: phoneDups } = await client.query(`
      SELECT
        TRIM(phone)             AS phone,
        COUNT(*)                AS count,
        ARRAY_AGG(id)           AS ids,
        ARRAY_AGG(name)         AS names,
        ARRAY_AGG(email)        AS emails
      FROM "Tutor"
      WHERE phone IS NOT NULL AND TRIM(phone) != ''
      GROUP BY TRIM(phone)
      HAVING COUNT(*) > 1
      ORDER BY count DESC;
    `);
    printRows(phoneDups);

    // ── 3. TutorApplications: same email submitted multiple times ─────────────
    section('3. TutorApplications with duplicate email submissions');
    const { rows: appEmailDups } = await client.query(`
      SELECT
        LOWER(TRIM(email))           AS email,
        COUNT(*)                     AS submission_count,
        ARRAY_AGG(status)            AS statuses,
        ARRAY_AGG(id)                AS application_ids,
        ARRAY_AGG("createdAt"::text) AS submitted_ats
      FROM "TutorApplication"
      GROUP BY LOWER(TRIM(email))
      HAVING COUNT(*) > 1
      ORDER BY submission_count DESC;
    `);
    printRows(appEmailDups);

    // ── 4. Applications approved but already a Tutor ──────────────────────────
    section('4. Approved applications whose email already exists as a Tutor');
    const { rows: alreadyTutor } = await client.query(`
      SELECT
        ta.email                     AS application_email,
        ta.name                      AS application_name,
        ta.status                    AS application_status,
        ta."createdAt"::text         AS applied_at,
        t.id                         AS existing_tutor_id,
        t.name                       AS existing_tutor_name,
        t."createdAt"::text          AS tutor_created_at
      FROM "TutorApplication" ta
      JOIN "Tutor" t
        ON LOWER(TRIM(ta.email)) = LOWER(TRIM(t.email))
      ORDER BY ta."createdAt" DESC;
    `);
    printRows(alreadyTutor, 'No overlaps found ✅');

    // ── 5. Pending applications whose email is already a Tutor ───────────────
    section('5. PENDING applications where the tutor is already approved & live');
    const { rows: pendingExists } = await client.query(`
      SELECT
        ta.id                        AS application_id,
        ta.email,
        ta.name,
        ta."createdAt"::text         AS applied_at,
        t.id                         AS live_tutor_id
      FROM "TutorApplication" ta
      JOIN "Tutor" t
        ON LOWER(TRIM(ta.email)) = LOWER(TRIM(t.email))
      WHERE ta.status = 'pending'
      ORDER BY ta."createdAt" DESC;
    `);
    printRows(pendingExists, 'No stale pending applications found ✅');

    // ── 6. Overall summary ────────────────────────────────────────────────────
    section('Summary');
    const { rows: counts } = await client.query(`
      SELECT
        (SELECT COUNT(*) FROM "Tutor")                                        AS total_tutors,
        (SELECT COUNT(*) FROM "TutorApplication")                             AS total_applications,
        (SELECT COUNT(*) FROM "TutorApplication" WHERE status = 'pending')   AS pending_apps,
        (SELECT COUNT(*) FROM "TutorApplication" WHERE status = 'approved')  AS approved_apps,
        (SELECT COUNT(*) FROM "TutorApplication" WHERE status = 'rejected')  AS rejected_apps;
    `);
    const s = counts[0];
    console.log(`
  Total live tutors         : ${s.total_tutors}
  Total applications        : ${s.total_applications}
    Pending                 : ${s.pending_apps}
    Approved                : ${s.approved_apps}
    Rejected                : ${s.rejected_apps}
    `);

  } finally {
    await client.end();
    console.log('Connection closed.\n');
  }
}

main().catch((err) => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});

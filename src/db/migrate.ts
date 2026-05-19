/**
 * Database Migration Runner for Python Master 12
 *
 * Runs SQL migration files in order against a Supabase/PostgreSQL database.
 *
 * Usage:
 *   npx ts-node src/db/migrate.ts
 *   # or with tsx:
 *   npx tsx src/db/migrate.ts
 *
 * Environment variables required:
 *   DATABASE_URL - PostgreSQL connection string (from Supabase)
 *
 * Alternatively, set individual variables:
 *   SUPABASE_DB_HOST
 *   SUPABASE_DB_PORT (default: 5432)
 *   SUPABASE_DB_NAME (default: postgres)
 *   SUPABASE_DB_USER (default: postgres)
 *   SUPABASE_DB_PASSWORD
 */

import * as fs from 'fs';
import * as path from 'path';

// Dynamic import for pg since it may not be installed yet
async function getClient() {
  try {
    const { Client } = await import('pg');
    return Client;
  } catch {
    console.error(
      '❌ The "pg" package is not installed.\n' +
        '   Run: npm install pg @types/pg\n' +
        '   Then retry the migration.'
    );
    process.exit(1);
  }
}

function getConnectionString(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.SUPABASE_DB_HOST;
  const port = process.env.SUPABASE_DB_PORT || '5432';
  const dbName = process.env.SUPABASE_DB_NAME || 'postgres';
  const user = process.env.SUPABASE_DB_USER || 'postgres';
  const password = process.env.SUPABASE_DB_PASSWORD;

  if (!host || !password) {
    console.error(
      '❌ Missing database connection configuration.\n' +
        '   Set DATABASE_URL or SUPABASE_DB_HOST + SUPABASE_DB_PASSWORD\n' +
        '   in your .env file or environment.'
    );
    process.exit(1);
  }

  return `postgresql://${user}:${password}@${host}:${port}/${dbName}?sslmode=require`;
}

function getMigrationFiles(): string[] {
  const migrationsDir = path.join(__dirname, 'migrations');

  if (!fs.existsSync(migrationsDir)) {
    console.error(`❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.error('❌ No migration files found in migrations directory.');
    process.exit(1);
  }

  return files;
}

async function ensureMigrationsTable(client: InstanceType<any>): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
  `);
}

async function getExecutedMigrations(client: InstanceType<any>): Promise<Set<string>> {
  const result = await client.query('SELECT filename FROM _migrations ORDER BY id');
  return new Set(result.rows.map((row: { filename: string }) => row.filename));
}

async function runMigration(
  client: InstanceType<any>,
  filename: string,
  sql: string
): Promise<void> {
  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query('INSERT INTO _migrations (filename) VALUES ($1)', [filename]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

async function main(): Promise<void> {
  console.log('🚀 Python Master 12 - Database Migration Runner\n');

  const connectionString = getConnectionString();
  const Client = await getClient();
  const client = new Client({ connectionString });

  try {
    console.log('📡 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully.\n');

    // Ensure migrations tracking table exists
    await ensureMigrationsTable(client);

    // Get already-executed migrations
    const executed = await getExecutedMigrations(client);

    // Get migration files
    const migrationFiles = getMigrationFiles();
    const migrationsDir = path.join(__dirname, 'migrations');

    let migrationsRun = 0;

    for (const filename of migrationFiles) {
      if (executed.has(filename)) {
        console.log(`⏭️  Skipping (already executed): ${filename}`);
        continue;
      }

      const filePath = path.join(migrationsDir, filename);
      const sql = fs.readFileSync(filePath, 'utf-8');

      console.log(`▶️  Running migration: ${filename}`);
      const start = Date.now();

      try {
        await runMigration(client, filename, sql);
        const duration = Date.now() - start;
        console.log(`✅ Completed: ${filename} (${duration}ms)`);
        migrationsRun++;
      } catch (error: any) {
        console.error(`❌ Failed: ${filename}`);
        console.error(`   Error: ${error.message}`);
        process.exit(1);
      }
    }

    console.log(
      `\n🎉 Migration complete! ${migrationsRun} migration(s) executed, ${executed.size} already up-to-date.`
    );
  } catch (error: any) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  } finally {
    await client.end();
    console.log('📡 Database connection closed.');
  }
}

main();

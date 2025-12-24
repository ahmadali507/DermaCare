const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Connection details from user input
// URI: postgresql://postgres:Hussain@434@db.kswutxtdggpfpgvcuuvy.supabase.co:5432/postgres
// Parsing manually to handle special characters in password safely
const config = {
  user: 'postgres',
  password: 'Hussain@434',
  host: 'db.kswutxtdggpfpgvcuuvy.supabase.co',
  port: 5432,
  database: 'postgres',
  ssl: { rejectUnauthorized: false } // Required for Supabase
};

const client = new Client(config);

async function runMigration() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully.');

    const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20250124000001_initial_schema.sql');
    console.log(`Reading migration file: ${migrationPath}`);
    
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Executing migration...');
    await client.query(sql);
    
    console.log('✅ Migration applied successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();

import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function initDatabase() {
  try {
    console.log('Creating registrations table...');

    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        organization VARCHAR(100),
        category VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✓ Table created successfully!');

    // テーブルの確認
    const result = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'registrations'
    `;

    console.log('Table exists:', result.rows);

  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

initDatabase();

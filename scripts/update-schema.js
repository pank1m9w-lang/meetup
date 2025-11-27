import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function updateSchema() {
  try {
    console.log('Updating database schema...');

    // 写真撮影同意フィールドを追加
    await sql`
      ALTER TABLE registrations
      ADD COLUMN IF NOT EXISTS photo_consent BOOLEAN DEFAULT true
    `;
    console.log('✓ Added photo_consent column');

    // 参加メンバー情報フィールドを追加（JSON形式で保存）
    await sql`
      ALTER TABLE registrations
      ADD COLUMN IF NOT EXISTS additional_members JSONB DEFAULT '[]'::jsonb
    `;
    console.log('✓ Added additional_members column');

    // テーブル構造を確認
    const tableInfo = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'registrations'
      ORDER BY ordinal_position
    `;

    console.log('\n--- Updated table structure ---');
    tableInfo.rows.forEach(col => {
      console.log(`${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });

    console.log('\n✓ Schema update completed successfully!');

  } catch (error) {
    console.error('Error updating schema:', error);
    throw error;
  }
}

updateSchema();

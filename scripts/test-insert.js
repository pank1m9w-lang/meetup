import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function testInsert() {
  try {
    console.log('Testing database connection...');

    // テストデータを挿入
    const result = await sql`
      INSERT INTO registrations (name, email, phone, organization, category, message)
      VALUES (
        'テスト太郎',
        'test@example.com',
        '090-1234-5678',
        '岡山大学',
        '大学生',
        'これはテストデータです。'
      )
      RETURNING *
    `;

    console.log('✓ Test record inserted successfully!');
    console.log('Inserted record:', result.rows[0]);

    // 全レコードを確認
    const allRecords = await sql`
      SELECT id, name, email, category, created_at
      FROM registrations
      ORDER BY created_at DESC
    `;

    console.log('\n--- All registrations ---');
    console.log('Total records:', allRecords.rows.length);
    allRecords.rows.forEach((record, index) => {
      console.log(`${index + 1}. ${record.name} (${record.email}) - ${record.category} - ${record.created_at}`);
    });

  } catch (error) {
    console.error('Error:', error);

    // 重複エラーの場合
    if (error.code === '23505') {
      console.log('\nℹ️  This email already exists. Trying with a different email...');

      const timestamp = Date.now();
      const retryResult = await sql`
        INSERT INTO registrations (name, email, phone, organization, category, message)
        VALUES (
          'テスト太郎',
          ${`test-${timestamp}@example.com`},
          '090-1234-5678',
          '岡山大学',
          '大学生',
          'これはテストデータです。'
        )
        RETURNING *
      `;

      console.log('✓ Test record inserted with unique email!');
      console.log('Inserted record:', retryResult.rows[0]);
    } else {
      throw error;
    }
  }
}

testInsert();

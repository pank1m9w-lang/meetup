import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function addSampleData() {
  const sampleData = [
    {
      name: '山田花子',
      email: 'hanako@example.com',
      phone: '080-9876-5432',
      organization: '岡山県立高校',
      category: '高校生',
      message: 'イベントを楽しみにしています！'
    },
    {
      name: '佐藤次郎',
      email: 'jiro@example.com',
      phone: '070-1111-2222',
      organization: '株式会社岡山商事',
      category: '社会人',
      message: '若者との交流を期待しています。'
    },
    {
      name: '田中美咲',
      email: 'misaki@example.com',
      phone: null,
      organization: '岡山理科大学',
      category: '大学生',
      message: null
    },
    {
      name: '鈴木健太',
      email: 'kenta@example.com',
      phone: '090-3333-4444',
      organization: null,
      category: 'その他',
      message: '初めて参加します。よろしくお願いします！'
    }
  ];

  try {
    console.log('Adding sample data...\n');

    for (const data of sampleData) {
      try {
        const result = await sql`
          INSERT INTO registrations (name, email, phone, organization, category, message)
          VALUES (
            ${data.name},
            ${data.email},
            ${data.phone},
            ${data.organization},
            ${data.category},
            ${data.message}
          )
          RETURNING id, name, email, category
        `;

        console.log(`✓ Added: ${result.rows[0].name} (${result.rows[0].email})`);
      } catch (error) {
        if (error.code === '23505') {
          console.log(`⚠ Skipped: ${data.email} (already exists)`);
        } else {
          throw error;
        }
      }
    }

    // 全レコードを表示
    console.log('\n--- All registrations in database ---');
    const allRecords = await sql`
      SELECT id, name, email, category, organization, created_at
      FROM registrations
      ORDER BY created_at DESC
    `;

    console.log(`Total: ${allRecords.rows.length} records\n`);
    allRecords.rows.forEach((record, index) => {
      console.log(`${index + 1}. [${record.category}] ${record.name}`);
      console.log(`   Email: ${record.email}`);
      console.log(`   Organization: ${record.organization || 'N/A'}`);
      console.log(`   Created: ${record.created_at}\n`);
    });

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

addSampleData();

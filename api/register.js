import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, organization, category, message } = req.body;

    // バリデーション
    if (!name || !email || !category) {
      return res.status(400).json({
        error: 'Name, email, and category are required'
      });
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // データベースに保存
    const result = await sql`
      INSERT INTO registrations (name, email, phone, organization, category, message)
      VALUES (${name}, ${email}, ${phone || null}, ${organization || null}, ${category}, ${message || null})
      RETURNING id, created_at
    `;

    return res.status(201).json({
      success: true,
      message: '申し込みが完了しました',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);

    // 重複エラーの処理
    if (error.code === '23505') {
      return res.status(409).json({
        error: 'このメールアドレスは既に登録されています'
      });
    }

    return res.status(500).json({
      error: 'サーバーエラーが発生しました。後ほど再度お試しください。'
    });
  }
}

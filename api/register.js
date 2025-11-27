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
    // 環境変数チェック
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL is not set');
      return res.status(500).json({
        error: 'データベース接続が設定されていません。管理者にお問い合わせください。',
        debug: {
          envSet: false,
          timestamp: new Date().toISOString()
        }
      });
    }

    const { name, email, phone, organization, category, message, photoConsent, additionalMembers } = req.body;

    console.log('Received registration request:', { name, email, category, photoConsent, additionalMembersCount: additionalMembers?.length || 0 });

    // バリデーション
    if (!name || !email || !category) {
      return res.status(400).json({
        error: '必須項目が入力されていません。お名前、メールアドレス、カテゴリーを入力してください。'
      });
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: '有効なメールアドレスを入力してください。' });
    }

    // データベースに保存
    console.log('Attempting to insert into database...');
    const result = await sql`
      INSERT INTO registrations (name, email, phone, organization, category, message, photo_consent, additional_members)
      VALUES (${name}, ${email}, ${phone || null}, ${organization || null}, ${category}, ${message || null}, ${photoConsent !== undefined ? photoConsent : true}, ${JSON.stringify(additionalMembers || [])})
      RETURNING id, created_at
    `;

    console.log('Registration successful:', result.rows[0]);

    return res.status(201).json({
      success: true,
      message: '申し込みが完了しました',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });

    // 重複エラーの処理
    if (error.code === '23505') {
      return res.status(409).json({
        error: 'このメールアドレスは既に登録されています。'
      });
    }

    // データベース接続エラー
    if (error.code === 'missing_connection_string' || error.message?.includes('connection')) {
      return res.status(500).json({
        error: 'データベース接続エラーが発生しました。管理者にお問い合わせください。',
        debug: {
          errorType: 'database_connection',
          timestamp: new Date().toISOString()
        }
      });
    }

    return res.status(500).json({
      error: 'サーバーエラーが発生しました。時間をおいて再度お試しいただくか、管理者にお問い合わせください。',
      debug: {
        errorCode: error.code,
        timestamp: new Date().toISOString()
      }
    });
  }
}

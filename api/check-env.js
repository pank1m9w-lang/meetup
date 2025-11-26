// 環境変数チェック用のデバッグエンドポイント
export default async function handler(req, res) {
  const hasPostgresUrl = !!process.env.POSTGRES_URL;

  return res.status(200).json({
    hasPostgresUrl,
    nodeEnv: process.env.NODE_ENV,
    // セキュリティのため、値の最初の20文字だけ表示
    postgresUrlPreview: process.env.POSTGRES_URL ?
      process.env.POSTGRES_URL.substring(0, 20) + '...' :
      'NOT SET',
    allEnvKeys: Object.keys(process.env).filter(key =>
      key.includes('POSTGRES') || key.includes('DATABASE')
    )
  });
}

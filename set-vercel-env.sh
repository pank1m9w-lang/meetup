#!/bin/bash

# Vercel環境変数設定スクリプト

echo "Vercelにログインします..."
vercel login

echo ""
echo "環境変数を設定します..."

# Production環境
echo "postgresql://neondb_owner:npg_p2UcDshytO0e@ep-summer-feather-a1mcgtow-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | vercel env add POSTGRES_URL production

# Preview環境
echo "postgresql://neondb_owner:npg_p2UcDshytO0e@ep-summer-feather-a1mcgtow-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | vercel env add POSTGRES_URL preview

# Development環境
echo "postgresql://neondb_owner:npg_p2UcDshytO0e@ep-summer-feather-a1mcgtow-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | vercel env add POSTGRES_URL development

echo ""
echo "✓ 環境変数の設定が完了しました！"
echo ""
echo "次のコマンドで再デプロイしてください："
echo "vercel --prod"

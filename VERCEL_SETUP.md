# Vercelデプロイ設定手順

## 環境変数の設定（重要！）

申し込みフォームを動作させるために、Vercelで環境変数を設定する必要があります。

### 手順：

1. **Vercelダッシュボードにアクセス**
   - https://vercel.com/dashboard を開く

2. **プロジェクトを選択**
   - `meetup` プロジェクトをクリック

3. **環境変数を追加**
   - 上部メニューの **Settings** をクリック
   - 左サイドバーの **Environment Variables** をクリック
   - 以下の環境変数を追加：

   ```
   Name: POSTGRES_URL
   Value: postgresql://neondb_owner:npg_p2UcDshytO0e@ep-summer-feather-a1mcgtow-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   Environment: Production, Preview, Development (すべて選択)
   ```

4. **保存**
   - **Save** ボタンをクリック

5. **再デプロイ**
   - **Deployments** タブに移動
   - 最新のデプロイの右側にある **⋯** メニューをクリック
   - **Redeploy** を選択
   - 確認ダイアログで **Redeploy** をクリック

## 確認

再デプロイが完了したら、サイトにアクセスして申し込みフォームが正常に動作するか確認してください。

## トラブルシューティング

エラーが発生する場合：
1. 環境変数が正しく設定されているか確認
2. 環境変数の値に余分なスペースや引用符が含まれていないか確認
3. 再デプロイが完了しているか確認

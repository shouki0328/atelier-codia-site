# 検証ログ

## 2026-07-02

実施済み:

- `npm install`
- `npm run check`
- ローカルプレビュー `http://127.0.0.1:4177/` でPC/スマホ幅の表示確認
- 主要導線: `/` → `/works` → `/request` → `/about`
- ブランド名 `Atelier Codia` への表示更新確認

結果:

- `npm install`: 0 vulnerabilities
- `npm run check`: Vite build成功、5 HTMLファイル検証済み
- デスクトップ幅 1440x920: 横スクロールなし、ナビ表示、画像読み込み成功
- スマホ幅 390x844: 横スクロールなし、メニュー開閉成功
- `/`, `/works/`, `/request/`, `/about/` のタイトル・ヘッダー・主要見出しで `Atelier Codia` 表示を確認
- トップとCollectionに価格表示、購入申請ボタン、後日連絡/銀行振込/発送フローを追加
- `/request/?piece=lumiere-petal` で作品自動選択、数量2の合計 `¥32,000`、疑似送信完了表示を確認
- モバイルでカード画像が過剰に縦長にならないよう高さ制御を確認
- Console warn/error: なし
- GitHub Pages workflowの参照タグ確認: `actions/checkout@v5`, `actions/setup-node@v5`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v4`, `actions/deploy-pages@v5` はGitHub上のタグ存在を確認済み
- GitHub repository作成: `https://github.com/shouki0328/atelier-codia-site`
- GitHub Pages公開URL: `https://shouki0328.github.io/atelier-codia-site/`
- Pages workflow run `28573470544` 成功
- 公開URL、`/works/`、`/request/` がHTTP 200で配信されることを確認
- 公開済み `/request/` に `Purchase Request`、`Lumiere Petal - ¥16,000`、`Submit request` が含まれることを確認

スクリーンショット:

- `docs/screenshots/home-desktop-top.png`
- `docs/screenshots/home-mobile-top.png`
- `docs/screenshots/home-materials-mobile.png`
- `docs/screenshots/home-mobile-menu.png`
- `docs/screenshots/works-mobile-top.png`
- `docs/screenshots/request-mobile-top.png`
- `docs/screenshots/request-mobile-success.png`
- `docs/screenshots/about-mobile-top.png`

## 公開済み事項

- GitHub repository作成/push
- GitHub Pages有効化
- Pages workflow実行
- 公開URL確認

## 今後差し替え候補

- 実際の作品名、素材説明
- 価格、振込/発送条件、フォーム送信先
- 作家プロフィールや表示名
- 公開範囲に問題がないかの最終確認

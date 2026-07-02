# 検証ログ

## 2026-07-02

実施済み:

- `npm install`
- `npm run check`
- ローカルプレビュー `http://127.0.0.1:4177/` でPC/スマホ幅の表示確認
- 主要導線: `/` → `/works` → `/about`
- ブランド名 `Atelier Codia` への表示更新確認

結果:

- `npm install`: 0 vulnerabilities
- `npm run check`: Vite build成功、5 HTMLファイル検証済み
- デスクトップ幅 1440x920: 横スクロールなし、ナビ表示、画像読み込み成功
- スマホ幅 390x844: 横スクロールなし、メニュー開閉成功
- `/`, `/works/`, `/about/` のタイトル・ヘッダー・主要見出しで `Atelier Codia` 表示を確認
- Product listと価格表示を外し、トップは3点のFeatured Collection、下層はブランドギャラリーへ変更
- Instagramボタン、問い合わせ導線、Contact/SNSページを削除
- モバイルでカード画像が過剰に縦長にならないよう高さ制御を確認
- Console warn/error: なし
- GitHub Pages workflowの参照タグ確認: `actions/checkout@v5`, `actions/setup-node@v5`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v4`, `actions/deploy-pages@v5` はGitHub上のタグ存在を確認済み

スクリーンショット:

- `docs/screenshots/home-desktop-top.png`
- `docs/screenshots/home-mobile-top.png`
- `docs/screenshots/home-materials-mobile.png`
- `docs/screenshots/home-mobile-menu.png`
- `docs/screenshots/works-mobile-top.png`
- `docs/screenshots/about-mobile-top.png`

## 公開前の未承認事項

- GitHub repository作成またはpush
- GitHub Pages有効化
- Pages workflow実行
- 公開URLの共有

## 公開前に必要な情報

- 実際の作品名、素材説明
- 作家プロフィールや表示名
- 公開範囲に問題がないかの最終確認

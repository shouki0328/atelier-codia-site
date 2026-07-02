# Atelier Codia Site

手作りアクセサリーの小さな個人ブランドサイトです。特定ブランドのロゴ・レイアウト・文言・装飾はコピーせず、白/アイボリー/淡いベージュ/ゴールドを基調に、余白・写真・静けさで上質感を出す方向で制作しています。

## セットアップ

```bash
npm install
npm run dev
```

## 確認

```bash
npm run check
```

`npm run check` は Vite build のあと、主要ページ、画像、ローカルリンク、画像alt、`prefers-reduced-motion` の存在を確認します。

## 構成

- `index.html` — `/` ファーストビュー、ブランドストーリー、Featured Collection、素材ノート
- `works/index.html` — `/works` Collection / ブランドギャラリー
- `about/index.html` — `/about` ブランドストーリー
- `404.html` — `/404` Not Found
- `public/assets/` — 生成画像を圧縮したサイト用素材
- `docs/` — 仕様、ユースケース、ADR、素材出所、検証ログ

## GitHub Pages

公開URL:

- https://shouki0328.github.io/atelier-codia-site/

GitHub repository:

- https://github.com/shouki0328/atelier-codia-site

このリポジトリには GitHub Pages 用の workflow を含めています。workflow は `workflow_dispatch` の手動実行のみです。

今後の公開前に確認するもの:

- 実際の作品名、素材説明
- 作家プロフィールや表示名
- 公開範囲に問題がないかの最終確認

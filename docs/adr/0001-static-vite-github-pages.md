# ADR 0001: Viteマルチページ静的サイトでGitHub Pagesに備える

## ステータス

採用

## 文脈

Atelier Codiaは小さな個人アクセサリーブランドのサイトであり、初期要件はブランド表現、Featured Collection、素材ノート、購入申請フォーム、GitHub Pages公開準備である。決済、認証、CMS、実送信処理、カート型ECは現時点の対象外。

## 決定

Viteのマルチページ静的サイトとして実装する。ページはHTMLファイルとして配置し、共通のCSS/JSだけをViteでbundleする。Collectionは価格付き作品一覧として扱い、購入ボタンは `/request/` の購入申請フォームへ遷移する。フォーム送信は外部送信せず、画面内の疑似完了表示に限定する。GitHub Pages workflowは手動実行に限定する。

## 理由（他案との比較）

- React SPA: ルーティングと404 fallbackが必要になり、初期サイトには過剰。
- CMS導入: 将来の更新には有効だが、初期は公開までの複雑性と設定リスクが増える。
- 素のHTMLだけ: 最軽量だが、build検証やPages用workflow、共通JS/CSS管理を整理しにくい。

Vite MPAなら、軽量な静的サイトのままbuild/preview/checkを標準化できる。

## 影響

- 各ページはHTMLとして増えるため、ナビゲーション文言の変更は複数ファイルに反映が必要。
- 作品数が増える場合は、データ駆動生成や軽いSSGへの移行を検討する。
- GitHub Pagesは公開済み。今後の更新も手動workflowで行う。

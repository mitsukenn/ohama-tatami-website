# Xサーバー公開用 デプロイチェックリスト

## アップロードするファイル（public_html/ に配置）

### HTMLファイル（ルート直下）
- [x] index.html（トップページ）
- [x] price.html（料金・メニュー）
- [x] flow.html（畳替えの流れ）
- [x] contact.html（お問い合わせ）
- [x] tatami.html（畳表について）
- [x] about.html（会社概要）
- [x] works.html（施工事例）
- [x] voice.html（お客様の声）
- [x] goods.html（畳の小物）
- [x] line-lp.html（LINE LP）
- [x] blog.html（旧ブログページ ※リダイレクト元として残す場合）

### SEOファイル（ルート直下）
- [x] sitemap.xml
- [x] robots.txt

### blog/ フォルダ（まるごと）
- [x] blog/index.html（コラム一覧）
- [x] blog/cost/index.html
- [x] blog/omote-vs-ura/index.html
- [x] blog/kabi/index.html
- [x] blog/herinashi/index.html
- [x] blog/timing/index.html
- [x] blog/dani/index.html
- [x] blog/tsuyu/index.html
- [x] blog/pet/index.html
- [x] blog/sozai/index.html
- [x] blog/oteire/index.html
- [x] blog/diy/index.html
- [x] blog/baby/index.html
- [x] blog/flooring/index.html
- [x] blog/chintai/index.html
- [x] blog/senmonten/index.html
- [x] blog/kagu/index.html
- [x] blog/sokuji/index.html
- [x] blog/shokunin/index.html
- [x] blog/igusa/index.html
- [x] blog/boukabi/index.html
- [x] blog/kodomo/index.html
- [x] blog/komikomi/index.html
- [x] blog/sasakure/index.html

### images/ フォルダ
- [x] images/ 内の全画像ファイル（*.jpg, *.png, *.svg）
- [x] images/blog/ 内の全画像ファイル

### ⚠️ アップロードしないフォルダ
- images/old/（差し替え前のバックアップ）
- images/old_brightness/（明るさ補正前のバックアップ）
- images/blog/old/（再生成前の旧画像）

---

## アップロードしないファイル・フォルダ

| ファイル/フォルダ | 理由 |
|------------------|------|
| CLAUDE.md | 開発用設計書 |
| .claude/ | Claude Code設定ファイル |
| data/ | 参考データ・料金表・プロンプト集 |
| docs/ | 設計書・リファレンス（このファイル含む） |
| src/ | 改修元の旧ファイル |
| sub.html | 分割前の旧ファイル（price/flow/goods/contactに分割済み） |
| images/old/ | バックアップ画像 |
| images/old_brightness/ | バックアップ画像 |
| images/blog/old/ | バックアップ画像 |
| images/README.txt | 開発メモ |

---

## 公開前チェックリスト

### Xサーバー設定
- [ ] 独自ドメイン ohama-tatami.com を設定
- [ ] 無料独自SSL（Let's Encrypt）を有効化
- [ ] SSL設定後、https:// でアクセスできることを確認
- [ ] http → https のリダイレクト設定（Xサーバー管理画面 or .htaccess）

### .htaccess（Xサーバーに配置）
```apache
# HTTPSリダイレクト
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# www → non-www リダイレクト（必要に応じて）
RewriteCond %{HTTP_HOST} ^www\.ohama-tatami\.com
RewriteRule ^(.*)$ https://ohama-tatami.com/$1 [R=301,L]
```

### 動作確認
- [ ] トップページ表示確認
- [ ] 全ページのナビゲーションリンク動作
- [ ] LINE友だち追加リンク動作（https://lin.ee/qy8UCpf）
- [ ] 電話番号リンク動作（スマホ）
- [ ] お問い合わせフォーム送信テスト
- [ ] モバイル表示確認（追従バナー・ハンバーガーメニュー）
- [ ] 画像表示確認（特にブログ記事内の画像）
- [ ] SSL証明書の確認（ブラウザに鍵マーク表示）

### SEO・外部サービス
- [ ] Google Search Console にサイト登録
- [ ] サイトマップ（sitemap.xml）を送信
- [ ] Google ビジネスプロフィールにWebサイトURLを登録
- [ ] GASフォーム送信先をohama.tatami43@gmail.comに変更（本番切替）

/**
 * Google Apps Script - 大浜畳商店 お問い合わせフォーム処理
 *
 * 【セットアップ手順】
 * 1. Google Drive で新しいスプレッドシートを作成（名前：「大浜畳商店_問い合わせ」）
 * 2. メニュー「拡張機能」→「Apps Script」を開く
 * 3. このコードを貼り付けて保存
 * 4. 「デプロイ」→「新しいデプロイ」→ 種類：「ウェブアプリ」
 *    - 実行するユーザー：「自分」
 *    - アクセスできるユーザー：「全員」
 * 5. デプロイして表示されるURLをコピー
 * 6. contact.html の GAS_URL を このURLに差し替える
 *
 * 【メール送信先】
 * - メイン: m.arakaki2009@gmail.com（テスト用。本番は ohama.tatami43@gmail.com に変更）
 * - CC: ohama.tatami43@gmail.com（テスト用。本番は m.arakaki2009@gmail.com に変更）
 */

// 送信先メールアドレス（テスト用設定）
const MAIN_EMAIL = 'm.arakaki2009@gmail.com';
const CC_EMAIL = 'ohama.tatami43@gmail.com';

function doPost(e) {
  try {
    var params = e.parameter;
    var name = params.name || '未入力';
    var tel = params.tel || '未入力';
    var email = params.email || 'なし';
    var detail = params.detail || '未入力';
    var timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    // スプレッドシートに記録
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([timestamp, name, tel, email, detail]);

    // メール送信
    var subject = '【大浜畳商店HP】お問い合わせがありました';
    var body = '大浜畳商店ホームページからお問い合わせがありました。\n\n'
      + '━━━━━━━━━━━━━━━━━━━━━\n'
      + '■ お名前: ' + name + '\n'
      + '■ 電話番号: ' + tel + '\n'
      + '■ メールアドレス: ' + email + '\n'
      + '━━━━━━━━━━━━━━━━━━━━━\n\n'
      + '■ ご相談内容:\n' + detail + '\n\n'
      + '━━━━━━━━━━━━━━━━━━━━━\n'
      + '受信日時: ' + timestamp + '\n'
      + 'このメールは大浜畳商店ホームページのお問い合わせフォームから自動送信されています。';

    MailApp.sendEmail({
      to: MAIN_EMAIL,
      cc: CC_EMAIL,
      subject: subject,
      body: body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok', message: 'Form handler is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

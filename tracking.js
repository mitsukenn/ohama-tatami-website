/* 大浜畳商店 コンバージョン計測
   LINEボタンのクリック → line_click / 電話番号のタップ → tel_click
   （フォーム送信 form_submit は contact.html 側で発火） */
(function () {
  document.addEventListener('click', function (e) {
    if (typeof gtag !== 'function') return;
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('lin.ee') !== -1 || href.indexOf('line.me') !== -1) {
      gtag('event', 'line_click', { link_url: href });
    } else if (href.indexOf('tel:') === 0) {
      gtag('event', 'tel_click', { link_url: href });
    }
  }, true);
})();

/* 途中経過（ファネル）の計測：1ページにつき1回だけ発火
     price_view      … 料金表・料金ブロックが画面に入った（検討が進んだ合図）
     phone_cta_view  … 本文中の電話CTAが画面に入った（問い合わせ手前まで到達）
   ※ 固定ヘッダーの .header-phone / .nav-phone と、スマホ固定バーの .bar-phone は
      ページを開いた瞬間から映っているため除外する。除外しないと全訪問で発火して
      「どこまで進んだか」の指標にならない。 */
(function () {
  'use strict';

  function track(name, params) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, params || {});
  }

  // 指定セレクタ群のいずれかが初めて見えたら1回だけイベント送信
  function fireOnceWhenVisible(selectors, eventName, params) {
    var els = document.querySelectorAll(selectors);
    if (!els.length) return;
    var done = false;
    var io = new IntersectionObserver(function (entries) {
      if (done) return;
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          done = true;
          track(eventName, params);
          io.disconnect();
          break;
        }
      }
    }, { threshold: 0.4 });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  function init() {
    if (!('IntersectionObserver' in window)) return;
    // 料金の表示：トップの料金セクション(#price/.price-table)・料金ページの各ブロック
    fireOnceWhenVisible('#price, .price-table, .price-block, .price-highlight', 'price_view');
    // 電話CTAの表示：固定ヘッダー・固定バーを除いた本文中の電話リンク
    fireOnceWhenVisible(
      'a[href^="tel:"]:not(.header-phone):not(.nav-phone):not(.bar-phone)',
      'phone_cta_view'
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* 強調マーカー(.hl) 描画アニメ：初期表示域より下のものを、表示領域に入った時に1回だけ右へ線を引く
   （上部・初期表示分は静的フル表示のまま＝チラつき無し。IntersectionObserver非対応はフル表示） */
(function () {
  function init() {
    if (!('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.hl');
    if (!els.length) return;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('hl-draw-in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.2 });
    Array.prototype.forEach.call(els, function (el) {
      if (el.getBoundingClientRect().top < vh * 0.9) return; // 初期表示域はそのままフル表示
      io.observe(el);
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();

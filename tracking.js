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

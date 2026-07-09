# -*- coding: utf-8 -*-
"""
事業者様向けコラム（イメージ確認用モック）5本を生成するスクリプト。
- 自己完結HTML（style.css不要・ダブルクリックで開ける）
- サイト本体のトーン（深緑×金×和紙背景）に合わせる
- リンクはダミー(#)。記事末CTAだけ business_mockup.html（LPイメージ）へ
本番未反映。出力先: このフォルダ直下。
"""
import os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
LP = "../business_mockup.html"  # 記事→LPイメージへの導線（相対）

# ── 共通CSS（business_mockup.html と同系統。記事用に article 系を追加） ──
CSS = """
    :root{--main:#556B2F;--main-light:#6B8A3E;--sub:#8B7E66;--accent:#C9A84C;--bg-base:#FAF8F5;--bg-alt:#F0EDE6;--text:#333;--text-light:#666;--white:#fff;--line-green:#06C755;}
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Noto Sans JP',sans-serif;color:var(--text);background-color:var(--bg-base);
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='wf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.14' numOctaves='4' seed='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wf)' opacity='0.05'/%3E%3C/svg%3E");
      line-height:1.8;-webkit-font-smoothing:antialiased;}
    a{color:inherit;}
    header{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,0.97);backdrop-filter:blur(8px);border-bottom:1px solid rgba(0,0,0,0.06);padding:0 40px;height:72px;display:flex;align-items:center;justify-content:space-between;}
    .header-logo-wrap{text-decoration:none;display:flex;align-items:center;gap:10px;}
    .logo-mark{width:42px;height:42px;border-radius:8px;flex-shrink:0;background:var(--main);color:var(--white);display:flex;align-items:center;justify-content:center;font-family:'Noto Serif JP',serif;font-size:1.3rem;font-weight:700;}
    .header-logo{line-height:1.2;font-family:'Noto Serif JP',serif;font-size:1.5rem;font-weight:700;color:var(--main);letter-spacing:0.08em;}
    .header-logo small{display:block;font-size:0.7rem;font-weight:500;color:var(--text-light);}
    nav{display:flex;gap:16px;}
    nav a{text-decoration:none;color:var(--text);font-size:0.85rem;font-weight:500;transition:color 0.3s;}
    nav a:hover{color:var(--main);}
    .header-cta{display:flex;align-items:center;gap:12px;}
    .header-phone{font-size:0.85rem;color:var(--main);font-weight:700;text-decoration:none;}
    .header-phone span{font-size:0.7rem;font-weight:500;color:var(--text-light);display:block;}
    .btn-line-sm{background:var(--line-green);color:var(--white);padding:8px 16px;border-radius:6px;font-size:0.8rem;font-weight:700;text-decoration:none;}
    .mockup-ribbon{position:fixed;top:72px;left:0;right:0;z-index:95;background:var(--accent);color:#4a3c10;text-align:center;font-size:0.78rem;font-weight:700;padding:6px 12px;letter-spacing:0.04em;}
    .breadcrumb{margin-top:104px;padding:14px 24px;background:var(--bg-alt);font-size:0.78rem;color:var(--text-light);}
    .breadcrumb a{color:var(--text-light);text-decoration:none;}
    .article-header{padding:48px 0 0;text-align:center;}
    .article-header .article-tag{display:inline-block;font-size:0.75rem;font-weight:700;color:var(--white);background:var(--main);padding:4px 14px;border-radius:100px;margin-bottom:16px;}
    .article-header h1{font-family:'Noto Serif JP',serif;font-size:1.6rem;line-height:1.6;max-width:720px;margin:0 auto 16px;letter-spacing:0.04em;}
    .article-header .blog-lead{font-size:0.9rem;color:var(--text-light);max-width:640px;margin:0 auto;line-height:1.95;}
    section.article{padding:56px 0 72px;}
    .article-body{max-width:720px;margin:0 auto;padding:0 24px;}
    .point-box{background:linear-gradient(135deg,#E8F5E9,#F1F8E9);border:2px solid var(--main);border-radius:12px;padding:20px 24px;margin-bottom:24px;}
    .point-box .t{font-size:0.82rem;font-weight:700;color:var(--main);margin-bottom:8px;}
    .point-box p{font-size:0.92rem;line-height:1.9;margin:0;}
    .article-body .lead{background:var(--bg-alt);border-radius:12px;padding:24px 28px;margin-bottom:36px;font-size:0.92rem;line-height:2;color:var(--text-light);}
    .article-body h2{text-align:left;font-family:'Noto Serif JP',serif;font-size:1.25rem;margin:44px 0 18px;padding-bottom:12px;border-bottom:2px solid var(--main);letter-spacing:0.04em;}
    .article-body p{font-size:0.92rem;line-height:2;margin-bottom:20px;}
    .article-body strong{color:var(--main);}
    .article-body ul,.article-body ol{margin:0 0 24px 20px;font-size:0.92rem;line-height:2;}
    .article-body li{margin-bottom:8px;}
    .article-body table{width:100%;border-collapse:collapse;background:var(--white);border-radius:8px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.04);margin:20px 0 28px;}
    .article-body th{background:var(--main);color:var(--white);padding:12px 16px;font-size:0.82rem;font-weight:700;text-align:left;}
    .article-body td{padding:12px 16px;font-size:0.85rem;border-bottom:1px solid #eee;}
    .article-body tr:last-child td{border-bottom:none;}
    .highlight-box{background:rgba(85,107,47,0.06);border-left:4px solid var(--main);border-radius:0 8px 8px 0;padding:20px 24px;margin:28px 0;font-size:0.9rem;line-height:2;}
    .highlight-box strong{color:var(--main);}
    .tbc{color:#CC7A00;font-weight:700;}
    .article-cta{background:var(--bg-alt);border-radius:14px;padding:32px;margin:48px 0 0;text-align:center;}
    .article-cta p{font-size:0.95rem;font-weight:700;margin-bottom:8px;line-height:1.8;}
    .article-cta .sub{font-size:0.85rem;font-weight:400;color:var(--text-light);margin-bottom:20px;}
    .article-cta .lp-btn{display:inline-block;background:var(--main);color:var(--white);padding:15px 32px;border-radius:8px;font-size:0.92rem;font-weight:700;text-decoration:none;transition:.3s;}
    .article-cta .lp-btn:hover{background:var(--main-light);}
    .article-nav{max-width:720px;margin:36px auto 0;padding:0 24px;text-align:center;}
    .article-nav a{display:inline-block;font-size:0.85rem;color:var(--main);text-decoration:none;font-weight:500;}
    footer{background:#2A2A2A;color:rgba(255,255,255,0.7);padding:48px 24px 28px;font-size:0.85rem;line-height:2;margin-top:48px;}
    .footer-inner{max-width:1000px;margin:0 auto;text-align:center;}
    .footer-inner h3{font-family:'Noto Serif JP',serif;color:var(--white);font-size:1.1rem;margin-bottom:8px;}
    .footer-bottom{max-width:1000px;margin:24px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;font-size:0.78rem;color:rgba(255,255,255,0.4);}
    @media(max-width:768px){header{padding:0 16px;}nav,.header-cta{display:none;}.article-header h1{font-size:1.3rem;}.breadcrumb{margin-top:104px;}}
"""

HEADER = """  <div class="mockup-ribbon">\U0001F3A8 これはイメージ確認用のモック記事です（本番未公開・リンクはダミー）</div>
  <header>
    <a href="#" class="header-logo-wrap">
      <span class="logo-mark">畳</span>
      <div class="header-logo">大浜畳商店<small><span style="color:var(--accent);font-weight:700;">創業75周年</span></small></div>
    </a>
    <nav>
      <a href="#">料金・メニュー</a>
      <a href="#">畳について</a>
      <a href="#">畳替えの流れ</a>
      <a href="#">施工事例</a>
      <a href="#">お役立ちコラム</a>
      <a href="#">当店について</a>
    </nav>
    <div class="header-cta">
      <a href="#" class="header-phone"><span>お電話でのご相談</span>095-823-1905</a>
      <a href="#" class="btn-line-sm">LINEで相談</a>
    </div>
  </header>
"""

FOOTER = """  <footer>
    <div class="footer-inner">
      <h3>大浜畳商店</h3>
      <p style="color:var(--accent);font-size:0.8rem;">創業75年・三代続く長崎の畳店</p>
      <p style="font-size:0.82rem;margin-top:6px;">有限会社 大浜畳商店　｜　長崎市筑後町4-3　｜　095-823-1905</p>
    </div>
    <div class="footer-bottom">&copy; 有限会社 大浜畳商店　|　制作：まちのAI屋さん　（※これはイメージ確認用モックです）</div>
  </footer>
"""

def cta(text, sub):
    return f"""        <div class="article-cta">
          <p>{text}</p>
          <p class="sub">{sub}</p>
          <a href="{LP}" class="lp-btn">→ 事業者様向けのご案内を見る</a>
        </div>"""

def page(slug, tag, title, lead_desc, point, lead, body, prev_next):
    html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【イメージ】{title}｜大浜畳商店</title>
  <meta name="description" content="{lead_desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700&display=swap" rel="stylesheet">
  <style>{CSS}  </style>
</head>
<body>
{HEADER}
  <div class="breadcrumb"><a href="#">トップ</a> ＞ <a href="#">コラム</a> ＞ <a href="{LP}">事業者様向け</a> ＞ {tag}</div>

  <section class="article-header">
    <span class="article-tag">{tag}</span>
    <h1>{title}</h1>
    <p class="blog-lead">{lead_desc}</p>
  </section>

  <section class="article">
    <div class="article-body">
      <div class="point-box"><p class="t">\U0001F4CC この記事のポイント</p><p>{point}</p></div>
      <div class="lead">{lead}</div>
{body}
{cta_html}
    </div>
  </section>

  <div class="article-nav"><a href="{LP}">← 事業者様向けのご案内に戻る</a>　｜　<a href="index.html">→ 他のコラム一覧（モック）</a></div>

{FOOTER}
</body>
</html>
"""
    return html

# ─────────────────────────────────────────────
# 各記事の中身
# ─────────────────────────────────────────────
ARTICLES = []

# ── B1 賃貸：表替え vs 新調 ──
ARTICLES.append(dict(
  slug="b1_chintai_omotegae_shincho",
  tag="賃貸・オーナー様",
  title="賃貸の退去・入居で畳は「表替え」と「新調」どっちが得？",
  lead_desc="賃貸物件の回転で畳をどうするか。表替え・裏返し・新調の判断基準と費用の目安を、長崎の畳屋が管理会社・オーナー様向けに解説。",
  point="畳の状態が良ければ裏返し・表替えで十分。下地（畳床）まで痛んでいる場合は新調が得策。回転のサイクルを考えると、判断を現場で見て分けるのがコスト最適です。",
  lead="退去・入居のたびに「この畳、表替えでいい？それとも新しくする？」と迷う方は多いはずです。<br><br>判断を間違えると、余計なコストやクレームにつながります。畳屋の立場から、判断の目安を正直にまとめました。",
  body="""        <h2>まずは3つの選択肢を押さえる</h2>
        <p>賃貸の畳の手入れには、大きく3つの選択肢があります。</p>
        <ul>
          <li><strong>裏返し</strong>：今の畳表を裏返して再利用。もっとも安価。入居から5〜6年で、表にシミ・日焼けが少ない場合に。</li>
          <li><strong>表替え</strong>：畳表だけを新しく。見た目がピカピカになるので、内見の印象アップに直結。回転でもっとも多い選択。</li>
          <li><strong>新調（新畳）</strong>：下地から丸ごと作り直す。畳床がへたっている・ブカブカする場合はこれ。</li>
        </ul>
        <div class="highlight-box"><strong>見分けのコツ：</strong>手で畳を押してフカフカ沈む・縁がよれているなら、表だけでなく下地が痛んでいるサイン。この場合は表替えではなく新調を検討します。</div>

        <h2>費用の目安（一般相場）</h2>
        <p>1番気になるのは金額ですよね。一般的な相場は以下のとおり。</p>
        <table>
          <thead><tr><th>施工方法</th><th>1畳あたりの目安</th><th>6畳の場合</th></tr></thead>
          <tbody>
            <tr><td>裏返し</td><td>5,500～8,000円</td><td>約33,000～48,000円</td></tr>
            <tr><td>表替え</td><td>9,900～19,800円</td><td>約59,400～118,800円</td></tr>
            <tr><td>新調（新畳）</td><td>18,700～33,000円</td><td>約112,200～198,000円</td></tr>
          </tbody>
        </table>
        <p>※畳表のグレードや現場によって変わります。複数戸・継続のご発注は、枚数に応じて別途ご相談ください。</p>

        <h2>回転重視なら「場面で使い分け」が正解</h2>
        <p>全部を新調にすれば見た目は安心ですが、コストはかさみます。逆に全部を裏返しで済ませると、入居者からのクレームにつながることも。<strong>物件のグレードと畳の実態を見て、部屋ごとに判断を分ける</strong>のが、長い目で見たときのコスト最適です。</p>
        <p>当店では、現地で畳の状態を見て「この部屋は表替え、こちらは新調が得」という判断も含めてご提案します。管理会社様・オーナー様からのまとまったご依頼も歓迎です。</p>""",
  prev_next="",
))

# ── B2 工務店：畳仕様の決め方 ──
ARTICLES.append(dict(
  slug="b2_koumuten_shiyou",
  tag="工務店・設計",
  title="工務店・リフォーム会社向け｜和室・小上がりの畳仕様の決め方",
  lead_desc="新築・改装の和室や小上がりの畳仕様を、工務店・設計事務所向けに解説。縁の有無、納まり寸法、建材畳表の選び方を長崎の畳屋がまとめました。",
  point="畳仕様は「縁の有無」「厚み（納まり）」「畳表の種類」の3つで主に決まります。小上がり・和モダンなら縁なし・薄畳を早めに決めるのが現場をスムーズにするコツです。",
  lead="和室や小上がりを提案するとき、畳の仕様で迷う場面は多いはずです。<br><br>縁はあるのかないのか、厚みはどうするか、い草か建材畳表か——早めに押さえると、仕上がりも工程もスムーズです。畳屋目線でポイントを整理しました。",
  body="""        <h2>１. 縁の有無を決める</h2>
        <p>まず大きな分かれ道がここです。</p>
        <ul>
          <li><strong>縁あり畳</strong>：標準的な和室に。コストを押さえやすく、縁の柄で雰囲気を調整できます。</li>
          <li><strong>縁なし畳（平畳）</strong>：小上がり・和モダンに人気。半畳を市松に敷くとモダンな印象に。縁がない分、施工の手間とコストはやや上がります。</li>
        </ul>

        <h2>２. 厚み（納まり）を決める</h2>
        <p>下地やフローリングとの段差をなくすために、厚みの指定は早めに。</p>
        <table>
          <thead><tr><th>厚み</th><th>主な用途</th><th>ポイント</th></tr></thead>
          <tbody>
            <tr><td>約55㎜（本畳）</td><td>従来の和室</td><td>畳床を組む標準仕様</td></tr>
            <tr><td>約30〜40㎜</td><td>マンション・洋室の一部</td><td>フローリングとの段差調整に</td></tr>
            <tr><td>約13〜15㎜（置き畳）</td><td>リビングの一角・後付け</td><td>既存床に置くだけ</td></tr>
          </tbody>
        </table>
        <div class="highlight-box"><strong>現場のポイント：</strong>フローリングに揃えるフラットな小上がりにするか、あえて段差をつけて腰掛けにするかで、推奨する厚みが変わります。図面段階でご相談いただければ納まりを見て提案します。</div>

        <h2>３. 畳表の種類を決める</h2>
        <p>素材によって風合いとメンテナンス性が変わります。</p>
        <ul>
          <li><strong>い草畳表</strong>：香りと質感が魅力。伝統的な和室に。</li>
          <li><strong>ダイケン健やかおもて・セキスイ美草</strong>：変色しにくく、カラー展開が豊富。ペット・小さなお子様のいる住宅や、施設などに人気。</li>
        </ul>
        <p>当店はい草・ダイケン・セキスイいずれも取り扱い。サンプルやカラー見本のご提示もできますので、施主様へのご提案にもご活用ください。""",
  prev_next="",
))

# ── B3 まとまった枚数・短納期 ──
ARTICLES.append(dict(
  slug="b3_ryou_nouki",
  tag="内装・元請様",
  title="まとまった枚数・短納期の畳発注に対応できる畳店の選び方",
  lead_desc="大量・短納期の畳発注で失敗しないための畳店の選び方を、内装業者・元請様向けに解説。供給力・納期・品質の確認ポイントを長崎の畳屋がまとめました。",
  point="大量・短納期の発注では「供給力」「スケジュール対応」「仕上がりの安定」の3つを確認を。早めの枚数共有が、納期を守る最大のコツです。",
  lead="現場の工程に合わせて「この枚数を、この日までに」——内装・元請の現場では、畳の供給力と納期が直接スケジュールに響きます。<br><br>発注先の畳店を選ぶときに見ておきたいポイントを、作る側の立場から正直にお伝えします。",
  body="""        <h2>確認ポイント１：供給力（何枚さばけるか）</h2>
        <p>まとまった枚数を任せるなら、まずは1日あたりの施工能力を確認しましょう。台数が読めれば、納期の逆算ができます。</p>
        <div class="highlight-box"><strong>当店の場合：</strong>代表自ら一枚ずつ仕上げながら、繁忙期には<strong>1日あたり最大40枚</strong>の施工に対応しています。複数戸・大広間など、まとまった枚数のご依頼も承ります。</div>

        <h2>確認ポイント２：スケジュール対応</h2>
        <p>現場は他工程との兼ね合いで動きます。「引き渡し前のこの日に」というピンポイントに合わせられるかが重要です。</p>
        <ul>
          <li>搬入・納品の日時を現場に合わせて調整できるか</li>
          <li>進捗や変更の連絡がスムーズか（電話・LINEなど）</li>
          <li>地元でフットワークが軽いか</li>
        </ul>
        <p>当店は長崎市を中心に地元密着。急ぎの現場や下見にも動きやすく、連絡も取りやすいのが強みです。<span class="tbc">（※最短納期・繁忙期の目安は公開前に大浜さんへ要確認）</span></p>

        <h2>確認ポイント３：仕上がりの安定</h2>
        <p>大量になるほど、仕上がりのバラツキが目立ちます。施主・貸主への引き渡しを考えると、一枚ごとの品質が揃っていることは大事です。</p>
        <p><strong>創業75年・三代続く大浜畳商店</strong>は、職人歴20年の代表が下地の状態を見極めて一枚ずつ仕上げます。枚数がまとまっても、仕上がりの均一性を大切にしています。</p>""",
  prev_next="",
))

# ── B4 施設のメンテナンス頻度 ──
ARTICLES.append(dict(
  slug="b4_shisetsu_maintenance",
  tag="旅館・飲食・施設",
  title="旅館・飲食・施設の畳メンテナンス｜張替え頻度と費用の目安",
  lead_desc="旅館・飲食店の座敷・介護施設など、人の出入りが多い畳の張替え頻度と費用の目安を解説。定期メンテナンスの考え方を長崎の畳屋がまとめました。",
  point="人の出入りが多い施設の畳は、一般家庭より早く痛みます。「裏返し→表替え→新調」のサイクルを回すと、見た目とコストの両方を保てます。",
  lead="座敷や大広間の畳は、お客様の第一印象を左右します。日焼けやシミが目立つと、それだけで古さを感じさせてしまうことも。<br><br>施設の畳はどのくらいのペースで手入れすればいいのか、目安をまとめました。",
  body="""        <h2>施設の畳は「早く痛む」と思っておく</h2>
        <p>一般家庭では表替えの目安が約5〜7年ですが、人の出入りが多い施設はもっと早いペースで痛みます。</p>
        <table>
          <thead><tr><th>用途</th><th>裏返し・表替えの目安</th><th>備考</th></tr></thead>
          <tbody>
            <tr><td>旅館・客室</td><td>約2〜4年</td><td>稼働率による</td></tr>
            <tr><td>飲食店の座敷</td><td>約2〜3年</td><td>飲食・油シミに注意</td></tr>
            <tr><td>介護・福祉施設</td><td>約3〜5年</td><td>変色・ダニに強い建材畳表が人気</td></tr>
          </tbody>
        </table>
        <div class="highlight-box"><strong>ポイント：</strong>旅館・飲食では、全室を一度にではなく、客室・フロアごとに順番に張替えすると、営業を止めずに費用も平準化できます。定期ローテーションのご相談も承ります。</div>

        <h2>素材は用途で選ぶ</h2>
        <ul>
          <li><strong>い草畳表</strong>：香りと風合いで、旅館・料亭のおもてなしに。</li>
          <li><strong>建材畳表（ダイケン・セキスイ）</strong>：変色・ダニ・カビに強く、介護施設や土足で上がる座敷などに向きます。</li>
        </ul>
        <p>座敷・大広間など枚数の多い現場も、当店ならまとめてご相談いただけます。張替え時期の見積もりや、定期メンテナンスの計画からお手伝いします。""",
  prev_next="",
))

# ── B5 空室対策・投資対効果 ──
ARTICLES.append(dict(
  slug="b5_kushitsu_taisaku",
  tag="賃貸オーナー",
  title="賃貸オーナーの空室対策｜畳替えの投資対効果を畳屋が正直に",
  lead_desc="空室対策としての畳替えの投資対効果を、長崎の畳屋がオーナー様向けに正直に解説。内見の印象と入居率への効果をまとめました。",
  point="きれいな畳は内見の印象を大きく左右します。表替えは6畳で約5万円台から。空室期間の短縮や長期入居を考えると、先に手入れるほうが得なケースも多いです。",
  lead="空室がなかなか埋まらない——そのとき、意外と見落とされがちなのが畳の状態です。<br><br>内見の瞬間、い草の香りときれいな畳は「この部屋に住みたい」と思わせる力があります。畳屋の立場から、投資対効果を正直にお伝えします。",
  body="""        <h2>入居前の畳替えは内見の印象に直結</h2>
        <p>内見は最初の数秒で印象が決まります。日焼けした茶色い畳と、青々とした新しい畳では、部屋全体の明るさが大きく違います。い草の香りも、内見での好印象につながります。</p>

        <h2>投資対効果を数字で見る</h2>
        <p>表替えは1畳あたり9,900円〜、６畳なら約59,400円程度。この投資で空室期間を短縮できれば、家賃の機会損失を取り戻せる可能性があります。</p>
        <table>
          <thead><tr><th>施工方法</th><th>6畳の目安</th><th>こんなときに</th></tr></thead>
          <tbody>
            <tr><td>裏返し</td><td>約33,000円〜</td><td>シミ・日焼けが少ない</td></tr>
            <tr><td>表替え</td><td>約59,400円〜</td><td>見た目をリフレッシュしたい</td></tr>
            <tr><td>新調</td><td>約112,200円〜</td><td>下地から痛んでいる</td></tr>
          </tbody>
        </table>
        <div class="highlight-box"><strong>オーナー様へ：</strong>退去と入居を繰り返すたびに少しずつ痛むより、タイミングを見て先に手入れておくほうが、長期入居にもつながり得なケースが多いです。</div>

        <h2>複数戸・継続のご依頼はまとめて相談を</h2>
        <p>複数の物件をお持ちのオーナー様・管理会社様は、枚数やスケジュールに合わせて別途ご相談を承ります。当店は繁忙期で<strong>1日あたり最大40枚</strong>の供給力があり、回転のタイミングに合わせて対応します。お支払い方法なども合わせてご相談ください。<span class="tbc">（※請求書払い等の条件は公開前に要確認）</span></p>""",
  prev_next="",
))

# ─────────────────────────────────────────────
# 生成
# ─────────────────────────────────────────────
CTA_TEXT = "まとまった枚数・継続のご相談を承ります。"
CTA_SUB = "工務店・管理会社・オーナー様・施設のご担当様へ。「まずは見積りだけ」でも歓迎です。"

built = []
for a in ARTICLES:
    global cta_html
    cta_html = cta(CTA_TEXT, CTA_SUB)
    html = page(a["slug"], a["tag"], a["title"], a["lead_desc"], a["point"], a["lead"], a["body"], a["prev_next"])
    path = os.path.join(OUT_DIR, a["slug"] + ".html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    built.append((a["slug"], a["title"]))
    print("generated:", a["slug"] + ".html")

# 一覧（index）モック
cards = "\n".join(
    f'      <a href="{s}.html" class="col-card"><span class="ci">{i+1}</span><span class="ct">{t}</span></a>'
    for i, (s, t) in enumerate(built)
)
index_html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【イメージ】事業者様向けコラム一覧｜大浜畳商店</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700&display=swap" rel="stylesheet">
  <style>{CSS}
    .wrap{{max-width:760px;margin:0 auto;padding:120px 24px 40px;}}
    h1{{font-family:'Noto Serif JP',serif;font-size:1.6rem;text-align:center;margin-bottom:8px;}}
    .sub{{text-align:center;color:var(--text-light);font-size:0.88rem;margin-bottom:36px;}}
    .col-card{{display:flex;align-items:center;gap:16px;background:var(--white);border-radius:10px;padding:18px 22px;margin-bottom:14px;box-shadow:0 1px 6px rgba(0,0,0,0.05);text-decoration:none;transition:.2s;}}
    .col-card:hover{{transform:translateY(-2px);}}
    .col-card .ci{{flex-shrink:0;width:38px;height:38px;border-radius:50%;background:var(--main);color:#fff;font-family:'Noto Serif JP',serif;font-weight:700;display:flex;align-items:center;justify-content:center;}}
    .col-card .ct{{font-size:0.95rem;font-weight:500;line-height:1.5;}}
    .lpback{{text-align:center;margin-top:28px;}}
    .lpback a{{color:var(--main);font-weight:700;text-decoration:none;font-size:0.9rem;}}
  </style>
</head>
<body>
{HEADER}
  <div class="wrap">
    <h1>事業者様向けコラム（イメージ）</h1>
    <p class="sub">工務店・賃貸管理・施設のご担当様向けのコラムモック5本です。</p>
{cards}
    <div class="lpback"><a href="{LP}">→ 事業者様向けLP（イメージ）を見る</a></div>
  </div>
{FOOTER}
</body>
</html>
"""
with open(os.path.join(OUT_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(index_html)
print("generated: index.html")
print("done:", len(built), "articles + index")

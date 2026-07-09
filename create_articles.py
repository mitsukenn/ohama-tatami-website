import os, re

with open('blog/kenko/index.html', 'r', encoding='utf-8') as f:
    template = f.read()

# Extract everything before first h2 in article body and after article-cta
# We'll replace the body content between first <h2> and <div class="article-cta">

articles = {
    "suimin": {
        "tag": "豆知識",
        "title_html": "畳の部屋で眠ると睡眠の質が上がる？<br>い草と睡眠の科学的な関係",
        "title_plain": "畳の部屋で眠ると睡眠の質が上がる？｜い草と睡眠の科学的な関係",
        "lead": "「畳の部屋で寝ると、なんだかぐっすり眠れる気がする」——その感覚、実は科学的に裏付けられています。い草の香りと調湿作用が、理想的な睡眠環境を作り出すことがわかっています。",
        "date": "2026-06-01",
        "date_jp": "2026年6月1日",
        "desc": "畳の部屋で眠ると睡眠の質が向上する理由を科学的に解説。い草の香りによるリラックス効果、調湿作用による快適な湿度環境など。",
        "bc": "畳と睡眠の質",
        "cta_main": "寝室の畳替えもお任せください。",
        "cta_sub": "サンプルをお持ちして、寝室に最適な畳をご提案します。",
    },
    "igusa-vs-kagaku": {
        "tag": "素材比較",
        "title_html": "い草と化学畳表の科学的比較<br>紫外線耐久性・健康効果・経年変化の違い",
        "title_plain": "い草と化学畳表の科学的比較｜紫外線耐久性・健康効果・経年変化の違い",
        "lead": "「天然い草と化学畳表、結局どっちがいいの？」——感覚ではなく、科学的なデータで比較します。北九州市立大学の紫外線耐久性試験の結果や、健康効果の違いを正直にお伝えします。",
        "date": "2026-06-08",
        "date_jp": "2026年6月8日",
        "desc": "天然い草と化学畳表を科学的データで比較。紫外線耐久性試験、健康効果、経年変化の違いを解説。",
        "bc": "い草と化学畳表の科学的比較",
        "cta_main": "どちらの素材が合うか、サンプルで比較できます。",
        "cta_sub": "い草・和紙畳・樹脂畳、すべてのサンプルをお持ちします。",
    },
    "shinchiku-tatami": {
        "tag": "暮らし",
        "title_html": "新築に畳を入れるメリット<br>後悔しないための選び方と注意点",
        "title_plain": "新築に畳を入れるメリット｜後悔しないための選び方と注意点",
        "lead": "「新築だけど、和室は必要？」「フローリングだけでいいかな？」——実は、新築こそ畳を取り入れる絶好のチャンスです。後から入れるより費用も手間も抑えられます。後悔しないための選び方をお伝えします。",
        "date": "2026-06-15",
        "date_jp": "2026年6月15日",
        "desc": "新築住宅に畳を入れるメリットと選び方を解説。子育て・睡眠・リラックス効果など、畳のある暮らしの魅力。",
        "bc": "新築に畳を入れるメリット",
        "cta_main": "新築の畳選びは、建てる前にご相談ください。",
        "cta_sub": "設計図面をお見せいただければ、最適な畳をご提案いたします。",
    },
}

# Article body content
bodies = {}
bodies["suimin"] = """
        <h2>い草の香りが睡眠の質を高める</h2>
        <p>い草には<strong>バニリン</strong>というバニラに含まれる香り成分や、<strong>フィトンチッド</strong>という森林浴と同じリラックス成分が含まれています。</p>
        <p>これらの成分は<strong>副交感神経を刺激</strong>し、心身をリラックス状態に導きます。つまり、畳の部屋にいるだけで、自然と「眠りやすい状態」が作られるということです。</p>
        <p>九州大学の研究チームが行った脳波測定実験では、い草のある空間で<strong>リラックス状態を示すアルファ波が有意に増加</strong>し、しかも時間経過とともに効果が持続・増加する傾向が確認されています。</p>

        <h2>睡眠効率の比較データ</h2>
        <p>い草のある空間とない空間で睡眠の質を比較した研究では、注目すべき結果が出ています。</p>
        <table>
          <thead><tr><th>環境</th><th>睡眠効率</th></tr></thead>
          <tbody>
            <tr><td><strong>い草畳の空間</strong></td><td><strong>有意に高い</strong></td></tr>
            <tr><td>い草なしの空間</td><td>標準</td></tr>
          </tbody>
        </table>
        <p>入眠から起床までの<strong>睡眠効率が向上</strong>し、より深い休息が得られるとされています。い草の香りが入眠を促し、調湿作用が快適な睡眠環境を維持してくれるためと考えられています。</p>

        <h2>調湿作用 --- 寝室の湿度を自動調整</h2>
        <p>快適な睡眠に適した室内湿度は<strong>50～60%</strong>と言われています。い草には優れた調湿作用があり、<strong>畳1枚あたり約500mlの水分を吸放湿</strong>できます。</p>
        <p>6畳の寝室なら約3リットル。ペットボトル6本分もの水分をコントロールしてくれる計算です。長崎のような湿度の高い地域では、この調湿作用は特にありがたい機能です。</p>
        <p>エアコンに頼りすぎると喉や肌が乾燥しますが、畳の部屋では自然な湿度環境が保たれるため、<strong>朝起きた時の喉の乾燥感が軽減</strong>されます。</p>

        <h2>フローリングの寝室 vs 畳の寝室</h2>
        <table>
          <thead><tr><th>比較項目</th><th>畳の寝室</th><th>フローリングの寝室</th></tr></thead>
          <tbody>
            <tr><td><strong>湿度調整</strong></td><td>い草が自然に調湿</td><td>除湿器・加湿器が必要</td></tr>
            <tr><td><strong>香り</strong></td><td>リラックス成分あり</td><td>なし</td></tr>
            <tr><td><strong>断熱性</strong></td><td>高い（冬暖かい）</td><td>低い（底冷えしやすい）</td></tr>
            <tr><td><strong>防音性</strong></td><td>高い（足音が響きにくい）</td><td>低い</td></tr>
            <tr><td><strong>クッション性</strong></td><td>あり（直接寝られる）</td><td>なし（マットレス必須）</td></tr>
            <tr><td><strong>布団との相性</strong></td><td>直接敷ける</td><td>すのこ等が必要</td></tr>
          </tbody>
        </table>
        <p>ベッドよりも布団派の方には、畳の寝室が圧倒的に快適です。</p>

        <h2>寝室に畳を取り入れる3つの方法</h2>
        <p>「今の部屋をいきなり畳にするのは…」という方でも、段階的に取り入れられます。</p>
        <ul>
          <li><strong>和室の畳替え</strong>…既存の和室の畳を新しい国産い草に。香りと機能が復活します</li>
          <li><strong>置き畳</strong>…フローリングの上に敷くだけ。手軽に畳の効果を得られます</li>
          <li><strong>カラー畳で和モダンに</strong>…寝室のインテリアに合わせたモダンな畳空間も可能です</li>
        </ul>

        <div class="highlight-box">
          <strong>睡眠の質は健康の基盤です。</strong>い草の香り×調湿作用×断熱性で、理想的な睡眠環境を作りませんか？まずはサンプルを見てみてください。
        </div>
"""

bodies["igusa-vs-kagaku"] = """
        <h2>紫外線耐久性試験 --- 意外な結果</h2>
        <p>「天然素材は日光に弱い」と思われがちですが、北九州市立大学・森田洋教授が実施した<strong>9ヶ月間の紫外線照射試験</strong>では、意外な結果が出ています。</p>
        <table>
          <thead><tr><th>素材</th><th>摩耗前の状態</th><th>9ヶ月照射後</th></tr></thead>
          <tbody>
            <tr><td><strong>国産い草</strong></td><td>繊維がしっかり</td><td><strong>形状を維持。耐久性に著しい変化なし</strong></td></tr>
            <tr><td>化学畳表A</td><td>均一な繊維</td><td>繊維が崩れやすくなる</td></tr>
            <tr><td>化学畳表B</td><td>均一な繊維</td><td>繊維がさらに崩れる</td></tr>
          </tbody>
        </table>
        <p>い草は色落ちこそしますが、<strong>繊維自体の耐久性は化学畳表よりも優れている</strong>という結果です。</p>

        <h2>経年変化の違い --- 劣化 vs 成長</h2>
        <p>ここが天然素材と工業製品の最大の違いです。</p>
        <table>
          <thead><tr><th>比較項目</th><th>天然い草</th><th>化学畳表</th></tr></thead>
          <tbody>
            <tr><td><strong>買った直後</strong></td><td>青々とした色</td><td>均一なカラー</td></tr>
            <tr><td><strong>1～2年後</strong></td><td>黄緑色に変化</td><td>色は維持</td></tr>
            <tr><td><strong>3～5年後</strong></td><td>美しい飴色（黄金色）に</td><td>徐々に色あせ</td></tr>
            <tr><td><strong>10年後</strong></td><td>深い飴色。ツヤが出る</td><td>素材が劣化</td></tr>
            <tr><td><strong>印象</strong></td><td>「育っている」「味がある」</td><td>「古くなった」</td></tr>
          </tbody>
        </table>
        <p>一般的な工業製品は<strong>買った時が品質のピーク</strong>で、使うほど劣化します。しかし天然い草は、使うほどにツヤが出て飴色に変わる<strong>「成長」</strong>を楽しめます。</p>

        <h2>健康効果の比較</h2>
        <table>
          <thead><tr><th>健康効果</th><th>天然い草</th><th>化学畳表</th></tr></thead>
          <tbody>
            <tr><td><strong>空気清浄</strong></td><td>ホルムアルデヒド吸着あり</td><td>なし</td></tr>
            <tr><td><strong>リラックス効果</strong></td><td>バニリン等の香り成分</td><td>なし</td></tr>
            <tr><td><strong>調湿作用</strong></td><td>畳1枚約500ml</td><td>なし～わずか</td></tr>
            <tr><td><strong>抗菌効果</strong></td><td>白癬菌・O157に効果</td><td>なし</td></tr>
            <tr><td><strong>集中力向上</strong></td><td>正答率14.4%（畳教室）</td><td>データなし</td></tr>
          </tbody>
        </table>
        <p>健康効果の面では、<strong>天然い草が圧倒的に優位</strong>です。</p>

        <h2>化学畳表が向いているケース</h2>
        <p>正直に申し上げると、化学畳表の方がおすすめなケースもあります。</p>
        <ul>
          <li><strong>ペットがいるご家庭</strong>…爪傷や粗相に強い樹脂畳</li>
          <li><strong>アレルギーが心配な方</strong>…ダニ・カビのリスクが低い</li>
          <li><strong>デザイン重視</strong>…カラーバリエーションが豊富</li>
          <li><strong>メンテナンスを楽にしたい方</strong>…水拭きOK</li>
        </ul>

        <h2>天然い草が向いているケース</h2>
        <ul>
          <li><strong>自然素材の香りを楽しみたい方</strong></li>
          <li><strong>寝室に使いたい方</strong>…睡眠の質向上・リラックス効果</li>
          <li><strong>お子様の勉強部屋</strong>…集中力向上のデータあり</li>
          <li><strong>経年変化を楽しみたい方</strong>…飴色への変化は天然素材ならでは</li>
          <li><strong>日当たりの良い部屋</strong>…紫外線耐久性で実は有利</li>
        </ul>

        <div class="highlight-box">
          <strong>結論：「どちらが上」ではなく「どちらが合うか」。</strong>ライフスタイルやお部屋の用途に合わせて選ぶことが大切です。大浜畳商店では両方のサンプルをお持ちして、正直にアドバイスいたします。
        </div>
"""

bodies["shinchiku-tatami"] = """
        <h2>新築に畳を入れる5つのメリット</h2>

        <h3>1. 子育てに最適なクッション性</h3>
        <p>赤ちゃんのハイハイ、よちよち歩きの転倒、おもちゃの落下音——畳は<strong>天然のクッション材</strong>です。フローリングと比べて衝撃吸収性が高く、お子様が転んでも怪我のリスクを軽減できます。防音効果も高いため、マンションの下の階への配慮にもなります。</p>

        <h3>2. 睡眠の質が向上する</h3>
        <p>い草の香り成分（バニリン・フィトンチッド）には<strong>リラックス効果</strong>があり、寝室に畳を入れることで睡眠の質が向上するという研究データがあります。布団を直接敷けるため、ベッドフレームが不要で<strong>部屋を広く使える</strong>メリットもあります。</p>

        <h3>3. 調湿効果で快適な室内環境</h3>
        <p>畳1枚あたり<strong>約500mlの水分を吸放湿</strong>。6畳の部屋なら約3リットルの調湿能力があります。長崎のような湿度の高い地域では、この自然の調湿効果は特に重宝します。</p>

        <h3>4. 多目的スペースとして活躍</h3>
        <p>畳の部屋は<strong>用途を限定しない</strong>のが最大の魅力です。</p>
        <ul>
          <li>子どもの遊び場・昼寝スペース</li>
          <li>来客時の客間・宿泊スペース</li>
          <li>在宅ワークの書斎</li>
          <li>ヨガ・ストレッチのスペース</li>
          <li>洗濯物を畳むスペース</li>
        </ul>
        <p>フローリングの部屋は家具で用途が決まりますが、畳の部屋は<strong>何もなくても成立する</strong>。この柔軟性が、長く住む家では大きな価値になります。</p>

        <h3>5. 将来の資産価値</h3>
        <p>和室のない家は増えていますが、だからこそ<strong>和室のある家は差別化</strong>になります。将来の売却や賃貸の際にも、幅広いニーズに対応できます。</p>

        <h2>新築で畳を選ぶときの注意点</h2>
        <table>
          <thead><tr><th>素材</th><th>おすすめの部屋</th><th>特徴</th></tr></thead>
          <tbody>
            <tr><td><strong>国産い草</strong></td><td>寝室・客間</td><td>香り・健康効果が最大</td></tr>
            <tr><td><strong>和紙畳（ダイケン）</strong></td><td>リビング隣接の畳コーナー</td><td>カラー豊富。インテリアに合わせやすい</td></tr>
            <tr><td><strong>樹脂畳（セキスイ美草）</strong></td><td>子ども部屋・ペットのいる部屋</td><td>汚れに強い。メンテナンス簡単</td></tr>
          </tbody>
        </table>

        <h2>サイズと配置のポイント</h2>
        <p>新築なら<strong>設計段階から畳のサイズを考慮</strong>できるのが最大のメリットです。</p>
        <ul>
          <li><strong>4.5畳</strong>…書斎やヨガスペースにちょうど良い</li>
          <li><strong>6畳</strong>…寝室・客間として最もスタンダード</li>
          <li><strong>小上がり（3畳程度）</strong>…リビングの一角に。収納付きも可能</li>
        </ul>

        <h2>工務店に伝えるべきポイント</h2>
        <p>新築の畳は工務店経由で発注するケースが多いですが、<strong>畳の品質は畳屋で大きく変わります</strong>。</p>
        <div class="highlight-box">
          <strong>「畳は地元の畳屋さんに直接お願いしたい」</strong><br>
          工務店の標準仕様の畳は、コスト優先の中国産畳表であることがほとんどです。畳屋に直接依頼すれば、国産い草やカラー畳など、<strong>品質もデザインも選択肢が広がります</strong>。費用も工務店経由とあまり変わらないケースが多いです。
        </div>

        <h2>カラー畳で和モダンな新築に</h2>
        <p>「和室は古くさい」というイメージを持っている方にこそ、<strong>カラー畳</strong>をおすすめします。グレー、ベージュ、ブラウンなどのモダンなカラーと、縁なし畳の市松敷きを組み合わせれば、<strong>洋風のインテリアにも完璧にマッチ</strong>する和モダン空間が実現します。</p>

        <div class="highlight-box">
          <strong>新築の畳選びは、建てる前にご相談ください。</strong>設計図面をお見せいただければ、最適な畳のサイズ・素材・カラーをご提案いたします。サンプルもお持ちします。
        </div>
"""

related_map = {
    "suimin": [("kenko", "畳と健康の関係"), ("igusa", "熊本県産い草の魅力"), ("sozai", "和紙畳・樹脂畳・い草畳の違い"), ("baby", "赤ちゃんがいる家庭に畳がおすすめな理由")],
    "igusa-vs-kagaku": [("sozai", "和紙畳・樹脂畳・い草畳の違い"), ("igusa", "熊本県産い草の魅力"), ("sekisui-migusa", "セキスイ美草の特徴"), ("daiken-colors", "ダイケン健やかおもて全色紹介")],
    "shinchiku-tatami": [("wa-modern", "和モダンな畳の部屋をつくる"), ("tatami-corner", "リビングに畳コーナーは後悔する？"), ("color-ranking", "畳の色選び人気ランキング"), ("flooring", "畳とフローリングどっちがいい？")],
}

for slug, info in articles.items():
    os.makedirs(f"blog/{slug}", exist_ok=True)

    html = template

    # Head replacements
    html = html.replace("畳と健康の関係｜い草の空気清浄・リラックス効果を科学的に解説｜大浜畳商店", info["title_plain"] + "｜大浜畳商店")
    html = html.replace("畳と健康の関係｜い草の空気清浄・リラックス効果を科学的に解説", info["title_plain"])
    html = html.replace("畳のい草が持つ健康効果を科学的に解説。空気清浄作用・リラックス効果・調湿性・集中力向上など。", info["desc"])
    html = html.replace("https://ohama-tatami.co.jp/blog/kenko/", f"https://ohama-tatami.co.jp/blog/{slug}/")
    html = html.replace('"datePublished": "2026-05-14"', f'"datePublished": "{info["date"]}"')

    # Breadcrumb
    html = html.replace("> 畳と健康の関係", f"> {info['bc']}")

    # Article header
    html = html.replace('<span class="article-tag">豆知識</span>', f'<span class="article-tag">{info["tag"]}</span>')
    html = re.sub(r'<h1>.*?</h1>', f'<h1>{info["title_html"]}</h1>', html, flags=re.DOTALL)
    html = re.sub(r'<p class="blog-lead">.*?</p>', f'<p class="blog-lead">{info["lead"]}</p>', html, flags=re.DOTALL)
    html = re.sub(r'投稿予定日：\d{4}年\d{1,2}月\d{1,2}日', f'投稿予定日：{info["date_jp"]}', html)

    # Replace body: find first <h2> after article-body, replace until article-cta
    ab_start = html.find('<div class="article-body">')
    first_h2 = html.find('<h2>', ab_start)
    cta_start = html.find('<div class="article-cta">', ab_start)

    if first_h2 > 0 and cta_start > 0:
        html = html[:first_h2] + bodies[slug].strip() + "\n\n        " + html[cta_start:]

    # Replace CTA text
    html = re.sub(r'(<div class="article-cta">\s*<p>).*?(</p>)', f'\\1{info["cta_main"]}\\2', html, count=1)
    html = re.sub(r'(<p class="sub">).*?(</p>)', f'\\1{info["cta_sub"]}\\2', html, count=1)

    # Replace related articles
    related_start = html.find('<div class="related-grid">')
    related_end = html.find('</div>', html.find('</a>', html.find('</a>', html.find('</a>', html.find('</a>', related_start) + 1) + 1) + 1) + 1)

    if related_start > 0:
        new_related = '<div class="related-grid">\n'
        for r_slug, r_title in related_map[slug]:
            new_related += f'          <a href="../{r_slug}/" class="related-card">\n'
            new_related += f'            <div class="related-thumb"></div>\n'
            new_related += f'            <div class="related-body"><h3>{r_title}</h3></div>\n'
            new_related += f'          </a>\n'
        new_related += '        </div>'
        html = html[:related_start] + new_related + html[related_end+6:]

    with open(f"blog/{slug}/index.html", "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Created: blog/{slug}/index.html")

print("\nDone!")

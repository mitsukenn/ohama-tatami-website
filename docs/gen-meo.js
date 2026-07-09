const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, PageNumber, PageBreak, LevelFormat } = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cm = { top: 80, bottom: 80, left: 120, right: 120 };
const W = 9506;

function hc(t, w) { return new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: { fill: "556B2F", type: ShadingType.CLEAR }, margins: cm, children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF", font: "Arial", size: 20 })] })] }); }
function tc(t, w, o={}) { return new TableCell({ borders, width: { size: w, type: WidthType.DXA }, shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR } : undefined, margins: cm, children: [new Paragraph({ children: [new TextRun({ text: t, font: "Arial", size: 20, ...o.r })] })] }); }
function h1(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text: t, bold: true, font: "Arial", size: 32, color: "556B2F" })] }); }
function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 }, children: [new TextRun({ text: t, bold: true, font: "Arial", size: 26, color: "333333" })] }); }
function h3(t) { return new Paragraph({ spacing: { before: 200, after: 120 }, children: [new TextRun({ text: t, bold: true, font: "Arial", size: 22, color: "556B2F" })] }); }
function p(t) { return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: t, font: "Arial", size: 20 })] }); }
function pb(l, t) { return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: l, font: "Arial", size: 20, bold: true }), new TextRun({ text: t, font: "Arial", size: 20 })] }); }
function bl(t) { return new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: t, font: "Arial", size: 20 })] }); }
function nl(t) { return new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: t, font: "Arial", size: 20 })] }); }
function quote(t, c) { return new Paragraph({ spacing: { after: 120 }, border: { left: { style: BorderStyle.SINGLE, size: 6, color: c, space: 8 } }, indent: { left: 360 }, children: [new TextRun({ text: t, font: "Arial", size: 20, italics: true })] }); }
const PB = new Paragraph({ children: [new PageBreak()] });

const doc = new Document({
  numbering: { config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ]},
  styles: { default: { document: { run: { font: "Arial", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: "Arial", color: "556B2F" }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Arial", color: "333333" }, paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
    ]
  },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1200, bottom: 1440, left: 1200 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "\u5927\u6D5C\u7573\u5546\u5E97 MEO\u6226\u7565\u66F8", font: "Arial", size: 16, color: "999999" })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Page ", font: "Arial", size: 16, color: "999999" }), new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" })] })] }) },
    children: [
      // Title
      new Paragraph({ spacing: { before: 2400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Google\u30DE\u30C3\u30D7SEO\uFF08MEO\uFF09\u6226\u7565\u66F8", font: "Arial", size: 40, bold: true, color: "556B2F" })] }),
      new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C9A84C", space: 1 } }, children: [new TextRun({ text: " ", size: 8 })] }),
      new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u5927\u6D5C\u7573\u5546\u5E97", font: "Arial", size: 32, color: "333333" })] }),
      new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2026\u5E744\u670812\u65E5 \u4F5C\u6210\uFF1A\u307E\u3061\u306EAI\u5C4B\u3055\u3093", font: "Arial", size: 20, color: "666666" })] }),
      PB,

      h1("\u306F\u3058\u3081\u306B\uFF1AMEO\u3068\u306F"),
      p("MEO\uFF08Map Engine Optimization\uFF09\u3068\u306F\u3001Google\u30DE\u30C3\u30D7\u3067\u306E\u691C\u7D22\u7D50\u679C\u3067\u4E0A\u4F4D\u8868\u793A\u3055\u308C\u308B\u305F\u3081\u306E\u5BFE\u7B56\u3067\u3059\u3002"),
      p("\u300C\u9577\u5D0E \u7573\u300D\u306A\u3069\u3067\u691C\u7D22\u3059\u308B\u3068\u3001\u901A\u5E38\u306E\u691C\u7D22\u7D50\u679C\u3088\u308A\u5148\u306BGoogle\u30DE\u30C3\u30D7\u306E\u7D50\u679C\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002\u3053\u3053\u306B\u4E0A\u4F4D\u8868\u793A\u3055\u308C\u308B\u3053\u3068\u304C\u3001\u5730\u57DF\u306E\u304A\u5BA2\u69D8\u3092\u7372\u5F97\u3059\u308B\u6700\u3082\u52B9\u679C\u7684\u306A\u65B9\u6CD5\u3067\u3059\u3002"),
      h2("\u73FE\u72B6"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [3000, 6506], rows: [
        new TableRow({ children: [hc("\u9805\u76EE", 3000), hc("\u73FE\u72B6", 6506)] }),
        new TableRow({ children: [tc("Google\u30DE\u30C3\u30D7", 3000), tc("\u63B2\u8F09\u6E08\u307F", 6506)] }),
        new TableRow({ children: [tc("\u30AF\u30C1\u30B3\u30DF", 3000), tc("\u26055.0\uFF082\u4EF6\uFF09", 6506)] }),
        new TableRow({ children: [tc("\u30AA\u30FC\u30CA\u30FC\u78BA\u8A8D", 3000), tc("\u672A\u78BA\u8A8D\uFF08\u8981\u5BFE\u5FDC\uFF09", 6506, { r: { color: "CC0000" } })] }),
      ]}),
      PB,

      h1("Phase 1\uFF1A\u57FA\u76E4\u6574\u5099\uFF081\u65E5\u3067\u5B8C\u4E86\uFF09"),
      h2("1-1. \u30A6\u30A7\u30D6\u30B5\u30A4\u30C8URL\u8FFD\u52A0"),
      nl("\u30D3\u30B8\u30CD\u30B9\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u7BA1\u7406\u753B\u9762\u3092\u958B\u304F"), nl("\u300C\u60C5\u5831\u300D\u2192\u300C\u30A6\u30A7\u30D6\u30B5\u30A4\u30C8\u300D"), nl("https://ohama-tatami.co.jp \u3092\u5165\u529B\u3057\u3066\u4FDD\u5B58"),
      pb("\u52B9\u679C\uFF1A", "\u88AB\u30EA\u30F3\u30AF\u7372\u5F97 + \u30DE\u30C3\u30D7\u304B\u3089\u30B5\u30A4\u30C8\u3078\u306E\u6D41\u5165"),
      h2("1-2. \u30B5\u30FC\u30D3\u30B9\u4E00\u89A7\u767B\u9332"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [5253, 4253], rows: [
        new TableRow({ children: [hc("\u30B5\u30FC\u30D3\u30B9\u540D", 5253), hc("\u6599\u91D1", 4253)] }),
        new TableRow({ children: [tc("\u7573\u306E\u8868\u66FF\u3048", 5253), tc("\u7A0E\u8FBC9,900\u5186\uFF5E", 4253)] }),
        new TableRow({ children: [tc("\u7573\u306E\u88CF\u8FD4\u3057", 5253), tc("\u7A0E\u8FBC5,500\u5186\uFF5E", 4253)] }),
        new TableRow({ children: [tc("\u65B0\u7573", 5253), tc("\u7A0E\u8FBC18,700\u5186\uFF5E", 4253)] }),
        new TableRow({ children: [tc("\u30AB\u30E9\u30FC\u7573\uFF08\u30C0\u30A4\u30B1\u30F3\u30FB\u30BB\u30AD\u30B9\u30A4\uFF09", 5253), tc("\u8981\u898B\u7A4D\u3082\u308A", 4253)] }),
        new TableRow({ children: [tc("\u5BB6\u5177\u79FB\u52D5\u7121\u6599 / \u7121\u6599\u304A\u898B\u7A4D\u3082\u308A", 5253), tc("\u2014", 4253)] }),
      ]}),
      h2("1-3. \u30D3\u30B8\u30CD\u30B9\u306E\u8AAC\u660E\u6587"),
      quote("\u9577\u5D0E\u5E02\u7B51\u5F8C\u753A\u306E\u7573\u5C02\u9580\u5E97\u3002\u7573\u306E\u8868\u66FF\u3048\u30FB\u88CF\u8FD4\u3057\u30FB\u65B0\u7573\u307E\u3067\u3001\u5BB6\u5177\u306E\u79FB\u52D5\u3082\u7121\u6599\u3067\u304A\u4F3A\u3044\u3057\u307E\u3059\u3002\u30C0\u30A4\u30B1\u30F3\u30FB\u30BB\u30AD\u30B9\u30A4\u306E\u30AB\u30E9\u30FC\u7573\u3082\u8C4A\u5BCC\u306B\u53D6\u308A\u63C3\u3048\u3002LINE\u3067\u304A\u6C17\u8EFD\u306B\u304A\u898B\u7A4D\u3082\u308A\u3044\u305F\u3060\u3051\u307E\u3059\u3002\u9577\u5D0E\u5E02\u30FB\u6642\u6D25\u753A\u30FB\u9577\u4E0E\u753A\u5BFE\u5FDC\u3002", "C9A84C"),
      h2("1-4. \u30AB\u30C6\u30B4\u30EA"),
      bl("\u30E1\u30A4\u30F3\uFF1A\u7573\u5E97"), bl("\u30B5\u30D6\uFF1A\u30EA\u30D5\u30A9\u30FC\u30E0\u696D\u3001\u5185\u88C5\u696D"),
      PB,

      h1("Phase 2\uFF1A\u5199\u771F\u306E\u5145\u5B9F\uFF082\uFF5E4\u9031\u9593\uFF09"),
      pb("\u76EE\u6A19\uFF1A", "\u6700\u4F4E25\u679A\u3002Google\u306F\u5199\u771F\u304C\u591A\u3044\u30D3\u30B8\u30CD\u30B9\u307B\u3069\u4E0A\u4F4D\u8868\u793A\u3059\u308B\u50BE\u5411\u304C\u3042\u308A\u307E\u3059\u3002"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [1800, 1200, 6506], rows: [
        new TableRow({ children: [hc("\u30AB\u30C6\u30B4\u30EA", 1800), hc("\u76EE\u6A19", 1200), hc("\u5185\u5BB9\u30FB\u64AE\u5F71\u306E\u30B3\u30C4", 6506)] }),
        new TableRow({ children: [tc("\u5E97\u8217\u5916\u89B3", 1800), tc("3\u679A", 1200), tc("\u770B\u677F\u304C\u898B\u3048\u308B\u89D2\u5EA6\u3002\u6674\u308C\u305F\u65E5\u306E\u65E5\u4E2D\u306B\u64AE\u5F71", 6506)] }),
        new TableRow({ children: [tc("\u4F5C\u696D\u98A8\u666F", 1800), tc("5\u679A", 1200), tc("\u624B\u5143\u4E2D\u5FC3\uFF08\u9854NG\uFF09\u3002\u81EA\u7136\u5149\u306E\u660E\u308B\u3044\u74B0\u5883\u3067", 6506)] }),
        new TableRow({ children: [tc("\u65BD\u5DE5\u4E8B\u4F8B", 1800), tc("10\u679A+", 1200), tc("\u30D3\u30D5\u30A9\u30FC\u30A2\u30D5\u30BF\u30FC\u3001\u30AB\u30E9\u30FC\u7573\u3001\u548C\u30E2\u30C0\u30F3\u3002\u5E83\u89D2\u3067\u90E8\u5C4B\u5168\u4F53\u3092", 6506)] }),
        new TableRow({ children: [tc("\u5546\u54C1", 1800), tc("5\u679A", 1200), tc("\u3044\u8349\u30B0\u30C3\u30BA\u3001\u30B5\u30F3\u30D7\u30EB\u5E33\u3001UV\u30D7\u30EA\u30F3\u30C8\u7573", 6506)] }),
        new TableRow({ children: [tc("\u30B9\u30BF\u30C3\u30D5", 1800), tc("2\u679A", 1200), tc("\u4F5C\u696D\u4E2D\u306E\u624B\u5143\u30A2\u30C3\u30D7\u3002\u9053\u5177\u3092\u6301\u3063\u3066\u3044\u308B\u624B", 6506)] }),
      ]}),
      nl("\u7BA1\u7406\u753B\u9762\u2192\u300C\u5199\u771F\u300D\u2192\u300C\u5199\u771F\u3092\u8FFD\u52A0\u300D"), nl("\u30AB\u30C6\u30B4\u30EA\u9078\u629E\u2192\u9AD8\u753B\u8CEA\uFF081200px\u4EE5\u4E0A\uFF09\u3067\u30A2\u30C3\u30D7"), nl("\u90311\uFF5E2\u679A\u30DA\u30FC\u30B9\u3067\u7D99\u7D9A\u8FFD\u52A0"),
      PB,

      h1("Phase 3\uFF1A\u30AF\u30C1\u30B3\u30DF\u6226\u7565"),
      pb("\u76EE\u6A19\uFF1A", "\u307E\u305A10\u4EF6 \u2192 30\u4EF6\u3067\u5730\u57DF\u30C8\u30C3\u30D7\u30AF\u30E9\u30B9"),
      h2("\u4F9D\u983C\u306E\u4ED5\u7D44\u307F"),
      bl("\u65BD\u5DE5\u5B8C\u4E86\u6642\u306B\u4E00\u58F0\u304B\u3051\u308B"), bl("QR\u30B3\u30FC\u30C9\u3092\u540D\u523A\u30FB\u30C1\u30E9\u30B7\u306B\u63B2\u8F09"), bl("LINE\u3067\u30AF\u30C1\u30B3\u30DF\u30EA\u30F3\u30AF\u3092\u9001\u308B"),
      h2("QR\u30B3\u30FC\u30C9\u4F5C\u6210"),
      nl("\u7BA1\u7406\u753B\u9762\u2192\u300C\u30AF\u30C1\u30B3\u30DF\u3092\u4F9D\u983C\u300D\u2192\u30EA\u30F3\u30AF\u30B3\u30D4\u30FC"), nl("QR\u30B3\u30FC\u30C9\u751F\u6210\u30B5\u30A4\u30C8\u3067QR\u4F5C\u6210"), nl("\u540D\u523A\u3084\u30C1\u30E9\u30B7\u306B\u914D\u7F6E"),
      h2("\u8FD4\u4FE1\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8"),
      h3("\u26055"),
      quote("\u25CB\u25CB\u69D8\u3001\u5B09\u3057\u3044\u30AF\u30C1\u30B3\u30DF\u3092\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\uFF01\u25CB\u25CB\u306B\u3054\u6E80\u8DB3\u3044\u305F\u3060\u3051\u3066\u5927\u5909\u5B09\u3057\u304F\u601D\u3044\u307E\u3059\u3002\u4ECA\u5F8C\u3082\u304A\u6C17\u8EFD\u306B\u3054\u76F8\u8AC7\u304F\u3060\u3055\u3044\u3002", "4CAF50"),
      h3("\u26053\uFF5E4"),
      quote("\u25CB\u25CB\u69D8\u3001\u8CB4\u91CD\u306A\u3054\u610F\u898B\u3092\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002\u4ECA\u5F8C\u6539\u5584\u3057\u3066\u307E\u3044\u308A\u307E\u3059\u3002095-823-1905\u307E\u3067\u304A\u6C17\u8EFD\u306B\u3002", "FF9800"),
      h3("\u26051\uFF5E2"),
      quote("\u25CB\u25CB\u69D8\u3001\u7533\u3057\u8A33\u3054\u3056\u3044\u307E\u305B\u3093\u3002\u8A73\u3057\u3044\u304A\u8A71\u3092\u304A\u805E\u304B\u305B\u3044\u305F\u3060\u3051\u308C\u3070\u6539\u5584\u306B\u52AA\u3081\u307E\u3059\u3002095-823-1905\u307E\u3067\u3002", "F44336"),
      PB,

      h1("Phase 4\uFF1A\u5B9A\u671F\u6295\u7A3F\uFF08\u90311\u56DE\uFF09"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [2200, 1500, 5806], rows: [
        new TableRow({ children: [hc("\u7A2E\u985E", 2200), hc("\u983B\u5EA6", 1500), hc("\u5185\u5BB9", 5806)] }),
        new TableRow({ children: [tc("\u6700\u65B0\u60C5\u5831", 2200), tc("\u90311\u56DE", 1500), tc("\u30B3\u30E9\u30E0\u8A18\u4E8B\u3001\u65BD\u5DE5\u4E8B\u4F8B\u3001\u5B63\u7BC0\u306E\u304A\u77E5\u3089\u305B", 5806)] }),
        new TableRow({ children: [tc("\u7279\u5178", 2200), tc("\u67081\u56DE", 1500), tc("LINE\u767B\u9332\u3067\u7121\u6599\u898B\u7A4D\u3082\u308A\u3001\u30AD\u30E3\u30F3\u30DA\u30FC\u30F3", 5806)] }),
        new TableRow({ children: [tc("\u30A4\u30D9\u30F3\u30C8", 2200), tc("\u5FC5\u8981\u6642", 1500), tc("\u671F\u9593\u9650\u5B9A\u30AD\u30E3\u30F3\u30DA\u30FC\u30F3\u3001\u304A\u76C6\u30FB\u5E74\u672B\u5E74\u59CB", 5806)] }),
      ]}),
      h2("\u6708\u9593\u30AB\u30EC\u30F3\u30C0\u30FC"),
      h3("\u7B2C1\u9031\uFF1A\u65BD\u5DE5\u4E8B\u4F8B"), bl("\u300C\u3010\u65BD\u5DE5\u4E8B\u4F8B\u3011\u30C0\u30A4\u30B1\u30F3\u6E05\u6D41\u3067\u548C\u30E2\u30C0\u30F3\u306A\u7A7A\u9593\u306B\u300D\u2192 works.html"),
      h3("\u7B2C2\u9031\uFF1A\u30B3\u30E9\u30E0"), bl("\u300C\u7573\u306E\u5F35\u66FF\u3048\u6642\u671F\u3001\u898B\u9003\u3057\u3066\u3044\u307E\u305B\u3093\u304B\uFF1F\u300D\u2192 \u30D6\u30ED\u30B0\u8A18\u4E8B"),
      h3("\u7B2C3\u9031\uFF1A\u5B63\u7BC0"), bl("\u6885\u96E8\u524D\uFF1A\u300C\u6885\u96E8\u524D\u306E\u7573\u66FF\u3048\u304C\u304A\u3059\u3059\u3081\u300D\u2192 contact.html"),
      h3("\u7B2C4\u9031\uFF1ALINE"), bl("\u300CLINE\u3067\u7C21\u5358\u304A\u898B\u7A4D\u3082\u308A\uFF01\u300D\u2192 line-lp.html"),
      h2("\u6295\u7A3F\u624B\u9806"),
      nl("\u7BA1\u7406\u753B\u9762\u2192\u300C\u6295\u7A3F\u300D\u2192\u300C\u6295\u7A3F\u3092\u4F5C\u6210\u300D"), nl("\u5199\u771F1\u679A\u9078\u629E\uFF08640\u00D7480px\u4EE5\u4E0A\uFF09"), nl("\u30C6\u30AD\u30B9\u30C8100\uFF5E300\u6587\u5B57\u3002KW\u3092\u81EA\u7136\u306B\u542B\u3081\u308B"), nl("\u30DC\u30BF\u30F3\u8FFD\u52A0\u2192URL\u8A2D\u5B9A\u2192\u6295\u7A3F"),
      PB,

      h1("Phase 5\uFF1A\u30ED\u30FC\u30AB\u30EBSEO\u30AD\u30FC\u30EF\u30FC\u30C9"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [1800, 4353, 3353], rows: [
        new TableRow({ children: [hc("\u512A\u5148\u5EA6", 1800), hc("\u30AD\u30FC\u30EF\u30FC\u30C9", 4353), hc("\u691C\u7D22\u610F\u56F3", 3353)] }),
        new TableRow({ children: [tc("\u6700\u91CD\u8981", 1800, { fill: "FFF3E0" }), tc("\u9577\u5D0E \u7573 \u5F35\u66FF\u3048", 4353), tc("\u76F4\u63A5\u30CB\u30FC\u30BA", 3353)] }),
        new TableRow({ children: [tc("\u6700\u91CD\u8981", 1800, { fill: "FFF3E0" }), tc("\u9577\u5D0E\u5E02 \u7573\u5C4B", 4353), tc("\u304A\u5E97\u63A2\u3057", 3353)] }),
        new TableRow({ children: [tc("\u6700\u91CD\u8981", 1800, { fill: "FFF3E0" }), tc("\u7573 \u8868\u66FF\u3048 \u9577\u5D0E", 4353), tc("\u30B5\u30FC\u30D3\u30B9\u691C\u7D22", 3353)] }),
        new TableRow({ children: [tc("\u91CD\u8981", 1800), tc("\u7573 \u30AB\u30E9\u30FC \u9577\u5D0E / \u7573 \u6599\u91D1 \u9577\u5D0E", 4353), tc("\u3053\u3060\u308F\u308A/\u6BD4\u8F03", 3353)] }),
        new TableRow({ children: [tc("\u30CB\u30C3\u30C1", 1800), tc("\u9577\u5D0E \u7573 \u5BB6\u5177\u79FB\u52D5 \u7121\u6599 / \u6642\u6D25\u753A \u7573", 4353), tc("\u5DEE\u5225\u5316/\u5730\u57DF", 3353)] }),
      ]}),
      bl("\u30D3\u30B8\u30CD\u30B9\u8AAC\u660E\u6587\u306B\u542B\u3081\u308B"), bl("\u6295\u7A3F\u30C6\u30AD\u30B9\u30C8\u306B\u81EA\u7136\u306B\u542B\u3081\u308B"), bl("\u30AF\u30C1\u30B3\u30DF\u8FD4\u4FE1\u306B\u3055\u308A\u3052\u306A\u304F\u542B\u3081\u308B"), bl("\u30B3\u30E9\u30E0\u8A18\u4E8B\u3067\u5BFE\u7B56"),
      PB,

      h1("\u52B9\u679C\u6E2C\u5B9A\uFF08\u67081\u56DE\uFF09"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [2800, 3353, 3353], rows: [
        new TableRow({ children: [hc("\u6307\u6A19", 2800), hc("\u78BA\u8A8D\u5834\u6240", 3353), hc("\u76EE\u6A19", 3353)] }),
        new TableRow({ children: [tc("\u30DE\u30C3\u30D7\u8868\u793A\u56DE\u6570", 2800), tc("\u30A4\u30F3\u30B5\u30A4\u30C8", 3353), tc("\u6708\u9593500\u56DE\u4EE5\u4E0A", 3353)] }),
        new TableRow({ children: [tc("\u30B5\u30A4\u30C8\u30AF\u30EA\u30C3\u30AF", 2800), tc("\u30A4\u30F3\u30B5\u30A4\u30C8+GA4", 3353), tc("\u6708\u959350\u30AF\u30EA\u30C3\u30AF\u4EE5\u4E0A", 3353)] }),
        new TableRow({ children: [tc("\u96FB\u8A71\u30BF\u30C3\u30D7", 2800), tc("\u30A4\u30F3\u30B5\u30A4\u30C8", 3353), tc("\u6708\u959310\u56DE\u4EE5\u4E0A", 3353)] }),
        new TableRow({ children: [tc("\u30AF\u30C1\u30B3\u30DF\u6570", 2800), tc("Google\u30DE\u30C3\u30D7", 3353), tc("3\u30F6\u6708\u301010\u4EF6", 3353)] }),
      ]}),
      PB,

      h1("\u4ED8\u9332\uFF1A\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB\u8868"),
      h2("\u6700\u521D\u306E1\u30F6\u6708"),
      new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [1300, 5206, 3000], rows: [
        new TableRow({ children: [hc("\u9031", 1300), hc("\u4F5C\u696D", 5206), hc("\u62C5\u5F53", 3000)] }),
        new TableRow({ children: [tc("W1", 1300, { r: { bold: true } }), tc("\u30AA\u30FC\u30CA\u30FC\u78BA\u8A8D\u30FB\u7BA1\u7406\u8005\u8FFD\u52A0\u30FB\u57FA\u672C\u60C5\u5831", 5206), tc("\u5927\u6D5C\u3055\u3093+\u65B0\u57A3\u3055\u3093", 3000)] }),
        new TableRow({ children: [tc("W2", 1300, { r: { bold: true } }), tc("\u5199\u771F10\u679A\u30A2\u30C3\u30D7\u30FB\u521D\u56DE\u6295\u7A3F", 5206), tc("\u65B0\u57A3\u3055\u3093", 3000)] }),
        new TableRow({ children: [tc("W3", 1300, { r: { bold: true } }), tc("\u30AF\u30C1\u30B3\u30DFQR\u4F5C\u6210\u30FB\u5199\u771F5\u679A\u8FFD\u52A0", 5206), tc("\u65B0\u57A3\u3055\u3093", 3000)] }),
        new TableRow({ children: [tc("W4", 1300, { r: { bold: true } }), tc("\u6295\u7A3F2\u56DE\u76EE\u30FB\u30AF\u30C1\u30B3\u30DF\u4F9D\u983C\u958B\u59CB", 5206), tc("\u65B0\u57A3\u3055\u3093+\u5927\u6D5C\u3055\u3093", 3000)] }),
      ]}),
      h2("2\uFF5E3\u30F6\u6708\u76EE"),
      bl("\u90311\u6295\u7A3F\u7D99\u7D9A"), bl("\u5199\u771F\u90311\uFF5E2\u679A\u8FFD\u52A0\uFF08\u5408\u8A0825\u679A\u76EE\u6A19\uFF09"), bl("\u30AF\u30C1\u30B3\u30DF10\u4EF6\u76EE\u6A19"), bl("\u67081\u56DE\u52B9\u679C\u6E2C\u5B9A"),
      h2("4\u30F6\u6708\u76EE\u4EE5\u964D"),
      bl("\u6295\u7A3F\u30FB\u30AF\u30C1\u30B3\u30DF\u8FD4\u4FE1\u306E\u30EB\u30FC\u30C6\u30A3\u30F3\u5316"), bl("\u52B9\u679C\u6E2C\u5B9A\u306B\u57FA\u3065\u304F\u6539\u5584"), bl("\u5B63\u7BC0\u30AD\u30E3\u30F3\u30DA\u30FC\u30F3\u6295\u7A3F"),
    ]
  }]
});

Packer.toBuffer(doc).then(b => {
  const out = process.argv[2] || "meo-strategy.docx";
  fs.writeFileSync(out, b);
  console.log("Created: " + out + " (" + b.length + " bytes)");
});

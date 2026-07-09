import { useState, useEffect, useRef } from "react";

const C = {
  main: "#556B2F", mainL: "#6B8A3E", accent: "#C9A84C",
  bg: "#FAF8F5", bgAlt: "#F0EDE6", tx: "#333", txL: "#666",
  w: "#FFF", line: "#06C755",
};

const GRADES = {
  omotegae: [
    { id: "jokyu", label: "上級品", price: 18000 },
    { id: "osusume", label: "おすすめ", price: 12000, rec: true },
    { id: "otegoro", label: "お手頃", price: 9000 },
  ],
  shintatami: [
    { id: "jokyu", label: "上級品", price: 25000 },
    { id: "osusume", label: "おすすめ", price: 19000, rec: true },
    { id: "otegoro", label: "お手頃", price: 16000 },
  ],
};

const ROOMS = [
  { l: "3", m: 3 }, { l: "4.5", m: 5 }, { l: "6", m: 6 },
  { l: "8", m: 8 }, { l: "10", m: 10 }, { l: "12", m: 12 },
];

const URA = 5000;
const BOCHU = 800;
const SHOBUN = 2500;
const fmt = n => n.toLocaleString("ja-JP");

export default function Sim() {
  const [type, setType] = useState(null);
  const [grade, setGrade] = useState(null);
  const [room, setRoom] = useState(null);
  const [bochu, setBochu] = useState(false);
  const [shobun, setShobun] = useState(false);
  const [show, setShow] = useState(false);
  const resRef = useRef(null);

  useEffect(() => { setGrade(null); setShobun(false); if (type === "ura") setBochu(false); }, [type]);

  const ready = type && room && (type === "ura" || grade);
  const rm = ROOMS.find(r => r.l === room);
  const mats = rm ? rm.m : 0;

  let unit = 0, gLabel = "";
  if (type === "ura") { unit = URA; gLabel = ""; }
  else if (grade && GRADES[type]) {
    const g = GRADES[type].find(x => x.id === grade);
    if (g) { unit = g.price; gLabel = g.label; }
  }
  const bTotal = bochu ? BOCHU * mats : 0;
  const sTotal = shobun && type === "shintatami" ? SHOBUN * mats : 0;
  const total = unit * mats + bTotal + sTotal;

  useEffect(() => {
    if (ready) {
      setShow(false);
      const t = setTimeout(() => {
        setShow(true);
        setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
      }, 50);
      return () => clearTimeout(t);
    } else { setShow(false); }
  }, [ready, type, grade, room, bochu, shobun]);

  const needGrade = type && type !== "ura";
  const grades = GRADES[type] || [];

  return (
    <div style={{ fontFamily: "'Noto Sans JP',sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        .chip { transition: all 0.15s; }
        .chip:active { transform: scale(0.96); }
      `}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg,${C.main},#3D5222)`, padding: "28px 20px 24px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 30% 40%,rgba(107,138,62,0.3),transparent 60%)",
        }} />
        <h1 style={{
          fontFamily: "'Noto Serif JP',serif", fontSize: "1.3rem", fontWeight: 700,
          color: C.w, letterSpacing: "0.1em", margin: 0, position: "relative",
        }}>概算見積り</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.75rem", marginTop: 4, position: "relative" }}>
          3ステップで概算費用がわかります
        </p>
      </div>

      <div style={{ padding: "16px 16px 100px" }}>

        {/* Step 1 */}
        <Section n="1" title="工事の種類">
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { id: "ura", label: "裏返し", sub: "〜7年" },
              { id: "omotegae", label: "表替え", sub: "7年〜" },
              { id: "shintatami", label: "新畳", sub: "凹み等" },
            ].map(t => (
              <Chip key={t.id} active={type === t.id} onClick={() => setType(t.id)}
                label={t.label} sub={t.sub} />
            ))}
          </div>
        </Section>

        {/* Step 2 */}
        {needGrade && (
          <div style={{ animation: "fadeUp 0.25s ease" }}>
            <Section n="2" title="グレード">
              <div style={{ display: "flex", gap: 6 }}>
                {grades.map(g => (
                  <GradeChip key={g.id} g={g} active={grade === g.id} onClick={() => setGrade(g.id)} />
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Step 2/3: Room */}
        <Section n={needGrade ? "3" : "2"} title="お部屋の広さ">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {ROOMS.map(r => (
              <div key={r.l} className="chip" onClick={() => setRoom(r.l)} style={{
                flex: "1 1 0", minWidth: 52, padding: "10px 0", textAlign: "center",
                borderRadius: 8, fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                border: room === r.l ? `2px solid ${C.main}` : "2px solid #e0ddd6",
                background: room === r.l ? "rgba(85,107,47,0.07)" : C.w,
                color: room === r.l ? C.main : C.tx,
              }}>{r.l}<span style={{ fontSize: "0.7rem", fontWeight: 500 }}>畳</span></div>
            ))}
          </div>
        </Section>

        {/* Options */}
        {needGrade && (
          <div style={{
            background: C.w, borderRadius: 12, padding: "14px 16px", marginBottom: 14,
            border: "1px solid rgba(0,0,0,0.04)",
          }}>
            <Opt checked={bochu} onChange={setBochu} label="防虫・防カビシート" price={`+${fmt(BOCHU)}円/畳`} />
            {type === "shintatami" && (
              <Opt checked={shobun} onChange={setShobun} label="古畳の処分" price={`+${fmt(SHOBUN)}円/枚`} />
            )}
          </div>
        )}

        {/* Result */}
        <div ref={resRef} style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: show ? "auto" : "none",
          marginTop: 4,
        }}>
          {ready && (
            <div style={{
              background: C.w, borderRadius: 14, overflow: "hidden",
              boxShadow: "0 2px 16px rgba(85,107,47,0.08)",
              border: `1px solid rgba(85,107,47,0.12)`,
            }}>
              {/* Summary row */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 18px", fontSize: "0.8rem", color: C.txL, borderBottom: `1px solid ${C.bgAlt}`,
              }}>
                <span>{type === "ura" ? "裏返し" : type === "omotegae" ? "表替え" : "新畳"}
                  {gLabel && ` / ${gLabel}`}</span>
                <span>{fmt(unit)}円 × {mats}枚</span>
              </div>

              {/* Options detail */}
              {(bTotal > 0 || sTotal > 0) && (
                <div style={{ padding: "8px 18px", fontSize: "0.78rem", color: C.txL, borderBottom: `1px solid ${C.bgAlt}` }}>
                  {bTotal > 0 && <div>防虫シート：+{fmt(bTotal)}円</div>}
                  {sTotal > 0 && <div>処分費：+{fmt(sTotal)}円</div>}
                </div>
              )}

              {/* Total */}
              <div style={{
                background: `linear-gradient(135deg,${C.main},${C.mainL})`,
                padding: "18px", textAlign: "center",
              }}>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>
                  概算合計（税込）
                </div>
                <div style={{
                  fontFamily: "'Noto Serif JP',serif", fontSize: "1.8rem", fontWeight: 700,
                  color: C.w, letterSpacing: "0.02em",
                  animation: "pulse 0.5s ease",
                }}>
                  {fmt(total)}<span style={{ fontSize: "0.9rem", fontWeight: 500 }}>円</span>
                </div>
              </div>

              {/* Note */}
              <div style={{ padding: "12px 18px", fontSize: "0.7rem", color: C.txL, lineHeight: 1.7, background: C.bg }}>
                ※目安です。正確な金額はお見積もりにてご案内します。<br />
                ※半畳は1枚分として計算しています。
              </div>

              {/* CTA */}
              <div style={{ padding: "0 16px 16px", display: "flex", gap: 8 }}>
                <a href="tel:095-823-1905" style={{
                  flex: 1, padding: "12px 0", borderRadius: 8, textAlign: "center",
                  background: C.main, color: C.w, fontWeight: 700, fontSize: "0.82rem",
                  textDecoration: "none",
                }}>📞 電話する</a>
                <a href="https://lin.ee/qy8UCpf" style={{
                  flex: 1, padding: "12px 0", borderRadius: 8, textAlign: "center",
                  background: C.line, color: C.w, fontWeight: 700, fontSize: "0.82rem",
                  textDecoration: "none",
                }}>💬 LINE見積り</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Components ──

function Section({ n, title, children }) {
  return (
    <div style={{
      background: C.w, borderRadius: 12, padding: "16px", marginBottom: 14,
      boxShadow: "0 1px 4px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.04)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
        fontFamily: "'Noto Serif JP',serif", fontSize: "0.92rem", fontWeight: 700, color: C.tx,
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: 6, background: C.main, color: C.w,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.72rem", fontWeight: 700, fontFamily: "'Noto Sans JP',sans-serif",
        }}>{n}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, label, sub }) {
  return (
    <div className="chip" onClick={onClick} style={{
      flex: "1 1 0", padding: "12px 4px", textAlign: "center", borderRadius: 10, cursor: "pointer",
      border: active ? `2px solid ${C.main}` : "2px solid #e0ddd6",
      background: active ? "rgba(85,107,47,0.07)" : C.w,
    }}>
      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: active ? C.main : C.tx }}>{label}</div>
      <div style={{ fontSize: "0.65rem", color: C.txL, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function GradeChip({ g, active, onClick }) {
  return (
    <div className="chip" onClick={onClick} style={{
      flex: "1 1 0", padding: "10px 4px", textAlign: "center", borderRadius: 10, cursor: "pointer",
      border: active ? `2px solid ${C.main}` : g.rec ? `2px solid ${C.accent}` : "2px solid #e0ddd6",
      background: active ? "rgba(85,107,47,0.07)" : C.w, position: "relative",
    }}>
      {g.rec && (
        <div style={{
          position: "absolute", top: -7, left: "50%", transform: "translateX(-50%)",
          background: C.accent, color: C.w, fontSize: "0.58rem", fontWeight: 700,
          padding: "1px 6px", borderRadius: 100, whiteSpace: "nowrap",
        }}>人気</div>
      )}
      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: active ? C.main : C.tx }}>{g.label}</div>
      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: C.main, marginTop: 2 }}>
        {fmt(g.price)}<span style={{ fontSize: "0.62rem", fontWeight: 500, color: C.txL }}>円〜</span>
      </div>
    </div>
  );
}

function Opt({ checked, onChange, label, price }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 8, padding: "8px 0", cursor: "pointer",
      fontSize: "0.82rem", color: C.tx,
    }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ width: 18, height: 18, accentColor: C.main, flexShrink: 0 }} />
      <span>{label}</span>
      <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: C.main, fontWeight: 700, whiteSpace: "nowrap" }}>{price}</span>
    </label>
  );
}

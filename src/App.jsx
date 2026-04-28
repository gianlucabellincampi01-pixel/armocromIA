import { useState, useEffect } from "react";

const GOLD = "#C9A96E";
const IVORY = "#1C1814";
const DARK = "#0D0B09";
const TEXT = "#F0EAE0";
const TAUPE = "#C4AA88";
const WHITE = "#252018";

const seasons = {
  autumnSoft: {
    name: "Autumn Soft",
    undertone: "Warm",
    contrast: "Low-Medium",
    saturation: "Muted",
    descriptor: "Warm, muted, and sophisticated",
    colors: {
      neutrals: [
        { hex: "#F5F0E8", name: "Ivory" },
        { hex: "#D4C4B0", name: "Camel" },
        { hex: "#A89880", name: "Warm Gray" },
        { hex: "#5C4A3A", name: "Chocolate" },
      ],
      core: [
        { hex: "#C97B5A", name: "Terracotta" },
        { hex: "#8B956D", name: "Olive Green" },
        { hex: "#D4A55A", name: "Mustard" },
        { hex: "#B86A4A", name: "Rust" },
      ],
      accents: [
        { hex: "#8B3A3A", name: "Burgundy" },
        { hex: "#4A7B7B", name: "Teal" },
        { hex: "#D4B85A", name: "Golden Yellow" },
        { hex: "#C07840", name: "Warm Amber" },
      ],
      metals: [
        { hex: "#C9A96E", name: "Gold" },
        { hex: "#B8956A", name: "Bronze" },
      ],
    },
    palette12: [
      "#F5F0E8","#D4C4B0","#A89880","#5C4A3A",
      "#C97B5A","#8B956D","#D4A55A","#B86A4A",
      "#8B3A3A","#4A7B7B","#C9A96E","#B8956A",
    ],
  },
};

const products = [
  { id: 1, name: "Ivory Silk Blouse", category: "Clothing", color: "#F5F0E8", image: "/camicia.jpg", price: "â‚¬450", location: "Ground Floor â€” Ready-to-Wear", perfectMatch: true },
  { id: 2, name: "Cognac Leather Bag", category: "Bags", color: "#C97B5A", image: "/borsa.jpg", price: "â‚¬1.290", location: "Ground Floor â€” Leather Goods", perfectMatch: true },
  { id: 3, name: "Camel Wool Coat", category: "Clothing", color: "#D4C4B0", image: "/giacca.jpg", price: "â‚¬1.950", location: "Ground Floor â€” Ready-to-Wear", perfectMatch: false },
  { id: 4, name: "Gold-Tone Scarf", category: "Accessories", color: "#C9A96E", image: "/sciarpa.jpg", price: "â‚¬320", location: "First Floor â€” Accessories", perfectMatch: true },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', system-ui, sans-serif; background: ${IVORY}; }
  .pf { font-family: 'Playfair Display', Georgia, serif; }
  .cg { font-family: 'Cormorant Garamond', Georgia, serif; }
  @keyframes scan {
    0% { top: 10%; } 50% { top: 80%; } 100% { top: 10%; }
  }
  @keyframes pulse-ring {
    0% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.03); }
    100% { opacity: 0.6; transform: scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes spin-ring {
    from { stroke-dashoffset: 283; } to { stroke-dashoffset: 0; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes checkmark {
    from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; }
  }
  .fade-up { animation: fadeUp 0.4s ease forwards; }
  .fade-in { animation: fadeIn 0.5s ease forwards; }
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    animation: scan 2s ease-in-out infinite;
    pointer-events: none;
  }
  .pulse { animation: pulse-ring 2s ease-in-out infinite; }
  .gold-progress { animation: spin-ring 7s linear forwards; }
  .swatch:hover { transform: scale(1.07); border: 1.5px solid ${GOLD} !important; }
  .product-card:hover { box-shadow: 0 2px 12px rgba(201,169,110,0.18); border-color: ${GOLD} !important; }
  .step-btn { cursor: pointer; border: none; transition: all 0.25s ease; }
  .step-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .tab-btn { cursor: pointer; border: none; transition: all 0.25s ease; background: transparent; }
  .tab-btn:hover { background: rgba(201,169,110,0.08); }
  .metric-item { opacity: 0; }
  .metric-item.visible { animation: fadeUp 0.4s ease forwards; opacity: 1; }
  ::-webkit-scrollbar { width: 6px; } 
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}55; border-radius: 3px; }
  .season-card:hover { border-color: ${GOLD} !important; transform: translateY(-2px); transition: all 0.2s ease; }
  .floor-zone { cursor: pointer; transition: all 0.2s; }
  .floor-zone:hover rect, .floor-zone.active rect { fill: rgba(201,169,110,0.18); stroke: ${GOLD}; }
`;

function GoldButton({ children, onClick, outline = false, style = {} }) {
  return (
    <button
      className="step-btn"
      onClick={onClick}
      style={{
        padding: "14px 36px",
        background: outline ? "transparent" : GOLD,
        color: outline ? GOLD : WHITE,
        border: `1.5px solid ${GOLD}`,
        borderRadius: "2px",
        fontSize: "13px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        fontFamily: "'Inter', system-ui",
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* â”€â”€ KIOSK STEPS â”€â”€ */

function Step1({ next }) {
  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "11px", letterSpacing: "4px", color: GOLD, marginBottom: 40, fontWeight: 500 }}>FERRAGAMO</div>
      <div style={{ marginBottom: 32 }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
            <ellipse key={i} cx="60" cy="60" rx={8 + i * 3.5} ry="3" fill="none" stroke={GOLD} strokeWidth="0.8" strokeOpacity={0.15 + i * 0.06} transform={`rotate(${a} 60 60)`} />
          ))}
          <circle cx="60" cy="60" r="20" fill={GOLD} fillOpacity="0.12" />
          <circle cx="60" cy="60" r="10" fill={GOLD} fillOpacity="0.25" />
          <circle cx="60" cy="60" r="4" fill={GOLD} />
        </svg>
      </div>
      <h1 className="pf" style={{ fontSize: "38px", fontWeight: 400, color: TEXT, marginBottom: 16, lineHeight: 1.2 }}>Discover Your Colors</h1>
      <p style={{ fontSize: "15px", color: TAUPE, lineHeight: 1.7, maxWidth: 320, marginBottom: 40 }}>An AI-powered color analysis to reveal your perfect palette</p>
      <GoldButton onClick={next}>Begin Analysis</GoldButton>
      <p style={{ fontSize: "11px", color: TAUPE, marginTop: 20, letterSpacing: "0.5px" }}>Takes 2 minutes · Private & confidential</p>
    </div>
  );
}

function Step2({ next }) {
  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 40px", textAlign: "center", background: DARK }}>
      <h2 className="pf" style={{ fontSize: "30px", color: TEXT, fontWeight: 400, marginBottom: 12 }}>Position Yourself</h2>
      <p style={{ fontSize: "13px", color: "#aaa", maxWidth: 300, lineHeight: 1.7, marginBottom: 36 }}>Sit comfortably and look at the mirror. We'll analyze your natural tones.</p>
      <div className="pulse" style={{ position: "relative", width: 180, height: 220, marginBottom: 40 }}>
        <svg width="180" height="220" viewBox="0 0 180 220" style={{ position: "absolute", top: 0, left: 0 }}>
          <circle cx="90" cy="100" r="85" fill="none" stroke={GOLD} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
          <ellipse cx="90" cy="80" rx="36" ry="44" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.6" />
          <circle cx="90" cy="80" r="5" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5" />
          <line x1="90" y1="124" x2="90" y2="148" stroke={GOLD} strokeWidth="1" opacity="0.4" />
          <line x1="62" y1="148" x2="118" y2="148" stroke={GOLD} strokeWidth="1" opacity="0.4" />
          {[30, 90, 150, 210, 270, 330].map((a, i) => {
            const r = 85, x = 90 + r * Math.cos(a * Math.PI / 180), y = 100 + r * Math.sin(a * Math.PI / 180);
            return <circle key={i} cx={x} cy={y} r="2.5" fill={GOLD} opacity="0.5" />;
          })}
        </svg>
      </div>
      <GoldButton onClick={next}>I'm Ready</GoldButton>
    </div>
  );
}

function Step3({ next }) {
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState([false, false, false, false]);
  const metricLabels = ["Skin undertone detection", "Eye color intensity", "Hair tone analysis", "Natural contrast mapping"];

  useEffect(() => {
    const delays = [1000, 2500, 4000, 5500];
    const timers = delays.map((d, i) => setTimeout(() => {
      setMetrics(prev => { const n = [...prev]; n[i] = true; return n; });
    }, d));
    const prog = setInterval(() => setProgress(p => Math.min(p + 1, 100)), 70);
    const adv = setTimeout(next, 7500);
    return () => { timers.forEach(clearTimeout); clearInterval(prog); clearTimeout(adv); };
  }, []);

  const r = 70, circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 32px", background: DARK, textAlign: "center" }}>
      <h2 className="pf" style={{ fontSize: "26px", color: WHITE, fontWeight: 400, marginBottom: 8 }}>Analyzing Your Tones</h2>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: 32 }}>Calibrating to your unique features...</p>
      <div style={{ position: "relative", width: 160, height: 160, marginBottom: 28 }}>
        <svg width="160" height="160" style={{ position: "absolute", top: 0, left: 0 }} viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={r} fill="none" stroke="#333" strokeWidth="2" />
          <circle cx="80" cy="80" r={r} fill="none" stroke={GOLD} strokeWidth="2"
            strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 80 80)" style={{ transition: "stroke-dashoffset 0.1s linear" }} />
        </svg>
        <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "#2a2a2a", overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #3a3028 0%, #2a2018 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="60" height="75" viewBox="0 0 60 75" opacity="0.4">
              <ellipse cx="30" cy="28" rx="20" ry="26" fill="#c4a882" />
              <ellipse cx="30" cy="70" rx="26" ry="20" fill="#c4a882" />
              <circle cx="22" cy="26" r="3" fill="#7a5c3a" />
              <circle cx="38" cy="26" r="3" fill="#7a5c3a" />
            </svg>
          </div>
          <div className="scan-line" />
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="cg" style={{ fontSize: "24px", color: WHITE, fontWeight: 300 }}>{progress}%</span>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: 260, textAlign: "left" }}>
        {metricLabels.map((label, i) => (
          <div key={label} className={`metric-item${metrics[i] ? " visible" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid #2a2a2a` }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: metrics[i] ? GOLD : "#333", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
              {metrics[i] && (
                <svg width="10" height="8" viewBox="0 0 10 8">
                  <polyline points="1,4 4,7 9,1" fill="none" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: "12px", color: metrics[i] ? "#ccc" : "#555" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4({ next }) {
  const s = seasons.autumnSoft;
  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 32px", textAlign: "center" }}>
      <p style={{ fontSize: "11px", letterSpacing: "3px", color: TAUPE, marginBottom: 8 }}>YOUR COLOR SEASON</p>
      <div style={{ background: WHITE, border: `1.5px solid ${GOLD}`, borderRadius: "2px", padding: "36px 32px", maxWidth: 340, width: "100%", marginBottom: 28 }}>
        <h1 className="pf" style={{ fontSize: "40px", fontWeight: 400, color: TEXT, marginBottom: 8 }}>{s.name.toUpperCase()}</h1>
        <p style={{ fontSize: "14px", color: TAUPE, marginBottom: 28, fontStyle: "italic" }}>{s.descriptor}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {s.palette12.map((c, i) => (
            <div key={i} style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "#aaa", fontStyle: "italic" }}>Your palette enhances your natural warmth</p>
      </div>
      <GoldButton onClick={next}>Explore Your Palette</GoldButton>
    </div>
  );
}

function Step5({ next }) {
  const s = seasons.autumnSoft;
  const colorSections = [
    ["neutrals", "Neutrals"],
    ["core", "Core"],
    ["accents", "Accents"],
    ["metals", "Metals"],
  ];

  return (
    <div className="fade-up" style={{ height: "100%", overflow: "auto", padding: "32px" }}>
      <p className="pf" style={{ fontSize: "20px", color: TEXT, marginBottom: 20 }}>Your Colors</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 28 }}>
        {colorSections.map(([key, label]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontSize: "10px", letterSpacing: "2px", color: TAUPE, marginBottom: 10, textTransform: "uppercase", textAlign: "center" }}>{label}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 68px)", columnGap: 8, rowGap: 10, justifyContent: "center" }}>
              {s.colors[key].map(sw => (
                <div key={sw.hex} className="swatch" style={{ width: 68, display: "flex", flexDirection: "column", alignItems: "center", cursor: "default", transition: "all 0.2s" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "3px", background: sw.hex, border: "1px solid rgba(0,0,0,0.06)", marginBottom: 4 }} />
                  <p style={{ fontSize: "9px", color: TAUPE, textAlign: "center", lineHeight: 1.3, minHeight: 24 }}>{sw.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="pf" style={{ fontSize: "20px", color: TEXT, marginBottom: 20 }}>Why These Colors</p>
      {[
        { label: "Undertone", value: s.undertone, desc: "Your skin has golden/peachy undertones" },
        { label: "Contrast", value: s.contrast, desc: "Soft transitions between features" },
        { label: "Saturation", value: s.saturation, desc: "Dusty, softened colors suit you best" },
      ].map(c => (
        <div key={c.label} style={{ background: WHITE, border: `1px solid ${GOLD}33`, borderRadius: "2px", padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: "11px", letterSpacing: "1.5px", color: TAUPE, textTransform: "uppercase" }}>{c.label}</span>
            <span style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 500, color: TEXT }}>{c.value}</span>
          </div>
          <p style={{ fontSize: "11px", color: "#aaa", lineHeight: 1.5 }}>{c.desc}</p>
        </div>
      ))}
      <p style={{ fontSize: "11px", color: "#bbb", lineHeight: 1.6, marginTop: 12 }}>Avoid: Cool blues, bright neons, stark black and white</p>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
        <GoldButton onClick={next}>See Recommended Products</GoldButton>
      </div>
    </div>
  );
}

function Step6({ next, activeProduct, setActiveProduct }) {
  return (
    <div className="fade-up" style={{ height: "100%", overflow: "auto", padding: "32px" }}>
      <p className="pf" style={{ fontSize: "22px", color: TEXT, marginBottom: 6 }}>Curated for Your Palette</p>
      <p style={{ fontSize: "13px", color: TAUPE, marginBottom: 24 }}>Ferragamo pieces that harmonize with your colors</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {products.map(p => {
          const isActive = activeProduct === p.id;

          return (
            <div
              key={p.id}
              className="product-card"
              onClick={() => setActiveProduct(isActive ? null : p.id)}
              style={{
                background: isActive ? `${GOLD}10` : WHITE,
                border: isActive ? `1.5px solid ${GOLD}` : `1px solid ${GOLD}33`,
                borderRadius: "2px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: isActive ? `0 0 0 1px ${GOLD}22, 0 8px 22px ${GOLD}22` : "none",
                transform: isActive ? "translateY(-1px)" : "none",
              }}
            >
              <div style={{ height: 120, background: p.color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div style={{ fontSize: "32px", opacity: 0.25 }}>â—ˆ</div>
                )}
              </div>
              <div style={{ padding: "12px", textAlign: "center" }}>
                <p style={{ fontSize: "12px", fontWeight: 500, color: TEXT, marginBottom: 8, whiteSpace: "nowrap" }}>{p.name}</p>
                <span style={{ display: "inline-block", background: `${GOLD}22`, color: TAUPE, fontSize: "9px", padding: "2px 7px", borderRadius: "1px", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{p.category}</span>
              </div>
            </div>
          );
        })}
      </div>
      <GoldButton onClick={next} style={{ width: "100%" }}>View in Boutique Map</GoldButton>
    </div>
  );
}

function Step7({ next, initialActiveZone = null }) {
  const [active, setActive] = useState(initialActiveZone);
  const zones = [
    { id: 1, label: "Clothing", x: 30, y: 60, products: ["Ivory Blouse", "Camel Coat"] },
    { id: 2, label: "Bags", x: 200, y: 60, products: ["Cognac Bag"] },
    { id: 3, label: "Accessories", x: 115, y: 160, products: ["Gold Scarf"] },
    { id: 4, label: "Shoes", x: 200, y: 160, products: ["Complementary tones"] },
  ];

  useEffect(() => {
    setActive(initialActiveZone);
  }, [initialActiveZone]);

  return (
    <div className="fade-up" style={{ height: "100%", overflow: "auto", padding: "32px" }}>
      <p className="pf" style={{ fontSize: "22px", color: TEXT, marginBottom: 20 }}>Where to Find Them</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div style={{ width: "100%", maxWidth: 280 }}>
          <svg width="280" height="240" viewBox="0 0 280 240" style={{ width: "100%", border: `1px solid ${GOLD}33`, borderRadius: "2px", background: WHITE }}>
            <rect x="10" y="10" width="260" height="220" rx="2" fill={IVORY} stroke={`${GOLD}44`} strokeWidth="1" />
            <rect x="10" y="10" width="260" height="110" rx="0" fill="none" stroke={`${GOLD}22`} strokeWidth="0.5" />
            <text x="130" y="130" textAnchor="middle" fontSize="10" fill={`${TAUPE}88`} fontFamily="Inter">First Floor</text>
            <text x="130" y="30" textAnchor="middle" fontSize="10" fill={`${TAUPE}88`} fontFamily="Inter">Ground Floor</text>
            {zones.map(z => (
              <g key={z.id} className="floor-zone" onClick={() => setActive(active === z.id ? null : z.id)}>
                <rect x={z.x} y={z.y} width="70" height="40" rx="2" fill={active === z.id ? `${GOLD}22` : "transparent"} stroke={active === z.id ? GOLD : `${GOLD}44`} strokeWidth="1" />
                <text x={z.x + 35} y={z.y + 16} textAnchor="middle" fontSize="9" fill={TAUPE} fontFamily="Inter">{z.label}</text>
                <circle cx={z.x + 35} cy={z.y + 28} r="5" fill={active === z.id ? GOLD : `${GOLD}55`} />
                {active === z.id && (
                  <circle cx={z.x + 35} cy={z.y + 28} r="8" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" values="5;10;5" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            ))}
            <circle cx="20" cy="225" r="4" fill={GOLD}>
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="28" y="228" fontSize="9" fill={TAUPE} fontFamily="Inter">You are here</text>
          </svg>
          {active && (
            <div className="fade-up" style={{ marginTop: 8, background: WHITE, border: `1px solid ${GOLD}33`, padding: "10px 12px", borderRadius: "2px" }}>
              <p style={{ fontSize: "12px", fontWeight: 500, color: TEXT, marginBottom: 4 }}>{zones.find(z => z.id === active)?.label}</p>
              {zones.find(z => z.id === active)?.products.map(p => (
                <p key={p} style={{ fontSize: "12px", color: TAUPE }}>· {p}</p>
              ))}
            </div>
          )}
        </div>
        <div style={{ width: "100%" }}>
          <p className="pf" style={{ fontSize: "16px", color: TEXT, marginBottom: 12 }}>Your Personal Shopper</p>
          <p style={{ fontSize: "12px", color: TAUPE, lineHeight: 1.7, marginBottom: 20 }}>Our stylists are ready to guide you through your perfect pieces</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <GoldButton outline onClick={() => {}} style={{ width: 220 }}>Request Assistance</GoldButton>
          </div>
          <div style={{ borderTop: `1px solid ${GOLD}33`, paddingTop: 16, display: "flex", justifyContent: "center" }}>
            <GoldButton onClick={next} style={{ width: 220 }}>Continue</GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step8({ next }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const s = seasons.autumnSoft;
  return (
    <div className="fade-up" style={{ height: "100%", overflow: "auto", padding: "28px 32px 20px", display: "flex", flexDirection: "column" }}>
      <p className="pf" style={{ fontSize: "22px", color: TEXT, marginBottom: 20 }}>Your armocromIA Profile</p>
      <div style={{ background: WHITE, border: `1.5px solid ${GOLD}44`, borderRadius: "2px", padding: "24px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${GOLD}44`, borderRadius: "2px", fontSize: "13px", fontFamily: "Inter", background: IVORY, outline: "none", color: TEXT }} />
          </div>
          <div style={{ flex: 1 }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (optional)" style={{ width: "100%", padding: "10px 12px", border: `1px solid ${GOLD}44`, borderRadius: "2px", fontSize: "13px", fontFamily: "Inter", background: IVORY, outline: "none", color: TEXT }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32 }}>
          <span style={{ background: GOLD, color: WHITE, fontSize: "10px", padding: "4px 12px", letterSpacing: "1.5px" }}>AUTUMN SOFT</span>
          <span style={{ fontSize: "11px", color: TAUPE }}>Analyzed today</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginBottom: 20 }}>
          {s.palette12.map((c, i) => (
            <div key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[{ hex: "#F5F0E8", name: "Ivory" }, { hex: "#D4C4B0", name: "Camel" }, { hex: "#C97B5A", name: "Terracotta" }].map(c => (
            <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
              <span style={{ fontSize: "10px", color: TAUPE }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, paddingTop: 8 }}>
        <div style={{ width: "100%" }}>
          <GoldButton onClick={next} style={{ width: "100%" }}>Email My Report</GoldButton>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "16px", border: `1px solid ${GOLD}44`, borderRadius: "2px" }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              {[...Array(8)].map((_, r) =>
                [...Array(8)].map((_, c) => (
                  <rect key={`${r}-${c}`} x={c * 8} y={r * 8} width="7" height="7" fill={Math.random() > 0.5 ? GOLD : "transparent"} opacity="0.8" />
                ))
              )}
              <rect x="0" y="0" width="20" height="20" fill="none" stroke={GOLD} strokeWidth="2" />
              <rect x="44" y="0" width="20" height="20" fill="none" stroke={GOLD} strokeWidth="2" />
              <rect x="0" y="44" width="20" height="20" fill="none" stroke={GOLD} strokeWidth="2" />
            </svg>
            <p style={{ fontSize: "9px", color: TAUPE, marginTop: 6, letterSpacing: "0.5px" }}>Scan to save your palette</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step9({ restart }) {
  const code = "ARM-" + Math.floor(1000 + Math.random() * 9000);
  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 40px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <svg width="28" height="22" viewBox="0 0 28 22">
          <polyline points="2,11 10,19 26,2" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" style={{ animation: "checkmark 0.6s ease forwards" }} />
        </svg>
      </div>
      <h1 className="pf" style={{ fontSize: "34px", fontWeight: 400, color: TEXT, marginBottom: 16 }}>Your Colors Await</h1>
      <p style={{ fontSize: "14px", color: TAUPE, lineHeight: 1.7, maxWidth: 300, marginBottom: 28 }}>Visit our boutique to explore your personalized selection. Your profile has been saved for future visits.</p>
      <div style={{ background: WHITE, border: `1px solid ${GOLD}44`, padding: "12px 28px", marginBottom: 32 }}>
        <p style={{ fontSize: "10px", letterSpacing: "2px", color: TAUPE, marginBottom: 4 }}>REFERENCE CODE</p>
        <p className="cg" style={{ fontSize: "22px", color: TEXT, letterSpacing: "4px" }}>{code}</p>
      </div>
      <GoldButton onClick={restart} style={{ width: 220 }}>Start New Analysis</GoldButton>
    </div>
  );
}

/* â”€â”€ KIOSK FRAME â”€â”€ */
function KioskSection() {
  const [step, setStep] = useState(1);
  const [activeProduct, setActiveProduct] = useState(null);
  const next = () => setStep(s => s + 1);
  const restart = () => {
    setStep(1);
    setActiveProduct(null);
  };
  const selectedProduct = products.find(p => p.id === activeProduct);
  const zoneByCategory = {
    Clothing: 1,
    Bags: 2,
    Accessories: 3,
  };
  const initialActiveZone = selectedProduct ? zoneByCategory[selectedProduct.category] ?? null : null;

  const stepMap = {
    1: <Step1 next={next} />,
    2: <Step2 next={next} />,
    3: <Step3 next={next} />,
    4: <Step4 next={next} />,
    5: <Step5 next={next} />,
    6: <Step6 next={next} activeProduct={activeProduct} setActiveProduct={setActiveProduct} />,
    7: <Step7 next={next} initialActiveZone={initialActiveZone} />,
    8: <Step8 next={next} />,
    9: <Step9 restart={restart} />,
  };

  const bg = [2, 3].includes(step) ? DARK : IVORY;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: "11px", letterSpacing: "3px", color: TAUPE, marginBottom: 20 }}>BOUTIQUE EXPERIENCE SIMULATION</div>
      <div style={{ position: "relative", width: "min(400px, 100%)", maxWidth: 400 }}>
        {/* Mirror Frame */}
        <div style={{ position: "absolute", inset: -12, border: `3px solid ${GOLD}88`, borderRadius: "16px", background: "transparent", pointerEvents: "none", zIndex: 2 }} />
        <div style={{ position: "absolute", inset: -6, border: `1px solid ${GOLD}44`, borderRadius: "12px", background: "transparent", pointerEvents: "none", zIndex: 2 }} />
        {/* Camera dot */}
        <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: DARK, border: `1px solid ${GOLD}66`, zIndex: 3 }} />
        {/* Screen */}
        <div style={{ background: bg, borderRadius: "10px", overflow: "hidden", height: 680, transition: "background 0.5s ease", position: "relative" }}>
          {stepMap[step]}
        </div>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 20 }}>
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} onClick={() => setStep(i)} style={{ width: i === step ? 16 : 6, height: 6, borderRadius: 3, background: i === step ? GOLD : `${GOLD}44`, cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* â”€â”€ ROOT â”€â”€ */
export default function App() {
  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Nav */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: IVORY, borderBottom: `1px solid ${GOLD}44`, padding: "0 32px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <span className="pf" style={{ fontSize: "18px", letterSpacing: "4px", color: TEXT, fontWeight: 400 }}>FERRAGAMO</span>
            <div style={{ display: "flex", alignItems: "center", height: 64, padding: "0 24px", fontSize: "12px", letterSpacing: "1px", color: GOLD, borderBottom: `2px solid ${GOLD}`, fontFamily: "Inter", fontWeight: 500 }}>
              ArmocromIA Experience
            </div>
            <div style={{ width: 120 }} />
          </div>
        </nav>
        {/* Content */}
        <KioskSection />
      </div>
    </>
  );
}

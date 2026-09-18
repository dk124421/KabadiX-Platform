import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2 } from "lucide-react";
import { PageHeader } from "../components/UI";

const cards = [
  { emoji: "🔋", title: "Battery", warn: "Avoid puncturing or burning", tip: "Tape terminals · keep dry · hand to recycler" },
  { emoji: "🖥️", title: "CRT", warn: "Avoid breaking the glass", tip: "Heavy · vacuum tube risk · authorized only" },
  { emoji: "🔌", title: "Cable", warn: "Avoid open-air burning", tip: "Strip safely · no fire · sell copper cleanly" },
  { emoji: "💻", title: "PCB", warn: "Avoid acid-based processing", tip: "No acid baths · use certified recyclers" },
];

export default function Safety() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(null);

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Safety Coach" onBack={() => navigate("/app")} />

      <div
        className="card"
        style={{
          background: "linear-gradient(135deg,#7f1d1d,#b45309)",
          color: "white",
          border: "none",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>🛑</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
          DON&apos;T BURN — RECYCLE SAFELY
        </h1>
        <p style={{ marginTop: 8, fontSize: 13, opacity: 0.9 }}>Pictures + voice · minimal reading</p>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {cards.map((c) => (
          <div key={c.title} className="card" style={{ display: "grid", gridTemplateColumns: "64px 1fr auto", gap: 12, alignItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--gray-100)", display: "grid", placeItems: "center", fontSize: 32 }}>
              {c.emoji}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{c.title}</div>
              <div style={{ color: "var(--red)", fontWeight: 700, fontSize: 12, marginTop: 4 }}>⚠️ {c.warn}</div>
              <div className="muted" style={{ marginTop: 4 }}>{c.tip}</div>
            </div>
            <button
              onClick={() => {
                setPlaying(c.title);
                setTimeout(() => setPlaying(null), 1200);
              }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: playing === c.title ? "var(--teal)" : "var(--teal-soft)",
                color: playing === c.title ? "white" : "var(--teal)",
                display: "grid",
                placeItems: "center",
              }}
              aria-label="Play voice"
            >
              <Volume2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

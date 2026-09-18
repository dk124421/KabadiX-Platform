import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "../components/UI";

const prices = [
  { m: "PCB", range: "₹350 – ₹410", unit: "/kg", t: 6.4, up: true },
  { m: "Cable", range: "₹95 – ₹120", unit: "/kg", t: 2.1, up: true },
  { m: "Battery", range: "₹180 – ₹220", unit: "/kg", t: 1.2, up: false },
  { m: "LCD", range: "₹140 – ₹175", unit: "/kg", t: 3.0, up: true },
  { m: "CRT", range: "₹45 – ₹60", unit: "/kg", t: 0.5, up: false },
  { m: "Motor", range: "₹90 – ₹110", unit: "/kg", t: 1.8, up: true },
  { m: "Magnet", range: "₹200 – ₹260", unit: "/kg", t: 4.2, up: true },
  { m: "Mixed Plastic", range: "₹18 – ₹28", unit: "/kg", t: 0.8, up: true },
];

export default function Prices() {
  const navigate = useNavigate();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Market Prices" onBack={() => navigate("/app")} right={<span className="badge badge-teal">Jaipur</span>} />
      <p className="muted" style={{ marginBottom: 14 }}>Live fair-range estimates · Price Intelligence API</p>
      <div style={{ display: "grid", gap: 10 }}>
        {prices.map((p) => (
          <button key={p.m} className="card" style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => navigate("/app/scan")}>
            <div>
              <div style={{ fontWeight: 800 }}>{p.m}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "var(--navy)" }}>
                {p.range} <span className="muted" style={{ fontSize: 12 }}>{p.unit}</span>
              </div>
            </div>
            <span className={`badge ${p.up ? "badge-green" : "badge-amber"}`}>
              {p.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {p.up ? "+" : "-"}
              {p.t}%
            </span>
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => navigate("/app/voice")}>
        Ask by voice
      </button>
    </div>
  );
}

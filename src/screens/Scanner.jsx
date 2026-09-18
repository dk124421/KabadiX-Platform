import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, RefreshCw, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

const materials = ["PCB", "Cable", "Battery", "LCD", "CRT", "Motor", "Magnet", "Mixed Plastic"];

export default function Scanner() {
  const navigate = useNavigate();
  const { setScanResult, scanResult } = useApp();
  const [phase, setPhase] = useState("camera"); // camera | analyzing | result
  const [picked, setPicked] = useState("PCB");

  useEffect(() => {
    if (phase !== "analyzing") return;
    const t = setTimeout(() => {
      setScanResult({
        material: picked,
        confidence: picked === "PCB" ? 94 : 88 + Math.floor(Math.random() * 8),
        weight: picked === "PCB" ? 2.5 : Number((1.2 + Math.random() * 3).toFixed(1)),
        fairMin: picked === "PCB" ? 875 : 400,
        fairMax: picked === "PCB" ? 1000 : 650,
        trend: 6.4,
      });
      setPhase("result");
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, picked, setScanResult]);

  if (phase === "analyzing") {
    return (
      <div style={{ minHeight: "100%", background: "#061628", color: "white", padding: "12px 18px 24px" }} className="fade-in">
        <PageHeader title="AI Analysis" onBack={() => setPhase("camera")} right={<span className="badge badge-teal">OpenAI CV</span>} />
        <div style={{ position: "relative", height: 420, borderRadius: 24, overflow: "hidden", background: "linear-gradient(180deg,#1e3a5f,#0f766e)" }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.35, fontSize: 72, fontWeight: 800 }}>{picked}</div>
          <div className="scan-overlay">
            <div className="scan-box">
              <div className="scan-line" />
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: 20, fontWeight: 700 }}>Classifying material…</p>
        <p className="muted" style={{ textAlign: "center", color: "#94a3b8", marginTop: 6 }}>Computer vision + price intelligence</p>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="screen-pad fade-in">
        <PageHeader title="AI Result" onBack={() => setPhase("camera")} />
        <div className="card" style={{ textAlign: "center", background: "linear-gradient(180deg,#f0fdfa,#fff)" }}>
          <div style={{ width: 72, height: 72, margin: "0 auto 12px", borderRadius: 20, background: "var(--teal-soft)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 18, color: "var(--teal)" }}>
            {scanResult.material}
          </div>
          <div className="muted">Detected Material</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{scanResult.material}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "left" }}>
            <div className="stat-pill">
              <div className="label">Confidence</div>
              <div className="value">{scanResult.confidence}%</div>
            </div>
            <div className="stat-pill">
              <div className="label">Est. Weight</div>
              <div className="value">{scanResult.weight} kg</div>
            </div>
            <div className="stat-pill" style={{ gridColumn: "1 / -1" }}>
              <div className="label">Estimated Fair Value</div>
              <div className="value" style={{ color: "var(--green)" }}>
                ₹{scanResult.fairMin} – ₹{scanResult.fairMax}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <span className="badge badge-green">Market Trend ↑ {scanResult.trend}% this week</span>
          </div>
        </div>
        <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 16 }} onClick={() => navigate("/app/fair-deal")}>
          <Check size={18} /> Confirm Material
        </button>
        <button className="btn btn-outline btn-block" style={{ marginTop: 10 }} onClick={() => setPhase("camera")}>
          <RefreshCw size={16} /> Retake Photo
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100%", background: "#061628", color: "white", padding: "12px 18px 24px" }} className="fade-in">
      <PageHeader title="AI Scanner" onBack={() => navigate("/app")} right={<span className="badge badge-teal">Live</span>} />
      <div style={{ position: "relative", height: 340, borderRadius: 24, overflow: "hidden", background: "linear-gradient(145deg,#334155,#0f766e 60%,#115e59)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.25, backgroundImage: "radial-gradient(circle at 30% 40%, #fff 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div className="scan-overlay">
          <div className="scan-box" style={{ top: "50%" }}>
            <div className="scan-line" />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, fontSize: 12, fontWeight: 600, color: "#ccfbf1" }}>
          Align e-waste inside the frame
        </div>
      </div>

      <p style={{ margin: "16px 0 10px", fontWeight: 700, fontSize: 13 }}>What are you scanning?</p>
      <div className="chip-row">
        {materials.map((m) => (
          <button key={m} className={`filter-chip${picked === m ? " active" : ""}`} style={picked === m ? {} : { background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "#e2e8f0" }} onClick={() => setPicked(m)}>
            {m}
          </button>
        ))}
      </div>

      <button className="btn btn-green btn-block btn-lg" style={{ marginTop: 20 }} onClick={() => setPhase("analyzing")}>
        <Camera size={20} /> Take Photo
      </button>
    </div>
  );
}

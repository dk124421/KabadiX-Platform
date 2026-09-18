import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

const events = [
  { title: "Collection", time: "18 Sep 2026 · 09:12", done: true },
  { title: "AI Identification", time: "18 Sep 2026 · 09:14", done: true },
  { title: "Fair Price Estimate", time: "18 Sep 2026 · 09:14", done: true },
  { title: "Recycler Matched", time: "18 Sep 2026 · 09:22", done: true },
  { title: "Pickup Confirmed", time: "18 Sep 2026 · 10:05", done: true },
  { title: "Digital Handover", time: "18 Sep 2026 · 11:40", done: "handover" },
  { title: "Recycling Confirmed", time: "Pending", done: false },
];

export default function Passport() {
  const navigate = useNavigate();
  const { lot, handoverDone } = useApp();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Scrap Passport" onBack={() => navigate("/app")} />

      <div
        className="card slide-up"
        style={{
          background: "linear-gradient(160deg,#0a2540 0%,#0f4c5c 55%,#0d9488 100%)",
          color: "white",
          border: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.75, letterSpacing: 1 }}>DIGITAL SCRAP PASSPORT</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, margin: "6px 0 14px" }}>{lot.id}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px", gap: 12, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
            <Info icon="♻️" label="Material" value={lot.material} />
            <Info icon="⚖️" label="Weight" value={`${lot.weight} kg`} />
            <Info icon="📍" label="Location" value={lot.location} />
            <Info icon="💰" label="Fair Value" value={`₹${lot.fairValue}`} />
            <Info icon="📅" label="Collected" value={lot.date} />
            <Info icon="🏭" label="Recycler" value={lot.recycler} />
          </div>
          <div style={{ background: "white", padding: 8, borderRadius: 12 }}>
            <QRCodeSVG value={`https://kabadix.app/lot/${lot.id}`} size={94} />
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <span className="badge badge-green">🔐 {handoverDone ? "Handover Verified" : lot.status}</span>
        </div>
      </div>

      <p style={{ textAlign: "center", margin: "16px 0", fontWeight: 700, color: "var(--teal)", fontSize: 13 }}>
        Every kilogram of e-waste has a digital identity.
      </p>

      <h2 className="section-title" style={{ fontSize: 16, marginBottom: 12 }}>Traceability Timeline</h2>
      <div className="card">
        <div className="timeline">
          {events.map((e, i) => {
            const isHandover = e.done === "handover";
            const active = isHandover ? handoverDone : Boolean(e.done);
            const timeLabel = isHandover
              ? handoverDone
                ? "18 Sep 2026 · 11:40"
                : "Awaiting QR scan"
              : e.time;
            return (
              <div className="timeline-item" key={e.title}>
                <div className="timeline-rail">
                  <div className={`timeline-dot ${active ? "done" : "pending"}`} />
                  {i < events.length - 1 && <div className="timeline-line" />}
                </div>
                <div style={{ paddingBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{e.title}</div>
                  <div className="muted">{timeLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => navigate("/app/handover")}>
        Open Digital Handover
      </button>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>{icon}</span>
      <div>
        <div style={{ fontSize: 10, opacity: 0.7 }}>{label}</div>
        <div style={{ fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, MapPin } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

export default function Handover() {
  const navigate = useNavigate();
  const { lot, user, setHandoverDone, handoverDone } = useApp();
  const [scanning, setScanning] = useState(false);

  const confirm = () => {
    setScanning(true);
    setTimeout(() => {
      setHandoverDone(true);
      setScanning(false);
    }, 1600);
  };

  if (handoverDone) {
    return (
      <div className="screen-pad fade-in" style={{ textAlign: "center", paddingTop: 36 }}>
        <div className="success-burst">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="section-title" style={{ color: "var(--green)" }}>HANDOVER VERIFIED</h1>
        <div className="card" style={{ textAlign: "left", marginTop: 20, display: "grid", gap: 10 }}>
          <Row label="Timestamp" value="18 Sep 2026 · 11:40 IST" />
          <Row label="GPS Location" value="26.9124° N, 75.7873° E" />
          <Row label="Recycler Confirmation" value="GreenCycle · Verified" />
          <Row label="Final Price" value="₹936" />
        </div>
        <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} onClick={() => navigate("/app/passport")}>
          Update Scrap Passport
        </button>
        <button className="btn btn-outline btn-block" style={{ marginTop: 10 }} onClick={() => navigate("/app/earnings")}>
          View Payment
        </button>
      </div>
    );
  }

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Digital Handover" onBack={() => navigate("/app/passport")} />
      <div className="card" style={{ display: "grid", gap: 12, marginBottom: 16 }}>
        <Row label="Lot ID" value={lot.id} />
        <Row label="Collector" value={user.name} />
        <Row label="Recycler" value={lot.recycler} />
        <Row label="Material" value={lot.material} />
        <Row label="Estimated Weight" value={`${lot.weight} kg`} />
        <Row label="Actual Weight" value="2.4 kg" />
        <Row label="Final Price" value="₹936" />
      </div>

      <div className="card" style={{ textAlign: "center", background: scanning ? "#0a2540" : "white", color: scanning ? "white" : "inherit" }}>
        <div style={{ display: "inline-block", padding: 12, background: "white", borderRadius: 14, marginBottom: 12 }}>
          <QRCodeSVG value={`HANDOVER:${lot.id}`} size={150} />
        </div>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>SCAN QR TO CONFIRM HANDOVER</div>
        <div className="muted" style={{ color: scanning ? "#99f6e4" : undefined, display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
          <MapPin size={14} /> Recycler scans at pickup
        </div>
        {scanning && <p style={{ marginTop: 12, fontWeight: 700 }}>Verifying…</p>}
      </div>

      <button className="btn btn-green btn-block btn-lg" style={{ marginTop: 18 }} onClick={confirm} disabled={scanning}>
        Simulate Recycler Scan
      </button>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span className="muted">{label}</span>
      <strong style={{ textAlign: "right" }}>{value}</strong>
    </div>
  );
}

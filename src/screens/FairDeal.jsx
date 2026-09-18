import { useNavigate } from "react-router-dom";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader, CircularScore } from "../components/UI";

export default function FairDeal() {
  const navigate = useNavigate();
  const { scanResult } = useApp();
  const localMin = 350;
  const localMax = 410;
  const offer = 320;
  const avg = 380;
  const historical = 365;
  const extra = 75;
  const below = offer < localMin;

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Fair Deal AI" onBack={() => navigate("/app/scan")} right={<span className="badge badge-navy">Price Shield</span>} />

      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div className="muted">Material</div>
          <div style={{ fontWeight: 800, fontSize: 22 }}>{scanResult.material}</div>
          <div className="muted" style={{ marginTop: 4 }}>Weight · {scanResult.weight} kg</div>
        </div>
        <CircularScore score={72} size={110} label="/100" />
      </div>

      {below && (
        <div className="card" style={{ background: "var(--amber-soft)", borderColor: "#fcd34d", marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <AlertTriangle color="#b45309" size={22} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 800, color: "#92400e" }}>OFFER BELOW LOCAL FAIR RANGE</div>
            <div className="muted" style={{ marginTop: 4 }}>KabadiX Price Shield protects your earnings</div>
          </div>
        </div>
      )}

      <div className="card" style={{ display: "grid", gap: 12, marginBottom: 14 }}>
        <Row label="Local Market Range" value={`₹${localMin} – ₹${localMax} / kg`} />
        <Row label="Current Local Average" value={`₹${avg} / kg`} />
        <Row label="Historical Average" value={`₹${historical} / kg`} />
        <Row label="Recycler Offer" value={`₹${offer} / kg`} danger />
        <div style={{ height: 1, background: "var(--gray-100)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="muted">Potential Extra Earning</div>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--green)" }}>₹{extra}</div>
          </div>
          <span className="badge badge-green"><TrendingUp size={12} /> Fairer deals nearby</span>
        </div>
      </div>

      <div style={{ height: 10, background: "var(--gray-100)", borderRadius: 999, overflow: "hidden", marginBottom: 6 }}>
        <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg,var(--amber),var(--teal))" }} />
      </div>
      <p className="muted" style={{ marginBottom: 18 }}>Fair Deal Score: 72/100</p>

      <button className="btn btn-navy btn-block btn-lg" onClick={() => navigate("/app/recyclers")}>
        Compare Recycler Offers
      </button>
      <button className="btn btn-primary btn-block" style={{ marginTop: 10 }} onClick={() => navigate("/app/create-lot")}>
        Create Scrap Lot
      </button>
    </div>
  );
}

function Row({ label, value, danger }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span className="muted">{label}</span>
      <span style={{ fontWeight: 800, color: danger ? "var(--red)" : "var(--navy)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

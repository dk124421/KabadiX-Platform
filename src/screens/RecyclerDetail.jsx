import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { useApp } from "../context/AppContext";
import { CircularScore, PageHeader } from "../components/UI";

export default function RecyclerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { recyclers, setSelectedRecycler, setLot } = useApp();
  const r = recyclers.find((x) => x.id === id) || recyclers[0];

  const pillars = [
    "Authorization",
    "Fair Pricing",
    "Pickup Reliability",
    "Payment Reliability",
    "Transaction History",
  ];

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Transparency Score" onBack={() => navigate("/app/recyclers")} />

      <div className="card" style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{r.name}</div>
        <span className="badge badge-green">Authorized / Verified</span>
        <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 8px" }}>
          <CircularScore score={r.score} size={150} label="/ 100" />
        </div>
        <div className="muted">Recycler Transparency Score</div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        {pillars.map((p) => (
          <div key={p} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--gray-100)" }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{p}</span>
            <CheckCircle2 size={18} color="var(--green)" />
          </div>
        ))}
      </div>

      <div className="card" style={{ display: "grid", gap: 10, marginBottom: 14 }}>
        <Meta icon={<MapPin size={16} />} label="Service area" value={r.area} />
        <Meta icon={<Clock size={16} />} label="Avg response" value={r.response} />
        <div>
          <div className="muted" style={{ marginBottom: 6 }}>Materials accepted</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {r.materials.map((m) => (
              <span key={m} className="badge badge-teal">{m}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="muted" style={{ marginBottom: 6 }}>Pickup</div>
          <span className={`badge ${r.pickup ? "badge-green" : "badge-amber"}`}>{r.pickup ? "Available" : "Drop-off only"}</span>
        </div>
      </div>

      <h2 className="section-title" style={{ fontSize: 15, marginBottom: 8 }}>Previous Transactions</h2>
      <div className="card" style={{ marginBottom: 16, fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span>KDX-00470 · PCB</span>
          <strong>₹1,120 · Paid</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>KDX-00455 · Cable</span>
          <strong>₹480 · Paid</strong>
        </div>
      </div>

      <button
        className="btn btn-primary btn-block btn-lg"
        onClick={() => {
          setSelectedRecycler(r);
          setLot((l) => ({ ...l, recycler: r.name }));
          navigate("/app/create-lot");
        }}
      >
        Select Recycler
      </button>
    </div>
  );
}

function Meta({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--gray-100)", display: "grid", placeItems: "center", color: "var(--teal)" }}>{icon}</div>
      <div>
        <div className="muted">{label}</div>
        <div style={{ fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
}

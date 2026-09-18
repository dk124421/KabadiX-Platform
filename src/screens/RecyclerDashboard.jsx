import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Truck,
  IndianRupee,
  QrCode,
  Recycle,
  BarChart3,
  Check,
  X,
} from "lucide-react";
import { Logo, PageHeader } from "../components/UI";

const modules = [
  { icon: Package, label: "Incoming Lots", key: "incoming" },
  { icon: Truck, label: "Pickup Requests", key: "pickup" },
  { icon: IndianRupee, label: "Offers", key: "offers" },
  { icon: QrCode, label: "Digital Handovers", key: "handover" },
  { icon: Recycle, label: "Recycling Status", key: "recycle" },
  { icon: BarChart3, label: "Analytics", key: "analytics" },
];

export default function RecyclerDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("incoming");
  const [offer, setOffer] = useState(395);

  return (
    <div className="screen-pad fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Logo />
        <button className="filter-chip" onClick={() => navigate("/welcome")}>Logout</button>
      </div>
      <PageHeader title="Recycler Dashboard" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <div className="stat-pill"><div className="label">Incoming Lots</div><div className="value">18</div></div>
        <div className="stat-pill"><div className="label">Pending Pickups</div><div className="value" style={{ color: "var(--amber)" }}>7</div></div>
        <div className="stat-pill"><div className="label">Today&apos;s Purchases</div><div className="value" style={{ color: "var(--green)" }}>₹42,500</div></div>
        <div className="stat-pill"><div className="label">Completed Handovers</div><div className="value">124</div></div>
      </div>

      <div className="quick-grid" style={{ marginBottom: 16 }}>
        {modules.map((m) => (
          <button key={m.key} className="quick-action" onClick={() => setTab(m.key)} style={tab === m.key ? { borderColor: "var(--teal)", background: "var(--teal-soft)" } : {}}>
            <div className="icon-wrap"><m.icon size={18} /></div>
            {m.label}
          </button>
        ))}
      </div>

      {tab === "incoming" && (
        <div className="card slide-up">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Lot KDX-2026-00482</div>
          <div className="muted" style={{ marginBottom: 10 }}>Collector: Rahul · Jaipur · 2.4 km</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div className="stat-pill"><div className="label">AI Class</div><div className="value" style={{ fontSize: 14 }}>PCB 94%</div></div>
            <div className="stat-pill"><div className="label">Weight</div><div className="value" style={{ fontSize: 14 }}>2.5 kg</div></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-green" style={{ flex: 1, minHeight: 48 }} onClick={() => setTab("offers")}><Check size={16} /> Accept</button>
            <button className="btn btn-outline" style={{ flex: 1, minHeight: 48 }}><X size={16} /> Reject</button>
          </div>
        </div>
      )}

      {tab === "offers" && (
        <div className="card slide-up">
          <div style={{ fontWeight: 800 }}>Make Offer · PCB</div>
          <div style={{ margin: "14px 0", display: "flex", alignItems: "center", gap: 12 }}>
            <button className="filter-chip" onClick={() => setOffer((o) => o - 5)}>-</button>
            <div style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>₹{offer}/kg</div>
            <button className="filter-chip" onClick={() => setOffer((o) => o + 5)}>+</button>
          </div>
          <button className="btn btn-primary btn-block">Send Offer to Collector</button>
        </div>
      )}

      {tab === "pickup" && (
        <div className="card slide-up">
          <div style={{ fontWeight: 800 }}>Pickup · KDX-00482</div>
          <div className="muted" style={{ margin: "8px 0 12px" }}>ETA 25 min · Rahul · PCB 2.5 kg</div>
          <button className="btn btn-navy btn-block">Confirm Pickup</button>
        </div>
      )}

      {tab === "handover" && (
        <div className="card slide-up" style={{ textAlign: "center" }}>
          <QrCode size={48} color="var(--teal)" style={{ margin: "0 auto 10px" }} />
          <div style={{ fontWeight: 800 }}>Scan collector QR</div>
          <p className="muted" style={{ margin: "8px 0 14px" }}>Confirm weight & payment</p>
          <button className="btn btn-green btn-block" onClick={() => navigate("/app/handover")}>Open Handover Flow</button>
        </div>
      )}

      {tab === "recycle" && (
        <div className="card slide-up">
          <div style={{ fontWeight: 800, marginBottom: 12 }}>Recycling Status</div>
          {["Received", "Sorted", "Processed", "Recovered"].map((s, i) => (
            <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--gray-100)" }}>
              <span>{s}</span>
              <span className={`badge ${i < 3 ? "badge-green" : "badge-teal"}`}>{i < 3 ? "Done" : "In progress"}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "analytics" && (
        <div className="card slide-up">
          <div style={{ fontWeight: 800 }}>Facility Analytics</div>
          <div className="muted" style={{ margin: "8px 0" }}>This month · 18.4 tons processed</div>
          <div style={{ height: 8, background: "var(--gray-100)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: "78%", height: "100%", background: "linear-gradient(90deg,var(--teal),var(--green))" }} />
          </div>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => navigate("/admin")}>Open Platform Admin</button>
        </div>
      )}
    </div>
  );
}

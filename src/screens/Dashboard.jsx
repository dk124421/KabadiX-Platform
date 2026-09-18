import { useNavigate } from "react-router-dom";
import {
  Bell,
  Camera,
  IndianRupee,
  MapPinned,
  Fingerprint,
  ClipboardList,
  Mic,
  WifiOff,
  ShieldAlert,
} from "lucide-react";
import { Logo } from "../components/UI";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, user, language, setLanguage, offline } = useApp();

  const quick = [
    { icon: Camera, label: t.scan, path: "/app/scan", color: "#ccfbf1", fg: "#0d9488" },
    { icon: IndianRupee, label: t.prices, path: "/app/prices", color: "#dcfce7", fg: "#16a34a" },
    { icon: MapPinned, label: t.findRecycler, path: "/app/recyclers", color: "#e0f2fe", fg: "#0369a1" },
    { icon: Fingerprint, label: t.passport, path: "/app/passport", color: "#fef3c7", fg: "#b45309" },
    { icon: ClipboardList, label: t.transactions, path: "/app/earnings", color: "#ede9fe", fg: "#6d28d9" },
    { icon: Mic, label: t.askKabadiX, path: "/app/voice", color: "#fce7f3", fg: "#be185d" },
  ];

  return (
    <div className="screen-pad fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <Logo />
          <div className="muted" style={{ marginTop: 4 }}>
            Namaste, <strong style={{ color: "var(--navy)" }}>{user.name}</strong>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ border: "1.5px solid var(--gray-200)", borderRadius: 10, padding: "6px 8px", fontSize: 12, fontWeight: 700, background: "white" }}
          >
            <option value="en">EN</option>
            <option value="hi">हि</option>
            <option value="mr">मर</option>
          </select>
          <button
            onClick={() => navigate("/app/offline")}
            style={{ width: 40, height: 40, borderRadius: 12, background: "white", border: "1.5px solid var(--gray-200)", display: "grid", placeItems: "center", position: "relative" }}
          >
            <Bell size={18} />
            <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, background: "var(--red)", borderRadius: "50%" }} />
          </button>
        </div>
      </div>

      {offline && (
        <button
          className="card"
          onClick={() => navigate("/app/offline")}
          style={{ width: "100%", marginBottom: 14, background: "var(--red-soft)", borderColor: "#fecaca", display: "flex", gap: 10, alignItems: "center", textAlign: "left" }}
        >
          <WifiOff size={18} color="var(--red)" />
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: "var(--red)" }}>{t.offline}</div>
            <div className="muted">Data saved on device · tap for details</div>
          </div>
        </button>
      )}

      <button className="scan-hero-btn" onClick={() => navigate("/app/scan")}>
        <Camera size={36} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", position: "relative", zIndex: 1 }}>
          {t.scan}
        </span>
        <span style={{ fontSize: 12, opacity: 0.8, position: "relative", zIndex: 1 }}>AI camera · instant fair value</span>
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
        <div className="stat-pill">
          <div className="label">{t.todayEarnings}</div>
          <div className="value" style={{ color: "var(--green)" }}>₹1,850</div>
        </div>
        <div className="stat-pill">
          <div className="label">{t.pendingPayments}</div>
          <div className="value" style={{ color: "var(--amber)" }}>₹620</div>
        </div>
        <div className="stat-pill">
          <div className="label">{t.totalLots}</div>
          <div className="value">24</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0 10px" }}>
        <h2 className="section-title" style={{ fontSize: 16 }}>Quick Actions</h2>
        <button onClick={() => navigate("/app/safety")} style={{ color: "var(--teal)", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
          <ShieldAlert size={14} /> Safety
        </button>
      </div>
      <div className="quick-grid">
        {quick.map((q) => (
          <button key={q.path} className="quick-action" onClick={() => navigate(q.path)}>
            <div className="icon-wrap" style={{ background: q.color, color: q.fg }}>
              <q.icon size={20} />
            </div>
            {q.label}
          </button>
        ))}
      </div>

      <h2 className="section-title" style={{ fontSize: 16, margin: "22px 0 10px" }}>Local Price Highlights</h2>
      <div className="card" style={{ display: "grid", gap: 10 }}>
        {[
          { m: "PCB", p: "₹350–410/kg", up: "+6.4%" },
          { m: "Cable", p: "₹95–120/kg", up: "+2.1%" },
          { m: "Battery", p: "₹180–220/kg", up: "-1.2%" },
        ].map((row) => (
          <div key={row.m} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800 }}>{row.m}</div>
              <div className="muted">{row.p}</div>
            </div>
            <span className={`badge ${row.up.startsWith("+") ? "badge-green" : "badge-amber"}`}>{row.up}</span>
          </div>
        ))}
      </div>

      <h2 className="section-title" style={{ fontSize: 16, margin: "22px 0 10px" }}>Nearby Recyclers</h2>
      <button className="card" style={{ width: "100%", textAlign: "left" }} onClick={() => navigate("/app/recyclers")}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800 }}>GreenCycle Recycling</div>
            <div className="muted">2.4 km · ₹395/kg · Pickup</div>
          </div>
          <span className="badge badge-green">91</span>
        </div>
      </button>

      <h2 className="section-title" style={{ fontSize: 16, margin: "22px 0 10px" }}>Recent Transactions</h2>
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { id: "KDX-00482", m: "PCB", a: "₹936", s: "Paid" },
          { id: "KDX-00481", m: "Cable", a: "₹620", s: "Pending" },
        ].map((tx) => (
          <button key={tx.id} className="card" style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between" }} onClick={() => navigate("/app/earnings")}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{tx.id}</div>
              <div className="muted">{tx.m}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800 }}>{tx.a}</div>
              <span className={`badge ${tx.s === "Paid" ? "badge-green" : "badge-amber"}`}>{tx.s}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

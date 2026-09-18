import { useNavigate } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { PageHeader } from "../components/UI";

const chart = [
  { d: "Mon", v: 1200 },
  { d: "Tue", v: 1800 },
  { d: "Wed", v: 900 },
  { d: "Thu", v: 2200 },
  { d: "Fri", v: 1850 },
  { d: "Sat", v: 2400 },
  { d: "Sun", v: 1600 },
];

const txs = [
  { id: "KDX-00482", m: "PCB", r: "GreenCycle", a: "₹936", s: "Paid", p: "UPI" },
  { id: "KDX-00481", m: "Cable", r: "EcoRecycle", a: "₹620", s: "Pending", p: "Cash" },
  { id: "KDX-00470", m: "Battery", r: "GreenCycle", a: "₹1,120", s: "Paid", p: "UPI" },
  { id: "KDX-00455", m: "LCD", r: "UrbanScrap", a: "₹780", s: "Paid", p: "UPI" },
];

export default function Earnings() {
  const navigate = useNavigate();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="My Earnings" onBack={() => navigate("/app")} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div className="card" style={{ gridColumn: "1 / -1", background: "linear-gradient(135deg,#0a2540,#0d9488)", color: "white", border: "none" }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Total Earnings</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800 }}>₹24,850</div>
          <div style={{ marginTop: 8, fontSize: 12 }}>38 lots sold</div>
        </div>
        <div className="stat-pill">
          <div className="label">Paid</div>
          <div className="value" style={{ color: "var(--green)" }}>₹21,400</div>
        </div>
        <div className="stat-pill">
          <div className="label">Pending</div>
          <div className="value" style={{ color: "var(--amber)" }}>₹3,450</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16, height: 160 }}>
        <div className="muted" style={{ marginBottom: 8 }}>This week</div>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={chart}>
            <defs>
              <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="d" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="v" stroke="#0d9488" fill="url(#earn)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <h2 className="section-title" style={{ fontSize: 16, marginBottom: 10 }}>Transactions</h2>
      <div style={{ display: "grid", gap: 8 }}>
        {txs.map((tx) => (
          <div key={tx.id} className="card" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13 }}>{tx.id}</div>
              <div className="muted">{tx.m} · {tx.r} · {tx.p}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800 }}>{tx.a}</div>
              <span className={`badge ${tx.s === "Paid" ? "badge-green" : "badge-amber"}`}>{tx.s}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

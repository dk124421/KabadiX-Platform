import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "../components/UI";

const weekly = [
  { name: "Mon", t: 12 },
  { name: "Tue", t: 18 },
  { name: "Wed", t: 14 },
  { name: "Thu", t: 22 },
  { name: "Fri", t: 19 },
  { name: "Sat", t: 28 },
  { name: "Sun", t: 16 },
];

const materials = [
  { name: "PCB", value: 32, color: "#0d9488" },
  { name: "Cable", value: 22, color: "#22c55e" },
  { name: "Battery", value: 18, color: "#0a2540" },
  { name: "Other", value: 28, color: "#94a3b8" },
];

const cities = [
  { c: "Jaipur", v: 92 },
  { c: "Delhi", v: 78 },
  { c: "Pune", v: 64 },
  { c: "Indore", v: 51 },
];

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Platform Analytics" onBack={() => navigate("/welcome")} right={<span className="badge badge-navy">Admin</span>} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <Stat label="Collectors" value="1,284" />
        <Stat label="Recyclers" value="86" />
        <Stat label="E-Waste Lots" value="12,480" />
        <Stat label="Material Recovered" value="248.6 T" />
        <div className="card" style={{ gridColumn: "1 / -1", background: "linear-gradient(135deg,#0a2540,#0d9488)", color: "white", border: "none" }}>
          <div style={{ fontSize: 12, opacity: 0.85 }}>Transactions</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>₹4.82 Cr</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12, height: 180 }}>
        <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 14 }}>E-waste collected (tons)</div>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={weekly}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="t" fill="#0d9488" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ marginBottom: 12, height: 180 }}>
        <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 14 }}>Material categories</div>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie data={materials} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={3}>
              {materials.map((e) => (
                <Cell key={e.name} fill={e.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 10, fontSize: 14 }}>City-wise collection</div>
        <div className="map-mock" style={{ height: 120, marginBottom: 12 }}>
          <div className="map-pin" style={{ left: "35%", top: "40%" }} />
          <div className="map-pin" style={{ left: "55%", top: "30%", background: "var(--green)" }} />
          <div className="map-pin" style={{ left: "48%", top: "60%", background: "var(--navy)" }} />
        </div>
        {cities.map((c) => (
          <div key={c.c} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
              <span>{c.c}</span>
              <span>{c.v}%</span>
            </div>
            <div style={{ height: 6, background: "var(--gray-100)", borderRadius: 999 }}>
              <div style={{ width: `${c.v}%`, height: "100%", background: "var(--teal)", borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ fontSize: 12, color: "var(--gray-500)", lineHeight: 1.6 }}>
        <strong style={{ color: "var(--navy)" }}>Stack:</strong> React · Node/Express · MongoDB · OpenAI CV · GPS/Maps · Payments · JWT RBAC
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat-pill">
      <div className="label">{label}</div>
      <div className="value" style={{ fontSize: 16 }}>{value}</div>
    </div>
  );
}

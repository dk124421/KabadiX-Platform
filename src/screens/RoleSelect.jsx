import { useNavigate } from "react-router-dom";
import { Recycle, Truck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

export default function RoleSelect() {
  const navigate = useNavigate();
  const { role, setRole } = useApp();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="I am a…" onBack={() => navigate("/language")} />
      <p className="muted" style={{ marginBottom: 20 }}>Select your role to continue</p>
      <div style={{ display: "grid", gap: 14 }}>
        <button className={`role-card${role === "collector" ? " selected" : ""}`} onClick={() => setRole("collector")}>
          <div style={{ width: 64, height: 64, margin: "0 auto 12px", borderRadius: 20, background: "var(--teal-soft)", color: "var(--teal)", display: "grid", placeItems: "center" }}>
            <Truck size={30} />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>Collector</div>
          <div className="muted" style={{ marginTop: 6 }}>Kabadiwala / Waste-picker</div>
        </button>
        <button className={`role-card${role === "recycler" ? " selected" : ""}`} onClick={() => setRole("recycler")}>
          <div style={{ width: 64, height: 64, margin: "0 auto 12px", borderRadius: 20, background: "var(--green-soft)", color: "var(--green)", display: "grid", placeItems: "center" }}>
            <Recycle size={30} />
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>Recycler</div>
          <div className="muted" style={{ marginTop: 6 }}>Authorized e-waste facility</div>
        </button>
      </div>
      <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 24 }} onClick={() => navigate("/login")}>
        Continue
      </button>
      <button className="btn btn-ghost btn-block" style={{ marginTop: 8 }} onClick={() => navigate("/admin")}>
        View Admin Analytics Demo
      </button>
    </div>
  );
}

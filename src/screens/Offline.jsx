import { useNavigate } from "react-router-dom";
import { CloudOff, RefreshCw, Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

export default function Offline() {
  const navigate = useNavigate();
  const { offline, setOffline, syncDone, setSyncDone } = useApp();

  const goOnline = () => {
    setOffline(false);
    setSyncDone(true);
  };

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Connectivity" onBack={() => navigate("/app")} />

      {!offline && syncDone ? (
        <div className="card" style={{ textAlign: "center", background: "var(--green-soft)", borderColor: "#86efac" }}>
          <div className="success-burst" style={{ background: "white" }}>
            <Check size={36} color="var(--green)" />
          </div>
          <h1 className="section-title" style={{ color: "var(--green)" }}>Sync Completed</h1>
          <p className="muted" style={{ marginTop: 8 }}>12 records synchronized.</p>
          <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={() => navigate("/app")}>
            Back to Home
          </button>
        </div>
      ) : (
        <>
          <div
            className="card"
            style={{
              textAlign: "center",
              background: offline ? "var(--red-soft)" : "white",
              borderColor: offline ? "#fecaca" : undefined,
            }}
          >
            <div style={{ width: 72, height: 72, margin: "0 auto 12px", borderRadius: "50%", background: offline ? "#fee2e2" : "var(--teal-soft)", display: "grid", placeItems: "center" }}>
              <CloudOff size={32} color={offline ? "var(--red)" : "var(--teal)"} />
            </div>
            <h1 className="section-title">{offline ? "🔴 Offline Mode" : "Online"}</h1>
            <p className="muted" style={{ marginTop: 8, lineHeight: 1.5 }}>
              {offline ? "Your data is saved securely on this device." : "All features synced with cloud."}
            </p>
          </div>

          <h2 className="section-title" style={{ fontSize: 15, margin: "18px 0 10px" }}>Available offline</h2>
          <div className="card" style={{ display: "grid", gap: 10 }}>
            {["Scan E-Waste", "Create Draft Lot", "View Saved Prices", "View Scrap Passport", "Safety Guidance"].map((f) => (
              <div key={f} style={{ display: "flex", gap: 8, fontWeight: 600, fontSize: 14 }}>
                <span style={{ color: "var(--green)" }}>✓</span> {f}
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", margin: "18px 0", fontWeight: 700, color: "var(--teal)", fontSize: 13 }}>
            Will Sync Automatically When Internet Returns
          </p>

          <div style={{ display: "grid", gap: 10 }}>
            {!offline ? (
              <button className="btn btn-outline btn-block" onClick={() => { setOffline(true); setSyncDone(false); }}>
                Demo: Go Offline
              </button>
            ) : (
              <button className="btn btn-green btn-block btn-lg" onClick={goOnline}>
                <RefreshCw size={18} /> Demo: Restore Internet
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

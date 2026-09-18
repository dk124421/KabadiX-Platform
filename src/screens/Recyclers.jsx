import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Truck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

const filters = ["Best Price", "Nearest", "Pickup Available", "Highest Transparency", "Material Accepted"];

export default function Recyclers() {
  const navigate = useNavigate();
  const { recyclers, setSelectedRecycler } = useApp();
  const [filter, setFilter] = useState("Nearest");
  const [view, setView] = useState("list");

  const sorted = useMemo(() => {
    const list = [...recyclers];
    if (filter === "Best Price") list.sort((a, b) => b.price - a.price);
    if (filter === "Nearest") list.sort((a, b) => a.distance - b.distance);
    if (filter === "Pickup Available") return list.filter((r) => r.pickup);
    if (filter === "Highest Transparency") list.sort((a, b) => b.score - a.score);
    return list;
  }, [filter, recyclers]);

  return (
    <div className="screen-pad fade-in">
      <PageHeader
        title="Nearby Recyclers"
        onBack={() => navigate("/app")}
        right={
          <div style={{ display: "flex", gap: 6 }}>
            <button className={`filter-chip${view === "map" ? " active" : ""}`} onClick={() => setView("map")}>Map</button>
            <button className={`filter-chip${view === "list" ? " active" : ""}`} onClick={() => setView("list")}>List</button>
          </div>
        }
      />

      <div className="map-mock" style={{ marginBottom: 14 }}>
        <div className="map-pin" style={{ left: "42%", top: "38%" }}><MapPin size={16} /></div>
        <div className="map-pin" style={{ left: "62%", top: "55%", background: "var(--green)" }}><MapPin size={16} /></div>
        <div className="map-pin" style={{ left: "28%", top: "62%", background: "var(--navy)" }}><MapPin size={16} /></div>
        <div style={{ position: "absolute", bottom: 10, left: 10, background: "white", padding: "6px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700 }}>
          GPS · Jaipur
        </div>
      </div>

      <div className="chip-row" style={{ marginBottom: 14 }}>
        {filters.map((f) => (
          <button key={f} className={`filter-chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {sorted.map((r) => (
          <button
            key={r.id}
            className="card"
            style={{ width: "100%", textAlign: "left" }}
            onClick={() => {
              setSelectedRecycler(r);
              navigate(`/app/recycler/${r.id}`);
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 800 }}>{r.name}</div>
                <span className="badge badge-green" style={{ marginTop: 6 }}>🟢 Authorized ✓</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, color: "var(--teal)" }}>₹{r.price}/kg</div>
                <div className="muted">{r.distance} km</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {r.pickup && (
                <span className="badge badge-teal"><Truck size={12} /> Pickup</span>
              )}
              <span className="badge badge-navy"><Star size={12} /> Score {r.score}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Check } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

export default function CreateLot() {
  const navigate = useNavigate();
  const { scanResult, selectedRecycler, setLot, lot } = useApp();
  const [payment, setPayment] = useState("UPI");
  const [created, setCreated] = useState(false);

  if (created) {
    return (
      <div className="screen-pad fade-in" style={{ textAlign: "center", paddingTop: 40 }}>
        <div className="success-burst">
          <Check size={40} />
        </div>
        <h1 className="section-title">Lot Created Successfully</h1>
        <p className="muted" style={{ margin: "8px 0 20px" }}>{lot.id}</p>
        <div className="card" style={{ display: "inline-block", padding: 16 }}>
          <QRCodeSVG value={`https://kabadix.app/lot/${lot.id}`} size={160} />
        </div>
        <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 24 }} onClick={() => navigate("/app/passport")}>
          View Scrap Passport
        </button>
        <button className="btn btn-outline btn-block" style={{ marginTop: 10 }} onClick={() => navigate("/app/handover")}>
          Proceed to Handover
        </button>
      </div>
    );
  }

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Create Scrap Lot" onBack={() => navigate(-1)} />
      <div className="card" style={{ display: "grid", gap: 14 }}>
        <Field label="Material" value={scanResult.material} />
        <Field label="Photo" value="Uploaded ✓" />
        <Field label="Weight" value={`${scanResult.weight} kg`} />
        <Field label="Location" value="GPS detected · Jaipur" />
        <Field label="Fair Value" value={`₹${Math.round((scanResult.fairMin + scanResult.fairMax) / 2)}`} />
        <div>
          <div className="muted" style={{ marginBottom: 6 }}>Preferred Recycler</div>
          <div style={{ fontWeight: 800 }}>{selectedRecycler?.name || "Select recycler"}</div>
          <button className="btn btn-ghost" style={{ padding: 0, minHeight: 32, justifyContent: "flex-start" }} onClick={() => navigate("/app/recyclers")}>
            Change
          </button>
        </div>
        <div>
          <div className="muted" style={{ marginBottom: 8 }}>Payment</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Cash", "UPI"].map((p) => (
              <button key={p} className={`filter-chip${payment === p ? " active" : ""}`} onClick={() => setPayment(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        className="btn btn-green btn-block btn-lg"
        style={{ marginTop: 20 }}
        onClick={() => {
          setLot((l) => ({
            ...l,
            material: scanResult.material,
            weight: scanResult.weight,
            fairValue: Math.round((scanResult.fairMin + scanResult.fairMax) / 2),
            recycler: selectedRecycler?.name || l.recycler,
            payment,
            status: "Verified",
          }));
          setCreated(true);
        }}
      >
        CREATE DIGITAL LOT
      </button>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span className="muted">{label}</span>
      <strong style={{ textAlign: "right" }}>{value}</strong>
    </div>
  );
}

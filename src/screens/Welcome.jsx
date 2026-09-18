import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mic, QrCode } from "lucide-react";
import { Logo } from "../components/UI";
import { useApp } from "../context/AppContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div
      className="fade-in"
      style={{
        minHeight: "100%",
        background: "linear-gradient(165deg, #061628 0%, #0a2540 40%, #0f4c5c 75%, #0d9488 100%)",
        padding: "24px 22px 32px",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo light size="md" />
        <button
          onClick={() => navigate("/language")}
          style={{ fontSize: 12, fontWeight: 700, color: "#99f6e4", background: "rgba(255,255,255,0.1)", padding: "8px 12px", borderRadius: 999 }}
        >
          EN · हि · मरा
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40 }}>
        <div className="brand-hero slide-up">KabadiX</div>
        <p className="slide-up" style={{ marginTop: 12, fontSize: 15, lineHeight: 1.55, color: "#ccfbf1", maxWidth: 300, animationDelay: "0.08s" }}>
          {t.tagline}
        </p>

        <div className="slide-up" style={{ marginTop: 36, display: "grid", gap: 12, animationDelay: "0.15s" }}>
          {[
            { icon: ShieldCheck, text: "Fair Deal AI price shield" },
            { icon: QrCode, text: "Digital Scrap Passport" },
            { icon: Mic, text: "Voice-first Hindi / Marathi" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.08)", padding: "12px 14px", borderRadius: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,197,94,0.25)", display: "grid", placeItems: "center" }}>
                <Icon size={18} color="#86efac" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <button className="btn btn-green btn-block btn-lg" onClick={() => navigate("/language")}>
          {t.getStarted}
        </button>
        <button className="btn btn-outline btn-block" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)", color: "white" }} onClick={() => navigate("/login")}>
          {t.login}
        </button>
      </div>
    </div>
  );
}

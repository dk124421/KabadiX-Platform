import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Logo, PageHeader } from "../components/UI";

const langs = [
  { id: "en", name: "English", native: "English", sample: "Scan E-Waste" },
  { id: "hi", name: "Hindi", native: "हिन्दी", sample: "ई-वेस्ट स्कैन करें" },
  { id: "mr", name: "Marathi", native: "मराठी", sample: "ई-वेस्ट स्कॅन करा" },
];

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Language" onBack={() => navigate("/welcome")} />
      <Logo />
      <p className="muted" style={{ margin: "12px 0 20px" }}>
        Choose your preferred language · भाषा चुनें
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {langs.map((l) => (
          <button key={l.id} className={`lang-card${language === l.id ? " selected" : ""}`} onClick={() => setLanguage(l.id)}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: language === l.id ? "var(--teal)" : "var(--gray-100)",
                color: language === l.id ? "white" : "var(--navy)",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontFamily: "var(--font-display)",
              }}
            >
              {l.native.slice(0, 2)}
            </div>
            <div>
              <div style={{ fontWeight: 800, color: "var(--navy)" }}>{l.native}</div>
              <div className="muted">{l.sample}</div>
            </div>
          </button>
        ))}
      </div>
      <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 24 }} onClick={() => navigate("/role")}>
        Continue
      </button>
    </div>
  );
}

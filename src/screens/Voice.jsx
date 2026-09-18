import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

const commands = [
  { q: "PCB ka aaj ka rate kya hai?", a: { en: "PCB rate today is ₹350–410/kg, up 6.4% this week.", hi: "आज PCB का रेट ₹350–410/kg है, इस हफ्ते 6.4% बढ़ा।", mr: "आज PCB चा दर ₹350–410/kg आहे, या आठवड्यात 6.4% वाढला.", hinglish: "Aaj PCB ka rate ₹350–410/kg hai — 6.4% up this week." } },
  { q: "Nearest recycler kaha hai?", a: { en: "GreenCycle Recycling is 2.4 km away with pickup.", hi: "GreenCycle Recycling 2.4 किमी दूर है, पिकअप उपलब्ध।", mr: "GreenCycle Recycling 2.4 किमी दूर आहे, पिकअप उपलब्ध.", hinglish: "Nearest hai GreenCycle — 2.4 km, pickup available." } },
  { q: "Is offer ka price fair hai?", a: { en: "Offer ₹320/kg is below fair range ₹350–410. Potential extra ₹75.", hi: "ऑफर ₹320/kg फेयर रेंज ₹350–410 से कम है। ₹75 अतिरिक्त कमाई संभव।", mr: "ऑफर ₹320/kg फेर रेंजपेक्षा कमी आहे. ₹75 अतिरिक्त मिळू शकते.", hinglish: "Offer fair nahi hai — local range ₹350–410, extra ₹75 mil sakta hai." } },
  { q: "Mera payment status batao.", a: { en: "Paid ₹21,400 · Pending ₹3,450 across 38 lots.", hi: "भुगतान ₹21,400 · बकाया ₹3,450 · 38 लॉट।", mr: "पेड ₹21,400 · प्रलंबित ₹3,450 · 38 लॉट.", hinglish: "Paid ₹21,400 hai, pending ₹3,450 — total 38 lots." } },
  { q: "Battery ko safely kaise handle karein?", a: { en: "Never puncture or burn batteries. Take to authorized recycler.", hi: "बैटरी में छेद न करें, जलाएँ नहीं। अधिकृत रीसाइक्लर को दें।", mr: "बॅटरीला छिद्र करू नका, जाळू नका. अधिकृत रीसायकलरकडे द्या.", hinglish: "Battery puncture/burn mat karo — authorized recycler ko do." } },
];

export default function Voice() {
  const navigate = useNavigate();
  const { language } = useApp();
  const [listening, setListening] = useState(false);
  const [active, setActive] = useState(null);
  const [replyLang, setReplyLang] = useState(language === "hi" ? "hi" : language === "mr" ? "mr" : "hinglish");

  const ask = (cmd) => {
    setListening(true);
    setActive(null);
    setTimeout(() => {
      setListening(false);
      setActive(cmd);
    }, 1400);
  };

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="Ask KabadiX" onBack={() => navigate("/app")} />

      <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
        <button
          className={`mic-pulse`}
          onClick={() => ask(commands[0])}
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(145deg,#0d9488,#22c55e)",
            color: "white",
            display: "grid",
            placeItems: "center",
            margin: "0 auto",
            boxShadow: "0 16px 40px rgba(13,148,136,0.4)",
          }}
        >
          <Mic size={40} />
        </button>
        <h1 className="section-title" style={{ marginTop: 18 }}>Ask KabadiX</h1>
        <p className="muted">Voice-first · Hindi · Marathi · Hinglish · English</p>
        {listening && (
          <div className="voice-waves" style={{ marginTop: 16 }}>
            <span /><span /><span /><span /><span />
          </div>
        )}
      </div>

      <div className="chip-row" style={{ justifyContent: "center", margin: "12px 0 16px" }}>
        {[
          { id: "hi", label: "हिन्दी" },
          { id: "mr", label: "मराठी" },
          { id: "hinglish", label: "Hinglish" },
          { id: "en", label: "English" },
        ].map((l) => (
          <button key={l.id} className={`filter-chip${replyLang === l.id ? " active" : ""}`} onClick={() => setReplyLang(l.id)}>
            {l.label}
          </button>
        ))}
      </div>

      {active && (
        <div className="card slide-up" style={{ marginBottom: 14, background: "var(--teal-soft)", borderColor: "#99f6e4" }}>
          <div className="muted" style={{ marginBottom: 4 }}>KabadiX</div>
          <div style={{ fontWeight: 700, lineHeight: 1.5 }}>{active.a[replyLang]}</div>
        </div>
      )}

      <div style={{ display: "grid", gap: 8 }}>
        {commands.map((c) => (
          <button key={c.q} className="card" style={{ width: "100%", textAlign: "left", fontWeight: 600, fontSize: 14 }} onClick={() => ask(c)}>
            🎙️ {c.q}
          </button>
        ))}
      </div>
    </div>
  );
}

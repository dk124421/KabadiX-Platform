import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Logo, PageHeader } from "../components/UI";

export default function Login() {
  const navigate = useNavigate();
  const { t, setUser, role } = useApp();
  const [mode, setMode] = useState("phone");
  const [value, setValue] = useState("9876543210");

  const submit = () => {
    setUser((u) => ({ ...u, phone: value, name: role === "recycler" ? "GreenCycle Ops" : "Rahul" }));
    navigate("/otp");
  };

  return (
    <div className="screen-pad fade-in">
      <PageHeader title={t.login} onBack={() => navigate("/role")} />
      <Logo />
      <p className="muted" style={{ margin: "10px 0 20px" }}>Secure OTP login · JWT session</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={`filter-chip${mode === "phone" ? " active" : ""}`} onClick={() => setMode("phone")}>
          <Phone size={14} style={{ marginRight: 4, verticalAlign: -2 }} /> Mobile
        </button>
        <button className={`filter-chip${mode === "email" ? " active" : ""}`} onClick={() => setMode("email")}>
          <Mail size={14} style={{ marginRight: 4, verticalAlign: -2 }} /> Email
        </button>
      </div>

      <label className="muted" style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        {mode === "phone" ? "Mobile Number" : "Email"}
      </label>
      <input
        className="input-field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={mode === "phone" ? "98765 43210" : "you@email.com"}
      />

      <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 20 }} onClick={submit}>
        Send OTP
      </button>
      <button className="btn btn-ghost btn-block" style={{ marginTop: 8 }} onClick={() => navigate("/register")}>
        New user? {t.register}
      </button>
    </div>
  );
}

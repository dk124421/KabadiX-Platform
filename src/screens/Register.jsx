import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Logo, PageHeader } from "../components/UI";

export default function Register() {
  const navigate = useNavigate();
  const { t, role, setUser } = useApp();

  return (
    <div className="screen-pad fade-in">
      <PageHeader title={t.register} onBack={() => navigate("/login")} />
      <Logo />
      <p className="muted" style={{ margin: "10px 0 18px" }}>Quick signup · Role: {role}</p>
      <div style={{ display: "grid", gap: 12 }}>
        <input className="input-field" placeholder="Full Name" defaultValue={role === "recycler" ? "GreenCycle Ops" : "Rahul Kumar"} />
        <input className="input-field" placeholder="Mobile Number" defaultValue="9876543210" />
        <input className="input-field" placeholder="City" defaultValue="Jaipur" />
      </div>
      <button
        className="btn btn-primary btn-block btn-lg"
        style={{ marginTop: 20 }}
        onClick={() => {
          setUser({ name: role === "recycler" ? "GreenCycle Ops" : "Rahul", phone: "98765 43210" });
          navigate("/otp");
        }}
      >
        Verify with OTP
      </button>
    </div>
  );
}

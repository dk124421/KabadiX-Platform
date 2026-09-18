import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PageHeader } from "../components/UI";

export default function OTP() {
  const navigate = useNavigate();
  const { setAuthenticated, role } = useApp();
  const [otp, setOtp] = useState(["1", "4", "8", "2"]);

  const verify = () => {
    setAuthenticated(true);
    navigate(role === "recycler" ? "/recycler" : "/app");
  };

  return (
    <div className="screen-pad fade-in">
      <PageHeader title="OTP Verification" onBack={() => navigate("/login")} />
      <p className="muted" style={{ marginBottom: 8 }}>Enter the 4-digit code sent to</p>
      <p style={{ fontWeight: 800, marginBottom: 24 }}>+91 98765 43210</p>
      <div className="otp-boxes">
        {otp.map((d, i) => (
          <input
            key={i}
            className="otp-box"
            maxLength={1}
            value={d}
            onChange={(e) => {
              const next = [...otp];
              next[i] = e.target.value.slice(-1);
              setOtp(next);
            }}
          />
        ))}
      </div>
      <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 28 }} onClick={verify}>
        Verify & Continue
      </button>
      <p className="muted" style={{ textAlign: "center", marginTop: 14 }}>
        Resend OTP in 00:28
      </p>
    </div>
  );
}

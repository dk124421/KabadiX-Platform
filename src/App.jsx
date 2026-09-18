import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import PhoneShell from "./components/PhoneShell";

import Welcome from "./screens/Welcome";
import LanguageSelect from "./screens/LanguageSelect";
import RoleSelect from "./screens/RoleSelect";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OTP from "./screens/OTP";
import Dashboard from "./screens/Dashboard";
import Scanner from "./screens/Scanner";
import FairDeal from "./screens/FairDeal";
import Passport from "./screens/Passport";
import Recyclers from "./screens/Recyclers";
import RecyclerDetail from "./screens/RecyclerDetail";
import CreateLot from "./screens/CreateLot";
import Handover from "./screens/Handover";
import Earnings from "./screens/Earnings";
import Voice from "./screens/Voice";
import Offline from "./screens/Offline";
import Safety from "./screens/Safety";
import Prices from "./screens/Prices";
import RecyclerDashboard from "./screens/RecyclerDashboard";
import Admin from "./screens/Admin";

function ShellRoutes() {
  const location = useLocation();
  const { role } = useApp();
  const path = location.pathname;
  const showNav = path.startsWith("/app") && role === "collector";
  const darkStatus = path === "/welcome" || path === "/app/scan";

  return (
    <PhoneShell showNav={showNav} darkStatus={darkStatus}>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/scan" element={<Scanner />} />
        <Route path="/app/fair-deal" element={<FairDeal />} />
        <Route path="/app/passport" element={<Passport />} />
        <Route path="/app/recyclers" element={<Recyclers />} />
        <Route path="/app/recycler/:id" element={<RecyclerDetail />} />
        <Route path="/app/create-lot" element={<CreateLot />} />
        <Route path="/app/handover" element={<Handover />} />
        <Route path="/app/earnings" element={<Earnings />} />
        <Route path="/app/voice" element={<Voice />} />
        <Route path="/app/offline" element={<Offline />} />
        <Route path="/app/safety" element={<Safety />} />
        <Route path="/app/prices" element={<Prices />} />
        <Route path="/recycler" element={<RecyclerDashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </PhoneShell>
  );
}

function DemoBar() {
  const { offline, setOffline, role } = useApp();
  return (
    <div className="demo-chrome">
      <span className="demo-chip">SIH Demo · KabadiX</span>
      <span className="demo-chip">
        Role: <strong style={{ color: "#5eead4" }}>{role}</strong>
      </span>
      <span className="demo-chip">
        {offline ? "Offline" : "Online"}
        <button type="button" onClick={() => setOffline((v) => !v)}>
          Toggle
        </button>
      </span>
      <span className="demo-chip">Flow: Login → Scan → Fair Deal → Passport → Handover</span>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <DemoBar />
          <ShellRoutes />
          <p className="desktop-hint">
            High-fidelity mobile prototype for Smart India Hackathon — AI e-waste recycling & digital traceability.
          </p>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

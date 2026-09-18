import { Battery, Signal, Wifi, WifiOff } from "lucide-react";
import { useApp } from "../context/AppContext";
import BottomNav from "./BottomNav";

export default function PhoneShell({ children, darkStatus = false, showNav = true }) {
  const { offline } = useApp();
  const time = "10:14";

  return (
    <div className="phone-frame">
      <div className="phone-notch" />
      <div className={`phone-status${darkStatus ? " dark" : ""}`}>
        <span>{time}</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {offline ? <WifiOff size={14} /> : <Wifi size={14} />}
          <Signal size={14} />
          <Battery size={16} />
        </div>
      </div>
      <div className="phone-body">
        <div className={`screen-scroll${showNav ? "" : " no-nav"}`}>{children}</div>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

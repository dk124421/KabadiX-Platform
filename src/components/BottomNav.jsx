import { NavLink, useLocation } from "react-router-dom";
import { Home, ScanLine, IndianRupee, MapPinned, Fingerprint } from "lucide-react";
import { useApp } from "../context/AppContext";

const collectorTabs = [
  { to: "/app", end: true, icon: Home, labelKey: "home", fallback: "Home" },
  { to: "/app/scan", icon: ScanLine, labelKey: "scan", fallback: "Scan" },
  { to: "/app/prices", icon: IndianRupee, labelKey: "prices", fallback: "Prices" },
  { to: "/app/recyclers", icon: MapPinned, labelKey: "recycle", fallback: "Recycler" },
  { to: "/app/passport", icon: Fingerprint, labelKey: "passport", fallback: "Passport" },
];

export default function BottomNav() {
  const { t, role } = useApp();
  const location = useLocation();

  if (role !== "collector") return null;

  const hideOn = [
    "/welcome",
    "/login",
    "/register",
    "/otp",
    "/language",
    "/role",
  ];
  if (hideOn.some((p) => location.pathname.startsWith(p))) return null;
  if (!location.pathname.startsWith("/app")) return null;

  return (
    <nav className="bottom-nav">
      {collectorTabs.map(({ to, end, icon: Icon, labelKey, fallback }) => {
        const short =
          labelKey === "scan"
            ? "Scan"
            : labelKey === "prices"
              ? "Prices"
              : labelKey === "passport"
                ? "Passport"
                : t[labelKey] || fallback;
        return (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            <Icon strokeWidth={2.2} />
            <span>{short}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

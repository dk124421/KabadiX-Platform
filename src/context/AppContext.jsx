import { createContext, useContext, useMemo, useState } from "react";

const translations = {
  en: {
    tagline: "From Informal Collection to Fair, Safe & Traceable Recycling.",
    welcome: "Welcome to KabadiX",
    getStarted: "Get Started",
    login: "Login",
    register: "Register",
    scan: "Scan E-Waste",
    prices: "Check Prices",
    findRecycler: "Find Recycler",
    passport: "My Scrap Passport",
    transactions: "My Transactions",
    todayEarnings: "Today's Earnings",
    pendingPayments: "Pending Payments",
    totalLots: "Total Lots",
    askKabadiX: "Ask KabadiX",
    offline: "Offline Mode",
    home: "Home",
    recycle: "Recycler",
  },
  hi: {
    tagline: "अनौपचारिक संग्रह से निष्पक्ष, सुरक्षित और ट्रेसबल रीसाइक्लिंग तक।",
    welcome: "कबडीएक्स में आपका स्वागत है",
    getStarted: "शुरू करें",
    login: "लॉगिन",
    register: "रजिस्टर",
    scan: "ई-वेस्ट स्कैन करें",
    prices: "कीमत देखें",
    findRecycler: "रीसाइक्लर खोजें",
    passport: "मेरा स्क्रैप पासपोर्ट",
    transactions: "मेरे लेनदेन",
    todayEarnings: "आज की कमाई",
    pendingPayments: "बकाया भुगतान",
    totalLots: "कुल लॉट",
    askKabadiX: "कबडीएक्स से पूछें",
    offline: "ऑफ़लाइन मोड",
    home: "होम",
    recycle: "रीसाइक्लर",
  },
  mr: {
    tagline: "अनौपचारिक संकलनापासून निष्पक्ष, सुरक्षित आणि ट्रेसेबल रीसायक्लिंगपर्यंत.",
    welcome: "कबडीएक्समध्ये आपले स्वागत आहे",
    getStarted: "सुरू करा",
    login: "लॉगिन",
    register: "नोंदणी",
    scan: "ई-वेस्ट स्कॅन करा",
    prices: "किंमत पाहा",
    findRecycler: "रीसायकलर शोधा",
    passport: "माझा स्क्रॅप पासपोर्ट",
    transactions: "माझे व्यवहार",
    todayEarnings: "आजची कमाई",
    pendingPayments: "प्रलंबित पेमेंट",
    totalLots: "एकूण लॉट",
    askKabadiX: "कबडीएक्सला विचारा",
    offline: "ऑफलाइन मोड",
    home: "होम",
    recycle: "रीसायकलर",
  },
};

const recyclers = [
  {
    id: "gc",
    name: "GreenCycle Recycling",
    distance: 2.4,
    price: 395,
    pickup: true,
    score: 91,
    materials: ["PCB", "Cable", "Battery", "LCD"],
    area: "Jaipur Central",
    response: "12 min",
    authorized: true,
  },
  {
    id: "er",
    name: "EcoRecycle Hub",
    distance: 4.8,
    price: 385,
    pickup: true,
    score: 86,
    materials: ["PCB", "Motor", "Magnet", "Mixed Plastic"],
    area: "Sitapura",
    response: "18 min",
    authorized: true,
  },
  {
    id: "ur",
    name: "UrbanScrap Authorized",
    distance: 6.1,
    price: 370,
    pickup: false,
    score: 79,
    materials: ["CRT", "LCD", "Cable"],
    area: "Malviya Nagar",
    response: "35 min",
    authorized: true,
  },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [role, setRole] = useState("collector");
  const [user, setUser] = useState({ name: "Rahul", phone: "98765 43210" });
  const [authenticated, setAuthenticated] = useState(false);
  const [offline, setOffline] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const [scanResult, setScanResult] = useState({
    material: "PCB",
    confidence: 94,
    weight: 2.5,
    fairMin: 875,
    fairMax: 1000,
    trend: 6.4,
    photo: null,
  });
  const [lot, setLot] = useState({
    id: "KDX-2026-00482",
    material: "PCB",
    weight: 2.5,
    location: "Jaipur",
    fairValue: 950,
    date: "18 Sep 2026",
    recycler: "GreenCycle Recycling",
    status: "Verified",
    payment: "UPI",
  });
  const [selectedRecycler, setSelectedRecycler] = useState(recyclers[0]);
  const [handoverDone, setHandoverDone] = useState(false);

  const t = translations[language] || translations.en;

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      role,
      setRole,
      user,
      setUser,
      authenticated,
      setAuthenticated,
      offline,
      setOffline,
      syncDone,
      setSyncDone,
      scanResult,
      setScanResult,
      lot,
      setLot,
      selectedRecycler,
      setSelectedRecycler,
      handoverDone,
      setHandoverDone,
      recyclers,
      t,
      translations,
    }),
    [
      language,
      role,
      user,
      authenticated,
      offline,
      syncDone,
      scanResult,
      lot,
      selectedRecycler,
      handoverDone,
      t,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

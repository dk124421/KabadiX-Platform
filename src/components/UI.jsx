export function Logo({ light = false, size = "md" }) {
  const fontSize = size === "lg" ? 28 : 18;
  const icon = size === "lg" ? 44 : 34;
  return (
    <div className="logo-mark" style={{ color: light ? "#fff" : "var(--navy)", fontSize }}>
      <div className="logo-icon" style={{ width: icon, height: icon, borderRadius: size === "lg" ? 14 : 10 }}>
        <svg width={size === "lg" ? 24 : 18} height={size === "lg" ? 24 : 18} viewBox="0 0 24 24" fill="none">
          <path d="M7 14a5 5 0 0 1 10 0" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="8" r="2.5" fill="white" />
          <path d="M8 18h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      KabadiX
    </div>
  );
}

export function CircularScore({ score = 91, size = 140, label = "Score" }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="circular-score" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="score-text">
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size * 0.22, color: "var(--navy)" }}>
            {score}
          </div>
          <div style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>{label}</div>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({ title, onBack, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {onBack && (
          <button
            onClick={onBack}
            className="btn-outline"
            style={{ width: 40, height: 40, minHeight: 40, borderRadius: 12, padding: 0, border: "1.5px solid var(--gray-200)", background: "white" }}
            aria-label="Back"
          >
            ←
          </button>
        )}
        <h1 className="section-title" style={{ fontSize: 20, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </h1>
      </div>
      {right}
    </div>
  );
}

import { FEATURES } from "../../data/homeData";
import "../../styles/Aiplanner.css";

export default function AIPlanner({ search, onSearchChange, onPlanClick }) {
  const fields = [
    { label: "🌴 Destination",   key: "dest",      placeholder: "e.g. Galle Fort, Mirissa…" },
    { label: "📅 Travel Dates",  key: "dates",     placeholder: "e.g. Dec 15 – Dec 22" },
    { label: "💰 Budget Range",  key: "budget",    placeholder: "e.g. $200–$500/night" },
    { label: "🎯 Interests",     key: "interests", placeholder: "e.g. Surf, Wildlife, Food…" },
  ];

  return (
    <section
      id="section-ai-planner"
      className="section"
      style={{ borderTop: "1px solid rgba(0,30,64,0.07)" }}
    >
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
        <p className="center-sub" style={{ marginBottom: 12 }}>Powered by Claude AI</p>
        <h2 className="section-title center-title" style={{ marginBottom: 16 }}>
          Plan Your Dream Trip
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>
          Tell us where you want to go, when, and what you love — our AI crafts a
          bespoke itinerary just for you in seconds.
        </p>
      </div>

      <div className="planner-form-card">
        <div className="planner-form-grid">
          {fields.map((f) => (
            <div key={f.key} className="form-field">
              <label className="form-label">{f.label}</label>
              <input
                className="form-input"
                placeholder={f.placeholder}
                value={search[f.key]}
                onChange={(e) =>
                  onSearchChange((s) => ({ ...s, [f.key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn-hero" style={{ marginTop: 8 }} onClick={onPlanClick}>
            ✦ Generate My Itinerary
          </button>
        </div>
      </div>

      <div className="features-grid" style={{ marginTop: 80 }}>
        {FEATURES.map((f) => {
          const iconColor =
            f.color === "#a7c8ff" ? "#1f477b"
            : f.color === "#76f3ea" ? "#006a65"
            : "#763300";
          return (
            <div key={f.title} className="feature-item">
              <div
                className="feature-icon-wrap"
                style={{ background: f.color + "22" }}
              >
                <span style={{ color: iconColor, fontSize: 28 }}>{f.icon}</span>
              </div>
              <h4 className="feature-title">{f.title}</h4>
              <p className="feature-desc">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
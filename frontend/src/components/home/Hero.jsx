import "../../styles/Hero.css";

export default function Hero({ search, onSearchChange, onPlanClick, onNavClick }) {
  const fields = [
    { label: "Destination", key: "dest",      placeholder: "Where to?" },
    { label: "Dates",       key: "dates",     placeholder: "Add dates" },
    { label: "Budget",      key: "budget",    placeholder: "Set range" },
    { label: "Interests",   key: "interests", placeholder: "Surf, Food…" },
  ];

  return (
    <section id="section-home" className="hero">
      <img
        className="hero-img"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF5w5yNOOET57GYfoJxg6F6-EqanWRfh8Svkio0siIU4nzOzQEW7T1oRGfM6v0OCVFA8MoqLiIoyDvb8w9orfFd9JdjaZ5pyYDXMtideU3FvosyCLe8LB5XGtmd5B0o5SnJ3koI5yYgvO4ZxGu_0MY-HX-FIawWCQIyjAnJGVg-BKYyWRam3V5EYLq-0iufWjZxoLjQcuJoXthHIxFYhjpjEb1Nv9MhhPHCtTV2MHLLAuMNQ4p2FasS5X1dpKqKcGDniF4BNVZydU"
        alt="Southern Sri Lanka beach aerial view"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title fade-up">
          Discover Down South Sri Lanka, Smarter with AI
        </h1>
        <p className="hero-sub fade-up fade-up-d1">
          Your personal gateway to luxury coastal living. We curate bespoke
          experiences from Tangalle to Bentota using cutting-edge intelligence.
        </p>
        <button
          className="btn-hero fade-up fade-up-d2"
          onClick={() => onNavClick("AI Planner")}
        >
          Start Your Journey
        </button>

        <div className="search-bar fade-up fade-up-d3">
          {fields.map((f) => (
            <div key={f.key} className="search-field">
              <div className="search-label">{f.label}</div>
              <input
                className="search-input"
                placeholder={f.placeholder}
                value={search[f.key]}
                onChange={(e) =>
                  onSearchChange((s) => ({ ...s, [f.key]: e.target.value }))
                }
              />
            </div>
          ))}
          <button className="btn-search" onClick={onPlanClick}>
            ✦ Plan Now
          </button>
        </div>
      </div>
    </section>
  );
}
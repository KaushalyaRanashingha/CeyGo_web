import { useNavigate } from "react-router-dom";
import { DESTINATIONS } from "../../data/homeData";
import "../../styles/Destinations.css";

export default function Destinations({ onSearchChange, onPlanClick }) {
  const navigate = useNavigate();

  return (
    <section id="section-destinations" className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Iconic Coastal Escapes</h2>
          <p className="section-sub">Voted most luxurious by our global community</p>
        </div>
        <button className="link-view-all" onClick={() => navigate("/destinations")}>
          View All →
        </button>
      </div>

      <div className="bento-grid">
        {DESTINATIONS.map((d) => (
          <div key={d.name} className={`dest-card${d.large ? " large" : ""}`}>
            <img src={d.img} alt={d.name} />
            <div className="dest-overlay" />
            <div className="dest-info">
              {d.large ? (
                <>
                  <div>
                    <span className="dest-badge">{d.tag}</span>
                    <span className="dest-rating">★ {d.rating}</span>
                  </div>
                  <h3 className="dest-name">{d.name}</h3>
                  <p className="dest-desc">
                    {d.desc} Best season: {d.season}.
                  </p>
                  <button
                    className="btn-outline-white"
                    onClick={() => {
                      onSearchChange((s) => ({ ...s, dest: d.name }));
                      onPlanClick();
                    }}
                  >
                    Quick Explore
                  </button>
                </>
              ) : (
                <>
                  <h4 className="dest-name">{d.name}</h4>
                  <p className="dest-season">
                    {d.tag} • {d.season}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
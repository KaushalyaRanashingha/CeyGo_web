import { HOTELS, ATTRACTIONS } from "../../data/homeData";
import "../../styles/Curatedstays.css";

export default function CuratedStays() {
  return (
    <div id="section-beach-stays" className="bg-subtle">
      <div className="curated-section">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="center-sub">Handpicked Selections</p>
          <h2 className="section-title">Curated Stays &amp; Local Gems</h2>
        </div>

        <div className="curated-grid">
          {/* Hotels */}
          <div>
            <h3 className="curated-col-title">
              <span>🏨</span> Premium Beach Stays
            </h3>
            {HOTELS.map((h) => (
              <div key={h.name} className="card-row">
                <div className="card-thumb">
                  <img src={h.img} alt={h.name} />
                </div>
                <div className="card-body">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="card-name">{h.name}</span>
                    <span className="card-price">{h.price}</span>
                  </div>
                  <div className="stars">
                    {"★".repeat(h.stars)}{"☆".repeat(5 - h.stars)}
                  </div>
                  <p className="card-desc">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Attractions */}
          <div>
            <h3 className="curated-col-title">
              <span>🧭</span> Unmissable Experiences
            </h3>
            {ATTRACTIONS.map((a) => (
              <div key={a.name} className="card-row">
                <div className="card-thumb">
                  <img src={a.img} alt={a.name} />
                </div>
                <div className="card-body">
                  <span className="card-name">{a.name}</span>
                  <p className="card-tag">
                    {a.icon} {a.tag}
                  </p>
                  <p className="card-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
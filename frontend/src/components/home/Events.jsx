import { EVENTS } from "../../data/homeData";
import "../../styles/Events.css";

export default function Events({ onSearchChange, onPlanClick }) {
  return (
    <section id="section-events" className="events-section">
      <div className="events-inner">
        <h2 className="section-title center-title" style={{ marginBottom: 48 }}>
          The Pulse of the South
        </h2>
        <div className="events-grid">
          {EVENTS.map((ev) => (
            <div key={ev.name} className="event-card">
              <div className="event-img-wrap">
                <img src={ev.img} alt={ev.name} />
                <span className="event-date">{ev.dates}</span>
              </div>
              <div className="event-body">
                <h3 className="event-name">{ev.name}</h3>
                <p className="event-desc">{ev.desc}</p>
                <button
                  className="btn-event"
                  onClick={() => {
                    onSearchChange((s) => ({ ...s, interests: ev.name }));
                    onPlanClick();
                  }}
                >
                  Plan Around This Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { TESTIMONIALS } from "../../data/homeData";
import "../../styles/Testimonials.css";

export default function Testimonials() {
  return (
    <div className="testimonials-section">
      <div className="testimonials-inner">
        <h2 className="testimonials-title">Loved by Explorers</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={t.img} alt={t.name} />
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-country">{t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
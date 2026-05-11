import { useState } from "react";
import { NAV_LINKS, SECTION_IDS } from "../../data/homeData";
import "../../styles/Footer.css";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNavClick = (label) => scrollToSection(SECTION_IDS[label]);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo" onClick={() => handleNavClick("Home")}>
            CeyGo
          </div>
          <p className="footer-tagline">
            The ultimate AI travel companion for discovering the hidden gems of
            Southern Sri Lanka's coastline.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {["f", "📷", "@"].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{ color: "var(--muted)", fontSize: 18, textDecoration: "none" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {["Destinations", "Beach Stays", "AI Planner", "Events"].map((l) => (
                <li key={l}>
                  <a onClick={() => handleNavClick(l)}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Media Kit</a></li>
              <li><a href="#">Partner Login</a></li>
              <li><a onClick={() => handleNavClick("Contact")}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Newsletter</h5>
            <div className="newsletter-form">
              <input
                className="newsletter-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn-newsletter">→</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © 2026 CeyGo Luxury Travel. Southern Sri Lanka's Premier Retreat Specialist.
        </p>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>🌐 English (US)</span>
      </div>
    </footer>
  );
}
import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import '../styles/Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            CeyGo<span className="footer-logo-dot">.</span>
          </div>
          <p className="footer-description">
            Curating exceptional journeys through the heart of Sri Lanka since 2026.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-column-title">Explore</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Destinations</a></li>
            <li><a href="#" className="footer-link">Experiences</a></li>
            <li><a href="#" className="footer-link">Hotels & Resorts</a></li>
            <li><a href="#" className="footer-link">Travel Guides</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-column-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Sustainability</a></li>
            <li><a href="#" className="footer-link">Press</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-column-title">Follow Us</h4>
          <div className="footer-social">
            <a href="#" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-icon">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 CeyGo Travel Magazine. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">Privacy Policy</a>
          <a href="#" className="footer-bottom-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

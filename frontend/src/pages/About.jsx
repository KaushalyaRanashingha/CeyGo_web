import React from 'react'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import '../styles/About.css'

export default function About() {
  return (
    <div className="about-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="about-hero">
        <div className="about-hero-background">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=1600&q=80"
            alt="Southern Coastline of Sri Lanka"
            className="about-hero-image"
          />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            About <span className="about-hero-title-highlight">CeyGo</span>
          </h1>
          <p className="about-hero-subtitle">
            For travelers seeking the best of Sri Lanka's southern region — pristine beaches, hidden waterfalls, and authentic local culture.
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="about-story">
        <div className="about-story-container">
          <div className="about-story-image">
            <img
              src="https://tse1.explicit.bing.net/th/id/OIP.8XLTtaqz7Gs-9Uuol917IgHaHa?pid=ImgDet&w=182&h=182&c=7&dpr=1.1&o=7&rm=3"
              alt="Southern Sri Lanka"
            />
          </div>
          <div className="about-story-content">
            <h2>Our Story</h2>
            <p>
              CeyGo Down South is dedicated to travelers who want to explore the southern gems of Sri Lanka. From golden beaches in Mirissa, to the colonial streets of Galle, and wildlife adventures in Yala National Park, we curate experiences designed for discovery.
            </p>
            <p>
              Every itinerary is crafted with care by locals who know the region best, making sure your journey is authentic, safe, and unforgettable.
            </p>
            <Link to="/contact" className="about-story-link">
              Contact Us <ArrowRight className="about-story-link-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="about-mission">
        <div className="about-mission-container">
          <h2>Our Mission</h2>
          <p>
            To guide travelers through the wonders of Southern Sri Lanka, combining adventure, culture, and natural beauty for truly memorable trips.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-values">
        <div className="about-values-container">
          <h2>Our Values</h2>
          <div className="about-values-grid">
            <div className="value-card">
              <h3>Authenticity</h3>
              <p>We show the real South Sri Lanka, not just the tourist spots.</p>
            </div>
            <div className="value-card">
              <h3>Nature</h3>
              <p>Beaches, jungles, waterfalls — we highlight the region’s natural beauty.</p>
            </div>
            <div className="value-card">
              <h3>Adventure</h3>
              <p>Surfing, safaris, hiking — experiences tailored for explorers.</p>
            </div>
            <div className="value-card">
              <h3>Culture</h3>
              <p>Engage with local communities, cuisine, and southern traditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [userLocation, setUserLocation] = useState({ lat: 6.9271, lng: 79.8612 }) // default Colombo

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => console.warn('Geolocation error:', error)
      )
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="contact-hero">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=1600&q=80"
          alt="Southern Sri Lanka Coast"
          className="contact-hero-image"
        />
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1>Contact <span className="highlight">CeyGo</span></h1>
          <p>Reach out for your southern adventures or travel queries.</p>
        </div>
      </header>

      {/* Contact Info & Form */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info-wrapper">
            <h2>Contact Info</h2>
            <p><strong>Email:</strong> info@ceygo.com</p>
            <p><strong>Phone:</strong> +94 70 162 7346</p>
            <p><strong>Address:</strong> Colombo, Sri Lanka</p>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Your Current Location</h2>
        <iframe
          title="User Location Map"
          src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

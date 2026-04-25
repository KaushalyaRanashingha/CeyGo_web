import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  X,
  Send,
  ArrowRight,
  Palmtree,
  Compass,
  Map,
  Camera,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Home.css'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Features data
  const features = [
    {
      icon: Compass,
      title: 'Curated Expeditions',
      description:
        'Discover hidden gems and secret paths known only to locals, carefully selected for the discerning traveler.',
    },
    {
      icon: Map,
      title: 'Heritage Trails',
      description:
        'Walk through centuries of history, from ancient kingdoms to colonial fortresses that whisper tales of the past.',
    },
    {
      icon: Camera,
      title: 'Visual Narratives',
      description:
        'Capture the soul of the island through guided photography tours in the most photogenic landscapes on earth.',
    },
  ]

  // Destinations data
  const destinations = [
    {
      id: 1,
      title: 'The Ancient Rock',
      location: 'Sigiriya',
      image:
        'https://th.bing.com/th/id/R.5e8702ae029249fe3cd7e43a5970d4cd?rik=WI77UCzcg8pplA&pid=ImgRaw&r=0',
      size: 'large',
      description: 'A fortress in the sky, rising dramatically from the central plains.',
    },
    {
      id: 2,
      title: 'Coastal Serenity',
      location: 'Mirissa',
      image:
        'https://tse1.mm.bing.net/th/id/OIP.97IU5VojxDkcf08bBRbmmAHaJ4?w=768&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3',
      size: 'tall',
      description: 'Where golden sands meet the gentle roll of the Indian Ocean.',
    },
    {
      id: 3,
      title: 'The Hill Country',
      location: 'Ella',
      image:
        'https://tse1.mm.bing.net/th/id/OIP.62IFv4Cb5O9rHvmmo67XBgHaEH?w=900&h=500&rs=1&pid=ImgDetMain&o=7&rm=3',
      size: 'wide',
      description: 'Misty tea plantations stretching as far as the eye can see.',
    },
    {
      id: 4,
      title: 'Colonial Charm',
      location: 'Galle Fort',
      image:
        'https://tse2.mm.bing.net/th/id/OIP.q0vitNpsu3jkWkY0Tx6fvAHaE-?w=1500&h=1009&rs=1&pid=ImgDetMain&o=7&rm=3',
      size: 'standard',
      description: 'Cobblestone streets lined with Dutch-colonial architecture.',
    },
    {
      id: 5,
      title: 'Wild Yala',
      location: 'Yala National Park',
      image:
        'https://tse2.mm.bing.net/th/id/OIP.9crgEZCDpNEw38A2wLS4VQHaD2?rs=1&pid=ImgDetMain&o=7&rm=3',
      size: 'standard',
      description: 'Home to the highest density of leopards in the world.',
    },
  ]

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-background">
          <img
            src="https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/11/20172343/sigiriya.jpg"
            alt="Sigiriya Rock Fortress"
            className="hero-image"
          />
          <div className="hero-overlay-1"></div>
          <div className="hero-overlay-2"></div>
        </div>

        <div className="hero-content">
          <span className="hero-subtitle">The Pearl of the Indian Ocean</span>
          <h1 className="hero-title">
            Discover the Soul <br />
            <span className="hero-title-italic">Sri Lanka</span>
          </h1>
          <p className="hero-description">
            A journey through misty tea plantations, golden coastlines, and ancient cities that whisper stories of a bygone era.
          </p>
          <div className="hero-button-container">
            <Link to="/login" className="hero-button">
              Start Exploring
              <span className="hero-button-underline"></span>
            </Link>
          </div>
        </div>

        {/* Chatbot */}
        <div className="chatbot-button" onClick={() => setIsChatOpen(!isChatOpen)}>
          <MessageCircle size={26} />
        </div>

        {isChatOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <span>CeyGo Assistant</span>
              <X onClick={() => setIsChatOpen(false)} />
            </div>
            <div className="chatbot-messages">
              <div className="chat-message bot">
                👋 Hi! How can I help you explore Sri Lanka?
              </div>
            </div>
            <div className="chatbot-input">
              <input placeholder="Type your message..." />
              <button>
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/*  Narrative Section (ADDED HERE) */}
      <section className="narrative-section">
        <div className="narrative-container">
          <div className="narrative-image-container">
            <div className="narrative-image-wrapper">
              <img
                src="https://tse1.explicit.bing.net/th/id/OIP.qHgFXjq66Qw7P-2zjul9xwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Sri Lankan Culture"
                className="narrative-image"
              />
            </div>
            <div className="narrative-decoration-1"></div>
            <div className="narrative-decoration-2"></div>
          </div>

          <div className="narrative-content">
            <h2 className="narrative-title">
              Where Time <span className="narrative-title-highlight">Stands Still</span>
            </h2>

            <div className="narrative-text">
              <p className="narrative-paragraph">
                <span className="drop-cap">S</span>
                ri Lanka is not just a destination; it is a feeling. It is the
                warmth of the tropical sun on your skin, the scent of cinnamon
                in the air, and the rhythmic sound of waves crashing against the
                shore.
              </p>

              <p className="narrative-paragraph">
                From the sacred city of Kandy to the colonial ramparts of Galle,
                every corner of this island nation tells a story. We invite you
                to step off the beaten path and immerse yourself in a culture
                that celebrates life in its most vibrant forms.
              </p>

              <div className="narrative-link-container">
                <Link to="/about" className="narrative-link">
                  Read Our Story
                  <ArrowRight className="narrative-link-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">The Art of Exploration</h2>
          <div className="features-grid">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Icon className="feature-icon" strokeWidth={1.5} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations-section">
        <h2 className="section-title">Visual Journey</h2>
        <div className="destinations-grid">
          {destinations.map(dest => (
            <div key={dest.id} className={`destination-card ${dest.size}`}>
              <img src={dest.image} alt={dest.title} className="destination-image" />
              <div className="destination-content">
                <span className="destination-location">{dest.location}</span>
                <h3 className="destination-title">{dest.title}</h3>
                <p className="destination-description">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          <Palmtree className="quote-icon" strokeWidth={1} />
          <blockquote className="quote-text">
            "The world is a book and those who do not travel read only one page."
          </blockquote>
          <cite className="quote-author">— St. Augustine</cite>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

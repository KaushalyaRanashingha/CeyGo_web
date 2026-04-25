import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  X,
  Send,
  Compass,
  Map,
  Camera,
  ArrowRight,
  Menu,
  Instagram,
  Twitter,
  Facebook,
  Palmtree
} from 'lucide-react';
import '../styles/LandingPage.css';
import Footer from '../components/Footer'
import { askAI } from "../api/chatApi";

// Chatbot States
const [messages, setMessages] = useState([
  { text: "👋 Hi! I'm CeyGo Assistant. How can I help you explore Sri Lanka?", sender: "bot" }
]);

const [input, setInput] = useState("");
const [bookingStep, setBookingStep] = useState(null);
const [transportStep, setTransportStep] = useState(null);


// Send Message
const sendMessage = () => {
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  setMessages(prev => [...prev, userMessage]);

  const reply = getBotReply(input);

  setTimeout(() => {
    setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
  }, 500);

  setInput("");
};


// Bot Reply Logic
const getBotReply = (message) => {
  const msg = message.toLowerCase();

  // Map suggestion
  if (msg.includes("map") || msg.includes("places")) {
    return "🗺️ Popular places: Sigiriya, Ella, Mirissa, Galle";
  }

  // Hotel Booking
  if (msg.includes("hotel") || msg.includes("book")) {
    setBookingStep("city");
    return "🏨 Which city would you like to book?";
  }

  if (bookingStep === "city") {
    setBookingStep("date");
    return "📅 What is your travel date?";
  }

  if (bookingStep === "date") {
    setBookingStep(null);
    return "💳 Booking ready. Click Pay Now";
  }

  // Transport
  if (msg.includes("transport") || msg.includes("taxi")) {
    setTransportStep("pickup");
    return "🚕 Where should we pick you up?";
  }

  if (transportStep === "pickup") {
    setTransportStep("destination");
    return "📍 Where is your destination?";
  }

  if (transportStep === "destination") {
    setTransportStep(null);
    return "✅ Transport booked successfully!";
  }

  return "😊 I can help with hotels, transport, and travel suggestions.";
};

// Menu items
const menuItems = [
  { name: "Destinations", path: "/locations" },
  { name: "Experiences", path: "/experiences" },
  { name: "Journal", path: "/journal" },
  { name: "About", path: "/about" },
];

// Features
const features = [
  {
    icon: Compass,
    title: 'Curated Expeditions',
    description: 'Discover hidden gems and secret paths known only to locals, carefully selected for the discerning traveler.',
  },
  {
    icon: Map,
    title: 'Heritage Trails',
    description: 'Walk through centuries of history, from ancient kingdoms to colonial fortresses that whisper tales of the past.',
  },
  {
    icon: Camera,
    title: 'Visual Narratives',
    description: 'Capture the soul of the island through guided photography tours in the most photogenic landscapes on earth.',
  },
];

// Destinations
const destinations = [
  {
  id: 1,
  title: 'Moon Gallery',
  location: 'Galle Fort',
  image: 'https://tse1.mm.bing.net/th/id/OIP.XSDjC09CwRgKmD-f51-qMAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
  size: 'large',
  description: 'A contemporary art gallery inside Galle Fort, showcasing Sri Lankan and international artists in a beautifully restored colonial building.',
},

  {
    id: 2,
    title: 'Coastal Serenity',
    location: 'Mirissa',
    image: 'https://tse1.mm.bing.net/th/id/OIP.97IU5VojxDkcf08bBRbmmAHaJ4?w=768&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3',
    size: 'tall',
    description: 'Where golden sands meet the gentle roll of the Indian Ocean.',
  },
 {
  id: 3,
  title: 'Paravi Duwa Temple',
  location: 'Unawatuna',
  image: 'https://tse4.mm.bing.net/th/id/OIP.KD3FaAvFLJY9w2PY6f8_cwHaFG?rs=1&pid=ImgDetMain&o=7&rm=3',
  size: 'wide',
  description: 'A serene Buddhist temple on a small island, connected by a bridge and surrounded by the Indian Ocean.',
},

  {
    id: 4,
    title: 'Colonial Charm',
    location: 'Galle Fort',
    image: 'https://tse2.mm.bing.net/th/id/OIP.q0vitNpsu3jkWkY0Tx6fvAHaE-?w=1500&h=1009&rs=1&pid=ImgDetMain&o=7&rm=3',
    size: 'standard',
    description: 'Cobblestone streets lined with Dutch-colonial architecture.',
  },
  {
  id: 5,
  title: 'Sella Kataragama',
  location: 'Kataragama',
  image: 'https://as2.ftcdn.net/v2/jpg/06/73/80/37/1000_F_673803756_UXKzMA6MlZJI2NI4rWzXGzgr7qbkY4oj.jpg',
  size: 'standard',
  description: 'A sacred river-side pilgrimage site known for its serene atmosphere and deep spiritual significance.',
},

];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            CeyGo<span className="logo-dot">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu-desktop">
            {menuItems.map((item) => (
              <Link key={item.name} to={item.path} className="nav-link">
                {item.name}
                <span className="nav-link-underline"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="nav-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-background">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.4VTaNMphby3z9o3kOD0pVAHaE8?pid=ImgDet&w=474&h=316&rs=1&o=7&rm=3"
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

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
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
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  {msg.text}

                  {msg.text.includes("Pay Now") && (
                  <button className="pay-btn">
                      Pay Now 💳
                  </button>
                )}

        </div>
      ))}
    </div>

    <div className="chatbot-input">
      <input
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>
        <Send size={18} />
      </button>
    </div>

  </div>
)}
      </header>


      {/* Narrative Section */}
      <section className="narrative-section">
        <div className="narrative-container">
          <div className="narrative-image-container">
            <div className="narrative-image-wrapper">
              <img
                src="https://th.bing.com/th/id/OIP.0XkO18MrTvwwUDsR97s5swHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Sri Lankan Culture"
                className="narrative-image"
              />
            </div>
            <div className="narrative-decoration-1"></div>
            <div className="narrative-decoration-2"></div>
          </div>

          <div className="narrative-content">
            <h2 className="narrative-title">
              Where Time{' '}
              <span className="narrative-title-highlight">Stands Still</span>
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
                <a
                  href="/about"
                  className="narrative-link"
                >
                  Read Our Story{' '}
                  <ArrowRight className="narrative-link-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <span className="features-subtitle">
              Why Travel With Us
            </span>
            <h2 className="features-title">
              The Art of Exploration
            </h2>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Icon
                      className="feature-icon"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Masonry */}
      <section className="destinations-section">
        <div className="destinations-header">
          <div className="destinations-header-left">
            <span className="destinations-subtitle">
              Curated Destinations
            </span>
            <h2 className="destinations-title">
              Visual Journey
            </h2>
          </div>
          <div className="destinations-header-right">
            <a
              href="/locations"
              className="destinations-view-all"
            >
              View All Locations
            </a>
          </div>
        </div>

        <div className="destinations-grid">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className={`destination-card ${dest.size}`}
            >
              <div className="destination-overlay"></div>
              <img
                src={dest.image}
                alt={dest.title}
                className="destination-image"
              />

              <div className="destination-content">
                <span className="destination-location">
                  {dest.location}
                </span>
                <h3 className="destination-title">{dest.title}</h3>
                <p className="destination-description">
                  {dest.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="destinations-mobile-link">
          <a
            href="#"
            className="destinations-mobile-button"
          >
            View All Locations
          </a>
        </div>
      </section>

      {/* Quote / Editorial Break */}
      <section className="quote-section">
        <div className="quote-container">
          <Palmtree
            className="quote-icon"
            strokeWidth={1}
          />
          <blockquote className="quote-text">
            "The world is a book and those who do not travel read only one
            page."
          </blockquote>
          <cite className="quote-author">
            — St. Augustine
          </cite>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-decoration"></div>

        <div className="newsletter-container">
          <h2 className="newsletter-title">
            Join Our Voyage
          </h2>
          <p className="newsletter-description">
            Receive curated travel stories, hidden gems, and exclusive offers
            directly to your inbox.
          </p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button
              type="submit"
              className="newsletter-button"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
            <Footer />
    </div>
  );
}
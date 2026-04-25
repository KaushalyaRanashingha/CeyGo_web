import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'
import '../styles/Navbar.css'

const menuItems = [
  { name: 'Destinations', path: '/locations' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'Journal', path: '/journal' },
  { name: 'About', path: '/about' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo (LEFT) */}
        <div className="nav-logo">
          CeyGo<span className="logo-dot">.</span>
        </div>

        {/* RIGHT SIDE: Links + Profile */}
        <div className="nav-right">
          {/* Desktop Menu */}
          <div className="nav-menu-desktop">
            {menuItems.map(item => (
              <Link key={item.name} to={item.path} className="nav-link">
                {item.name}
                <span className="nav-link-underline"></span>
              </Link>
            ))}
          </div>

          {/* Profile Icon */}
          <Link to="/profile" className="nav-profile">
            <User size={22} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="nav-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          {menuItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Profile */}
          <Link
            to="/profile"
            className="mobile-menu-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  )
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProfileDropdown from "./Profiledropdown";
import { NAV_LINKS } from "../../data/homeData";
import "../../styles/Navbar.css";


export default function Navbar({ onNavClick }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("");

  const navigate = useNavigate(); // ✅ correct place

  const storedUser = localStorage.getItem("ceygo_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleScrollNav = (item) => {
    setMobileNavOpen(false);
    setActiveNav(item.name);

    if (item.type === "scroll" && onNavClick) {
      onNavClick(item.name);
    }
  };

  return (
    <header className="nav">
      {/* LOGO */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        CeyGo
      </div>

      {/* NAV LINKS */}
      <nav>
        <ul className={`nav-links ${mobileNavOpen ? "mobile-open" : ""}`}>
          {NAV_LINKS.map((item) => (
            <li key={item.name}>
              {item.type === "page" ? (
                <Link
                  to={item.path}
                  className={`nav-link ${activeNav === item.name ? "active" : ""}`}
                  onClick={() => {
                    setMobileNavOpen(false);
                    setActiveNav(item.name);
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={`#${item.name}`}
                  className={`nav-link ${activeNav === item.name ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollNav(item);
                  }}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileNavOpen((o) => !o)}
        >
          {mobileNavOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* WISHLIST ICON (FIXED) */}
      <Heart
        size={22}
        style={{ cursor: "pointer", marginRight: "10px" }}
        onClick={() => navigate("/wishlist")}
      />

      {/* PROFILE / SIGN IN */}
      {user ? (
        <ProfileDropdown
          user={user}
          wishlistCount={0}
          onSignOut={() => {
            localStorage.removeItem("ceygo_user");
            localStorage.removeItem("ceygo_token");
            sessionStorage.removeItem("ceygo_token");
            navigate("/login");
          }}
        />
      ) : (
        <button className="nav-signin-btn" onClick={() => navigate("/login")}>
          Sign In
        </button>
      )}
    </header>
  );
}
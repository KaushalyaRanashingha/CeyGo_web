import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProfileDropdown from "./Profiledropdown";
import { NAV_LINKS } from "../../data/homeData";
import "../../styles/Navbar.css";

export default function Navbar({ onNavClick }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("");

  const navigate = useNavigate();

  // ✅ Get logged user from localStorage
  const storedUsers = JSON.parse(
    localStorage.getItem("users")
  );

  const user = Array.isArray(storedUsers)
    ? storedUsers[0]
    : storedUsers;

  // ✅ Auto generate initials
  if (user && !user.initials) {
    user.initials = user.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  }

  // ✅ Handle scroll navigation
  const handleScrollNav = (item) => {
    setMobileNavOpen(false);
    setActiveNav(item.name);

    if (
      item.type === "scroll" &&
      onNavClick
    ) {
      onNavClick(item.name);
    }
  };

  return (
    <header className="nav">
      {/* LOGO */}
      <div
        className="nav-logo"
        onClick={() => navigate("/")}
      >
        CeyGo
      </div>

      {/* NAVIGATION */}
      <nav>
        <ul
          className={`nav-links ${
            mobileNavOpen ? "mobile-open" : ""
          }`}
        >
          {NAV_LINKS.map((item) => (
            <li key={item.name}>
              {/* PAGE LINKS */}
              {item.type === "page" ? (
                <Link
                  to={item.path}
                  className={`nav-link ${
                    activeNav === item.name
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setMobileNavOpen(false);
                    setActiveNav(item.name);
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                /* SCROLL LINKS */
                <a
                  href={`#${item.name}`}
                  className={`nav-link ${
                    activeNav === item.name
                      ? "active"
                      : ""
                  }`}
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

        {/* MOBILE MENU BUTTON */}
        <button
          className="nav-mobile-toggle"
          onClick={() =>
            setMobileNavOpen((o) => !o)
          }
        >
          {mobileNavOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* PROFILE DROPDOWN */}
      <ProfileDropdown
        user={user}
        wishlistCount={0}
        onSignOut={() => {
          // ✅ Remove user from localStorage
          localStorage.removeItem("users");

          // ✅ Redirect to login
          navigate("/login");
        }}
      />
    </header>
  );
}
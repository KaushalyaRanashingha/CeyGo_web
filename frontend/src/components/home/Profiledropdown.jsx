// Profiledropdown.jsx

import { useState, useEffect, useRef } from "react";
import "../../styles/Profiledropdown.css";

export default function ProfileDropdown({ user, wishlistCount = 0, onSignOut }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Prevent crash if no logged user
  if (!user) return null;

  // ✅ Use user.name (DB field) — fallback to user.fullName for backwards compat
  const displayName = user.name || user.fullName || "User";

  // ✅ Create short name: "John D." format
  const shortName = (() => {
    const parts = displayName.trim().split(" ");
    if (parts.length === 0) return "User";
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  })();

  // ✅ Generate initials
  const initials =
    user.initials ||
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="nav-user">
      {/* Wishlist Button */}
      <button
        className="nav-icon-btn"
        aria-label="Wishlist"
        onClick={() => alert("Wishlist coming soon!")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>

        {wishlistCount > 0 && (
          <span className="wishlist-badge">{wishlistCount}</span>
        )}

        <span className="nav-tooltip">Wishlist</span>
      </button>

      <div className="nav-divider" />

      {/* Profile Dropdown */}
      <div
        ref={wrapRef}
        className={`nav-profile-wrap ${open ? "open" : ""}`}
      >
        {/* Profile Button */}
        <div
          className="nav-profile"
          onClick={() => setOpen((o) => !o)}
          role="button"
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={open}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen((o) => !o);
          }}
        >
          {/* Avatar */}
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={displayName} />
            ) : (
              initials
            )}
          </div>

          {/* User Name */}
          <span className="profile-name">{shortName}</span>

          {/* Arrow */}
          <span className="profile-chevron">▾</span>
        </div>

        {/* Dropdown Menu */}
        <div className="profile-dropdown" role="menu">
          {/* User Info */}
          <div className="dropdown-header">
            <div className="dropdown-greeting">Logged in as</div>
            <div className="dropdown-username">
              {displayName}
              {/* ✅ Show Admin badge if user is admin */}
              {user.isAdmin && (
                <span className="admin-badge">Admin</span>
              )}
            </div>
            <div className="dropdown-email">{user.email}</div>
          </div>

          {/* Menu Items */}
          <button className="dropdown-item" role="menuitem">
            <span className="d-icon">👤</span>
            My Profile
          </button>

          <button className="dropdown-item" role="menuitem">
            <span className="d-icon">🗺️</span>
            My Itineraries
          </button>

          <button className="dropdown-item" role="menuitem">
            <span className="d-icon">❤️</span>
            Wishlist
            {wishlistCount > 0 && (
              <span className="d-badge">{wishlistCount}</span>
            )}
          </button>

          <button className="dropdown-item" role="menuitem">
            <span className="d-icon">⚙️</span>
            Settings
          </button>

          <div className="dropdown-divider" />

          {/* Logout */}
          <button
            className="dropdown-item danger"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              // ✅ Remove correct keys set by Login.jsx
              localStorage.removeItem("ceygo_user");
              localStorage.removeItem("ceygo_token");
              sessionStorage.removeItem("ceygo_token");
              if (onSignOut) onSignOut();
            }}
          >
            <span className="d-icon">↩</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
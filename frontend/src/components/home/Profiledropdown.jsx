// Profiledropdown.jsx

import { useState, useEffect, useRef } from "react";
import "../../styles/Profiledropdown.css";

export default function ProfileDropdown({
  user,
  wishlistCount = 0,
  onSignOut,
}) {
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

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // ✅ Prevent crash if no logged user
  if (!user) return null;

  // ✅ Create short name
  const shortName = (() => {
    const parts = user.fullName?.trim().split(" ") || [];

    if (parts.length === 0) return "User";

    if (parts.length === 1) return parts[0];

    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  })();

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
          <span className="wishlist-badge">
            {wishlistCount}
          </span>
        )}

        <span className="nav-tooltip">
          Wishlist
        </span>
      </button>

      <div className="nav-divider" />

      {/* Profile Dropdown */}
      <div
        ref={wrapRef}
        className={`nav-profile-wrap ${
          open ? "open" : ""
        }`}
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
            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              setOpen((o) => !o);
            }
          }}
        >
          {/* Avatar */}
          <div className="profile-avatar">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
              />
            ) : (
              user.initials
            )}
          </div>

          {/* User Name */}
          <span className="profile-name">
            {shortName}
          </span>

          {/* Arrow */}
          <span className="profile-chevron">
            ▾
          </span>
        </div>

        {/* Dropdown Menu */}
        <div
          className="profile-dropdown"
          role="menu"
        >
          {/* User Info */}
          <div className="dropdown-header">
            <div className="dropdown-greeting">
              Logged in as
            </div>

            <div className="dropdown-username">
              {user.fullName}
            </div>

            <div className="dropdown-email">
              {user.email}
            </div>
          </div>

          {/* Menu Items */}
          <button
            className="dropdown-item"
            role="menuitem"
          >
            <span className="d-icon">
              👤
            </span>
            My Profile
          </button>

          <button
            className="dropdown-item"
            role="menuitem"
          >
            <span className="d-icon">
              🗺️
            </span>
            My Itineraries
          </button>

          <button
            className="dropdown-item"
            role="menuitem"
          >
            <span className="d-icon">
              ❤️
            </span>

            Wishlist

            {wishlistCount > 0 && (
              <span className="d-badge">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            className="dropdown-item"
            role="menuitem"
          >
            <span className="d-icon">
              ⚙️
            </span>
            Settings
          </button>

          <div className="dropdown-divider" />

          {/* Logout */}
          <button
            className="dropdown-item danger"
            role="menuitem"
            onClick={() => {
              setOpen(false);

              // ✅ Remove logged user
              localStorage.removeItem(
                "users"
              );

              // ✅ Optional logout callback
              if (onSignOut) {
                onSignOut();
              }
            }}
          >
            <span className="d-icon">
              ↩
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
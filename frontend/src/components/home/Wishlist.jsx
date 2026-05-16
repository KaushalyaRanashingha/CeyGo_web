import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Wishlist() {
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "saved"
  const navigate = useNavigate();

  const token = localStorage.getItem("ceygo_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5004/api/plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllPlans(res.data);
    } catch (err) {
      console.log("WISHLIST ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite on/off
  const handleToggleFavorite = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5004/api/plans/${id}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state with returned plan
      setAllPlans((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isFavorite: res.data.isFavorite } : p))
      );
    } catch (err) {
      console.log("TOGGLE FAVORITE ERROR:", err.response?.data || err.message);
      alert("Could not update wishlist. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip permanently?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5004/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllPlans((prev) => prev.filter((p) => p._id !== id));
      if (expandedPlan === id) setExpandedPlan(null);
    } catch (err) {
      console.log("DELETE ERROR:", err);
      alert("Failed to delete plan.");
    } finally {
      setDeletingId(null);
    }
  };

  // Which plans to show based on active tab
  const plans = activeTab === "saved"
    ? allPlans.filter((p) => p.isFavorite)
    : allPlans;

  const savedCount = allPlans.filter((p) => p.isFavorite).length;
  const totalDays = plans.reduce((s, p) => s + (p.days?.length || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wl-root {
          min-height: 100vh;
          background: #f7f4ef;
          font-family: 'DM Sans', sans-serif;
          color: #1a1612;
        }

        /* TOP BAR */
        .wl-topbar {
          background: #fff;
          border-bottom: 1px solid #e8e2d9;
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .wl-topbar-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1a1612;
          cursor: pointer;
          letter-spacing: -0.5px;
        }
        .wl-back-btn {
          background: none;
          border: 1px solid #d4ccc0;
          border-radius: 8px;
          padding: 7px 16px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #5a5048;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wl-back-btn:hover { background: #f0ebe3; border-color: #b8ae9f; }

        /* HERO */
        .wl-hero {
          background: linear-gradient(135deg, #1a1612 0%, #2d2419 60%, #3d3020 100%);
          padding: 56px 40px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .wl-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
        }
        .wl-hero-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 14px;
          position: relative;
        }
        .wl-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 14px;
          position: relative;
        }
        .wl-hero-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          max-width: 380px;
          margin: 0 auto 36px;
          line-height: 1.7;
          position: relative;
        }
        .wl-stats {
          display: inline-flex;
          gap: 32px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 18px 36px;
          position: relative;
        }
        .wl-stat { text-align: center; }
        .wl-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #c9a96e;
          display: block;
        }
        .wl-stat-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }

        /* BODY */
        .wl-body {
          max-width: 860px;
          margin: -20px auto 0;
          padding: 0 20px 80px;
          position: relative;
          z-index: 1;
        }

        /* TABS */
        .wl-tabs {
          display: flex;
          gap: 8px;
          background: #fff;
          border: 1px solid #e8e2d9;
          border-radius: 14px;
          padding: 6px;
          margin-bottom: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        .wl-tab {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #8a7f72;
        }
        .wl-tab.active {
          background: #1a1612;
          color: #c9a96e;
        }
        .wl-tab-badge {
          display: inline-block;
          background: #c9a96e22;
          color: #c9a96e;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 7px;
          border-radius: 20px;
          margin-left: 6px;
        }
        .wl-tab.active .wl-tab-badge {
          background: rgba(201,169,110,0.2);
        }

        /* LOADING */
        .wl-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 0;
          gap: 16px;
          color: #8a7f72;
          font-size: 14px;
        }
        .wl-spinner {
          width: 36px; height: 36px;
          border: 3px solid #e8e2d9;
          border-top-color: #c9a96e;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* EMPTY */
        .wl-empty {
          background: #fff;
          border-radius: 18px;
          padding: 64px 40px;
          text-align: center;
          border: 1px solid #e8e2d9;
        }
        .wl-empty-icon { font-size: 56px; display: block; margin-bottom: 16px; opacity: 0.35; }
        .wl-empty h3 {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: #1a1612;
          margin-bottom: 8px;
        }
        .wl-empty p { font-size: 13px; color: #8a7f72; line-height: 1.7; margin-bottom: 24px; }
        .wl-empty-btn {
          background: #1a1612;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 11px 24px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }
        .wl-empty-btn:hover { background: #2d2419; }

        /* PLAN CARD */
        .wl-card {
          background: #fff;
          border-radius: 18px;
          border: 1px solid #e8e2d9;
          margin-bottom: 14px;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .wl-card:hover { box-shadow: 0 6px 24px rgba(26,22,18,0.09); transform: translateY(-1px); }

        .wl-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          cursor: pointer;
          user-select: none;
        }

        .wl-card-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #c9a96e22, #c9a96e44);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .wl-card-info { flex: 1; min-width: 0; }
        .wl-card-dest {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #1a1612;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }
        .wl-card-meta { display: flex; gap: 14px; flex-wrap: wrap; }
        .wl-meta-chip { font-size: 12px; color: #8a7f72; }

        .wl-card-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        /* Heart button */
        .wl-heart-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid #e8e2d9;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 17px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .wl-heart-btn.favorited { background: #fff0f0; border-color: #f4a0a0; }
        .wl-heart-btn:hover { transform: scale(1.12); }

        .wl-delete-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid #e8e2d9;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .wl-delete-btn:hover { background: #fdf0f0; border-color: #e07070; }
        .wl-delete-btn:disabled { opacity: 0.4; cursor: default; }

        .wl-chevron {
          color: #b8ae9f;
          font-size: 18px;
          transition: transform 0.3s;
          width: 24px;
          text-align: center;
          flex-shrink: 0;
        }
        .wl-chevron.open { transform: rotate(180deg); }

        /* EXPANDED */
        .wl-itinerary {
          border-top: 1px solid #f0ebe3;
          padding: 24px 24px 28px;
          background: #fdfaf7;
          animation: slideDown 0.25s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wl-day-block { margin-bottom: 24px; }
        .wl-day-block:last-child { margin-bottom: 0; }

        .wl-day-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .wl-day-num {
          background: #1a1612;
          color: #c9a96e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .wl-day-place {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          color: #1a1612;
        }
        .wl-day-badges { display: flex; gap: 6px; margin-left: auto; }
        .wl-badge {
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 20px;
          background: #f0ebe3;
          color: #6a5f52;
        }

        .wl-acts {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 14px;
          border-left: 2px solid #e8e2d9;
        }
        .wl-act {
          background: #fff;
          border: 1px solid #e8e2d9;
          border-radius: 10px;
          padding: 12px 14px;
        }
        .wl-act-top {
          display: flex;
          gap: 6px;
          margin-bottom: 5px;
          flex-wrap: wrap;
        }
        .wl-act-time {
          font-size: 11px;
          font-weight: 500;
          color: #c9a96e;
          background: #fdf6ed;
          border-radius: 5px;
          padding: 2px 8px;
        }
        .wl-act-cost {
          font-size: 11px;
          font-weight: 500;
          color: #4a8c5c;
          background: #edf7f0;
          border-radius: 5px;
          padding: 2px 8px;
        }
        .wl-act-title { font-size: 13px; font-weight: 500; color: #1a1612; margin-bottom: 3px; }
        .wl-act-desc { font-size: 12px; color: #8a7f72; line-height: 1.5; }

        @media (max-width: 600px) {
          .wl-topbar { padding: 0 16px; }
          .wl-hero { padding: 40px 16px 56px; }
          .wl-stats { gap: 20px; padding: 14px 20px; }
          .wl-body { padding: 0 12px 60px; }
          .wl-card-header { padding: 16px; gap: 12px; }
          .wl-itinerary { padding: 16px; }
        }
      `}</style>

      <div className="wl-root">

        {/* TOP BAR */}
        <div className="wl-topbar">
          <div className="wl-topbar-logo" onClick={() => navigate("/")}>CeyGo</div>
          <button className="wl-back-btn" onClick={() => navigate(-1)}>← Back</button>
        </div>

        {/* HERO */}
        <div className="wl-hero">
          <p className="wl-hero-eyebrow">✦ Your travel collection</p>
          <h1 className="wl-hero-title">My Trips</h1>
          <p className="wl-hero-sub">All your AI-generated itineraries in one place.</p>
          {!loading && (
            <div className="wl-stats">
              <div className="wl-stat">
                <span className="wl-stat-num">{allPlans.length}</span>
                <span className="wl-stat-label">Total Trips</span>
              </div>
              <div className="wl-stat">
                <span className="wl-stat-num">{savedCount}</span>
                <span className="wl-stat-label">Favourites</span>
              </div>
              <div className="wl-stat">
                <span className="wl-stat-num">{totalDays}</span>
                <span className="wl-stat-label">Days Planned</span>
              </div>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="wl-body">
          {loading ? (
            <div className="wl-loading">
              <div className="wl-spinner" />
              Loading your trips…
            </div>
          ) : (
            <>
              {/* TABS */}
              {allPlans.length > 0 && (
                <div className="wl-tabs">
                  <button
                    className={`wl-tab ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                  >
                    🗺 All Trips
                    <span className="wl-tab-badge">{allPlans.length}</span>
                  </button>
                  <button
                    className={`wl-tab ${activeTab === "saved" ? "active" : ""}`}
                    onClick={() => setActiveTab("saved")}
                  >
                    ❤️ Favourites
                    <span className="wl-tab-badge">{savedCount}</span>
                  </button>
                </div>
              )}

              {/* EMPTY STATE */}
              {plans.length === 0 ? (
                <div className="wl-empty">
                  <span className="wl-empty-icon">
                    {activeTab === "saved" ? "❤️" : "🗺️"}
                  </span>
                  <h3>
                    {activeTab === "saved"
                      ? "No favourites yet"
                      : "No trips yet"}
                  </h3>
                  <p>
                    {activeTab === "saved"
                      ? "Tap the ❤ heart on any trip to add it to your favourites."
                      : "Generate an AI travel plan to get started."}
                  </p>
                  <button className="wl-empty-btn" onClick={() => navigate("/")}>
                    ✦ Plan a Trip
                  </button>
                </div>
              ) : (
                plans.map((plan) => {
                  const isOpen = expandedPlan === plan._id;
                  const dayCount = plan.days?.length || 0;
                  const actCount = plan.days?.reduce(
                    (s, d) => s + (d.activities?.length || 0), 0
                  );

                  return (
                    <div key={plan._id} className="wl-card">

                      {/* CARD HEADER */}
                      <div
                        className="wl-card-header"
                        onClick={() => setExpandedPlan(isOpen ? null : plan._id)}
                      >
                        <div className="wl-card-icon">🏝️</div>

                        <div className="wl-card-info">
                          <div className="wl-card-dest">{plan.destination}</div>
                          <div className="wl-card-meta">
                            <span className="wl-meta-chip">
                              📅 {dayCount} day{dayCount !== 1 ? "s" : ""}
                            </span>
                            <span className="wl-meta-chip">🎯 {actCount} activities</span>
                            <span className="wl-meta-chip">
                              🕐 {new Date(plan.createdAt).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div
                          className="wl-card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* HEART — toggles favourite */}
                          <button
                            className={`wl-heart-btn ${plan.isFavorite ? "favorited" : ""}`}
                            title={plan.isFavorite ? "Remove from favourites" : "Add to favourites"}
                            onClick={() => handleToggleFavorite(plan._id)}
                          >
                            {plan.isFavorite ? "❤️" : "🤍"}
                          </button>

                          {/* DELETE */}
                          <button
                            className="wl-delete-btn"
                            title="Delete trip"
                            onClick={() => handleDelete(plan._id)}
                            disabled={deletingId === plan._id}
                          >
                            {deletingId === plan._id ? "⏳" : "🗑"}
                          </button>
                        </div>

                        <span className={`wl-chevron ${isOpen ? "open" : ""}`}>⌄</span>
                      </div>

                      {/* EXPANDED ITINERARY */}
                      {isOpen && (
                        <div className="wl-itinerary">
                          {plan.days?.map((day, di) => (
                            <div key={di} className="wl-day-block">
                              <div className="wl-day-label">
                                <span className="wl-day-num">Day {day.day || di + 1}</span>
                                <span className="wl-day-place">📍 {day.place}</span>
                                <div className="wl-day-badges">
                                  {day.weather && <span className="wl-badge">☁ {day.weather}</span>}
                                  {day.budget && <span className="wl-badge">💰 {day.budget}</span>}
                                </div>
                              </div>

                              <div className="wl-acts">
                                {day.activities?.map((act, ai) => (
                                  <div key={ai} className="wl-act">
                                    <div className="wl-act-top">
                                      {act.time && <span className="wl-act-time">⏰ {act.time}</span>}
                                      {act.cost && <span className="wl-act-cost">💵 {act.cost}</span>}
                                    </div>
                                    <div className="wl-act-title">{act.title}</div>
                                    {act.description && (
                                      <div className="wl-act-desc">{act.description}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
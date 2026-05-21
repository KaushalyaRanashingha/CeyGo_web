import { useState } from "react";
import axios from "axios";
import { FEATURES } from "../../data/homeData";
import "../../styles/Aiplanner.css";

export default function AIPlanner() {
  const [search, setSearch] = useState({
    dest: "",
    dates: "",
    budget: "",
    interests: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [savedPlanId, setSavedPlanId] = useState(null); // 🔥 track saved plan _id
  const [isFavorited, setIsFavorited] = useState(false); // 🔥 track wishlist state
  const [error, setError] = useState("");

  // 🔥 GENERATE AI PLAN
  const generatePlan = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      setSavedPlanId(null);
      setIsFavorited(false);

      const prompt = `
You are a travel planner AI.

Return ONLY valid JSON (no explanation, no markdown).

Format:

{
  "destination": "",
  "days": [
    {
      "day": 1,
      "place": "",
      "weather": "",
      "budget": "",
      "activities": [
        {
          "time": "",
          "title": "",
          "description": "",
          "cost": ""
        }
      ]
    }
  ]
}

User Input:
Destination: ${search.dest}
Days: ${search.dates}
Budget: ${search.budget}
Interests: ${search.interests}
`;

      // 🔥 GEMINI API
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBrGe6fjonUNVGZL7P1kCkTlL6boK3p8no`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      let text = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // 🔥 REMOVE markdown code fences
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();

      const parsed = JSON.parse(text);
      setResult(parsed);

      // 🔥 AUTO-SAVE TO DATABASE and capture returned _id
      const token = localStorage.getItem("ceygo_token"); 

      if (token) {
        const saveRes = await axios.post(
          "http://localhost:5004/api/plans",
          {
            destination: parsed.destination,
            days: parsed.days,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ Store the saved plan's _id for later favorite toggle
        if (saveRes.data?._id) {
          setSavedPlanId(saveRes.data._id);
        }
      }
    } catch (err) {
      console.log("AI ERROR:", err);
      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 TOGGLE FAVORITE using the saved plan's _id
  const handleSaveToWishlist = async () => {
    try {
      const token = localStorage.getItem("ceygo_token");

      if (!token) {
        alert("Please sign in to save to your wishlist.");
        return;
      }

      if (!savedPlanId) {
        alert("Plan not saved yet. Please generate again.");
        return;
      }

      await axios.patch(
        `http://localhost:5004/api/plans/${savedPlanId}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFavorited(true);
      alert("❤️ Saved to Wishlist!");
    } catch (err) {
      console.log("FAVORITE ERROR:", err);
      alert("Failed to save to wishlist.");
    }
  };

  const fields = [
    { label: "🌴 Destination", key: "dest", placeholder: "e.g. Galle Fort, Mirissa" },
    { label: "📅 Travel Dates", key: "dates", placeholder: "e.g. 3 Days" },
    { label: "💰 Budget Range", key: "budget", placeholder: "e.g. $500" },
    { label: "🎯 Interests", key: "interests", placeholder: "e.g. Beaches, Wildlife, Food" },
  ];

  return (
    <section
      id="section-ai-planner"
      className="section"
      style={{ borderTop: "1px solid rgba(0,30,64,0.07)" }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
        <p className="center-sub" style={{ marginBottom: 12 }}>
          Powered by Gemini AI
        </p>
        <h2 className="section-title center-title" style={{ marginBottom: 16 }}>
          Plan Your Dream Trip
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>
          Tell us where you want to go, when, and what you love — our AI crafts a
          personalized itinerary in seconds.
        </p>
      </div>

      {/* FORM */}
      <div className="planner-form-card">
        <div className="planner-form-grid">
          {fields.map((field) => (
            <div key={field.key} className="form-field">
              <label className="form-label">{field.label}</label>
              <input
                className="form-input"
                placeholder={field.placeholder}
                value={search[field.key]}
                onChange={(e) =>
                  setSearch((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn-hero"
            style={{ marginTop: 8 }}
            onClick={generatePlan}
            disabled={loading}
          >
            {loading ? "Generating..." : "✦ Generate My Itinerary"}
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && <div className="planner-error">{error}</div>}

      {/* RESULT */}
      {result && (
        <div className="planner-result-wrapper">

          {/* HEADER CARD */}
          <div className="planner-hero-result">
            <div>
              <h2 className="planner-title">✨ {result.destination}</h2>
              <p className="planner-subtext">Your AI-crafted travel itinerary is ready</p>
            </div>

            <div className="planner-actions">
              {/* 🔥 Fixed Save button — uses savedPlanId from DB response */}
              <button
                className="fav-btn"
                onClick={handleSaveToWishlist}
                disabled={isFavorited}
                style={{
                  opacity: isFavorited ? 0.6 : 1,
                  cursor: isFavorited ? "default" : "pointer",
                }}
              >
                {isFavorited ? "✅ Saved!" : "❤️ Save to Wishlist"}
              </button>

              <button className="print-btn" onClick={() => window.print()}>
                🖨 Print
              </button>
            </div>
          </div>

          {/* DAYS TIMELINE */}
          <div className="planner-timeline">
            {result.days?.map((day, index) => (
              <div key={index} className="day-card-modern">

                {/* DAY HEADER */}
                <div className="day-header-modern">
                  <div>
                    <span className="day-badge">DAY {day.day || index + 1}</span>
                    <h3 className="day-place">📍 {day.place}</h3>
                  </div>
                  <div className="day-meta">
                    <span>☁ {day.weather}</span>
                    <span>💰 ${day.budget}</span>
                  </div>
                </div>

                {/* HOTEL + TRANSPORT */}
                <div className="quick-info-grid">
                  <div className="info-box">
                    🏨
                    <div>
                      <h5>Hotel</h5>
                      <p>{day.hotel || "Luxury Stay"}</p>
                    </div>
                  </div>
                  <div className="info-box">
                    🚗
                    <div>
                      <h5>Transport</h5>
                      <p>{day.transport || "Private Car"}</p>
                    </div>
                  </div>
                </div>

                {/* ACTIVITIES */}
                <div className="activities-modern">
                  {day.activities?.map((act, i) => (
                    <div key={i} className="activity-modern-card">
                      <div className="activity-top">
                        <span className="time-pill">⏰ {act.time}</span>
                        <span className="cost-pill">💵 ${act.cost}</span>
                      </div>
                      <h4 className="activity-title">{act.title}</h4>
                      <p className="activity-desc">{act.description}</p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      <div className="features-grid" style={{ marginTop: 80 }}>
        {FEATURES.map((f) => {
          const iconColor =
            f.color === "#a7c8ff"
              ? "#1f477b"
              : f.color === "#76f3ea"
              ? "#006a65"
              : "#763300";

          return (
            <div key={f.title} className="feature-item">
              <div
                className="feature-icon-wrap"
                style={{ background: f.color + "22" }}
              >
                <span style={{ color: iconColor, fontSize: 28 }}>{f.icon}</span>
              </div>
              <h4 className="feature-title">{f.title}</h4>
              <p className="feature-desc">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
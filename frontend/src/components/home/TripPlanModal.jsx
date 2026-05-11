import { useState, useEffect } from "react";
import "../../styles/Tripplanmodal.css";

async function callClaudeForPlan(search) {
  const prompt = `You are CeyGo, a luxury travel AI for Southern Sri Lanka.
A traveller has entered the following preferences:
- Destination: ${search.dest || "Anywhere in Southern Sri Lanka"}
- Dates: ${search.dates || "Flexible"}
- Budget: ${search.budget || "Flexible"}
- Interests: ${search.interests || "General exploration"}
Generate a beautifully structured day-by-day trip plan in JSON (no markdown, pure JSON).
Return ONLY a JSON object with this exact shape:
{"title":"string","summary":"string","days":[{"day":1,"location":"string","theme":"string","morning":"string","afternoon":"string","evening":"string","stay":"string","tip":"string"}],"budgetBreakdown":{"accommodation":"string","food":"string","activities":"string","transport":"string"},"bestTime":"string","packingTips":["string"]}
Generate 3-5 days. Be specific, luxurious, and authentic to Southern Sri Lanka.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export default function TripPlanModal({ search, onClose }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    callClaudeForPlan(search)
      .then((p) => { setPlan(p); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✕</button>

        {loading && (
          <div className="loading-pulse">
            <div className="spinner" />
            <div className="loading-text">Crafting your bespoke itinerary…</div>
            <div className="loading-sub">Our AI is exploring Southern Sri Lanka for you ✦</div>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p style={{ fontWeight: 700, marginBottom: 8 }}>Could not generate plan</p>
            <p>{error}</p>
          </div>
        )}

        {plan && !loading && (
          <>
            <h2 className="plan-title">✦ {plan.title}</h2>
            <p className="plan-summary">{plan.summary}</p>

            {plan.days?.map((d) => (
              <div key={d.day} className="day-card">
                <div className="day-header">
                  <span className="day-badge">Day {d.day}</span>
                  <span className="day-location">{d.location}</span>
                  <span className="day-theme">{d.theme}</span>
                </div>
                <div className="time-row">
                  <div className="time-block">
                    <div className="time-label">🌅 Morning</div>
                    <div className="time-text">{d.morning}</div>
                  </div>
                  <div className="time-block">
                    <div className="time-label">☀️ Afternoon</div>
                    <div className="time-text">{d.afternoon}</div>
                  </div>
                  <div className="time-block">
                    <div className="time-label">🌙 Evening</div>
                    <div className="time-text">{d.evening}</div>
                  </div>
                </div>
                <div className="day-stay">
                  🏨 <span><strong>Stay:</strong> {d.stay}</span>
                </div>
                {d.tip && (
                  <div className="day-tip">
                    💡 <strong>Insider tip:</strong> {d.tip}
                  </div>
                )}
              </div>
            ))}

            {plan.budgetBreakdown && (
              <>
                <div className="section-mini-title" style={{ marginTop: 28 }}>
                  Budget Breakdown
                </div>
                <div className="budget-grid">
                  {Object.entries(plan.budgetBreakdown).map(([k, v]) => (
                    <div key={k} className="budget-cell">
                      <div className="budget-label">{k}</div>
                      <div className="budget-val">{v}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {plan.bestTime && (
              <div className="day-tip" style={{ marginBottom: 16 }}>
                🗓️ <strong>Best time to visit:</strong> {plan.bestTime}
              </div>
            )}

            {plan.packingTips?.length > 0 && (
              <>
                <div className="section-mini-title">Packing Tips</div>
                <div className="packing-chips">
                  {plan.packingTips.map((tip, i) => (
                    <span key={i} className="chip">{tip}</span>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
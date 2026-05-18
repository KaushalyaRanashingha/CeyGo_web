import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";

// ─── Constants ────────────────────────────────────────────────────────────────
const VEHICLE_TYPES = [
  {
    id: "tuk",
    name: "Tuk-Tuk",
    emoji: "🛺",
    seats: 3,
    baseFare: 400,
    perKm: 45,
    desc: "Best for short city rides",
    ac: false,
    luggage: "Small",
    color: "#f59e0b",
  },
  {
    id: "car",
    name: "Sedan Car",
    emoji: "🚗",
    seats: 4,
    baseFare: 1200,
    perKm: 85,
    desc: "Comfortable AC sedan",
    ac: true,
    luggage: "Medium",
    color: "#3b82f6",
  },
  {
    id: "suv",
    name: "SUV / Jeep",
    emoji: "🚙",
    seats: 7,
    baseFare: 2000,
    perKm: 110,
    desc: "Spacious for families & groups",
    ac: true,
    luggage: "Large",
    color: "#059669",
  },
  {
    id: "van",
    name: "Minivan",
    emoji: "🚐",
    seats: 12,
    baseFare: 3000,
    perKm: 130,
    desc: "Ideal for large groups",
    ac: true,
    luggage: "Extra Large",
    color: "#7c3aed",
  },
];

const EXTRAS = [
  { id: "guide", label: "Local Guide", emoji: "🧭", cost: 3500, unit: "per day" },
  { id: "photo", label: "Photography Stop", emoji: "📸", cost: 500, unit: "flat" },
  { id: "meals", label: "Meal Stops Arranged", emoji: "🍛", cost: 1200, unit: "per person" },
  { id: "ac_night", label: "Overnight AC Parking", emoji: "🌙", cost: 800, unit: "flat" },
];

// ─── Haversine distance km ────────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Calculate total route distance ──────────────────────────────────────────
function calcRouteKm(places) {
  if (places.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < places.length - 1; i++) {
    const a = places[i].coordinates;
    const b = places[i + 1].coordinates;
    if (a && b) total += haversineKm(a.lat, a.lng, b.lat, b.lng);
  }
  return Math.round(total);
}

// ─── Estimated drive hours ────────────────────────────────────────────────────
function calcDriveHours(km) {
  return Math.round((km / 50) * 10) / 10; // avg 50 km/h Sri Lanka
}

// ─── Format LKR ──────────────────────────────────────────────────────────────
function lkr(n) {
  return "LKR " + n.toLocaleString("en-LK");
}

// ─── Duration to hours map ────────────────────────────────────────────────────
const DURATION_HOURS = {
  "1 Hour": 1, "2 Hours": 2, "3 Hours": 3, "4 Hours": 4,
  "Half Day": 4, "Full Day": 8, "Overnight": 12,
};

// ─── Requirement badge ────────────────────────────────────────────────────────
function Badge({ label, color }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "4px 12px",
      borderRadius: 999, fontSize: 12, fontWeight: 600,
      background: color + "20", color, border: `1px solid ${color}40`,
    }}>{label}</span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Driver() {
  const locationHook = useLocation();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [passengers, setPassengers] = useState(2);
  const [vehicleId, setVehicleId] = useState("car");
  const [extras, setExtras] = useState([]);
  const [days, setDays] = useState(1);
  const [searchQ, setSearchQ] = useState("");
  const [breakdown, setBreakdown] = useState(null);

  // Load all destinations
  useEffect(() => {
    fetch("/api/destinations")
      .then(r => r.json())
      .then(data => {
        setPlaces(data);
        // Pre-select from router state if any
        const stateSelected = locationHook.state?.selectedPlaces;
        if (stateSelected && Array.isArray(stateSelected)) {
          const ids = stateSelected.map(p => p._id || p.id);
          setSelectedPlaces(data.filter(p => ids.includes(p._id)));
        }
      })
      .catch(() => {});
  }, []);

  // Recalculate whenever inputs change
  useEffect(() => {
    if (selectedPlaces.length === 0) { setBreakdown(null); return; }

    const vehicle = VEHICLE_TYPES.find(v => v.id === vehicleId);
    const routeKm = calcRouteKm(selectedPlaces);
    const driveHours = calcDriveHours(routeKm);

    const baseCost = vehicle.baseFare * days;
    const kmCost = routeKm * vehicle.perKm;
    const extraCosts = extras.reduce((acc, extId) => {
      const e = EXTRAS.find(x => x.id === extId);
      if (!e) return acc;
      return acc + (e.unit === "per person" ? e.cost * passengers : e.cost) * days;
    }, 0);

    const totalBeforeTip = baseCost + kmCost + extraCosts;
    const tip = Math.round(totalBeforeTip * 0.1);
    const total = totalBeforeTip + tip;

    // Visit hours
    const visitHours = selectedPlaces.reduce((a, p) => a + (DURATION_HOURS[p.duration] || 2), 0);
    const totalHours = driveHours + visitHours;

    // Requirements
    const reqs = [];
    if (totalHours > 8) reqs.push({ label: "Multi-day trip recommended", color: "#f59e0b" });
    if (selectedPlaces.some(p => p.category === "Wildlife")) reqs.push({ label: "Park entry fees extra", color: "#10b981" });
    if (selectedPlaces.some(p => p.category === "Adventure")) reqs.push({ label: "Wear comfortable shoes", color: "#3b82f6" });
    if (selectedPlaces.some(p => p.category === "Cultural" || p.category === "Historical")) reqs.push({ label: "Dress modestly for temples", color: "#8b5cf6" });
    if (selectedPlaces.some(p => p.bestTime && p.bestTime !== "Year Round")) reqs.push({ label: "Check seasonal availability", color: "#ec4899" });
    if (passengers > vehicle.seats) reqs.push({ label: `⚠️ Exceeds vehicle capacity (${vehicle.seats} seats)`, color: "#ef4444" });

    // District path
    const districts = [...new Set(selectedPlaces.map(p => p.district))];

    setBreakdown({
      vehicle, routeKm, driveHours, baseCost, kmCost, extraCosts,
      tip, total, visitHours, totalHours, reqs, districts,
      placeCount: selectedPlaces.length,
    });
  }, [selectedPlaces, vehicleId, passengers, extras, days]);

  const vehicle = VEHICLE_TYPES.find(v => v.id === vehicleId);
  const filtered = places.filter(p =>
    p.name?.toLowerCase().includes(searchQ.toLowerCase()) ||
    p.district?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const togglePlace = (p) => {
    setSelectedPlaces(prev =>
      prev.find(x => x._id === p._id) ? prev.filter(x => x._id !== p._id) : [...prev, p]
    );
  };

  const toggleExtra = (id) => {
    setExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; background: #f0f4f8; }
        .vehicle-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.12); }
        .place-item:hover { background: #f0f7ff !important; border-color: #3b82f6 !important; }
        .extra-card:hover { transform: scale(1.02); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <Navbar />

      <div style={{ paddingTop: 72, minHeight: "100vh", background: "linear-gradient(160deg, #e8f4fd 0%, #f0f4f8 60%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div style={{ marginBottom: 32 }}>
            <button onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#64748b", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 999, padding: "8px 16px", cursor: "pointer", fontSize: 14, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              ← Back
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div>
                <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 800, color: "#0a1628", marginBottom: 6 }}>
                  🚗 Trip Cost Calculator
                </h1>
                <p style={{ color: "#64748b", fontSize: 16 }}>
                  Select destinations, configure your vehicle & get an instant cost estimate
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 28, alignItems: "start" }}>

            {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Destination Picker */}
              <div style={{ background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>
                  📍 Select Destinations
                  {selectedPlaces.length > 0 && (
                    <span style={{ marginLeft: 10, fontSize: 13, background: "#0a1628", color: "#f0c060", borderRadius: 999, padding: "2px 10px" }}>
                      {selectedPlaces.length} selected
                    </span>
                  )}
                </h2>

                {/* Search */}
                <div style={{ position: "relative", marginBottom: 16 }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 16 }}>🔍</span>
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    placeholder="Search destinations..."
                    style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", fontFamily: "'Sora',sans-serif" }} />
                </div>

                {/* Selected badges */}
                {selectedPlaces.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                    {selectedPlaces.map(p => (
                      <span key={p._id} onClick={() => togglePlace(p)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0a162810", border: "1.5px solid #0a162830", borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#0a1628", cursor: "pointer" }}>
                        {p.name} <span style={{ color: "#ef4444", fontWeight: 800 }}>×</span>
                      </span>
                    ))}
                    <button onClick={() => setSelectedPlaces([])} style={{ fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>Clear all</button>
                  </div>
                )}

                {/* List */}
                <div style={{ maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                  {filtered.map(p => {
                    const sel = !!selectedPlaces.find(x => x._id === p._id);
                    return (
                      <div key={p._id} className="place-item" onClick={() => togglePlace(p)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                          borderRadius: 14, border: sel ? "1.5px solid #3b82f6" : "1.5px solid #f1f5f9",
                          background: sel ? "#eff6ff" : "#fafafa", cursor: "pointer", transition: "all 0.15s",
                        }}>
                        <img src={p.image} alt={p.name} style={{ width: 44, height: 36, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "#0a1628" }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>{p.district} · {p.category} · ⏱ {p.duration}</div>
                        </div>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", border: sel ? "none" : "1.5px solid #cbd5e1", background: sel ? "#3b82f6" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, flexShrink: 0 }}>
                          {sel ? "✓" : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vehicle Selection */}
              <div style={{ background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 20 }}>🚘 Choose Vehicle Type</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {VEHICLE_TYPES.map(v => {
                    const active = vehicleId === v.id;
                    return (
                      <div key={v.id} className="vehicle-card" onClick={() => setVehicleId(v.id)}
                        style={{
                          padding: "20px 18px", borderRadius: 18, cursor: "pointer",
                          border: active ? `2px solid ${v.color}` : "1.5px solid #e2e8f0",
                          background: active ? v.color + "10" : "#fafafa",
                          transition: "all 0.2s",
                        }}>
                        <div style={{ fontSize: 36, marginBottom: 8 }}>{v.emoji}</div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "#0a1628", marginBottom: 4 }}>{v.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>{v.desc}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          <Badge label={`👥 ${v.seats} seats`} color={v.color} />
                          <Badge label={v.ac ? "❄️ AC" : "🌬️ No AC"} color={v.color} />
                          <Badge label={`🧳 ${v.luggage}`} color={v.color} />
                        </div>
                        <div style={{ marginTop: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 600, color: v.color }}>
                          {lkr(v.baseFare)}/day + {lkr(v.perKm)}/km
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extra Services */}
              <div style={{ background: "#fff", borderRadius: 24, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 20 }}>✨ Add-on Services</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {EXTRAS.map(e => {
                    const on = extras.includes(e.id);
                    return (
                      <div key={e.id} className="extra-card" onClick={() => toggleExtra(e.id)}
                        style={{
                          padding: "16px 18px", borderRadius: 16, cursor: "pointer",
                          border: on ? "2px solid #0a1628" : "1.5px solid #e2e8f0",
                          background: on ? "#0a162808" : "#fafafa",
                          transition: "all 0.18s",
                        }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span style={{ fontSize: 24 }}>{e.emoji}</span>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "#0a1628" }}>{e.label}</div>
                          {on && <span style={{ marginLeft: "auto", color: "#10b981", fontSize: 16 }}>✓</span>}
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#64748b" }}>
                          +{lkr(e.cost)} · {e.unit}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL – Cost Summary ────────────────────────────────── */}
            <div style={{ position: "sticky", top: 90 }}>

              {/* Passenger & Days */}
              <div style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0a1628", marginBottom: 16 }}>Trip Settings</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Passengers</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => setPassengers(p => Math.max(1, p - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 16 }}>−</button>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "#0a1628", minWidth: 24, textAlign: "center" }}>{passengers}</span>
                      <button onClick={() => setPassengers(p => p + 1)} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 16 }}>+</button>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Days</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => setDays(d => Math.max(1, d - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 16 }}>−</button>
                      <span style={{ fontSize: 20, fontWeight: 700, color: "#0a1628", minWidth: 24, textAlign: "center" }}>{days}</span>
                      <button onClick={() => setDays(d => d + 1)} style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 16 }}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              {breakdown ? (
                <div className="fade-in" style={{ background: "linear-gradient(160deg, #0a1628 0%, #1a3a5c 100%)", borderRadius: 24, padding: 28, boxShadow: "0 12px 48px rgba(10,22,40,0.3)", color: "#fff" }}>

                  {/* Route summary */}
                  <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Route Overview</div>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      {[
                        { label: "Destinations", val: breakdown.placeCount },
                        { label: "Distance", val: `~${breakdown.routeKm} km` },
                        { label: "Drive Time", val: `~${breakdown.driveHours}h` },
                        { label: "Visit Time", val: `~${breakdown.visitHours}h` },
                      ].map(s => (
                        <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 16px", flex: "1 0 80px" }}>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: "#f0c060" }}>{s.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Districts visited */}
                    <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {breakdown.districts.map(d => (
                        <Badge key={d} label={`📌 ${d}`} color="#f0c060" />
                      ))}
                    </div>
                  </div>

                  {/* Cost lines */}
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Cost Breakdown</div>
                  {[
                    { label: `${vehicle.emoji} ${vehicle.name} (${days} day${days > 1 ? "s" : ""})`, val: breakdown.baseCost },
                    { label: `🛣️ Distance charge (~${breakdown.routeKm} km)`, val: breakdown.kmCost },
                    ...(breakdown.extraCosts > 0 ? [{ label: "✨ Add-on services", val: breakdown.extraCosts }] : []),
                    { label: "🙏 Driver tip (10%)", val: breakdown.tip, muted: true },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 13, color: row.muted ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.75)" }}>{row.label}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: row.muted ? "rgba(255,255,255,0.4)" : "#fff", fontWeight: 600 }}>
                        {lkr(row.val)}
                      </span>
                    </div>
                  ))}

                  {/* Total */}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Total Estimate</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 24, fontWeight: 800, color: "#f0c060" }}>{lkr(breakdown.total)}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4, textAlign: "right" }}>
                    ≈ ${Math.round(breakdown.total / 300)} USD · per trip
                  </div>

                  {/* Per person */}
                  <div style={{ marginTop: 10, background: "rgba(240,192,96,0.08)", border: "1px solid rgba(240,192,96,0.2)", borderRadius: 12, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Per person ({passengers} pax)</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, color: "#f0c060", fontWeight: 700 }}>
                      {lkr(Math.round(breakdown.total / passengers))}
                    </span>
                  </div>

                  {/* Requirements */}
                  {breakdown.reqs.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Trip Requirements</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {breakdown.reqs.map(r => (
                          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, background: `${r.color}12`, border: `1px solid ${r.color}30`, borderRadius: 10, padding: "8px 14px" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: r.color }}>{r.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What's included */}
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>What's Included</div>
                    {[
                      "Experienced local driver",
                      "Fuel & vehicle maintenance",
                      "Pick-up & drop-off",
                      "Parking fees",
                      "Driver tip (10%)",
                    ].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ color: "#10b981", fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    style={{ marginTop: 24, width: "100%", background: "linear-gradient(135deg, #f0c060, #c8973a)", color: "#0a1628", padding: "14px 0", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 800, fontFamily: "'Sora',sans-serif" }}
                    onClick={() => navigate("/drivers", { state: { selectedPlaces, vehicle: vehicleId, passengers, days, extras, estimatedCost: breakdown.total } })}>
                    Book This Trip →
                  </button>

                  <div style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
                    *Estimate only. Final price confirmed with driver.
                  </div>
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 24, padding: 40, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🗺️</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0a1628", marginBottom: 8 }}>Select Destinations</h3>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
                    Pick one or more places from the list to see your trip cost estimate, route distance, and travel requirements.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
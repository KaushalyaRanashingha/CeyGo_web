import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";

// ─── Weather code → icon + label ─────────────────────────────────────────────
function getWeatherMeta(code) {
  if (code >= 200 && code < 300) return { icon: "⛈️", label: "Thunderstorm", bg: "#1e293b", accent: "#6366f1" };
  if (code >= 300 && code < 400) return { icon: "🌦️", label: "Drizzle", bg: "#1e3a5f", accent: "#38bdf8" };
  if (code >= 500 && code < 600) return { icon: "🌧️", label: "Rain", bg: "#1e3a5f", accent: "#3b82f6" };
  if (code >= 600 && code < 700) return { icon: "❄️", label: "Snow", bg: "#1e2d4f", accent: "#93c5fd" };
  if (code >= 700 && code < 800) return { icon: "🌫️", label: "Mist/Fog", bg: "#374151", accent: "#9ca3af" };
  if (code === 800) return { icon: "☀️", label: "Clear Sky", bg: "#0c4a6e", accent: "#fbbf24" };
  if (code === 801) return { icon: "🌤️", label: "Few Clouds", bg: "#0f5380", accent: "#fed7aa" };
  if (code === 802) return { icon: "⛅", label: "Scattered Clouds", bg: "#1e4163", accent: "#fde68a" };
  if (code >= 803) return { icon: "☁️", label: "Cloudy", bg: "#334155", accent: "#94a3b8" };
  return { icon: "🌡️", label: "Unknown", bg: "#1e293b", accent: "#f0c060" };
}

function getDayLabel(dateStr, idx) {
  if (idx === 0) return "Today";
  if (idx === 1) return "Tomorrow";
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
}

function getMonthDay(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Humidity bar ─────────────────────────────────────────────────────────────
function HumidityBar({ value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: "linear-gradient(90deg, #38bdf8, #6366f1)", borderRadius: 999, transition: "width 1s ease" }} />
      </div>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", minWidth: 34 }}>{value}%</span>
    </div>
  );
}

// ─── UV Index label ───────────────────────────────────────────────────────────
function uvLabel(uv) {
  if (uv <= 2) return { label: "Low", color: "#4ade80" };
  if (uv <= 5) return { label: "Moderate", color: "#fbbf24" };
  if (uv <= 7) return { label: "High", color: "#f97316" };
  if (uv <= 10) return { label: "Very High", color: "#ef4444" };
  return { label: "Extreme", color: "#a855f7" };
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton({ w, h, r = 10 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: "linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
    }} />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Weather() {
  const location = useLocation();
  const navigate = useNavigate();

  // Destinations passed from router state or fetched from API
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(0);

  // ── Load destinations list ─────────────────────────────────────────────────
  useEffect(() => {
    const statePlace = location.state?.selectedPlace;

    fetch("/api/destinations")
      .then(r => r.json())
      .then(data => {
        setPlaces(data);
        // If navigated with a pre-selected place, use it; else auto-select first
        if (statePlace) {
          const found = data.find(p => p._id === statePlace._id || p.name === statePlace.name);
          setSelectedPlace(found || data[0] || null);
        } else {
          setSelectedPlace(data[0] || null);
        }
      })
      .catch(() => setError("Failed to load destinations."));
  }, []);

  // ── Fetch weather when place changes ───────────────────────────────────────
  useEffect(() => {
    if (!selectedPlace?.coordinates) return;
    const { lat, lng } = selectedPlace.coordinates;
    setLoading(true);
    setError(null);
    setCurrent(null);
    setForecast([]);
    setActiveDay(0);

    const API_KEY = "7d452f92c779008680801b95476b904c";

    Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(r => r.json()),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&cnt=56`).then(r => r.json()),
    ])
      .then(([cur, fore]) => {
        if (!cur.main) throw new Error("Invalid current weather response");

        setCurrent({
          temp: Math.round(cur.main.temp),
          feels: Math.round(cur.main.feels_like),
          humidity: cur.main.humidity,
          desc: cur.weather[0].description,
          code: cur.weather[0].id,
          wind: Math.round(cur.wind.speed * 3.6),
          pressure: cur.main.pressure,
          visibility: Math.round((cur.visibility || 10000) / 1000),
          sunrise: new Date(cur.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          sunset: new Date(cur.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        });

        // Group 3-hour slots into days
        const days = {};
        fore.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0];
          if (!days[date]) days[date] = [];
          days[date].push(item);
        });

        const dayArr = Object.entries(days).slice(0, 7).map(([date, slots]) => {
          const temps = slots.map(s => s.main.temp);
          const codes = slots.map(s => s.weather[0].id);
          const midSlot = slots[Math.floor(slots.length / 2)];
          return {
            date,
            min: Math.round(Math.min(...temps)),
            max: Math.round(Math.max(...temps)),
            code: midSlot.weather[0].id,
            desc: midSlot.weather[0].description,
            humidity: Math.round(slots.reduce((a, s) => a + s.main.humidity, 0) / slots.length),
            wind: Math.round(slots.reduce((a, s) => a + s.wind.speed, 0) / slots.length * 3.6),
            pop: Math.round(Math.max(...slots.map(s => (s.pop || 0) * 100))),
            hourly: slots.map(s => ({
              time: new Date(s.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
              temp: Math.round(s.main.temp),
              code: s.weather[0].id,
              pop: Math.round((s.pop || 0) * 100),
            })),
          };
        });

        setForecast(dayArr);
        setLoading(false);
      })
      .catch(err => {
        setError("Weather data unavailable. Please check your API key.");
        setLoading(false);
      });
  }, [selectedPlace]);

  const meta = current ? getWeatherMeta(current.code) : { bg: "#0c2d4f", accent: "#f0c060", icon: "🌤️", label: "" };
  const activeForecast = forecast[activeDay];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .weather-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; backdrop-filter: blur(10px); }
        .day-btn:hover { background: rgba(255,255,255,0.12) !important; transform: translateY(-2px); }
        .place-pill:hover { background: rgba(255,255,255,0.15) !important; }
        .hourly-item:hover { background: rgba(255,255,255,0.1) !important; transform: scale(1.03); }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>

      <Navbar />

      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${meta.bg} 0%, #0a1628 50%, #0a0f1e 100%)`,
        transition: "background 0.8s ease",
        paddingTop: 72,
      }}>

        {/* ── Background orbs ─────────────────────────────────────────── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-10%", left: "60%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${meta.accent}18 0%, transparent 70%)` }} />
          <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${meta.accent}10 0%, transparent 70%)` }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div style={{ marginBottom: 32 }}>
            <button onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "8px 16px", cursor: "pointer", fontSize: 14, marginBottom: 24 }}>
              ← Back
            </button>
            <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
              🌤️ Weather Forecast
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>
              Select a destination to see a live 7-day weather report
            </p>
          </div>

          {/* ── Destination Selector ─────────────────────────────────────── */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
              {places.map(p => (
                <button key={p._id} className="place-pill"
                  onClick={() => setSelectedPlace(p)}
                  style={{
                    flexShrink: 0,
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 16px", borderRadius: 999,
                    border: selectedPlace?._id === p._id ? `1.5px solid ${meta.accent}` : "1.5px solid rgba(255,255,255,0.12)",
                    background: selectedPlace?._id === p._id ? `${meta.accent}22` : "rgba(255,255,255,0.06)",
                    color: selectedPlace?._id === p._id ? meta.accent : "rgba(255,255,255,0.7)",
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    transition: "all 0.2s",
                  }}>
                  <img src={p.image} alt={p.name} style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 16, padding: "16px 20px", color: "#fca5a5", marginBottom: 24 }}>
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Skeleton w="100%" h={200} r={24} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
                {[...Array(7)].map((_, i) => <Skeleton key={i} w="100%" h={100} r={16} />)}
              </div>
            </div>
          )}

          {!loading && current && selectedPlace && (
            <div className="fade-up">

              {/* ── Current Weather Hero ──────────────────────────────────── */}
              <div className="weather-card" style={{ padding: "40px 48px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: meta.accent, background: `${meta.accent}20`, padding: "4px 12px", borderRadius: 999 }}>
                      📍 {selectedPlace.name}
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{selectedPlace.district} District</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 88, lineHeight: 1 }}>{meta.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 72, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                        {current.temp}°
                      </div>
                      <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", textTransform: "capitalize", marginTop: 4 }}>
                        {current.desc}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                    Feels like {current.feels}°C · {meta.label}
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, minWidth: 260 }}>
                  {[
                    { icon: "💧", label: "Humidity", val: `${current.humidity}%` },
                    { icon: "💨", label: "Wind", val: `${current.wind} km/h` },
                    { icon: "👁️", label: "Visibility", val: `${current.visibility} km` },
                    { icon: "🌡️", label: "Pressure", val: `${current.pressure} hPa` },
                    { icon: "🌅", label: "Sunrise", val: current.sunrise },
                    { icon: "🌇", label: "Sunset", val: current.sunset },
                  ].map(s => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "12px 16px" }}>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                        {s.icon} {s.label}
                      </div>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 18, fontWeight: 700, color: "#fff" }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 7-Day Forecast Strip ──────────────────────────────────── */}
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(forecast.length, 7)}, 1fr)`, gap: 12, marginBottom: 24 }}>
                {forecast.map((day, i) => {
                  const dm = getWeatherMeta(day.code);
                  const isActive = i === activeDay;
                  return (
                    <button key={day.date} className="day-btn"
                      onClick={() => setActiveDay(i)}
                      style={{
                        background: isActive ? `${meta.accent}22` : "rgba(255,255,255,0.05)",
                        border: isActive ? `1.5px solid ${meta.accent}` : "1.5px solid rgba(255,255,255,0.08)",
                        borderRadius: 18, padding: "18px 12px", cursor: "pointer", textAlign: "center",
                        transition: "all 0.2s", color: "#fff",
                      }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: isActive ? meta.accent : "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                        {getDayLabel(day.date, i)}
                      </div>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{dm.icon}</div>
                      <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 2 }}>{day.max}°</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{day.min}°</div>
                      {day.pop > 10 && (
                        <div style={{ marginTop: 6, fontSize: 11, color: "#38bdf8" }}>💧 {day.pop}%</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ── Active Day Detail ─────────────────────────────────────── */}
              {activeForecast && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>

                  {/* Day Summary Card */}
                  <div className="weather-card" style={{ padding: 28 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                      {getDayLabel(activeForecast.date, activeDay)} · {getMonthDay(activeForecast.date)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                      <span style={{ fontSize: 52 }}>{getWeatherMeta(activeForecast.code).icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 42, color: "#fff", fontWeight: 700 }}>
                          {activeForecast.max}°<span style={{ fontSize: 24, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>{activeForecast.min}°</span>
                        </div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", textTransform: "capitalize" }}>{activeForecast.desc}</div>
                      </div>
                    </div>

                    {[
                      { label: "Humidity", node: <HumidityBar value={activeForecast.humidity} /> },
                      { label: "Wind Speed", node: <span style={{ fontSize: 14, color: "#fff", fontFamily: "'Space Mono',monospace" }}>{activeForecast.wind} km/h</span> },
                      { label: "Rain Chance", node: <span style={{ fontSize: 14, color: "#38bdf8", fontFamily: "'Space Mono',monospace" }}>{activeForecast.pop}%</span> },
                    ].map(row => (
                      <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", minWidth: 100 }}>{row.label}</span>
                        <div style={{ flex: 1, marginLeft: 12 }}>{row.node}</div>
                      </div>
                    ))}

                    {/* Travel tip */}
                    <div style={{ marginTop: 20, background: `${meta.accent}15`, border: `1px solid ${meta.accent}30`, borderRadius: 14, padding: "12px 16px" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: meta.accent, marginBottom: 4 }}>💡 Travel Tip</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                        {activeForecast.pop > 60 ? "High chance of rain — carry an umbrella and waterproof bag." :
                         activeForecast.max > 32 ? "Very hot day — stay hydrated and avoid midday sun." :
                         activeForecast.code === 800 ? "Perfect clear day — ideal for outdoor sightseeing!" :
                         "Mild weather expected — great conditions for exploring."}
                      </div>
                    </div>
                  </div>

                  {/* Hourly Timeline */}
                  <div className="weather-card" style={{ padding: 28, overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                      Hourly Breakdown
                    </div>
                    <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                      {activeForecast.hourly.map((h, i) => {
                        const hm = getWeatherMeta(h.code);
                        return (
                          <div key={i} className="hourly-item"
                            style={{ flexShrink: 0, textAlign: "center", background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "14px 16px", transition: "all 0.2s", cursor: "default" }}>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{h.time}</div>
                            <div style={{ fontSize: 24, marginBottom: 8 }}>{hm.icon}</div>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 16, color: "#fff", fontWeight: 700 }}>{h.temp}°</div>
                            {h.pop > 0 && <div style={{ fontSize: 11, color: "#38bdf8", marginTop: 4 }}>💧{h.pop}%</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Week Temperature Chart ────────────────────────────────── */}
              <div className="weather-card" style={{ padding: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
                  7-Day Temperature Overview
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 120 }}>
                  {forecast.map((day, i) => {
                    const allTemps = forecast.flatMap(d => [d.min, d.max]);
                    const minAll = Math.min(...allTemps);
                    const maxAll = Math.max(...allTemps);
                    const range = maxAll - minAll || 1;
                    const barH = Math.max(20, ((day.max - minAll) / range) * 90);
                    const dm = getWeatherMeta(day.code);
                    return (
                      <div key={day.date} onClick={() => setActiveDay(i)}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
                        <span style={{ fontSize: 13, fontFamily: "'Space Mono',monospace", color: i === activeDay ? meta.accent : "#fff", fontWeight: 700 }}>{day.max}°</span>
                        <div style={{ width: "100%", maxWidth: 44, borderRadius: 12, background: i === activeDay ? `linear-gradient(180deg, ${meta.accent}, ${meta.accent}80)` : "rgba(255,255,255,0.12)", height: barH, transition: "all 0.3s", minHeight: 20 }} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{getDayLabel(day.date, i).slice(0, 3)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {!loading && !current && !error && selectedPlace && (
            <div style={{ textAlign: "center", padding: 80, color: "rgba(255,255,255,0.4)" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🌍</div>
              <p>Loading weather for {selectedPlace.name}...</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
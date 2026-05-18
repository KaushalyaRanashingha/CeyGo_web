import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";

// ─── Hotel Data ───────────────────────────────────────────────────────────────
const HOTELS = [
  {
    id: 1,
    name: "Cape Weligama",
    district: "Matara",
    type: "Luxury Resort",
    rating: 4.9,
    reviews: 1284,
    price: 420,
    img: "https://th.bing.com/th/id/R.44fbe539ddbdd08382eb41a7ac40b62e?rik=K2Ft7cQLeStFBA&pid=ImgRaw&r=0",
    amenities: ["Infinity Pool", "Spa", "Fine Dining", "Ocean View", "Butler Service"],
    desc: "Perched dramatically on a cliff above Weligama Bay, this iconic resort offers uninterrupted Indian Ocean views from every villa.",
    location: "Weligama Bay, Matara",
    badge: "Most Loved",
    badgeColor: "#f0c060",
  },
  {
    id: 2,
    name: "Jetwing Lighthouse",
    district: "Galle",
    type: "Boutique Hotel",
    rating: 4.8,
    reviews: 976,
    price: 280,
    img: "https://tse2.mm.bing.net/th/id/OIP.kMSMtpLrN4Y-i4dLBKgBpAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    amenities: ["Sea View Pool", "Restaurant", "Bar", "Wi-Fi", "Gym"],
    desc: "A landmark hotel near Galle Fort designed by Geoffrey Bawa, blending colonial heritage with modern luxury on the ocean's edge.",
    location: "Dadella, Galle",
    badge: "Geoffrey Bawa",
    badgeColor: "#6366f1",
  },
  {
    id: 3,
    name: "Amanwella",
    district: "Matara",
    type: "Luxury Resort",
    rating: 4.9,
    reviews: 654,
    price: 890,
    img: "https://tse1.mm.bing.net/th/id/OIP.rZH_mLVK1KJQdHi3w5X73QHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    amenities: ["Private Beach", "Pool Suite", "Ayurveda Spa", "Yoga", "Snorkeling"],
    desc: "Ultra-private sanctuary on Tangalle's pristine beach. Each suite has its own private pool overlooking the Indian Ocean.",
    location: "Tangalle, Matara",
    badge: "Ultra Luxury",
    badgeColor: "#ec4899",
  },
  {
    id: 4,
    name: "Cantaloupe Levels",
    district: "Galle",
    type: "Boutique Hotel",
    rating: 4.7,
    reviews: 432,
    price: 195,
    img: "https://tse3.mm.bing.net/th/id/OIP.M1yGzJ3d5lN3GDjJm_vI6gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    amenities: ["Rooftop Bar", "Pool", "Restaurant", "City View", "Wi-Fi"],
    desc: "A spectacular hilltop hotel overlooking Galle Fort and the Indian Ocean. The rooftop bar at sunset is legendary.",
    location: "Galle Fort, Galle",
    badge: "Best View",
    badgeColor: "#0891b2",
  },
  {
    id: 5,
    name: "Kumu Beach",
    district: "Hambantota",
    type: "Beach Resort",
    rating: 4.6,
    reviews: 318,
    price: 155,
    img: "https://tse4.mm.bing.net/th/id/OIP.NWCzOt6oSTmGYPMYikdBkgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    amenities: ["Beach Access", "Pool", "Surfing", "Restaurant", "Water Sports"],
    desc: "A relaxed beachfront property right on the famous Arugam Bay surf break. Perfect for surfers and beach lovers.",
    location: "Tangalle Beach, Hambantota",
    badge: "Beachfront",
    badgeColor: "#059669",
  },
  {
    id: 6,
    name: "Clove Villa",
    district: "Galle",
    type: "Villa",
    rating: 4.8,
    reviews: 289,
    price: 340,
    img: "https://tse1.mm.bing.net/th/id/OIP.Kh6i2kGWKuJe6fjNnq3tHQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    amenities: ["Private Pool", "Chef", "Garden", "4 Bedrooms", "Concierge"],
    desc: "An exclusive private villa nestled in Galle's lush countryside with a private chef and pool. Perfect for families or groups.",
    location: "Unawatuna, Galle",
    badge: "Private Villa",
    badgeColor: "#d97706",
  },
  {
    id: 7,
    name: "Wild Coast Tented Lodge",
    district: "Hambantota",
    type: "Eco Lodge",
    rating: 4.9,
    reviews: 521,
    price: 650,
    img: "https://tse2.mm.bing.net/th/id/OIP.fVpQ2wgJmvLB1UG4d6W07gHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    amenities: ["Safari", "Tented Suites", "Pool", "Wildlife", "Guided Walks"],
    desc: "Luxurious cocoon-shaped tented suites on the edge of Yala National Park. Elephants and leopards are regular visitors.",
    location: "Yala, Hambantota",
    badge: "Eco Luxury",
    badgeColor: "#16a34a",
  },
  {
    id: 8,
    name: "Rainforest Eco Lodge",
    district: "Deniyaya",
    type: "Eco Lodge",
    rating: 4.7,
    reviews: 198,
    price: 95,
    img: "https://th.bing.com/th/id/R.aa065b767a48befd720952f6fdfe708c?rik=%2bODJJ3TCV6qYmg&pid=ImgRaw&r=0",
    amenities: ["Rainforest Trek", "Bird Watching", "Organic Meals", "River Swim", "Wi-Fi"],
    desc: "Tucked inside the Sinharaja Rainforest buffer zone. Wake to the sound of endemic birds and walk into the UNESCO forest.",
    location: "Sinharaja, Deniyaya",
    badge: "UNESCO Buffer",
    badgeColor: "#7c3aed",
  },
];

const DISTRICTS = ["All Districts", "Galle", "Matara", "Hambantota", "Deniyaya"];
const TYPES = ["All Types", "Luxury Resort", "Boutique Hotel", "Beach Resort", "Villa", "Eco Lodge"];
const SORT_OPTIONS = ["Top Rated", "Price: Low to High", "Price: High to Low", "Most Reviewed"];

const TYPE_ICONS = {
  "Luxury Resort": "💎",
  "Boutique Hotel": "🏛️",
  "Beach Resort": "🏖️",
  "Villa": "🏡",
  "Eco Lodge": "🌿",
};

// ─── Hotel Card ───────────────────────────────────────────────────────────────
function HotelCard({ hotel, onBook }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: hovered ? "0 24px 64px rgba(10,22,40,0.18)" : "0 4px 24px rgba(0,0,0,0.07)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        border: "1px solid #ede8e0",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img
          src={hotel.img}
          alt={hotel.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.75) 0%, transparent 55%)" }} />

        {/* Badge */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          background: hotel.badgeColor, color: "#fff",
          padding: "4px 12px", borderRadius: 999,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
        }}>
          {hotel.badge}
        </div>

        {/* Rating */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(10,22,40,0.75)", backdropFilter: "blur(8px)",
          color: "#f0c060", padding: "4px 12px", borderRadius: 999,
          fontSize: 12, fontWeight: 700,
        }}>
          ⭐ {hotel.rating}
        </div>

        {/* Type + Name */}
        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
            {TYPE_ICONS[hotel.type]} {hotel.type}
          </span>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginTop: 2,
          }}>
            {hotel.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <p style={{ fontSize: 12, color: "#9a8a6a", marginBottom: 10 }}>📍 {hotel.location}</p>
        <p style={{
          fontSize: 13, color: "#5a4a30", lineHeight: 1.65, marginBottom: 14,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {hotel.desc}
        </p>

        {/* Amenities */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {hotel.amenities.slice(0, 3).map(a => (
            <span key={a} style={{
              background: "#f5f0e8", color: "#6a5a40",
              padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            }}>
              {a}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span style={{
              background: "#f0ece6", color: "#9a8a6a",
              padding: "3px 10px", borderRadius: 999, fontSize: 11,
            }}>
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0a1628", fontFamily: "'Cormorant Garamond', serif" }}>
              ${hotel.price}
            </span>
            <span style={{ fontSize: 12, color: "#9a8a6a" }}> / night</span>
            <div style={{ fontSize: 11, color: "#9a8a6a", marginTop: 1 }}>{hotel.reviews.toLocaleString()} reviews</div>
          </div>
          <button
            onClick={() => onBook(hotel)}
            style={{
              background: "linear-gradient(135deg, #0a1628, #1a2a4a)",
              color: "#f0c060", padding: "10px 22px", borderRadius: 12,
              border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
              fontFamily: "inherit", transition: "all 0.2s",
              boxShadow: hovered ? "0 8px 24px rgba(10,22,40,0.3)" : "none",
            }}
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ hotel, onClose }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  if (!hotel) return null;

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 0;
  const total = nights * hotel.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,22,40,0.85)",
      zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 28, width: "100%", maxWidth: 520,
        overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        animation: "slideUp 0.3s ease",
      }}>
        {submitted ? (
          <div style={{ padding: "60px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#0a1628", marginBottom: 12 }}>
              Booking Requested!
            </h2>
            <p style={{ color: "#6a5a40", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Your booking inquiry for <strong>{hotel.name}</strong> has been sent.<br />
              The hotel will confirm within 24 hours.
            </p>
            <button onClick={onClose} style={{
              background: "linear-gradient(135deg, #0a1628, #1a2a4a)", color: "#f0c060",
              padding: "14px 40px", borderRadius: 14, border: "none", cursor: "pointer",
              fontSize: 15, fontWeight: 700, fontFamily: "inherit",
            }}>
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{
              background: "linear-gradient(135deg, #0a1628, #1a3a5c)",
              padding: "24px 28px", position: "relative",
            }}>
              <button onClick={onClose} style={{
                position: "absolute", top: 20, right: 20,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", width: 36, height: 36, borderRadius: "50%",
                cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
                Reserve Your Stay
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#f0c060", margin: 0 }}>
                {hotel.name}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>📍 {hotel.location}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Check-In
                  </label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required
                    min={new Date().toISOString().split("T")[0]}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 12,
                      border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628",
                      background: "#fdfaf5", outline: "none", fontFamily: "inherit",
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Check-Out
                  </label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 12,
                      border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628",
                      background: "#fdfaf5", outline: "none", fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Guests
                </label>
                <select value={guests} onChange={e => setGuests(Number(e.target.value))}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 12,
                    border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628",
                    background: "#fdfaf5", outline: "none", fontFamily: "inherit",
                  }}
                >
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>

              {/* Price Summary */}
              {nights > 0 && (
                <div style={{
                  background: "linear-gradient(135deg, #0a1628, #1a2a4a)",
                  borderRadius: 16, padding: "16px 20px", marginBottom: 20,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>${hotel.price} × {nights} night{nights > 1 ? "s" : ""}</span>
                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>${total.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <span style={{ color: "#f0c060", fontSize: 15, fontWeight: 700 }}>Total</span>
                    <span style={{ color: "#f0c060", fontSize: 18, fontWeight: 800 }}>${total.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button type="submit" style={{
                width: "100%", background: "linear-gradient(135deg, #f0c060, #c8973a)",
                color: "#0a1628", padding: "15px 0", borderRadius: 14,
                border: "none", cursor: "pointer", fontSize: 15, fontWeight: 800,
                fontFamily: "inherit", boxShadow: "0 8px 24px rgba(240,192,96,0.4)",
              }}>
                Confirm Booking Request
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(24px); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>
    </div>
  );
}

// ─── Main Hotels Page ─────────────────────────────────────────────────────────
export default function Hotels() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState(searchParams.get("district") || "All Districts");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("Top Rated");
  const [bookingHotel, setBookingHotel] = useState(null);

  const filtered = HOTELS
    .filter(h => {
      const q = search.toLowerCase();
      return (h.name.toLowerCase().includes(q) || h.desc.toLowerCase().includes(q) || h.location.toLowerCase().includes(q))
        && (district === "All Districts" || h.district === district)
        && (type === "All Types" || h.type === type);
    })
    .sort((a, b) => {
      if (sort === "Top Rated") return b.rating - a.rating;
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      if (sort === "Most Reviewed") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f0e8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(10,22,40,0.2); border-radius: 3px; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .hotel-card { animation: fadeInUp 0.4s ease forwards; }
        .hotel-card:nth-child(2) { animation-delay:0.06s; }
        .hotel-card:nth-child(3) { animation-delay:0.12s; }
        .hotel-card:nth-child(4) { animation-delay:0.18s; }
        .hotel-card:nth-child(5) { animation-delay:0.24s; }
        .hotel-card:nth-child(6) { animation-delay:0.3s; }
      `}</style>

      <Navbar />

      <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>

        {/* ── HERO ── */}
        <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.kMSMtpLrN4Y-i4dLBKgBpAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Hotels"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.8) 70%, rgba(10,22,40,0.96) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ background: "rgba(240,192,96,0.15)", border: "1px solid rgba(240,192,96,0.3)", color: "#f0c060", padding: "5px 18px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              🏨 Accommodation
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>
              Where to Stay in<br /><span style={{ color: "#f0c060" }}>Southern Sri Lanka</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.7, marginBottom: 32 }}>
              From clifftop luxury resorts to jungle eco-lodges — {HOTELS.length} hand-selected properties.
            </p>
            {/* Search */}
            <div style={{ width: "100%", maxWidth: 560, position: "relative" }}>
              <span style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</span>
              <input
                type="text"
                placeholder="Search hotels, resorts, villas..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "16px 20px 16px 50px", borderRadius: 999,
                  fontSize: 15, border: "none", outline: "none",
                  background: "rgba(255,255,255,0.97)", color: "#0a1628",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.3)", fontFamily: "inherit",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── FILTERS ── */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e8e2d6",
          padding: "14px 32px", position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { label: "District", value: district, options: DISTRICTS, onChange: setDistrict },
              { label: "Type", value: type, options: TYPES, onChange: setType },
              { label: "Sort", value: sort, options: SORT_OPTIONS, onChange: setSort },
            ].map(({ label, value, options, onChange }) => (
              <select key={label} value={value} onChange={e => onChange(e.target.value)}
                style={{
                  padding: "9px 16px", borderRadius: 999, border: "1.5px solid #e8e2d6",
                  fontSize: 13, color: "#0a1628", background: "#fdfaf5",
                  cursor: "pointer", fontFamily: "inherit", outline: "none",
                }}>
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 13, color: "#9a8a6a" }}>
              {filtered.length} propert{filtered.length === 1 ? "y" : "ies"}
            </span>
          </div>
        </div>

        {/* ── GRID ── */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 80px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9a8a6a" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🏨</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: "#0a1628", marginBottom: 10 }}>No hotels found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 28 }}>
              {filtered.map(hotel => (
                <div key={hotel.id} className="hotel-card">
                  <HotelCard hotel={hotel} onBook={setBookingHotel} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {bookingHotel && <BookingModal hotel={bookingHotel} onClose={() => setBookingHotel(null)} />}
    </>
  );
}
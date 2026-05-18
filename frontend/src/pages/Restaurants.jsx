import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/home/Navbar";

// ─── Restaurant Data ──────────────────────────────────────────────────────────
const RESTAURANTS = [
  {
    id: 1,
    name: "The Tuna & the Crab",
    district: "Galle",
    cuisine: "Seafood",
    rating: 4.9,
    reviews: 1876,
    priceRange: "$$$",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoV6v8OseXegOlaSQz5HCE5C4_kZd8VSTxcXcXCv1aWtiwEMrCSLp9MEIa7shr8STExCGi75mvCYRRg1jhIyIPfh5rHYR-ZRkcaxV3sg4gnIJmfelm9IxGUIsScSMFTjFrkZNm8UAZMvkFEI65NV86Lij-gmnzn5_DOoOUPpyCjksEbu4lJVEwyFzI7SiewU58Eodu00UNWscTQMXHqum1ZB-4j3iPgyTyM9Q9XLAx5VKq26oerKIS-W2cg5Pz_BsxXcYL1zcsBl0",
    desc: "A legendary Galle Fort institution. The crab curry is a rite of passage — rich coconut gravy, fresh catch, perfection.",
    location: "Galle Fort, Galle",
    tags: ["Must Try", "Crab Curry", "Ocean View"],
    openHours: "12:00 PM – 10:30 PM",
    badge: "🏆 Icon",
    badgeColor: "#f0c060",
  },
  {
    id: 2,
    name: "Wijaya Beach Restaurant",
    district: "Matara",
    cuisine: "Sri Lankan",
    rating: 4.8,
    reviews: 943,
    priceRange: "$$",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCApI1rMpA_J12PXNJiEiJ-VhD_XQGGaQ0NMbThPw5ezlsYrU1R_fsxpwuCASh7OYuNiF9CT416eGwF9stSFSuRfqU-lnABSYuWck3WuU8tDMn8HDd1sOqnRp1QxLguHDTk9W6mVyBC8nftrbqni3VKXT6AmwuCUUnaJJbXfvGu6NlJhi06KrlTPWLmpmL8lr6IM9AHifqr-MFXsMnDRhfZqJya3XUIq9KDt53PXbf8dku_9rs-87Mfp9rALszaRRZRR6bACDiXKeE",
    desc: "Rice & curry eaten barefoot on the sand with waves at your feet. Authentic home cooking that feels like eating at a local family's table.",
    location: "Mirissa Beach, Matara",
    tags: ["Authentic", "Rice & Curry", "Beachfront"],
    openHours: "7:00 AM – 9:00 PM",
    badge: "🌊 Beachfront",
    badgeColor: "#0891b2",
  },
  {
    id: 3,
    name: "Spaghetti & Co",
    district: "Galle",
    cuisine: "Italian",
    rating: 4.7,
    reviews: 612,
    priceRange: "$$",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0SzDO_uBwMPiptFsAT9wNoa1fCK3iQ46RpJDw21TTF8_UToRRVKdX9zEgoRW7GkyV2hZARyhvsRx2UGeWH8ealZP8Fp74WOv69r2NmUQlWjH-lLSaansnRfvBL8uJA-ItvRDPg4kUrqwLZhq64XrAT3THpLgxFTZv27YP6ma3VbMRm5wCMZ-v6s94XQ2FwVdB3E0mq62jbCuXvVlpxAJvDdOhX6RDo7RbU-rY0aFKUhBW6crahrRJnla2dswDBhA7FjuLEMadgDM",
    desc: "Inside the Galle Fort walls, this charming Italian trattoria serves house-made pasta and wood-fired pizza with a tropical twist.",
    location: "Galle Fort, Galle",
    tags: ["Wood-Fired", "Pasta", "Fort Walls"],
    openHours: "11:00 AM – 11:00 PM",
    badge: "🍝 Italian",
    badgeColor: "#dc2626",
  },
  {
    id: 4,
    name: "Mama's Rooftop",
    district: "Matara",
    cuisine: "Sri Lankan",
    rating: 4.8,
    reviews: 784,
    priceRange: "$",
    img: "https://tse3.mm.bing.net/th/id/OIP.ONiYMSDTZYJxQulriOjjPgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Mirissa's best-kept secret. A tiny rooftop with sweeping ocean views, cooking up the most flavourful fish curry on the south coast.",
    location: "Mirissa, Matara",
    tags: ["Budget Friendly", "Rooftop", "Fish Curry"],
    openHours: "8:00 AM – 8:00 PM",
    badge: "💰 Best Value",
    badgeColor: "#16a34a",
  },
  {
    id: 5,
    name: "Sun House Restaurant",
    district: "Galle",
    cuisine: "Fusion",
    rating: 4.9,
    reviews: 1023,
    priceRange: "$$$",
    img: "https://tse1.mm.bing.net/th/id/OIP.aFJCygXLFWxxCQ253FF3XQHaFF?rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "A colonial-era boutique hotel restaurant in Galle serving inspired fusion cuisine in a candlelit tropical garden setting.",
    location: "Upper Dickson Road, Galle",
    tags: ["Fine Dining", "Garden Setting", "Cocktails"],
    openHours: "7:00 PM – 10:30 PM",
    badge: "✨ Fine Dining",
    badgeColor: "#7c3aed",
  },
  {
    id: 6,
    name: "Dilmah Tea Lounge",
    district: "Deniyaya",
    cuisine: "Café & Tea",
    rating: 4.6,
    reviews: 287,
    priceRange: "$",
    img: "https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_82fc88f1ef.jpg",
    desc: "Surrounded by tea estates in Deniyaya, this peaceful café serves freshly brewed Ceylon teas with homemade kottu and roti.",
    location: "Sinharaja Road, Deniyaya",
    tags: ["Ceylon Tea", "Rainforest", "Breakfast"],
    openHours: "6:30 AM – 6:00 PM",
    badge: "🍵 Tea Estate",
    badgeColor: "#65a30d",
  },
  {
    id: 7,
    name: "Roti Café",
    district: "Hambantota",
    cuisine: "Sri Lankan",
    rating: 4.7,
    reviews: 445,
    priceRange: "$",
    img: "https://tse3.mm.bing.net/th/id/OIP.0vpZxIWSQOk_uHkgelHdrwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "A beloved local spot near Yala serving hearty roti parcels, kottu, and dhal that safari-goers swear by before morning game drives.",
    location: "Tissamaharama, Hambantota",
    tags: ["Pre-Safari", "Kottu", "Local Favourite"],
    openHours: "5:30 AM – 9:00 PM",
    badge: "🦁 Safari Fuel",
    badgeColor: "#d97706",
  },
  {
    id: 8,
    name: "Wijaya Crab House",
    district: "Matara",
    cuisine: "Seafood",
    rating: 4.8,
    reviews: 678,
    priceRange: "$$$",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCApI1rMpA_J12PXNJiEiJ-VhD_XQGGaQ0NMbThPw5ezlsYrU1R_fsxpwuCASh7OYuNiF9CT416eGwF9stSFSuRfqU-lnABSYuWck3WuU8tDMn8HDd1sOqnRp1QxLguHDTk9W6mVyBC8nftrbqni3VKXT6AmwuCUUnaJJbXfvGu6NlJhi06KrlTPWLmpmL8lr6IM9AHifqr-MFXsMnDRhfZqJya3XUIq9KDt53PXbf8dku_9rs-87Mfp9rALszaRRZRR6bACDiXKeE",
    desc: "The definitive crab dining experience on the south coast. Live mud crabs, multiple preparations, and a legendary butter garlic sauce.",
    location: "Weligama, Matara",
    tags: ["Live Crab", "Butter Garlic", "Weligama Bay"],
    openHours: "11:00 AM – 10:00 PM",
    badge: "🦀 Signature",
    badgeColor: "#f0c060",
  },
];

const DISTRICTS = ["All Districts", "Galle", "Matara", "Hambantota", "Deniyaya"];
const CUISINES = ["All Cuisines", "Seafood", "Sri Lankan", "Italian", "Fusion", "Café & Tea"];
const PRICE_RANGES = ["All Prices", "$", "$$", "$$$"];
const SORT_OPTIONS = ["Top Rated", "Most Reviewed", "Name A–Z"];

const CUISINE_ICONS = {
  "Seafood": "🦞",
  "Sri Lankan": "🍛",
  "Italian": "🍝",
  "Fusion": "⚗️",
  "Café & Tea": "☕",
};

const PRICE_COLORS = { "$": "#16a34a", "$$": "#d97706", "$$$": "#dc2626" };

// ─── Restaurant Card ──────────────────────────────────────────────────────────
function RestaurantCard({ restaurant, onReserve }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 24, overflow: "hidden",
        boxShadow: hovered ? "0 24px 64px rgba(10,22,40,0.18)" : "0 4px 24px rgba(0,0,0,0.07)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        border: "1px solid #ede8e0",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
        <img
          src={restaurant.img}
          alt={restaurant.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.6s", transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 55%)" }} />

        <div style={{
          position: "absolute", top: 14, left: 14,
          background: restaurant.badgeColor, color: "#fff",
          padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
        }}>
          {restaurant.badge}
        </div>

        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(10,22,40,0.75)", backdropFilter: "blur(8px)",
          color: "#f0c060", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700,
        }}>
          ⭐ {restaurant.rating}
        </div>

        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
              {CUISINE_ICONS[restaurant.cuisine]} {restaurant.cuisine}
            </span>
            <span style={{
              fontSize: 12, fontWeight: 800,
              color: PRICE_COLORS[restaurant.priceRange],
              background: "rgba(255,255,255,0.9)",
              padding: "1px 8px", borderRadius: 999,
            }}>
              {restaurant.priceRange}
            </span>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>
            {restaurant.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <p style={{ fontSize: 12, color: "#9a8a6a" }}>📍 {restaurant.location}</p>
          <p style={{ fontSize: 11, color: "#9a8a6a" }}>🕐 {restaurant.openHours}</p>
        </div>
        <p style={{
          fontSize: 13, color: "#5a4a30", lineHeight: 1.65, marginBottom: 12,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {restaurant.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {restaurant.tags.map(t => (
            <span key={t} style={{
              background: "#f5f0e8", color: "#6a5a40",
              padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, color: "#9a8a6a" }}>
            {restaurant.reviews.toLocaleString()} reviews
          </div>
          <button
            onClick={() => onReserve(restaurant)}
            style={{
              background: "linear-gradient(135deg, #0a1628, #1a2a4a)",
              color: "#f0c060", padding: "10px 20px", borderRadius: 12,
              border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
              fontFamily: "inherit",
            }}
          >
            Reserve Table →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Reservation Modal ────────────────────────────────────────────────────────
function ReservationModal({ restaurant, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!restaurant) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(10,22,40,0.85)",
      zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 28, width: "100%", maxWidth: 500,
        overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        animation: "slideUp 0.3s ease",
      }}>
        {submitted ? (
          <div style={{ padding: "60px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🍽️</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "#0a1628", marginBottom: 12 }}>
              Table Reserved!
            </h2>
            <p style={{ color: "#6a5a40", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              Your reservation at <strong>{restaurant.name}</strong> is confirmed.<br />
              We'll send a reminder to your number.
            </p>
            <button onClick={onClose} style={{
              background: "linear-gradient(135deg, #0a1628, #1a2a4a)", color: "#f0c060",
              padding: "13px 36px", borderRadius: 14, border: "none",
              cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
            }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={{ background: "linear-gradient(135deg, #0a1628, #1a3a5c)", padding: "24px 28px", position: "relative" }}>
              <button onClick={onClose} style={{
                position: "absolute", top: 20, right: 20,
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", width: 36, height: 36, borderRadius: "50%",
                cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Reserve a Table</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#f0c060", margin: 0 }}>
                {restaurant.name}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>📍 {restaurant.location}</p>
            </div>

            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ padding: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                    min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628", background: "#fdfaf5", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Time</label>
                  <select value={time} onChange={e => setTime(e.target.value)} required
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628", background: "#fdfaf5", outline: "none", fontFamily: "inherit" }}>
                    <option value="">Select time</option>
                    {["12:00 PM","1:00 PM","2:00 PM","6:00 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Guests</label>
                <select value={guests} onChange={e => setGuests(Number(e.target.value))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628", background: "#fdfaf5", outline: "none", fontFamily: "inherit" }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Full name"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628", background: "#fdfaf5", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#6a5a40", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+94 77 000 0000"
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e8e2d6", fontSize: 14, color: "#0a1628", background: "#fdfaf5", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              </div>

              <button type="submit" style={{
                width: "100%", background: "linear-gradient(135deg, #f0c060, #c8973a)",
                color: "#0a1628", padding: "14px 0", borderRadius: 14, border: "none",
                cursor: "pointer", fontSize: 15, fontWeight: 800, fontFamily: "inherit",
                boxShadow: "0 8px 24px rgba(240,192,96,0.4)",
              }}>
                Confirm Reservation
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`@keyframes slideUp { from { transform:translateY(24px);opacity:0; } to { transform:translateY(0);opacity:1; } }`}</style>
    </div>
  );
}

// ─── Main Restaurants Page ────────────────────────────────────────────────────
export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState(searchParams.get("district") || "All Districts");
  const [cuisine, setCuisine] = useState("All Cuisines");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [sort, setSort] = useState("Top Rated");
  const [reservingAt, setReservingAt] = useState(null);

  const filtered = RESTAURANTS
    .filter(r => {
      const q = search.toLowerCase();
      return (r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q))
        && (district === "All Districts" || r.district === district)
        && (cuisine === "All Cuisines" || r.cuisine === cuisine)
        && (priceRange === "All Prices" || r.priceRange === priceRange);
    })
    .sort((a, b) => {
      if (sort === "Top Rated") return b.rating - a.rating;
      if (sort === "Most Reviewed") return b.reviews - a.reviews;
      if (sort === "Name A–Z") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'DM Sans',sans-serif; background:#f5f0e8; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-thumb { background:rgba(10,22,40,0.2); border-radius:3px; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        .rest-card { animation:fadeInUp 0.4s ease forwards; }
        .rest-card:nth-child(2){animation-delay:0.06s;}
        .rest-card:nth-child(3){animation-delay:0.12s;}
        .rest-card:nth-child(4){animation-delay:0.18s;}
        .rest-card:nth-child(5){animation-delay:0.24s;}
        .rest-card:nth-child(6){animation-delay:0.3s;}
      `}</style>

      <Navbar />

      <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>

        {/* HERO */}
        <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoV6v8OseXegOlaSQz5HCE5C4_kZd8VSTxcXcXCv1aWtiwEMrCSLp9MEIa7shr8STExCGi75mvCYRRg1jhIyIPfh5rHYR-ZRkcaxV3sg4gnIJmfelm9IxGUIsScSMFTjFrkZNm8UAZMvkFEI65NV86Lij-gmnzn5_DOoOUPpyCjksEbu4lJVEwyFzI7SiewU58Eodu00UNWscTQMXHqum1ZB-4j3iPgyTyM9Q9XLAx5VKq26oerKIS-W2cg5Pz_BsxXcYL1zcsBl0"
            alt="Restaurants"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,22,40,0.35) 0%, rgba(10,22,40,0.8) 65%, rgba(10,22,40,0.97) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ background: "rgba(240,192,96,0.15)", border: "1px solid rgba(240,192,96,0.3)", color: "#f0c060", padding: "5px 18px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
              🍽️ Dining & Food
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>
              Taste the South<br /><span style={{ color: "#f0c060" }}>Best Restaurants</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 460, lineHeight: 1.7, marginBottom: 30 }}>
              From crab curry on the Fort walls to beachfront rice & curry — the flavours of Southern Sri Lanka.
            </p>
            <div style={{ width: "100%", maxWidth: 540, position: "relative" }}>
              <span style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</span>
              <input type="text" placeholder="Search cuisine, restaurant, location..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", padding: "16px 20px 16px 50px", borderRadius: 999, fontSize: 15, border: "none", outline: "none", background: "rgba(255,255,255,0.97)", color: "#0a1628", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", fontFamily: "inherit" }}
              />
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e2d6", padding: "14px 32px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { value: district, options: DISTRICTS, onChange: setDistrict },
              { value: cuisine, options: CUISINES, onChange: setCuisine },
              { value: priceRange, options: PRICE_RANGES, onChange: setPriceRange },
              { value: sort, options: SORT_OPTIONS, onChange: setSort },
            ].map(({ value, options, onChange }, i) => (
              <select key={i} value={value} onChange={e => onChange(e.target.value)}
                style={{ padding: "9px 16px", borderRadius: 999, border: "1.5px solid #e8e2d6", fontSize: 13, color: "#0a1628", background: "#fdfaf5", cursor: "pointer", fontFamily: "inherit", outline: "none" }}>
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 13, color: "#9a8a6a" }}>{filtered.length} restaurants</span>
          </div>
        </div>

        {/* GRID */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 80px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9a8a6a" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🍽️</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: "#0a1628", marginBottom: 10 }}>No restaurants found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 28 }}>
              {filtered.map(r => (
                <div key={r.id} className="rest-card">
                  <RestaurantCard restaurant={r} onReserve={setReservingAt} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {reservingAt && <ReservationModal restaurant={reservingAt} onClose={() => setReservingAt(null)} />}
    </>
  );
}
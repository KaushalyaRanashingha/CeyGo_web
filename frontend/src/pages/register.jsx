import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5004/api/auth";

// ─── Password strength ────────────────────────────────────────────────────────
function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}
const strengthMeta = [
  null,
  { label: "Weak",   color: "#e05252" },
  { label: "Fair",   color: "#e09a3a" },
  { label: "Good",   color: "#4caf88" },
  { label: "Strong", color: "#006a65" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeOpen = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOff = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink:      #0d1117;
  --teal:     #006a65;
  --teal-lt:  #00938c;
  --gold:     #c9a84c;
  --gold-lt:  #e2c97e;
  --cream:    #f8f4ed;
  --warm:     #ede8df;
  --muted:    #7a7568;
  --err:      #c0392b;
  --white:    #ffffff;
  --border:   rgba(13,17,23,0.1);
}

html, body { height: 100%; }
body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--ink); min-height: 100vh; }

/* ── Layout ── */
.rg-page {
  display: grid;
  grid-template-columns: 52% 1fr;
  min-height: 100vh;
}

/* ── Left Panel ── */
.rg-left {
  position: relative;
  overflow: hidden;
  background: var(--ink);
}
.rg-bg-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.42;
  transform: scale(1.05);
  transition: transform 18s ease;
}
.rg-left:hover .rg-bg-img { transform: scale(1.0); }
.rg-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(to top,  rgba(13,17,23,0.97) 0%,  rgba(13,17,23,0.15) 65%, transparent 100%),
    linear-gradient(to right, rgba(13,17,23,0.35) 0%, transparent 55%);
}
/* Diagonal notch */
.rg-left::after {
  content: '';
  position: absolute;
  top: 0; right: -1px; bottom: 0;
  width: 72px;
  background: var(--cream);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  z-index: 2;
}
.rg-left-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 48px 60px 72px 56px;
}

/* Logo */
.rg-logo {
  font-family: 'Playfair Display', serif;
  font-size: 28px; font-style: italic; font-weight: 700;
  color: var(--white);
  letter-spacing: -0.02em;
  cursor: pointer; user-select: none;
  display: inline-flex; align-items: center; gap: 10px;
}
.rg-logo-dot {
  width: 8px; height: 8px;
  background: var(--gold);
  border-radius: 50%;
  animation: pulseDot 2.4s ease-in-out infinite;
}
@keyframes pulseDot {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:.55; transform:scale(.7); }
}

/* Left bottom */
.rg-tag {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 18px;
}
.rg-tag::before {
  content: '';
  display: block; width: 26px; height: 1px;
  background: var(--gold);
}
.rg-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(34px, 3.8vw, 50px);
  font-weight: 900; color: var(--white);
  line-height: 1.06; letter-spacing: -0.025em;
  margin-bottom: 22px;
}
.rg-headline em { font-style: italic; color: var(--gold-lt); }
.rg-quote-attr {
  font-size: 11.5px; color: rgba(255,255,255,0.38);
  letter-spacing: 0.06em; margin-bottom: 48px;
}

/* Stats */
.rg-stats {
  display: flex;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 30px;
}
.rg-stat { flex: 1; padding-right: 22px; }
.rg-stat + .rg-stat {
  padding-left: 22px;
  border-left: 1px solid rgba(255,255,255,0.1);
}
.rg-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 700; color: var(--white);
  display: block; line-height: 1; margin-bottom: 5px;
}
.rg-stat-num span { color: var(--gold-lt); }
.rg-stat-lbl {
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,0.38);
}

/* ── Right Panel ── */
.rg-right {
  display: flex; flex-direction: column; justify-content: center;
  padding: 56px 64px;
  overflow-y: auto;
  background: var(--cream);
}

/* Back button */
.rg-back {
  display: inline-flex; align-items: center; gap: 10px;
  background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: 11px; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 52px;
  transition: color 0.2s; padding: 0; width: fit-content;
}
.rg-back:hover { color: var(--ink); }
.rg-back-circle {
  width: 30px; height: 30px;
  border: 1.5px solid var(--border);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.rg-back:hover .rg-back-circle {
  background: var(--ink);
  border-color: var(--ink);
  color: white;
}

/* Header */
.rg-eyebrow {
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--teal); margin-bottom: 10px;
  display: flex; align-items: center; gap: 10px;
}
.rg-eyebrow::before {
  content: '';
  display: block; width: 18px; height: 1.5px;
  background: var(--teal);
}
.rg-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 3.2vw, 42px);
  font-weight: 900; color: var(--ink);
  line-height: 1.05; letter-spacing: -0.025em;
  margin-bottom: 10px;
}
.rg-sub {
  font-size: 13.5px; color: var(--muted);
  line-height: 1.75; margin-bottom: 36px;
  font-weight: 300;
}

/* ── Banner ── */
.rg-banner {
  border-radius: 10px; padding: 13px 16px;
  font-size: 13px; margin-bottom: 20px;
  display: flex; align-items: flex-start; gap: 10px;
  animation: bannerIn 0.3s ease;
}
@keyframes bannerIn {
  from { opacity:0; transform:translateY(-6px); }
  to   { opacity:1; transform:translateY(0); }
}
.rg-banner.success {
  background: rgba(0,106,101,0.07);
  border: 1.5px solid rgba(0,106,101,0.2);
  color: var(--teal);
}
.rg-banner.error {
  background: rgba(192,57,43,0.06);
  border: 1.5px solid rgba(192,57,43,0.2);
  color: var(--err);
}

/* ── Fields ── */
.rg-field {
  margin-bottom: 20px;
  animation: fieldUp 0.45s ease both;
}
.rg-field:nth-child(1) { animation-delay: 0.04s; }
.rg-field:nth-child(2) { animation-delay: 0.10s; }
.rg-field:nth-child(3) { animation-delay: 0.16s; }
.rg-field:nth-child(4) { animation-delay: 0.22s; }
@keyframes fieldUp {
  from { opacity:0; transform:translateY(10px); }
  to   { opacity:1; transform:translateY(0); }
}

.rg-label {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 8px;
}
.rg-input-wrap { position: relative; }
.rg-input {
  width: 100%;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 14px 20px;
  font-size: 14.5px; font-family: inherit; font-weight: 400;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  -webkit-appearance: none;
}
.rg-input::placeholder { color: rgba(13,17,23,0.27); font-weight: 300; }
.rg-input:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 4px rgba(0,106,101,0.07);
}
.rg-input.ico { padding-right: 48px; }
.rg-input.err { border-color: var(--err); }
.rg-input.err:focus { box-shadow: 0 0 0 4px rgba(192,57,43,0.07); }

.rg-eye {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: var(--muted); padding: 4px;
  display: flex; align-items: center;
  transition: color 0.2s;
}
.rg-eye:hover { color: var(--ink); }

.rg-err-text {
  font-size: 11px; color: var(--err);
  margin-top: 6px; padding-left: 2px;
}

/* Strength */
.rg-bar-track {
  height: 3px; background: var(--warm);
  border-radius: 2px; overflow: hidden;
  margin-top: 8px;
}
.rg-bar-fill {
  height: 100%; border-radius: 2px;
  transition: width 0.4s cubic-bezier(.34,1.56,.64,1), background 0.3s;
}

/* ── Submit ── */
.rg-submit {
  width: 100%;
  background: var(--ink);
  color: var(--white);
  border: none; border-radius: 10px;
  padding: 16px 28px;
  font-size: 12.5px; font-weight: 600; font-family: inherit;
  letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  margin-top: 8px;
  position: relative; overflow: hidden;
}
.rg-submit::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg, rgba(201,168,76,0.18) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.3s;
}
.rg-submit:hover:not(:disabled)::after { opacity: 1; }
.rg-submit:hover:not(:disabled) {
  background: #1c2738;
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(13,17,23,0.2);
}
.rg-submit:disabled { opacity: 0.48; cursor: not-allowed; }

.rg-spinner {
  width: 15px; height: 15px;
  border: 2px solid rgba(255,255,255,0.22);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Divider */
.rg-divider {
  display: flex; align-items: center; gap: 14px;
  margin: 22px 0;
  color: rgba(13,17,23,0.28);
  font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600;
}
.rg-divider::before, .rg-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

/* Google */
.rg-google {
  width: 100%;
  background: var(--white);
  color: var(--ink);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 14px 24px;
  font-size: 13px; font-weight: 500; font-family: inherit;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.rg-google:hover {
  border-color: rgba(13,17,23,0.2);
  box-shadow: 0 4px 18px rgba(13,17,23,0.06);
}

/* Switch */
.rg-switch {
  text-align: center; font-size: 13px;
  color: var(--muted); margin-top: 22px; font-weight: 300;
}
.rg-switch-btn {
  background: none; border: none;
  color: var(--teal); font-family: inherit;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: color 0.2s;
}
.rg-switch-btn:hover { color: var(--teal-lt); text-decoration: underline; }

/* Toast */
.rg-toast {
  position: fixed; bottom: 36px; left: 50%;
  transform: translateX(-50%);
  padding: 13px 26px 13px 18px;
  border-radius: 100px;
  font-size: 13px; font-weight: 500;
  display: flex; align-items: center; gap: 10px;
  box-shadow: 0 14px 44px rgba(0,0,0,0.22);
  z-index: 9999; white-space: nowrap;
  animation: toastPop 0.45s cubic-bezier(.34,1.56,.64,1);
}
.rg-toast.success { background: var(--ink); color: var(--white); }
.rg-toast.error   { background: var(--err); color: var(--white); }
.rg-toast-gem {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
}
.rg-toast.success .rg-toast-gem { background: var(--gold); }
.rg-toast.error   .rg-toast-gem { background: rgba(255,255,255,0.4); }
@keyframes toastPop {
  from { opacity:0; transform:translateX(-50%) translateY(20px) scale(0.92); }
  to   { opacity:1; transform:translateX(-50%) translateY(0)    scale(1); }
}

/* Responsive */
@media (max-width: 900px) {
  .rg-page { grid-template-columns: 1fr; }
  .rg-left { display: none; }
  .rg-right { padding: 48px 32px; }
}
@media (max-width: 480px) {
  .rg-right { padding: 36px 20px; }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]   = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner]   = useState(null);
  const [toast, setToast]     = useState(null);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
    setBanner(null);
  };

  const strength = getStrength(form.password);
  const sInfo = strengthMeta[strength];

  function validate() {
    const e = {};
    if (!form.name.trim())                   e.name     = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email    = "Enter a valid email address";
    if (form.password.length < 6)            e.password = "At least 6 characters required";
    if (form.password !== form.confirm)      e.confirm  = "Passwords do not match";
    return e;
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setBanner(null);

    try {
      const res  = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name.trim(),
          email:    form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setBanner({ text: data.message || "Registration failed.", type: "error" });
        return;
      }

      localStorage.setItem("ceygo_token", data.token);
      localStorage.setItem("ceygo_user",  JSON.stringify(data.user));

      setBanner({ text: `Welcome aboard, ${data.user.name}! Redirecting you now…`, type: "success" });
      showToast(`✦  Welcome to CeyGo, ${data.user.name}!`, "success");
      setTimeout(() => navigate("/interface"), 1500);

    } catch {
      setBanner({ text: "Cannot reach server. Make sure the backend is running.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const onKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{css}</style>

      <div className="rg-page">

        {/* ══ LEFT ══ */}
        <div className="rg-left">
          <img
            className="rg-bg-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF5w5yNOOET57GYfoJxg6F6-EqanWRfh8Svkio0siIU4nzOzQEW7T1oRGfM6v0OCVFA8MoqLiIoyDvb8w9orfFd9JdjaZ5pyYDXMtideU3FvosyCLe8LB5XGtmd5B0o5SnJ3koI5yYgvO4ZxGu_0MY-HX-FIawWCQIyjAnJGVg-BKYyWRam3V5EYLq-0iufWjZxoLjQcuJoXthHIxFYhjpjEb1Nv9MhhPHCtTV2MHLLAuMNQ4p2FasS5X1dpKqKcGDniF4BNVZydU"
            alt="Sri Lanka coastal landscape"
          />
          <div className="rg-overlay" />

          <div className="rg-left-content">
            <div className="rg-logo" onClick={() => navigate("/")}>
              CeyGo <span className="rg-logo-dot" />
            </div>

            <div>
              <p className="rg-tag">Trusted by explorers worldwide</p>

              <h2 className="rg-headline">
                Your <em>perfect</em><br />
                Sri Lanka story<br />
                starts here
              </h2>

              <p className="rg-quote-attr">— AI-curated travel, southern Sri Lanka</p>

              <div className="rg-stats">
                <div className="rg-stat">
                  <span className="rg-stat-num">12<span>k+</span></span>
                  <span className="rg-stat-lbl">Travellers</span>
                </div>
                <div className="rg-stat">
                  <span className="rg-stat-num">4.9<span>★</span></span>
                  <span className="rg-stat-lbl">Avg. rating</span>
                </div>
                <div className="rg-stat">
                  <span className="rg-stat-num">50<span>+</span></span>
                  <span className="rg-stat-lbl">Hidden gems</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div className="rg-right">

          <button className="rg-back" onClick={() => navigate("/")}>
            <span className="rg-back-circle">←</span>
            Back to home
          </button>

          <p className="rg-eyebrow">New account</p>
          <h1 className="rg-title">Create account</h1>
          <p className="rg-sub">
            Join thousands of explorers discovering the real Sri Lanka.
            Free forever — no credit card needed.
          </p>

          {banner && (
            <div className={`rg-banner ${banner.type}`}>
              <span>{banner.type === "success" ? "✦" : "⚠"}</span>
              <span>{banner.text}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="rg-field">
            <div className="rg-label">Full Name</div>
            <div className="rg-input-wrap">
              <input
                className={`rg-input${errors.name ? " err" : ""}`}
                type="text"
                placeholder="e.g. Amara Perera"
                value={form.name}
                onChange={set("name")}
                onKeyDown={onKey}
                autoFocus
              />
            </div>
            {errors.name && <div className="rg-err-text">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="rg-field">
            <div className="rg-label">Email Address</div>
            <div className="rg-input-wrap">
              <input
                className={`rg-input${errors.email ? " err" : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                onKeyDown={onKey}
                autoComplete="email"
              />
            </div>
            {errors.email && <div className="rg-err-text">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="rg-field">
            <div className="rg-label">
              <span>Password</span>
              {form.password && sInfo && (
                <span style={{ color: sInfo.color, fontWeight: 600 }}>{sInfo.label}</span>
              )}
            </div>
            <div className="rg-input-wrap">
              <input
                className={`rg-input ico${errors.password ? " err" : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.password}
                onChange={set("password")}
                onKeyDown={onKey}
              />
              <button className="rg-eye" type="button" onClick={() => setShowPwd(p => !p)} tabIndex={-1}>
                {showPwd ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            {form.password && (
              <div className="rg-bar-track">
                <div
                  className="rg-bar-fill"
                  style={{ width: `${(strength / 4) * 100}%`, background: sInfo?.color || "transparent" }}
                />
              </div>
            )}
            {errors.password && <div className="rg-err-text">{errors.password}</div>}
          </div>

          {/* Confirm */}
          <div className="rg-field">
            <div className="rg-label">Confirm Password</div>
            <div className="rg-input-wrap">
              <input
                className={`rg-input ico${errors.confirm ? " err" : ""}`}
                type={showCfm ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={set("confirm")}
                onKeyDown={onKey}
              />
              <button className="rg-eye" type="button" onClick={() => setShowCfm(p => !p)} tabIndex={-1}>
                {showCfm ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            {errors.confirm && <div className="rg-err-text">{errors.confirm}</div>}
          </div>

          <button className="rg-submit" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><div className="rg-spinner" /> Creating your account…</>
              : <>Create Account  ✦</>
            }
          </button>

          <div className="rg-divider">or continue with</div>

          <button className="rg-google" type="button">
            <GoogleIcon /> Continue with Google
          </button>

          <p className="rg-switch">
            Already have an account?{" "}
            <button className="rg-switch-btn" onClick={() => navigate("/login")}>
              Sign in →
            </button>
          </p>

        </div>
      </div>

      {toast && (
        <div className={`rg-toast ${toast.type}`}>
          <span className="rg-toast-gem" />
          {toast.msg}
        </div>
      )}
    </>
  );
}
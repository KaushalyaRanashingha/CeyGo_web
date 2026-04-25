/**
 * Login.jsx  –  CeyGo Sign-In Page
 *
 * Uses React Router's useNavigate.
 * Connects to:  POST http://localhost:5004/api/auth/login
 * On success: stores JWT in localStorage, navigates to /interface
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5004/api/auth";

// ─────────────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  :root {
    --navy:   #001e40;
    --teal:   #006a65;
    --sand:   #fdf9f1;
    --lt:     #76f3ea;
    --muted:  #43474f;
    --err:    #c0392b;
    --ok:     #006a65;
    --border: rgba(0,30,64,0.12);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--sand);
    color: var(--navy);
    min-height: 100vh;
  }

  .li-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }
  @media (max-width: 780px) {
    .li-page { grid-template-columns: 1fr; }
    .li-visual { display: none; }
    .li-form-side { padding: 40px 28px; }
  }

  .li-visual { position: relative; overflow: hidden; }
  .li-visual-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover;
  }
  .li-visual-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,30,64,0.78) 0%, rgba(0,106,101,0.6) 100%);
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 44px 48px;
  }
  .li-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px; font-weight: 700; font-style: italic;
    color: white; cursor: pointer; user-select: none;
    letter-spacing: -0.01em;
  }
  .li-visual-body { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; }
  .li-visual-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--lt); margin-bottom: 12px;
  }
  .li-visual-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px; font-weight: 700; font-style: italic;
    color: white; line-height: 1.2; margin-bottom: 20px; max-width: 380px;
  }
  .li-visual-author {
    font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 500;
    letter-spacing: 0.06em; margin-bottom: 36px;
  }
  .li-stats { display: flex; gap: 32px; margin-bottom: 32px; }
  .li-stat { display: flex; flex-direction: column; gap: 3px; }
  .li-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 700; color: white;
  }
  .li-stat-label { font-size: 11px; color: rgba(255,255,255,0.55); }
  .li-dots { display: flex; gap: 8px; }
  .li-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,0.3);
  }
  .li-dot.active { background: var(--lt); width: 24px; border-radius: 4px; }

  .li-form-side {
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 64px;
    background: var(--sand);
  }
  .li-back {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: none; cursor: pointer;
    font-size: 12px; font-weight: 600; color: var(--muted);
    font-family: inherit; margin-bottom: 44px;
    transition: color 0.2s; letter-spacing: 0.04em; text-transform: uppercase;
  }
  .li-back:hover { color: var(--navy); }
  .li-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--teal); margin-bottom: 10px;
  }
  .li-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px; font-weight: 700; color: var(--navy);
    line-height: 1.1; margin-bottom: 8px;
  }
  .li-sub {
    font-size: 14px; color: var(--muted); margin-bottom: 40px; line-height: 1.7;
  }

  .li-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
  .li-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
  }
  .li-input-wrap { position: relative; }
  .li-input {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 13px 18px;
    font-size: 14px; font-family: inherit;
    outline: none; background: white; color: var(--navy);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .li-input:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px rgba(0,106,101,0.1);
  }
  .li-input.error { border-color: var(--err); }
  .li-input.error:focus { box-shadow: 0 0 0 3px rgba(192,57,43,0.1); }
  .li-input-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: var(--muted);
    font-size: 16px; padding: 0; display: flex; align-items: center;
  }
  .li-field-err { font-size: 11px; color: var(--err); margin-top: 4px; }

  .li-options {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; font-size: 12px; color: var(--muted);
  }
  .li-remember { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .li-checkbox { accent-color: var(--teal); width: 15px; height: 15px; cursor: pointer; }
  .li-forgot {
    background: none; border: none; color: var(--teal);
    font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
  }
  .li-forgot:hover { text-decoration: underline; }

  .li-submit {
    width: 100%; background: var(--navy); color: white; border: none;
    padding: 15px; border-radius: 100px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: inherit; letter-spacing: 0.04em;
    transition: opacity 0.2s, transform 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .li-submit:hover:not(:disabled) { opacity: 0.87; transform: translateY(-1px); }
  .li-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .li-btn-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: lispin 0.7s linear infinite;
  }
  @keyframes lispin { to { transform: rotate(360deg); } }

  .li-divider {
    display: flex; align-items: center; gap: 14px;
    margin: 22px 0; color: rgba(0,30,64,0.3); font-size: 11px;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .li-divider::before, .li-divider::after {
    content: ''; flex: 1; height: 1px; background: rgba(0,30,64,0.1);
  }

  .li-google {
    width: 100%; background: white; color: var(--navy);
    border: 1.5px solid var(--border);
    padding: 13px; border-radius: 100px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: background 0.2s, box-shadow 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .li-google:hover { background: #f5f5f5; box-shadow: 0 4px 16px rgba(0,30,64,0.08); }

  .li-switch {
    text-align: center; font-size: 13px; color: var(--muted); margin-top: 24px;
  }
  .li-switch-btn {
    background: none; border: none; color: var(--teal);
    font-weight: 700; cursor: pointer; font-family: inherit; font-size: 13px;
  }
  .li-switch-btn:hover { text-decoration: underline; }

  .li-error-banner {
    background: rgba(192,57,43,0.08);
    border: 1.5px solid rgba(192,57,43,0.25);
    border-radius: 12px; padding: 12px 16px;
    font-size: 13px; color: var(--err); margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }
  .li-success-banner {
    background: rgba(0,106,101,0.08);
    border: 1.5px solid rgba(0,106,101,0.25);
    border-radius: 12px; padding: 12px 16px;
    font-size: 13px; color: var(--ok); margin-bottom: 18px;
    display: flex; align-items: center; gap: 10px;
  }

  .li-toast {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    padding: 14px 28px; border-radius: 100px;
    font-size: 13px; font-weight: 600; color: white;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    animation: liToastIn 0.35s cubic-bezier(.25,.46,.45,.94);
    z-index: 9999; white-space: nowrap;
  }
  .li-toast.success { background: var(--ok); }
  .li-toast.error   { background: var(--err); }
  @keyframes liToastIn {
    from { opacity:0; transform:translateX(-50%) translateY(20px); }
    to   { opacity:1; transform:translateX(-50%) translateY(0); }
  }

  @keyframes liFadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .li-form-side > * { animation: liFadeUp 0.5s ease both; }
  .li-form-side > *:nth-child(1) { animation-delay: 0.04s; }
  .li-form-side > *:nth-child(2) { animation-delay: 0.1s; }
  .li-form-side > *:nth-child(3) { animation-delay: 0.16s; }
  .li-form-side > *:nth-child(4) { animation-delay: 0.22s; }
  .li-form-side > *:nth-child(5) { animation-delay: 0.3s; }
  .li-form-side > *:nth-child(6) { animation-delay: 0.36s; }
`;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate(); // ✅ React Router navigation

  const [form, setForm]           = useState({ email: "", password: "" });
  const [errors, setErrors]       = useState({});
  const [showPwd, setShowPwd]     = useState(false);
  const [remember, setRemember]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [serverMsg, setServerMsg] = useState(null); // { text, type }
  const [toast, setToast]         = useState(null); // { msg, type }

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
    setServerMsg(null);
  };

  function validate() {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    return e;
  }

  // ✅ showToast only shows/hides the toast — does NOT navigate
  function showToast(msg, type = "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setServerMsg(null);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerMsg({ text: data.message || "Login failed.", type: "error" });
        setLoading(false);
        return;
      }

      // ✅ Persist auth data
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("ceygo_token", data.token);
      localStorage.setItem("ceygo_user", JSON.stringify(data.user));

      setServerMsg({ text: `Welcome back, ${data.user.name}! 🌴`, type: "success" });
      showToast(`Signed in as ${data.user.name}`, "success");

      // ✅ Navigate to /interface after toast is visible
      setTimeout(() => navigate("/interface"), 1400);

    } catch {
      setServerMsg({
        text: "Cannot reach server. Make sure the backend is running.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{css}</style>

      <div className="li-page">
        {/* ── Visual Panel ── */}
        <div className="li-visual">
          <img
            className="li-visual-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF5w5yNOOET57GYfoJxg6F6-EqanWRfh8Svkio0siIU4nzOzQEW7T1oRGfM6v0OCVFA8MoqLiIoyDvb8w9orfFd9JdjaZ5pyYDXMtideU3FvosyCLe8LB5XGtmd5B0o5SnJ3koI5yYgvO4ZxGu_0MY-HX-FIawWCQIyjAnJGVg-BKYyWRam3V5EYLq-0iufWjZxoLjQcuJoXthHIxFYhjpjEb1Nv9MhhPHCtTV2MHLLAuMNQ4p2FasS5X1dpKqKcGDniF4BNVZydU"
            alt="Sri Lanka southern coast"
          />
          <div className="li-visual-overlay">
            <div className="li-logo" onClick={() => navigate("/")}>CeyGo</div>

            <div className="li-visual-body">
              <p className="li-visual-eyebrow">Travellers trust CeyGo</p>
              <blockquote className="li-visual-quote">
                "The AI planner found a secluded villa in Tangalle that wasn't
                even on major booking sites."
              </blockquote>
              <p className="li-visual-author">— Sarah Jenkins, United Kingdom</p>

              <div className="li-stats">
                <div className="li-stat">
                  <span className="li-stat-num">12k+</span>
                  <span className="li-stat-label">Happy travellers</span>
                </div>
                <div className="li-stat">
                  <span className="li-stat-num">4.9★</span>
                  <span className="li-stat-label">Average rating</span>
                </div>
                <div className="li-stat">
                  <span className="li-stat-num">50+</span>
                  <span className="li-stat-label">Hidden destinations</span>
                </div>
              </div>

              <div className="li-dots">
                <span className="li-dot active" /><span className="li-dot" /><span className="li-dot" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Form Panel ── */}
        <div className="li-form-side">
          <button className="li-back" onClick={() => navigate("/")}>
            ← Back to Home
          </button>

          <p className="li-eyebrow">Welcome back</p>
          <h1 className="li-title">Sign In</h1>
          <p className="li-sub">
            Continue planning your dream escape across Southern Sri Lanka.
          </p>

          {serverMsg && (
            <div className={serverMsg.type === "success" ? "li-success-banner" : "li-error-banner"}>
              {serverMsg.type === "success" ? "✅" : "⚠️"} {serverMsg.text}
            </div>
          )}

          <div className="li-field">
            <label className="li-label">Email Address</label>
            <div className="li-input-wrap">
              <input
                className={`li-input${errors.email ? " error" : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                onKeyDown={handleKeyDown}
                autoComplete="email"
                autoFocus
              />
            </div>
            {errors.email && <span className="li-field-err">{errors.email}</span>}
          </div>

          <div className="li-field">
            <label className="li-label">Password</label>
            <div className="li-input-wrap">
              <input
                className={`li-input${errors.password ? " error" : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={set("password")}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
                style={{ paddingRight: 40 }}
              />
              <button
                className="li-input-icon"
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                tabIndex={-1}
              >
                {showPwd ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && <span className="li-field-err">{errors.password}</span>}
          </div>

          <div className="li-options">
            <label className="li-remember">
              <input
                className="li-checkbox"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <button className="li-forgot" type="button">Forgot password?</button>
          </div>

          <button className="li-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <><div className="li-btn-spinner" /> Signing in…</>
            ) : (
              "Sign In →"
            )}
          </button>

          <div className="li-divider">or continue with</div>
          <button className="li-google" type="button">
            <GoogleIcon /> Continue with Google
          </button>

          <p className="li-switch">
            Don't have an account?{" "}
            <button className="li-switch-btn" onClick={() => navigate("/signup")}>
              Create one free
            </button>
          </p>
        </div>
      </div>

      {toast && <div className={`li-toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}
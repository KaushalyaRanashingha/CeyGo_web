/**
 * Signup.jsx  –  CeyGo Registration Page
 *
 * Props:
 *   onNavigate(page)  –  "home" | "login" | "interface"
 *
 * Connects to:  POST http://localhost:5004/api/auth/signup
 * On success: stores JWT in localStorage, calls onNavigate("interface")
 */

import { useState } from "react";

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

  /* ── Layout ── */
  .su-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }
  @media (max-width: 780px) {
    .su-page { grid-template-columns: 1fr; }
    .su-visual { display: none; }
    .su-form-side { padding: 40px 28px; }
  }

  /* ── Visual Panel ── */
  .su-visual {
    position: relative;
    overflow: hidden;
  }
  .su-visual-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover;
  }
  .su-visual-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(0,106,101,0.65) 0%, rgba(0,30,64,0.82) 100%);
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 44px 48px;
  }
  .su-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px; font-weight: 700; font-style: italic;
    color: white; cursor: pointer; user-select: none;
    letter-spacing: -0.01em;
  }
  .su-visual-body { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; }
  .su-visual-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--lt);
    margin-bottom: 16px;
  }
  .su-visual-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 38px; font-weight: 700; line-height: 1.15;
    color: white; margin-bottom: 20px;
  }
  .su-visual-heading em { font-style: italic; color: var(--lt); }
  .su-perks { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
  .su-perk {
    display: flex; align-items: center; gap: 12px;
    font-size: 13px; color: rgba(255,255,255,0.82); font-weight: 400;
  }
  .su-perk-icon {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
    background: rgba(118,243,234,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
  }
  .su-dots { display: flex; gap: 8px; }
  .su-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transition: background 0.3s, width 0.3s;
  }
  .su-dot.active { background: var(--lt); width: 24px; border-radius: 4px; }

  /* ── Form Side ── */
  .su-form-side {
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 64px;
    background: var(--sand);
    overflow-y: auto;
  }

  /* Back button */
  .su-back {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: none; cursor: pointer;
    font-size: 12px; font-weight: 600; color: var(--muted);
    font-family: inherit; margin-bottom: 44px;
    transition: color 0.2s; letter-spacing: 0.04em; text-transform: uppercase;
  }
  .su-back:hover { color: var(--navy); }

  .su-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--teal); margin-bottom: 10px;
  }
  .su-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px; font-weight: 700; color: var(--navy);
    line-height: 1.1; margin-bottom: 8px;
  }
  .su-sub {
    font-size: 14px; color: var(--muted); margin-bottom: 36px; line-height: 1.7;
  }

  /* ── Form ── */
  .su-form { display: flex; flex-direction: column; gap: 0; }
  .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  @media (max-width: 500px) { .su-row { grid-template-columns: 1fr; } }

  .su-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .su-field:last-of-type { margin-bottom: 0; }
  .su-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
  }

  .su-input-wrap { position: relative; }
  .su-input {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 13px 18px;
    font-size: 14px; font-family: inherit;
    outline: none; background: white; color: var(--navy);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .su-input:focus {
    border-color: var(--teal);
    box-shadow: 0 0 0 3px rgba(0,106,101,0.1);
  }
  .su-input.error { border-color: var(--err); }
  .su-input.error:focus { box-shadow: 0 0 0 3px rgba(192,57,43,0.1); }
  .su-input-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: var(--muted);
    font-size: 16px; padding: 0; display: flex; align-items: center;
  }

  .su-field-err { font-size: 11px; color: var(--err); margin-top: 4px; }

  /* Password strength bar */
  .su-strength { margin-top: 8px; }
  .su-strength-bar {
    height: 3px; border-radius: 2px;
    background: rgba(0,30,64,0.08);
    overflow: hidden; margin-bottom: 4px;
  }
  .su-strength-fill {
    height: 100%; border-radius: 2px;
    transition: width 0.3s, background 0.3s;
  }
  .su-strength-text { font-size: 10px; font-weight: 600; letter-spacing: 0.06em; }

  /* Terms checkbox */
  .su-terms-row {
    display: flex; align-items: flex-start; gap: 10px;
    margin: 20px 0; font-size: 12px; color: var(--muted); line-height: 1.6;
  }
  .su-checkbox {
    width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0;
    margin-top: 2px; accent-color: var(--teal); cursor: pointer;
  }
  .su-terms-row a { color: var(--teal); text-decoration: none; }
  .su-terms-row a:hover { text-decoration: underline; }

  /* Submit */
  .su-submit {
    width: 100%; background: var(--navy); color: white; border: none;
    padding: 15px; border-radius: 100px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: inherit; letter-spacing: 0.04em;
    transition: opacity 0.2s, transform 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .su-submit:hover:not(:disabled) { opacity: 0.87; transform: translateY(-1px); }
  .su-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Spinner inside button */
  .su-btn-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .su-divider {
    display: flex; align-items: center; gap: 14px;
    margin: 22px 0; color: rgba(0,30,64,0.3); font-size: 11px;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .su-divider::before, .su-divider::after {
    content: ''; flex: 1; height: 1px; background: rgba(0,30,64,0.1);
  }

  /* Google button */
  .su-google {
    width: 100%; background: white; color: var(--navy);
    border: 1.5px solid var(--border);
    padding: 13px; border-radius: 100px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: background 0.2s, box-shadow 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .su-google:hover { background: #f5f5f5; box-shadow: 0 4px 16px rgba(0,30,64,0.08); }

  /* Switch */
  .su-switch {
    text-align: center; font-size: 13px; color: var(--muted); margin-top: 24px;
  }
  .su-switch-btn {
    background: none; border: none; color: var(--teal);
    font-weight: 700; cursor: pointer; font-family: inherit; font-size: 13px;
  }
  .su-switch-btn:hover { text-decoration: underline; }

  /* Toast */
  .su-toast {
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    padding: 14px 28px; border-radius: 100px;
    font-size: 13px; font-weight: 600; color: white;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    animation: toastIn 0.35s cubic-bezier(.25,.46,.45,.94);
    z-index: 9999; white-space: nowrap;
  }
  .su-toast.success { background: var(--ok); }
  .su-toast.error   { background: var(--err); }
  @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }

  /* Fade-up animations on mount */
  @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  .su-form-side > * { animation: fadeUp 0.5s ease both; }
  .su-form-side > *:nth-child(1) { animation-delay: 0.04s; }
  .su-form-side > *:nth-child(2) { animation-delay: 0.1s; }
  .su-form-side > *:nth-child(3) { animation-delay: 0.16s; }
  .su-form-side > *:nth-child(4) { animation-delay: 0.22s; }
  .su-form-side > *:nth-child(5) { animation-delay: 0.3s; }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
function passwordStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const levels = [
    { label: "", color: "transparent", w: "0%" },
    { label: "Weak", color: "#e74c3c", w: "25%" },
    { label: "Fair", color: "#e67e22", w: "50%" },
    { label: "Good", color: "#f1c40f", w: "75%" },
    { label: "Strong", color: "#27ae60", w: "90%" },
    { label: "Very Strong", color: "#006a65", w: "100%" },
  ];
  return levels[Math.min(score, 5)];
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────
export default function Signup({ onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { msg, type }

  const strength = passwordStrength(form.password);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!agreed) e.terms = "You must accept the terms to continue";
    return e;
  }

  function showToast(msg, type = "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Signup failed. Try again.");
        setLoading(false);
        return;
      }

      // ✅ Save token + user info
      localStorage.setItem("ceygo_token", data.token);
      localStorage.setItem("ceygo_user", JSON.stringify(data.user));

      showToast(`Welcome to CeyGo, ${data.user.name}! 🌴`, "success");

      // ✅ Navigate to Interface page after short delay so toast is visible
      setTimeout(() => onNavigate("interface"), 1500);

    } catch {
      showToast("Cannot reach server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{css}</style>

      <div className="su-page">
        {/* ── Visual Panel ── */}
        <div className="su-visual">
          <img
            className="su-visual-img"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq8_gArPJAejoHFk5rRQC8Cj6LIQKMDRJ6qMzmSJa8tcFfa6UAeAPW3KxuDfvBj0zbbHmoevkX39GpEy8xlpYGRST-1hz_-DfLLD7DjaKb70qTevWLe82yPcLVErNeYkQoNL3vH1nKqaC2Q3T12BYm-sDYetByNVpCQiPKibyAhxJrkOSWRv9vtITUxjSDCs3S9bvkZyt9VGWDuD3PE6LoZ7lPHEeo2elBekle_Zua1cIJSY9s6rHogs499dCp4OFpMHnzCP3H3oI"
            alt="Galle Fort, Sri Lanka"
          />
          <div className="su-visual-overlay">
            <div className="su-logo" onClick={() => onNavigate("home")}>CeyGo</div>

            <div className="su-visual-body">
              <p className="su-visual-eyebrow">Your journey begins here</p>
              <h2 className="su-visual-heading">
                Discover Sri Lanka<br />like <em>never before</em>
              </h2>
              <ul className="su-perks">
                <li className="su-perk">
                  <span className="su-perk-icon">✦</span>
                  AI-crafted itineraries tailored just for you
                </li>
                <li className="su-perk">
                  <span className="su-perk-icon">🏖</span>
                  Exclusive beach stays &amp; hidden gems
                </li>
                <li className="su-perk">
                  <span className="su-perk-icon">🐋</span>
                  Wildlife, surf, culture — all in one plan
                </li>
                <li className="su-perk">
                  <span className="su-perk-icon">🔒</span>
                  Save &amp; revisit your plans anytime
                </li>
              </ul>
              <div className="su-dots">
                <span className="su-dot" /><span className="su-dot active" /><span className="su-dot" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Form Panel ── */}
        <div className="su-form-side">
          <button className="su-back" onClick={() => onNavigate("home")}>
            ← Back to Home
          </button>

          <p className="su-eyebrow">Create account</p>
          <h1 className="su-title">Join CeyGo</h1>
          <p className="su-sub">
            Free forever. No credit card required. Start planning in minutes.
          </p>

          <div className="su-form">
            {/* Name */}
            <div className="su-field">
              <label className="su-label">Full Name</label>
              <div className="su-input-wrap">
                <input
                  className={`su-input${errors.name ? " error" : ""}`}
                  type="text"
                  placeholder="e.g. Amal Perera"
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                />
              </div>
              {errors.name && <span className="su-field-err">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="su-field">
              <label className="su-label">Email Address</label>
              <div className="su-input-wrap">
                <input
                  className={`su-input${errors.email ? " error" : ""}`}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="su-field-err">{errors.email}</span>}
            </div>

            {/* Password row */}
            <div className="su-row">
              <div className="su-field" style={{ marginBottom: 0 }}>
                <label className="su-label">Password</label>
                <div className="su-input-wrap">
                  <input
                    className={`su-input${errors.password ? " error" : ""}`}
                    type={showPwd ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={set("password")}
                    autoComplete="new-password"
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    className="su-input-icon"
                    type="button"
                    onClick={() => setShowPwd((p) => !p)}
                    tabIndex={-1}
                  >
                    {showPwd ? "🙈" : "👁"}
                  </button>
                </div>
                {form.password && (
                  <div className="su-strength">
                    <div className="su-strength-bar">
                      <div
                        className="su-strength-fill"
                        style={{ width: strength.w, background: strength.color }}
                      />
                    </div>
                    <span className="su-strength-text" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                )}
                {errors.password && <span className="su-field-err">{errors.password}</span>}
              </div>

              <div className="su-field" style={{ marginBottom: 0 }}>
                <label className="su-label">Confirm Password</label>
                <div className="su-input-wrap">
                  <input
                    className={`su-input${errors.confirm ? " error" : ""}`}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={form.confirm}
                    onChange={set("confirm")}
                    autoComplete="new-password"
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    className="su-input-icon"
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    tabIndex={-1}
                  >
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.confirm && <span className="su-field-err">{errors.confirm}</span>}
              </div>
            </div>

            {/* Terms */}
            <div className="su-terms-row" style={{ marginTop: 20 }}>
              <input
                id="terms"
                className="su-checkbox"
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setErrors((er) => ({ ...er, terms: "" })); }}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>. I understand my data will be
                stored securely.
              </label>
            </div>
            {errors.terms && <span className="su-field-err" style={{ marginTop: -12, marginBottom: 8 }}>{errors.terms}</span>}

            {/* Submit */}
            <button
              className="su-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <><div className="su-btn-spinner" /> Creating account…</>
              ) : (
                "Create My Account →"
              )}
            </button>

            {/* Divider + Google */}
            <div className="su-divider">or sign up with</div>
            <button className="su-google" type="button">
              <GoogleIcon /> Continue with Google
            </button>

            {/* Switch to login */}
            <p className="su-switch">
              Already have an account?{" "}
              <button className="su-switch-btn" onClick={() => onNavigate("login")}>
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`su-toast ${toast.type}`}>{toast.msg}</div>
      )}
    </>
  );
}
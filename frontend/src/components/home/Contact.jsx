import { useState } from "react";
import "../../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <section id="section-contact" className="contact-section">
      <p className="center-sub" style={{ marginBottom: 12 }}>Get In Touch</p>
      <h2 className="section-title center-title" style={{ marginBottom: 16 }}>
        Let's Plan Together
      </h2>
      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>
        Have a special request or want a fully customised experience? Our team is
        ready to help.
      </p>

      <div className="contact-form">
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Subject</label>
          <input
            className="form-input"
            placeholder="How can we help?"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Message</label>
          <textarea
            className="form-textarea"
            placeholder="Tell us about your dream trip…"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
        </div>

        <button className="btn-submit" onClick={handleSubmit}>
          Send Message →
        </button>

        {sent && (
          <div className="contact-success">
            ✦ Thank you! We'll be in touch within 24 hours.
          </div>
        )}
      </div>
    </section>
  );
}
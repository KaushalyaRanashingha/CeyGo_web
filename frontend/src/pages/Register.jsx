import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Eye, EyeOff, User, Mail, Phone, Lock, Bot} from "lucide-react";
import "../styles/RegisterPage.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        fullName: name,
        email,
        phone,
        role: "user",
        createdAt: serverTimestamp(),
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-left">
          <div className="overlay">
            <h2 className="brand">CeyGo.</h2>
            <div>
              <h1>
                Experience the <span className="highlight">Magic</span> of Sri Lanka
              </h1>
              <p>
                Join thousands of travelers exploring the hidden gems of Sri Lanka Down South.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">
          <div className="form-card">
            <h2>Create Account</h2>
            <p>Please fill in your details.</p>

            <form onSubmit={handleRegister}>

              {/* NAME */}
              <label>Full Name</label>
              <div className="input-group">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* EMAIL */}
              <label>Email</label>
              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PHONE */}
              <label>Phone</label>
              <div className="input-group">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  placeholder="+94 7X XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <label>Password</label>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <label>Confirm Password</label>
              <div className="input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Creating..." : "Register"}
              </button>
            </form>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Floating Chatbot Button */}
<div className="chatbot-btn">
  <button>
    <Bot size={22} />
    <div className="tooltip">Need help planning?</div>
  </button>
</div>
    </div>
  );
}
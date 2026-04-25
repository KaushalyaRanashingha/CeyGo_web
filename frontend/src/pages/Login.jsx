import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff, Mail, Lock, Bot } from "lucide-react";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="overlay">
            <div className="brand-name">CeyGo.</div>

            <div>
              <h1>Explore the world with curated experiences.</h1>
              <p>
                Join thousands of travelers who trust CeyGo for seamless
                journey planning and local discoveries.
              </p>
            </div>

            <span className="footer-text">
              © 2026 CeyGo Travel Services
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="form-card">
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <label>Email Address</label>
              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {/* OPTIONS */}
              <div className="form-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="login-btn">
                Log in
              </button>
            </form>

            <div className="divider">Or continue with</div>

            <button className="google-btn">Google</button>

            <p className="register-text">
              Don’t have an account?{" "}
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>

      {/* CHATBOT BUTTON */}
      <div className="chatbot-btn">
        <button>
          <Bot size={22} />
          <div className="tooltip">Need help planning?</div>
        </button>
      </div>
    </div>
  );
}
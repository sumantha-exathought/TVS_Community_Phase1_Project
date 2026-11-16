import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
 
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const form = e.currentTarget;
 
    if (form.phone.value.length !== 10) {
      setMessage("Phone number must contain exactly 10 digits.");
      return;
    }
 
    if (form.password.value !== form.confirmPassword.value) {
      setMessage("Passwords do not match.");
      return;
    }
 
    setMessage("Registration UI is ready. Backend is not connected yet.");
  };
 
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="brand">
            <div className="brand-logo">T</div>
 
            <div className="brand-name">
              <h3>TVS</h3>
              <span>COMMUNITY</span>
            </div>
          </div>
 
          <div className="welcome-content">
            <span className="welcome-label">BE PART OF IT</span>
 
            <h1>
              Good things happen
              <br />
              when we connect.
            </h1>
 
            <p>
              Create your account and join a community built around sharing,
              supporting, and growing together.
            </p>
          </div>
 
          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>
          <div className="circle circle-three"></div>
        </div>
 
        {/* RIGHT PANEL */}
        <div className="auth-right">
          <div className="login-content">
            <span className="form-label">GET STARTED</span>
 
            <h2>Create your account</h2>
 
            <p className="form-description">A few details and you are in.</p>
 
            <form className="auth-form-compact" onSubmit={handleSubmit}>
              {/* FULL NAME */}
              <div className="form-group">
                <label htmlFor="name">Full name</label>
 
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </div>
 
              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="signup-email">Email address</label>
 
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
 
              {/* PHONE NUMBER */}
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
 
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter 10-digit phone number"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  onChange={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                  title="Please enter exactly 10 digits"
                  required
                />
              </div>
 
              {/* PASSWORD */}
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
 
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
 
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
 
              {/* CONFIRM PASSWORD */}
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm password</label>
 
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    name="confirmPassword"
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                  />
 
                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
 
              {/* SUBMIT */}
              <button type="submit" className="login-button">
                <span>Create account</span>
                <span className="arrow">→</span>
              </button>
 
              <p className="auth-message" aria-live="polite">
                {message}
              </p>
            </form>
 
            {/* LOGIN LINK */}
            <div className="signup-link">
              Already a member?
              <Link to="/login">Sign in</Link>
            </div>
 
            <p className="terms">
              By continuing, you agree to our
              <a href="#terms"> Terms </a>
              and
              <a href="#privacy"> Privacy Policy.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

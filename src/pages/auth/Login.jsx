import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
 
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    setMessage(
      "Login UI is ready. Backend authentication is not connected yet.",
    );
  };
 
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="brand">
            <div className="brand-logo">T</div>
 
            <div className="brand-name">
              <h3>TVS</h3>
              <span>COMMUNITY</span>
            </div>
          </div>
 
          <div className="welcome-content">
            <span className="welcome-label">WELCOME BACK</span>
 
            <h1>
              Your community,
              <br />
              all in one place.
            </h1>
 
            <p>
              Sign in to stay connected, share updates, and keep up with what
              matters to your community.
            </p>
          </div>
 
          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>
          <div className="circle circle-three"></div>
        </div>
 
        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="login-content">
            <span className="form-label">MEMBER ACCESS</span>
 
            <h2>Sign in</h2>
 
            <p className="form-description">Enter your details to continue.</p>
 
            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">Email address</label>
 
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
 
              {/* PASSWORD */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
 
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
 
              {/* OPTIONS */}
              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>
 
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setMessage("Password reset is not connected yet.")
                  }
                >
                  Forgot password?
                </button>
              </div>
 
              {/* LOGIN BUTTON */}
              <button type="submit" className="login-button">
                <span>Sign in</span>
                <span className="arrow">→</span>
              </button>
 
              <p className="auth-message" aria-live="polite">
                {message}
              </p>
            </form>
 
            {/* SIGNUP LINK */}
            <div className="signup-link">
              New to the community?
              <Link to="/signup">Create an account</Link>
            </div>
 
            {/* FOOTER */}
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

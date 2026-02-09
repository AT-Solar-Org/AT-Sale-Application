"use client";

import "./auth.css";

export default function ForgotPasswordForm() {
  return (
    <div className="auth-wrapper forgot-password-page">
      <div className="container">
        <div className="form-container sign-in-container" style={{ width: "100%" }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <img
              src="/images/at_solar_logo.png"
              alt="App Logo"
              className="auth-logo"
            />

            <h1>Forgot Password</h1>

            <p style={{ marginBottom: 20 }}>
              Enter your email for send you a reset link.
            </p>

            <input type="email" placeholder="Email address" />

            <button className="main-btn" type="submit">
              Send Reset Link
            </button>

            <a
              href="/auth"
              className="forgot-pw"
              style={{ marginTop: 20, textAlign: "center" }}
            >
              Back to Sign In
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

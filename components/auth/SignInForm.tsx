"use client";

import { useState } from "react";

export default function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <img
          src="/images/at_solar_logo.png"
          alt="App Logo"
          className="auth-logo"
        />

        <h1>Sign In</h1>

        <input type="email" placeholder="Email" />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            <img
              src={
                showPassword
                  ? "/images/eye_pass_close.png"
                  : "/images/eye_pass_open.png"
              }
              alt={showPassword ? "Hide password" : "Show password"}
              className="eye-icon"
            />
          </button>
        </div>

        <a href="/auth/forgot-password" className="forgot-pw">
          Forgot your password?
        </a>


        <button
          type="button"
          className="switch-link mobile-only"
          onClick={onSwitch}
        >
          Don't have an account?
        </button>

        <button className="main-btn" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

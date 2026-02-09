"use client";

import { useState } from "react";
import "./auth.css";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="auth-wrapper">
      <div
        id="container"
        className={`container ${isSignUp ? "right-panel-active" : ""}`}
      >
        {/* Forms */}
        <SignUpForm onSwitch={() => setIsSignUp(false)} />
        <SignInForm onSwitch={() => setIsSignUp(true)} />

        {/* Overlay (Desktop only) */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                type="button"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost"
                type="button"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

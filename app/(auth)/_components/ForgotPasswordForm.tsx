"use client";

import { useState } from "react";
import Image from "next/image";
import { LuMailCheck } from "react-icons/lu";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock: store email so the reset page can read it
    localStorage.setItem("resetEmail", email);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
        <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-125 p-10 flex flex-col items-center text-center">
          <Image
            src="/images/at_solar_logo.webp"
            alt="App Logo"
            className="w-20 md:w-24 h-auto mb-6"
            width={80}
            height={80}
          />

          <div className="w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center mb-6">
            <LuMailCheck className="w-9 h-9 text-[#EA580C]" />
          </div>

          <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">Check your email</h2>

          <p className="text-sm text-slate-500 leading-relaxed mb-2">
            We&apos;ve sent a password reset link to
          </p>
          <p className="text-sm font-semibold text-[#0F172A] mb-6">{email}</p>

          {/* Mock link — simulates what would be in the email */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
              📧 Mock email preview
            </p>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Click the link below to reset your password. This link expires in 15 minutes.
            </p>
            
            <a
              href={`/reset-password?email=${encodeURIComponent(email)}`}
              className="text-xs text-[#EA580C] underline hover:text-[#c2410c] break-all transition-colors"
            >
              {typeof window !== "undefined" ? window.location.origin : ""}/reset-password?email={encodeURIComponent(email)}
            </a>
          </div>

          <a
            href="/auth"
            className="text-sm text-slate-500 no-underline hover:text-[#EA580C] transition-colors"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-125">
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white flex items-center justify-center flex-col px-8 md:px-12 py-10 h-full text-center"
          >
            <Image
              src="/images/at_solar_logo.webp"
              alt="App Logo"
              className="w-20 md:w-24 h-auto mb-5"
              width={80}
              height={80}
            />

            <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-4">Forgot Password</h1>

            <p className="text-sm leading-5 tracking-wide mb-5 text-slate-500">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
            />

            <button
              className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 w-full tracking-wider uppercase transition-transform active:scale-95 mt-4 cursor-pointer border-none hover:bg-[#c2410c]"
              type="submit"
            >
              Send Reset Link
            </button>

            <a
              href="/auth"
              className="block mt-5 text-center text-sm text-slate-500 no-underline hover:text-[#EA580C] transition-colors"
            >
              Back to Sign In
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
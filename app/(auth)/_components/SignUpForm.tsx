"use client";

import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Image from 'next/image';

function getInitialEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    const savedData = localStorage.getItem("signupData");
    if (!savedData) return "";
    const { email } = JSON.parse(savedData);
    return email || "";
  } catch {
    return "";
  }
}

export default function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(getInitialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    localStorage.setItem("signupData", JSON.stringify({ email, password }));
    router.push("/signup");
  };

  return (
    <div className="w-full h-full min-h-125 md:min-h-full flex items-center justify-center">
      <form 
        onSubmit={handleSubmit}
        className="bg-white flex items-center justify-center flex-col px-8 md:px-12 py-10 md:py-0 w-full text-center"
      >
        <Image
          src="/images/at_solar_logo.webp"
          alt="App Logo"
          className="w-20 md:w-24 h-auto mb-5"
          height={80}
          width={80}
        />
        <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-4">Create Account</h1>

        {error && (
          <div className="w-full p-3 mb-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
        />

        {/* Password */}
        <div className="relative w-full my-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-100 border border-slate-300 p-3 pr-12 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 transition-opacity hover:opacity-70"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <LuEyeClosed className="w-6 h-6 text-slate-800" /> : <LuEye className="w-6 h-6 text-slate-800" />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative w-full my-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-slate-100 border border-slate-300 p-3 pr-12 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 transition-opacity hover:opacity-70"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label="Toggle confirm password visibility"
          >
            {showConfirmPassword ? <LuEyeClosed className="w-6 h-6 text-slate-800" /> : <LuEye className="w-6 h-6 text-slate-800" />}
          </button>
        </div>

        <button
          type="button"
          className="md:hidden w-full text-center text-sm mt-3 mb-1 p-0 text-[#EA580C] bg-transparent border-none cursor-pointer underline hover:text-[#c2410c]"
          onClick={onSwitch}
        >
          Already have an account?
        </button>

        <button 
          className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 mt-4 cursor-pointer border-none hover:bg-[#c2410c]"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
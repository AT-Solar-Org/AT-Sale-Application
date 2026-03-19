"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeClosed, LuCircleAlert } from "react-icons/lu";
import Image from "next/image";
import { supabase } from "lib/supabase";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Image from 'next/image'

export default function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading] = useState(false);
  // const [loading, setLoading] = useState(false);

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   // Mock API delay
  //   await new Promise((res) => setTimeout(res, 800));

  //   // TODO: replace with real API call
  //   // Mock: treat any login as wrong credentials for demo
  //   const mockSuccess = false;

  //   if (!mockSuccess) {
  //     setError("Your email or password is incorrect. Please try again.");
  //   }
  //   setLoading(false);
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setLoading(false);
      if (error.message.includes("Email not confirmed")) {
        setErrorMsg("Please verify your email before logging in.");
      } else {
        setErrorMsg(error.message);
      }
      return;
    }

    const user = data?.user;
    if (!user) {
      setLoading(false);
      return;
    }

    // Fetch profile
    const { data: profile, error: pErr } = await supabase
      .from("users")
      .select("is_approved, status, role")
      .eq("id", user.id)
      .single();

    setLoading(false);

    if (pErr || !profile) {
      setErrorMsg("Profile not found.");
      router.push(`/signup?email=${encodeURIComponent(user.email ?? "")}`);
      return;
    }

    // Admin
    if (profile.role === "admin") {
      router.push("/dashboard");
      return;
    }

    // Not approved
    if (!profile.is_approved || profile.status === "pending") {
      router.push("/pending");
      return;
    }

    // Normal user
    router.push("/dashboard");
  };


  return (
    <div className="w-full h-full min-h-[500px] md:min-h-full flex items-center justify-center">
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

        <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-4">Sign In</h1>

        <input
          type="email"
        {errorMsg && (
          <div className="w-full p-3 mb-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          required
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
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-100 border border-slate-300 p-3 pr-12 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 transition-opacity hover:opacity-70"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LuEyeClosed className="w-6 h-6 text-slate-800" /> : <LuEye className="w-6 h-6 text-slate-800" />}
          </button>
        </div>

        {/* Auth error */}
        {error && (
          <div className="flex items-center gap-2 w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-1 mb-1">
            <LuCircleAlert className="w-4 h-4 text-red-500 shrink-0" />
            <p className="text-xs text-red-600 text-left">{error}</p>
          </div>
        )}

        <a
          href="/forgot-password"
          className="w-full text-right text-xs mt-1.5 mb-4 text-slate-500 no-underline hover:text-[#EA580C] transition-colors"
        <a
          href="/forgot-password"
          className="w-full text-right text-xs mt-1.5 mb-4 text-slate-500 hover:text-[#EA580C]"
        >
          Forgot your password?
        </a>

        <button
          type="button"
          className="md:hidden w-full text-center text-sm mt-3 mb-1 text-[#EA580C] underline"
          onClick={onSwitch}
        >
          Don&apos;t have an account?
        </button>

        <button
          className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 mt-4 cursor-pointer border-none hover:bg-[#c2410c] disabled:opacity-60 disabled:cursor-not-allowed"
        <button
          disabled={loading}
          className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 uppercase mt-4 hover:bg-[#c2410c]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
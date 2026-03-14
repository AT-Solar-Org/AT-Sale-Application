"use client";

import { useState, useActionState } from "react";
import { login } from "@/app/actions";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Image from 'next/image'

type ActionState = {
  error?: string;
};

const initialState: ActionState = {};

export default function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, initialState);



  return (
    <div className="w-full h-full min-h-[500px] md:min-h-full flex items-center justify-center">
      <form 
        action={formAction}
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

        {state?.error && (
          <div className="w-full p-3 mb-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {state.error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
        />

        {/* Password */}
        <div className="relative w-full my-2">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="bg-slate-100 border border-slate-300 p-3 pr-12 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 transition-opacity hover:opacity-70"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <LuEyeClosed className="w-6 h-6 text-slate-800" />
            ) : (
              <LuEye className="w-6 h-6 text-slate-800" />
            )}
          </button>
        </div>

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
          disabled={isPending}
          className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 uppercase mt-4 hover:bg-[#c2410c] disabled:opacity-50"
          type="submit"
        >
          {isPending ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
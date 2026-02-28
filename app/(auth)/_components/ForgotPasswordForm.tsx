"use client";

import Image from 'next/image'

export default function ForgotPasswordForm() {
  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-125 min-h-auto">
        <div className="w-full opacity-100">
          <form 
            onSubmit={(e) => e.preventDefault()}
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

            <p className="text-sm leading-5 tracking-wide mb-5 text-slate-600">
              Enter your email for send you a reset link
            </p>

            <input 
              type="email" 
              placeholder="Email"
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

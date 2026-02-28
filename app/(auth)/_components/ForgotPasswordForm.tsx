"use client";

import Image from 'next/image'

export default function ForgotPasswordForm() {
  return (
    <div className="bg-[#D8E5FB] flex justify-center items-center flex-col font-sans min-h-screen p-6">
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
            />

            <h1 className="font-semibold text-3xl md:text-4xl text-[#3D46B9] mb-4">Forgot Password</h1>

            <p className="text-sm leading-5 tracking-wide mb-5 text-gray-600">
              Enter your email for send you a reset link.
            </p>

            <input 
              type="email" 
              placeholder="Email address"
              className="bg-[#eee] border-none p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-gray-800 placeholder:text-gray-600 focus:bg-[#e2e2e2] focus:ring-2 focus:ring-blue-500"
            />

            <button 
              className="rounded-full bg-[#3D46B9] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 mt-4 cursor-pointer border-none hover:bg-[#2d36a0]"
              type="submit"
            >
              Send Reset Link
            </button>

            <a
              href="/auth"
              className="block mt-5 text-center text-xs text-gray-600 no-underline hover:text-blue-500 transition-colors"
            >
              Back to Sign In
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

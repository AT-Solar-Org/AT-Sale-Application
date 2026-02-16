"use client";

import { useState } from "react";

export default function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-full">
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="bg-white flex items-center justify-center flex-col px-8 md:px-12 h-full text-center"
      >
        <img
          src="/images/at_solar_logo.png"
          alt="App Logo"
          className="w-20 md:w-24 h-auto mb-5"
        />
        <h1 className="font-semibold text-3xl md:text-4xl text-[#3D46B9] mb-4">Create Account</h1>

        <input 
          type="text" 
          placeholder="Name"
          className="bg-[#eee] border-none p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-gray-800 placeholder:text-gray-600 focus:bg-[#e2e2e2] focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          placeholder="Email"
          className="bg-[#eee] border-none p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-gray-800 placeholder:text-gray-600 focus:bg-[#e2e2e2] focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative w-full my-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-[#eee] border-none p-3 pr-12 w-full rounded-lg outline-none transition-all duration-300 text-gray-800 placeholder:text-gray-600 focus:bg-[#e2e2e2] focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 transition-opacity hover:opacity-70"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            <img
              src={
                showPassword
                  ? "/images/eye_pass_close.png"
                  : "/images/eye_pass_open.png"
              }
              alt="Toggle password"
              className="w-6 h-6"
            />
          </button>
        </div>

        <button
          type="button"
          className="md:hidden w-full text-center text-sm mt-3 mb-1 p-0 text-blue-500 bg-transparent border-none cursor-pointer underline hover:text-blue-700"
          onClick={onSwitch}
        >
          Already have an account?
        </button>

        <button 
          className="rounded-full bg-[#3D46B9] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 mt-4 cursor-pointer border-none hover:bg-[#2d36a0]"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="bg-slate-900 flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className={`bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-md md:max-w-225 min-h-[500px] md:min-h-140 ${isSignUp ? 'md:right-panel-active' : ''}`}>
        
        {/* Sign Up Form - Shows on mobile when isSignUp is true */}
        <div 
          className={`${
            isSignUp 
              ? "block" 
              : "hidden"
          } md:block md:absolute md:top-0 md:h-full md:transition-all md:duration-500 md:ease-in-out md:left-0 md:w-1/2 md:opacity-0 md:z-1 ${
            isSignUp ? 'md:translate-x-full md:opacity-100 md:z-5 md:animate-[show_0.6s]' : ''
          }`}
        >
          <SignUpForm onSwitch={() => setIsSignUp(false)} />
        </div>

        {/* Sign In Form - Shows on mobile when isSignUp is false */}
        <div 
          className={`${
            isSignUp 
              ? "hidden" 
              : "block"
          } md:block md:absolute md:top-0 md:h-full md:transition-all md:duration-500 md:ease-in-out md:left-0 md:w-1/2 md:z-2 ${
            isSignUp ? 'md:translate-x-full' : ''
          }`}
        >
          <SignInForm onSwitch={() => setIsSignUp(true)} />
        </div>

        {/* Overlay (Desktop only) */}
        <div 
          className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-[100] ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div 
            className={`text-white relative -left-full h-full w-[200%] transition-transform duration-500 ease-in-out ${
              isSignUp ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            {/* Left Panel - Sign In */}
            <div 
              className={`absolute flex items-center justify-center flex-col px-20 text-center top-0 h-full w-1/2 transition-transform duration-500 ease-in-out ${
                isSignUp ? "translate-x-0" : "-translate-x-[20%]"
              }`}
              style={{
                backgroundImage: "url('/images/signup-bg.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-[#0F172A]/70"></div>
              
              <div className="relative z-10">
                <h1 className="font-semibold text-4xl mb-4 text-white">Hello, Friend!</h1>
                <p className="text-sm leading-5 tracking-wide my-5 mx-0 text-white">
                  Enter your personal details and start you journey with us
                </p>
                <button
                  className="bg-transparent border border-white rounded-lg py-3 px-11 text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer hover:bg-white hover:text-[#0F172A]"
                  type="button"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Right Panel - Sign Up */}
            <div 
              className={`absolute right-0 flex items-center justify-center flex-col px-20 text-center top-0 h-full w-1/2 transition-transform duration-500 ease-in-out ${
                isSignUp ? "translate-x-[20%]" : "translate-x-0"
              }`}
              style={{
                backgroundImage: "url('/images/signin-bg.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-[#0F172A]/70"></div>
              
              <div className="relative z-10">
                <h1 className="font-semibold text-4xl mb-4 text-white">Hello, Friend!</h1>
                <p className="text-sm leading-5 tracking-wide my-5 mx-0 text-white">
                  Enter your personal details and start you journey with us
                </p>
                <button
                  className="bg-transparent border border-white rounded-lg py-3 px-11 text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer hover:bg-white hover:text-[#0F172A]"
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
    </div>
  );
}

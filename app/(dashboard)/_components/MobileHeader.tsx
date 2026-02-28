"use client";

import Image from "next/image";
import { LuMenu } from "react-icons/lu";

interface MobileHeaderProps {
  onMenuClick?: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-[#EA580C] bg-white flex items-center justify-center overflow-hidden">
          <Image
            src="/images/at_solar_logo.webp"
            alt="AT Logo"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <span className="font-bold text-lg text-white">AT ENERGY</span>
      </div>
      <button
        onClick={onMenuClick}
        className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg"
      >
        <LuMenu size={24} />
      </button>
    </div>
  );
}

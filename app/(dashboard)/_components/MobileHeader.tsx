"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LuMenu,
  LuX,
  LuLayoutDashboard,
  LuFileText,
  LuUsers,
  LuSettings,
  LuCalendar,
  LuUserCheck,
} from "react-icons/lu";

const menuItems = [
  { icon: LuLayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LuUsers, label: "Customer", href: "/customer" },
  { icon: LuCalendar, label: "Calendar", href: "/calendar" },
  { icon: LuFileText, label: "Report", href: "/report" },
];

const managementItems = [
  { icon: LuUserCheck, label: "Sale Approval", href: "/sale-approval" },
  { icon: LuSettings, label: "Settings", href: "/settings" },
];

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Blur backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 z-20 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div className="md:hidden sticky top-0 z-30">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border-2 border-[#EA580C] bg-white flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/images/at_solar_logo.webp"
                alt="AT Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <span className="font-black text-lg text-white tracking-tight block">AT ENERGY</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            {isOpen ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>

        {/* Dropdown — full screen height minus topbar, flex column so profile sticks to bottom */}
        <div
          className={`absolute top-full left-0 right-0 z-30
            flex flex-col bg-slate-900 shadow-2xl
            transition-all duration-300 ease-in-out
            ${isOpen
              ? "h-[calc(100svh-56px)] opacity-100 pointer-events-auto"
              : "h-0 opacity-0 pointer-events-none overflow-hidden"
            }`}
        >
          {/* Scrollable menu area */}
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-1">
            <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-1">
              Main Menu
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 ${
                    active
                      ? "bg-[#EA580C] text-white font-bold shadow-md shadow-orange-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={active ? "text-white" : "text-slate-500"} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}

            <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-1 pt-3">
              Management
            </p>
            {managementItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 ${
                    active
                      ? "bg-[#EA580C] text-white font-bold shadow-md shadow-orange-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={active ? "text-white" : "text-slate-500"} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User profile — pinned at bottom */}
          <div className="shrink-0 px-4 pt-3 pb-6 border-t border-slate-800">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black shadow-lg shadow-orange-900/30 shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@at-energy.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
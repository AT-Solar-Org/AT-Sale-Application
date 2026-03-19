"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LuLayoutDashboard,
  LuFileText,
  LuUsers,
  LuSettings,
  LuCalendar,
  LuUserCheck,
} from "react-icons/lu";

interface SidebarItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 group ${
      active
        ? "bg-[#EA580C] text-white font-bold shadow-md shadow-orange-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <Icon
      size={20}
      className={active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}
    />
    <span className={active ? "translate-x-1 transition-transform" : ""}>{label}</span>
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <div className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 shadow-xl shadow-black/10 z-20 text-white">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-white rounded-full border-2 border-[#EA580C] flex items-center justify-center shadow-sm shrink-0 relative overflow-hidden">
          <Image
            src="/images/at_solar_logo.webp"
            alt="AT Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="leading-tight">
          <span className="font-black text-lg text-white block tracking-tight">AT ENERGY</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        <p className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2">
          Main Menu
        </p>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
            onClick={() => router.push(item.href)}
          />
        ))}

        <p className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 mt-8">
          Management
        </p>
        {managementItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
            onClick={() => router.push(item.href)}
          />
        ))}
      </div>

      {/* User profile — display only, not clickable */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black text-sm shadow-md">
              A
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">admin@at-energy.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
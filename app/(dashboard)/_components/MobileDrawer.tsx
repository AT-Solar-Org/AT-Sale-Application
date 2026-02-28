"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LuLayoutDashboard,
  LuUsers,
  LuCircleUser,
  LuSettings,
  LuLogOut,
  LuCalendar,
  LuChartNoAxesCombined,
  LuHouse,
  LuX,
  LuUserCheck,
} from "react-icons/lu";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
}

const MenuItem = ({ icon: Icon, label, active, onClick }: MenuItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
      active
        ? "bg-[#EA580C] text-white font-bold"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <Icon size={20} className={active ? "text-white" : "text-slate-500"} />
    <span>{label}</span>
  </div>
);

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/auth");
    onClose();
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  const menuItems = [
    { icon: LuLayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: LuHouse, label: "Sales Home", href: "/sales" },
    { icon: LuUsers, label: "Customers", href: "/customers" },
    { icon: LuCalendar, label: "Maintenance", href: "/maintenance" },
    { icon: LuChartNoAxesCombined, label: "Reports", href: "/reports" },
  ];

  const managementItems = [
    { icon: LuUserCheck, label: "Approvals", href: "/approvals" },
    { icon: LuCircleUser, label: "Users", href: "/users" },
    { icon: LuSettings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-slate-900 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full border-2 border-[#EA580C] flex items-center justify-center overflow-hidden">
              <Image
                src="/images/at_solar_logo.webp"
                alt="AT Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <span className="font-black text-base text-white block">AT ENERGY</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider">
                & ENGINEERING
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 space-y-1 overflow-y-auto">
          <p className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
            Main Menu
          </p>
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href || pathname.startsWith(item.href + "/")}
              onClick={() => handleNavigate(item.href)}
            />
          ))}

          <p className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6">
            Management
          </p>
          {managementItems.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href || pathname.startsWith(item.href + "/")}
              onClick={() => handleNavigate(item.href)}
            />
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800">
          <div
            onClick={() => handleNavigate("/profile")}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 cursor-pointer transition-all border border-transparent hover:border-slate-700"
          >
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">admin@at-energy.com</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LuLogOut size={18} className="text-slate-500 hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

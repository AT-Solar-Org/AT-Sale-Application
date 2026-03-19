"use client";

import { useRouter } from "next/navigation";
import {
  LuUser,
  LuBell,
  LuShield,
  LuSmartphone,
  LuGlobe,
  LuMoon,
  LuLogOut,
  LuChevronRight,
  LuCamera,
  LuCheck,
} from "react-icons/lu";

const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">{title}</p>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
      {children}
    </div>
  </div>
);

const SettingsRow = ({
  icon,
  label,
  subtitle,
  right,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3.5 transition-colors ${
      onClick ? "cursor-pointer hover:bg-slate-50 active:bg-slate-100" : ""
    }`}
  >
    <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
        danger ? "bg-red-50 text-red-500" : "bg-slate-100 text-slate-600"
      }`}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold ${danger ? "text-red-500" : "text-slate-800"}`}>{label}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {right ?? (onClick && !danger ? <LuChevronRight size={16} className="text-slate-300 shrink-0" /> : null)}
  </div>
);

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/auth");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6 flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-200">
            A
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#EA580C] rounded-full flex items-center justify-center border-2 border-white shadow">
            <LuCamera size={11} className="text-white" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-lg text-slate-900">Admin User</p>
          <p className="text-sm text-slate-400">admin@at-energy.com</p>
          <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <LuCheck size={10} /> Administrator
          </span>
        </div>
        <button
          onClick={() => {}}
          className="shrink-0 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          Edit
        </button>
      </div>

      {/* Account */}
      <SettingsSection title="Account">
        <SettingsRow
          icon={<LuUser size={17} />}
          label="Personal Information"
          subtitle="Name, email, phone number"
          onClick={() => {}}
        />
        <SettingsRow
          icon={<LuShield size={17} />}
          label="Password & Security"
          subtitle="Change password, 2FA"
          onClick={() => {}}
        />
      </SettingsSection>

      {/* Preferences */}
      <SettingsSection title="Preferences">
        <SettingsRow
          icon={<LuBell size={17} />}
          label="Notifications"
          subtitle="Push, email alerts"
          onClick={() => {}}
        />
        <SettingsRow
          icon={<LuMoon size={17} />}
          label="Appearance"
          subtitle="Theme, display settings"
          onClick={() => {}}
          right={
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              Dark
            </span>
          }
        />
        <SettingsRow
          icon={<LuGlobe size={17} />}
          label="Language & Region"
          subtitle="Language, timezone, currency"
          onClick={() => {}}
          right={
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              EN
            </span>
          }
        />
        <SettingsRow
          icon={<LuSmartphone size={17} />}
          label="Connected Devices"
          subtitle="Manage active sessions"
          onClick={() => {}}
        />
      </SettingsSection>

      {/* Danger zone */}
      <SettingsSection title="Session">
        <SettingsRow
          icon={<LuLogOut size={17} />}
          label="Log out"
          subtitle="Sign out of your account"
          danger
          onClick={handleLogout}
        />
      </SettingsSection>

      <p className="text-center text-xs text-slate-300 mt-4">AT Energy & Engineering · v1.0.0</p>
    </div>
  );
}
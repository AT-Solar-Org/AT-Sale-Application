"use client";

import {
  LuFileText,
  LuTriangleAlert,
  LuCircleCheck,
  LuClipboardList,
} from "react-icons/lu";

const stats = [
  { label: "Total Sites",    value: "12", sub: "+2 this month",   color: "text-orange-600", bg: "bg-orange-50",  border: "border-orange-100", icon: LuFileText      },
  { label: "Pending Survey", value: "3",  sub: "Awaiting visit",  color: "text-yellow-600", bg: "bg-yellow-50",  border: "border-yellow-100", icon: LuClipboardList },
  { label: "Approved",       value: "5",  sub: "Ready to install",color: "text-green-600",  bg: "bg-green-50",   border: "border-green-100",  icon: LuCircleCheck   },
  { label: "Issues",         value: "1",  sub: "Needs attention", color: "text-red-600",    bg: "bg-red-50",     border: "border-red-100",    icon: LuTriangleAlert },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of all customer installations and project status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`bg-white p-5 rounded-xl border ${item.border} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wide leading-tight">{item.label}</p>
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <Icon size={16} className={item.color} />
                </div>
              </div>
              <p className={`text-3xl font-black ${item.color}`}>{item.value}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{item.sub}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
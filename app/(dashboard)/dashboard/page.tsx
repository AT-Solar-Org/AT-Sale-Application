"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LuSearch,
  LuPlus,
  LuMapPin,
  LuUser,
  LuClock,
  LuLayoutGrid,
  LuList,
  LuTrendingUp,
  LuUsers,
  LuZap,
  LuCalendar,
  LuChevronRight,
  LuDollarSign,
} from "react-icons/lu";

// Mock Data
const customers = [
  {
    id: 1,
    name: "Phawat Srivichai (Film)",
    location: "Bang Khun Thian, Bangkok",
    sale: "Baitoey",
    status: "Survey",
    date: "24 Jan 2026",
    statusColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
    dotColor: "bg-yellow-500",
  },
  {
    id: 2,
    name: "Food and Beverage",
    location: "Somewhere, Chonburi",
    sale: "Baitoey",
    status: "Installation",
    date: "24 Jan 2026",
    statusColor: "bg-slate-100 text-slate-700 border-slate-200",
    dotColor: "bg-slate-500",
  },
  {
    id: 3,
    name: "Chocolate Factory",
    location: "Somewhere, Rayong",
    sale: "Bank",
    status: "Approved",
    date: "24 Jan 2026",
    statusColor: "bg-green-50 text-green-700 border-green-200",
    dotColor: "bg-green-500",
  },
  {
    id: 4,
    name: "Korapin",
    location: "Bang Khun Thian, Bangkok",
    sale: "Junjao",
    status: "Approved",
    date: "24 Jan 2026",
    statusColor: "bg-green-50 text-green-700 border-green-200",
    dotColor: "bg-green-500",
  },
  {
    id: 5,
    name: "Yak Kin Salmon",
    location: "Thung Kru, Bangkok",
    sale: "Bank",
    status: "Quotation",
    date: "24 Jan 2026",
    statusColor: "bg-purple-50 text-purple-700 border-purple-200",
    dotColor: "bg-purple-500",
  },
  {
    id: 6,
    name: "Jojo Banana (Apple)",
    location: "Bang Khun Thian, Bangkok",
    sale: "Junjao",
    status: "Survey",
    date: "24 Jan 2026",
    statusColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
    dotColor: "bg-yellow-500",
  },
];

const stats = [
  {
    label: "Total Customers",
    value: "124",
    change: "+12%",
    changeType: "up",
    icon: LuUsers,
    color: "text-[#EA580C]",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    label: "Pending Survey",
    value: "18",
    change: "+5",
    changeType: "up",
    icon: LuCalendar,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
  {
    label: "Total kWp",
    value: "2,450",
    change: "+180",
    changeType: "up",
    icon: LuZap,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    label: "Revenue (฿)",
    value: "5.2M",
    change: "+8%",
    changeType: "up",
    icon: LuDollarSign,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
];

const salesTeam = [
  { name: "Baitoey", customers: 32, kWp: 580, revenue: 1200000 },
  { name: "Bank", customers: 28, kWp: 620, revenue: 1350000 },
  { name: "Junjao", customers: 24, kWp: 450, revenue: 980000 },
  { name: "Phawat", customers: 22, kWp: 520, revenue: 1100000 },
  { name: "Wannee", customers: 18, kWp: 280, revenue: 570000 },
];

interface StatusBadgeProps {
  status: string;
  colorClass: string;
  dotColor: string;
}

const StatusBadge = ({ status, colorClass, dotColor }: StatusBadgeProps) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass} flex items-center gap-1.5 w-fit`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
    {status}
  </span>
);

export default function DashboardPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Admin Dashboard</h1>
          <p className="text-[#64748B] text-sm mt-1">
            Overview of all installations and team performance
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-all"
            />
          </div>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 ${viewMode === "grid" ? "bg-[#EA580C] text-white" : "text-[#64748B] hover:bg-slate-50"}`}
            >
              <LuLayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 ${viewMode === "list" ? "bg-[#EA580C] text-white" : "text-[#64748B] hover:bg-slate-50"}`}
            >
              <LuList size={18} />
            </button>
          </div>
          <button
            onClick={() => router.push("/customers/new")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md"
          >
            <LuPlus size={18} />
            <span className="hidden sm:inline">Add Customer</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`bg-white p-5 rounded-xl border ${item.border} shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold text-[#1E293B] mt-1">{item.value}</p>
                  {item.change && (
                    <p className={`text-xs mt-2 flex items-center gap-1 ${item.changeType === "up" ? "text-green-600" : "text-red-600"}`}>
                      <LuTrendingUp size={12} />
                      {item.change} this month
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customers Grid/List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-[#1E293B]">Recent Customers</h2>
              <button
                onClick={() => router.push("/customers")}
                className="text-sm text-[#EA580C] font-medium hover:underline flex items-center gap-1"
              >
                View All
                <LuChevronRight size={16} />
              </button>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {customers.slice(0, 4).map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => router.push(`/customers/${customer.id}`)}
                    className="bg-[#F8FAFC] rounded-xl border border-slate-100 p-4 cursor-pointer hover:border-[#EA580C]/30 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-[#1E293B] group-hover:text-[#EA580C] transition-colors">
                        {customer.name}
                      </h3>
                      <StatusBadge
                        status={customer.status}
                        colorClass={customer.statusColor}
                        dotColor={customer.dotColor}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 text-[#64748B] text-sm mb-2">
                      <LuMapPin size={14} />
                      {customer.location}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <LuUser size={14} className="text-[#EA580C]" />
                        {customer.sale}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#64748B]">
                        <LuClock size={12} />
                        {customer.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => router.push(`/customers/${customer.id}`)}
                    className="flex items-center justify-between p-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-linear-to-br from-[#EA580C] to-[#fb923c] rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#1E293B]">{customer.name}</p>
                        <p className="text-sm text-[#64748B]">{customer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge
                        status={customer.status}
                        colorClass={customer.statusColor}
                        dotColor={customer.dotColor}
                      />
                      <p className="text-sm text-[#64748B]">{customer.sale}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sales Team Performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#1E293B]">Sales Team</h2>
            <button
              onClick={() => router.push("/users")}
              className="text-sm text-[#EA580C] font-medium hover:underline flex items-center gap-1"
            >
              View All
              <LuChevronRight size={16} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {salesTeam.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-slate-100"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    idx === 0 ? "bg-yellow-500" : idx === 1 ? "bg-slate-400" : idx === 2 ? "bg-amber-600" : "bg-slate-300"
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1E293B] text-sm">{member.name}</p>
                  <p className="text-xs text-[#64748B]">
                    {member.customers} customers • {member.kWp} kWp
                  </p>
                </div>
                <p className="text-sm font-bold text-[#EA580C]">
                  ฿{(member.revenue / 1000000).toFixed(1)}M
                </p>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-slate-100">
                <p className="text-2xl font-bold text-[#1E293B]">5</p>
                <p className="text-xs text-[#64748B]">Active Sales</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-3 text-center border border-slate-100">
                <p className="text-2xl font-bold text-green-600">89%</p>
                <p className="text-xs text-[#64748B]">Avg. Target</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

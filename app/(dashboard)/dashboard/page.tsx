"use client";

import { LuSearch, LuPlus, LuMapPin, LuUser, LuClock, LuFileText } from "react-icons/lu";

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
    label: "Total Sites",
    value: "12",
    color: "text-[#EA580C]",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    label: "Pending Survey",
    value: "3",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
  },
  {
    label: "Approved",
    value: "5",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    label: "Issues",
    value: "1",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
  },
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
  return (
    <div className="p-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Overview of all customer installations
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-orange-200">
            <LuPlus size={18} />
            <span className="hidden sm:inline">Add Customer</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white p-4 rounded-xl border ${item.border} shadow-sm flex items-center justify-between hover:shadow-md transition-shadow`}
          >
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{item.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
              <LuFileText size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer group hover:border-orange-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#EA580C] transition-colors">
                  {customer.name}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
                  <LuMapPin size={14} className="text-slate-400" />
                  {customer.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm mb-4 bg-slate-50 p-2 rounded-lg w-fit border border-slate-100">
              <LuUser size={14} className="text-[#EA580C]" />
              <span>
                Sale: <span className="font-semibold text-slate-800">{customer.sale}</span>
              </span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <StatusBadge
                status={customer.status}
                colorClass={customer.statusColor}
                dotColor={customer.dotColor}
              />
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <LuClock size={12} />
                {customer.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

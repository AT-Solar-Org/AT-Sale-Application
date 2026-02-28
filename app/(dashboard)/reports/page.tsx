"use client";

import { useState } from "react";
import {
  LuDownload,
  LuCalendar,
  LuTrendingUp,
  LuTrendingDown,
  LuUsers,
  LuFileText,
  LuDollarSign,
  LuZap,
  LuChartColumn,
  LuChartPie,
} from "react-icons/lu";

const monthlyStats = [
  { month: "Aug", sales: 3200000, leads: 45, closed: 12 },
  { month: "Sep", sales: 2800000, leads: 38, closed: 9 },
  { month: "Oct", sales: 4100000, leads: 52, closed: 15 },
  { month: "Nov", sales: 3600000, leads: 48, closed: 13 },
  { month: "Dec", sales: 4800000, leads: 62, closed: 18 },
  { month: "Jan", sales: 5200000, leads: 71, closed: 22 },
];

const topSales = [
  { name: "Phawat Srivichai", deals: 8, value: 2100000, kWp: 45.2 },
  { name: "Wannee Suksri", deals: 6, value: 1650000, kWp: 35.8 },
  { name: "Somchai Jaidee", deals: 5, value: 1400000, kWp: 30.1 },
  { name: "Naree Sangthong", deals: 3, value: 850000, kWp: 18.5 },
];

const recentDeals = [
  { customer: "Film Studio Co., Ltd.", kWp: 20.9, value: 331550, sale: "Phawat S.", date: "28 Jan 2026" },
  { customer: "Green Factory Co.", kWp: 50.0, value: 780000, sale: "Wannee S.", date: "25 Jan 2026" },
  { customer: "Home Sweet Home", kWp: 8.5, value: 125000, sale: "Phawat S.", date: "22 Jan 2026" },
  { customer: "ABC Manufacturing", kWp: 100.0, value: 1520000, sale: "Somchai J.", date: "18 Jan 2026" },
  { customer: "Thai Organic Farm", kWp: 15.0, value: 220000, sale: "Naree S.", date: "15 Jan 2026" },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("this_month");

  const currentMonth = monthlyStats[monthlyStats.length - 1];
  const previousMonth = monthlyStats[monthlyStats.length - 2];
  const salesGrowth = ((currentMonth.sales - previousMonth.sales) / previousMonth.sales) * 100;
  const leadsGrowth = ((currentMonth.leads - previousMonth.leads) / previousMonth.leads) * 100;

  const maxSales = Math.max(...monthlyStats.map((m) => m.sales));

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Sales Reports</h1>
          <p className="text-[#64748B] text-sm mt-1">Analytics and performance insights</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg bg-white">
            <LuCalendar size={16} className="text-[#64748B]" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm bg-transparent focus:outline-none"
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_quarter">This Quarter</option>
              <option value="this_year">This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md">
            <LuDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Total Revenue</p>
              <p className="text-2xl font-bold text-[#1E293B] mt-1">฿{(currentMonth.sales / 1000000).toFixed(1)}M</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${salesGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {salesGrowth >= 0 ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
                <span>{Math.abs(salesGrowth).toFixed(1)}% vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LuDollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">New Leads</p>
              <p className="text-2xl font-bold text-[#1E293B] mt-1">{currentMonth.leads}</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${leadsGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {leadsGrowth >= 0 ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
                <span>{Math.abs(leadsGrowth).toFixed(1)}% vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuUsers size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Closed Deals</p>
              <p className="text-2xl font-bold text-[#1E293B] mt-1">{currentMonth.closed}</p>
              <div className="text-sm text-[#64748B] mt-2">
                {((currentMonth.closed / currentMonth.leads) * 100).toFixed(0)}% conversion rate
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <LuFileText size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Total kWp Installed</p>
              <p className="text-2xl font-bold text-[#1E293B] mt-1">
                {topSales.reduce((acc, s) => acc + s.kWp, 0).toFixed(1)}
              </p>
              <div className="text-sm text-[#64748B] mt-2">This month</div>
            </div>
            <div className="w-12 h-12 bg-[#EA580C]/10 rounded-lg flex items-center justify-center">
              <LuZap size={24} className="text-[#EA580C]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2">
              <LuChartColumn className="text-[#EA580C]" />
              Monthly Sales
            </h3>
            <div className="text-sm text-[#64748B]">Last 6 months</div>
          </div>
          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 gap-4">
            {monthlyStats.map((month, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative">
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      idx === monthlyStats.length - 1 ? "bg-[#EA580C]" : "bg-slate-200"
                    }`}
                    style={{ height: `${(month.sales / maxSales) * 160}px` }}
                  />
                </div>
                <p className="text-xs text-[#64748B] font-medium">{month.month}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2 mb-6">
            <LuChartPie className="text-[#EA580C]" />
            Conversion Funnel
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#64748B]">Leads</span>
                <span className="font-medium text-[#1E293B]">{currentMonth.leads}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#64748B]">Surveyed</span>
                <span className="font-medium text-[#1E293B]">{Math.round(currentMonth.leads * 0.6)}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#64748B]">Quoted</span>
                <span className="font-medium text-[#1E293B]">{Math.round(currentMonth.leads * 0.45)}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#EA580C] rounded-full" style={{ width: "45%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#64748B]">Closed</span>
                <span className="font-medium text-[#1E293B]">{currentMonth.closed}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(currentMonth.closed / currentMonth.leads) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topSales.map((sale, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      idx === 0 ? "bg-yellow-500" : idx === 1 ? "bg-slate-400" : idx === 2 ? "bg-amber-600" : "bg-slate-300"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">{sale.name}</p>
                    <p className="text-xs text-[#64748B]">{sale.deals} deals • {sale.kWp} kWp</p>
                  </div>
                </div>
                <p className="font-bold text-[#1E293B]">฿{(sale.value / 1000000).toFixed(2)}M</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Deals */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4">Recent Deals</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left pb-3 text-xs font-bold text-[#64748B] uppercase">Customer</th>
                  <th className="text-right pb-3 text-xs font-bold text-[#64748B] uppercase">kWp</th>
                  <th className="text-right pb-3 text-xs font-bold text-[#64748B] uppercase">Value</th>
                  <th className="text-right pb-3 text-xs font-bold text-[#64748B] uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((deal, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0">
                    <td className="py-3">
                      <p className="font-medium text-[#1E293B] text-sm">{deal.customer}</p>
                      <p className="text-xs text-[#64748B]">{deal.sale}</p>
                    </td>
                    <td className="py-3 text-right text-sm text-[#1E293B]">{deal.kWp}</td>
                    <td className="py-3 text-right text-sm font-medium text-[#1E293B]">
                      ฿{deal.value.toLocaleString()}
                    </td>
                    <td className="py-3 text-right text-xs text-[#64748B]">{deal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

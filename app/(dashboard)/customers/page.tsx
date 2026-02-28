"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LuSearch,
  LuPlus,
  LuFilter,
  LuMapPin,
  LuUser,
  LuPhone,
  LuMail,
  LuChevronDown,
  LuEye,
  LuPencil,
  LuTrash2,
  LuEllipsisVertical,
} from "react-icons/lu";

type Status = "Survey" | "Quotation" | "Approved" | "Installation" | "Completed" | "Cancelled";

interface Customer {
  id: number;
  name: string;
  company: string;
  location: string;
  phone: string;
  email: string;
  sale: string;
  status: Status;
  date: string;
  kWp: number;
}

const statusStyles: Record<Status, { bg: string; text: string; dot: string }> = {
  Survey: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  Quotation: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  Approved: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  Installation: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
  Completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

const customers: Customer[] = [
  { id: 1, name: "Phawat Srivichai", company: "Film Studio Co.", location: "Bang Khun Thian, Bangkok", phone: "081-234-5678", email: "phawat@example.com", sale: "Baitoey", status: "Survey", date: "24 Jan 2026", kWp: 15.5 },
  { id: 2, name: "Somchai Wongsuwan", company: "Food and Beverage Ltd.", location: "Somewhere, Chonburi", phone: "082-345-6789", email: "somchai@example.com", sale: "Baitoey", status: "Installation", date: "24 Jan 2026", kWp: 32.0 },
  { id: 3, name: "Apinya Thammasak", company: "Chocolate Factory", location: "Somewhere, Rayong", phone: "083-456-7890", email: "apinya@example.com", sale: "Bank", status: "Approved", date: "24 Jan 2026", kWp: 45.0 },
  { id: 4, name: "Korapin Srisawat", company: "Korapin Enterprise", location: "Bang Khun Thian, Bangkok", phone: "084-567-8901", email: "korapin@example.com", sale: "Junjao", status: "Approved", date: "24 Jan 2026", kWp: 22.5 },
  { id: 5, name: "Nattapong Yindee", company: "Yak Kin Salmon", location: "Thung Kru, Bangkok", phone: "085-678-9012", email: "nattapong@example.com", sale: "Bank", status: "Quotation", date: "24 Jan 2026", kWp: 18.0 },
  { id: 6, name: "Jirapat Thongdee", company: "Jojo Banana Corp.", location: "Bang Khun Thian, Bangkok", phone: "086-789-0123", email: "jirapat@example.com", sale: "Junjao", status: "Survey", date: "24 Jan 2026", kWp: 28.5 },
];

export default function CustomersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const filteredCustomers = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                       c.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Customers</h1>
          <p className="text-[#64748B] text-sm mt-1">
            Manage all customer records and installations
          </p>
        </div>

        <button
          onClick={() => router.push("/customers/new")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md"
        >
          <LuPlus size={18} />
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
          <div className="relative">
            <LuFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
            >
              <option value="All">All Status</option>
              <option value="Survey">Survey</option>
              <option value="Quotation">Quotation</option>
              <option value="Approved">Approved</option>
              <option value="Installation">Installation</option>
              <option value="Completed">Completed</option>
            </select>
            <LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200">
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wide">Customer</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wide hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wide hidden lg:table-cell">Sale</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wide">Status</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wide hidden md:table-cell">kWp</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const style = statusStyles[customer.status];
                return (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/customers/${customer.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-[#1E293B]">{customer.name}</p>
                        <p className="text-sm text-[#64748B]">{customer.company}</p>
                        <div className="flex items-center gap-1 text-xs text-[#64748B] mt-1">
                          <LuMapPin size={12} />
                          {customer.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <LuPhone size={14} />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <LuMail size={14} />
                          {customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#EA580C]/10 flex items-center justify-center">
                          <LuUser size={14} className="text-[#EA580C]" />
                        </div>
                        <span className="font-medium text-[#1E293B]">{customer.sale}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell">
                      <span className="font-bold text-[#1E293B]">{customer.kWp}</span>
                      <span className="text-[#64748B] text-sm ml-1">kWp</span>
                    </td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDropdown(showDropdown === customer.id ? null : customer.id);
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <LuEllipsisVertical size={18} className="text-[#64748B]" />
                      </button>
                      {showDropdown === customer.id && (
                        <div className="absolute right-6 top-12 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
                          <button
                            onClick={(e) => { e.stopPropagation(); router.push(`/customers/${customer.id}`); }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                          >
                            <LuEye size={14} /> View
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); router.push(`/customers/${customer.id}/edit`); }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                          >
                            <LuPencil size={14} /> Edit
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                          >
                            <LuTrash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 text-[#64748B]">
            <p>No customers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

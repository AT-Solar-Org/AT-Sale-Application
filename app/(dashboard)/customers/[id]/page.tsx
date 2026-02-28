"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import {
  LuArrowLeft,
  LuMapPin,
  LuPhone,
  LuMail,
  LuUser,
  LuBuilding,
  LuCalendar,
  LuSun,
  LuZap,
  LuClipboardList,
  LuPencil,
  LuFileText,
  LuClipboardCheck,
  LuCamera,
  LuX,
  LuDownload,
  LuImage,
  LuBanknote,
  LuTrendingUp,
  LuCpu,
  LuHouse,
} from "react-icons/lu";

const customer = {
  id: 1,
  name: "Phawat Srivichai",
  company: "Film Studio Co., Ltd.",
  location: "123/45 Bang Khun Thian, Bangkok 10150",
  phone: "081-234-5678",
  email: "phawat@filmstudio.co.th",
  sale: "Baitoey",
  status: "Survey",
  date: "24 Jan 2026",
  kWp: 15.5,
  roofType: "Metal Sheet",
  roofArea: 250,
  electricBill: 45000,
  panelCount: 38,
  inverterType: "Huawei SUN2000",
  estimatedSavings: 32000,
  paybackPeriod: "4.2 years",
  notes: "Customer prefers installation during weekends. Has existing electrical system that needs assessment.",
};

// Mock photo data for Photo Report section
const photoReport = {
  roof: [
    { id: 1, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", caption: "Roof Overview - East Side", date: "25 Jan 2026" },
    { id: 2, url: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=300&fit=crop", caption: "Roof Overview - West Side", date: "25 Jan 2026" },
    { id: 3, url: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=300&fit=crop", caption: "Metal Sheet Condition", date: "25 Jan 2026" },
  ],
  electrical: [
    { id: 4, url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop", caption: "Main Electrical Panel", date: "25 Jan 2026" },
    { id: 5, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", caption: "Meter Box", date: "25 Jan 2026" },
  ],
  site: [
    { id: 6, url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop", caption: "Building Front View", date: "25 Jan 2026" },
    { id: 7, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", caption: "Parking Area - Potential for Ground Mount", date: "25 Jan 2026" },
  ],
};

const timeline = [
  { date: "24 Jan 2026", event: "Initial contact", status: "completed" },
  { date: "25 Jan 2026", event: "Site survey scheduled", status: "completed" },
  { date: "28 Jan 2026", event: "Survey in progress", status: "current" },
  { date: "TBD", event: "Quotation", status: "pending" },
  { date: "TBD", event: "Installation", status: "pending" },
];

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<{url: string; caption: string; date: string} | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<'roof' | 'electrical' | 'site'>('roof');
  
  const allPhotos = [...photoReport.roof, ...photoReport.electrical, ...photoReport.site];
  const currentPhotos = photoReport[activePhotoTab];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#EA580C] transition-colors"
            >
              <LuX size={28} />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-medium">{selectedPhoto.caption}</p>
              <p className="text-white/60 text-sm">{selectedPhoto.date}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <LuArrowLeft size={20} className="text-[#64748B]" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1E293B]">{customer.name}</h1>
          <p className="text-[#64748B] text-sm">{customer.company}</p>
        </div>
        <button
          onClick={() => router.push(`/customers/${params.id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
        >
          <LuPencil size={16} />
          Edit
        </button>
        <button
          onClick={() => router.push(`/customers/${params.id}/survey`)}
          className="flex items-center gap-2 px-5 py-2 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md"
        >
          <LuClipboardList size={16} />
          Survey
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F8FAFC] rounded-lg">
                  <LuBuilding size={18} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Company</p>
                  <p className="text-[#1E293B] font-medium">{customer.company}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F8FAFC] rounded-lg">
                  <LuMapPin size={18} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Location</p>
                  <p className="text-[#1E293B] font-medium">{customer.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F8FAFC] rounded-lg">
                  <LuPhone size={18} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Phone</p>
                  <p className="text-[#1E293B] font-medium">{customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F8FAFC] rounded-lg">
                  <LuMail size={18} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Email</p>
                  <p className="text-[#1E293B] font-medium">{customer.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">System Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuSun size={18} className="text-[#EA580C]" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">System Size</span>
                </div>
                <p className="text-2xl font-bold text-[#1E293B]">{customer.kWp} <span className="text-sm font-normal">kWp</span></p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuZap size={18} className="text-[#EA580C]" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">Panels</span>
                </div>
                <p className="text-2xl font-bold text-[#1E293B]">{customer.panelCount} <span className="text-sm font-normal">units</span></p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuFileText size={18} className="text-[#EA580C]" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">Roof Area</span>
                </div>
                <p className="text-2xl font-bold text-[#1E293B]">{customer.roofArea} <span className="text-sm font-normal">m²</span></p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuCalendar size={18} className="text-[#EA580C]" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">Payback</span>
                </div>
                <p className="text-2xl font-bold text-[#1E293B]">{customer.paybackPeriod}</p>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Financial Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuBanknote size={18} className="text-[#EA580C]" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">Electric Bill</span>
                </div>
                <p className="text-2xl font-bold text-[#1E293B]">฿{customer.electricBill.toLocaleString()}<span className="text-sm font-normal">/mo</span></p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuTrendingUp size={18} className="text-green-600" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">Est. Savings</span>
                </div>
                <p className="text-2xl font-bold text-green-600">฿{customer.estimatedSavings.toLocaleString()}<span className="text-sm font-normal">/mo</span></p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <LuCalendar size={18} className="text-[#EA580C]" />
                  <span className="text-xs text-[#64748B] font-bold uppercase">Payback Period</span>
                </div>
                <p className="text-2xl font-bold text-[#1E293B]">{customer.paybackPeriod}</p>
              </div>
            </div>
          </div>

          {/* Equipment Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Equipment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <LuSun size={20} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Solar Panels</p>
                  <p className="text-[#1E293B] font-medium">{customer.panelCount} x 410W Monocrystalline</p>
                  <p className="text-sm text-[#64748B]">Total: {customer.kWp} kWp</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <LuCpu size={20} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Inverter</p>
                  <p className="text-[#1E293B] font-medium">{customer.inverterType}</p>
                  <p className="text-sm text-[#64748B]">15kW 3-Phase</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <LuHouse size={20} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Roof Type</p>
                  <p className="text-[#1E293B] font-medium">{customer.roofType}</p>
                  <p className="text-sm text-[#64748B]">Area: {customer.roofArea} m²</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <div className="p-2 bg-white rounded-lg border border-slate-100">
                  <LuZap size={20} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Mounting System</p>
                  <p className="text-[#1E293B] font-medium">Aluminum Rail Mount</p>
                  <p className="text-sm text-[#64748B]">10-year warranty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Notes</h2>
            <p className="text-[#64748B] leading-relaxed">{customer.notes}</p>
          </div>

          {/* Photo Report */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#EA580C]/10 rounded-lg">
                  <LuCamera size={20} className="text-[#EA580C]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1E293B]">Photo Report</h2>
                  <p className="text-sm text-[#64748B]">{allPhotos.length} photos from site survey</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium text-[#1E293B]">
                <LuDownload size={16} />
                Download All
              </button>
            </div>

            {/* Photo Category Tabs */}
            <div className="flex gap-2 mb-4 border-b border-slate-200">
              <button
                onClick={() => setActivePhotoTab('roof')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activePhotoTab === 'roof'
                    ? 'border-[#EA580C] text-[#EA580C]'
                    : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Roof ({photoReport.roof.length})
              </button>
              <button
                onClick={() => setActivePhotoTab('electrical')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activePhotoTab === 'electrical'
                    ? 'border-[#EA580C] text-[#EA580C]'
                    : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Electrical ({photoReport.electrical.length})
              </button>
              <button
                onClick={() => setActivePhotoTab('site')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activePhotoTab === 'site'
                    ? 'border-[#EA580C] text-[#EA580C]'
                    : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                Site ({photoReport.site.length})
              </button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-4/3 rounded-lg overflow-hidden cursor-pointer border border-slate-200 hover:border-[#EA580C] transition-colors"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium line-clamp-1">{photo.caption}</p>
                      <p className="text-white/70 text-xs">{photo.date}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <LuImage size={16} className="text-white" />
                  </div>
                </div>
              ))}
            </div>

            {currentPhotos.length === 0 && (
              <div className="text-center py-8">
                <LuCamera size={32} className="mx-auto text-[#64748B] mb-2" />
                <p className="text-[#64748B]">No photos in this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Status</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-semibold border border-yellow-200">
                {customer.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <LuUser size={14} />
              <span>Assigned to: <strong className="text-[#1E293B]">{customer.sale}</strong></span>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Timeline</h2>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === "completed" ? "bg-green-500" :
                      item.status === "current" ? "bg-[#EA580C]" : "bg-slate-300"
                    }`} />
                    {idx < timeline.length - 1 && (
                      <div className={`w-0.5 h-full min-h-8 ${
                        item.status === "completed" ? "bg-green-200" : "bg-slate-200"
                      }`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm font-medium ${
                      item.status === "current" ? "text-[#EA580C]" : "text-[#1E293B]"
                    }`}>{item.event}</p>
                    <p className="text-xs text-[#64748B]">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => router.push(`/customers/${params.id}/calculation`)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-left"
              >
                <LuZap size={18} className="text-[#EA580C]" />
                <span className="text-sm font-medium text-[#1E293B]">Calculate System</span>
              </button>
              <button
                onClick={() => router.push(`/customers/${params.id}/survey`)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-left"
              >
                <LuClipboardCheck size={18} className="text-[#EA580C]" />
                <span className="text-sm font-medium text-[#1E293B]">Complete Survey</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-left">
                <LuFileText size={18} className="text-[#EA580C]" />
                <span className="text-sm font-medium text-[#1E293B]">Generate Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

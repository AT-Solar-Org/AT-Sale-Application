"use client";

import { useRouter, useParams } from "next/navigation";
import {
  LuArrowLeft,
  LuDownload,
  LuShare2,
  LuPrinter,
  LuSun,
  LuZap,
  LuCalendar,
  LuShield,
  LuCircleCheck,
} from "react-icons/lu";
import Image from "next/image";

const quotationData = {
  quoteNumber: "QT-2026-00142",
  date: "28 January 2026",
  validUntil: "28 February 2026",
  customer: {
    name: "Phawat Srivichai",
    company: "Film Studio Co., Ltd.",
    address: "123/45 Bang Khun Thian, Bangkok 10150",
    phone: "081-234-5678",
    email: "phawat@filmstudio.co.th",
  },
  system: {
    size: "20.9 kWp",
    panels: "38x JA Solar 550W",
    inverter: "Huawei SUN2000-15KTL",
    mounting: "Metal Roof Mounting System",
  },
  costs: {
    panels: 171000,
    inverter: 58000,
    mounting: 25000,
    cables: 15000,
    labor: 50000,
    other: 30000,
    subtotal: 349000,
    discount: 17450,
    total: 331550,
  },
  savings: {
    monthly: 32000,
    yearly: 384000,
    payback: "4.2 years",
    co2: "15.2 tons/year",
  },
  warranty: [
    { item: "Solar Panels", period: "25 years performance" },
    { item: "Inverter", period: "10 years" },
    { item: "Workmanship", period: "5 years" },
    { item: "Mounting System", period: "15 years" },
  ],
};

export default function CalculationPreviewPage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LuArrowLeft size={20} className="text-[#64748B]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Quotation Preview</h1>
            <p className="text-[#64748B] text-sm">{quotationData.quoteNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
            <LuPrinter size={18} className="text-[#64748B]" />
          </button>
          <button className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors">
            <LuShare2 size={18} className="text-[#64748B]" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md">
            <LuDownload size={16} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Quotation Document */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-[#0F172A] to-slate-800 p-8 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src="/images/at_solar_logo.webp"
                  alt="AT Energy Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black">AT ENERGY</h2>
                <p className="text-slate-300 text-sm">& ENGINEERING CO., LTD.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#EA580C]">QUOTATION</p>
              <p className="text-slate-300 text-sm mt-1">{quotationData.quoteNumber}</p>
            </div>
          </div>
        </div>

        {/* Quote Details */}
        <div className="p-8">
          {/* Date & Customer */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-200">
            <div>
              <p className="text-xs text-[#64748B] uppercase font-bold mb-2">Quote Date</p>
              <p className="text-[#1E293B] font-medium">{quotationData.date}</p>
              <p className="text-xs text-[#64748B] mt-1">Valid until: {quotationData.validUntil}</p>
            </div>
            <div>
              <p className="text-xs text-[#64748B] uppercase font-bold mb-2">Customer</p>
              <p className="text-[#1E293B] font-bold">{quotationData.customer.name}</p>
              <p className="text-sm text-[#64748B]">{quotationData.customer.company}</p>
              <p className="text-sm text-[#64748B]">{quotationData.customer.address}</p>
            </div>
          </div>

          {/* System Specifications */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <LuSun className="text-[#EA580C]" />
              System Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F8FAFC] rounded-lg p-4 border border-slate-100">
                <p className="text-xs text-[#64748B] uppercase font-bold">System Size</p>
                <p className="text-xl font-bold text-[#1E293B] mt-1">{quotationData.system.size}</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-4 border border-slate-100">
                <p className="text-xs text-[#64748B] uppercase font-bold">Solar Panels</p>
                <p className="text-sm font-medium text-[#1E293B] mt-1">{quotationData.system.panels}</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-4 border border-slate-100">
                <p className="text-xs text-[#64748B] uppercase font-bold">Inverter</p>
                <p className="text-sm font-medium text-[#1E293B] mt-1">{quotationData.system.inverter}</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-4 border border-slate-100">
                <p className="text-xs text-[#64748B] uppercase font-bold">Mounting</p>
                <p className="text-sm font-medium text-[#1E293B] mt-1">{quotationData.system.mounting}</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <LuZap className="text-[#EA580C]" />
              Cost Breakdown
            </h3>
            <div className="bg-[#F8FAFC] rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-xs font-bold text-[#64748B] uppercase">Item</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-[#64748B] uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-[#1E293B]">Solar Panels (38 units)</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-medium">฿{quotationData.costs.panels.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-[#1E293B]">Inverter</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-medium">฿{quotationData.costs.inverter.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-[#1E293B]">Mounting System</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-medium">฿{quotationData.costs.mounting.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-[#1E293B]">Cables & Accessories</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-medium">฿{quotationData.costs.cables.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm text-[#1E293B]">Installation Labor</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-medium">฿{quotationData.costs.labor.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm text-[#1E293B]">Other Costs</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-medium">฿{quotationData.costs.other.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white">
                    <td className="px-4 py-3 text-sm font-medium text-[#1E293B]">Subtotal</td>
                    <td className="px-4 py-3 text-sm text-[#1E293B] text-right font-bold">฿{quotationData.costs.subtotal.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-green-50">
                    <td className="px-4 py-3 text-sm text-green-700">Discount (5%)</td>
                    <td className="px-4 py-3 text-sm text-green-700 text-right font-medium">-฿{quotationData.costs.discount.toLocaleString()}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-[#0F172A]">
                    <td className="px-4 py-4 text-white font-bold">Total</td>
                    <td className="px-4 py-4 text-white text-right text-xl font-bold">฿{quotationData.costs.total.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Savings & ROI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <LuCalendar className="text-green-600" />
                Estimated Savings
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly Savings</span>
                  <span className="font-bold text-green-800">฿{quotationData.savings.monthly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Yearly Savings</span>
                  <span className="font-bold text-green-800">฿{quotationData.savings.yearly.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-green-200">
                  <span className="text-green-700">Payback Period</span>
                  <span className="font-bold text-green-800">{quotationData.savings.payback}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">CO₂ Reduction</span>
                  <span className="font-bold text-green-800">{quotationData.savings.co2}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
                <LuShield className="text-[#EA580C]" />
                Warranty Coverage
              </h3>
              <div className="space-y-3">
                {quotationData.warranty.map((w, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <LuCircleCheck size={16} className="text-green-500" />
                    <span className="text-sm text-[#1E293B]">{w.item}: <strong>{w.period}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-[#64748B]">
              This quotation is valid for 30 days from the issue date.
            </p>
            <p className="text-xs text-[#64748B] mt-2">
              AT Energy & Engineering Co., Ltd. | Tel: 02-xxx-xxxx | Email: info@atenergy.co.th
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => router.push(`/customers/${params.id}`)}
          className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
        >
          Back to Customer
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md">
          Send to Customer
        </button>
      </div>
    </div>
  );
}

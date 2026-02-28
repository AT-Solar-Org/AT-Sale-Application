"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  LuArrowLeft,
  LuCalculator,
  LuSun,
  LuZap,
  LuBanknote,
  LuChevronDown,
} from "react-icons/lu";

const panelOptions = [
  { model: "JA Solar 550W", wattage: 550, price: 4500 },
  { model: "Longi 545W", wattage: 545, price: 4300 },
  { model: "Trina Solar 540W", wattage: 540, price: 4200 },
  { model: "Canadian Solar 535W", wattage: 535, price: 4100 },
];

const inverterOptions = [
  { model: "Huawei SUN2000-10KTL", kw: 10, price: 45000 },
  { model: "Huawei SUN2000-15KTL", kw: 15, price: 58000 },
  { model: "Huawei SUN2000-20KTL", kw: 20, price: 72000 },
  { model: "Growatt MIN 10000TL-X", kw: 10, price: 35000 },
  { model: "Growatt MIN 15000TL-X", kw: 15, price: 48000 },
];

export default function CalculationPage() {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    monthlyBill: "45000",
    roofArea: "250",
    selectedPanel: panelOptions[0].model,
    selectedInverter: inverterOptions[1].model,
    panelCount: "38",
    laborCost: "50000",
    otherCosts: "30000",
    discount: "5",
  });

  const selectedPanel = panelOptions.find(p => p.model === formData.selectedPanel) || panelOptions[0];
  const selectedInverter = inverterOptions.find(i => i.model === formData.selectedInverter) || inverterOptions[0];
  
  const systemSizeKwp = (parseInt(formData.panelCount) * selectedPanel.wattage) / 1000;
  const panelCost = parseInt(formData.panelCount) * selectedPanel.price;
  const inverterCost = selectedInverter.price;
  const subtotal = panelCost + inverterCost + parseInt(formData.laborCost) + parseInt(formData.otherCosts);
  const discountAmount = subtotal * (parseInt(formData.discount) / 100);
  const totalCost = subtotal - discountAmount;
  
  const monthlyGeneration = systemSizeKwp * 120; // kWh per kWp per month average
  const monthlySavings = monthlyGeneration * 4.5; // average electricity rate
  const paybackYears = totalCost / (monthlySavings * 12);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreview = () => {
    // Store calculation data and navigate to preview
    router.push(`/customers/${params.id}/calculation/preview`);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <LuArrowLeft size={20} className="text-[#64748B]" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">System Calculation</h1>
          <p className="text-[#64748B] text-sm">Calculate solar system specifications and costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Usage */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <LuBanknote className="text-[#EA580C]" />
              Customer Usage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Monthly Electric Bill (฿)</label>
                <input
                  type="number"
                  name="monthlyBill"
                  value={formData.monthlyBill}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Available Roof Area (m²)</label>
                <input
                  type="number"
                  name="roofArea"
                  value={formData.roofArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>

          {/* Equipment Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <LuSun className="text-[#EA580C]" />
              Equipment Selection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Solar Panel Model</label>
                <div className="relative">
                  <select
                    name="selectedPanel"
                    value={formData.selectedPanel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                  >
                    {panelOptions.map((panel) => (
                      <option key={panel.model} value={panel.model}>
                        {panel.model} - ฿{panel.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Number of Panels</label>
                <input
                  type="number"
                  name="panelCount"
                  value={formData.panelCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Inverter Model</label>
                <div className="relative">
                  <select
                    name="selectedInverter"
                    value={formData.selectedInverter}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                  >
                    {inverterOptions.map((inv) => (
                      <option key={inv.model} value={inv.model}>
                        {inv.model} ({inv.kw}kW) - ฿{inv.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Costs */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <LuCalculator className="text-[#EA580C]" />
              Additional Costs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Labor Cost (฿)</label>
                <input
                  type="number"
                  name="laborCost"
                  value={formData.laborCost}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Other Costs (฿)</label>
                <input
                  type="number"
                  name="otherCosts"
                  value={formData.otherCosts}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          {/* System Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">System Summary</h2>
            <div className="space-y-4">
              <div className="bg-linear-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                <p className="text-xs text-[#64748B] uppercase font-bold">System Size</p>
                <p className="text-3xl font-bold text-[#EA580C]">{systemSizeKwp.toFixed(2)} <span className="text-lg">kWp</span></p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8FAFC] rounded-lg p-3 border border-slate-100">
                  <p className="text-xs text-[#64748B]">Panels</p>
                  <p className="text-lg font-bold text-[#1E293B]">{formData.panelCount}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3 border border-slate-100">
                  <p className="text-xs text-[#64748B]">Est. Generation</p>
                  <p className="text-lg font-bold text-[#1E293B]">{monthlyGeneration.toFixed(0)} <span className="text-xs font-normal">kWh/mo</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">Cost Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Panels ({formData.panelCount}x)</span>
                <span className="font-medium text-[#1E293B]">฿{panelCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Inverter</span>
                <span className="font-medium text-[#1E293B]">฿{inverterCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Labor</span>
                <span className="font-medium text-[#1E293B]">฿{parseInt(formData.laborCost).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Other Costs</span>
                <span className="font-medium text-[#1E293B]">฿{parseInt(formData.otherCosts).toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between">
                <span className="text-[#64748B]">Subtotal</span>
                <span className="font-medium text-[#1E293B]">฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount ({formData.discount}%)</span>
                <span className="font-medium">-฿{discountAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-lg">
                <span className="font-bold text-[#1E293B]">Total</span>
                <span className="font-bold text-[#EA580C]">฿{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="bg-linear-to-br from-[#0F172A] to-slate-800 rounded-xl p-6 shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4">Return on Investment</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Monthly Savings</span>
                <span className="font-bold">฿{monthlySavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Yearly Savings</span>
                <span className="font-bold">฿{(monthlySavings * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-600">
                <span className="text-slate-300">Payback Period</span>
                <span className="font-bold text-[#EA580C]">{paybackYears.toFixed(1)} years</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={handlePreview}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-xl text-sm font-bold transition-all shadow-lg"
          >
            <LuZap size={18} />
            Generate Quotation
          </button>
        </div>
      </div>
    </div>
  );
}

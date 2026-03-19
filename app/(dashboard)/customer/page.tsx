"use client";

import { useState } from "react";
import {
  LuSearch, LuPlus, LuMapPin, LuUser,
  LuLayoutGrid, LuList, LuPhone, LuBadgeCheck,
  LuArrowLeft, LuZap, LuSave,
  LuChevronDown, LuBuilding2,
} from "react-icons/lu";

// ─── Status config ────────────────────────────────────────────────────────────
const statusConfig: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  Survey:       { bg: "bg-[#fefce8]", border: "border-[#fff085]", dot: "bg-[#f0b100]", text: "text-[#a65f00]" },
  Installation: { bg: "bg-[#f1f5f9]", border: "border-[#e2e8f0]", dot: "bg-[#62748e]", text: "text-[#314158]" },
  Approved:     { bg: "bg-[#f0fdf4]", border: "border-[#baf9d0]", dot: "bg-[#00c950]", text: "text-[#008236]" },
  Quotation:    { bg: "bg-[#faf5ff]", border: "border-[#e9d4ff]", dot: "bg-[#ad46ff]", text: "text-[#8200db]" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { bg: "bg-slate-100", border: "border-slate-200", dot: "bg-slate-400", text: "text-slate-600" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Customer = {
  id: number; workno: string; sitename: string; customername: string;
  email: string; tel: string; companyname: string; juristicid: string;
  taxpayerno: string; businesstype: string; date: string; address: string;
  latitude: string; longitude: string; buildingtype: string; buildingfloor: string;
  rooftype: string; roofage: string; roofslope: string; roofdirection: string;
  roofarea: string; shadow: string; groundwire: boolean; internetservice: string;
  authority: string; auserno: string; avgbill: string; avgaunit: string;
  highusetime: string; past_abill: string; created_at: string; sale: string; status: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const avatarColors = [
  "from-orange-500 to-orange-700", "from-sky-500 to-sky-700",
  "from-violet-500 to-violet-700", "from-emerald-500 to-emerald-700",
  "from-rose-500 to-rose-700",     "from-amber-500 to-amber-700",
  "from-teal-500 to-teal-700",     "from-cyan-500 to-cyan-700",
  "from-pink-500 to-pink-700",
];
const statusOptions  = ["Survey", "Quotation", "Approved", "Installation"];
const saleOptions    = ["Baitoey", "Bank", "Junjao"];
const businessTypes  = ["Residential", "Factory", "Restaurant", "Commercial", "Hotel", "Office"];
const roofTypes      = ["Metal Sheet", "Galvanised Steel", "Concrete", "Clay Tile", "CPAC", "Other"];
const buildingTypes  = ["Single House", "Townhouse", "Factory", "Commercial", "Hotel", "Office"];
const authorities    = ["MEA", "PEA"];

const BASE_SELECT = "w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100 transition-all text-slate-800 appearance-none";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const initialCustomers: Customer[] = [
  { id: 1, workno: "AT-2026-001", sitename: "Phawat Residence", customername: "Phawat Srivichai (Film)", email: "phawat@example.com", tel: "081-234-5678", companyname: "—", juristicid: "—", taxpayerno: "1-1007-00123-45-6", businesstype: "Residential", date: "24 Jan 2026", address: "123 Moo 4, Bang Khun Thian, Bangkok 10150", latitude: "13.6522", longitude: "100.4342", buildingtype: "Single House", buildingfloor: "2", rooftype: "Metal Sheet", roofage: "5", roofslope: "15", roofdirection: "South", roofarea: "80", shadow: "Low", groundwire: true, internetservice: "AIS Fibre", authority: "MEA", auserno: "MEA-001234", avgbill: "3500", avgaunit: "450", highusetime: "10:00–14:00", past_abill: "Dec 2025", created_at: "24 Jan 2026", sale: "Baitoey", status: "Survey" },
  { id: 2, workno: "AT-2026-002", sitename: "F&B Factory Chonburi", customername: "Food and Beverage", email: "fnb@factory.co.th", tel: "089-876-5432", companyname: "Food and Beverage Co., Ltd.", juristicid: "0-1055-60123-45-6", taxpayerno: "0-1055-60123-45-6", businesstype: "Factory", date: "24 Jan 2026", address: "456 Industrial Estate, Chonburi 20000", latitude: "13.3611", longitude: "100.9847", buildingtype: "Factory", buildingfloor: "1", rooftype: "Galvanised Steel", roofage: "8", roofslope: "10", roofdirection: "South-West", roofarea: "600", shadow: "None", groundwire: true, internetservice: "True Business", authority: "PEA", auserno: "PEA-009876", avgbill: "85000", avgaunit: "12000", highusetime: "08:00–17:00", past_abill: "Dec 2025", created_at: "24 Jan 2026", sale: "Baitoey", status: "Installation" },
  { id: 3, workno: "AT-2026-003", sitename: "Chocolate Factory Rayong", customername: "Chocolate Factory", email: "ops@chocfactory.th", tel: "062-345-6789", companyname: "Choc Factory Thailand Co., Ltd.", juristicid: "0-2155-45678-90-1", taxpayerno: "0-2155-45678-90-1", businesstype: "Factory", date: "24 Jan 2026", address: "789 Rayong Industrial Park, Rayong 21000", latitude: "12.6814", longitude: "101.2816", buildingtype: "Factory", buildingfloor: "1", rooftype: "Concrete", roofage: "12", roofslope: "5", roofdirection: "South", roofarea: "1200", shadow: "Low", groundwire: true, internetservice: "NT Business", authority: "PEA", auserno: "PEA-112233", avgbill: "150000", avgaunit: "22000", highusetime: "07:00–18:00", past_abill: "Dec 2025", created_at: "24 Jan 2026", sale: "Bank", status: "Approved" },
  { id: 4, workno: "AT-2026-004", sitename: "Korapin Residence", customername: "Korapin", email: "korapin@gmail.com", tel: "091-567-8901", companyname: "—", juristicid: "—", taxpayerno: "1-1007-09900-45-6", businesstype: "Residential", date: "24 Jan 2026", address: "22 Bang Khun Thian Soi 5, Bangkok 10150", latitude: "13.6418", longitude: "100.4512", buildingtype: "Townhouse", buildingfloor: "3", rooftype: "Clay Tile", roofage: "3", roofslope: "25", roofdirection: "South-East", roofarea: "45", shadow: "Medium", groundwire: false, internetservice: "DTAC Home", authority: "MEA", auserno: "MEA-034567", avgbill: "2800", avgaunit: "360", highusetime: "11:00–15:00", past_abill: "Dec 2025", created_at: "24 Jan 2026", sale: "Junjao", status: "Approved" },
  { id: 5, workno: "AT-2026-005", sitename: "Yak Kin Salmon Restaurant", customername: "Yak Kin Salmon", email: "info@yakkin.com", tel: "083-901-2345", companyname: "Yak Kin Salmon Co., Ltd.", juristicid: "0-1055-65501-00-2", taxpayerno: "0-1055-65501-00-2", businesstype: "Restaurant", date: "24 Jan 2026", address: "5/10 Thung Kru, Bangkok 10140", latitude: "13.6901", longitude: "100.4985", buildingtype: "Commercial", buildingfloor: "2", rooftype: "Metal Sheet", roofage: "2", roofslope: "12", roofdirection: "South", roofarea: "150", shadow: "Low", groundwire: true, internetservice: "AIS Fibre", authority: "MEA", auserno: "MEA-056789", avgbill: "18000", avgaunit: "2400", highusetime: "10:00–22:00", past_abill: "Dec 2025", created_at: "24 Jan 2026", sale: "Bank", status: "Quotation" },
  { id: 6, workno: "AT-2026-006", sitename: "Jojo Banana Shop", customername: "Jojo Banana (Apple)", email: "jojo@banana.co.th", tel: "095-678-1234", companyname: "—", juristicid: "—", taxpayerno: "1-1007-05560-12-3", businesstype: "Residential", date: "24 Jan 2026", address: "88 Bang Khun Thian, Bangkok 10150", latitude: "13.6530", longitude: "100.4370", buildingtype: "Single House", buildingfloor: "1", rooftype: "Metal Sheet", roofage: "1", roofslope: "18", roofdirection: "South-West", roofarea: "60", shadow: "None", groundwire: false, internetservice: "TRUE Move H", authority: "MEA", auserno: "MEA-078901", avgbill: "1900", avgaunit: "240", highusetime: "09:00–13:00", past_abill: "Dec 2025", created_at: "24 Jan 2026", sale: "Junjao", status: "Survey" },
];

type View = "list" | "detail" | "add";

// ─── Module-level helper components (must NOT be inside other components) ─────

function FieldGroup({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <LuChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  );
}

function FormSection({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="pt-6 first:pt-0">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Icon size={15} className="text-orange-600" />
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function DetailSection({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} className="text-orange-600" />
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | boolean }) {
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : (value || "—");
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5">{display}</p>
    </div>
  );
}

// ─── Back Header (shared by Detail and Add) ───────────────────────────────────
function BackHeader({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <button
        onClick={onBack}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-orange-600 hover:border-orange-200 transition-all shadow-sm shrink-0"
      >
        <LuArrowLeft size={18} />
      </button>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Customers</p>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{label}</h1>
      </div>
    </div>
  );
}

// ─── Detail View ──────────────────────────────────────────────────────────────
function CustomerDetail({ customer, onBack }: { customer: Customer; onBack: () => void }) {
  const grad = avatarColors[(customer.id - 1) % avatarColors.length];
  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <BackHeader label="Customer Detail" onBack={onBack} />

      {/* Profile strip */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-slate-200">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-black text-2xl shadow-lg shrink-0`}>
          {customer.customername[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-black text-slate-900">{customer.customername}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{customer.sitename} · {customer.workno}</p>
        </div>
        <StatusBadge status={customer.status} />
      </div>

      <div className="space-y-8">
        <DetailSection title="Contact Information" icon={LuUser}>
          <InfoRow label="Email"          value={customer.email} />
          <InfoRow label="Phone"          value={customer.tel} />
          <InfoRow label="Company"        value={customer.companyname} />
          <InfoRow label="Business Type"  value={customer.businesstype} />
          <InfoRow label="Juristic ID"    value={customer.juristicid} />
          <InfoRow label="Tax Payer No."  value={customer.taxpayerno} />
        </DetailSection>

        <div className="border-t border-slate-100" />

        <DetailSection title="Site Information" icon={LuMapPin}>
          <div className="sm:col-span-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{customer.address}</p>
          </div>
          <InfoRow label="Latitude"  value={customer.latitude} />
          <InfoRow label="Longitude" value={customer.longitude} />
          <InfoRow label="Date"      value={customer.date} />
          <InfoRow label="Sale"      value={customer.sale} />
        </DetailSection>

        <div className="border-t border-slate-100" />

        <DetailSection title="Building & Roof" icon={LuBuilding2}>
          <InfoRow label="Building Type"   value={customer.buildingtype} />
          <InfoRow label="Building Floors" value={customer.buildingfloor} />
          <InfoRow label="Roof Type"       value={customer.rooftype} />
          <InfoRow label="Roof Age (yrs)"  value={customer.roofage} />
          <InfoRow label="Roof Slope (°)"  value={customer.roofslope} />
          <InfoRow label="Roof Direction"  value={customer.roofdirection} />
          <InfoRow label="Roof Area (m²)"  value={customer.roofarea} />
          <InfoRow label="Shadow"          value={customer.shadow} />
          <InfoRow label="Ground Wire"     value={customer.groundwire} />
        </DetailSection>

        <div className="border-t border-slate-100" />

        <DetailSection title="Electrical & Utility" icon={LuZap}>
          <InfoRow label="Authority"           value={customer.authority} />
          <InfoRow label="Authority User No."  value={customer.auserno} />
          <InfoRow label="Internet Service"    value={customer.internetservice} />
          <InfoRow label="Avg. Bill (฿)"       value={customer.avgbill} />
          <InfoRow label="Avg. Units (kWh)"    value={customer.avgaunit} />
          <InfoRow label="High-use Time"       value={customer.highusetime} />
          <InfoRow label="Past Bill Date"      value={customer.past_abill} />
        </DetailSection>
      </div>
    </div>
  );
}

// ─── Add Customer View ────────────────────────────────────────────────────────
function AddCustomer({ onBack, onSave }: { onBack: () => void; onSave: (c: Customer) => void }) {
  const emptyForm = {
    workno: "", sitename: "", customername: "", email: "", tel: "",
    companyname: "", juristicid: "", taxpayerno: "",
    businesstype: businessTypes[0], address: "", latitude: "", longitude: "",
    buildingtype: buildingTypes[0], buildingfloor: "", rooftype: roofTypes[0],
    roofage: "", roofslope: "", roofdirection: "", roofarea: "", shadow: "",
    groundwire: false, internetservice: "", authority: authorities[0],
    auserno: "", avgbill: "", avgaunit: "", highusetime: "", past_abill: "",
    sale: saleOptions[0], status: statusOptions[0],
  };

  const [form, setForm]     = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100 transition-all text-slate-800 placeholder:text-slate-400 ${errors[field] ? "border-red-400" : "border-slate-200"}`;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((p) => ({ ...p, [name]: val }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.customername.trim()) e.customername = "Required";
    if (!form.tel.trim())          e.tel          = "Required";
    if (!form.address.trim())      e.address      = "Required";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    const now = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    onSave({ ...form, id: Date.now(), date: now, created_at: now } as Customer);
  }

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <BackHeader label="Add Customer" onBack={onBack} />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-0">

        <FormSection title="Basic Information" icon={LuUser}>
          <FieldGroup label="Customer Name" required>
            <input name="customername" value={form.customername} onChange={handleChange} placeholder="Full name or business name" className={inputCls("customername")} />
            {errors.customername && <p className="text-xs text-red-500 mt-1">{errors.customername}</p>}
          </FieldGroup>
          <FieldGroup label="Site Name">
            <input name="sitename" value={form.sitename} onChange={handleChange} placeholder="Site / project name" className={inputCls("sitename")} />
          </FieldGroup>
          <FieldGroup label="Work No.">
            <input name="workno" value={form.workno} onChange={handleChange} placeholder="e.g. AT-2026-007" className={inputCls("workno")} />
          </FieldGroup>
          <FieldGroup label="Email">
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className={inputCls("email")} />
          </FieldGroup>
          <FieldGroup label="Phone" required>
            <input name="tel" value={form.tel} onChange={handleChange} placeholder="e.g. 081-234-5678" className={inputCls("tel")} />
            {errors.tel && <p className="text-xs text-red-500 mt-1">{errors.tel}</p>}
          </FieldGroup>
          <FieldGroup label="Business Type">
            <SelectWrap>
              <select name="businesstype" value={form.businesstype} onChange={handleChange} className={BASE_SELECT}>
                {businessTypes.map((b) => <option key={b}>{b}</option>)}
              </select>
            </SelectWrap>
          </FieldGroup>
          <FieldGroup label="Company Name">
            <input name="companyname" value={form.companyname} onChange={handleChange} placeholder="Legal company name" className={inputCls("companyname")} />
          </FieldGroup>
          <FieldGroup label="Juristic ID">
            <input name="juristicid" value={form.juristicid} onChange={handleChange} placeholder="13-digit juristic ID" className={inputCls("juristicid")} />
          </FieldGroup>
          <FieldGroup label="Tax Payer No.">
            <input name="taxpayerno" value={form.taxpayerno} onChange={handleChange} placeholder="Tax payer number" className={inputCls("taxpayerno")} />
          </FieldGroup>
          <FieldGroup label="Sale">
            <SelectWrap>
              <select name="sale" value={form.sale} onChange={handleChange} className={BASE_SELECT}>
                {saleOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </SelectWrap>
          </FieldGroup>
          <FieldGroup label="Status">
            <SelectWrap>
              <select name="status" value={form.status} onChange={handleChange} className={BASE_SELECT}>
                {statusOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </SelectWrap>
          </FieldGroup>
        </FormSection>

        <FormSection title="Site Location" icon={LuMapPin}>
          <div className="sm:col-span-2">
            <FieldGroup label="Address" required>
              <textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="Full address" className={`${inputCls("address")} resize-none`} />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </FieldGroup>
          </div>
          <FieldGroup label="Latitude">
            <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="e.g. 13.6522" className={inputCls("latitude")} />
          </FieldGroup>
          <FieldGroup label="Longitude">
            <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="e.g. 100.4342" className={inputCls("longitude")} />
          </FieldGroup>
        </FormSection>

        <FormSection title="Building & Roof" icon={LuBuilding2}>
          <FieldGroup label="Building Type">
            <SelectWrap>
              <select name="buildingtype" value={form.buildingtype} onChange={handleChange} className={BASE_SELECT}>
                {buildingTypes.map((b) => <option key={b}>{b}</option>)}
              </select>
            </SelectWrap>
          </FieldGroup>
          <FieldGroup label="Building Floors">
            <input name="buildingfloor" value={form.buildingfloor} onChange={handleChange} placeholder="e.g. 2" className={inputCls("buildingfloor")} />
          </FieldGroup>
          <FieldGroup label="Roof Type">
            <SelectWrap>
              <select name="rooftype" value={form.rooftype} onChange={handleChange} className={BASE_SELECT}>
                {roofTypes.map((r) => <option key={r}>{r}</option>)}
              </select>
            </SelectWrap>
          </FieldGroup>
          <FieldGroup label="Roof Age (yrs)">
            <input name="roofage" value={form.roofage} onChange={handleChange} placeholder="e.g. 5" className={inputCls("roofage")} />
          </FieldGroup>
          <FieldGroup label="Roof Slope (°)">
            <input name="roofslope" value={form.roofslope} onChange={handleChange} placeholder="e.g. 15" className={inputCls("roofslope")} />
          </FieldGroup>
          <FieldGroup label="Roof Direction">
            <input name="roofdirection" value={form.roofdirection} onChange={handleChange} placeholder="e.g. South" className={inputCls("roofdirection")} />
          </FieldGroup>
          <FieldGroup label="Roof Area (m²)">
            <input name="roofarea" value={form.roofarea} onChange={handleChange} placeholder="e.g. 80" className={inputCls("roofarea")} />
          </FieldGroup>
          <FieldGroup label="Shadow">
            <input name="shadow" value={form.shadow} onChange={handleChange} placeholder="None / Low / Medium / High" className={inputCls("shadow")} />
          </FieldGroup>
          <FieldGroup label="Ground Wire">
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input type="checkbox" name="groundwire" checked={!!form.groundwire} onChange={handleChange} className="w-4 h-4 accent-orange-600 rounded" />
              <span className="text-sm text-slate-700 font-medium">Has ground wire</span>
            </label>
          </FieldGroup>
        </FormSection>

        <FormSection title="Electrical & Utility" icon={LuZap}>
          <FieldGroup label="Authority">
            <SelectWrap>
              <select name="authority" value={form.authority} onChange={handleChange} className={BASE_SELECT}>
                {authorities.map((a) => <option key={a}>{a}</option>)}
              </select>
            </SelectWrap>
          </FieldGroup>
          <FieldGroup label="Authority User No.">
            <input name="auserno" value={form.auserno} onChange={handleChange} placeholder="e.g. MEA-001234" className={inputCls("auserno")} />
          </FieldGroup>
          <FieldGroup label="Internet Service">
            <input name="internetservice" value={form.internetservice} onChange={handleChange} placeholder="e.g. AIS Fibre" className={inputCls("internetservice")} />
          </FieldGroup>
          <FieldGroup label="Avg. Bill (฿)">
            <input name="avgbill" value={form.avgbill} onChange={handleChange} placeholder="e.g. 3500" className={inputCls("avgbill")} />
          </FieldGroup>
          <FieldGroup label="Avg. Units (kWh)">
            <input name="avgaunit" value={form.avgaunit} onChange={handleChange} placeholder="e.g. 450" className={inputCls("avgaunit")} />
          </FieldGroup>
          <FieldGroup label="High-use Time">
            <input name="highusetime" value={form.highusetime} onChange={handleChange} placeholder="e.g. 10:00–14:00" className={inputCls("highusetime")} />
          </FieldGroup>
          <FieldGroup label="Past Bill Date">
            <input name="past_abill" value={form.past_abill} onChange={handleChange} placeholder="e.g. Dec 2025" className={inputCls("past_abill")} />
          </FieldGroup>
        </FormSection>

        <div className="flex gap-3 pt-8">
          <button type="button" onClick={onBack} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition-colors shadow-md shadow-orange-200">
            <LuSave size={16} /> Save Customer
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Customer List ────────────────────────────────────────────────────────────
function CustomerList({ customers, onSelect, onAdd }: { customers: Customer[]; onSelect: (c: Customer) => void; onAdd: () => void }) {
  const [search, setSearch]     = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const s = (v?: string) => (v ?? "").toLowerCase();
  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return s(c.customername).includes(q) || s(c.sitename).includes(q) ||
           s(c.address).includes(q) || s(c.sale).includes(q) ||
           s(c.status).includes(q)  || s(c.workno).includes(q);
  });

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track all customer installation projects</p>
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-orange-200 self-start shrink-0">
          <LuPlus size={17} /> Add Customer
        </button>
      </div>

      {/* Search + toggle */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 flex gap-3 items-center">
        <div className="relative flex-1">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, work no., location, or status..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100 transition-all text-slate-800 placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center bg-slate-100 rounded-lg p-1 shrink-0">
          {(["card", "list"] as const).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={`w-9 h-8 flex items-center justify-center rounded-md transition-all duration-150 ${viewMode === mode ? "bg-white text-orange-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-900"}`}
            >
              {mode === "card" ? <LuLayoutGrid size={16} /> : <LuList size={16} />}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 font-semibold mb-4">
        Showing <span className="text-slate-800">{filtered.length}</span> of <span className="text-slate-800">{customers.length}</span> customers
      </p>

      {/* Card View */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <LuUser size={36} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-500 font-semibold text-sm">No customers found</p>
            </div>
          ) : filtered.map((c) => (
            <div key={c.id} onClick={() => onSelect(c)}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer group hover:border-orange-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[(c.id - 1) % avatarColors.length]} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0`}>
                  {c.customername[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors truncate">{c.customername}</h3>
                  <p className="text-xs text-slate-500 truncate">{c.sitename}</p>
                  <p className="text-xs text-slate-400 font-mono">{c.workno}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                <LuMapPin size={12} className="shrink-0" /><span className="truncate">{c.address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                <LuPhone size={12} className="shrink-0" />{c.tel}
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <StatusBadge status={c.status} />
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <LuBadgeCheck size={11} className="text-orange-600" />{c.sale}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="hidden md:flex items-center px-6 py-3.5 border-b border-slate-200 bg-slate-50 gap-4">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest w-[200px] shrink-0">Customer</p>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest w-[110px] shrink-0">Work No.</p>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex-1">Address</p>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest w-[90px] shrink-0">Sale</p>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest w-[120px] shrink-0">Status</p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <LuUser size={36} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-500 font-semibold text-sm">No customers found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <div key={c.id} onClick={() => onSelect(c)} className="cursor-pointer group hover:bg-slate-50 transition-colors">
                  {/* Mobile */}
                  <div className="md:hidden flex items-center gap-3 px-4 py-3.5">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[(c.id - 1) % avatarColors.length]} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                      {c.customername[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-800 truncate group-hover:text-orange-600 transition-colors">{c.customername}</p>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{c.tel} · {c.sale}</p>
                    </div>
                  </div>
                  {/* Desktop */}
                  <div className="hidden md:flex items-center gap-4 px-6 py-4">
                    <div className="flex items-center gap-3 w-[200px] shrink-0">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[(c.id - 1) % avatarColors.length]} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                        {c.customername[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate group-hover:text-orange-600 transition-colors">{c.customername}</p>
                        <p className="text-xs text-slate-400 truncate">{c.sitename}</p>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-slate-500 w-[110px] shrink-0">{c.workno}</p>
                    <p className="text-sm text-slate-500 flex-1 truncate">{c.address}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-800 w-[90px] shrink-0">
                      <LuBadgeCheck size={13} className="text-orange-600 shrink-0" />{c.sale}
                    </div>
                    <div className="w-[120px] shrink-0"><StatusBadge status={c.status} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500 font-semibold">
              Showing <span className="text-slate-800">{filtered.length}</span> of <span className="text-slate-800">{customers.length}</span> customers
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [view, setView]           = useState<View>("list");
  const [selected, setSelected]   = useState<Customer | null>(null);

  if (view === "detail" && selected)
    return <CustomerDetail customer={selected} onBack={() => { setSelected(null); setView("list"); }} />;
  if (view === "add")
    return <AddCustomer onBack={() => setView("list")} onSave={(c) => { setCustomers((p) => [...p, c]); setView("list"); }} />;
  return (
    <CustomerList
      customers={customers}
      onSelect={(c) => { setSelected(c); setView("detail"); }}
      onAdd={() => setView("add")}
    />
  );
}
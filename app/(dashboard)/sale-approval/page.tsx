"use client";

import { useState, useEffect } from "react";
import {
  LuSearch,
  LuEye,
  LuCircleCheck,
  LuCircleX,
  LuClock,
  LuCalendar,
  LuX,
  LuUser,
  LuMail,
  LuPhone,
  LuCreditCard,
  LuLandmark,
  LuChevronDown,
  LuCircleAlert,
  LuPencil,
  LuFileText,
  LuShieldCheck,
  LuMaximize2,
} from "react-icons/lu";

// ─── Types ────────────────────────────────────────────────────────────────────
type StatusType = "Pending" | "Approved" | "Rejected";

interface SaleRequest {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  nationalId: string;
  bankAccount: string;
  idCardData: string;
  idCardName: string;
  idCardType: string;
  requestDate: string;
  status: StatusType;
  note?: string;
}

// ─── Mock fallback ────────────────────────────────────────────────────────────
const MOCK_REQUESTS: SaleRequest[] = [
  { id: "req_1", email: "somchai.j@example.com",       name: "Somchai",  surname: "Jaideejam", phone: "0812345678", nationalId: "1100700123456", bankAccount: "1234567890", idCardData: "", idCardName: "id_somchai.jpg",  idCardType: "image/jpeg",      requestDate: "28 Feb 2026", status: "Pending" },
  { id: "req_2", email: "natcha.s@greenpower.co.th",   name: "Natcha",   surname: "Srisawat",  phone: "0898765432", nationalId: "3670100234567", bankAccount: "0987654321", idCardData: "", idCardName: "id_natcha.jpg",   idCardType: "image/jpeg",      requestDate: "27 Feb 2026", status: "Pending" },
  { id: "req_3", email: "piyapong.r@suntech.com",      name: "Piyapong", surname: "Rattana",   phone: "0623456789", nationalId: "2410200345678", bankAccount: "1122334455", idCardData: "", idCardName: "id_piyapong.pdf", idCardType: "application/pdf", requestDate: "26 Feb 2026", status: "Pending" },
  { id: "req_4", email: "kanokwan.t@energyplus.co.th", name: "Kanokwan", surname: "Thongsuk",  phone: "0915678901", nationalId: "1009900456789", bankAccount: "5566778899", idCardData: "", idCardName: "id_kanokwan.jpg", idCardType: "image/jpeg",      requestDate: "25 Feb 2026", status: "Pending" },
  { id: "req_5", email: "wichai.p@solarworld.com",     name: "Wichai",   surname: "Prasert",   phone: "0839012345", nationalId: "5560100567890", bankAccount: "9988776655", idCardData: "", idCardName: "id_wichai.jpg",   idCardType: "image/jpeg",      requestDate: "24 Feb 2026", status: "Pending" },
  { id: "req_6", email: "arisa.m@bkkenergy.com",       name: "Arisa",    surname: "Montri",    phone: "0956781234", nationalId: "1100100678901", bankAccount: "1357924680", idCardData: "", idCardName: "id_arisa.jpg",    idCardType: "image/jpeg",      requestDate: "20 Feb 2026", status: "Approved", note: "Documents verified" },
  { id: "req_7", email: "thanawat.b@pvthai.com",       name: "Thanawat", surname: "Boonsri",   phone: "0864321098", nationalId: "3100200789012", bankAccount: "2468013579", idCardData: "", idCardName: "id_thanawat.pdf", idCardType: "application/pdf", requestDate: "18 Feb 2026", status: "Rejected", note: "Incomplete documentation" },
];

// ─── Sort: Pending → Rejected → Approved, ascending date within each group ───
const STATUS_ORDER: Record<StatusType, number> = { Pending: 0, Rejected: 1, Approved: 2 };

function parseDate(str: string): number {
  // Handles "28 Feb 2026" or similar
  const d = new Date(str);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

function sortRequests(list: SaleRequest[]): SaleRequest[] {
  return [...list].sort((a, b) => {
    const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (statusDiff !== 0) return statusDiff;
    return parseDate(a.requestDate) - parseDate(b.requestDate); // ascending date
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusConfig: Record<StatusType, { badge: string; dot: string }> = {
  Pending:  { badge: "bg-yellow-50 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  Approved: { badge: "bg-green-50 text-green-700 border-green-200",   dot: "bg-green-500"  },
  Rejected: { badge: "bg-red-50 text-red-700 border-red-200",         dot: "bg-red-500"    },
};

const avatarColors = [
  "from-orange-500 to-orange-700", "from-sky-500 to-sky-700",
  "from-violet-500 to-violet-700", "from-emerald-500 to-emerald-700",
  "from-rose-500 to-rose-700",     "from-amber-500 to-amber-700",
  "from-teal-500 to-teal-700",
];

function getInitials(name: string, surname: string) {
  return `${name[0] ?? ""}${surname[0] ?? ""}`.toUpperCase();
}
function getColor(id: string) {
  const idx = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return avatarColors[idx % avatarColors.length];
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────
const filterOptions: { value: StatusType | "All"; label: string; dot?: string }[] = [
  { value: "All",      label: "All Status" },
  { value: "Pending",  label: "Pending",  dot: "bg-yellow-500" },
  { value: "Approved", label: "Approved", dot: "bg-green-500"  },
  { value: "Rejected", label: "Rejected", dot: "bg-red-500"    },
];

function FilterDropdown({ value, onChange }: { value: StatusType | "All"; onChange: (v: StatusType | "All") => void }) {
  const [open, setOpen] = useState(false);
  const current = filterOptions.find((o) => o.value === value)!;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all min-w-[145px] justify-between ${
          open ? "border-[#EA580C] ring-2 ring-orange-100 bg-white text-slate-800" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
        }`}
      >
        <div className="flex items-center gap-2">
          {current.dot && <span className={`w-2 h-2 rounded-full ${current.dot} shrink-0`} />}
          {current.label}
        </div>
        <LuChevronDown size={15} className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden w-44 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-1.5 space-y-0.5">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                    value === opt.value ? "bg-orange-50 text-[#EA580C]" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.dot
                    ? <span className={`w-2 h-2 rounded-full ${opt.dot} shrink-0`} />
                    : <span className="w-2 h-2 rounded-full border border-slate-300 shrink-0" />}
                  {opt.label}
                  {value === opt.value && <LuCircleCheck size={14} className="ml-auto text-[#EA580C]" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <LuX size={20} />
      </button>
      {/* plain img so base64 data URLs render at natural size without next/image domain restrictions */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="ID Card Full Size"
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
      />
    </div>
  );
}

// ─── ID Card Preview ──────────────────────────────────────────────────────────
function IdCardPreview({ data, name, type }: { data: string; name: string; type: string }) {
  const [lightbox, setLightbox] = useState(false);

  if (!data) {
    return (
      <div className="w-full h-28 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
        <p className="text-xs text-slate-400">No file (mock data)</p>
      </div>
    );
  }

  if (type.startsWith("image/")) {
    return (
      <>
        {lightbox && <Lightbox src={data} onClose={() => setLightbox(false)} />}
        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200 group cursor-pointer" onClick={() => setLightbox(true)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data} alt="ID Card" className="w-full h-full object-cover" />
          {/* Expand overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-all duration-200">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <LuMaximize2 size={13} />
              View Full Size
            </span>
          </div>
        </div>
      </>
    );
  }

  // PDF
  return (
    <a
      href={data}
      download={name}
      className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors group"
    >
      <LuFileText size={22} className="text-[#EA580C] shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{name}</p>
        <p className="text-xs text-slate-400 group-hover:text-[#EA580C] transition-colors">Click to download PDF</p>
      </div>
    </a>
  );
}

// ─── Confirmation Modal ───────────────────────────────────────────────────────
function ConfirmModal({ request, action, onConfirm, onCancel }: {
  request: SaleRequest;
  action: "Approve" | "Reject";
  onConfirm: (note: string) => void;
  onCancel: () => void;
}) {
  const [note, setNote] = useState(action === "Reject" ? "Rejected by admin" : "");
  const isApprove = action === "Approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 pb-4 flex flex-col items-center text-center border-b border-slate-100">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${isApprove ? "bg-green-50" : "bg-red-50"}`}>
            {isApprove ? <LuCircleCheck size={28} className="text-green-600" /> : <LuCircleAlert size={28} className="text-red-500" />}
          </div>
          <h3 className="text-lg font-black text-slate-900">{isApprove ? "Approve Account?" : "Reject Account?"}</h3>
          <p className="text-sm text-slate-500 mt-1">{isApprove ? "This will grant access to the system." : "This will deny access to the system."}</p>
        </div>

        <div className="px-6 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getColor(request.id)} flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0`}>
              {getInitials(request.name, request.surname)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{request.name} {request.surname}</p>
              <p className="text-xs text-slate-400 truncate">{request.email}</p>
            </div>
          </div>
        </div>

        <div className="px-6 pt-4 pb-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {isApprove ? "Note (optional)" : "Reason"}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder={isApprove ? "Add a note..." : "Reason for rejection..."}
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 transition-all resize-none text-slate-700 placeholder:text-slate-300"
          />
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button
            onClick={() => onConfirm(note)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold transition-colors shadow-md ${
              isApprove ? "bg-[#EA580C] hover:bg-[#c2410c] shadow-orange-200" : "bg-red-500 hover:bg-red-600 shadow-red-200"
            }`}
          >
            {isApprove ? <LuCircleCheck size={16} /> : <LuCircleX size={16} />}
            {isApprove ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Detail / Edit Modal ──────────────────────────────────────────────────────
function DetailModal({ request, onClose, onAction }: {
  request: SaleRequest;
  onClose: () => void;
  onAction: (action: "Approve" | "Reject") => void;
}) {
  const cfg = statusConfig[request.status];
  const isPending = request.status === "Pending";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors z-10">
          <LuX size={18} />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getColor(request.id)} flex items-center justify-center text-white font-black text-lg shadow-lg shrink-0`}>
              {getInitials(request.name, request.surname)}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{request.name} {request.surname}</h2>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.badge} mt-1`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {request.status}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 space-y-3.5">
          {[
            { icon: LuMail,       label: "Email",        value: request.email },
            { icon: LuPhone,      label: "Phone",        value: request.phone },
            { icon: LuCreditCard, label: "National ID",  value: request.nationalId },
            { icon: LuLandmark,   label: "Bank Account", value: request.bankAccount },
            { icon: LuCalendar,   label: "Requested",    value: request.requestDate },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <Icon size={15} className="text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-sm font-semibold text-slate-800 truncate">{value}</p>
              </div>
            </div>
          ))}

          {/* ID Card */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">ID Card</p>
            <IdCardPreview data={request.idCardData} name={request.idCardName} type={request.idCardType} />
          </div>

          {/* Note */}
          {request.note && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${request.status === "Approved" ? "bg-green-50" : "bg-red-50"}`}>
                {request.status === "Approved"
                  ? <LuShieldCheck size={15} className="text-green-500" />
                  : <LuCircleX size={15} className="text-red-400" />}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {request.status === "Approved" ? "Approval Note" : "Rejection Note"}
                </p>
                <p className={`text-sm font-medium ${request.status === "Approved" ? "text-green-700" : "text-red-600"}`}>
                  {request.note}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          {isPending ? (
            <>
              <button onClick={() => { onAction("Reject"); onClose(); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors">
                <LuCircleX size={16} /> Reject
              </button>
              <button onClick={() => { onAction("Approve"); onClose(); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-sm font-bold transition-colors shadow-md shadow-orange-200">
                <LuCircleCheck size={16} /> Approve
              </button>
            </>
          ) : (
            <div className="w-full">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-3">Change Decision</p>
              <div className="flex gap-3">
                {request.status !== "Rejected" && (
                  <button onClick={() => { onAction("Reject"); onClose(); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors">
                    <LuCircleX size={16} /> Reject
                  </button>
                )}
                {request.status !== "Approved" && (
                  <button onClick={() => { onAction("Approve"); onClose(); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-sm font-bold transition-colors shadow-md shadow-orange-200">
                    <LuCircleCheck size={16} /> Approve
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SaleApprovalPage() {
  const [requests, setRequests]           = useState<SaleRequest[]>([]);
  const [search, setSearch]               = useState("");
  const [filterStatus, setFilterStatus]   = useState<StatusType | "All">("All");
  const [viewRequest, setViewRequest]     = useState<SaleRequest | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<{ request: SaleRequest; action: "Approve" | "Reject" } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("saleApprovalRequests");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setRequests(parsed.length > 0 ? parsed : MOCK_REQUESTS);
      } catch {
        setRequests(MOCK_REQUESTS);
      }
    } else {
      setRequests(MOCK_REQUESTS);
    }
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem("saleApprovalRequests", JSON.stringify(requests));
    }
  }, [requests]);

  const requestAction = (request: SaleRequest, action: "Approve" | "Reject") => {
    setViewRequest(null);
    setConfirmTarget({ request, action });
  };

  const handleConfirm = (note: string) => {
    if (!confirmTarget) return;
    const { request, action } = confirmTarget;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === request.id
          ? { ...r, status: action === "Approve" ? "Approved" : "Rejected", note: note || undefined }
          : r
      )
    );
    setConfirmTarget(null);
  };

  // Filter then sort
  const filtered = sortRequests(
    requests.filter((r) => {
      const q = search.toLowerCase();
      const fullName = `${r.name} ${r.surname}`.toLowerCase();
      const matchSearch = fullName.includes(q) || r.email.toLowerCase().includes(q) || r.phone.includes(q);
      const matchStatus = filterStatus === "All" || r.status === filterStatus;
      return matchSearch && matchStatus;
    })
  );

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return (
    <>
      {confirmTarget && (
        <ConfirmModal
          request={confirmTarget.request}
          action={confirmTarget.action}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
      {viewRequest && !confirmTarget && (
        <DetailModal
          request={viewRequest}
          onClose={() => setViewRequest(null)}
          onAction={(action) => requestAction(viewRequest, action)}
        />
      )}

      <div className="p-6 md:p-8 animate-in fade-in duration-500 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sale Approval</h1>
            <p className="text-slate-500 text-sm mt-1">Review and manage sales account registration requests</p>
          </div>
          <button
            onClick={() => setFilterStatus((p) => (p === "Pending" ? "All" : "Pending"))}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-150 self-start ${
              filterStatus === "Pending" ? "bg-yellow-50 border-yellow-400 shadow-sm" : "bg-white border-yellow-100 hover:border-yellow-300"
            }`}
          >
            <LuClock size={15} className="text-yellow-600 shrink-0" />
            <span className="text-xl font-black text-yellow-600 leading-none">{pendingCount}</span>
            <span className="text-xs font-bold text-yellow-600/70 uppercase tracking-wide">Pending</span>
          </button>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
          <FilterDropdown value={filterStatus} onChange={setFilterStatus} />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="hidden md:flex items-center px-6 py-3.5 border-b border-slate-100 bg-slate-50 gap-4">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest w-[220px] shrink-0">Applicant</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest w-[140px] shrink-0">Phone</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex-1">National ID</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest w-[130px] shrink-0">Request Date</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest w-[100px] shrink-0">Status</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest w-[116px] shrink-0 text-right pr-1">Actions</p>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <LuUser size={36} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-400 font-semibold text-sm">No requests found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((req) => {
                const cfg       = statusConfig[req.status];
                const isPending = req.status === "Pending";
                return (
                  <div key={req.id} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors">

                    {/* Applicant */}
                    <div className="flex items-center gap-3 w-full md:w-[220px] md:shrink-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getColor(req.id)} flex items-center justify-center text-white font-black text-xs shadow-md shrink-0`}>
                        {getInitials(req.name, req.surname)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{req.name} {req.surname}</p>
                        <p className="text-xs text-slate-400 truncate">{req.email}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 md:w-[140px] md:shrink-0">
                      <LuPhone size={13} className="text-slate-400 shrink-0" />
                      {req.phone}
                    </div>

                    {/* National ID */}
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 flex-1 min-w-0">
                      <LuCreditCard size={13} className="text-slate-400 shrink-0" />
                      <span className="font-mono tracking-wider">{req.nationalId}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 md:w-[130px] md:shrink-0">
                      <LuCalendar size={13} className="text-slate-400 shrink-0" />
                      {req.requestDate}
                    </div>

                    {/* Status */}
                    <div className="md:w-[100px] md:shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {req.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1 md:w-[116px] md:shrink-0">
                      <button
                        onClick={() => setViewRequest(req)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
                          !isPending ? "text-[#EA580C] hover:bg-orange-50" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        }`}
                        title={isPending ? "View" : "Edit decision"}
                      >
                        {isPending ? <LuEye size={17} /> : <LuPencil size={15} />}
                      </button>

                      {isPending ? (
                        <button onClick={() => requestAction(req, "Approve")} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-green-50 hover:text-green-600 transition-colors" title="Approve">
                          <LuCircleCheck size={17} />
                        </button>
                      ) : <span className="w-9 h-9 shrink-0" />}

                      {isPending ? (
                        <button onClick={() => requestAction(req, "Reject")} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Reject">
                          <LuCircleX size={17} />
                        </button>
                      ) : <span className="w-9 h-9 shrink-0" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-400 font-semibold">
              Showing <span className="text-slate-600">{filtered.length}</span> of{" "}
              <span className="text-slate-600">{requests.length}</span> requests
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
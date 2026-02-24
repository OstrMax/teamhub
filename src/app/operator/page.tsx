"use client";

import { useState } from "react";

type ContactStatus = "available" | "busy" | "ringing" | "away" | "offline";

interface Contact {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  status: ContactStatus;
  favorite: boolean;
  callWith?: string;
  incomingCalls?: string[];
}

const contacts: Contact[] = [
  { id: 1, name: "Cynthia Campbell", initials: "CC", avatarColor: "#8B5CF6", status: "available", favorite: true },
  { id: 2, name: "Cynthia Campbell", initials: "CC", avatarColor: "#8B5CF6", status: "available", favorite: true },
  { id: 3, name: "Linda Stevens", initials: "LS", avatarColor: "#EC4899", status: "available", favorite: false },
  { id: 4, name: "Rita Jacobs", initials: "RJ", avatarColor: "#F59E0B", status: "ringing", favorite: false, callWith: "On a call with (322) 764...", incomingCalls: ["Standford Coll.."] },
  { id: 5, name: "Rita Jacobs", initials: "RJ", avatarColor: "#F59E0B", status: "ringing", favorite: false, callWith: "On a call with (322) 764...", incomingCalls: ["Sarah Lorow.."] },
  { id: 6, name: "Samantha Swanson", initials: "SS", avatarColor: "#EC4899", status: "ringing", favorite: false, callWith: "On a call with (322) 764...", incomingCalls: ["(647) 5430987"] },
  { id: 7, name: "Darrell Clark", initials: "DC", avatarColor: "#F59E0B", status: "ringing", favorite: true, incomingCalls: ["(647) 5430987"] },
  { id: 8, name: "Cody Fisher", initials: "CF", avatarColor: "#6B7280", status: "offline", favorite: false },
  { id: 9, name: "Terry Lowrance", initials: "TL", avatarColor: "#3B82F6", status: "busy", favorite: true, callWith: "On a call with Gerry Low..." },
  { id: 10, name: "Tina Fox", initials: "TF", avatarColor: "#F97316", status: "busy", favorite: true, callWith: "On a call with Pearl Br..." },
  { id: 11, name: "Lora Lendwill", initials: "LL", avatarColor: "#8B5CF6", status: "busy", favorite: true, callWith: "On a call with Pearl Br..." },
];

const statusColors: Record<ContactStatus, string> = {
  available: "#34C759",
  busy: "#EF4444",
  ringing: "#EF4444",
  away: "#F59E0B",
  offline: "#9CA3AF",
};

const filterChips = ["ALL", "INTERNAL", "EXTERNAL", "MANAGEMENT", "SALES"];

const dialPadKeys = [
  { digit: "1", sub: "" },
  { digit: "2", sub: "ABC" },
  { digit: "3", sub: "DEF" },
  { digit: "4", sub: "GHI" },
  { digit: "5", sub: "JKL" },
  { digit: "6", sub: "MNO" },
  { digit: "7", sub: "PQRS" },
  { digit: "8", sub: "TUV" },
  { digit: "9", sub: "WXYZ" },
  { digit: "*", sub: "" },
  { digit: "0", sub: "+" },
  { digit: "#", sub: "" },
];

export default function OperatorConsolePage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("Contacts");
  const [phoneInput, setPhoneInput] = useState("");
  const [gridView, setGridView] = useState(true);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel - Dial Pad & Active Calls */}
      <div className="w-[320px] shrink-0 border-r border-[#E5E6E8] flex flex-col h-full bg-white overflow-y-auto">
        {/* Operator Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-[#001221]">Operator</h1>
            <div className="flex items-center gap-1 text-sm text-[#4C5863]">
              <span>+12063127805</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4C5863" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </div>

        {/* Ongoing Call */}
        <div className="px-4 py-2">
          <span className="text-xs font-semibold text-[#001221]">Ongoing call</span>
          <div className="mt-2 bg-[#1a0a2e] rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-medium">(416) 7638098</div>
                <div className="text-white/60 text-xs mt-0.5">00:00:02</div>
              </div>
              <span className="px-2 py-0.5 bg-[#3B82F6]/20 text-[#60A5FA] text-[10px] font-medium rounded flex items-center gap-1">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 17 2 12 7 7"/><polyline points="17 7 22 12 17 17"/></svg>
                External
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <span className="text-white text-xs">Blind</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#DC2626] ml-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* On Hold */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#001221]">On Hold</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between bg-[#F8F0FF] rounded-lg px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#001221]">(416) 7638098</span>
                <span className="text-xs text-[#7F888F]">00:00:02</span>
              </div>
              <button className="w-7 h-7 rounded-full bg-[#2a1051] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
              </button>
            </div>
            <div className="flex items-center justify-between bg-[#F8F0FF] rounded-lg px-3 py-2.5">
              <span className="text-sm text-[#001221]">Terry Lowlance</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#7F888F]">00:01:01</span>
                <button className="w-7 h-7 rounded-full bg-[#2a1051] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Phone input */}
        <div className="px-4 py-3">
          <input
            type="text"
            placeholder="Enter a name or number"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            className="w-full text-center text-lg text-[#001221] placeholder:text-[#7F888F] outline-none"
          />
        </div>

        {/* Dial Pad */}
        <div className="flex-1 flex flex-col items-center px-8 pb-4">
          <div className="grid grid-cols-3 gap-x-6 gap-y-2">
            {dialPadKeys.map((key) => (
              <button
                key={key.digit}
                className="w-16 h-16 rounded-full flex flex-col items-center justify-center hover:bg-[#F2F2F3] transition-colors"
              >
                <span className="text-2xl font-light text-[#001221]">{key.digit}</span>
                {key.sub && <span className="text-[9px] tracking-[2px] text-[#7F888F] font-medium">{key.sub}</span>}
              </button>
            ))}
          </div>
          {/* Call button */}
          <button className="w-16 h-16 rounded-full bg-[#34C759] flex items-center justify-center mt-2 hover:bg-[#2CAD43] transition-colors">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-[#E5E6E8] h-[70px]">
          {[
            { label: "Contacts", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            )},
            { label: "Unattended calls", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l22 22"/><path d="M9 9v6l5 3"/><circle cx="12" cy="12" r="10"/></svg>
            )},
            { label: "Parked", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>
            )},
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-6 h-full text-sm font-medium transition-colors relative ${
                activeTab === tab.label
                  ? "text-[#2a1051]"
                  : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
            >
              <span className={activeTab === tab.label ? "text-[#2a1051]" : "text-[#7F888F]"}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a1051]" />
              )}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E6E8]">
          <div className="flex items-center gap-2">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  activeFilter === chip
                    ? "bg-[#2a1051] text-white"
                    : "bg-[#F2F2F3] text-[#4C5863] hover:bg-[#E5E6E8]"
                }`}
              >
                {activeFilter === chip && chip === "ALL" && (
                  <span className="mr-1">✓</span>
                )}
                {chip}
              </button>
            ))}
          </div>
          <button className="text-xs font-semibold text-[#001221] tracking-wider">EDIT GROUPS</button>
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 flex items-center gap-2 border border-[#E5E6E8] rounded-lg px-3 py-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search contact" className="flex-1 outline-none text-sm text-[#001221] placeholder:text-[#7F888F]" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-[#4C5863] mr-1">All Contacts</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4C5863" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div className="flex items-center border border-[#E5E6E8] rounded-lg overflow-hidden ml-2">
            <button
              onClick={() => setGridView(false)}
              className={`p-2 ${!gridView ? "bg-[#F2F2F3]" : ""}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={!gridView ? "#001221" : "#7F888F"} strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
            <button
              onClick={() => setGridView(true)}
              className={`p-2 ${gridView ? "bg-[#F2F2F3]" : ""}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gridView ? "#001221" : "#7F888F"} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className={gridView ? "grid grid-cols-3 gap-x-4 gap-y-1" : "flex flex-col gap-1"}>
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="rounded-lg hover:bg-[#F9F9FA] transition-colors">
      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-2">
        {/* Star */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill={contact.favorite ? "#F59E0B" : "none"} stroke={contact.favorite ? "#F59E0B" : "#CCCFD2"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: contact.avatarColor }}
          >
            {contact.initials}
          </div>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: statusColors[contact.status] }}
          />
        </div>

        {/* Name & Status */}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-[#001221] truncate block">{contact.name}</span>
          {contact.callWith && (
            <div className="flex items-center gap-1 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#EF4444">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <span className="text-[11px] text-[#7F888F] truncate">{contact.callWith}</span>
            </div>
          )}
        </div>

        {/* Phone icon */}
        <button className="p-1 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
        </button>
      </div>

      {/* Incoming Calls */}
      {contact.incomingCalls && contact.incomingCalls.length > 0 && (
        <div className="px-4 pb-3">
          <span className="text-[10px] text-[#7F888F] font-medium">Incoming Calls</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {contact.incomingCalls.map((call, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-[#34C759] text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {call}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import CallPopup from "@/components/talk/CallPopup";

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
  { digit: "6", sub: "NMO" },
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
  const [showOngoingCall, setShowOngoingCall] = useState(true);
  const [calling, setCalling] = useState(false);
  const [callingName, setCallingName] = useState("");
  const [holdCalls, setHoldCalls] = useState([
    { id: 1, name: "(416) 7638098", time: "00:00:02" },
    { id: 2, name: "Terry Lowlance", time: "00:01:01" },
  ]);

  const handleEndCall = () => {
    setShowOngoingCall(false);
  };

  const handlePickupHold = (id: number) => {
    setHoldCalls((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel - Dial Pad & Active Calls */}
      <div className="w-[300px] shrink-0 border-r border-[#E5E6E8] flex flex-col h-full bg-white overflow-y-auto">
        {/* Operator Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-[#001221]">Operator</h1>
            <button className="flex items-center gap-1 text-sm text-[#4C5863] hover:text-[#001221] transition-colors">
              <span>+12063127805</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>

        {/* Ongoing Call */}
        {showOngoingCall && (
          <div className="px-4 py-2 animate-[fadeIn_0.3s_ease-out]">
            <span className="text-xs font-semibold text-[#001221]">Ongoing call</span>
            <div className="mt-2 bg-[#1a0a2e] rounded-xl p-3 transition-all duration-300">
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
                <button className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1.5 hover:bg-white/20 transition-colors active:scale-95">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  <span className="text-white text-xs">Blind</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>
                </button>
                <button
                  onClick={handleEndCall}
                  className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#DC2626] transition-all active:scale-90 ml-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* On Hold */}
        {holdCalls.length > 0 && (
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#001221]">On Hold</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
            </div>
            <div className="mt-2 space-y-2">
              {holdCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between bg-[#F8F0FF] rounded-lg px-3 py-2.5 hover:bg-[#F0E4FF] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#001221]">{call.name}</span>
                    <span className="text-xs text-[#7F888F]">{call.time}</span>
                  </div>
                  <button
                    onClick={() => handlePickupHold(call.id)}
                    className="w-7 h-7 rounded-full bg-[#2a1051] flex items-center justify-center hover:bg-[#3d1a6e] transition-colors active:scale-90"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phone input - same style as Talk DialPad */}
        <div className="px-6 pt-4 pb-2">
          <input
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="Enter a name or number"
            className="w-full text-center text-base text-[#7F888F] pb-2 outline-none placeholder:text-[#7F888F]"
          />
        </div>

        {/* Dial Pad - same style as Talk page */}
        <div className="flex-1 flex flex-col items-center px-6 pb-4">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {dialPadKeys.map((key) => (
              <button
                key={key.digit}
                onClick={() => setPhoneInput((prev) => prev + key.digit)}
                className="flex flex-col items-center justify-center w-16 h-16 rounded-full border border-[#E5E6E8] hover:bg-[#F2F2F3] active:bg-[#E5E6E8] active:scale-95 transition-all"
              >
                <span className="text-2xl font-medium text-[#001221]">{key.digit}</span>
                {key.sub && (
                  <span className="text-[10px] font-medium text-[#7F888F] tracking-wider">{key.sub}</span>
                )}
              </button>
            ))}
          </div>
          {/* Call button - same as Talk */}
          <button
            onClick={() => {
              setCallingName(phoneInput || "Unknown");
              setCalling(true);
            }}
            className="w-14 h-14 rounded-full bg-[#2CAD43] hover:bg-[#259c3a] active:scale-90 flex items-center justify-center transition-all shadow-lg"
          >
            <Image src="/icons/call-button.svg" alt="Call" width={22} height={23} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        {/* Tabs - increased height and padding for breathing room */}
        <div className="flex items-center border-b border-[#E5E6E8]">
          {[
            { label: "Contacts", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="4"/><path d="M1 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeLinecap="round"/><path d="M19 8a4 4 0 010 7.75" strokeLinecap="round"/><path d="M21 20c0-1.5-1.5-2.7-3.5-3.5" strokeLinecap="round"/></svg>
            )},
            { label: "Unattended calls", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/></svg>
            )},
            { label: "Parked", icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>
            )},
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-6 py-5 text-sm font-medium transition-colors relative ${
                activeTab === tab.label
                  ? "text-[#2a1051]"
                  : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
            >
              <span className={activeTab === tab.label ? "text-[#2a1051]" : "text-[#7F888F]"}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.label && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2a1051] transition-all" />
              )}
            </button>
          ))}
        </div>

        {/* Filters — tab/underline style (same as Talk tabs) */}
        <div className="flex items-center justify-between px-4 border-b border-[#E5E6E8]">
          <div className="flex items-center">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`relative px-4 py-3 text-xs font-semibold transition-all ${
                  activeFilter === chip
                    ? "text-[#2a1051]"
                    : "text-[#7F888F] hover:text-[#4C5863]"
                }`}
              >
                {chip}
                {activeFilter === chip && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a1051]" />
                )}
              </button>
            ))}
          </div>
          <button className="text-xs font-semibold text-[#001221] tracking-wider hover:text-[#2a1051] transition-colors">EDIT GROUPS</button>
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 flex items-center gap-2 border border-[#E5E6E8] rounded-lg px-3 py-2.5 focus-within:border-[#2a1051] focus-within:ring-1 focus-within:ring-[#2a1051]/20 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search contact" className="flex-1 outline-none text-sm text-[#001221] placeholder:text-[#7F888F]" />
          </div>
          <button className="flex items-center gap-1 hover:text-[#2a1051] transition-colors">
            <span className="text-sm text-[#4C5863]">All Contacts</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4C5863" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div className="flex items-center border border-[#E5E6E8] rounded-lg overflow-hidden ml-2">
            <button
              onClick={() => setGridView(false)}
              className={`p-2 transition-colors ${!gridView ? "bg-[#F2F2F3]" : "hover:bg-[#F9F9FA]"}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={!gridView ? "#001221" : "#7F888F"} strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
            <button
              onClick={() => setGridView(true)}
              className={`p-2 transition-colors ${gridView ? "bg-[#F2F2F3]" : "hover:bg-[#F9F9FA]"}`}
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

      {calling && <CallPopup name={callingName || "Unknown"} initials="#" onEnd={() => setCalling(false)} />}
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-lg hover:bg-[#F9F9FA] transition-all duration-200 hover:shadow-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-2">
        {/* Star */}
        <button className="transition-transform hover:scale-110 active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={contact.favorite ? "#F59E0B" : "none"} stroke={contact.favorite ? "#F59E0B" : "#CCCFD2"} strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold transition-transform duration-200"
            style={{
              backgroundColor: contact.avatarColor,
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
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
        <button
          className="p-1.5 shrink-0 rounded-full hover:bg-[#E5E6E8] transition-all active:scale-90"
          style={{ opacity: hovered ? 1 : 0.6 }}
        >
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
              <button
                key={i}
                className="inline-flex items-center gap-1.5 bg-[#34C759] text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-[#2CAD43] active:scale-95 transition-all shadow-sm hover:shadow-md"
              >
                {call}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="white" fillOpacity="0.25"/>
                  <path d="M16.01 13.38c-.73 0-1.42-.12-2.03-.33a.577.577 0 00-.61.14l-1.17 1.47c-1.83-.85-3.48-2.4-4.39-4.33l1.45-1.26c.17-.18.25-.47.14-.62-.27-.71-.36-1.5-.36-2.33 0-.34-.25-.59-.59-.59H6.19C5.65 5.53 5.2 5.77 5.2 6.19c0 5.79 4.73 10.51 10.51 10.51.42 0 .69-.43.69-.98v-1.75c0-.34-.25-.59-.59-.59z" fill="white" transform="translate(1,1) scale(0.85)"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

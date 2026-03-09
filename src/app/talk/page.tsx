"use client";

import { useState } from "react";
import Image from "next/image";
import ContactsList from "@/components/talk/ContactsList";
import CallLog from "@/components/talk/CallLog";
import CallPopup from "@/components/talk/CallPopup";

const tabs = [
  { id: "contacts", label: "Contacts", icon: ContactsIcon },
  { id: "call-log", label: "Call log", icon: CallLogIcon },
  { id: "voicemail", label: "Voicemail", icon: VoicemailIcon },
  { id: "recordings", label: "Recordings", icon: RecordingsIcon },
  { id: "parked", label: "Parked", icon: ParkedIcon },
] as const;

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

export default function TalkPage() {
  const [activeTab, setActiveTab] = useState<string>("contacts");
  const [phoneInput, setPhoneInput] = useState("");
  const [calling, setCalling] = useState(false);
  const [showActiveCall, setShowActiveCall] = useState(true);

  const handleCall = () => {
    if (phoneInput.length > 0) setCalling(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page header — title + phone only */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-[#E5E6E8]">
        <h1 className="text-lg font-semibold text-[#001221]">Talk</h1>
        <button className="flex items-center gap-1 text-sm text-[#001221]">
          +12063127805
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Content — Left panel (call card + dial pad) | Tabs + Content right */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-[300px] shrink-0 border-r border-[#E5E6E8] flex flex-col h-full bg-white overflow-y-auto">
          {/* Active call card */}
          {showActiveCall && (
            <div className="px-4 py-3" style={{ animation: "fadeIn 0.3s ease-out" }}>
              <span className="text-xs font-semibold text-[#001221]">Ongoing call</span>
              <div className="mt-2 bg-[#001221] rounded-[12px] p-2">
                {/* Header row: phone number + External badge */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-[14px] font-medium">(416) 7638098</span>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[#ebd6e8] text-[#9c328c] text-[12px] font-medium rounded-full">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9c328c" strokeWidth="2"><polyline points="7 17 2 12 7 7"/><polyline points="17 7 22 12 17 17"/></svg>
                    External
                  </span>
                </div>

                {/* Timer */}
                <div className="text-[#e5e6e8]/80 text-[12px] mb-3">00:00:02</div>

                {/* Controls row */}
                <div className="flex items-center gap-2">
                  {/* Blind dropdown */}
                  <button className="flex items-center gap-1 bg-white rounded-full px-3 py-1.5 hover:bg-gray-100 transition-colors active:scale-95">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    <span className="text-[#001221] text-[12px] font-medium">Blind</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>

                  <div className="flex-1" />

                  {/* Hold */}
                  <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95" title="Hold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                  </button>

                  {/* Park */}
                  <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95" title="Park">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>
                  </button>

                  {/* End call */}
                  <button
                    onClick={() => setShowActiveCall(false)}
                    className="w-9 h-9 rounded-full bg-[#c70816] flex items-center justify-center hover:bg-[#a90612] transition-all active:scale-90"
                    title="End call"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dial pad */}
          <div className="flex flex-col items-center flex-1 p-6">
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Enter a name or number"
              className="w-full text-center text-base text-[#7F888F] mb-6 pb-2 outline-none placeholder:text-[#7F888F]"
            />

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

            <button
              onClick={handleCall}
              className={`w-14 h-14 rounded-full bg-[#2CAD43] hover:bg-[#259c3a] flex items-center justify-center transition-all shadow-lg ${phoneInput.length > 0 ? "active:scale-90" : "opacity-60 cursor-not-allowed"}`}
            >
              <Image src="/icons/call-button.svg" alt="Call" width={22} height={23} />
            </button>
          </div>
        </div>

        {/* Right panel — tabs sit at top, content below */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs row */}
          <div className="flex items-center gap-1 border-b border-[#E5E6E8]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#2a1051]"
                    : "text-[#7F888F] hover:text-[#4C5863]"
                }`}
              >
                <tab.icon active={activeTab === tab.id} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a1051]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "contacts" && <ContactsList />}
            {activeTab === "call-log" && <CallLog />}
            {activeTab !== "contacts" && activeTab !== "call-log" && (
              <div className="flex-1 flex items-center justify-center text-[#7F888F] text-sm h-full">
                {tabs.find(t => t.id === activeTab)?.label} - Coming soon
              </div>
            )}
          </div>
        </div>
      </div>

      {calling && <CallPopup name={phoneInput || "Unknown"} initials="#" onEnd={() => setCalling(false)} />}
    </div>
  );
}

function ContactsIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4" strokeLinecap="round"/>
      <path d="M19 8h3M20.5 6.5v3" strokeLinecap="round"/>
    </svg>
  );
}

function CallLogIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function VoicemailIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <circle cx="6" cy="12" r="4"/>
      <circle cx="18" cy="12" r="4"/>
      <path d="M6 16h12"/>
    </svg>
  );
}

function RecordingsIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function ParkedIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M9 17V7h4a3 3 0 010 6H9"/>
    </svg>
  );
}

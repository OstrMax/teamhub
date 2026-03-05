"use client";

import { useState } from "react";
import DialPad from "@/components/talk/DialPad";
import ContactsList from "@/components/talk/ContactsList";
import CallLog from "@/components/talk/CallLog";

const tabs = [
  { id: "contacts", label: "Contacts", icon: ContactsIcon },
  { id: "call-log", label: "Call log", icon: CallLogIcon },
  { id: "voicemail", label: "Voicemail", icon: VoicemailIcon },
  { id: "recordings", label: "Recordings", icon: RecordingsIcon },
  { id: "parked", label: "Parked", icon: ParkedIcon },
] as const;

export default function TalkPage() {
  const [activeTab, setActiveTab] = useState<string>("contacts");

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center gap-6 px-6 py-3 border-b border-[#E5E6E8]">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-[#001221]">Talk</h1>
          <button className="flex items-center gap-1 text-sm text-[#001221]">
            +12063127805
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 border-b border-[#E5E6E8] -mb-px">
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
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2a1051]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        <DialPad />
        {activeTab === "contacts" && <ContactsList />}
        {activeTab === "call-log" && <CallLog />}
        {activeTab !== "contacts" && activeTab !== "call-log" && (
          <div className="flex-1 flex items-center justify-center text-[#7F888F] text-sm">
            {tabs.find(t => t.id === activeTab)?.label} - Coming soon
          </div>
        )}
      </div>
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

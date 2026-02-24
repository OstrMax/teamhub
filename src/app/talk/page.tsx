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

        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-[#2a1051]"
                  : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
              style={activeTab === tab.id ? { boxShadow: "inset 0 -2px 0 0 #2a1051" } : undefined}
            >
              <tab.icon active={activeTab === tab.id} />
              {tab.label}
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
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#2a1051" : "#7F888F"} strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}

function CallLogIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#2a1051" : "#7F888F"} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function VoicemailIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#2a1051" : "#7F888F"} strokeWidth="1.5">
      <circle cx="5.5" cy="11.5" r="4.5"/>
      <circle cx="18.5" cy="11.5" r="4.5"/>
      <line x1="5.5" y1="16" x2="18.5" y2="16"/>
    </svg>
  );
}

function RecordingsIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#2a1051" : "#7F888F"} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function ParkedIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "#2a1051" : "#7F888F"} strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="M9 17V7h4a3 3 0 010 6H9"/>
    </svg>
  );
}

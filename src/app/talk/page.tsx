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
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      <path d="M20 9v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/>
    </svg>
  );
}

function CallLogIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c}>
      <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
    </svg>
  );
}

function VoicemailIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c}>
      <path d="M18.5 6C15.46 6 13 8.46 13 11.5c0 1.33.47 2.55 1.26 3.5H9.74c.79-.95 1.26-2.17 1.26-3.5C11 8.46 8.54 6 5.5 6S0 8.46 0 11.5 2.46 17 5.5 17h13c3.04 0 5.5-2.46 5.5-5.5S21.54 6 18.5 6zm-13 9C3.57 15 2 13.43 2 11.5S3.57 8 5.5 8 9 9.57 9 11.5 7.43 15 5.5 15zm13 0c-1.93 0-3.5-1.57-3.5-3.5S16.57 8 18.5 8 22 9.57 22 11.5 20.43 15 18.5 15z"/>
    </svg>
  );
}

function RecordingsIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c}>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
  );
}

function ParkedIcon({ active }: { active: boolean }) {
  const c = active ? "#1D2B3E" : "#7F888F";
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={c}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.66-1.34 3-3 3H9v4H7V7h5c1.66 0 3 1.34 3 3v1z"/>
      <path d="M12 9H9v3h3c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="white"/>
    </svg>
  );
}

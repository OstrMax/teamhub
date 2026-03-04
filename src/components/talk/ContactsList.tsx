"use client";

import { useState, useEffect, useCallback } from "react";

type Contact = {
  id: number;
  name: string;
  type: "Internal" | "External";
  extension: string;
  phone?: string;
  avatar?: string;
  initials?: string;
  isFavorite?: boolean;
  isUnknown?: boolean;
};

const contacts: Contact[] = [
  { id: 1, name: "Terry Crews", type: "Internal", extension: "X1512", avatar: "/avatars/terry.jpg" },
  { id: 2, name: "Ashley Warren", type: "External", extension: "X2122", avatar: "/avatars/ashley.jpg" },
  { id: 3, name: "Lora Sellicon", type: "External", extension: "X2000", avatar: "/avatars/lora.jpg" },
  { id: 4, name: "Cameron Lopez", type: "External", extension: "X9421", avatar: "/avatars/cameron.jpg" },
  { id: 5, name: "Anneta Walson", type: "External", extension: "X9001", phone: "(647) 782-3231", initials: "AW", isFavorite: true },
  { id: 6, name: "Unknown", type: "External", extension: "X9111", phone: "(431) 1345-3604", isUnknown: true },
];

const filterTabs = ["ALL", "FAVORITES", "INTERNAL", "EXTERNAL"] as const;

export default function ContactsList() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [callingContact, setCallingContact] = useState<Contact | null>(null);
  const [callState, setCallState] = useState<"idle" | "calling" | "connected">("idle");
  const [callTimer, setCallTimer] = useState(0);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (callState === "idle") return;
    if (callState === "calling") {
      const timeout = setTimeout(() => setCallState("connected"), 2500);
      return () => clearTimeout(timeout);
    }
    if (callState === "connected") {
      const interval = setInterval(() => setCallTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  const handleCallContact = (contact: Contact) => {
    setCallingContact(contact);
    setCallState("calling");
    setCallTimer(0);
  };

  const handleEndCall = () => {
    setCallState("idle");
    setCallingContact(null);
    setCallTimer(0);
  };

  const filtered = contacts.filter((c) => {
    if (activeFilter === "FAVORITES") return c.isFavorite;
    if (activeFilter === "INTERNAL") return c.type === "Internal";
    if (activeFilter === "EXTERNAL") return c.type === "External";
    return true;
  }).filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  /* ── Active call overlay ── */
  if (callingContact && callState !== "idle") {
    const initials = callingContact.name.split(" ").map(n => n[0]).join("");
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0a2e] to-[#0d0518] px-8"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      >
        {/* Avatar */}
        <div className="relative mb-6">
          {callState === "calling" && (
            <>
              <div className="absolute -inset-3 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "1.5s" }} />
              <div className="absolute -inset-5 rounded-full bg-white/5 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
            </>
          )}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2E1055] flex items-center justify-center relative z-10 text-white text-2xl font-semibold">
            {callingContact.isUnknown ? (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ) : (
              initials
            )}
          </div>
        </div>

        <div className="text-white text-xl font-semibold mb-1">{callingContact.name}</div>
        <div className="text-white/40 text-sm mb-1">{callingContact.extension}</div>
        <div className="text-white/50 text-sm mb-2">
          {callState === "calling" ? "Calling..." : formatTime(callTimer)}
        </div>

        {callState === "calling" && (
          <div className="flex items-center gap-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0.15s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
        {callState === "connected" && (
          <div className="flex items-center gap-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#2CAD43] animate-pulse" />
            <span className="text-[#2CAD43] text-xs font-medium">Connected</span>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-5 mb-10">
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.5 12A4.5 4.5 0 0012 7.5"/><path d="M20 12a8 8 0 00-11.76-7.06"/></svg>
            </div>
            <span className="text-white/40 text-[10px]">Mute</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            </div>
            <span className="text-white/40 text-[10px]">Hold</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <span className="text-white/40 text-[10px]">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <span className="text-white/40 text-[10px]">Add</span>
          </button>
        </div>

        {/* End call */}
        <button
          onClick={handleEndCall}
          className="w-16 h-16 rounded-full bg-[#EF4444] hover:bg-[#DC2626] flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-[#EF4444]/30"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Filter tabs */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-[#E5E6E8]">
        <div className="flex items-center gap-4 flex-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`text-xs font-semibold tracking-wider transition-colors flex items-center gap-1 ${
                activeFilter === tab
                  ? "text-[#001221]"
                  : "text-[#7F888F] hover:text-[#4C5863]"
              }`}
            >
              {activeFilter === tab && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
              {tab}
            </button>
          ))}
        </div>
        <button className="text-xs font-semibold text-[#2a1051] tracking-wider hover:text-[#783a9b]">
          + ADD CONTACT
        </button>
      </div>

      {/* Search */}
      <div className="px-6 py-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#F2F2F3] rounded-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-[#001221] placeholder:text-[#7F888F]"
          />
        </div>
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#F2F2F3] transition-colors cursor-pointer group"
          >
            {/* Favorite star */}
            <button className="shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={contact.isFavorite ? "#FBBD00" : "none"} stroke={contact.isFavorite ? "#FBBD00" : "#CCCFD2"} strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-[#E5E6E8] flex items-center justify-center">
              {contact.isUnknown ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              ) : contact.initials ? (
                <span className="text-sm font-semibold text-[#4C5863]">{contact.initials}</span>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                  {contact.name.split(" ").map(n => n[0]).join("")}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#001221] truncate">{contact.name}</p>
              <p className="text-xs text-[#7F888F]">{contact.phone || contact.type}</p>
            </div>

            {/* Extension badge */}
            <span className="text-xs text-[#4C5863] bg-[#F2F2F3] px-2 py-0.5 rounded border border-[#E5E6E8]">
              {contact.extension}
            </span>

            {/* Call button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleCallContact(contact); }}
              className="p-1.5 rounded hover:bg-[#E5E6E8] transition-colors active:scale-90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4C5863" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </button>

            {/* More */}
            <button className="p-1 rounded hover:bg-[#E5E6E8] transition-colors opacity-0 group-hover:opacity-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4C5863">
                <circle cx="12" cy="5" r="1.5"/>
                <circle cx="12" cy="12" r="1.5"/>
                <circle cx="12" cy="19" r="1.5"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

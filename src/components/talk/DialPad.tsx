"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const keys = [
  { num: "1", sub: "" },
  { num: "2", sub: "ABC" },
  { num: "3", sub: "DEF" },
  { num: "4", sub: "GHI" },
  { num: "5", sub: "JKL" },
  { num: "6", sub: "NMO" },
  { num: "7", sub: "PQRS" },
  { num: "8", sub: "TUV" },
  { num: "9", sub: "WXYZ" },
  { num: "*", sub: "" },
  { num: "0", sub: "+" },
  { num: "#", sub: "" },
];

export default function DialPad() {
  const [input, setInput] = useState("");
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

  const handleCall = () => {
    if (callState === "idle" && input.length > 0) {
      setCallState("calling");
      setCallTimer(0);
    }
  };

  const handleEndCall = () => {
    setCallState("idle");
    setCallTimer(0);
  };

  /* ── Active call overlay ── */
  if (callState !== "idle") {
    return (
      <div className="flex flex-col items-center w-[300px] shrink-0 border-r border-[#E5E6E8] h-full bg-gradient-to-b from-[#1a0a2e] to-[#0d0518] p-6 justify-center"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      >
        {/* Pulse ring behind avatar */}
        <div className="relative mb-6">
          {callState === "calling" && (
            <>
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "1.5s" }} />
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-white/5 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
            </>
          )}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2E1055] flex items-center justify-center relative z-10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>

        <div className="text-white text-lg font-semibold mb-1">{input || "Unknown"}</div>
        <div className="text-white/50 text-sm mb-1">
          {callState === "calling" ? "Calling..." : formatTime(callTimer)}
        </div>
        {callState === "calling" && (
          <div className="flex items-center gap-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0.15s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
        {callState === "connected" && (
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2CAD43] animate-pulse" />
            <span className="text-[#2CAD43] text-xs font-medium">Connected</span>
          </div>
        )}

        {/* Call controls */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.5 12A4.5 4.5 0 0012 7.5"/><path d="M20 12a8 8 0 00-11.76-7.06"/></svg>
            </div>
            <span className="text-white/50 text-[10px]">Mute</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            </div>
            <span className="text-white/50 text-[10px]">Hold</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <span className="text-white/50 text-[10px]">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M8 6h8M8 10h5"/></svg>
            </div>
            <span className="text-white/50 text-[10px]">Keypad</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
            </div>
            <span className="text-white/50 text-[10px]">Record</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <span className="text-white/50 text-[10px]">Add</span>
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
    <div className="flex flex-col items-center w-[300px] shrink-0 border-r border-[#E5E6E8] h-full bg-white p-6">
      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a name or number"
        className="w-full text-center text-base text-[#7F888F] mb-6 pb-2 outline-none placeholder:text-[#7F888F]"
      />

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {keys.map((key) => (
          <button
            key={key.num}
            onClick={() => setInput((prev) => prev + key.num)}
            className="flex flex-col items-center justify-center w-16 h-16 rounded-full border border-[#E5E6E8] hover:bg-[#F2F2F3] transition-colors"
          >
            <span className="text-2xl font-medium text-[#001221]">{key.num}</span>
            {key.sub && (
              <span className="text-[10px] font-medium text-[#7F888F] tracking-wider">{key.sub}</span>
            )}
          </button>
        ))}
      </div>

      {/* Call button */}
      <button
        onClick={handleCall}
        className={`w-14 h-14 rounded-full bg-[#2CAD43] hover:bg-[#259c3a] flex items-center justify-center transition-all shadow-lg ${input.length > 0 ? "active:scale-90" : "opacity-60 cursor-not-allowed"}`}
      >
        <Image src="/icons/call-button.svg" alt="Call" width={22} height={23} />
      </button>
    </div>
  );
}

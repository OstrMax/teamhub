"use client";

import { useState, useEffect, useCallback } from "react";

interface CallPopupProps {
  name: string;
  initials?: string;
  onEnd: () => void;
}

export default function CallPopup({ name, initials, onEnd }: CallPopupProps) {
  const [callState, setCallState] = useState<"calling" | "connected">("calling");
  const [timer, setTimer] = useState(0);
  const [minimized, setMinimized] = useState(false);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (callState === "calling") {
      const timeout = setTimeout(() => setCallState("connected"), 2500);
      return () => clearTimeout(timeout);
    }
    if (callState === "connected") {
      const interval = setInterval(() => setTimer((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [callState]);

  const letters = initials || name.split(" ").map(n => n[0]).join("").slice(0, 2);

  /* ── Minimized: small corner card (like Figma 3104-9826) ── */
  if (minimized) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 bg-[#1a0a2e] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden"
        style={{ width: 320, animation: "slideIn 0.25s ease-out" }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-[14px] font-medium">{name}</div>
              <div className="text-white/50 text-[12px] mt-0.5">
                {callState === "calling" ? "Calling..." : formatTime(timer)}
              </div>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            </button>
            <button
              onClick={() => setMinimized(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            </button>
            <button
              onClick={onEnd}
              className="w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center hover:bg-[#DC2626] transition-all active:scale-90 ml-auto"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Expanded: floating card, not full screen ── */
  return (
    <div
      className="fixed bottom-6 right-6 z-50 bg-[#1a0a2e] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden"
      style={{ width: 340, animation: "slideIn 0.25s ease-out" }}
    >
      {/* Content */}
      <div className="flex flex-col items-center pt-8 pb-4 px-6">
        {/* Pulse ring behind avatar */}
        <div className="relative mb-4">
          {callState === "calling" && (
            <>
              <div className="absolute -inset-2 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "1.5s" }} />
              <div className="absolute -inset-4 rounded-full bg-white/5 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
            </>
          )}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2E1055] flex items-center justify-center relative z-10 text-white text-xl font-semibold">
            {letters}
          </div>
        </div>

        <div className="text-white text-base font-semibold mb-0.5">{name}</div>
        <div className="text-white/50 text-sm">
          {callState === "calling" ? "Calling..." : formatTime(timer)}
        </div>
        {callState === "calling" && (
          <div className="flex items-center gap-1 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0.15s" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
        {callState === "connected" && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#2CAD43] animate-pulse" />
            <span className="text-[#2CAD43] text-xs font-medium">Connected</span>
          </div>
        )}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-center gap-3 px-4 pb-3">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/></svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button
          onClick={() => setMinimized(true)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>
        </button>
      </div>

      {/* End call */}
      <div className="flex justify-center pb-5">
        <button
          onClick={onEnd}
          className="w-14 h-14 rounded-full bg-[#EF4444] hover:bg-[#DC2626] flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-[#EF4444]/30"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M23.71 16.67C20.66 13.78 16.54 12 12 12 7.46 12 3.34 13.78.29 16.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1C8.69 14.25 10.32 14 12 14s3.31.25 4.9.72v3.1c0 .39.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.27-.11-.52-.29-.7z"/></svg>
        </button>
      </div>
    </div>
  );
}

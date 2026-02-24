"use client";

import { useState } from "react";

type Message = {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  status?: string;
};

const messages: Message[] = [
  { id: 1, text: "", time: "10:21 AM", sent: true, status: "Sent" },
  { id: 2, text: "Sure", time: "10:22 AM", sent: false },
  { id: 3, text: "Head's up, we might need to cancel the evening meeting.", time: "10:22 AM", sent: false },
  { id: 4, text: "We can do it tomorrow. Just ping me whenever you are done.", time: "10:34 AM", sent: true, status: "Sent" },
  { id: 5, text: "Sounds good.", time: "1:12 PM", sent: true, status: "Sent" },
];

export default function ChatArea() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#E5E6E8]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-[#001221]">Jim Dowell</h2>
            <button>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCFD2" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-[#7F888F]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              Online
            </span>
            <span className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" y1="22" x2="4" y2="15"/>
              </svg>
              0
            </span>
            <span className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Add chat description
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-[#F2F2F3] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B182E" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="16" rx="2" fill="#0B182E"/><polygon points="21 7 17 10.5 17 13.5 21 17" fill="#0B182E"/></svg>
          </button>
          <button className="p-2 rounded hover:bg-[#F2F2F3] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B182E" xmlns="http://www.w3.org/2000/svg"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
          </button>
          <button className="p-2 rounded hover:bg-[#F2F2F3] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B182E" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.filter(m => m.text).map((msg) => (
          <div key={msg.id} className={`flex flex-col mb-4 ${msg.sent ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.sent
                  ? "bg-[#E8F5E9] text-[#001221]"
                  : "bg-[#F2F2F3] text-[#001221]"
              }`}
            >
              {msg.text}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-[#7F888F]">{msg.time}</span>
              {msg.status && (
                <span className="text-[11px] text-[#7F888F]">{msg.status}</span>
              )}
            </div>
          </div>
        ))}

        {/* Today divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[#E5E6E8]" />
          <span className="text-xs text-[#7F888F] font-medium">Today</span>
          <div className="flex-1 h-px bg-[#E5E6E8]" />
        </div>

        {/* Today's messages */}
        <div className="flex flex-col items-end mb-4">
          <div className="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm bg-[#E8F5E9] text-[#001221]">
            Sounds good.
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-[#7F888F]">1:12 PM</span>
            <span className="text-[11px] text-[#7F888F]">Sent</span>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="px-4 py-3 border-t border-[#E5E6E8]">
        <div className="flex items-center gap-3 border border-[#E5E6E8] rounded-xl px-4 py-2.5">
          <input
            type="text"
            placeholder="Ask anything or select"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 outline-none text-sm text-[#001221] placeholder:text-[#7F888F]"
          />
          <button className="w-9 h-9 rounded-full bg-[#2a1051] flex items-center justify-center hover:bg-[#3d1870] transition-colors shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

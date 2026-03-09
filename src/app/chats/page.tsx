"use client";

import { useState } from "react";
import CallPopup from "@/components/talk/CallPopup";

const favorites = [
  { name: "operations-team", type: "channel" as const, bold: true },
  { name: "Rent adjustment requests", type: "channel" as const },
];

const important = [
  { name: "ca-conference-2026-27", type: "channel" as const },
  { name: "us-conference-2025", type: "channel" as const },
];

const channels = [
  { name: "operations-team", type: "channel" as const },
  { name: "general", type: "channel" as const },
  { name: "Lora Greenland", type: "dm" as const, online: true },
  { name: "Terry Gonzales", type: "dm" as const, online: true },
  { name: "Eugene Sertgent", type: "dm" as const, online: true },
  { name: "design", type: "channel" as const, locked: true },
];

interface Message {
  id: number;
  sender: string;
  avatar: string;
  avatarColor: string;
  time: string;
  text: string;
  mention?: string;
  reactions?: { emoji: string; count: number }[];
  dividerBefore?: string;
}

const messages: Message[] = [
  { id: 1, sender: "Jim Dowell", avatar: "JD", avatarColor: "#3B82F6", time: "3:25 PM", text: "Heads up, we might need to cancel the evening meeting.", reactions: [{ emoji: "💯", count: 1 }, { emoji: "😊", count: 0 }] },
  { id: 2, sender: "Jim Dowell", avatar: "JD", avatarColor: "#3B82F6", time: "3:25 PM", text: "Heads up, we might need to cancel the evening meeting.", reactions: [{ emoji: "💯", count: 1 }, { emoji: "😊", count: 0 }], dividerBefore: "Yesterday" },
  { id: 3, sender: "Cody Russell", avatar: "CR", avatarColor: "#7C3AED", time: "3:27 PM", text: "Alright. We can discuss the QA doc next week.", mention: "@Jim Dowel" },
  { id: 4, sender: "Jim Dowell", avatar: "JD", avatarColor: "#3B82F6", time: "3:27 PM", text: "Cool." },
  { id: 5, sender: "Cody Russell", avatar: "CR", avatarColor: "#7C3AED", time: "3:27 PM", text: "Hi Jim! Got time to discuss the doc?", reactions: [{ emoji: "👍", count: 2 }, { emoji: "💬", count: 2 }, { emoji: "💯", count: 1 }], dividerBefore: "Today" },
];

export default function ChatsPage() {
  const [activeChannel, setActiveChannel] = useState("Jim Dowell");
  const [messageInput, setMessageInput] = useState("");
  const [calling, setCalling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-[280px] shrink-0 border-r border-[#E5E6E8] flex flex-col h-full bg-white">
        <div className="p-4">
          <h1 className="text-lg font-semibold text-[#001221] mb-3">Chats</h1>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#F2F2F3] rounded-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Find channel" className="bg-transparent outline-none text-sm text-[#001221] placeholder:text-[#7F888F] w-full" />
            </div>
            <button className="p-2 text-[#7F888F] hover:bg-[#F2F2F3] rounded-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          <button className="flex items-center gap-2 text-sm text-[#7F888F] mb-3">
            <span className="text-base">+</span> Threads
          </button>

          {/* Favorites */}
          <SectionHeader title="FAVORITES" />
          {favorites.map((item) => (
            <ChannelItem key={item.name} name={item.name} type={item.type} bold={item.bold} />
          ))}

          {/* Important */}
          <SectionHeader title="IMPORTANT" />
          {important.map((item) => (
            <ChannelItem key={item.name} name={item.name} type={item.type} />
          ))}

          {/* Channels */}
          <SectionHeader title="CHANNELS" />
          {channels.map((item) => (
            <ChannelItem key={item.name} name={item.name} type={item.type} online={item.online} locked={item.locked} />
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E6E8]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#001221]">{activeChannel}</h2>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#001221" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#7F888F]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2CAD43]" /> Online</span>
              <span className="flex items-center gap-1">📌 0</span>
              <span className="flex items-center gap-1">📝 Add chat description</span>
            </div>
          </div>
          <div className="flex items-center gap-[13px]">
            {/* Meet icon */}
            <button onClick={() => setCalling(true)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2F2F3] transition-colors">
              <svg width="20" height="20" viewBox="0 0 31 32" fill="none"><path d="M24.8047 12.3957C24.5345 11.8045 23.8725 11.4548 23.2419 11.6123C22.7634 11.7317 22.2509 12.0093 21.715 12.3704C21.4735 12.5332 21.3667 12.8295 21.4434 13.1104C21.9673 15.0343 21.9673 16.9655 21.4434 18.8894C21.3667 19.1703 21.4735 19.4673 21.715 19.6295C22.2516 19.9905 22.7641 20.2681 23.2425 20.3875C23.8732 20.545 24.5351 20.1947 24.8054 19.6034C25.7316 17.5748 25.7316 14.425 24.8047 12.3957ZM7.45775 10.5913C11.1527 9.19191 14.8477 9.19191 18.5426 10.5913C18.8689 10.7147 19.1485 10.9643 19.3107 11.2846C20.8969 14.4284 20.8969 17.5721 19.3107 20.7152C19.1492 21.0355 18.8696 21.2851 18.5426 21.4085C14.8477 22.8079 11.1527 22.8079 7.45775 21.4085C7.13143 21.2851 6.85182 21.0355 6.68966 20.7152C5.10345 17.5714 5.10345 14.4284 6.68966 11.2846C6.85182 10.9643 7.13143 10.7147 7.45775 10.5913Z" fill="#112547"/></svg>
            </button>
            {/* Talk/Phone icon */}
            <button onClick={() => setCalling(true)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2F2F3] transition-colors">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none"><path d="M20.2081 17.3652C19.1718 16.4781 18.1172 15.9391 17.0941 16.8262L16.4817 17.36C16.0342 17.7499 15.2021 19.566 11.986 15.8632C8.76986 12.1682 10.6828 11.5925 11.1329 11.2078L11.7478 10.6713C12.7658 9.78422 12.3811 8.66683 11.6458 7.51541L11.2035 6.81933C10.4656 5.67315 9.65959 4.9195 8.63901 5.80399L8.08686 6.28811C7.63414 6.61522 6.37282 7.68551 6.06665 9.71619C5.69767 12.1525 6.86217 14.9447 9.52351 18.0064C12.1822 21.0707 14.7886 22.6094 17.2537 22.5832C19.3027 22.5597 20.5431 21.4606 20.9304 21.0602L21.4825 20.5761C22.5031 19.6916 21.8698 18.7888 20.8309 17.9017L20.2081 17.3652Z" fill="#112547"/></svg>
            </button>
            {/* Info icon */}
            <button onClick={() => setShowInfo(!showInfo)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F2F2F3] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99935 1.66675C5.39935 1.66675 1.66602 5.40008 1.66602 10.0001C1.66602 14.6001 5.39935 18.3334 9.99935 18.3334C14.5993 18.3334 18.3327 14.6001 18.3327 10.0001C18.3327 5.40008 14.5993 1.66675 9.99935 1.66675ZM9.99935 14.1667C9.54102 14.1667 9.16602 13.7917 9.16602 13.3334V10.0001C9.16602 9.54175 9.54102 9.16675 9.99935 9.16675C10.4577 9.16675 10.8327 9.54175 10.8327 10.0001V13.3334C10.8327 13.7917 10.4577 14.1667 9.99935 14.1667ZM10.8327 7.50008H9.16602V5.83341H10.8327V7.50008Z" fill="#112547"/></svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.dividerBefore && (
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-[#E5E6E8]" />
                  <span className="text-xs text-[#7F888F] font-medium">{msg.dividerBefore}</span>
                  <div className="flex-1 h-px bg-[#E5E6E8]" />
                </div>
              )}
              <div className="flex gap-3 mb-4 group hover:bg-[#F9F9FA] -mx-2 px-2 py-1 rounded-lg">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0" style={{ background: msg.avatarColor }}>{msg.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-[#001221]">{msg.sender}</span>
                    <span className="text-xs text-[#7F888F]">{msg.time}</span>
                  </div>
                  <p className="text-sm text-[#001221] mt-0.5">
                    {msg.mention && <span className="text-[#3B82F6] font-medium">{msg.mention} </span>}
                    {msg.text}
                  </p>
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F2F2F3] rounded-full text-xs">
                          {r.emoji}{r.count > 0 && <span className="text-[#7F888F]">{r.count}</span>}
                        </span>
                      ))}
                      <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#F2F2F3] text-[#7F888F] text-xs">😊</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-3 border border-[#E5E6E8] rounded-xl px-4 py-2.5">
            <input
              type="text"
              placeholder="Ask anything or select"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 outline-none text-sm text-[#001221] placeholder:text-[#7F888F]"
            />
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shrink-0" style={{ background: "linear-gradient(180deg, #AE0D8A 0%, #64168E 47.6%, #2F1155 100%)" }}>
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none"><path d="M14.5439 0.820147C12.4104 -1.22485 5.54146 1.16452 4.76577 1.44327C2.63493 2.21015 0.0788345 3.3864 0.00205328 4.6414C-0.085228 6.36952 2.6264 8.10015 5.02696 8.77515C5.14246 8.80765 5.26715 8.77515 5.35246 8.6939L9.66533 4.5864C9.92193 4.34202 10.3367 4.34202 10.5933 4.5864C10.8499 4.83077 10.8499 5.22577 10.5933 5.47015L6.26924 9.58827C6.18393 9.66952 6.1498 9.78827 6.18327 9.89827C6.90121 12.2458 8.77349 14.6683 10.508 14.6683C10.5217 14.6683 10.5362 14.6683 10.55 14.6683C11.9419 14.5633 13.2524 11.6995 13.9093 10.0026C14.1941 9.27015 16.6183 2.79765 14.5439 0.820147Z" fill="white"/></svg>
            </button>
          </div>
        </div>
      </div>
      {/* Info Panel */}
      {showInfo && (
        <div className="w-[340px] shrink-0 bg-white border-l border-[#E5E6E8] flex flex-col overflow-hidden animate-[slideInRight_0.3s_ease-out]">
          <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-[#E5E6E8]">
            <span className="text-[15px] font-semibold text-[#001221]">Contact Info</span>
            <button onClick={() => setShowInfo(false)} className="p-1.5 rounded-lg hover:bg-[#F2F2F3] transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5L4.5 13.5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.5 4.5L13.5 13.5" stroke="#001221" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pt-6 pb-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-2xl font-semibold mb-3">JD</div>
              <h3 className="text-lg font-semibold text-[#001221]">{activeChannel}</h3>
              <span className="flex items-center gap-1.5 text-sm text-[#7F888F] mt-1">
                <span className="w-2 h-2 rounded-full bg-[#2CAD43]" /> Online
              </span>
            </div>
            <div className="space-y-4">
              <div className="border-t border-[#E5E6E8] pt-4">
                <p className="text-xs font-semibold text-[#7F888F] uppercase tracking-wider mb-2">Contact Details</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><span className="text-sm text-[#001221]">+1 (416) 555-0198</span></div>
                  <div className="flex items-center gap-3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><span className="text-sm text-[#001221]">jim.dowell@company.com</span></div>
                  <div className="flex items-center gap-3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg><span className="text-sm text-[#001221]">Product Manager</span></div>
                  <div className="flex items-center gap-3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span className="text-sm text-[#001221]">Toronto, ON</span></div>
                </div>
              </div>
              <div className="border-t border-[#E5E6E8] pt-4">
                <p className="text-xs font-semibold text-[#7F888F] uppercase tracking-wider mb-2">Shared Files</p>
                <div className="space-y-2">
                  {["Q2 Report.pdf", "Design Specs.fig", "Meeting Notes.docx"].map((f) => (
                    <div key={f} className="flex items-center gap-2 px-3 py-2 bg-[#F9F9FA] rounded-lg hover:bg-[#F2F2F3] transition-colors cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <span className="text-sm text-[#001221]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call popup */}
      {calling && <CallPopup name={activeChannel} onEnd={() => setCalling(false)} />}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-1 mt-4 mb-1">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7F888F" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      <span className="text-[10px] font-semibold text-[#7F888F] tracking-wider uppercase">{title}</span>
    </div>
  );
}

function ChannelItem({ name, type, bold, online, locked }: { name: string; type: "channel" | "dm"; bold?: boolean; online?: boolean; locked?: boolean }) {
  return (
    <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-[#F2F2F3] text-left transition-colors">
      {type === "channel" ? (
        <span className="text-[#7F888F] text-sm">{locked ? "🔒" : "#"}</span>
      ) : (
        <span className={`w-2 h-2 rounded-full shrink-0 ${online ? "bg-[#2CAD43]" : "bg-[#CCCFD2]"}`} />
      )}
      <span className={`text-sm truncate ${bold ? "font-semibold text-[#001221]" : "text-[#4C5863]"}`}>{name}</span>
    </button>
  );
}

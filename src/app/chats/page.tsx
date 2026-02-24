"use client";

import { useState } from "react";

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
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-[#F2F2F3]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B182E" xmlns="http://www.w3.org/2000/svg"><path d="M17 2H7C5.9 2 5 2.9 5 4v12c0 1.1.9 2 2 2h2l1.7 1.7c.4.4 1 .4 1.4 0L14 18h3c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM19 16c0 .6-.4 1-1 1h-3.4l-2.1 2.1-.5.5-.5-.5L9.4 17H7c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v12z" fill="none"/><rect x="5" y="2" width="14" height="16" rx="2" fill="#0B182E"/><polygon points="21 7 17 10.5 17 13.5 21 17" fill="#0B182E"/></svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-[#F2F2F3]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B182E" xmlns="http://www.w3.org/2000/svg"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-[#F2F2F3]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0B182E" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
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
            <button className="w-9 h-9 rounded-full bg-[#2a1051] flex items-center justify-center hover:bg-[#3d1a6e] transition-colors shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
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
